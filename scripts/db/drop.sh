#!/bin/bash

source "$(dirname "$0")/../other/read_env.sh"

PGPASSWORD="$DB_PASS"
[ $1 ] && PGPASSWORD="$1"
export PGPASSWORD

echo "🔄 Conectando ao PostgreSQL e limpando o banco de dados '$DB_NAME'..."

# Apagar todos os dados das tabelas
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "
DO \$\$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'TRUNCATE TABLE ' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;
END \$\$;
"

echo "✅ Dados apagados com sucesso."

# Resetar os índices do banco
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "REINDEX DATABASE \"$DB_NAME\";"
echo "✅ Índices reconstruídos."

# Otimizar espaço
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "VACUUM FULL;"
echo "✅ Banco otimizado."

# Recalcular estatísticas
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "ANALYZE;"
echo "✅ Estatísticas recalculadas."

echo "🎉 Limpeza completa no banco '$DB_NAME'."