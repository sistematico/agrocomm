import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core'

const now = new Date().toISOString()

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  firstName: text('first_name').notNull(),
  lastName: text('last_name'),
  username: text('username').unique().notNull(),
  password: text('password').notNull(),
  createdAt: text('created_at').notNull().default(now)
})

export const states = sqliteTable('states', {
    id: integer('id').primaryKey(),
    abbr: text('abbr'),
    name: text('name'),
  }, (cities) => ({
    nameIdx: uniqueIndex('nameIdx').on(cities.name)
  })
)

export const cities = sqliteTable('cities', {
  id: integer('id').primaryKey(),
  name: text('name'),
  stateId: integer('state_id').references(() => states.id)
})

export const movies = sqliteTable('movies', {
  id: integer('id').primaryKey(),
  title: text('name'),
  releaseYear: integer('release_year')
})