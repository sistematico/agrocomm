#!/usr/bin/env bash

source "$(dirname "$0")/../other/read_env.sh"

CONTAINER_NAME=agrocomm-postgres
POSTGRES_VERSION=16
POSTGRES_DB=$DB_NAME
POSTGRES_USER=$DB_USER
POSTGRES_PASS="$DB_PASS"
IMAGE_NAME=postgres:$POSTGRES_VERSION