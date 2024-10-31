#!/bin/bash

PATH=$PATH:/home/nginx/.bun/bin

git clean -fxd

cd ./apps/api
rm -rf ./src/db/meta/ ./src/db/*.sql *.db
cp .env.production .env
bun install

bun run db:push
bun run db:generate
bun run db:seed

sudo /usr/bin/systemctl restart agrocomm-hono.service

cd ../site
# [ ! -f .env ] && cp .env.production .env
cp .env.production .env
bun install
bun run build