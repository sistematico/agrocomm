import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { db } from '@/schema'

await migrate(db, { migrationsFolder: './drizzle' })