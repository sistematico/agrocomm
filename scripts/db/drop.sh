#!/bin/bash

# Configurações do Banco
PGHOST="localhost"   # Ou IP do servidor
PGPORT="5432"
PGUSER="agrocomm"
PGDATABASE="agrocomm"
PGPASSWORD="agrocomm"  # Alternativa: usar variável de ambiente

export PGPASSWORD

echo "🔄 Conectando ao PostgreSQL e limpando o banco de dados '$PGDATABASE'..."

# Apagar todos os dados das tabelas
psql -h "$PGHOST" -p "$PGPORT" -U "$PGUSER" -d "$PGDATABASE" -c "
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
psql -h "$PGHOST" -p "$PGPORT" -U "$PGUSER" -d "$PGDATABASE" -c "REINDEX DATABASE \"$PGDATABASE\";"
echo "✅ Índices reconstruídos."

# Otimizar espaço
psql -h "$PGHOST" -p "$PGPORT" -U "$PGUSER" -d "$PGDATABASE" -c "VACUUM FULL;"
echo "✅ Banco otimizado."

# Recalcular estatísticas
psql -h "$PGHOST" -p "$PGPORT" -U "$PGUSER" -d "$PGDATABASE" -c "ANALYZE;"
echo "✅ Estatísticas recalculadas."

echo "🎉 Limpeza completa no banco '$PGDATABASE'."