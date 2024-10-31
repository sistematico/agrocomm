import { ref } from 'vue'
import { defineStore } from 'pinia'
import { push } from 'notivue'
import type { User } from '@/types'

const url = import.meta.env.VITE_API_URL

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  let tokenTimeout = null as ReturnType<typeof setInterval> | null

  async function start() {
    const token = localStorage.getItem('token')
    if (token && token !== 'null') {
      user.value = JSON.parse(token)
    }
  }

  async function login(username: string, password: string) {
    const { user, token } = await (await fetch(`${url}/users/signin`, 
      { 
        method: 'POST',
        body: JSON.stringify({ username, password }) 
      }
    )).json()

    if (!user || !token) return { message: 'Usuário não encontrado', ok: false }

    user.value = { ...user, token }
    push.info({ message: 'Usuário logado no sistema' })

    startRefreshTokenTimer()
  }

  async function logout() {
    await fetch(`${url}/users/revoke-token`, 
      {
        method: 'post',
        body: JSON.stringify({ token: user.value?.token })
      })

    stopRefreshTokenTimer()
    user.value = null
  }

  async function refreshToken() {
    push.info({ message: 'Token expirado' })
    user.value = await (await fetch(`${url}/users/refresh-token`, 
      { 
        method: 'post', 
        body: JSON.stringify({ token: user.value?.token }) 
      })).json()

    startRefreshTokenTimer()
  }

  function startRefreshTokenTimer() {
    if (!user.value?.token || typeof user.value?.token !== 'string') return
    
    // parse json object from base64 encoded jwt token
    const jwtBase64 = user.value.token.split('.')[1]
    const jwtToken = JSON.parse(atob(jwtBase64))

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000)

    push.error({ message: `Expires: ${expires}` })

    const timeout = expires.getTime() - Date.now() - (60 * 1000)
    tokenTimeout = setTimeout(refreshToken, timeout)
  }

  function stopRefreshTokenTimer() {
    if (tokenTimeout) clearTimeout(tokenTimeout)
  }

  return { user, start, login, logout }
})