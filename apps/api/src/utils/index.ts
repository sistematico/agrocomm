import type { States } from '@/types'

// REGION
export const states: States[] = [
  { abbr: 'AC', name: 'Acre' },
  { abbr: 'AL', name: 'Alagoas' },
  { abbr: 'AP', name: 'Amapá' },
  { abbr: 'AM', name: 'Amazonas' },
  { abbr: 'BA', name: 'Bahia' },
  { abbr: 'CE', name: 'Ceará' },
  { abbr: 'DF', name: 'Distrito Federal' },
  { abbr: 'ES', name: 'Espírito Santo' },
  { abbr: 'GO', name: 'Goiás' },
  { abbr: 'MA', name: 'Maranhão' },
  { abbr: 'MT', name: 'Mato Grosso' },
  { abbr: 'MS', name: 'Mato Grosso do Sul' },
  { abbr: 'MG', name: 'Minas Gerais' },
  { abbr: 'PA', name: 'Pará' },
  { abbr: 'PB', name: 'Paraíba' },
  { abbr: 'PR', name: 'Paraná' },
  { abbr: 'PE', name: 'Pernambuco' },
  { abbr: 'PI', name: 'Piauí' },
  { abbr: 'RJ', name: 'Rio de Janeiro' },
  { abbr: 'RN', name: 'Rio Grande do Norte' },
  { abbr: 'RS', name: 'Rio Grande do Sul' },
  { abbr: 'RO', name: 'Rondônia' },
  { abbr: 'RR', name: 'Roraima' },
  { abbr: 'SC', name: 'Santa Catarina' },
  { abbr: 'SP', name: 'São Paulo' },
  { abbr: 'SE', name: 'Sergipe' },
  { abbr: 'TO', name: 'Tocantins' }
]

export function stringToNumber(price: string): number {
  return parseInt(price.replace(',', ''), 10)
}

export function getRandomNumber(min: number, max: number) {
  // Math.floor(Math.random() * (600 - 60 + 1)) + 60 * 1000
  // return Math.random() * (max - min) + min;
  return ((Math.floor(Math.random() * (max - min + 1)) + min) * 1000) * 60
}

export async function loadUrl(url: string): Promise<string> {
  const data = await fetch(url)
    .then(response => response.arrayBuffer())
    .then(buffer => {
      const decoder = new TextDecoder('iso-8859-1' as any)
      return decoder.decode(buffer)
    })
  return data
}

export function extractCityAndState(location: string) {
  if (!location) return { state: null, city: null }

  let stateFound = states.find((state) => location === state.abbr || location.includes(state.name))
  if (stateFound) return { state: stateFound.abbr, city: '-' }  

  const stateAbbr = location.substring(0, 2)
  stateFound = states.find((state) => stateAbbr === state.abbr)

  if (stateFound) return { state: stateFound.abbr, city: location.length > 2 ? location.substring(3) : '-' }

  return { state: null, city: null }
}

// export async function findOrCreateCity(stateName: string, cityName: string) {
//   let city = await db
//     .select()
//     .from(schema.cities)
//     .where(
//       and(
//         eq(schema.cities.stateAbbr, stateName),
//         eq(schema.cities.name, cityName)
//       )
//     )

//   // const { field1, field2 } = result[0]

//   if (!city) {
//     city = await db
//       .insert(schema.cities)
//       .values({ name: cityName, stateAbbr: stateName })
//       .onConflictDoNothing()
//       .returning()
//   }  
  
//   return { city, state: stateName }
// }

// DATE
export function getCurrentDate(): Date {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const timezoneOffset = now.getTimezoneOffset() * 60000 // getTimezoneOffset() retorna em minutos
  const utcDate = new Date(now.getTime() - timezoneOffset)
  // return utcDate.toISOString()
  return utcDate
}

export function getCurrentDateString(): string {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const timezoneOffset = now.getTimezoneOffset() * 60000 // getTimezoneOffset() retorna em minutos
  const utcDate = new Date(now.getTime() - timezoneOffset)
  return utcDate.toISOString()
}

function formatDateToDDMMYYYY(date: Date): string {
  const day = date.getUTCDate().toString().padStart(2, '0')
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0') // Meses são 0-indexados
  const year = date.getUTCFullYear().toString()
  return `${day}/${month}/${year}`
}

export function convertStringToFormattedDateString(dateString: string): string {
  const regex = /(\d{2})\/(\d{2})\/(\d{4})/
  const matches = dateString.match(regex)

  if (!matches) throw new Error(`Formato de data inválido: ${dateString}`)

  const day = parseInt(matches[1], 10)
  const month = parseInt(matches[2], 10) - 1
  const year = parseInt(matches[3], 10)

  let date = new Date(Date.UTC(year, month, day))
  date.setUTCHours(date.getUTCHours() + 3)

  return formatDateToDDMMYYYY(date)
}

export function convertStringToFormattedDate(dateString: string): Date {
  const regex = /(\d{2})\/(\d{2})\/(\d{4})/
  const matches = dateString.match(regex)

  // if (!matches) throw new Error(`Formato de data inválido: ${dateString}`)
  if (!matches) return getCurrentDate()

  const day = parseInt(matches[1], 10)
  const month = parseInt(matches[2], 10) - 1
  const year = parseInt(matches[3], 10)

  let date = new Date(Date.UTC(year, month, day))
  date.setUTCHours(date.getUTCHours()) // date.setUTCHours(date.getUTCHours() + 3)

  return date
}