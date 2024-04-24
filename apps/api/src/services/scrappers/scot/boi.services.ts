import * as cheerio from 'cheerio'
import { db } from '@/drizzle'
import * as schema from '@/drizzle/schema'
import { extractCityAndState } from '@/services/region.services'
import { convertStringToFormattedDate } from '@/services/dates.services'
import { loadUrl, stringToNumber } from '@/utils'
import type { Quote } from '@/types'

const url = 'https://www.scotconsultoria.com.br/cotacoes/boi-gordo/?ref=smnb'

export async function scrapeBoi() {  
  const data: Quote[] = [] 
  
  const body = await loadUrl(url)
  const $ = cheerio.load(body)
  
  const tr = $('table:nth-of-type(2) tbody tr')
  const tableDate = $('table:nth-of-type(2) thead tr th').text().replace(/(\s+)/g, ' ')
  
  const createdAt = convertStringToFormattedDate(tableDate)

  tr.each((idx, el) => {
    if (idx > 2) {      
      const kgRegex = /\(?\bkg\b\)?/i // Regex para identificar a presença de 'kg' ou 'KG' (em qualquer combinação de maiúsculas e minúsculas), com ou sem parênteses
      const location = $(el).children().eq(0).text().replace(/(\s+)/g, ' ')
      let { state, city } = extractCityAndState(location)
      const rawPrice = $(el).children().eq(1).text().replace(/(\s+)/g, ' ')
      let price = stringToNumber(rawPrice)

      if (city && kgRegex.test(city)) {
        city = city.replace(kgRegex, '').trim()
        price *= 15
      }      
      
      if ((typeof price === 'number' && !isNaN(price)) && state) {
        data.push({ createdAt, price, city: city ?? '-', state, commodity: 'boi' })
      }
    }
  })

  if (data.length > 0) {
    await db
      .insert(schema.prices)
      .values(data)
      .onConflictDoNothing({ 
        target: [
          schema.prices.createdAt, 
          schema.prices.city, 
          schema.prices.state,
          schema.prices.commodity
        ]          
      })
  }
}