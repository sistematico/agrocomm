import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const client = postgres(process.env.DB_URL!, { max: 1 })
// const client = postgres("postgres://agrocomm:password@127.0.0.1:5432/agrocomm", { max: 1 })
export const db = drizzle(client)