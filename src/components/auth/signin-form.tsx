'use client'

import Link from 'next/link'
import { signup } from '@/app/actions/auth'
import { useActionState } from 'react'

export default function SigninForm() {
  const [state, action, pending] = useActionState(signup, undefined)

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

    <form className="space-y-6" action={action}>
      <div>
        <label htmlFor="email" className="block text-sm/6 font-medium">
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
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block font-medium">
            Senha
          </label>
          <div className="text-sm">
            <Link
              href="/senha"
              className="font-semibold text-green-600 hover:text-indigo-500"
            >
              Esqueceu a senha?
            </Link>
          </div>
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
        <button
          type="submit"
          className="cursor-pointer bg-green-700 text-white px-5 py-2 rounded-md hover:bg-green-800 transition-colors"
        >
          Entrar
        </button>
      </div>
    </form>
  )
}
