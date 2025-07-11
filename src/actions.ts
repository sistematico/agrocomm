'use server'

import { redirect } from 'next/navigation'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { users } from '@/db/schema'
import { createSession, deleteSession } from '@/app/lib/server-session'
import { comparePasswords, generateSalt, hashPassword } from '@/app/lib/password'
import { z } from 'zod'
import { SignInSchema, SignUpSchema } from '@/schemas/auth'
import { FormState } from '@/types'

// export async function signin(state: FormState, formData: FormData) {
export async function signIn(unsafeData: z.infer<typeof SignInSchema>) {
  const { success, data } = SignInSchema.safeParse(unsafeData);
  if (!success) return "Dados de login inválidos";

  const user = await db.query.users.findFirst({
    columns: { password: true, salt: true, id: true, email: true, role: true },
    where: eq(users.email, data.email),
  });

  if (!user) return "Usuário não encontrado";

  const isCorrectPassword = await comparePasswords({
    hashedPassword: user.password,
    password: data.password,
    salt: user.salt || "",
  });

  if (!isCorrectPassword) return "Usuário ou senha incorretos";

    // Criar sessão
    await createSession({ id: user.id, role: user.role })

    // Redirecionar após login bem-sucedido
    redirect('/')
}

export async function signup(state: FormState, formData: FormData) {
  const validation = SignUpSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password')
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
    const [user] = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
        salt,
        username: email.split('@')[0] // Gerar username básico a partir do email
      })
      .returning({ id: users.id, role: users.role })

    if (!user) return { message: 'Erro ao criar conta' }

    // Criar sessão para o novo usuário
    await createSession({ id: user.id, role: user.role })

    // Redirecionar após cadastro bem-sucedido
    redirect('/')
  } catch (error) {
    console.error('Erro ao criar conta:', error)
    return { message: 'Ocorreu um erro ao processar seu cadastro' }
  }
}

export async function logout() {
  await deleteSession()
  redirect('/')
}
