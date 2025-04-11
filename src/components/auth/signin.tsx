'use client'

import Form from 'next/form'
import { signin } from '@/actions'
import { useActionState } from 'react'
import { FormState } from '@/types'

export default function SigninForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(signin, undefined)

  return (
    <Form className="space-y-6" action={action}>
      {/* Exibir mensagem de erro geral */}
      {state?.message && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {state.message}
        </div>
      )}


      <div>
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
            defaultValue="agrocomm@agrocomm.com.br"
          />
        </div>
        {state?.errors?.email && <p>{state.errors.email}</p>}
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
            defaultValue="password"
          />
        </div>
        {state?.errors?.password && <p>{state.errors.password}</p>}
      </div>
      
      <div>
        <button
          type="submit"
          className="cursor-pointer bg-green-700 text-white px-5 py-2 rounded-md hover:bg-green-800 transition-colors"
          disabled={pending}
        >
          Entrar
        </button>
      </div>
    </Form>
  )
}
