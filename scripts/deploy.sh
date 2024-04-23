#!/bin/bash

BUN=/home/nginx/.bun/bin/bun
BUNX=/home/nginx/.bun/bin/bunx

[ $1 ] && PROJECT_PATH="$1" || PROJECT_PATH="$(pwd)"

ENV_FILE="${PROJECT_PATH}/apps/api/.env"

if [ -f "$ENV_FILE" ]; then
    MAXMIND_LICENSE_KEY_LINE=$(grep "MAXMIND_LICENSE_KEY" $ENV_FILE)

    if [ ! -z "$MAXMIND_LICENSE_KEY_LINE" ]; then
      MAXMIND_LICENSE_KEY=$(echo $MAXMIND_LICENSE_KEY_LINE | awk -F= '$1 == "MAXMIND_LICENSE_KEY" {print $2}')

      echo "$MAXMIND_LICENSE_KEY License"

      node ${PROJECT_PATH}/node_modules/geoip-lite/scripts/updatedb.js license_key=${MAXMIND_LICENSE_KEY}
    fi
fi

$BUN run clean

cd $PROJECT_PATH/apps/api
[ ! -f .env ] && cp .env.production .env
$BUN install
rm -rf ./src/drizzle/migrations/ 
$BUNX drizzle-kit generate:pg --schema ./src/drizzle/schema.ts --out ./src/drizzle/migrations 
$BUN run ./src/drizzle/migrate.ts 
$BUN run ./src/drizzle/seed.ts
$BUN run ./src/services/scrape.services.ts
#$BUN run db:generate && $BUN run db:migrate && $BUN run db:seed

cd $PROJECT_PATH/apps/site
[ ! -f .env ] && cp .env.production .env
$BUN install && $BUN run build

sudo /usr/bin/systemctl restart agrocomm-hono.service