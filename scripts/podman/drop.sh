#!/usr/bin/env bash

source "$(dirname "$0")/../podman/vars.sh"

rm -rf drizzle/meta drizzle/*.sql

if podman container exists $CONTAINER_NAME; then
  if podman ps --filter "name=$CONTAINER_NAME" --format "{{.Names}}" | grep -q "^$CONTAINER_NAME$"; then
    echo "🛑 parando o container ${CONTAINER_NAME}..."
    podman stop $CONTAINER_NAME
  fi
  echo "🗑️ Apagando o container ${CONTAINER_NAME}..."
  podman rm $CONTAINER_NAME
fi

if podman image exists $IMAGE_NAME && test -f /etc/arch-release; then
  echo "🗑️ Apagando a imagem ${IMAGE_NAME}..."
  podman rmi $IMAGE_NAME
fi