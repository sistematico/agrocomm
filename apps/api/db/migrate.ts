import { migrate } from 'drizzle-orm/bun-sqlite/migrator'
import { drizzle } from 'drizzle-orm/bun-sqlite'
import { Database } from 'bun:sqlite'
import { resolve } from 'path'

const currentDir = import.meta.dir;
const parentDir = resolve(currentDir, '..')

const sqlite = new Database(parentDir + '/data/sqlite.db')
const db = drizzle(sqlite)
migrate(db, { migrationsFolder: 'drizzle' })