#!/bin/bash

BUN=/home/nginx/.bun/bin/bun
BUNX=/home/nginx/.bun/bin/bunx

[ $1 ] && PROJECT_PATH="$1" || PROJECT_PATH="$(pwd)"

#MAXMIND_LICENSE_KEY="$1"
#[ $1 ] && node ../../node_modules/geoip-lite/scripts/updatedb.js license_key=${MAXMIND_LICENSE_KEY}
# bash scripts/reset.sh

cd $PROJECT_PATH/apps/api
[ ! -f .env ] && cp .env.prod .env
$BUNX prisma generate
$BUN install

cd $PROJECT_PATH/apps/site
[ ! -f .env ] && cp .env.prod .env
$BUN install
$BUN run build

sudo /usr/bin/systemctl restart agrocomm-hono.service