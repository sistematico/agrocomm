#!/bin/bash

[ -f /etc/os-release ] && . /etc/os-release
[ "$NAME" == "Arch Linux" ] && ENV_FILE="/home/lucas/code/agrocomm/apps/api/.env" || ENV_FILE="/var/www/agrocomm/apps/api/.env"

NAME="agrocomm"
POSTGRES_VERSION=15.0
DB_NAME="$NAME"
DB_USER="$NAME"
DB_PASS="password"
CONTAINER="${NAME}_postgres"

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

echo "DB_USER: $DB_USER"
echo "DB_PASS: $DB_PASS"
echo "DB_HOST: $DB_HOST"
echo "DB_PORT: $DB_PORT"
echo "DB_NAME: $DB_NAME"

if podman container exists $CONTAINER; then
    echo "Contêiner $CONTAINER já existe."

    if podman container inspect -f '{{.State.Running}}' $CONTAINER | grep true; then
        echo "Parando o contêiner $CONTAINER."
        podman stop $CONTAINER
    fi

    echo "Removendo o contêiner $CONTAINER."
    podman rm $CONTAINER
fi

echo "Instalando a imagem postgres:$POSTGRES_VERSION"
podman inspect postgres:$POSTGRES_VERSION >/dev/null 2>&1 || podman pull postgres:$POSTGRES_VERSION

echo "Iniciando o contêiner $CONTAINER."
podman run -d \
    --name $CONTAINER \
    -e POSTGRES_DB=$DB_NAME \
    -e POSTGRES_USER=$DB_USER \
    -e POSTGRES_PASSWORD=$DB_PASS \
    -p 5432:5432 \
    postgres:$POSTGRES_VERSION

    # -v ../ansible/files/etc/postgresql/postgresql.conf:/etc/postgresql/postgresql.conf \

