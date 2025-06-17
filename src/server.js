// server.js
// Esta linha DEVE ser a primeira no arquivo.
require('dotenv').config({ path: './.env' }); // Ajuste o caminho se necessário

console.log("JWT_SECRET carregado:", process.env.JWT_SECRET);


const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs'); // Lembre-se de importar bcryptjs
const jwt = require('jsonwebtoken'); // Lembre-se de importar jsonwebtoken
const axios = require('axios'); // <<-- Adicionado: Para fazer requisições HTTP para o FCM

const authenticateToken = require('./authMiddleware'); // Importa o middleware de autenticação
const matchmaking = require('./matchmaking'); // Importa o módulo de matchmaking
const { initGameLogic, activeGames } = require('./gameLogic'); // Importa initGameLogic e activeGames

const prisma = new PrismaClient();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Inicializa o gameLogic com a instância de io.
// gameLogicFunctions agora contém { startTimer, endGame, setupSocketEvents }
const gameLogicFunctions = initGameLogic(io);

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET; // JWT_SECRET será acessado via process.env no authenticateToken

if (!JWT_SECRET) {
  console.error('ERRO: JWT_SECRET não está definido! Verifique seu arquivo .env e o caminho no dotenv.config().');
  process.exit(1);
}

app.use(express.json());

// --- Rotas RESTful ---

app.get('/', (req, res) => {
  res.send('Estudelab Quiz Backend está funcionando!');
});

app.get('/users', authenticateToken, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        score: true,
        createdAt: true,
      }
    });
    res.json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao buscar usuários.' });
  }
});

app.delete('/delete-users/:id', authenticateToken, async (req, res) => {
  const userId = req.params.id;

  // Garanta que apenas administradores ou o próprio usuário podem deletar
  // Aqui, você pode adicionar a mesma lógica de `authorizeAdmin` se quiser que só o admin delete
  // Ou permitir que o usuário delete a si mesmo:
  if (req.user.userId !== userId) {
    return res.status(403).json({ message: 'Você não tem permissão para excluir este usuário.' });
  }

  try {
    const deletedUser = await prisma.user.delete({
      where: { id: userId }
    });
    res.json({ message: 'Usuário excluído com sucesso!', user: deletedUser });
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao excluir usuário.' });
  }
}
);

app.post('/register', async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: 'E-mail, nome de usuário e senha são obrigatórios.' });
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { username: username }
        ]
      }
    });

    if (existingUser) {
      return res.status(409).json({ message: 'E-mail ou nome de usuário já está em uso.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      }
    });

    return res.status(201).json({ message: 'Usuário registrado com sucesso! Faça login para continuar.' });

  } catch (error) {
    console.error('Erro no registro de usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao registrar usuário.' });
  }
});

app.post('/login', async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ message: 'E-mail/Nome de usuário e senha são obrigatórios.' });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { username: identifier }
        ]
      }
    });

    if (!user) {
      return res.status(400).json({ message: 'Credenciais inválidas.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Credenciais inválidas.' });
    }

    // O JWT_SECRET é acessado diretamente de process.env pelo jwt.sign e jwt.verify
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1y' });

    return res.status(200).json({
      message: 'Login realizado com sucesso!',
      token: token,
      userId: user.id,
      username: user.username,
      email: user.email,
      score: user.score
    });

  } catch (error) {
    console.error('Erro no login de usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao fazer login.' });
  }
});

app.get('/profile', authenticateToken, async (req, res) => {
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
        // Adicione aqui outros campos que você quiser retornar para o perfil,
        // como quizzesPlayed, wins, losses, favoriteCategory, etc., se existirem no seu modelo User.
        // O campo pushToken não precisa ser retornado aqui, pois é interno para notificações.
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'Perfil do usuário não encontrado.' });
    }

    res.json(user);
  } catch (error) {
    console.error('Erro ao buscar perfil do usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao buscar perfil.' });
  }
});

