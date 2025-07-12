import { getCurrentUser } from '@/lib/user'
import { Header } from '@/layouts/header'

export async function HeaderWrapper() {
  const user = await getCurrentUser({ withFullUser: true })

  return <Header user={user ? { ...user, name: user.name ?? undefined } : null} />
}
