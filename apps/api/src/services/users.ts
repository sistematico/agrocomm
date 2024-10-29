import { add, list } from '@/models/user'

export async function signup(username: string, email: string, password: string, fullname = '') {
  const user = add({ username, email, password, fullname })
  if (!user) return { message: 'Error creating user' }
  return { message: 'User created', user }
}

export async function signin(identifier: string, password: string) {
  // return await list()
}

export async function users() {
  return await list()
}