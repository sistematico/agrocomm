#!/bin/sh

BUN=/home/nginx/.bun/bin/bun
OLDPWD="$(pwd)"

# Define cores
RED='\033[0;31m'
GREEN='\033[0;32m'
NO_COLOR='\033[0m'

# Remove a pasta migrations
echo -e "${RED}Removendo a pasta migrations...${NO_COLOR}"
rm -rf apps/api/prisma/migrations
cd apps/api

# Resetar o banco de dados
echo -e "${GREEN}Resetando o banco de dados ao estado original...${NO_COLOR}"
$BUN x prisma migrate reset --force

# Gera o cliente Prisma
echo -e "${GREEN}Gerando o cliente Prisma...${NO_COLOR}"
$BUN x prisma generate

# Executa as migrações para recriar as tabelas
echo -e "${GREEN}Criando as tabelas a partir do esquema(schema.prisma)...${NO_COLOR}"
$BUN x prisma db push

echo -e "${GREEN}Executando o prisma/seed.ts${NO_COLOR}"
$BUN x prisma db seed

cd "$OLDPWD"

echo -e "${GREEN}Banco de dados resetado e cliente Prisma gerado com sucesso!${NO_COLOR}"

