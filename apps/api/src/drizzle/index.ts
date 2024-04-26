import { drizzle } from 'drizzle-orm/postgres-js'
import * as schema from '@/drizzle/schema'
import postgres from 'postgres'

const client = postgres(process.env.DATABASE_URL!)

export const db = drizzle(client)
export const dbq = drizzle(client, { schema })
