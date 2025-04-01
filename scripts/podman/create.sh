#!/usr/bin/env bash

source "$(dirname "$0")/../podman/vars.sh"

if ! podman image exists $IMAGE_NAME; then
  echo "✅ Criando a imagem ${IMAGE_NAME}..."
  podman pull $IMAGE_NAME
fi

if ! podman container exists $CONTAINER_NAME; then
  echo "✅ Criando o container ${CONTAINER_NAME}..."
  podman run -d \
    --name $CONTAINER_NAME \
    -e POSTGRES_DB=$POSTGRES_DB \
    -e POSTGRES_USER=$POSTGRES_USER \
    -e POSTGRES_PASSWORD=$POSTGRES_PASS \
    -p 5432:5432 \
    $IMAGE_NAME
fi

if ! podman ps --filter "name=$CONTAINER_NAME" --format "{{.Names}}" | grep -q "^$CONTAINER_NAME$"; then
  echo "🎉 Iniciando o container ${CONTAINER_NAME}..."
  podman start $CONTAINER_NAME
fi