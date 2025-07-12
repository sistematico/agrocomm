'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { users } from '@/db/schema'
import { createUserSession, removeUserFromSession } from "@/lib/session";
import { comparePasswords, generateSalt, hashPassword } from '@/lib/auth'
import { signInSchema, signUpSchema } from '@/schemas/auth'
import { FormState } from '@/types'

export async function signIn(unsafeData: z.infer<typeof signInSchema>) {
  const { success, data } = signInSchema.safeParse(unsafeData);
  if (!success) return "Dados de login inválidos";

  const user = await db.query.users.findFirst({
    columns: { password: true, salt: true, id: true, email: true, role: true },
    where: eq(users.email, data.email),
  });

  if (!user) return "Email ou senha incorretos";

  const isCorrectPassword = await comparePasswords({
    hash: user.password,
    password: data.password,
    salt: user.salt || '',
  });

  if (!isCorrectPassword) return "Email ou senha incorretos";

  await createUserSession(
    { ...user, role: user.role ?? "user" },
    await cookies()
  );

  redirect("/");
}

// export async function signIn(state: FormState, formData: FormData) {
//   const validation = SignInSchema.safeParse({
//     email: formData.get('email'),
//     password: formData.get('password')
//   })

//   if (!validation.success)
//     return {
//       message: 'Dados de login inválidos',
//       errors: validation.error.flatten().fieldErrors
//     }

//   const { email, password } = validation.data

//   const user = await db.query.users.findFirst({
//     where: eq(users.email, email)
//   })

//   if (!user) return { message: 'Email ou senha incorretos' }

//   // Verificar a senha
//   const passwordMatch = await comparePasswords({
//     password,
//     salt: user.salt || '',
//     hash: user.password
//   })

//   if (!passwordMatch) return { message: 'Email ou senha incorretos' }

//   await createUserSession(user, await cookies());

//   redirect('/')
// }

// export async function signUp(state: FormState, formData: FormData) {
//   const validation = signUpSchema.safeParse({
//     name: formData.get('name'),
//     email: formData.get('email'),
//     password: formData.get('password')
//   })

//   if (!validation.success) {
//     return {
//       message: 'Dados de cadastro inválidos',
//       errors: validation.error.flatten().fieldErrors
//     }
//   }

//   const { name, email, password } = validation.data

//   const existingUser = await db.query.users.findFirst({
//     where: eq(users.email, email)
//   })

//   if (existingUser) return 'Este email já está em uso'

//   // Gerar salt e hash da senha
//   const salt = generateSalt()
//   const hashedPassword = await hashPassword(password, salt)

//   // Inserir novo usuário
//   const [user] = await db
//     .insert(users)
//     .values({
//       name,
//       email,
//       password: hashedPassword,
//       salt,
//       username: email.split('@')[0] // Gerar username básico a partir do email
//     })
//     .returning({ id: users.id, role: users.role })

//   if (!user) return 'Erro ao criar conta'

//   await createUserSession(user, await cookies());

//   redirect('/')
// }

export async function signUp(unsafeData: z.infer<typeof signUpSchema>) {
  const { success, data } = signUpSchema.safeParse(unsafeData);

  if (!success) return "Dados de cadastro inválidos";

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, data.email),
  });

  if (existingUser != null) return "Este email já está em uso";

  try {
    const salt = generateSalt();
    const hashedPassword = await hashPassword(data.password, salt);

    const [user] = await db
      .insert(users)
      .values({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        salt,
      })
      .returning({ id: users.id, role: users.role });

    if (!user) return "Erro ao criar conta";

    await createUserSession(user, await cookies());
  } catch (error) {
    console.error("Error creating user:", error);
    return "Erro ao criar conta";
  }

  redirect("/");
}

export async function logout() {
  await removeUserFromSession(await cookies());
  redirect('/')
}

// function cookies(): Pick<import("@/lib/session").Cookies, "set"> | PromiseLike<Pick<import("@/lib/session").Cookies, "set">> {
//   throw new Error('Function not implemented.')
// }

