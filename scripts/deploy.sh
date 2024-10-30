#!/bin/bash

PATH=$PATH:/home/nginx/.bun/bin

git clean -fxd

cd ./apps/api
# [ ! -f .env ] && cp .env.production .env
cp .env.production .env
bun install

bun run db:push
bun run db:generate

sudo /usr/bin/systemctl restart agrocomm-hono.service

cd ../site
# [ ! -f .env ] && cp .env.production .env
cp .env.production .env
bun install
bun run build