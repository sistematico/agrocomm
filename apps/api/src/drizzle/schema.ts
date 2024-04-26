import { pgTable, pgEnum, serial, integer, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const roleEnum = pgEnum('role', ['user', 'admin', 'superadmin'])
export const planEnum = pgEnum('plan', ['free', 'bronze', 'silver', 'gold', 'platinum'])

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name'),
  username: text('username').unique().notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  role: roleEnum('role').default('user').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow()
})

export const tokens = pgTable('tokens', {
  id: serial('id').primaryKey(),
  token: text('token').unique().notNull(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' })
})

export const profiles = pgTable('profiles', {
  id: serial('id').primaryKey(),
  bio: text('bio'),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' })
})

export const plans = pgTable('plans', {
  id: serial('id').primaryKey(),
  name: planEnum('plan').default('free').unique().notNull()
})

export const commodities = pgTable('commodities', {
  id: serial('id').primaryKey(),
  name: text('name').unique()
})

export const states = pgTable('states', {
  id: serial('id').primaryKey(),
  abbr: text('abbr').unique().notNull(),
  name: text('name').unique().notNull()
  }, table => {
    return {
      stateIdx: uniqueIndex('unique_state_per_abbr_and_name').on(table.abbr, table.name)
    }
})

export const cities = pgTable('cities', {
  id: serial('id').primaryKey(),
  name: text('name').unique().notNull(),
  state: text('state').unique().notNull().references(() => states.abbr),
  }, (table) => {
    return {
      cityIdx: uniqueIndex('unique_city_per_name_and_state').on(table.name, table.state)
    }
})

export const prices = pgTable('prices', {
  id: serial('id'),
  price: integer('price').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  commodity: text('commodity').notNull().references(() => commodities.name),
  city: text('city').references(() => cities.name),
  state: text('state').notNull().references(() => states.abbr),
  }, (table) => {
    return {
      priceIdx: uniqueIndex('unique_price_per_day_state_city').on(table.createdAt, table.commodity, table.state, table.city)
    }
})

export const usersRelations = relations(users, ({ one }) => ({
  profile: one(profiles),
  token: one(tokens)
}))

export const profilesRelations = relations(profiles, ({ one }) => ({
  subscription: one(plans)
}))

export const citiesRelations = relations(cities, ({ one }) => ({
  state: one(states)
}))