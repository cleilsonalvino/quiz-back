const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

if (!global.prisma) {
  global.prisma = new PrismaClient({
    adapter,
  });
}

module.exports = global.prisma;