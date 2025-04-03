import { sql } from 'drizzle-orm'
import { db } from '@/db'

async function reset() {
  const tableSchema = db._.schema
  if (!tableSchema) throw new Error('No table schema found')
  
  // console.log('🗑️  Emptying the entire database')
  console.log('🔓 Disabling foreign key constraints...')
  await db.execute(sql.raw('SET session_replication_role = replica;'))

  const queries = Object.values(tableSchema)
    .map((table) => {
      if (table) {
        console.log(`💣 Preparing delete query for table: ${table.dbName}`)
        return {
          query: sql.raw(`TRUNCATE TABLE "${table.dbName}" CASCADE;`),
          tableName: table.dbName
        }
      }
      console.warn('⚠️  Table schema for table not found, skipping...')
      return null
    })
    .filter((item) => item !== null)

  console.log('📨 Sending delete queries...')

  for (const item of queries) {
    if (item) {
      try {
        await db.transaction(async (tx) => {
          await tx.execute(item.query)
        })
        console.log(`✅ Successfully truncated table "${item.tableName}"`)
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes('does not exist')
        ) {
          console.log(`⏭️ Skipping table "${item.tableName}" - does not exist`)
          continue
        }
        console.error(
          `❌ Error executing query for table "${item.tableName}":`,
          error instanceof Error ? error.message : String(error)
        )
        throw error
      }
    }
  }

  // Re-enable foreign key constraints
  console.log('🔒 Re-enabling foreign key constraints...')
  await db.execute(sql.raw('SET session_replication_role = origin;'))

  console.log('✅ Database emptied')
  process.exit(0)
}

reset().catch((e) => {
  console.error(e)
  process.exit(1) // Exit with error code
})
