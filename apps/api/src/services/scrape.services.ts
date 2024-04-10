import * as cheerio from 'cheerio'
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

async function loadUrl(url: string) {
  const data = await fetch(url)
    .then(response => response.arrayBuffer())
    .then(buffer => {
      const decoder = new TextDecoder('iso-8859-1' as any)
      return decoder.decode(buffer)
    })
  return data
}

export async function scrapeUrl(type: QuoteType, provider: string = 'scot') {  
  const data: Quote[] = []; // Assumindo que Quote é um tipo definido em algum lugar
  
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
      const rawPrice = $(el).children().eq(1).text().replace(/(\s+)/g, ' ')
      const price = stringToNumber(rawPrice)
      data.push({ commodityId: providerDetails.id, date, location, price })
    }
  })

  return data
}