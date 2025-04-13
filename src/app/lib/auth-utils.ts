// src/app/lib/auth-utils.ts
// Este arquivo pode ser importado em qualquer lugar, servidor ou cliente
import { jwtVerify } from 'jose'

const secretKey = 'secret'
const encodedKey = new TextEncoder().encode(secretKey)

export async function decryptToken(token: string | undefined = '') {
  if (!token) return null
  
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify token')
    return null
  }
}