// --- ROTA EXISTENTE: Salvar/Atualizar push token ---
app.post('/users/push-token', authenticateToken, async (req, res) => {
  const { token } = req.body;
  const userId = req.user.userId; // Obtido do middleware de autenticação

  if (!token) {
    return res.status(400).json({ message: "Token de notificação é obrigatório." });
  }

  try {
    // Atualiza o pushToken do usuário.
    // Se o token já existe e é de outro usuário, o `@unique` no Prisma vai tratar isso.
    // Uma abordagem mais robusta para `unique` em `pushToken` pode envolver
    // primeiro buscar se o token já está atribuído a alguém diferente do `userId` atual
    // e, se sim, remover a atribuição anterior antes de atualizar.
    // Por simplicidade, o Prisma lidará com a violação de unique constraint.
    await prisma.user.update({
      where: { id: userId },
      data: { pushToken: token }
    });
    res.status(200).json({ message: "Token de notificação salvo com sucesso." });
  } catch (error) {
    console.error("Erro ao salvar push token:", error);
    // Se o erro for de unique constraint, pode ser que o token já esteja associado a outro usuário.
    if (error.code === 'P2002' && error.meta?.target?.includes('pushToken')) {
        console.warn(`Tentativa de atribuir FCM Token duplicado: ${token} para user ${userId}. Pode ser um token antigo de outro login.`);
        return res.status(409).json({ message: 'Este token já está em uso ou é inválido para esta conta.' });
    }
    res.status(500).json({ message: "Erro interno do servidor." });
  }
});


// --- NOVA ROTA: Obter perfil de um usuário específico por ID (para modal de amigo) ---
app.get('/users/:userId', authenticateToken, async (req, res) => {
  const targetUserId = req.params.userId; // ID do usuário que queremos buscar

  try {
    const user = await prisma.user.findUnique({
      where: { id: targetUserId },
      select: {
        id: true,
        email: true,
        username: true,
        score: true,
        createdAt: true,
        // Adicione outros campos de perfil que você quer exibir do amigo
        // Ex: quizzesPlayed, wins, losses, favoriteCategory (se tiver no modelo User)
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'Perfil do usuário não encontrado.' });
    }
    res.json(user);
  } catch (error) {
    console.error(`Erro ao buscar perfil do usuário ${targetUserId}:`, error);
    res.status(500).json({ message: 'Erro interno do servidor ao buscar perfil do amigo.' });
  }
});

// --- NOVA ROTA: Listar usuários para a tela de amigos (simulação de "amigos em potencial") ---
app.get('/users-light', authenticateToken, async (req, res) => {
  try {
    // Retorna uma lista de usuários com informações básicas para a tela de amigos
    // Exclui o próprio usuário logado da lista
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: req.user.userId // Exclui o usuário logado
        }
      },
      select: {
        id: true,
        username: true,
        score: true, // Pontuação pode ser útil na lista de amigos
        // status: true // Se você adicionar um campo 'status' (online/offline) no User model
      },
      orderBy: {
        username: 'asc' // Ordena por nome de usuário para simular
      }
    });
    // Para simular o status 'Online'/'Offline'
    const usersWithStatus = users.map(user => ({
      ...user,
      status: Math.random() > 0.5 ? 'Online' : 'Offline', // Simula status
      avatar: 'user-circle' // Ícone padrão
    }));
    res.json(usersWithStatus);
  } catch (error) {
    console.error('Erro ao buscar lista de usuários para amigos:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao buscar lista de amigos.' });
  }
});


app.get('/rank', authenticateToken, async (req, res) => {
  try {
    const topPlayers = await prisma.user.findMany({
      orderBy: {
        score: 'desc', // Ordena por pontuação em ordem decrescente
      },
      take: 100, // Limita aos 100 melhores jogadores (ou o que você preferir)
      select: { // Seleciona apenas os campos necessários para o ranking
        id: true,
        username: true,
        score: true,
      }
    });
    res.json(topPlayers);
  } catch (error) {
    console.error('Erro ao buscar ranking:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao buscar ranking.' });
  }
});


