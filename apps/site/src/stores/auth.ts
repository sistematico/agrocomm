import { ref } from 'vue'
import { defineStore } from 'pinia'
import { push } from 'notivue'
import type { User } from '@/types'

const url = import.meta.env.VITE_API_URL

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  let tokenTimeout = null as ReturnType<typeof setInterval> | null

  async function start() {
    const data = localStorage.getItem('auth')
    if (data && data !== 'null') {
      user.value = JSON.parse(data)
    }
  }

  async function login(data: User) {
    user.value = data
    localStorage.setItem('auth', JSON.stringify(data))
    push.info({ message: 'Usuário logado no sistema' })
    startRefreshTokenTimer()
  }

  async function logout() {
    localStorage.removeItem('auth')
    await fetch(`${url}/users/revoke-token`, 
      {
        method: 'post',
        body: JSON.stringify({ token: user.value?.tokens?.refreshToken })
      })
    user.value = null
    push.info({ message: 'Você saiu da sua conta' })
    stopRefreshTokenTimer()
  }

  async function refreshToken() {
    if (!user.value?.tokens?.refreshToken) return

    push.info({ message: 'Token expirado' })
    
    const data = await (await fetch(`${url}/users/refresh-token`, 
      { 
        method: 'post', 
        body: JSON.stringify({ token: user.value?.tokens?.refreshToken }) 
      })).json()

    user.value.tokens = data

    startRefreshTokenTimer()
  }

  function startRefreshTokenTimer() {
    if (!user.value?.tokens?.accessToken || typeof user.value?.tokens?.accessToken !== 'string') return
    
    // parse json object from base64 encoded jwt token
    const jwtBase64 = user.value?.tokens?.accessToken.split('.')[1]
    const jwtToken = JSON.parse(atob(jwtBase64))

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000)

    const timeout = expires.getTime() - Date.now() - (60 * 1000)
    tokenTimeout = setTimeout(refreshToken, timeout)
  }

  function stopRefreshTokenTimer() {
    if (tokenTimeout) clearTimeout(tokenTimeout)
  }

  return { user, start, login, logout }
})