import { drizzle } from 'drizzle-orm/bun-sqlite'
import { Database } from 'bun:sqlite'
import { resolve } from 'path'

const parentDir = resolve(import.meta.dir, '..')

const sqlite = new Database(`${parentDir}/data/sqlite.db`)

export const db = drizzle(sqlite)