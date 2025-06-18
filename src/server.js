// server.js
// Esta linha DEVE ser a primeira no arquivo.
require("dotenv").config({ path: "./.env" }); // Ajuste o caminho se necessário

console.log("JWT_SECRET carregado:", process.env.JWT_SECRET);

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin"); // <<< IMPORTANTE: Importe o firebase-admin SDK
// REMOVEMOS AXIOS, ele não é mais necessário para enviar FCM com firebase-admin.
// const axios = require('axios');

const authenticateToken = require("./authMiddleware");
const matchmaking = require("./matchmaking");
const { initGameLogic, activeGames } = require("./gameLogic");

const prisma = new PrismaClient();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Inicializa o gameLogic com a instância de io.
// gameLogicFunctions agora contém { startTimer, endGame, setupSocketEvents }
const gameLogicFunctions = initGameLogic(io);

// --- Configuração do Firebase Admin SDK ---
// O caminho para o arquivo JSON da sua conta de serviço.
// Certifique-se de que este caminho está CORRETO e o arquivo está SEGURO.
// Renomeie 'firebase-service-account.json' para o nome do seu arquivo real.
const serviceAccount = require("./firebase-service-account.json"); // <<< ATUALIZE O NOME DO ARQUIVO REAL AQUI!

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log("Firebase Admin SDK inicializado para notificações V1.");
// --- Fim da Configuração do Firebase Admin SDK ---

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error(
    "ERRO: JWT_SECRET não está definido! Verifique seu arquivo .env e o caminho no dotenv.config()."
  );
  process.exit(1);
}

app.use(express.json());

// --- Rotas RESTful ---

app.get("/", (req, res) => {
  res.send("Estudelab Quiz Backend está funcionando!");
});

app.get("/users", authenticateToken, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        score: true,
        createdAt: true,
      },
    });
    res.json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res
      .status(500)
      .json({ error: "Erro interno do servidor ao buscar usuários." });
  }
});

app.delete("/delete-users/:id", authenticateToken, async (req, res) => {
  const userId = req.params.id;

  if (req.user.userId !== userId) {
    return res
      .status(403)
      .json({ message: "Você não tem permissão para excluir este usuário." });
  }

  try {
    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });
    res.json({ message: "Usuário excluído com sucesso!", user: deletedUser });
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    res
      .status(500)
      .json({ error: "Erro interno do servidor ao excluir usuário." });
  }
});

app.post("/register", async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res
      .status(400)
      .json({ message: "E-mail, nome de usuário e senha são obrigatórios." });
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "E-mail ou nome de usuário já está em uso." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        score: 0,
        pushToken: null,
      },
    });

    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1y",
    });

    return res.status(201).json({
      message: "Usuário registrado e logado com sucesso!",
      token: token,
      userId: newUser.id,
      username: newUser.username,
      email: newUser.email,
      score: newUser.score,
    });
  } catch (error) {
    console.error("Erro no registro de usuário:", error);
    res
      .status(500)
      .json({ message: "Erro interno do servidor ao registrar usuário." });
  }
});

app.post("/login", async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res
      .status(400)
      .json({ message: "E-mail/Nome de usuário e senha são obrigatórios." });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }],
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Credenciais inválidas." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Credenciais inválidas." });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1y",
    });

    return res.status(200).json({
      message: "Login realizado com sucesso!",
      token: token,
      userId: user.id,
      username: user.username,
      email: user.email,
      score: user.score,
    });
  } catch (error) {
    console.error("Erro no login de usuário:", error);
    res
      .status(500)
      .json({ message: "Erro interno do servidor ao fazer login." });
  }
});

app.get("/profile", authenticateToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        score: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Perfil do usuário não encontrado." });
    }

    res.json(user);
  } catch (error) {
    console.error("Erro ao buscar perfil do usuário:", error);
    res
      .status(500)
      .json({ message: "Erro interno do servidor ao buscar perfil." });
  }
});

// --- NOVA ROTA: Obter Partidas Recentes de um Usuário ---
app.get("/matches/user/:userId/recent", authenticateToken, async (req, res) => {
  const targetUserId = req.params.userId;
  // Converte o limite de string para número, padrão 5
  const limit = parseInt(req.query.limit || '5', 10); 

  // Opcional: Verificação de autorização (se um usuário pode ver as partidas de outro)
  // if (req.user.userId !== targetUserId) {
  //   return res.status(403).json({ message: "Acesso negado: Você não pode ver as partidas de outros usuários." });
  // }

  try {
    // Lógica REAL: Buscar partidas do banco de dados usando Prisma
    const recentMatches = await prisma.match.findMany({
      where: {
        OR: [ // O usuário pode ser player1 ou player2
          { player1Id: targetUserId },
          { player2Id: targetUserId }
        ]
      },
      orderBy: {
        createdAt: 'desc' // Ordena pelas mais recentes
      },
      take: limit, // Limita o número de resultados
      // Você pode adicionar `select` aqui se quiser campos específicos
    });

    console.log(`Backend: Retornando ${recentMatches.length} partidas recentes para o usuário ${targetUserId}.`);
    // Envia os dados como JSON
    res.json(recentMatches); 

  } catch (error) {
    console.error(`Backend: Erro ao buscar partidas recentes para o usuário ${targetUserId}:`, error);
    // Envia uma resposta JSON de erro, não HTML
    res.status(500).json({ message: "Erro interno do servidor ao buscar partidas recentes." });
  }
});

