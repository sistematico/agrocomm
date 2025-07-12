import { verifySession } from '@/lib/session'
import { redirect } from 'next/navigation'
 
export default async function Cotacoes() {
  const session = await verifySession()
  const userRole = session?.role // Assuming 'role' is part of the session object
 
  if (userRole === 'admin') {
    return <>Admin</>
  } else if (userRole === 'user') {
    return <>User</>
  } else {
    redirect('/entrar')
  }
}