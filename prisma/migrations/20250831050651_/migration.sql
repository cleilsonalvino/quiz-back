-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "replied" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "viewed" BOOLEAN NOT NULL DEFAULT false;
