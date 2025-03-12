import Layout from '@/layouts/main'

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-4xl font-bold">Welcome to Next.js</h1>
        <p className="text-lg mt-4">Get started by editing{' '}
          <code className="bg-gray-100 p-1">pages/index.tsx</code>
        </p>
      </div>
    </Layout>
  )
}
