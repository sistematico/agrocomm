import { integer, pgTable, varchar, text, timestamp } from 'drizzle-orm/pg-core'

// export const moodEnum = pgEnum('mood', ['sad', 'ok', 'happy']);

// export const table = pgTable('table', {
//   mood: moodEnum(),
// });

export const users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }),
  username: varchar({ length: 255 }),
  email: varchar({ length: 255 }).notNull().unique(),
  password: text(),
  age: integer().notNull(),
})

export const prices = pgTable('prices', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  commodity: text().notNull(),
  state: text().notNull(),
  city: text(),
  price: integer().notNull(),
  variation: integer(),
  createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
  source: text().default('scot').notNull(),
})