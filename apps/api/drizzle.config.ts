import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle/migrations",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!
  },
  verbose: process.env.NODE_ENV === 'production' ? false : true,
  strict: process.env.NODE_ENV === 'production' ? false : true
})
