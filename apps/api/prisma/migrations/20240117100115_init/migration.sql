/*
  Warnings:

  - You are about to drop the column `estadoId` on the `Cidade` table. All the data in the column will be lost.
  - You are about to drop the column `estadoId` on the `Cotacao` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nome,estado]` on the table `Cidade` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `estado` to the `Cidade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Cotacao` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cidade" DROP CONSTRAINT "Cidade_estadoId_fkey";

-- DropForeignKey
ALTER TABLE "Cotacao" DROP CONSTRAINT "Cotacao_estadoId_fkey";

-- DropIndex
DROP INDEX "Cidade_nome_estadoId_key";

-- AlterTable
ALTER TABLE "Cidade" DROP COLUMN "estadoId",
ADD COLUMN     "estado" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Cotacao" DROP COLUMN "estadoId",
ADD COLUMN     "estado" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cidade_nome_estado_key" ON "Cidade"("nome", "estado");

-- AddForeignKey
ALTER TABLE "Cotacao" ADD CONSTRAINT "Cotacao_estado_fkey" FOREIGN KEY ("estado") REFERENCES "Estado"("sigla") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cidade" ADD CONSTRAINT "Cidade_estado_fkey" FOREIGN KEY ("estado") REFERENCES "Estado"("sigla") ON DELETE RESTRICT ON UPDATE CASCADE;
