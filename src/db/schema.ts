import {
  integer,
  pgTable,
  varchar,
  text,
  timestamp,
  pgEnum
} from 'drizzle-orm/pg-core'

export const roleEnum = pgEnum('role', ['user', 'admin'])

export const users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text(),
  username: text().unique(),
  email: text().notNull().unique(),
  password: text().notNull(),
  role: roleEnum().default('user').notNull(),
  createdAt: timestamp().defaultNow().notNull()
})

export const prices = pgTable('prices', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  commodity: text().notNull(),
  state: text().notNull(),
  city: text(),
  price: integer().notNull(),
  variation: integer(),
  createdAt: timestamp().defaultNow().notNull(),
  source: text().default('scot').notNull()
})
