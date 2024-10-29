//import { drizzle } from 'drizzle-orm/libsql';
import { drizzle } from 'drizzle-orm/bun-sqlite'
import { Database } from 'bun:sqlite'

const sqlite = new Database(process.env.DB_FILE_NAME!)
const db = drizzle({ client: sqlite })


// const db = drizzle({ connection: {
//   url: process.env.DATABASE_URL, 
//   authToken: process.env.DATABASE_AUTH_TOKEN 
// }});