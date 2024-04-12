import type { Config } from 'drizzle-kit'

// export default {
//   schema: './db/schema.ts',
//   out: './drizzle',
//   driver: 'better-sqlite',
//   dbCredentials: {
//     url: './data/sqlite.db',
//   },
// } satisfies Config;

export default {
  schema: "./src/schema/*",
  out: "./drizzle",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DB_URL!,
  }
} satisfies Config;