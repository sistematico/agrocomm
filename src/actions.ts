'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { eq, desc } from 'drizzle-orm'
import { db } from '@/db'
import { users } from '@/db/schema'
import { createSession, deleteSession } from '@/app/lib/session'
import { comparePasswords, generateSalt, hashPassword } from '@/app/lib/password'
import { SignInSchema, SignUpSchema } from '@/schemas/auth'
import { FormState } from '@/types'

export async function signin(state: FormState, formData: FormData) {
  const { success, data } = SignInSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!success) return { message: 'Unable to log you in' }

  const user = await db.query.users.findFirst({
    columns: { id: true, password: true, email: true, role: true },
    with: {
      sessions: {
        columns: { id: true, salt: true, createdAt: true },
        orderBy: (sessions) => [desc(sessions.createdAt)],
        limit: 1,
      },
    },
    where: eq(users.email, data.email)
  })

  if (!user || !user.sessions || !user?.password) {
    return { message: 'Unable to log you in' }
  }

  const isCorrectPassword = await comparePasswords({
    hashedPassword: user.password,
    password: data.password,
    salt: user?.sessions[0]?.salt || '',
  })

  if (!isCorrectPassword) return { message: 'Unable to log you in' }

  await createSession(user, await cookies())
  redirect('/')
}

export async function signup(state: FormState, formData: FormData) {
  const { success, data } = SignUpSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!success) return { message: 'Unable to create account' }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, data.email)
  })

  if (existingUser != null) return { message: 'Account already exists for this email' }

  try {
    const salt = generateSalt()
    const hashedPassword = await hashPassword(data.password, salt)

    const [user] = await db
      .insert(users)
      .values({
        name: data.name,
        email: data.email,
        password: hashedPassword
        // salt,
      })
      .returning({ id: users.id, role: users.role })

    if (user == null) return { message: 'Unable to create account' }
    await createSession(user, await cookies())
  } catch {
    return { message: 'Unable to create account' }
  }

  redirect('/')
}

export async function logout() {
  await deleteSession(await cookies())
  redirect('/')
}
