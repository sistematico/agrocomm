import { db } from '@/db'
import { users } from '@/db/schema'
import { SignupSchema, FormState } from '@/app/lib/definitions'

export async function signup(state: FormState, formData: FormData) {
  const { data, success, error } = SignupSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password')
  })

  if (!success) return { errors: error.flatten().fieldErrors }

  const { name, email, password } = data
  const hashedPassword = await Bun.password.hash(password, 'bcrypt')
  console.log(name, email, password, hashedPassword)

  await db.insert(users).values({ name, email, password: hashedPassword })
}

export async function signin(state: FormState, formData: FormData) {
  const { data, success, error } = SignupSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password')
  })

  if (!success) return { errors: error.flatten().fieldErrors }

  const { name, email, password } = data
  const hashedPassword = await Bun.password.hash(password, 'bcrypt')
  console.log(name, email, password, hashedPassword)

  // Call the provider or db to create a user...
}
