#!/bin/bash

[ -f /etc/os-release ] && . /etc/os-release
if [ "$NAME" == "Arch Linux" ]; then
  ENV_FILE="/home/lucas/code/agrocomm/apps/api/.env"
  VARS_FILE="/home/lucas/code/agrocomm/scripts/podman/vars"
  [ -f $VARS_FILE ] && . $VARS_FILE || exit
else
  exit 
fi

function startContainer() {
  if podman container inspect -f '{{.State.Running}}' $CONTAINER | grep false; then
    echo "Iniciando o contêiner $CONTAINER."
    podman run $CONTAINER
  fi
}

function createContainer() {
  echo "Iniciando o contêiner $CONTAINER."
  podman run -d \
    --name $CONTAINER \
    -e POSTGRES_DB=$DB_NAME \
    -e POSTGRES_USER=$DB_USER \
    -e POSTGRES_PASSWORD=$DB_PASS \
    -p 5432:5432 \
    postgres:$POSTGRES_VERSION
}

podman inspect postgres:$POSTGRES_VERSION >/dev/null 2>&1 || podman pull postgres:$POSTGRES_VERSION
podman container exists $CONTAINER >/dev/null 2>&1 && startContainer || createContainer