import { reactive } from 'vue'

export const store = reactive({
  count: 0
})

export const useAuthStore = reactive({
  user: null,
  refresh: async () => {
    console.log('refreshing user')
  }
})