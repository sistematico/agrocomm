#!/bin/bash

APPNAME="agrocomm"
POSTGRES_VERSION=15.0
DB_NAME="$APPNAME"
DB_USER="$APPNAME"
DB_PASS="password"
CONTAINER="${APPNAME}_postgres"

[ -f /etc/os-release ] && . /etc/os-release || exit 1
[ "$NAME" == "Arch Linux" ] && ENV_FILE="/home/lucas/code/agrocomm/apps/api/.env" || exit 1

if [ -f "$ENV_FILE" ]; then
    DATABASE_URL_LINE=$(grep "DATABASE_URL" $ENV_FILE)

    if [ ! -z "$DATABASE_URL_LINE" ]; then
        DB_CREDENTIALS=$(echo $DATABASE_URL_LINE | sed -e 's/DATABASE_URL="postgres:\/\/\(.*\)"/\1/')
        DB_USER=$(echo $DB_CREDENTIALS | cut -d ':' -f 1)
        DB_PASS=$(echo $DB_CREDENTIALS | cut -d ':' -f 2 | cut -d '@' -f 1)
        DB_HOST=$(echo $DB_CREDENTIALS | cut -d '@' -f 2 | cut -d ':' -f 1)
        DB_PORT=$(echo $DB_CREDENTIALS | cut -d ':' -f 3 | cut -d '/' -f 1)
        DB_NAME=$(echo $DB_CREDENTIALS | cut -d '/' -f 2 | cut -d '?' -f 1)
    fi
fi