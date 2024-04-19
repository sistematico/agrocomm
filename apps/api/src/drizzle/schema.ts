import { pgTable, integer, serial, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Enums
const roles = ['user', 'admin', 'superadmin'] as const
export type Roles = (typeof roles)[number]

const planTypes = ['free', 'bronze', 'silver', 'gold', 'diamond'] as const
export type PlanTypes = (typeof planTypes)[number]

// Tables
export const users: any = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  username: text('username').unique().notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  role: text('role', { enum: roles }).notNull().default('user'),
  createdAt: timestamp('created_at').notNull().defaultNow()
})

export const profiles = pgTable('profiles', {
  id: serial('id').primaryKey(),
  verified: integer('verified').notNull().default(0),
  userId: integer('user_id').notNull().references(() => users.id),
  // subscription: text('subscription', { enum: planTypes }).notNull().references(() => plans.name),
  subscription: text('subscription', { enum: planTypes }).notNull().default('free'),
  validAt: timestamp('valid_at')
})

export const plans = pgTable('plans', {
  id: serial('id').primaryKey(),
  name: text('name', { enum: planTypes }).notNull().default('free'),
})

export const states = pgTable('states', {
  id: serial('id').primaryKey(),
  abbr: text('state_abbr').unique().notNull(),
  name: text('state_name').unique().notNull()
})

export const cities = pgTable('cities', {
  id: serial('id').primaryKey(),
  name: text('city_name').notNull(),
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
  createdAt: timestamp('created_at').notNull().defaultNow(),
  commodity: text('commodity').references(() => commodities.name),
  cityId: integer('city').references(() => cities.id),
  stateId: integer('state').references(() => states.id), // Novo campo adicionado
}, (table) => {
  return {
    priceIdx: uniqueIndex('unique_price_per_day_state_city').on(table.createdAt, table.commodity, table.stateId, table.cityId)
  }
})

// Relations
export const usersRelations = relations(users, ({ one }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId]
  })
}))

export const profilesRelations = relations(profiles, ({ one }) => ({
  subscription: one(plans, {
    fields: [profiles.subscription],
    references: [plans.name]
  })
}))