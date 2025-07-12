export interface UserOptions {
  id: string
  role: string
  email: string
  name?: string
  image?: string
  createdAt?: Date
}

export type User = UserOptions | null | undefined

export interface Session {
  user: User | null // User can be null if not logged in
  isLoggedIn: boolean
}

export type FormState =
  | {
      errors?: { name?: string[]; email?: string[]; password?: string[] }
      message?: string
    }
  | undefined
