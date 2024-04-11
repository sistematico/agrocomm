#!/bin/bash

[ -f /etc/os-release ] && . /etc/os-release
[ "$NAME" == "Arch Linux" ] && ENV_FILE="/home/lucas/code/agrocomm/apps/api/.env" || ENV_FILE="/var/www/agrocomm/apps/api/.env"

# Defina suas variáveis personalizadas aqui
NAME="agrocomm"
POSTGRES_VERSION=15.0
DB_NAME="$NAME"
DB_USER="$NAME"
DB_PASSWORD="password"
CONTAINER="${NAME}_postgres"

if [ -f "$ENV_FILE" ]; then
    DATABASE_URL_LINE=$(grep "DATABASE_URL" $ENV_FILE)

    if [ ! -z "$DATABASE_URL_LINE" ]; then
        DB_CREDENTIALS=$(echo $DATABASE_URL_LINE | sed -e 's/DATABASE_URL="postgresql:\/\/\(.*\)"/\1/')
        DB_USER=$(echo $DB_CREDENTIALS | cut -d ':' -f 1)
        DB_PASS=$(echo $DB_CREDENTIALS | cut -d ':' -f 2 | cut -d '@' -f 1)
        DB_HOST=$(echo $DB_CREDENTIALS | cut -d '@' -f 2 | cut -d ':' -f 1)
        DB_PORT=$(echo $DB_CREDENTIALS | cut -d ':' -f 3 | cut -d '/' -f 1)
        DB_NAME=$(echo $DB_CREDENTIALS | cut -d '/' -f 2 | cut -d '?' -f 1)
    fi
fi

# Verifica se o contêiner já existe
if podman container exists $CONTAINER; then
    echo "Contêiner $CONTAINER já existe."

    # Verifica se o contêiner está rodando
    if ! podman container inspect -f '{{.State.Running}}' $CONTAINER | grep true; then
        echo "Iniciando o contêiner $CONTAINER."
        podman start $CONTAINER
    else
        echo "Contêiner $CONTAINER já está em execução."
    fi
else
    echo "Criando e iniciando contêiner $CONTAINER."

    # Puxe a imagem do PostgreSQL 14.0
    podman pull postgres:$POSTGRES_VERSION

    # Execute o contêiner com as variáveis de ambiente personalizadas
    podman run -d \
      --name $CONTAINER \
      -e POSTGRES_DB=$DB_NAME \
      -e POSTGRES_USER=$DB_USER \
      -e POSTGRES_PASSWORD=$DB_PASS \
      -v ../ansible/files/etc/postgresql/postgresql.conf:/etc/postgresql/postgresql.conf \
      -p 5432:5432 \
      postgres:$POSTGRES_VERSION
fi
