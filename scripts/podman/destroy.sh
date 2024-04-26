#!/bin/bash

CONTAINER="agrocomm_postgres"

if podman container exists $CONTAINER; then

    if podman container inspect -f '{{.State.Running}}' $CONTAINER | grep true 2>&1; then
        echo "O contêiner está rodando ${CONTAINER}, parando..."
        podman stop $CONTAINER
    fi

    echo "Removendo o contêiner ${CONTAINER}..."
    podman rm $CONTAINER
fi