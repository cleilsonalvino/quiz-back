// routes/notificationRoutes.js

const express = require('express');
const router = express.Router();
const authenticateToken = require('../authMiddleware'); // Middleware de autenticação

// Usamos injeção de dependência para passar o 'prisma'
module.exports = function(prisma) {

    /**
     * Rota para o app React Native registrar ou atualizar o Push Token de um usuário.
     * Esta rota é essencial para que o Firebase saiba para quem enviar as notificações.
     * Ela precisa ser autenticada para sabermos de QUAL usuário estamos salvando o token.
     */
    router.post('/register-token', authenticateToken, async (req, res) => {
        const { token } = req.body;
        const userId = req.user.userId; // ID do usuário vem do token JWT

        if (!token) {
            return res.status(400).json({ message: "Push token não foi fornecido." });
        }

        try {
            // ✅ CORREÇÃO: Usando uma transação para garantir a consistência dos dados
            await prisma.$transaction(async (tx) => {
                // 1. Remove o token de qualquer OUTRO utilizador que o possa ter.
                // Isto "liberta" o token para que possa ser usado pelo utilizador atual.
                await tx.user.updateMany({
                    where: {
                        pushToken: token,
                        id: {
                            not: userId, // Não afeta o utilizador atual
                        },
                    },
                    data: {
                        pushToken: null, // Define o token do utilizador antigo como nulo
                    },
                });

                // 2. Atualiza o token para o utilizador atual.
                await tx.user.update({
                    where: { id: userId },
                    data: { pushToken: token },
                });
            });
            
            console.log(`Push token do usuário ${userId} foi salvo/atualizado com sucesso.`);
            res.status(200).json({ message: "Token registrado com sucesso." });

        } catch (error) {
            console.error("Erro ao salvar o push token:", error);
            res.status(500).json({ message: "Erro interno ao registrar o token." });
        }
    });

    return router;
};
