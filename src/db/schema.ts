// import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'

// export const users = pgTable('users', {
//   id: integer().primaryKey().generatedAlwaysAsIdentity(),
//   name: varchar({ length: 255 }).notNull(),
//   age: integer().notNull(),
//   email: varchar({ length: 255 }).notNull().unique()
// })

import { integer, pgTable, varchar, decimal, timestamp, pgEnum, boolean } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Enum para tipos de commodities
export const commodityTypeEnum = pgEnum('commodity_type', [
  'SOJA', 
  'MILHO', 
  'BOI', 
  'VACA', 
  'BEZERRO', 
  'BEZERRA'
])

// Enum para unidades de medida
export const unitEnum = pgEnum('unit', [
  'SACA_60KG',
  'ARROBA',
  'UNIDADE'
])

// Tabela de usuários (mantida do schema original)
export const users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  role: varchar({ length: 50 }).default('user').notNull(),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull()
})

export const usersRelations = relations(users, ({ many }) => ({
  price_updates: many(priceUpdates),
}))

// Tabela de commodities
export const commodities = pgTable('commodities', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  type: commodityTypeEnum(),
  unit: unitEnum(),
  description: varchar({ length: 1000 }),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull()
})

export const commoditiesRelations = relations(commodities, ({ many }) => ({
  prices: many(prices),
}))

// Tabela de regiões/locais
export const regions = pgTable('regions', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  state: varchar({ length: 2 }).notNull(),
  city: varchar({ length: 255 }),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull()
})

export const regionsRelations = relations(regions, ({ many }) => ({
  prices: many(prices),
}))

// Tabela de preços
export const prices = pgTable('prices', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  commodity_id: integer().notNull().references(() => commodities.id),
  region_id: integer().notNull().references(() => regions.id),
  price: decimal({ precision: 10, scale: 2 }).notNull(),
  date: timestamp().defaultNow().notNull(),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull()
})

export const pricesRelations = relations(prices, ({ one }) => ({
  commodity: one(commodities, {
    fields: [prices.commodity_id],
    references: [commodities.id],
  }),
  region: one(regions, {
    fields: [prices.region_id],
    references: [regions.id],
  }),
}))

// Tabela de histórico de atualizações de preços
export const priceUpdates = pgTable('price_updates', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  price_id: integer().notNull().references(() => prices.id),
  user_id: integer().notNull().references(() => users.id),
  old_price: decimal({ precision: 10, scale: 2 }),
  new_price: decimal({ precision: 10, scale: 2 }).notNull(),
  updated_at: timestamp().defaultNow().notNull()
})

export const priceUpdatesRelations = relations(priceUpdates, ({ one }) => ({
  price: one(prices, {
    fields: [priceUpdates.price_id],
    references: [prices.id],
  }),
  user: one(users, {
    fields: [priceUpdates.user_id],
    references: [users.id],
  }),
}))

// Tabela de assinaturas de alertas
export const priceAlerts = pgTable('price_alerts', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: integer().notNull().references(() => users.id),
  commodity_id: integer().notNull().references(() => commodities.id),
  region_id: integer().notNull().references(() => regions.id),
  target_price: decimal({ precision: 10, scale: 2 }).notNull(),
  alert_type: varchar({ length: 50 }).notNull(), // 'above', 'below'
  is_active: boolean().default(true).notNull(),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull()
})

// Script de seed para inicializar as commodities solicitadas
export const seedCommodities = [
  { name: 'Saca de Soja', type: 'SOJA', unit: 'SACA_60KG', description: 'Preço da saca de soja de 60kg' },
  { name: 'Saca de Milho', type: 'MILHO', unit: 'SACA_60KG', description: 'Preço da saca de milho de 60kg' },
  { name: 'Arroba do Boi', type: 'BOI', unit: 'ARROBA', description: 'Preço da arroba do boi' },
  { name: 'Arroba da Vaca', type: 'VACA', unit: 'ARROBA', description: 'Preço da arroba da vaca' },
  { name: 'Bezerro', type: 'BEZERRO', unit: 'UNIDADE', description: 'Preço unitário do bezerro' },
  { name: 'Bezerra', type: 'BEZERRA', unit: 'UNIDADE', description: 'Preço unitário da bezerra' }
]
