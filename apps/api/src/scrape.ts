import * as cheerio from 'cheerio'
// import { db } from '../db/index'
// import * as schema from '../db/schema'

// const delay = Math.floor(Math.random() * (600 - 60 + 1)) + 60 * 1000;
// Bun.sleep(delay)

async function scrape(url: string) {
  const data = await fetch(url)
    .then(response => response.arrayBuffer())
    .then(buffer => {
      const decoder = new TextDecoder('iso-8859-1' as any)
      return decoder.decode(buffer)
    })
  return data
}

const body = await scrape('https://afd.calpoly.edu/web/sample-tables')
const $ = cheerio.load(body)

// const table = $('table').find('li')
// const tables = $('table')
// console.log(`List item count: ${table.length}`)

const table = $('table:nth-of-type(1) tbody')
// console.log(table.text())

table.each((i, e) => {
  // let row  = $(e).text().replace(/(\s+)/g, ' ');
  let row  = $(e).find('tr').text().replace(/(\s+)/g, ' ');
  // if (i === 0) console.log($(e).text())
  console.log(row)
})

// $('tr').each((_, e) => {

//     let row  = $(e).text().replace(/(\s+)/g, ' ');
//     console.log(`${row}`);
// });

// console.log(typeof listItems)
// console.log(listItems)

// await db.insert(schema.movies).values([
//   {
//     title: 'The Matrix',
//     releaseYear: 1999,
//   },
//   {
//     title: 'The Matrix Reloaded',
//     releaseYear: 2003,
//   },
//   {
//     title: 'The Matrix Revolutions',
//     releaseYear: 2003,
//   },
// ]);