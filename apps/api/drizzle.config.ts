import { defineConfig } from 'drizzle-kit'

export default defineConfig({
 schema: "./src/drizzle/schema.ts",
 out: "./src/drizzle/migrations",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  verbose: process.env.NODE_ENV === 'development' ? true : false,
  strict: process.env.NODE_ENV === 'development' ? true : false,
})
