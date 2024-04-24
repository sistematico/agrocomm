#!/bin/sh

OLDPWD="$(pwd)"

BUN=/home/nginx/.bun/bin/bun
BUNX=/home/nginx/.bun/bin/bunx

RED='\033[0;31m'
GREEN='\033[0;32m'
NO_COLOR='\033[0m'

echo -e "${RED}Removendo a pasta migrations...${NO_COLOR}"
rm -rf apps/api/src/drizzle/migrations
cd apps/api

echo -e "${GREEN}Resetando o banco de dados ao estado original...${NO_COLOR}"
$BUN x prisma migrate reset --force --skip-seed

echo -e "${GREEN}Gerando o cliente Drizzle...${NO_COLOR}"
$BUNX drizzle-kit generate:pg --schema ./src/drizzle/schema.ts --out ./src/drizzle/migrations

echo -e "${GREEN}Executando as migrações...${NO_COLOR}"
$BUN run ./src/drizzle/migrate.ts

echo -e "${GREEN}Executando o seed.ts${NO_COLOR}"
$BUN run ./src/drizzle/seed.ts

cd "$OLDPWD"

echo -e "${GREEN}Banco de dados resetado e cliente Drizzle gerado com sucesso!${NO_COLOR}"

