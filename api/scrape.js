import fs from 'fs'
import * as cheerio from 'cheerio'
import { getJsonPath } from './utils.js'

async function fetchBody(url) {
  const response = await fetch(url)
  const body = await response.text()
  return body
}

async function fetchBodyEncode(url) {
  const decoder = new TextDecoder('iso-8859-1')
  let myHeaders = new Headers()
  myHeaders.append('Content-Type','text/plain; charset=UTF-8')
  
  const response = await fetch(url, myHeaders)
  const buffer = await response.arrayBuffer()
  const body = decoder.decode(buffer)
  
  return body
}

async function scrape(url, elem, tipo) {
  let data = [], retEstado = '', retOldEstado = ''
  
  const body = await fetchBodyEncode(url)
  const $ = cheerio.load(body)
  
  $(elem[0]).each((_, el) => {
    const location = $(el).find(elem[1]).text()
    retEstado = location.replace(/ .*/,'')    
    
    if (retEstado != '') retOldEstado = retEstado
    if (retEstado == '') retEstado = retOldEstado
    
    const indexOfSpace = location.indexOf(' ');
    const regiao = location.substring(indexOfSpace + 1);
    
    if (tipo === 'agricultura') {
      const compra = $(el).find(elem[2]).text().replace(/,/g, '.')
      const venda = $(el).find(elem[3]).text().replace(/,/g, '.') // var res = str.replace(/\D/g, "");
      if (retEstado != '' && !/[^a-zA-Z]/.test(retEstado) && !isNaN(+compra)) data.push({ estado: retEstado, compra, venda })
    } else {
      const avista = $(el).find(elem[2]).text().replace(/,/g, '.')
      const aprazo = $(el).find(elem[3]).text().replace(/,/g, '.') // var res = str.replace(/\D/g, "");
      if (retEstado != '' && !/[^a-zA-Z]/.test(retEstado) && !isNaN(+avista)) data.push({ estado: retEstado, regiao, avista, aprazo })
    }    
  })

  return data
}

async function arrobaDoBoi(queryEstado = null) {
  const opts = { 
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
    opts.data = await scrape(
      'https://www.scotconsultoria.com.br/cotacoes/boi-gordo/', 
      opts.table,
      opts.tipo
    )
    fs.writeFileSync(json, JSON.stringify(opts.data, null, 2))
  } else {
    opts.data = fs.readFileSync(json, (err, data) => {
      if(err) return { message: 'Erro ao recuperar os dados' }
      return data
    })
  }

  if (queryEstado) {
    const filteredEstado = JSON.parse(opts.data).filter(({estado}) => estado.toLowerCase().trim() === queryEstado.toLowerCase().trim())
    if (filteredEstado.length > 0) return filteredEstado
  }

  return opts.data
}

async function arrobaDaVaca(queryEstado = null) {
  const opts = { 
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
    opts.data = await scrape(
      'https://www.scotconsultoria.com.br/cotacoes/vaca-gorda', 
      opts.table,
      opts.tipo
    )
    fs.writeFileSync(json, JSON.stringify(opts.data, null, 2))
  } else {
    opts.data = fs.readFileSync(json, (err, data) => {
      if(err) return { message: 'Erro ao recuperar os dados' }
      return opts.data
    })
  }

  if (queryEstado) {
    const filteredEstado = JSON.parse(opts.data).filter(({estado}) => estado.toLowerCase().trim() === queryEstado.toLowerCase().trim())
    if (filteredEstado.length > 0) return filteredEstado
  }

  return opts.data
}

async function soja(queryEstado = null) {
  const opts = { 
    tipo: 'agricultura', 
    json: 'soja.json', 
    table: [
      'table:nth-child(5) tr',
      'td:nth-child(1)',
      'td:nth-child(3)',
      'td:nth-child(4)'
    ], 
    data: [] 
  }
  const json = getJsonPath(opts.json)

  if (!fs.existsSync(json)) {
    opts.data = await scrape(
      'https://www.scotconsultoria.com.br/cotacoes/graos',
      opts.table,
      opts.tipo
    )
    fs.writeFileSync(json, JSON.stringify(opts.data, null, 2))
  } else {
    opts.data = fs.readFileSync(json, (err, data) => {
      if(err) return { message: 'Erro ao recuperar os dados' }
      return data
    })
  }

  if (queryEstado) {
    const filteredEstado = JSON.parse(opts.data).filter(({estado}) => estado.toLowerCase().trim() === queryEstado.toLowerCase().trim())
    if (filteredEstado.length > 0) return filteredEstado
  }

  return opts.data
}

async function milho(queryEstado = null) {
  const opts = { 
    tipo: 'agricultura', 
    json: 'milho.json', 
    table: [
      'table:nth-child(2) tr',
      'td:nth-child(1)',
      'td:nth-child(3)',
      'td:nth-child(4)'
    ], 
    data: [] 
  }
  const json = getJsonPath(opts.json)

  if (!fs.existsSync(json)) {
    opts.data = await scrape(
      'https://www.scotconsultoria.com.br/cotacoes/graos', 
      opts.table,
      opts.tipo
    )
    fs.writeFileSync(json, JSON.stringify(opts.data, null, 2))
  } else {
    opts.data = fs.readFileSync(json, (err, data) => {
      if(err) return { message: 'Erro ao recuperar os dados' }
      return data
    })
  }

  if (queryEstado) {
    const filteredEstado = JSON.parse(opts.data).filter(({estado}) => estado.toLowerCase().trim() === queryEstado.toLowerCase().trim())
    if (filteredEstado.length > 0) return filteredEstado
  }

  return opts.data
}

export { arrobaDoBoi, arrobaDaVaca, soja, milho }