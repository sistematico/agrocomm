import { sql } from 'drizzle-orm'
import { int, sqliteTable, text, unique, uniqueIndex } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: int().primaryKey({ autoIncrement: true }),
  fullname: text(),
  username: text().notNull().unique(),
  email: text().notNull().unique(),
  password: text().notNull(),
  otp: text(),
})

export const profiles = sqliteTable('profiles', {
  id: int().primaryKey({ autoIncrement: true }),
  bio: text('bio'),
  userId: int('user_id').references(() => users.id, { onDelete: 'cascade' })
})

export const tokens = sqliteTable('tokens', {
  id: int().primaryKey({ autoIncrement: true }),
  token: text('token').notNull(),
  expiry: int('expiry').notNull(),
  userId: int('user_id').references(() => users.id, { onDelete: 'cascade' }),
  createdAt: text('created_at').notNull().default(sql`(current_timestamp)`),
  revoked: int({ mode: 'boolean' }).default(false)
})

export const plans = sqliteTable('plans', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text('plan').default('free').unique().notNull()
})

export const states = sqliteTable('states', {
  id: int().primaryKey({ autoIncrement: true }),
  abbr: text('abbr').unique().notNull(),
  name: text('name').unique().notNull()
  }, table => {
    return {
      stateIdx: uniqueIndex('unique_state_per_abbr_and_name').on(table.abbr, table.name)
    }
})

export const cities = sqliteTable('cities', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text('name').unique().notNull(),
  state: text('state').unique().notNull().references(() => states.abbr),
  }, (table) => {
    return {
      cityIdx: uniqueIndex('unique_city_per_name_and_state').on(table.name, table.state)
    }
})

export const commodities = sqliteTable('commodities', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull()
})

export const prices = sqliteTable('prices', {
  id: int().primaryKey({ autoIncrement: true }),
  price: int('price').notNull(),
  commodity: text('commodity').references(() => commodities.slug),
  state: text('state').notNull().references(() => states.abbr),
  city: text('city'),
  createdAt: text('created_at').notNull().default(sql`(current_timestamp)`),
  }, (t) => ({
    uniquePrice: unique('unique_price_per_commodity_date_state_city').on(t.createdAt, t.commodity, t.city, t.state)
  })
)