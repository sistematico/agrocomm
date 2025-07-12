import { integer, text, timestamp, pgEnum, pgTable, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const roles = ['user', 'admin']
const roleEnum = pgEnum('role', ['user', 'admin'])

export const users = pgTable('users', {
  // id: integer().primaryKey().generatedAlwaysAsIdentity(),
  id: uuid().primaryKey().defaultRandom(),
  name: text(),
  username: text().unique(),
  email: text().notNull().unique(),
  password: text().notNull(),
  image: text().default('/images/avatar.svg'),
  role: roleEnum().default('user').notNull(),
  salt: text(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow()
})

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions)
}))

export const sessions = pgTable('sessions', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer().references(() => users.id),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow()
})

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
    fields: [sessions.userId],
    references: [users.id],    
  })
}))

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
