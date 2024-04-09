import * as cheerio from 'cheerio'

async function loadUrl(url: string) {
  const data = await fetch(url)
    .then(response => response.arrayBuffer())
    .then(buffer => {
      const decoder = new TextDecoder('iso-8859-1' as any)
      return decoder.decode(buffer)
    })
  return data
}

export async function scrapeUrl() {
  const body = await loadUrl('https://www.scotconsultoria.com.br/cotacoes/boi-gordo/?ref=smnb')
  const $ = cheerio.load(body)
  const tr = $('table:nth-of-type(2) tbody tr')

  let items = []

  tr.each((idx, el) => {
    if (idx > 2) {
      const row = $(el)
      row.each((_, r) => {
        console.log($(r).text())
        // console.log(i, $(e).text().replace(/(\s+)/g, ' '))    
      })
    }
    
    // const row  = $(e).find('td').text().replace(/(\s+)/g, ' ');
    // if (i > 2) console.log(row)
  })

  // console.log(typeof listItems)
  // console.log(listItems)
}

await scrapeUrl()