// --- NOVO MIDDLEWARE DE AUTORIZAÇÃO (Admin Check) ---
// Este foi movido para antes de seu uso, para organização.
const authorizeAdmin = async (req, res, next) => {
  // `req.user` deve ter sido populado pelo `authenticateToken`
  if (!req.user || !req.user.userId) { // Assegura que temos o ID do usuário do token
    return res.status(401).json({ message: 'Informações de usuário não disponíveis após autenticação.' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { username: true } // Busque apenas o username, para otimizar
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Verifica se o username do usuário logado é 'cleilsonalvino'
    // IMPORTANTE: Se o seu `username` no DB é case-sensitive, considere `user.username.toLowerCase() === 'cleilsonalvino'.toLowerCase()`
    if (user.username === 'cleilsonalvino') {
      next(); // Permite que a requisição continue
    } else {
      res.status(403).json({ message: 'Acesso negado. Apenas administradores podem enviar notificações.' });
    }
  } catch (error) {
    console.error("Erro na verificação de admin:", error);
    res.status(500).json({ message: "Erro interno do servidor ao verificar permissões de administrador." });
  }
};


// --- O NOVO ENDPOINT: Enviar Notificações ---
app.post('/admin/send-notification', authenticateToken, authorizeAdmin, async (req, res) => {
  const { title, body, data } = req.body; // 'data' são os dados personalizados do frontend
  const FCM_SERVER_KEY = process.env.FCM_SERVER_KEY; // Sua chave do servidor FCM do .env

  if (!FCM_SERVER_KEY) {
    console.error("FCM_SERVER_KEY não configurada nas variáveis de ambiente!");
    return res.status(500).json({ message: "Erro de configuração: Chave do servidor de notificações não encontrada." });
  }

  if (!title || !body) {
    return res.status(400).json({ message: "Título e corpo da notificação são obrigatórios." });
  }

  try {
    // 1. Obter todos os pushTokens válidos do banco de dados
    const usersWithTokens = await prisma.user.findMany({
      where: {
        pushToken: {
          not: null, // Apenas usuários que têm um token
          not: ''    // E que não seja vazio
        }
      },
      select: {
        pushToken: true
      }
    });

    // Extrai apenas os tokens e filtra quaisquer valores falsy (como null ou undefined)
    const registrationTokens = usersWithTokens.map(user => user.pushToken).filter(Boolean);

    if (registrationTokens.length === 0) {
      console.log("Nenhum dispositivo encontrado com pushToken para enviar a notificação.");
      return res.status(200).json({ message: "Nenhum dispositivo registrado para receber notificações." });
    }

    // 2. Preparar o payload da notificação para a API do FCM
    const fcmMessage = {
      notification: {
        title: title,
        body: body,
      },
      data: data || {}, // Inclui os dados personalizados enviados do frontend
    };

    // FCM permite enviar para múltiplos tokens (até 500 por requisição)
    // Se você tiver mais de 500, você precisaria de uma lógica de lotes aqui.
    // Para a maioria dos casos iniciais, enviar tudo de uma vez é suficiente.
    const fcmResponse = await axios.post(
      'https://fcm.googleapis.com/fcm/send',
      {
        registration_ids: registrationTokens, // Envia para múltiplos tokens
        ...fcmMessage // Mescla o objeto de notificação e dados
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `key=${FCM_SERVER_KEY}`, // Autorização com sua chave secreta
        },
      }
    );

    // A resposta do FCM contém detalhes sobre o sucesso/falha de cada token
    console.log('Resposta detalhada do FCM:', fcmResponse.data);

    const successCount = fcmResponse.data.success;
    const failureCount = fcmResponse.data.failure;

    if (failureCount > 0) {
      // Se houver falhas, você pode querer logar mais detalhes
      console.warn(`FCM: ${failureCount} notificações falharam.`);
      // Opcional: Lógica para remover tokens inválidos do DB, se houver falhas de "NotRegistered"
    }

    res.status(200).json({
      message: `Notificação enviada com sucesso para ${successCount} dispositivo(s).`,
      details: fcmResponse.data // Envia a resposta completa do FCM de volta ao frontend para depuração
    });

  } catch (error) {
    console.error("Erro ao enviar notificação via FCM:", error.response ? error.response.data : error.message);
    res.status(500).json({ message: "Erro ao processar o envio da notificação." });
  }
});

// 2. Inicializa o MATCHMAKING com `io` e as funções de lógica do jogo.
// Isto retorna a função `handleConnection` que usaremos para cada novo socket.
const handleConnection = matchmaking(io, gameLogicFunctions);
// --- Lógica do Socket.io ---
io.on('connection', handleConnection);

// Inicia o servidor Express e Socket.io
server.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});