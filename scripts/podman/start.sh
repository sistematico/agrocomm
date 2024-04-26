#!/bin/bash

. /home/lucas/code/agrocomm/scripts/podman/vars.sh

function startContainer() {
  if ! podman container inspect -f '{{.State.Running}}' $CONTAINER > /dev/null 2>&1; then
    echo "Iniciando o contêiner $CONTAINER."
    podman start $CONTAINER > /dev/null 2>&1
  fi
}

function createContainer() {
  podman inspect postgres:$POSTGRES_VERSION >/dev/null 2>&1 || podman pull postgres:$POSTGRES_VERSION

  echo $DB_USER
  echo $DB_PASS
  echo $DB_NAME
  
  echo "Criando o contêiner $CONTAINER."
  podman run -d \
    --name $CONTAINER \
    -e POSTGRES_DB=$DB_NAME \
    -e POSTGRES_USER=$DB_USER \
    -e POSTGRES_PASSWORD=$DB_PASS \
    -p 5432:5432 \
    postgres:$POSTGRES_VERSION > /dev/null 2>&1
}

podman container exists $CONTAINER > /dev/null 2>&1 && startContainer || createContainer