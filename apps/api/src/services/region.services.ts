import { states } from '@/utils'

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
