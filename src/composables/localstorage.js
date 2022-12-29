import { ref, watch } from 'vue'

export function useStorage(key, val, cb = null) {
// const apiBaseUrl = import.meta.env.VITE_API_URL
// const url = `${apiBaseUrl}/geo`

// async function fetchGeo() {
//   let { geo: { region } } = await (await fetch(url)).json()
//   return region.toLowerCase()
// }



  let storedVal = read()

  if (storedVal) {
    val = ref(storedVal)
  } else {
    val = ref(val)
    write()
  }

  watch(val, write)

  function read() {
    if (cb) {
      return cb()
    } else {
      return JSON.parse(localStorage.getItem(key))
    }
  }

  function write() {
    if (val.value === null || val.value === '') {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, JSON.stringify(val.value))
    }
  }

  return val
}