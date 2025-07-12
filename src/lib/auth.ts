import crypto from 'crypto'

export function hashPassword(password: string, salt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password.normalize(), salt, 64, (error, hash) => {
      if (error) reject(error)
      resolve(hash.toString('hex').normalize())
    })
  })
}

export async function comparePasswords({
  password,
  salt,
  hash
}: {
  password: string
  salt: string
  hash: string
}) {
  const inputHashedPassword = await hashPassword(password, salt)
  
  // Garantir que ambos os buffers tenham o mesmo comprimento
  const inputBuffer = Buffer.from(inputHashedPassword, 'hex')
  const storedBuffer = Buffer.from(hash, 'hex')
  
  // Verificar se os buffers têm tamanhos diferentes
  if (inputBuffer.length !== storedBuffer.length) {
    console.log('Buffers têm tamanhos diferentes:', inputBuffer.length, storedBuffer.length)
    return false
  }
  
  try {
    return crypto.timingSafeEqual(inputBuffer, storedBuffer)
  } catch (error) {
    console.error('Erro ao comparar senhas:', error)
    return false
  }
}

export function generateSalt(): string {
  return crypto.randomBytes(16).toString('hex').normalize()
}