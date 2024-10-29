import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: int().primaryKey({ autoIncrement: true }),
  fullname: text(),
  username: text().notNull().unique(),
  email: text().notNull().unique(),
  password: text().notNull(),
})