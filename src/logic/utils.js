export function sortObject(obj) {
  return Object.keys(obj)
    .sort()
    .reduce(function (result, key) {
      result[key] = obj[key]
      return result
    }, {})
}

export function sortArray(obj) {
  arr.sort(function (a, b) {
    var keyA = new Date(a.updated_at),
      keyB = new Date(b.updated_at)
  
    if (keyA < keyB) return -1
    if (keyA > keyB) return 1
    return 0
  })
}

export function sortAlpha(obj) {
  arr.sort(function (a, b) {
    var keyA = new Date(a.updated_at),
      keyB = new Date(b.updated_at)
  
    if (keyA < keyB) return -1
    if (keyA > keyB) return 1
    return 0
  })

  if(a.firstname < b.firstname) { return -1; }
  if(a.firstname > b.firstname) { return 1; }
  return 0;
}

// users.sort((a, b) => a.firstname.localeCompare(b.firstname))

export function geo() {
  const getLocation = async (lat, lon) => {
    try {
      let { address } = await (await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)).json()
      return address.state
    } catch (error) {
      return false
    }
  }

  const success = async (position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    // position.value = getLocation(latitude, longitude)
    getLocation(latitude, longitude)
  }

  const error = (err) => {
    return false
  }

  navigator.geolocation.getCurrentPosition(success, error)
}

export const estados = {
  AC: 'Acre',
  AL: 'Alagoas',
  AP: 'Amapá',
  AM: 'Amazonas',
  BA: 'Bahia',
  CE: 'Ceará',
  DF: 'Distrito Federal',
  ES: 'Espírito Santo',
  GO: 'Goías',
  MA: 'Maranhão',
  MT: 'Mato Grosso',
  MS: 'Mato Grosso do Sul',
  MG: 'Minas Gerais',
  PA: 'Pará',
  PB: 'Paraíba',
  PR: 'Paraná',
  PE: 'Pernambuco',
  PI: 'Piauí',
  RJ: 'Rio de Janeiro',
  RN: 'Rio Grande do Norte',
  RS: 'Rio Grande do Sul',
  RO: 'Rondônia',
  RR: 'Roraíma',
  SC: 'Santa Catarina',
  SP: 'São Paulo',
  SE: 'Sergipe',
  TO: 'Tocantins'
}

// array.find(x => x.name === 'string 1')
export const rotas = {
  'Soja': 'Saca de Soja',
  'Milho': 'Saca de Milho',
  'Boi': 'Arroba do Boi',
  'Vaca': 'Arroba da Vaca'
}

export function convertDate(str) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
    ano = str.slice(0, 4), 
    mes = str.slice(4, 6), 
    dia = str.slice(6, 8),
    date = new Date(`${ano}-${mes}-${dia}T00:00`)
  
  // return new Intl.DateTimeFormat('pt-BR').format(date)
  return date.toLocaleDateString("pt-BR", options)
}

export function preco(valor = '0.00') {
  return 'R$ ' + valor.replace(/\./g, ',')
}

export function copyURL(event) {
  const el = event.target.parentElement.previousSibling
  navigator.clipboard.writeText(el.innerHTML)
}