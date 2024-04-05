import { sqliteTable, text, integer, uniqueIndex,  } from 'drizzle-orm/sqlite-core'

const now = new Date().toISOString()

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username').unique().notNull(),
  email: text('email').unique().notNull(),
  name: text('name').notNull(),
  role: text('role').notNull().default('user'),
  password: text('password').notNull(),
  createdAt: text('created_at').notNull().default(now)
})

export const commodities = sqliteTable('commodities', {
  id: integer('id').primaryKey(),
  name: text('name').unique().notNull()
})

// export const prices = sqliteTable('prices', {
//   id: integer('id').primaryKey(),
//   price: integer('price').notNull(),
//   createdAt: text('created_at').notNull().default(now),
//   commodityId: integer('commodity_id').references(() => commodities.id),
//   cityId: integer('city_id').references(() => cities.id),
// })

export const prices = sqliteTable('prices', {
  id: integer('id').primaryKey(),
  price: integer('price').notNull(),
  createdAt: text('created_at').notNull().default(now),
  commodityId: integer('commodity_id').references(() => commodities.id),
  cityId: integer('city_id').references(() => cities.id),
  stateId: integer('state_id').references(() => states.id), // Novo campo adicionado
  }, (t) => ({
    priceIdx: uniqueIndex('unique_price_per_day_state_city').on(t.createdAt, t.commodityId, t.stateId, t.cityId)
  })
)

// export const states = sqliteTable('states', {
//     id: integer('id').primaryKey(),
//     abbr: text('abbr'),
//     name: text('name'),
//   }, (cities) => ({
//     nameIdx: uniqueIndex('nameIdx').on(cities.name)
//   })
// )

// export const cities = sqliteTable('cities', {
//   id: integer('id').primaryKey(),
//   name: text('name')
// })

export const states = sqliteTable('states', {
  id: integer('id').primaryKey(),
  abbr: text('abbr').unique().notNull(),
  name: text('name').unique().notNull()
})

export const cities = sqliteTable('cities', {
  id: integer('id').primaryKey(),
  name: text('name'),
  state: integer('state_abbr').references(() => states.abbr)
})