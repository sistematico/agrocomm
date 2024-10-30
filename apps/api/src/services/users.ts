import { add, list, findByIdentifier, findByEmailOrUsername } from '@/models/user'

export async function signup(username: string, email: string, password: string, fullname = '') {
  const userExists = await findByEmailOrUsername(username, email)
  if (userExists) return { message: 'User already exists' }

  const hash = await Bun.password.hash(password)
  const user = await add({ fullname, username, email, password: hash })

  if (!user) return { message: 'Error creating user' }
  return { message: 'User created', user }
}

export async function signin(identifier: string, password: string) {
  const user = await findByIdentifier(identifier, password)
  if (!user) return { message: 'User not found' }
  return { message: 'User found', user }
}

export async function users() {
  return await list()
}