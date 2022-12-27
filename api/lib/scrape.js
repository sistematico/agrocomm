import fs from 'fs'
import { getJsonPath } from './utils.js'
import { scotScraper } from './scot/scraper.js'

async function arrobaDoBoi(queryEstado = null) {
  const opts = { 
    url: 'https://www.scotconsultoria.com.br/cotacoes/boi-gordo/',
    tipo: 'pecuaria',
    json: 'arroba-do-boi.json', 
    table: [
      'table:nth-child(3) tr',
      'td:nth-child(1)',
      'td:nth-child(2)',
      'td:nth-child(4)'
    ], 
    data: [] 
  }
  const json = getJsonPath(opts.json)

  if (!fs.existsSync(json)) {
    opts.data = await scotScraper(opts.url, opts.table, opts.tipo)

    fs.writeFileSync(json, JSON.stringify(opts.data, null, 2))
  } else {
    opts.data = fs.readFileSync(json, (err, data) => {
      if(err) return { message: 'Erro ao recuperar os dados' }
      return data
    })
  }

  if (queryEstado) {
    const parsed = JSON.parse(opts.data)
    const filteredEstado = parsed.filter(({estado}) => estado.toLowerCase().trim() === queryEstado.toLowerCase().trim())
    if (filteredEstado.length > 0) return filteredEstado
  }

  return opts.data
}

async function arrobaDaVaca(queryEstado = null) {
  const opts = { 
    url: 'https://www.scotconsultoria.com.br/cotacoes/vaca-gorda', 
    tipo: 'pecuaria',
    json: 'arroba-da-vaca.json', 
    table: [
      'table:nth-child(3) tr',
      'td:nth-child(1)',
      'td:nth-child(2)',
      'td:nth-child(4)'
    ], 
    data: [] 
  }
  const json = getJsonPath(opts.json)

  if (!fs.existsSync(json)) {
    opts.data = await scotScraper(opts.url, opts.table, opts.tipo)
    fs.writeFileSync(json, JSON.stringify(opts.data, null, 2))
  } else {
    opts.data = fs.readFileSync(json, (err, data) => {
      if(err) return { message: 'Erro ao recuperar os dados' }
      return opts.data
    })
  }

  if (queryEstado) {
    const parsed = JSON.parse(opts.data)
    const filteredEstado = parsed.filter(({estado}) => estado.toLowerCase().trim() === queryEstado.toLowerCase().trim())
    if (filteredEstado.length > 0) return filteredEstado
  }

  return opts.data
}

async function soja(queryEstado = null) {
  const opts = { 
    url: 'https://www.scotconsultoria.com.br/cotacoes/graos',
    tipo: 'agricultura', 
    json: 'soja.json', 
    table: [
      'table:nth-child(5) tr',
      'td:nth-child(1)',
      'td:nth-child(2)',
      'td:nth-child(3)',
      'td:nth-child(4)'
    ], 
    data: [] 
  }
  const json = getJsonPath(opts.json)

  if (!fs.existsSync(json)) {
    opts.data = await scotScraper(opts.url, opts.table, opts.tipo)
    fs.writeFileSync(json, JSON.stringify(opts.data, null, 2))
  } else {
    opts.data = fs.readFileSync(json, (err, data) => {
      if(err) return { message: 'Erro ao recuperar os dados' }
      return data
    })
  }

  if (queryEstado) {
    const parsed = JSON.parse(opts.data)
    const filteredEstado = parsed.filter(({estado}) => estado.toLowerCase().trim() === queryEstado.toLowerCase().trim())
    if (filteredEstado.length > 0) return filteredEstado
  }

  return opts.data
}

async function milho(queryEstado = null) {
  const opts = { 
    url: 'https://www.scotconsultoria.com.br/cotacoes/graos', 
    tipo: 'agricultura', 
    json: 'milho.json', 
    table: [
      'table:nth-child(2) tr',
      'td:nth-child(1)',
      'td:nth-child(2)',
      'td:nth-child(3)',
      'td:nth-child(4)'
    ], 
    data: [] 
  }
  const json = getJsonPath(opts.json)

  if (!fs.existsSync(json)) {
    opts.data = await scotScraper(opts.url, opts.table, opts.tipo)
    fs.writeFileSync(json, JSON.stringify(opts.data, null, 2))
  } else {
    opts.data = fs.readFileSync(json, (err, data) => {
      if(err) return { message: 'Erro ao recuperar os dados' }
      return data
    })
  }

  if (queryEstado) {
    const parsed = JSON.parse(opts.data)
    const filteredEstado = parsed.filter(({estado}) => estado.toLowerCase().trim() === queryEstado.toLowerCase().trim())
    if (filteredEstado.length > 0) return filteredEstado
  }

  return opts.data
}

export { arrobaDoBoi, arrobaDaVaca, soja, milho }