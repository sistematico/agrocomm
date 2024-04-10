import { sqliteTable, text, integer, index, uniqueIndex } from 'drizzle-orm/sqlite-core'
import { getCurrentDate } from '@/utils'

const now = getCurrentDate()

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username').unique().notNull(),
  email: text('email').unique().notNull(),
  name: text('name').notNull(),
  role: text('role').notNull().default('user'),
  password: text('password').notNull(),
  createdAt: text('created_at').notNull().default(now)
})

export const states = sqliteTable('states', {
  id: integer('id').primaryKey(),
  abbr: text('state_abbr').unique().notNull(),
  name: text('state_name').unique().notNull()
})

export const cities = sqliteTable('cities', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('city_name'),
  state: text('state').references(() => states.abbr)
})

export const commodities = sqliteTable('commodities', {
  id: integer('id').primaryKey(),
  name: text('name').unique().notNull()
})

// export const prices = sqliteTable('prices', {
//   id: integer('id').unique().primaryKey({ autoIncrement: true }),
//   price: integer('price').notNull(),
//   createdAt: text('created_at').notNull().default(now),
//   commodityId: integer('commodity_id').references(() => commodities.id),
//   city: text('city').references(() => cities.name),
//   state: text('state').references(() => states.abbr), // Novo campo adicionado
//   }, (t) => ({
//     priceIdx: uniqueIndex('unique_price_per_day_state_city').on(t.id, t.createdAt, t.commodityId, t.state, t.city)
//   })
// )

export const prices = sqliteTable("prices", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  price: integer('price').notNull(),
  createdAt: text('created_at').notNull().default(now),
  commodityId: integer('commodity_id').references(() => commodities.id),
  city: text('city').references(() => cities.name),
  state: text('state').references(() => states.abbr), // Novo campo adicionado
}, (table) => {
  return {
    priceIdx: uniqueIndex("unique_price_per_day_state_city").on(table.createdAt, table.commodityId, table.state, table.city)
  }
})