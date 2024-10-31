import { add, list, findByIdentifier, findByEmailOrUsername } from '@/models/user'
import { createToken } from '@/services/tokens'

export async function signup(username: string, email: string, password: string, fullname = '') {
  const userExists = await findByEmailOrUsername(username, email)
  if (userExists) return { message: 'O usuário já existe', ok: false }

  const hash = await Bun.password.hash(password)
  const user = await add({ fullname, username, email, password: hash })

  if (!user) return { message: 'Erro ao criar usuário', ok: false }
  return { message: 'Usuário criado', ok: true }
}

export async function signin(identifier: string, password: string) {
  const user = await findByIdentifier(identifier, password)
  if (!user) return { message: 'Usuário não encontrado', ok: false }
  const token = await createToken(user.username, user.id === 1 ? 'admin' : 'user')
  return { message: 'Usuário logado no sistema', user, token, ok: true }
}

export async function users() {
  return await list()
}