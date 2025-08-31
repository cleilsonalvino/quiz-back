// Esta linha DEVE ser a primeira no arquivo.
require("dotenv").config({ path: "./.env" }); // Ajuste o caminho se necessário

const admin = require("firebase-admin");
const { getMessaging } = require('firebase-admin/messaging');

// Garanta que a inicialização acontece antes de qualquer rota ser definida
const serviceAccount = require("./firebase-service-account.json"); 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


console.log("Firebase Admin SDK inicializado com sucesso.");

console.log("Firebase Admin SDK inicializado com sucesso.");

console.log("JWT_SECRET carregado:", process.env.JWT_SECRET);
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// REMOVIDO: const admin = require("firebase-admin"); // Não mais necessário
const multer = require("multer");
const {
  requestPasswordResetCode,
  resetPassword,
} = require("./src/services/updatePass"); // Ajuste o caminho

// Diretório onde as imagens de perfil serão armazenadas
const profileImagesDir = path.join(__dirname, "uploads", "profile-images");

if (!fs.existsSync(profileImagesDir)) {
  fs.mkdirSync(profileImagesDir, { recursive: true });
}

// Configuração de armazenamento do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, profileImagesDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);

    const username = req.user.username || "unknown-user";

    cb(
      null,
      `${username
        .replace(/\s+/g, "_")
        .toLowerCase()}-${uniqueSuffix}${fileExtension}`
    );
  },
});

// Filtro de arquivos para aceitar apenas imagens (JPEG, PNG, GIF)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Apenas arquivos de imagem são permitidos!"), false);
  }
};

// Configura a instância do Multer com as opções definidas
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limite de 5MB por arquivo (exemplo)
  },
});

const authenticateToken = require("./authMiddleware");
const matchmakingModule = require("./matchmaking");
const onlineUsers = matchmakingModule.onlineUsers;
const matchmaking = matchmakingModule.matchmaking;
const { initGameLogic, activeGames } = require("./gameLogic");
const setupFriendshipLogic = require("./friendshipLogic");
const { initializeChat } = require('./chat');

const prisma = new PrismaClient();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const notificationRoutes = require("./routes/sendNotification")(prisma);

// Inicializa o gameLogic com a instância de io.
const gameLogicFunctions = initGameLogic(io);

const PORT = process.env.PORT || 3005;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error(
    "ERRO: JWT_SECRET não está definido! Verifique seu arquivo .env e o caminho no dotenv.config()."
  );
  process.exit(1);
}

const friendshipLogic = setupFriendshipLogic(io, prisma, onlineUsers);

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/notifications", notificationRoutes); // ✅ monta o prefixo correto

// --- Rotas RESTful ---



app.get("/", (req, res) => {
  res.send("Estudelab Quiz Backend está funcionando!");
});

// Rota para enviar a notificação (versão correta e moderna)
app.post('/send-notification', authenticateToken, async (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(400).json({ message: "title e body são obrigatórios." });
  }

  try {
    // 1. Busca os tokens no banco de dados
    const usersWithTokens = await prisma.user.findMany({
      where: { pushToken: { not: null } },
      select: { pushToken: true },
    });

    const tokens = usersWithTokens.map(u => u.pushToken);

    if (tokens.length === 0) {
      return res.status(404).json({ message: "Nenhum token disponível para envio." });
    }

    // 2. Monta a mensagem de DADOS para que o Notifee funcione
    const message = {
      data: {
        title,
        body,
      },
      tokens: tokens,
    };

    // 3. Envia a notificação usando o SDK Admin
    const response = await getMessaging().sendEachForMulticast(message);

    console.log(`${response.successCount} notificações enviadas com sucesso.`);
    res.json({
        message: "Notificação enviada com sucesso!",
        successCount: response.successCount,
        failureCount: response.failureCount
    });

  } catch (error) {
    console.error("Erro ao enviar notificação via SDK:", error);
    res.status(500).json({ message: "Erro interno." });
  }
});

