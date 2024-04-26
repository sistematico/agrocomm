import { pgTable, boolean, integer, serial, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Enums
// const planTypes = ['free', 'bronze', 'silver', 'gold', 'diamond'] as const
// export type PlanTypes = (typeof planTypes)[number]

// Tables
export const users = pgTable('users', {
  id: serial('id'),
  name: text('name'),
  username: text('username').unique().notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  role: text('role').$type<'user' | 'admin' | 'superadmin'>().default('user'),
  createdAt: timestamp('created_at').notNull().defaultNow()
})

export const profiles = pgTable('profiles', {
  id: serial('id').primaryKey(),
  verified: boolean('verified').notNull().default(false),
  userId: serial('user_id').references(() => users.id),
  // subscription: text('subscription', { enum: planTypes }).notNull().default('free'),
  subscription: text('subscription').unique().references(() => plans.name),
  validAt: timestamp('valid_at'),
  }, (table) => {
    return {
      profileIdx: uniqueIndex('unique_subscription_per_user_id').on(table.subscription, table.userId)
    }
})

export const plans = pgTable('plans', {
  id: serial('id').primaryKey(),
  name: text('subscription').$type<'free' | 'bronze' | 'silver' | 'gold' | 'platinum'>().default('free').unique(),
})

export const states = pgTable('states', {
  id: serial('id'),
  abbr: text('abbr').unique(),
  name: text('name')
})

export const cities = pgTable('cities', {
  id: serial('id'),
  name: text('name'),
  state: text('state').unique().references(() => states.abbr),
  }, (table) => {
    return {
      cityIdx: uniqueIndex('unique_city_per_name_state').on(table.name, table.state)
    }
})

export const commodities = pgTable('commodities', {
  id: serial('id'),
  name: text('name').unique()
})

export const prices = pgTable('prices', {
  id: serial('id'),
  price: integer('price').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  commodity: text('commodity'),
  city: text('city'),
  state: text('state'), // Novo campo adicionado
  }, (table) => {
    return {
      priceIdx: uniqueIndex('unique_price_per_day_state_city').on(table.createdAt, table.commodity, table.state, table.city)
    }
})

// Relations
export const usersRelations = relations(users, ({ one }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
    relationName: 'user_profile'
  })
}))

export const profilesRelations = relations(profiles, ({ one }) => ({
  subscription: one(plans, {
    fields: [profiles.subscription],
    references: [plans.id],
    relationName: 'profile_subscription'
  })
}))

export const pricesRelations = relations(prices, ({ one }) => ({
  commodity: one(commodities, {
    fields: [prices.commodity],
    references: [commodities.name]
  })
}))