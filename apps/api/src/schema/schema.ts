import { pgTable, text, integer, serial, uniqueIndex } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { getCurrentDate } from '@/utils'

const now = getCurrentDate()

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  // id: integer('id').primaryKey(),
  name: text('name').notNull(),
  username: text('username').unique().notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  role: text('role').notNull().default('user'),
  createdAt: text('created_at').notNull().default(now),
  profile: integer('profile').references(() => profiles.id),
  }, (table) => {
    return {
      userIdx: uniqueIndex("unique_user_per_username_email").on(table.username, table.email)
    }
})

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  authorId: integer('author_id').notNull(),
});

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, { fields: [posts.authorId], references: [users.id] }),
}));

export const profiles = pgTable('profiles', {
  id: integer('id').primaryKey(),
  // userId: integer('user_id').references(() => users.id),
  subscription: text('subscription').references(() => plans.name).default('free'),
})

export const plans = pgTable('plans', {
  id: integer('id').primaryKey(),
  name: text('name').unique().notNull(),
})

export const states = pgTable('states', {
  id: serial('id').primaryKey(),
  abbr: text('state_abbr').unique().notNull(),
  name: text('state_name').unique().notNull()
})

export const statesRelations = relations(states, ({ many }) => ({
  cities: many(cities),
}));

// export const statesRelations = relations(states, ({ one }) => ({
//   profileInfo: one(profileInfo),
// }));

export const cities = pgTable('cities', {
  id: serial('id').primaryKey(),
  name: text('city_name'),
  // stateId: integer("state_id").unique().references(() => states.id),
})

// export const citiesRelations = relations(cities, ({ one }) => ({
//   state: one(states, {
//     fields: [cities.stateId],
//     references: [states.id],
//   }),
// }));

// export const postsRelations = relations(posts, ({ one }) => ({
//   author: one(users, {
//     fields: [posts.authorId],
//     references: [users.id],
//   }),
// }));

export const commodities = pgTable('commodities', {
  id: integer('id').primaryKey(),
  name: text('name').unique().notNull()
})

export const prices = pgTable("prices", {
  id: integer("id").primaryKey(),
  price: integer('price').notNull(),
  createdAt: text('created_at').notNull().default(now),
  commodity: text('commodity').references(() => commodities.name),
  city: text('city').references(() => cities.name),
  state: text('state').references(() => states.abbr), // Novo campo adicionado
  }, (table) => {
    return {
      priceIdx: uniqueIndex("unique_price_per_day_state_city").on(table.createdAt, table.commodity, table.state, table.city)
    }
})