app.post("invite-match-notification", authenticateToken, async (req, res) => {
  const { title, body, token } = req.body;
  if (!title || !body || !token) {
    return res.status(400).json({ message: "title, body e token são obrigatórios." });
  }
  try {
    const message = {
      data: {
        title,
        body,
      },
      token: token, // Envia para um único token
    };
    const response = await getMessaging().send(message);
    console.log(`Notificação enviada com sucesso: ${response}`);  
    res.json({ message: "Notificação enviada com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar notificação:", error);
    res.status(500).json({ message: "Erro interno ao enviar notificação." });
  }
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

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1y",
      }
    );

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

  console.log(
    `Backend: Buscando perfil e estatísticas para o usuário autenticado: ${userId}`
  );

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        score: true,
        createdAt: true,
        profileImage: true,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Perfil do usuário não encontrado." });
    }

    const quizzesPlayed = await prisma.match.count({
      where: {
        OR: [{ player1Id: userId }, { player2Id: userId }],
      },
    });

    const wins = await prisma.match.count({
      where: {
        OR: [
          {
            player1Id: userId,
            player1Score: { gt: prisma.match.fields.player2Score },
          },
          {
            player2Id: userId,
            player2Score: { gt: prisma.match.fields.player1Score },
          },
        ],
      },
    });

    const losses = await prisma.match.count({
      where: {
        OR: [
          {
            player1Id: userId,
            player1Score: { lt: prisma.match.fields.player2Score },
          },
          {
            player2Id: userId,
            player2Score: { lt: prisma.match.fields.player1Score },
          },
        ],
      },
    });

    const userMatches = await prisma.match.findMany({
      where: {
        OR: [{ player1Id: userId }, { player2Id: userId }],
      },
      select: {
        category: true,
      },
    });

    const categoryCounts = userMatches.reduce((acc, match) => {
      acc[match.category] = (acc[match.category] || 0) + 1;
      return acc;
    }, {});

    let favoriteCategory = null;
    let maxCount = 0;
    for (const category in categoryCounts) {
      if (categoryCounts[category] > maxCount) {
        maxCount = categoryCounts[category];
        favoriteCategory = category;
      }
    }

    const profileData = {
      ...user,
      quizzesPlayed: quizzesPlayed,
      wins: wins,
      losses: losses,
      favoriteCategory: favoriteCategory,
    };

    console.log(
      `Backend: Perfil e estatísticas retornados para ${user.username}`
    );
    res.json(profileData);
  } catch (error) {
    console.error(
      `Backend: Erro ao buscar perfil para o usuário ${userId}:`,
      error
    );
    res
      .status(500)
      .json({ message: "Erro interno do servidor ao buscar perfil." });
  }
});

app.post(
  "/profile/upload-image",
  authenticateToken,
  upload.single("profileImage"),
  async (req, res) => {
    const userId = req.user.userId;

    if (!req.file) {
      return res.status(400).json({ message: "Nenhuma imagem foi enviada." });
    }

    const imagePath = `/uploads/profile-images/${req.file.filename}`;

    console.log(
      `Backend: Imagem recebida e salva em: ${imagePath} para o usuário ${userId}`
    );

    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          profileImage: imagePath,
        },
        select: {
          id: true,
          username: true,
          profileImage: true,
        },
      });

      console.log(
        `Backend: Perfil do usuário ${userId} atualizado com nova imagem: ${imagePath}`
      );
      res.status(200).json({
        message: "Imagem de perfil atualizada com sucesso!",
        profileImage: updatedUser.profileImage,
      });
    } catch (error) {
      console.error(
        `Backend: Erro ao atualizar imagem de perfil para o usuário ${userId}:`,
        error
      );
      fs.unlink(req.file.path, (err) => {
        if (err)
          console.error(
            "Erro ao deletar arquivo de imagem após falha no DB:",
            err
          );
      });
      res
        .status(500)
        .json({
          message: "Erro interno do servidor ao salvar a imagem de perfil.",
        });
    }
  }
);

app.post("/forgot-password/request-code", async (req, res) => {
  const { identifier } = req.body;
  const result = await requestPasswordResetCode(identifier);
  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(400).json({ message: result.message });
  }
});

