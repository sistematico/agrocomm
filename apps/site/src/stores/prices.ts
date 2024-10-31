import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePriceStore = defineStore('prices', () => {
  const state = ref('BR')

  function start(st: string) {
    state.value = st
    
    if (localStorage.getItem('state') !== st) {
      localStorage.setItem('state', st)
    }
  }

  return { state, start }
})