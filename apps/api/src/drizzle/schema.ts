// import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core'
import { integer, serial, text, timestamp, pgTable, uniqueIndex } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { getCurrentDate } from '@/utils'

const now = getCurrentDate()

export const users: any = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  username: text('username').unique().notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  role: text('role').notNull().default('user'),
  createdAt: text('created_at').notNull().default(now),
  profile: integer('profile').references(() => profiles.id),
  }, (table) => {
    return {
      userIdx: uniqueIndex('unique_user_per_username_email').on(table.username, table.email)
    }
})

export const profiles = pgTable('profiles', {
  id: serial('id'),
  userId: serial('user_id').references(() => users.id),
  subscription: text('subscription').references(() => plans.name).default('free'),
  // userId: serial('user_id').references(() => users.id)
})

export const usersRelations = relations(users, ({ one }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.id],
    relationName: 'users_profiles'
  }),
  subscription: one(plans, {
    fields: [users.id],
    references: [plans.name],
    relationName: 'users_subscriptions'
  }),
  // posts: many(posts, { relationName: "users_posts" })
}))

export const plans = pgTable('plans', {
  id: serial('id'),
  name: text('name').unique().notNull(),
})

export const states = pgTable('states', {
  id: serial('id'),
  abbr: text('state_abbr').unique().notNull(),
  name: text('state_name').unique().notNull()
})

export const cities = pgTable('cities', {
  id: serial('id'),
  name: text('city_name'),
  state: text('state').references(() => states.abbr),
  }, (table) => {
    return {
      cityIdx: uniqueIndex('unique_city_per_name_state').on(table.name, table.state)
    }
})

export const commodities = pgTable('commodities', {
  id: serial('id'),
  name: text('name').unique().notNull()
})

export const prices = pgTable('prices', {
  id: serial('id'),
  price: integer('price').notNull(),
  createdAt: text('created_at').notNull().default(now),
  commodity: text('commodity').references(() => commodities.name),
  cityId: integer('city').references(() => cities.id),
  stateId: integer('state').references(() => states.id), // Novo campo adicionado
}, (table) => {
  return {
    priceIdx: uniqueIndex('unique_price_per_day_state_city').on(table.createdAt, table.commodity, table.stateId, table.cityId)
  }
})

