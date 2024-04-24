#!/bin/bash

[ $EUID != 0 ] && exit
[ ! $1 ] && exit

DB_NAME="agrocomm"
DB_USER="agrocomm"
DB_PASS="password"
DB_HOST="localhost"
DB_PORT="5432"

[ -f /etc/os-release ] && . /etc/os-release
[ "$NAME" == "Arch Linux" ] && ENV_FILE="/home/lucas/code/agrocomm/apps/api/.env" || ENV_FILE="/var/www/agrocomm/apps/api/.env"

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

function fix_perms() {
    sudo -u postgres psql -c "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'" | grep -q 1 || return
    sudo -u postgres psql -t -c "\du" | cut -d \| -f 1 | grep -qw $DB_USER || return

    sudo -u postgres psql -c "ALTER USER $DB_USER WITH ENCRYPTED PASSWORD '$DB_PASS';"  
    sudo -u postgres psql -c "ALTER DATABASE $DB_NAME OWNER TO $DB_USER;"  
}

function drop_database() {
    sudo -u postgres psql -c "DROP DATABASE IF EXISTS $DB_NAME;"
}

function drop_user() {
    sudo -u postgres psql -c "DROP USER IF EXISTS $DB_USER;"
}

function create_database() {
    sudo -u postgres psql -c "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'" | grep -q 1 || \
        sudo -u postgres psql -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;" && \
        sudo -u postgres psql -c "ALTER DATABASE $DB_NAME OWNER TO $DB_USER;"

    if sudo -u postgres psql -t -c "\du" | cut -d \| -f 1 | grep -qw $DB_USER; then
        sudo -u postgres psql -c "ALTER USER $DB_USER WITH ENCRYPTED PASSWORD '$DB_PASS';"    
    else
        sudo -u postgres psql -c "CREATE USER $DB_USER WITH ENCRYPTED PASSWORD '$DB_PASS';"
        sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;"
    fi
}

function create_user() {
    if sudo -u postgres psql -t -c "\du" | cut -d \| -f 1 | grep -qw $DB_USER; then
        sudo -u postgres psql -c "ALTER USER $DB_USER WITH ENCRYPTED PASSWORD '$DB_PASS';"  
        sudo -u postgres psql -c "ALTER DATABASE $DB_NAME OWNER TO $DB_USER;"  
    else
        sudo -u postgres psql -c "CREATE USER $DB_USER WITH ENCRYPTED PASSWORD '$DB_PASS';"
        sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;"
    fi
}