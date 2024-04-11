import * as cheerio from 'cheerio'
import { db } from '-/db/index'
import * as schema from '-/db/schema'
import { extractCityAndState } from '@/services/region.services'
import { convertStringToFormattedDateString, stringToNumber, getRandomNumber } from '@/utils'
import type { Quote, ProviderInfo, QuoteType } from '@/types'

const providers: { [key in string]: ProviderInfo } = {
  ['scot']: {
    ['boi']: {
      id: 1,
      url: 'https://www.scotconsultoria.com.br/cotacoes/boi-gordo/?ref=smnb',
      tag: 'table:nth-of-type(2) tbody tr',
      datetag: 'table:nth-of-type(2) thead tr th'
    },
    ['vaca']: {
      id: 2,
      url: 'https://www.scotconsultoria.com.br/cotacoes/vaca-gorda/?ref=smnb',
      tag: 'table:nth-of-type(1) tbody tr',
      datetag: 'table:nth-of-type(1) thead tr th'
    },
    ['milho']: {
      id: 3,
      url: 'https://www.scotconsultoria.com.br/cotacoes/graos/?ref=smnb',
      tag: 'table:nth-of-type(1) tbody tr',
      datetag: 'table:nth-of-type(1) thead tr th'
    },
    ['soja']: {
      id: 4,
      url: 'https://www.scotconsultoria.com.br/cotacoes/graos/?ref=smnb',
      tag: 'table:nth-of-type(2) tbody tr',
      datetag: 'table:nth-of-type(2) thead tr th'
    },
  },
}

async function loadUrl(url: string): Promise<string> {
  const data = await fetch(url)
    .then(response => response.arrayBuffer())
    .then(buffer => {
      const decoder = new TextDecoder('iso-8859-1' as any)
      return decoder.decode(buffer)
    })
  return data
}

async function scrapeUrl(type: QuoteType, provider: string = 'scot') {  
  const data: Quote[] = [] 
  
  const providerDetails = providers[provider][type]
  if (!providerDetails) throw new Error(`Informações para o tipo ${type} não encontradas.`)
  
  const body = await loadUrl(providerDetails.url)
  const $ = cheerio.load(body)
  const tr = $(providerDetails.tag)
  const tableDate = $(providerDetails.datetag).text().replace(/(\s+)/g, ' ')
  const date = convertStringToFormattedDateString(tableDate)
  let location: string, tempLocation: string = ''

  tr.each((idx, el) => {
    if (idx > 2) {
      if (type === 'milho' || type === 'soja') {
        tempLocation = $(el).children().eq(0).text().replace(/(\s+)/g, ' ')
        if (tempLocation !== '') location = tempLocation
        else tempLocation = location
      } else {
        location = $(el).children().eq(0).text().replace(/(\s+)/g, ' ')
      }

      const loc = extractCityAndState(location)
      const rawPrice = $(el).children().eq(1).text().replace(/(\s+)/g, ' ')
      const price = stringToNumber(rawPrice)
      
      if (loc && loc.state) data.push({ date, price, city: loc.city || '-', state: loc.state, commodity: type })
    }
  })

  if (data.length > 0) await db.insert(schema.prices).values(data).onConflictDoNothing()
}

let delay = getRandomNumber(1, 2)
Bun.sleep(delay)
// console.log(`Delay: ${delay}ms`) 

await scrapeUrl('boi', 'scot')

delay = delay = getRandomNumber(1, 2)
Bun.sleep(delay)

await scrapeUrl('vaca', 'scot')

delay = delay = getRandomNumber(1, 2)
Bun.sleep(delay)

await scrapeUrl('milho', 'scot')

delay = delay = getRandomNumber(1, 2)
Bun.sleep(delay)

await scrapeUrl('soja', 'scot')