// src/friendshipLogic.js

const FriendshipStatus = {
    PENDING: 'PENDING',
    ACCEPTED: 'ACCEPTED',
    DECLINED: 'DECLINED',
    BLOCKED: 'BLOCKED',
};

const setupFriendshipLogic = (io, prisma, onlineUsers) => {

    /**
     * Helper para selecionar campos comuns do usuário.
     * Isso garante que todos os 'includes' de user em amizades sejam consistentes.
     */
    const userSelectFields = {
        id: true,
        username: true,
        score: true,      // <-- Adicionado: Necessário para o perfil do amigo e ranking
        createdAt: true,  // <-- Adicionado: Necessário para "Membro desde"
        // Adicione outros campos do User que você precisa aqui (e.g., avatar, email)
    };

    /**
     * Envia uma solicitação de amizade.
     * @param {string} requesterId - ID do usuário que envia a solicitação.
     * @param {string} addresseeId - ID do usuário que recebe a solicitação.
     * @returns {Promise<object>} A solicitação de amizade criada.
     */
    const sendFriendRequest = async (requesterId, addresseeId) => {
        if (requesterId === addresseeId) {
            throw new Error("Você não pode enviar uma solicitação de amizade para si mesmo.");
        }

        const existingFriendship = await prisma.friendship.findFirst({
            where: {
                OR: [
                    { requesterId: requesterId, addresseeId: addresseeId, status: FriendshipStatus.ACCEPTED },
                    { requesterId: addresseeId, addresseeId: requesterId, status: FriendshipStatus.ACCEPTED },
                ],
            },
        });

        if (existingFriendship) {
            throw new Error("Vocês já são amigos.");
        }

        const existingPendingRequest = await prisma.friendship.findUnique({
            where: {
                requesterId_addresseeId: {
                    requesterId: requesterId,
                    addresseeId: addresseeId,
                },
                status: FriendshipStatus.PENDING,
            },
        });

        if (existingPendingRequest) {
            throw new Error("Você já enviou uma solicitação para este usuário. Aguardando resposta.");
        }

        const inversePendingRequest = await prisma.friendship.findUnique({
            where: {
                requesterId_addresseeId: {
                    requesterId: addresseeId,
                    addresseeId: requesterId,
                },
                status: FriendshipStatus.PENDING,
            },
        });

        if (inversePendingRequest) {
            console.log(`[FriendshipLogic] Solicitação inversa encontrada. Aceitando automaticamente para ${requesterId} e ${addresseeId}.`);
            return acceptFriendRequest(requesterId, addresseeId); // requesterId é o addressee da solicitação inversa
        }

        const friendRequest = await prisma.friendship.create({
            data: {
                requesterId: requesterId,
                addresseeId: addresseeId,
                status: FriendshipStatus.PENDING,
            },
            include: {
                requester: { select: { id: true, username: true } },
                addressee: { select: { id: true, username: true } },
            },
        });

        const addresseeSocketData = onlineUsers.get(addresseeId);
        if (addresseeSocketData && addresseeSocketData.socketId) {
            io.to(addresseeSocketData.socketId).emit("friendship:request_received", {
                friendshipId: friendRequest.id,
                requesterId: requesterId,
                requesterUsername: friendRequest.requester.username,
                message: `${friendRequest.requester.username} enviou uma solicitação de amizade!`,
            });
            console.log(`[FriendshipLogic] Notificação de amizade enviada para ${addresseeSocketData.username}.`);
        }

        return friendRequest;
    };

    /**
     * Aceita uma solicitação de amizade.
     * @param {string} userId - ID do usuário que está aceitando.
     * @param {string} requesterId - ID do usuário que enviou a solicitação.
     * @returns {Promise<object>} A solicitação de amizade atualizada.
     */
    const acceptFriendRequest = async (userId, requesterId) => {
        const friendship = await prisma.friendship.findFirst({
            where: {
                OR: [
                    { requesterId: requesterId, addresseeId: userId, status: FriendshipStatus.PENDING },
                    { requesterId: userId, addresseeId: requesterId, status: FriendshipStatus.PENDING }, // Caso de solicitação inversa
                ],
            },
            include: {
                requester: { select: { id: true, username: true } },
                addressee: { select: { id: true, username: true } },
            },
        });

        if (!friendship) {
            throw new Error("Solicitação de amizade não encontrada ou já processada.");
        }

        const updatedFriendship = await prisma.friendship.update({
            where: { id: friendship.id },
            data: { status: FriendshipStatus.ACCEPTED },
            include: {
                requester: { select: { id: true, username: true } },
                addressee: { select: { id: true, username: true } },
            },
        });

        const user1SocketData = onlineUsers.get(updatedFriendship.requesterId);
        const user2SocketData = onlineUsers.get(updatedFriendship.addresseeId);

        if (user1SocketData && user1SocketData.socketId) {
            io.to(user1SocketData.socketId).emit("friendship:accepted", {
                friendshipId: updatedFriendship.id,
                friendId: updatedFriendship.addresseeId,
                friendUsername: updatedFriendship.addressee.username,
                message: `Agora você é amigo(a) de ${updatedFriendship.addressee.username}!`,
            });
        }
        if (user2SocketData && user2SocketData.socketId) {
            io.to(user2SocketData.socketId).emit("friendship:accepted", {
                friendshipId: updatedFriendship.id,
                friendId: updatedFriendship.requesterId,
                friendUsername: updatedFriendship.requester.username,
                message: `Agora você é amigo(a) de ${updatedFriendship.requester.username}!`,
            });
        }

        return updatedFriendship;
    };

    /**
     * Recusa uma solicitação de amizade.
     * @param {string} userId - ID do usuário que está recusando.
     * @param {string} requesterId - ID do usuário que enviou a solicitação.
     * @returns {Promise<void>}
     */
    const declineFriendRequest = async (userId, requesterId) => {
        const friendship = await prisma.friendship.findFirst({
            where: {
                requesterId: requesterId,
                addresseeId: userId,
                status: FriendshipStatus.PENDING,
            },
            include: {
                requester: { select: { id: true, username: true } },
                // Adicionado: Incluir o addressee para obter o username
                addressee: { select: { id: true, username: true } } 
            },
        });

        if (!friendship) {
            throw new Error("Solicitação de amizade não encontrada ou já processada.");
        }

        await prisma.friendship.update({
            where: { id: friendship.id },
            data: { status: FriendshipStatus.DECLINED },
        });

        const requesterSocketData = onlineUsers.get(requesterId);
        if (requesterSocketData && requesterSocketData.socketId) {
            io.to(requesterSocketData.socketId).emit("friendship:declined", {
                friendshipId: friendship.id,
                addresseeId: userId,
                addresseeUsername: friendship.addressee.username, // Agora addressee.username estará disponível
                message: `${friendship.addressee.username} recusou sua solicitação de amizade.`,
            });
        }
    };

    /**
     * Retorna todas as solicitações de amizade PENDING para um usuário.
     * @param {string} userId - ID do usuário.
     * @returns {Promise<Array>} Lista de solicitações recebidas.
     */
    const getPendingFriendRequests = async (userId) => {
        console.log(`[FriendshipLogic] Buscando solicitações pendentes para userId: ${userId}`); // Log para depuração
        try {
            const requests = await prisma.friendship.findMany({
                where: {
                    addresseeId: userId,
                    status: FriendshipStatus.PENDING,
                },
                include: {
                    requester: { select: userSelectFields }, // <-- Usando os campos selecionados comuns
                },
            });
            console.log(`[FriendshipLogic] Solicitações pendentes encontradas: ${requests.length}`); // Log para depuração
            return requests.map(req => ({
                id: req.id,
                requesterId: req.requesterId,
                requesterUsername: req.requester.username,
                requesterScore: req.requester.score, // <-- Adicionado: score do solicitante
                requesterCreatedAt: req.requester.createdAt, // <-- Adicionado: createdAt do solicitante
                createdAt: req.createdAt,
            }));
        } catch (error) {
            console.error(`[FriendshipLogic] Erro em getPendingFriendRequests para ${userId}:`, error); // Log de erro
            throw error;
        }
    };

    /**
     * Retorna a lista de amigos aceitos para um usuário.
     * @param {string} userId - ID do usuário.
     * @returns {Promise<Array>} Lista de amigos.
     */
    const getAcceptedFriends = async (userId) => {
        console.log(`[FriendshipLogic] Buscando amigos aceitos para userId: ${userId}`); // Log para depuração
        try {
            const friendships = await prisma.friendship.findMany({
                where: {
                    OR: [
                        { requesterId: userId, status: FriendshipStatus.ACCEPTED },
                        { addresseeId: userId, status: FriendshipStatus.ACCEPTED },
                    ],
                },
                include: {
                    requester: { select: userSelectFields }, // <-- Usando os campos selecionados comuns
                    addressee: { select: userSelectFields }, // <-- Usando os campos selecionados comuns
                },
            });

            console.log(`[FriendshipLogic] Amizades aceitas encontradas: ${friendships.length}`); // Log para depuração

            const friends = friendships.map(f => {
                const friendUser = f.requesterId === userId ? f.addressee : f.requester;
                const isOnline = onlineUsers.has(friendUser.id);
                return {
                    id: friendUser.id,
                    username: friendUser.username,
                    status: isOnline ? "Online" : "Offline", // Determina status baseado no onlineUsers
                    score: friendUser.score,      // <-- Adicionado: score do amigo
                    createdAt: friendUser.createdAt, // <-- Adicionado: createdAt do amigo
                    // Inclua quaisquer outros campos que você precisa no frontend aqui
                };
            });
            console.log(`[FriendshipLogic] Amigos aceitos formatados: ${friends.length} (ex: ${JSON.stringify(friends[0])})`); // Log detalhado
            return friends;
        } catch (error) {
            console.error(`[FriendshipLogic] Erro em getAcceptedFriends para ${userId}:`, error); // Log de erro
            throw error;
        }
    };


    return {
        sendFriendRequest,
        acceptFriendRequest,
        declineFriendRequest,
        getPendingFriendRequests,
        getAcceptedFriends,
        FriendshipStatus, // Exporta o enum para uso externo
    };
};

module.exports = setupFriendshipLogic;