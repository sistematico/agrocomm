import { add, list, findByIdentifier, findByEmailOrUsername } from '@/models/user'
import { createTokens } from '@/services/tokens'

export async function signup(username: string, email: string, password: string, fullname = '') {
  const userExists = await findByEmailOrUsername(username, email)
  if (userExists) return { message: 'O usuário já existe', ok: false }

  const hash = await Bun.password.hash(password)
  const user = await add({ fullname, username, email, password: hash })

  if (!user) return { message: 'Erro ao criar usuário', ok: false }
  return { message: 'Usuário criado', ok: true }
}

export async function signin(identifier: string, passwd: string) {
  const data = await findByIdentifier(identifier, passwd)
  if (!data) return { message: 'Usuário não encontrado', ok: false }
  
  const { password, ...user } = data
  const { accessToken, refreshToken } = await createTokens(user.username, user.id === 1 ? 'admin' : 'user')
  
  return { message: 'Usuário logado no sistema', user: { ...user, tokens: { accessToken, refreshToken } }, ok: true }
}

export async function users() {
  return await list()
}