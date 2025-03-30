import { integer, text, timestamp, pgEnum, pgTable } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const roles = ['user', 'admin'] as const
const roleEnum = pgEnum('role', roles)

export const users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text(),
  username: text().unique(),
  email: text().notNull().unique(),
  password: text().notNull(),
  image: text().default('/images/avatar.svg'),
  role: roleEnum().default('user').notNull(),
  // createdAt: timestamp().defaultNow().notNull()
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
})

export const usersRelations = relations(users, ({ one }) => ({
	session: one(sessions)
}))

export const sessions = pgTable('sessions', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	userId: integer().references(() => users.id),
  salt: text(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
})

export const prices = pgTable('prices', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  commodity: text().default('soja').notNull(),
  state: text().notNull(),
  city: text().default('N/A').notNull(),
  price: integer().notNull(),
  variation: integer(),
  createdAt: timestamp().defaultNow().notNull(),
  source: text().default('scot').notNull()
})
