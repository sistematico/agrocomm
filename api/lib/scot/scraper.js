import * as cheerio from 'cheerio'
import { fetchBody, extractDate } from '../utils.js'

async function scotScraper(url, elem, tipo) {
  let data = [], retEstado = '', retOldEstado = ''
  
  const body = await fetchBody(url)
  const $ = cheerio.load(body)

  const currentDate = $('div.noticias_table_coluna2:nth-child(2)').text().trim()
  const formatedDate = extractDate(currentDate).replace(/\D/g, "")

  if (isNaN(+formatedDate))
    formatedDate = timestamp().replace(/\D/g, "")
  
  $(elem[0]).each((_, el) => {
    const location = $(el).find(elem[1]).text()
    retEstado = location.replace(/ .*/,'')    
    
    if (retEstado != '') retOldEstado = retEstado
    if (retEstado == '') retEstado = retOldEstado

    if (retEstado === 'Acre') retEstado = 'AC'
    if (retEstado === 'Alagoas') retEstado = 'AL'
    
    const indexOfSpace = location.indexOf(' ');
    const regiao = location.substring(indexOfSpace + 1);
    
    if (tipo === 'agricultura') {
      const cidade = $(el).find(elem[2]).text()
      const compra = $(el).find(elem[3]).text().replace(/,/g, '.')
      const venda = $(el).find(elem[4]).text().replace(/,/g, '.') // var res = str.replace(/\D/g, "");
      if (retEstado != '' && !/[^a-zA-Z]/.test(retEstado) && !isNaN(+compra)) data.push({ date: formatedDate, estado: retEstado, cidade, compra, venda })
    } else {
      const avista = $(el).find(elem[2]).text().replace(/,/g, '.')
      const aprazo = $(el).find(elem[3]).text().replace(/,/g, '.') // var res = str.replace(/\D/g, "");
      if (retEstado != '' && !/[^a-zA-Z]/.test(retEstado) && !isNaN(+avista)) data.push({ date: formatedDate, estado: retEstado, regiao, avista, aprazo })
    }    
  })

  return data.sort(function(a, b){
    if(a.estado < b.estado) return -1
    if(a.estado > b.estado) return 1
    return 0
  })
}

export { scotScraper }