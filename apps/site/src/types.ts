// export const users = sqliteTable('users', {
//   id: int().primaryKey({ autoIncrement: true }),
//   fullname: text(),
//   username: text().notNull().unique(),
//   email: text().notNull().unique(),
//   password: text().notNull(),
// })


export interface Token {
  id?: number
  token: string
  expiry: string
  userId: number
  createdAt?: string
}

export interface Profile {
  id?: number
  bio: string
  userId: number
}

export interface User {
  id?: number
  fullname: string
  username: string
  email: string
  tokens?: { accessToken: Token | string, refreshToken: Token | string }
  profile?: Profile
}

export interface Quote {
  id: number
  price: number
  commodity: string
  state: string
  city: string
  createdAt: string
}

export interface Quote {
  id: number
  price: number
  commodity: string
  state: string
  city: string
  createdAt: string
}

export interface State {
  name: string
  abbr: string
}