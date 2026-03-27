const prisma = require('../prisma/prismaClient');

function initializeChat(io) {
  io.on('connection', (socket) => {
    console.log('🔹 Usuário conectado:', socket.id);

    socket.join(socket.userId); // entra na sala do próprio usuário

    // Envio de mensagem privada
    socket.on('private:message', async ({ from, to, message }) => {
      if (!from || !to || !message) return;

      console.log('SMS',message)

      try {
        const newMessage = await prisma.message.create({
          data: { fromUserId: from, toUserId: to, message },
        });

        // Notifica remetente e destinatário
        socket.emit('private message', newMessage); // remetente
        socket.to(to).emit('private message', newMessage); // destinatário
      } catch (err) {
        console.error('❌ Erro ao enviar mensagem privada:', err);
      }
    });

    // Mensagem visualizada
    socket.on('view message', async (messageId) => {
      try {
        const msg = await prisma.message.update({
          where: { id: messageId },
          data: { viewed: true },
        });
        socket.to(msg.fromUserId).emit('message viewed', msg.id);
      } catch (err) {
        console.error('❌ Erro ao marcar mensagem como visualizada:', err);
      }
    });

    // Mensagem respondida
    socket.on('reply message', async (messageId) => {
      try {
        const msg = await prisma.message.update({
          where: { id: messageId },
          data: { replied: true },
        });
        socket.to(msg.fromUserId).emit('message replied', msg.id);
      } catch (err) {
        console.error('❌ Erro ao marcar mensagem como respondida:', err);
      }
    });

    socket.on('disconnect', () => {
      console.log('🔹 Usuário desconectado:', socket.id);
    });
  });
}

module.exports = { initializeChat };
