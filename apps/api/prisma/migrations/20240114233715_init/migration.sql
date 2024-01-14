-- CreateEnum
CREATE TYPE "Cargo" AS ENUM ('USUARIO', 'ADMIN', 'MODERADOR', 'SUPERADMIN');

-- CreateEnum
CREATE TYPE "Assinatura" AS ENUM ('GRATIS', 'BASICA', 'BRONZE', 'PRATA', 'OURO', 'DIAMANTE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "usuario" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nome" TEXT,
    "cargo" "Cargo" NOT NULL DEFAULT 'USUARIO',
    "assinatura" "Assinatura" NOT NULL DEFAULT 'GRATIS',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cotacao" (
    "id" SERIAL NOT NULL,
    "data" DATE NOT NULL,
    "preco" INTEGER,
    "commodityId" INTEGER NOT NULL,
    "estadoId" INTEGER NOT NULL,
    "cidadeId" INTEGER NOT NULL,

    CONSTRAINT "Cotacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commodity" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Commodity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estado" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "acronimo" TEXT NOT NULL,

    CONSTRAINT "Estado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cidade" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "estadoId" INTEGER NOT NULL,

    CONSTRAINT "Cidade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_usuario_key" ON "User"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Commodity_nome_key" ON "Commodity"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Estado_nome_key" ON "Estado"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Estado_acronimo_key" ON "Estado"("acronimo");

-- CreateIndex
CREATE UNIQUE INDEX "Cidade_nome_estadoId_key" ON "Cidade"("nome", "estadoId");

-- AddForeignKey
ALTER TABLE "Cotacao" ADD CONSTRAINT "Cotacao_commodityId_fkey" FOREIGN KEY ("commodityId") REFERENCES "Commodity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cotacao" ADD CONSTRAINT "Cotacao_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "Estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cotacao" ADD CONSTRAINT "Cotacao_cidadeId_fkey" FOREIGN KEY ("cidadeId") REFERENCES "Cidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cidade" ADD CONSTRAINT "Cidade_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "Estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
