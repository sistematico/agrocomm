'use client'

import Form from 'next/form'
import { signup } from '@/actions'
import { useActionState } from 'react'
import { FormState } from '@/types'

// import { createPost } from '@/actions'
// export default function Page() {
//   return (
//     <Form action={createPost}>
//       <input name="title" />
//       {/* ... */}
//       <button type="submit">Create Post</button>
//     </Form>
//   )
// }

export default function SignupForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(
    signup,
    undefined
  )

  return (
    // <form action={action}>
    //   <div>
    //     <label htmlFor="name">Name</label>
    //     <input id="name" name="name" placeholder="Name" />
    //   </div>
    //   {state?.errors?.name && <p>{state.errors.name}</p>}

    //   <div>
    //     <label htmlFor="email">Email</label>
    //     <input id="email" name="email" placeholder="Email" />
    //   </div>
    //   {state?.errors?.email && <p>{state.errors.email}</p>}

    //   <div>
    //     <label htmlFor="password">Password</label>
    //     <input id="password" name="password" type="password" />
    //   </div>
    //   {state?.errors?.password && (
    //     <div>
    //       <p>Password must:</p>
    //       <ul>
    //         {state.errors.password.map((error) => (
    //           <li key={error}>- {error}</li>
    //         ))}
    //       </ul>
    //     </div>
    //   )}
    //   <button disabled={pending} type="submit">
    //     Sign Up
    //   </button>
    // </form>

    <Form className="space-y-6" action={action}>
      <div className="flex gap-4">
        <div className="w-full">
          <label htmlFor="name" className="block font-medium">
            Nome
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="name"
              id="name"
              className="block w-full rounded-md bg-black/10 border-2 border-black/20 px-3 py-1.5 placeholder:text-gray-400 sm:text-sm/6 focus:outline-none"
            />
          </div>
        </div>

        <div className="w-full">
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <div className="mt-2">
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              required
              className="block w-full rounded-md bg-black/10 border-2 border-black/20 px-3 py-1.5 placeholder:text-gray-400 sm:text-sm/6 focus:outline-none"
            />
          </div>
          {state?.errors?.email && <p>{state.errors.email}</p>}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block font-medium">
            Senha
          </label>
        </div>
        <div className="mt-2">
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            required
            className="block w-full rounded-md bg-black/10 border-2 border-black/20 px-3 py-1.5 placeholder:text-gray-400 sm:text-sm/6 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password2" className="block font-medium">
            Repita a Senha
          </label>
        </div>
        <div className="mt-2">
          <input
            type="password"
            name="password2"
            id="password2"
            autoComplete="current-password"
            required
            className="block w-full rounded-md bg-black/10 border-2 border-black/20 px-3 py-1.5 placeholder:text-gray-400 sm:text-sm/6 focus:outline-none"
          />
        </div>
      </div>

      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <button
          type="submit"
          className="cursor-pointer bg-green-700 text-white px-5 py-2 rounded-md hover:bg-green-800 transition-colors"
          disabled={pending}
        >
          Cadastrar
        </button>
      </div>
    </Form>
  )
}
