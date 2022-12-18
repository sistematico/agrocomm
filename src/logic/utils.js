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

// export const estados = [
//   { AC: 'Acre' },
//   { AL: 'Alagoas' },
//   { AP: 'Amapá' },
//   { AM: 'Amazonas' },
//   { BA: 'Bahia' },
//   { CE: 'Ceará' },
//   { DF: 'Distrito Federal' },
//   { ES: 'Espírito Santo' },
//   { GO: 'Goías' },
//   { MA: 'Maranhão' },
//   { MT: 'Mato Grosso' },
//   { MS: 'Mato Grosso do Sul' },
//   { MG: 'Minas Gerais' },
//   { PA: 'Pará' },
//   { PB: 'Paraíba' },
//   { PR: 'Paraná' },
//   { PE: 'Pernambuco' },
//   { PI: 'Piauí' },
//   { RJ: 'Rio de Janeiro' },
//   { RN: 'Rio Grande do Norte' },
//   { RS: 'Rio Grande do Sul' },
//   { RO: 'Rondônia' },
//   { RR: 'Roraíma' },
//   { SC: 'Santa Catarina' },
//   { SP: 'São Paulo' },
//   { SE: 'Sergipe' },
//   { TO: 'Tocantins' },
// ]

export const estados = [
  { sigla: 'AC', nome: 'Acre' },
  { sigla: 'AL', nome: 'Alagoas' },
  { sigla: 'AP', nome: 'Amapá' },
  { sigla: 'AM', nome: 'Amazonas' },
  { sigla: 'BA', nome: 'Bahia' },
  { sigla: 'CE', nome: 'Ceará' },
  { sigla: 'DF', nome: 'Distrito Federal' },
  { sigla: 'ES', nome: 'Espírito Santo' },
  { sigla: 'GO', nome: 'Goías' },
  { sigla: 'MA', nome: 'Maranhão' },
  { sigla: 'MT', nome: 'Mato Grosso' },
  { sigla: 'MS', nome: 'Mato Grosso do Sul' },
  { sigla: 'MG', nome: 'Minas Gerais' },
  { sigla: 'PA', nome: 'Pará' },
  { sigla: 'PB', nome: 'Paraíba' },
  { sigla: 'PR', nome: 'Paraná' },
  { sigla: 'PE', nome: 'Pernambuco' },
  { sigla: 'PI', nome: 'Piauí' },
  { sigla: 'RJ', nome: 'Rio de Janeiro' },
  { sigla: 'RN', nome: 'Rio Grande do Norte' },
  { sigla: 'RS', nome: 'Rio Grande do Sul' },
  { sigla: 'RO', nome: 'Rondônia' },
  { sigla: 'RR', nome: 'Roraíma' },
  { sigla: 'SC', nome: 'Santa Catarina' },
  { sigla: 'SP', nome: 'São Paulo' },
  { sigla: 'SE', nome: 'Sergipe' },
  { sigla: 'TO', nome: 'Tocantins' }
]