app.post("/forgot-password/reset-password", async (req, res) => {
  const { identifier, code, newPassword } = req.body;
  const result = await resetPassword(identifier, code, newPassword);
  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(400).json({ message: result.message });
  }
});

app.post("/friends/request", authenticateToken, async (req, res) => {
  const { friendId } = req.body;
  const requesterId = req.user.userId;
  try {
    const request = await friendshipLogic.sendFriendRequest(
      requesterId,
      friendId
    );
    res.status(201).json(request);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/friends/accept", authenticateToken, async (req, res) => {
  const { requesterId } = req.body;
  const userId = req.user.userId;
  try {
    const friendship = await friendshipLogic.acceptFriendRequest(
      userId,
      requesterId
    );
    res.json(friendship);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/friends/decline", authenticateToken, async (req, res) => {
  const { requesterId } = req.body;
  const userId = req.user.userId;
  try {
    await friendshipLogic.declineFriendRequest(userId, requesterId);
    res.json({ message: "Solicitação recusada com sucesso." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/friends/requests", authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  try {
    const requests = await friendshipLogic.getPendingFriendRequests(userId);
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/friends/accepted", authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  try {
    const friends = await friendshipLogic.getAcceptedFriends(userId);
    res.json(friends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/friends/delete/:friendId", authenticateToken, async (req, res) => {
  const { friendId } = req.params;
  const currentUserId = req.user.userId;

  try {
    const friendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          {
            requesterId: currentUserId,
            addresseeId: friendId,
            status: "ACCEPTED",
          },
          {
            requesterId: friendId,
            addresseeId: currentUserId,
            status: "ACCEPTED",
          },
        ],
      },
    });

    if (!friendship) {
      return res
        .status(404)
        .json({ message: "Amizade não encontrada ou não aceita." });
    }

    await prisma.friendship.delete({
      where: {
        id: friendship.id,
      },
    });

    res.status(200).json({ message: "Amigo removido com sucesso." });
  } catch (error) {
    console.error(`Erro ao remover amigo ${friendId}:`, error);
    res
      .status(500)
      .json({ message: "Erro interno do servidor ao remover amigo." });
  }
});

app.get("/users/search", authenticateToken, async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res
      .status(400)
      .json({ message: "Parâmetro de busca 'query' é obrigatório." });
  }
  const currentUserId = req.user.userId;

  try {
    const users = await prisma.user.findMany({
      where: {
        username: {
          contains: query,
          mode: "insensitive",
        },
        id: {
          not: currentUserId,
        },
      },
      select: {
        id: true,
        username: true,
        score: true,
        status: true,
        profileImage: true,
      },
      take: 10,
    });
    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum usuário encontrado com este nome." });
    }
    res.json(users[0]);
  } catch (error) {
    console.error("Erro ao buscar usuário para adicionar amigo:", error);
    res
      .status(500)
      .json({ message: "Erro interno do servidor ao buscar usuário." });
  }
});

