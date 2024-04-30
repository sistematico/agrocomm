#!/bin/bash

CONTAINER="agrocomm_postgres"

if podman container exists $CONTAINER > /dev/null 2>&1; then
    if podman container inspect -f '{{.State.Running}}' $CONTAINER | grep true > /dev/null 2>&1; then
        echo "O contêiner está rodando ${CONTAINER}, parando..."
        podman stop $CONTAINER > /dev/null 2>&1
    fi
    echo "Removendo o contêiner ${CONTAINER}..."
    podman rm $CONTAINER > /dev/null 2>&1
fi