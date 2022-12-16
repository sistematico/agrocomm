import fs from 'fs'
import * as cheerio from 'cheerio'
import { getJsonPath } from './utils.js'

async function fetchBody(url) {
  const response = await fetch(url)
  const body = await response.text()
  return body
}

async function scrape(url, elem) {
  let data = [], estado = '', oldestado = ''
  
  const body = await fetchBody(url)
  const $ = cheerio.load(body)
  
  $(elem[0]).each((_, el) => {
    const location = $(el).find('td:nth-child(1)').text()
    estado = location.replace(/ .*/,'')    
    
    if (estado != '') oldestado = estado
    if (estado == '') estado = oldestado
    
    const indexOfSpace = location.indexOf(' ');
    const regiao = location.substring(indexOfSpace + 1);
    
    const avista = $(el).find('td:nth-child(2)').text().replace(/,/g, '.')
    const aprazo = $(el).find('td:nth-child(4)').text().replace(/,/g, '.') // var res = str.replace(/\D/g, "");

    if (estado != '') {
      if (!/[^a-zA-Z]/.test(estado) && !isNaN(+avista)) data.push({ estado, regiao, avista, aprazo })
    }
  })

  return data
}

async function arrobaDoBoi() {
  let data = []
  const json = getJsonPath('arroba-do-boi.json')

  if (!fs.existsSync(json)) {
    data = await scrape('https://www.scotconsultoria.com.br/cotacoes/boi-gordo/', ['table:nth-child(3) tr'])
    fs.writeFileSync(json, JSON.stringify(data, null, 2))
  } else {
    data = fs.readFileSync(json, 'utf8', (err, data) => {
      if(err) return { message: 'Erro ao recuperar os dados' }
      return data
    })
  }

  return data
}

async function arrobaDaVaca() {
  const opts = { nome: 'vaca', json: 'arroba-da-vaca.json', data: [] }
  const json = getJsonPath(opts.json)

  if (!fs.existsSync(json)) {
    opts.data = await scrape('https://www.scotconsultoria.com.br/cotacoes/vaca-gorda', ['table:nth-child(3) tr'])
    fs.writeFileSync(json, JSON.stringify(opts.data, null, 2))
  } else {
    opts.data = fs.readFileSync(json, 'utf8', (err, data) => {
      if(err) return { message: 'Erro ao recuperar os dados' }
      return opts.data
    })
  }

  return opts.data
}

async function soja() {
  let data = []
  const json = getJsonPath('soja.json')

  if (!fs.existsSync(json)) {
    data = await scrape('https://www.scotconsultoria.com.br/cotacoes/graos', ['table:nth-child(3) tr'])
    fs.writeFileSync(json, JSON.stringify(data, null, 2))
  } else {
    data = fs.readFileSync(json, 'utf8', (err, data) => {
      if(err) return { message: 'Erro ao recuperar os dados' }
      return data
    })
  }

  return data
}

async function milho() {
  let data = []
  const json = getJsonPath('milho.json')

  if (!fs.existsSync(json)) {
    data = await scrape('https://www.scotconsultoria.com.br/cotacoes/graos', ['table:nth-child(3) tr'])
    fs.writeFileSync(json, JSON.stringify(data, null, 2))
  } else {
    data = fs.readFileSync(json, 'utf8', (err, data) => {
      if(err) return { message: 'Erro ao recuperar os dados' }
      return data
    })
  }

  return data
}

export { arrobaDoBoi, arrobaDaVaca, soja, milho }