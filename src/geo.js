function findPosition() {
  let loc = {}

  function success(position) {
    const latitude  = position.coords.latitude
    const longitude = position.coords.longitude
    const url = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`
    return { latitude, longitude }
  }

  function error() {
    console.log('Unable to retrieve your location')
  }

  if (!navigator.geolocation) {
    console.log('Geolocation is not supported by your browser')
  } else {
    loc = navigator.geolocation.getCurrentPosition(success, error)
  }

  return loc
}

export { findPosition }
