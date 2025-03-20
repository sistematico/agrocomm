import {
  integer,
  pgTable,
  varchar,
  text,
  timestamp,
  pgEnum
} from 'drizzle-orm/pg-core'

export const roleEnum = pgEnum('role', ['user', 'admin'])
export const commodityEnum = pgEnum('commodity', ['soja', 'milho', 'boi', 'vaca'])

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
  commodity: commodityEnum().default('soja').notNull(),
  state: text().notNull(),
  city: text().default('N/A').notNull(),
  price: integer().notNull(),
  variation: integer(),
  createdAt: timestamp().defaultNow().notNull(),
  source: text().default('scot').notNull()
})
