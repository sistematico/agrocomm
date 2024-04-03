import * as cheerio from 'cheerio'

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

const listItems = $('ul').find('li')
console.log(`List item count: ${listItems.length}`)
console.log(typeof listItems)
console.log(listItems)

// const response = await fetch("https://bun.sh");
// const html = await response.text(); // HTML string

// const $ = await cheerio.fromURL('https://afd.calpoly.edu/web/sample-tables');

// import { db } from '../db/index'
// import * as schema from '../db/schema'

// const delay = Math.floor(Math.random() * (600 - 60 + 1)) + 60 * 1000;

// Bun.sleep(delay)

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

// console.log(`Seeding complete.`);