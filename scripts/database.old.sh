#!/bin/bash

[ $EUID != 0 ] && exit

# [ -f /etc/os-release ] && . /etc/os-release
# [ "$NAME" == "Arch Linux" ] && ENV_FILE="/home/lucas/code/agrocomm/apps/api/.env" || ENV_FILE="/var/www/agrocomm/apps/api/.env"

DB_NAME="agrocomm"
DB_USER="agrocomm"
DB_PASS="password"
DB_HOST="localhost"
DB_PORT="5432"

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

sudo -u postgres psql -c "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'" | grep -q 1 || sudo -u postgres psql -c "CREATE DATABASE $DB_NAME;"

if sudo -u postgres psql -t -c "\du" | cut -d \| -f 1 | grep -qw $DB_USER; then
    sudo -u postgres psql -c "ALTER USER $DB_USER WITH ENCRYPTED PASSWORD '$DB_PASS';"
else
    sudo -u postgres psql -c "CREATE USER $DB_USER WITH ENCRYPTED PASSWORD '$DB_PASS';"
    sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;"
fi

# if ! grep -q "DATABASE_URL" $ENV_FILE 2> /dev/null; then
#     echo "DATABASE_URL=\"postgresql://$DB_USER:$DB_PASS@$DB_HOST:$DB_PORT/$DB_NAME?schema=public\"" >> $ENV_FILE
# fi