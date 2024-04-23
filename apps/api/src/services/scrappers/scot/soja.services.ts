import * as cheerio from 'cheerio'
import { db } from '@/drizzle'
import * as schema from '@/drizzle/schema'
import { extractCityAndState } from '@/services/region.services'
import { convertStringToFormattedDate } from '@/services/dates.services'
import { loadUrl, stringToNumber } from '@/utils'
import type { Quote } from '@/types'

const url = 'https://www.scotconsultoria.com.br/cotacoes/graos/?ref=smnb'

export async function scrapeSoja() {  
  let location: string, tempLocation: string = ''
  const data: Quote[] = [] 
  
  const body = await loadUrl(url)
  const $ = cheerio.load(body)
  
  const tr = $('table:nth-of-type(2) tbody tr')
  const tableDate = $('table:nth-of-type(2) thead tr th').text().replace(/(\s+)/g, ' ')
  
  const createdAt = convertStringToFormattedDate(tableDate)

  tr.each((idx, el) => {
    if (idx > 2) {
      tempLocation = $(el).children().eq(0).text().replace(/(\s+)/g, ' ')
      if (tempLocation !== '') {
        location = tempLocation
      } else {
        tempLocation = location
      }

      const { state, city } = extractCityAndState(location)
      const rawPrice = $(el).children().eq(3).text().replace(/(\s+)/g, ' ')
      const price = stringToNumber(rawPrice)
      
      if ((typeof price === 'number' && !isNaN(price)) && state) {
        data.push({ createdAt, price, city: city ?? '-', state, commodity: 'soja' })
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
          schema.prices.commodity, 
          schema.prices.city, 
          schema.prices.state
        ]          
      })
  }
}