import * as cheerio from 'cheerio'
import { db } from '@/db'
import { prices } from '@/db/schema'
import { extractCityAndState } from '@/utils'
import { convertStringToFormattedDateString } from '@/utils'
import { loadUrl, stringToNumber } from '@/utils'
import type { Quote } from '@/types'

export async function scrapeBoi() {  
  const url = 'https://www.scotconsultoria.com.br/cotacoes/boi-gordo/?ref=smn'
  const data: Quote[] = [] 
  
  const body = await loadUrl(url)
  const $ = cheerio.load(body)
  
  const tr = $('div.conteudo_centro:nth-child(4) > table:nth-child(5) tbody tr')
  // const tableDate = $('div.conteudo_centro:nth-child(4) > table:nth-child(3) thead tr th').text().replace(/(\s+)/g, ' ')
  const tableDate = $('div.conteudo_centro:nth-child(4) > table:nth-child(5) > thead:nth-child(1) > tr:nth-child(1) > th:nth-child(1)').text().replace(/(\s+)/g, ' ')
  const createdAt = convertStringToFormattedDateString(tableDate)

  tr.each((idx: number, el: any) => {
    if (idx > 2) {
      const location = $(el).children().eq(0).text().replace(/(\s+)/g, ' ')
      const { state, city } = extractCityAndState(location)
      const rawPrice = $(el).children().eq(1).text().replace(/(\s+)/g, ' ')
      const price = stringToNumber(rawPrice)
      
      if ((typeof price === 'number' && !isNaN(price)) && state) {
        data.push({ createdAt, price, city: city ?? '-', state, commodity: 'boi' })
      }
    }
  })

  console.log(JSON.stringify(data,null,2))

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

export async function scrapeVaca() {  
  const url = 'https://www.scotconsultoria.com.br/cotacoes/vaca-gorda/?ref=smn'
  const data: Quote[] = [] 
  
  const body = await loadUrl(url)
  const $ = cheerio.load(body)
  
  const tr = $('div.conteudo_centro:nth-child(4) > table:nth-child(3) tbody tr')
  const tableDate = $('div.conteudo_centro:nth-child(4) > table:nth-child(3) thead tr th').text().replace(/(\s+)/g, ' ')
  const createdAt = convertStringToFormattedDateString(tableDate)

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

export async function scrapeSoja() {  
  const url = 'https://www.scotconsultoria.com.br/cotacoes/graos/?ref=smnb'
  const data: Quote[] = [] 
  
  const body = await loadUrl(url)
  const $ = cheerio.load(body)
  
  const tr = $('div.conteudo_centro:nth-child(4) > table:nth-child(5) tbody tr')
  const tableDate = $('div.conteudo_centro:nth-child(4) > table:nth-child(5) > thead:nth-child(1) > tr:nth-child(1) > th:nth-child(1)').text().replace(/(\s+)/g, ' ')
  const createdAt = convertStringToFormattedDateString(tableDate)

  tr.each((idx: number, el: any) => {
    if (idx > 2) {
      const location = $(el).children().eq(0).text().replace(/(\s+)/g, ' ')
      const { state, city } = extractCityAndState(location)
      const rawPrice = $(el).children().eq(2).text().replace(/(\s+)/g, ' ')
      const price = stringToNumber(rawPrice)
      
      if ((typeof price === 'number' && !isNaN(price)) && state) {
        data.push({ createdAt, price, city: city ?? '-', state, commodity: 'soja' })
      }
    }
  })

  console.log(JSON.stringify(data,null,2))

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

export async function scrapeMilho() {  
  const url = 'https://www.scotconsultoria.com.br/cotacoes/graos/?ref=smnb'
  const data: Quote[] = [] 
  
  const body = await loadUrl(url)
  const $ = cheerio.load(body)
  
  const tr = $('div.conteudo_centro:nth-child(4) > table:nth-child(2) tbody tr')
  const tableDate = $('div.conteudo_centro:nth-child(4) > table:nth-child(2) > thead:nth-child(1) > tr:nth-child(1) > th:nth-child(1)').text().replace(/(\s+)/g, ' ')
  const createdAt = convertStringToFormattedDateString(tableDate)

  tr.each((idx: number, el: any) => {
    if (idx > 2) {
      const location = $(el).children().eq(0).text().replace(/(\s+)/g, ' ')
      const { state, city } = extractCityAndState(location)
      const rawPrice = $(el).children().eq(2).text().replace(/(\s+)/g, ' ')
      const price = stringToNumber(rawPrice)
      
      if ((typeof price === 'number' && !isNaN(price)) && state) {
        data.push({ createdAt, price, city: city ?? '-', state, commodity: 'milho' })
      }
    }
  })

  console.log(JSON.stringify(data,null,2))

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