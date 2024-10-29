#!/bin/bash

PATH=$PATH:/home/nginx/.bun/bin

git clean -fxd

cd ./apps/api
[ ! -f .env ] && cp .env.production .env
bun install

cd ../site
[ ! -f .env ] && cp .env.production .env
bun install
bun run build