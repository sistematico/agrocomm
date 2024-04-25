export async function getGeo(ip: string) {
  const url = 'https://tools.keycdn.com/geo.json?host=' + ip
  const headers = new Headers({
    "Accept"       : "application/json",
    "Content-Type" : "application/json",
    "User-Agent"   : "keycdn-tools:https://www.agrocomm.com.br"
  })

  // fetch(url, { method  : 'GET', headers })

  const data = await (await fetch(url, { method: 'GET', headers })).json()
  return data
}