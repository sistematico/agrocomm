/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Cidade` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[estado,commodity]` on the table `Cidade` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nome,estado]` on the table `Cidade` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Cotacao" DROP CONSTRAINT "Cotacao_cidade_estado_commodity_fkey";

-- DropIndex
DROP INDEX "Cidade_nome_estado_commodity_key";

-- CreateIndex
CREATE UNIQUE INDEX "Cidade_nome_key" ON "Cidade"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Cidade_estado_commodity_key" ON "Cidade"("estado", "commodity");

-- CreateIndex
CREATE UNIQUE INDEX "Cidade_nome_estado_key" ON "Cidade"("nome", "estado");

-- AddForeignKey
ALTER TABLE "Cotacao" ADD CONSTRAINT "Cotacao_cidade_estado_fkey" FOREIGN KEY ("cidade", "estado") REFERENCES "Cidade"("nome", "estado") ON DELETE RESTRICT ON UPDATE CASCADE;
