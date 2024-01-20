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
CREATE TABLE "Commodity" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Commodity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cotacao" (
    "id" SERIAL NOT NULL,
    "data" DATE NOT NULL,
    "preco" INTEGER NOT NULL,
    "commodity" INTEGER NOT NULL,
    "estado" TEXT NOT NULL,
    "cidade" TEXT NOT NULL DEFAULT 'Nenhuma',

    CONSTRAINT "Cotacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estado" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,

    CONSTRAINT "Estado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cidade" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "commodity" INTEGER NOT NULL,
    "estado" TEXT NOT NULL,

    CONSTRAINT "Cidade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_usuario_key" ON "User"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Commodity_nome_key" ON "Commodity"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Estado_sigla_key" ON "Estado"("sigla");

-- CreateIndex
CREATE UNIQUE INDEX "Cidade_nome_estado_commodity_key" ON "Cidade"("nome", "estado", "commodity");

-- AddForeignKey
ALTER TABLE "Cotacao" ADD CONSTRAINT "Cotacao_commodity_fkey" FOREIGN KEY ("commodity") REFERENCES "Commodity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cotacao" ADD CONSTRAINT "Cotacao_estado_fkey" FOREIGN KEY ("estado") REFERENCES "Estado"("sigla") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cotacao" ADD CONSTRAINT "Cotacao_cidade_estado_commodity_fkey" FOREIGN KEY ("cidade", "estado", "commodity") REFERENCES "Cidade"("nome", "estado", "commodity") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cidade" ADD CONSTRAINT "Cidade_estado_fkey" FOREIGN KEY ("estado") REFERENCES "Estado"("sigla") ON DELETE RESTRICT ON UPDATE CASCADE;
