import * as cheerio from 'cheerio'
import { db } from '@/db'
import { prices } from '@/db/schema'
import { extractCityAndState } from '@/utils'
import { convertStringToFormattedDateString } from '@/utils'
import { loadUrl, stringToNumber } from '@/utils'
import type { Quote } from '@/types'

const url = 'https://www.scotconsultoria.com.br/cotacoes/vaca-gorda/?ref=smn'

export async function scrapeVaca() {  
  const data: Quote[] = [] 
  
  const body = await loadUrl(url)
  const $ = cheerio.load(body)
  
  // const tr = $('table:nth-of-type(1) tbody tr')
  const tr = $('div.conteudo_centro:nth-child(4) > table:nth-child(3) tbody tr')
  // const tableDate = $('table:nth-of-type(1) thead tr th').text().replace(/(\s+)/g, ' ')
  const tableDate = $('div.conteudo_centro:nth-child(4) > table:nth-child(3) thead tr th').text().replace(/(\s+)/g, ' ')
  
  const createdAt = convertStringToFormattedDateString(tableDate)

  console.log(tableDate)

  tr.each((idx: number, el: any) => {
    if (idx > 2) {
      const location = $(el).children().eq(0).text().replace(/(\s+)/g, ' ')
      const { state, city } = extractCityAndState(location)
      const rawPrice = $(el).children().eq(2).text().replace(/(\s+)/g, ' ')
      const price = stringToNumber(rawPrice)
      
      if ((typeof price === 'number' && !isNaN(price)) && state) {
        data.push({ createdAt, price, city: city ?? '-', state, commodity: 'vaca' })
      }
    }
  })

  console.log(JSON.stringify(data, null, 2))

  if (data.length > 0) {
    await db
      .insert(prices)
      .values(data)
      .onConflictDoNothing({ 
        target: [
          prices.createdAt, 
          prices.commodity, 
          prices.city, 
          prices.state
        ]          
      })
  }
}

scrapeVaca()