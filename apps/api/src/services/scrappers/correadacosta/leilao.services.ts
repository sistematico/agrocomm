import * as cheerio from 'cheerio'
import { db } from '@/drizzle'
import * as schema from '@/drizzle/schema'
import { extractCityAndState } from '@/services/region.services'
import { convertStringToFormattedDate } from '@/services/dates.services'
import { loadUrl, stringToNumber } from '@/utils'
import type { Quote, Commodity } from '@/types'

const url = 'https://www.correadacosta.com.br/resultados.aspx'

export async function scrapeLeilao() {  
  const data: Quote[] = [] 
  
  const body = await loadUrl(url)
  const $ = cheerio.load(body)
  
  const tr = $('table:nth-of-type(2) tbody tr')
  const tableDate = $('div.mt-3:nth-child(3) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1) > h3:nth-child(1)').text().replace(/(\s+)/g, ' ')
  const commodity = $('.col-sm .col-12 > strong:nth-child(1)').text().replace(/(\s+)/g, ' ').trim().toLowerCase() 
  console.log(commodity)
  const createdAt = convertStringToFormattedDate(tableDate)  

  tr.each((idx, el) => {
    if (idx > 2) {
      const location = $(el).children().eq(0).text().replace(/(\s+)/g, ' ')
      const { state, city } = extractCityAndState(location)
      const rawPrice = $(el).children().eq(3).text().replace(/(\s+)/g, ' ')
      const price = stringToNumber(rawPrice)
      
      if ((typeof price === 'number' && !isNaN(price)) && state) {
        data.push({ createdAt, price, city: city ?? '-', state, commodity })
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