import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useEstadoStore = defineStore('estado', () => {
  const estado = ref('br')

  const inStorage = localStorage.getItem('estado')
  if (inStorage && inStorage != 'undefined') {
      estado.value = JSON.parse(inStorage)
  } else {
    localStorage.removeItem('estado')
  }

  watch(estado,
    () => {
      console.log(estado, estado.value)
      localStorage.setItem('estado', JSON.stringify(estado.value))
    },
    { deep: true }
  )

  return { estado }
})