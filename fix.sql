-- DropForeignKey
ALTER TABLE "Perguntas" DROP CONSTRAINT "Perguntas_userId_fkey";

-- DropForeignKey
ALTER TABLE "Perguntas" DROP CONSTRAINT "Perguntas_categoriaPerguntasId_fkey";

-- DropIndex
DROP INDEX "User_googleId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "googleId";

-- DropTable
DROP TABLE "Perguntas";

-- DropTable
DROP TABLE "CategoriaPerguntas";

