import Link from 'next/link'
import Layout from '@/layouts/main'
import { SignUpForm } from '@/components/auth/signup'

export default function SignUp() {
  return (
    <Layout>
      <section className="bg-background p-6 rounded-lg border border-black/20 sm:mx-auto sm:w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-4">Cadastro</h1>
        <SignUpForm />
        <p className="mt-5 text-center">
          Já tem conta?{' '}
          <Link
            href="/entrar"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Entre
          </Link>
        </p>
      </section>
    </Layout>
  )
}
