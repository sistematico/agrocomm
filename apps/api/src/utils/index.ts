import type { States } from '@/types'

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

  // Usa a função auxiliar para formatar a data
  return formatDateToDDMMYYYY(date)
}

export function stringToNumber(price: string): number {
  return parseInt(price.replace(',', ''), 10)
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


export function getCurrentDate(): string {
  const now = new Date();

  // Zera a hora, minutos, segundos e milissegundos localmente
  now.setHours(0, 0, 0, 0);

  // Calcula a diferença do fuso horário local para UTC em milissegundos
  const timezoneOffset = now.getTimezoneOffset() * 60000; // getTimezoneOffset() retorna em minutos

  // Ajusta a data para UTC manualmente
  const utcDate = new Date(now.getTime() - timezoneOffset);

  // Converte para o formato ISO String em UTC
  return utcDate.toISOString()
}

export function getRandomNumber(min: number, max: number) {
  // Math.floor(Math.random() * (600 - 60 + 1)) + 60 * 1000
  // return Math.random() * (max - min) + min;
  return ((Math.floor(Math.random() * (max - min + 1)) + min) * 1000) * 60
}

