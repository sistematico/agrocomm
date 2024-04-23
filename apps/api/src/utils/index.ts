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

export function stringToNumber(price: string): number {
  return parseInt(price.replace(',', ''), 10)
}

export function getRandomNumber(min: number, max: number) {
  // Math.floor(Math.random() * (600 - 60 + 1)) + 60 * 1000
  // return Math.random() * (max - min) + min;
  return ((Math.floor(Math.random() * (max - min + 1)) + min) * 1000) * 60
}

