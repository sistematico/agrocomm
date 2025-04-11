'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { users } from '@/db/schema'
import { createSession, deleteSession } from '@/app/lib/session'
import { comparePasswords, generateSalt, hashPassword } from '@/app/lib/password'
import { SignInSchema, SignUpSchema } from '@/schemas/auth'
import { FormState } from '@/types'

export async function signin(state: FormState, formData: FormData) {
  const validation = SignInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validation.success) {
    return { 
      message: 'Dados de login inválidos',
      errors: validation.error.flatten().fieldErrors
    }
  }

  const { email, password } = validation.data

  try {
    // Buscar usuário pelo email
    const user = await db.query.users.findFirst({
      where: eq(users.email, email)
    })

    if (!user) {
      return { message: 'Email ou senha incorretos' }
    }

    // Verificar a senha
    const passwordMatch = await comparePasswords({
      password,
      salt: user.salt || '',
      hash: user.password
    })

    if (!passwordMatch) {
      return { message: 'Email ou senha incorretos' }
    }

    // Criar sessão
    await createSession(
      { id: user.id, role: user.role },
      await cookies()
    )

    // Redirecionar após login bem-sucedido
    redirect('/')
  } catch (error) {
    console.error('Erro ao fazer login:', error)
    return { message: 'Ocorreu um erro ao processar seu login' }
  }
}

export async function signup(state: FormState, formData: FormData) {
  const validation = SignUpSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validation.success) {
    return { 
      message: 'Dados de cadastro inválidos',
      errors: validation.error.flatten().fieldErrors
    }
  }

  const { name, email, password } = validation.data

  try {
    // Verificar se email já existe
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email)
    })

    if (existingUser) {
      return { message: 'Este email já está em uso' }
    }

    // Gerar salt e hash da senha
    const salt = generateSalt()
    const hashedPassword = await hashPassword(password, salt)

    // Inserir novo usuário
    const [user] = await db.insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
        salt,
        username: email.split('@')[0] // Gerar username básico a partir do email
      })
      .returning({ id: users.id, role: users.role })

    if (!user) {
      return { message: 'Erro ao criar conta' }
    }

    // Criar sessão para o novo usuário
    await createSession(user, await cookies())

    // Redirecionar após cadastro bem-sucedido
    redirect('/')
  } catch (error) {
    console.error('Erro ao criar conta:', error)
    return { message: 'Ocorreu um erro ao processar seu cadastro' }
  }
}

export async function logout() {
  await deleteSession(await cookies())
  redirect('/')
}