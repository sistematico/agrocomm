'use server'

import { z } from 'zod'
import { redirect } from 'next/navigation'
import { signInSchema, signUpSchema } from '@/schemas/auth'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { comparePasswords, generateSalt, hashPassword } from '@/app/lib/password'
import { cookies } from 'next/headers'
import { createSession, deleteSession } from '@/app/lib/session'
import { SignupFormSchema, FormState } from '@/app/lib/definitions'

export async function signin(unsafeData: z.infer<typeof signInSchema>) {
  const { success, data } = signInSchema.safeParse(unsafeData)

  if (!success) return 'Unable to log you in'

  const user = await db.query.users.findFirst({
    columns: { id: true, password: true, email: true, role: true },
    with: { session: true },
    where: eq(users.email, data.email)
  })

  if (user == null || user.password == null || user?.session?.salt == null) {
    return 'Unable to log you in'
  }

  const isCorrectPassword = await comparePasswords({
    hashedPassword: user.password,
    password: data.password,
    salt: user.session.salt
  })

  if (!isCorrectPassword) return 'Unable to log you in'

  await createSession(user, await cookies())

  redirect('/')
}

// export async function signup(unsafeData: z.infer<typeof signUpSchema>) {
export async function signup(state: FormState, formData: FormData) {
  // const { success, data } = signUpSchema.safeParse(unsafeData)
  const { success, data } = SignupFormSchema.safeParse({
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
