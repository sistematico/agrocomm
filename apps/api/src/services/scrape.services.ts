import * as cheerio from 'cheerio'
import { extractCityAndState } from '@/services/region.services'
import { convertStringToFormattedDateString, stringToNumber } from '@/utils'
import type { Quote, ProviderInfo, QuoteType } from '@/types'

const providers: { [key in string]: ProviderInfo } = {
  ['scot']: {
    boi: {
      id: 1,
      url: 'https://www.scotconsultoria.com.br/cotacoes/boi-gordo/?ref=smnb',
      tag: 'table:nth-of-type(2) tbody tr',
      datetag: 'table:nth-of-type(2) thead tr th'
    },
    vaca: {
      id: 2,
      url: 'https://www.scotconsultoria.com.br/cotacoes/vaca-gorda/?ref=smnb',
      tag: 'table:nth-of-type(3) tbody tr',
      datetag: 'table:nth-of-type(2) thead tr th'
    },
    milho: {
      id: 2,
      url: 'https://www.scotconsultoria.com.br/cotacoes/vaca-gorda/?ref=smnb',
      tag: 'table:nth-of-type(3) tbody tr',
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

export async function scrapeUrl(type: QuoteType, provider: string = 'scot'): Promise<Quote[]> {  
  const data: Quote[] = [] 
  
  const providerDetails = providers[provider][type]
  if (!providerDetails) throw new Error(`Informações para o tipo ${type} não encontradas.`)
  
  const body = await loadUrl(providerDetails.url)
  const $ = cheerio.load(body)
  const tr = $(providerDetails.tag)
  const tableDate = $(providerDetails.datetag).text().replace(/(\s+)/g, ' ')
  const date = convertStringToFormattedDateString(tableDate)

  tr.each((idx, el) => {
    if (idx > 2) {
      const location = $(el).children().eq(0).text().replace(/(\s+)/g, ' ')
      const { city, state } = extractCityAndState(location)
      const rawPrice = $(el).children().eq(1).text().replace(/(\s+)/g, ' ')
      const price = stringToNumber(rawPrice)
      data.push({ date, price, city: city ? city : '-', state: state ? state : '-', commodityId: providerDetails.id })
    }
  })

  return data
}