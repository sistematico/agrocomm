/*
  Warnings:

  - The primary key for the `Cidade` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cidade` on the `Cotacao` table. All the data in the column will be lost.
  - Added the required column `cidadeId` to the `Cotacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cidade" DROP CONSTRAINT "Cidade_pkey",
ADD CONSTRAINT "Cidade_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Cotacao" DROP COLUMN "cidade",
ADD COLUMN     "cidadeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Cotacao" ADD CONSTRAINT "Cotacao_cidadeId_fkey" FOREIGN KEY ("cidadeId") REFERENCES "Cidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
