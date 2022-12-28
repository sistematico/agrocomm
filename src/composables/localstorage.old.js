import { ref, watch } from 'vue'

export function useStorage(key, defaultValue = null) {
  let storedValue = read()
  
  if (storedValue) {
    defaultValue = ref(storedValue)
  } else {
    defaultValue = ref(defaultValue)
    write()
  }
  
  function read() {
    return JSON.parse(localStorage.getItem(key))
  }
  
  function write() {
    if (defaultValue.value === null || defaultValue.value === '') {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, JSON.stringify(defaultValue.value))
    }
  }
  
  watch(defaultValue, write, { deep: true })
}