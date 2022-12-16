import { ref, onMounted } from 'vue'

export function useGeo() {
  const lat = ref(0)
  const lon = ref(0)
  const estado = ref('')
  const data = ref({})

  function getCoordinates() {
    navigator.geolocation.getCurrentPosition(
      position => {
        return { lat: position.coords.latitude, lon: position.coords.longitude }
      },
      error => {
        console.log(error.message)
      }
    )   
  }

  function getLocation() {
    let coords = getCoordinates()

    try {
      let { data } = fetch(`https://nominatim.openstreetmap.org/reverse?lat=${coords.lat}&lon=${coords.lon}`).json()
      console.log(data)
    } catch (error) {
      console.log(error.message);
    } 

    return data
  }

  onMounted(() => getLocation())

  return { data }
}
