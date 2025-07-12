import Link from 'next/link'
import Layout from '@/layouts/main'
import { SignInForm } from '@/components/auth/signin'

export default function SignIn() {
  return (
    <Layout>
      <section className="bg-background p-6 rounded-lg border border-black/20 sm:mx-auto sm:w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-4">Entrar</h1>
        <SignInForm />
        <p className="mt-5 text-center">
          Ainda não tem conta?{' '}
          <Link
            href="/cadastro"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Cadastro
          </Link>
        </p>
      </section>
    </Layout>
  )
}
