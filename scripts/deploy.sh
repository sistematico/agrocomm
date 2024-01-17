#!/bin/bash

BUN=/home/nginx/.bun/bin/bun
MAXMIND_LICENSE_KEY="$1"

[ -f apps/api/.env ] && cp apps/api/.env ../env.api
[ -f apps/site/.env ] && cp apps/site/.env ../env.site

git fetch --all && git reset --hard origin/main 
git clean -dffx

[ -f ../env.api ] && cp ../env.api apps/api/.env 
[ -f ../env.site ] && cp ../env.site apps/site/.env

#bash scripts/reset.sh

cd apps/api
[ ! -f .env ] && cp .env.prod .env
$BUN install

[ $1 ] && node ../../node_modules/geoip-lite/scripts/updatedb.js license_key=${MAXMIND_LICENSE_KEY}

cd ../site
[ ! -f .env ] && cp .env.prod .env
$BUN install
$BUN run build

sudo /usr/bin/systemctl restart agrocomm-hono.service