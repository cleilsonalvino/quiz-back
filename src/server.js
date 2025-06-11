// server.js
// Esta linha DEVE ser a primeira no arquivo.
require('dotenv').config({ path: '../.env' }); // Ajuste o caminho se necessário

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs'); // Lembre-se de importar bcryptjs
const jwt = require('jsonwebtoken'); // Lembre-se de importar jsonwebtoken

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
const JWT_SECRET = process.env.JWT_SECRET;

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

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

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



// --- Lógica do Socket.io ---
io.on('connection', (socket) => {
  console.log('Um usuário conectado via Socket.io:', socket.id);

  // === IMPORTANTE: Configura os eventos de jogo para ESTE socket ===
  gameLogicFunctions.setupSocketEvents(socket); // <--- ESTA LINHA CONFIGURA TODOS OS LISTENERS DE JOGO

  // Inicializa os eventos de matchmaking para o socket
  matchmaking(io, socket, gameLogicFunctions); // Passa gameLogicFunctions para o matchmaking
  

  socket.on('disconnect', () => {
    console.log('Usuário desconectado via Socket.io:', socket.id);
    // A lógica de desconexão para remover o jogador da partida já está no matchmaking.js
  });
});

// Inicia o servidor Express e Socket.io
server.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
  console.log(`Acesse: http://192.168.0.4:${PORT}`);
});