app.post("/users/push-token", authenticateToken, async (req, res) => {
  const { token } = req.body;
  const userId = req.user.userId;

  if (!token) {
    return res
      .status(400)
      .json({ message: "Token de notificação é obrigatório." });
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { pushToken: token },
    });
    res
      .status(200)
      .json({ message: "Token de notificação salvo com sucesso." });
  } catch (error) {
    console.error("Erro ao salvar push token:", error);
    if (error.code === "P2002" && error.meta?.target?.includes("pushToken")) {
      console.warn(
        `Tentativa de atribuir FCM Token duplicado: ${token} para user ${userId}. Pode ser um token antigo de outro login.`
      );
      return res
        .status(409)
        .json({
          message: "Este token já está em uso ou é inválido para esta conta.",
        });
    }
    res.status(500).json({ message: "Erro interno do servidor." });
  }
});

app.get("/users/:userId", authenticateToken, async (req, res) => {
  const targetUserId = req.params.userId;

  try {
    const user = await prisma.user.findUnique({
      where: { id: targetUserId },
      select: {
        id: true,
        email: true,
        username: true,
        score: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Perfil do usuário não encontrado." });
    }
    res.json(user);
  } catch (error) {
    console.error(`Erro ao buscar perfil do usuário ${targetUserId}:`, error);
    res
      .status(500)
      .json({ message: "Erro interno do servidor ao buscar perfil do amigo." });
  }
});

app.get("/users-light", authenticateToken, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: req.user.userId,
        },
      },
      select: {
        id: true,
        username: true,
        score: true,
      },
      orderBy: {
        username: "asc",
      },
    });
    const usersWithStatus = users.map((user) => ({
      ...user,
      status: Math.random() > 0.5 ? "Online" : "Offline",
      avatar: "user-circle",
    }));
    res.json(usersWithStatus);
  } catch (error) {
    console.error("Erro ao buscar lista de usuários para amigos:", error);
    res
      .status(500)
      .json({ message: "Erro interno do servidor ao buscar lista de amigos." });
  }
});

app.get("/rank", authenticateToken, async (req, res) => {
  try {
    const topPlayers = await prisma.user.findMany({
      orderBy: {
        score: "desc",
      },
      take: 100,
      select: {
        id: true,
        username: true,
        score: true,
      },
    });
    res.json(topPlayers);
  } catch (error) {
    console.error("Erro ao buscar ranking:", error);
    res
      .status(500)
      .json({ message: "Erro interno do servidor ao buscar ranking." });
  }
});

const authorizeAdmin = async (req, res, next) => {
  if (!req.user || !req.user.userId) {
    return res
      .status(401)
      .json({
        message: "Informações de usuário não disponíveis após autenticação.",
      });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { username: true },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    if (user.username === "cleilsonalvino") {
      next();
    } else {
      res
        .status(403)
        .json({
          message:
            "Acesso negado. Apenas administradores podem enviar notificações.",
        });
    }
  } catch (error) {
    console.error("Erro na verificação de admin:", error);
    res
      .status(500)
      .json({
        message:
          "Erro interno do servidor ao verificar permissões de administrador.",
      });
  }
};

// --- O NOVO ENDPOINT: Enviar Notificações (Usando Firebase Admin SDK) ---
app.post(
  "/admin/send-notification",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    const { title, body, data } = req.body;

    if (!title || !body) {
      return res
        .status(400)
        .json({ message: "Título e corpo da notificação são obrigatórios." });
    }

    try {
      const usersWithTokens = await prisma.user.findMany({
        where: {
          pushToken: {
            not: null,
            not: "",
          },
        },
        select: {
          pushToken: true,
        },
      });

      const registrationTokens = usersWithTokens
        .map((user) => user.pushToken)
        .filter(Boolean);

      if (registrationTokens.length === 0) {
        console.log(
          "Nenhum dispositivo encontrado com pushToken para enviar a notificação."
        );
        return res
          .status(200)
          .json({
            message: "Nenhum dispositivo registrado para receber notificações.",
          });
      }

      const message = {
        notification: {
          title: title,
          body: body,
          ...(data && data.image ? { image: data.image } : {}),
        },
        data: data || {},
      };

      // >>> CORREÇÃO AQUI: Use sendEachForMulticast ou sendAll <<<
      // sendEachForMulticast é o mais recomendado, pois lida melhor com erros individuais
      // e é mais moderno.
      const response = await admin.messaging().sendEachForMulticast({
        ...message, // Copia title, body, data
        tokens: registrationTokens, // Adiciona os tokens
      });

      console.log(
        "Notificação enviada com sucesso pelo Admin SDK:",
        response.successCount,
        "sucessos,",
        response.failureCount,
        "falhas."
      );

      if (response.failureCount > 0) {
        console.warn(
          `FCM (Admin SDK): ${response.failureCount} notificações falharam.`
        );
        response.responses.forEach((resp, idx) => {
          if (!resp.success) {
            const failedToken = registrationTokens[idx];
            const errorMessage = resp.error?.message || "Erro desconhecido";
            console.error(
              `Falha ao enviar para token ${failedToken}: ${errorMessage}`
            );
            // Lógica opcional para remover tokens inválidos
          }
        });
      }

      res.status(200).json({
        message: `Notificação enviada com sucesso para ${response.successCount} dispositivo(s).`,
        fcmResult: response,
      });
    } catch (error) {
      console.error(
        "Erro ao enviar notificação via Firebase Admin SDK:",
        error
      );
      res
        .status(500)
        .json({
          message:
            "Erro interno do servidor ao processar o envio da notificação.",
        });
    }
  }
);

// 2. Inicializa o MATCHMAKING com `io` e as funções de lógica do jogo.
// Isto retorna a função `handleConnection` que usaremos para cada novo socket.
const handleConnection = matchmaking(io, gameLogicFunctions);
// --- Lógica do Socket.io ---
io.on("connection", handleConnection);

// Inicia o servidor Express e Socket.io
server.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});
