import { states } from '@/utils'

export function extractCityAndState(location: string) {
  if (!location) return null

  let stateFound = states.find((state) => location === state.abbr || location.includes(state.name))
  if (stateFound) return { state: stateFound.abbr, city: location === stateFound.abbr ? '-' : null }  

  const stateAbbr = location.substring(0, 2)
  stateFound = states.find((state) => stateAbbr === state.abbr)

  if (stateFound) return { state: stateFound.abbr, city: location.length > 2 ? location.substring(3) : '-' }

  return null
}
