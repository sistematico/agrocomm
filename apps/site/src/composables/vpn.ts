const API_KEY = '...'
const IP_URL = `https://api.ipgeolocation.io/getip`
const LOC_URL = `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=`

function getRealLocation() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
}

async function fetchJson(url: string) {
    return await (await fetch(url)).json()
}

async function getSimulatedLocation() {
  const ip = (await fetchJson(IP_URL)).ip
  return (await fetchJson(LOC_URL + ip)).time_zone.name
}

async function detectVPN() {
  const real = getRealLocation()
  const simulated = await getSimulatedLocation()
  return { result: real == simulated, real, simulated }
}

async function runDetect() {
  let result, real, simulated
  try {
    const res = await detectVPN()
    result = res.result
    real = res.real
    simulated = res.simulated
  } catch {
    console.log('Failed to request simulated location!')
    return
  }

  if (result) {
    console.log(`
      VPN detected!<br>
      <b>Real location:</b> ${real}<br>
      <b>Simulated location:</b> ${simulated}<br>
    `)
  } else {
    console.log(`
      VPN not detected.<br>
      <b>Location:</b> ${real}<br>
    `)
  }
}

console.log('Detecting...')

runDetect()