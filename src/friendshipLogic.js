// src/friendshipLogic.js

// FriendshipStatus para usar na lógica
const FriendshipStatus = {
    PENDING: 'PENDING',
    ACCEPTED: 'ACCEPTED',
    DECLINED: 'DECLINED',
    BLOCKED: 'BLOCKED',
};

const setupFriendshipLogic = (io, prisma, onlineUsers) => {

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

        // Verifica se já existe uma amizade aceita
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

        // Verifica se já existe uma solicitação PENDING na mesma direção
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
        
        // Verifica se já existe uma solicitação PENDING na direção inversa
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
            // Se já existe uma solicitação inversa, aceite-a automaticamente
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

        // Notificar o usuário se ele estiver online
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

        // Notificar ambos os usuários que a amizade foi aceita
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
            },
        });

        if (!friendship) {
            throw new Error("Solicitação de amizade não encontrada ou já processada.");
        }

        await prisma.friendship.update({
            where: { id: friendship.id },
            data: { status: FriendshipStatus.DECLINED },
        });

        // Notificar o remetente que a solicitação foi recusada
        const requesterSocketData = onlineUsers.get(requesterId);
        if (requesterSocketData && requesterSocketData.socketId) {
            io.to(requesterSocketData.socketId).emit("friendship:declined", {
                friendshipId: friendship.id,
                addresseeId: userId,
                addresseeUsername: friendship.addressee.username, // Precisaria buscar o nome do addressee
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
        const requests = await prisma.friendship.findMany({
            where: {
                addresseeId: userId,
                status: FriendshipStatus.PENDING,
            },
            include: {
                requester: { select: { id: true, username: true } },
            },
        });
        return requests.map(req => ({
            id: req.id,
            requesterId: req.requesterId,
            requesterUsername: req.requester.username,
            createdAt: req.createdAt,
        }));
    };

    /**
     * Retorna a lista de amigos aceitos para um usuário.
     * @param {string} userId - ID do usuário.
     * @returns {Promise<Array>} Lista de amigos.
     */
    const getAcceptedFriends = async (userId) => {
        const friendships = await prisma.friendship.findMany({
            where: {
                OR: [
                    { requesterId: userId, status: FriendshipStatus.ACCEPTED },
                    { addresseeId: userId, status: FriendshipStatus.ACCEPTED },
                ],
            },
            include: {
                requester: { select: { id: true, username: true } },
                addressee: { select: { id: true, username: true } },
            },
        });

        // Mapear para retornar apenas os dados do amigo, não da amizade
        const friends = friendships.map(f => {
            const friendUser = f.requesterId === userId ? f.addressee : f.requester;
            // Verifica o status online e adiciona
            const isOnline = onlineUsers.has(friendUser.id);
            return {
                id: friendUser.id,
                username: friendUser.username,
                status: isOnline ? "Online" : "Offline", // Determina status baseado no onlineUsers
            };
        });
        return friends;
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