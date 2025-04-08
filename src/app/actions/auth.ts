// import { db } from '@/db'
// import { users } from '@/db/schema'
// import { SignupFormSchema, FormState } from '@/app/lib/definitions'
// import { cookies } from 'next/headers'
// import { deleteSession } from '@/app/lib/session'
// import { redirect } from 'next/navigation'
 
// export async function signup(state: FormState, formData: FormData) {
  // const validatedFields = SignupFormSchema.safeParse({
  //   name: formData.get('name'),
  //   email: formData.get('email'),
  //   password: formData.get('password'),
  // })
 
  // if (!validatedFields.success) {
  //   return {
  //     errors: validatedFields.error.flatten().fieldErrors,
  //   }
  // }
 
  // Call the provider or db to create a user...
// }
 
// export async function logout() {
//   deleteSession()
//   redirect('/entrar')
// }

// export async function signup2(state: FormState, formData: FormData) {
//   const { data, success, error } = SignupSchema.safeParse({
//     name: formData.get('name'),
//     email: formData.get('email'),
//     password: formData.get('password')
//   })

//   if (!success) return { errors: error.flatten().fieldErrors }

//   const { name, email, password } = data
//   const hashedPassword = await Bun.password.hash(password, 'bcrypt')
//   console.log(name, email, password, hashedPassword)

//   await db.insert(users).values({ name, email, password: hashedPassword })
// }

// export async function signin(state: FormState, formData: FormData) {
//   const { data, success, error } = SignupSchema.safeParse({
//     name: formData.get('name'),
//     email: formData.get('email'),
//     password: formData.get('password')
//   })

//   if (!success) return { errors: error.flatten().fieldErrors }

//   const { name, email, password } = data
//   const hashedPassword = await Bun.password.hash(password, 'bcrypt')
//   console.log(name, email, password, hashedPassword)

//   // Call the provider or db to create a user...
// }
