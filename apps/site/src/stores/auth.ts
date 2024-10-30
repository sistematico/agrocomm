import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface User {
  id?: number
  fullname?: string
  username: string
  email: string
  password?: string
  role?: 'user' | 'creator' | 'top_creator' | 'influencer' | 'admin' | 'superadmin'
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  let tokenTimeout = null as ReturnType<typeof setInterval> | null

  return { user }
})