app.get(
  "/matches/user/:userId/history",
  authenticateToken,
  async (req, res) => {
    const targetUserId = req.params.userId;

    console.log(
      `Backend: Buscando histórico completo de partidas para o usuário ${targetUserId}`
    );

    try {
      const allMatches = await prisma.match.findMany({
        where: {
          OR: [{ player1Id: targetUserId }, { player2Id: targetUserId }],
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      console.log(
        `Backend: Retornando ${allMatches.length} partidas no histórico para o usuário ${targetUserId}.`
      );

      res.json(allMatches);
    } catch (error) {
      console.error(
        `Backend: Erro ao buscar histórico de partidas para o usuário ${targetUserId}:`,
        error
      );
      res.status(500).json({
        message: "Erro interno do servidor ao buscar histórico de partidas.",
      });
    }
  }
);

app.get("/users/:userId", authenticateToken, async (req, res) => {
  const targetUserId = req.params.userId;

  console.log(`Buscando perfil do usuário ${targetUserId}`);
  console.log(`Tipo do ID recebido: ${typeof targetUserId}`);

  try {
    const user = await prisma.user.findUnique({
      where: { id: targetUserId },
      select: {
        id: true,
        username: true,
        score: true,
        createdAt: true,
        profileImage: true,
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
        profileImage: true,
      },
      orderBy: {
        username: "asc",
      },
    });

    const usersWithStatus = users.map((user) => ({
      ...user,
      status: onlineUsers.has(user.id) ? "Online" : "Offline",
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
        profileImage: true,
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

app.get("/messages/:userId", authenticateToken, async (req, res) => {
  const { userId } = req.params;
  const currentUserId = req.user.userId;

  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            fromUserId: currentUserId,
            toUserId: userId,
          },
          {
            fromUserId: userId,
            toUserId: currentUserId,
          },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// GET /friends-with-unread
// GET /friends-with-unread
app.get("/friends-with-unread", authenticateToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    const friendsData = await friendshipLogic.getAcceptedFriends(userId);

    const friendsWithMessages = await Promise.all(
      friendsData.map(async (friend) => {
        const friendId = friend.requesterId === userId ? friend.addresseeId : friend.requesterId;

        const lastMessage = await prisma.message.findFirst({
          where: {
            OR: [
              { fromUserId: userId, toUserId: friendId },
              { fromUserId: friendId, toUserId: userId },
            ],
          },
          orderBy: { createdAt: "desc" },
        });

        const unreadMessages = await prisma.message.count({
          where: {
            fromUserId: friendId,
            toUserId: userId,
            viewed: false,
          },
        });

        return {
          ...friend,
          id: friendId, // garante que friend tenha id
          lastMessage: lastMessage?.message || null,
          unreadMessages,
        };
      })
    );

    res.json(friendsWithMessages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar amigos." });
  }
});




// POST /messages/mark-read/:friendId
app.post("/messages/mark-read/:friendId",authenticateToken, async (req, res) => {
  
  const userId = req.user.userId;
  const friendId = req.params.friendId;

  console.log("MENSAGEM LIDA", userId)
  

  try {
    await prisma.message.updateMany({
      where: {
        fromUserId: friendId,
        toUserId: userId,
        viewed: false,
      },
      data: { viewed: true },
    });
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao marcar mensagens como lidas." });
  }
});

// GET /messages/unread-count
app.get("/messages/unread-count", authenticateToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    const counts = await prisma.message.groupBy({
      by: ["fromUserId"],
      where: { toUserId: userId, viewed: false },
      _count: { id: true },
    });

    // Exemplo de resposta: [{ fromUserId: 2, _count: { id: 3 } }, ...]
    res.json(counts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar mensagens não lidas." });
  }
});



io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    console.warn(
      `[Socket.IO Auth] Conexão ${socket.id}: Token não fornecido. Desconectando.`
    );
    return next(new Error("Authentication error: Token not provided."));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.userId;
    socket.username = decoded.username;
    console.log(
      `[Socket.IO Auth] Conexão ${socket.id}: Usuário ${decoded.username} (${decoded.userId}) autenticado.`
    );
    next();
  } catch (error) {
    console.error(
      `[Socket.IO Auth] Conexão ${socket.id}: Erro na validação do token (${token}):`,
      error.message
    );
    return next(new Error("Authentication error: Invalid token."));
  }
});

// 2. Inicializa o MATCHMAKING com `io` e as funções de lógica do jogo.
// O 'admin' foi removido dos parâmetros, pois não é mais usado.
const handleConnection = matchmaking(
  io,
  gameLogicFunctions,
  prisma // 'prisma' ainda é passado se for usado em matchmaking.js
);

// --- Lógica do Socket.io ---
initializeChat(io);
io.on("connection", handleConnection);

//versionamento

app.get("/app-version", (req, res) => {
  res.json({
    latestVersion: "1.4", // Altere para a versão mais recente
    changelog: "📌 Chat Disponível\n🚀 Atualize o aplicativo e converse com seus amigos\n",
    // 💡 Adicione o campo updateUrl com o link correto da sua Play Store
    updateUrl:
      "https://play.google.com/store/apps/details?id=com.cleilsonalvino.quiz", // Exemplo para Android
    // Ou para iOS: "itms-apps://itunes.apple.com/app/idSEU_APP_ID"
  });
});

// Inicia o servidor Express e Socket.io
server.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});
