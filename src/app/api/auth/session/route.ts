import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

const secretKey = 'secret'
const encodedKey = new TextEncoder().encode(secretKey)

async function decrypt(session: string | undefined = '') {
  try {
    if (!session) return undefined
    
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session')
    return undefined
  }
}

export async function GET() {
  const cookie = (await cookies()).get('session')?.value
  
  if (!cookie) {
    return Response.json({ isLoggedIn: false })
  }
  
  const session = await decrypt(cookie)
  
  if (!session?.userId) {
    return Response.json({ isLoggedIn: false })
  }
  
  return Response.json({
    isLoggedIn: true,
    userId: session.userId,
    role: session.role
  })
}