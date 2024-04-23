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

  if (!matches) throw new Error(`Formato de data inválido: ${dateString}`)

  const day = parseInt(matches[1], 10)
  const month = parseInt(matches[2], 10) - 1
  const year = parseInt(matches[3], 10)

  let date = new Date(Date.UTC(year, month, day))
  // date.setUTCHours(date.getUTCHours() + 3)
  date.setUTCHours(date.getUTCHours())

  // Usa a função auxiliar para formatar a data
  return date
}
