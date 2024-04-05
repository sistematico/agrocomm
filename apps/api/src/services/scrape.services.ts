import * as cheerio from 'cheerio'
import { db } from '-/db/index'
import * as schema from '-/db/schema'

const d = new Date().setHours(0,0,0,0)

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

// const body = await scrape('https://afd.calpoly.edu/web/sample-tables')
// const $ = cheerio.load(body)

// const table = $('table').find('li')
// const tables = $('table')

// const table = $('table:nth-of-type(1) tbody')

// table.each((i, e) => {
//   // let row  = $(e).text().replace(/(\s+)/g, ' ');
//   let row  = $(e).find('tr').text().replace(/(\s+)/g, ' ');
//   // if (i === 0) console.log($(e).text())
//   console.log(row)
// })

// $('tr').each((_, e) => {

//     let row  = $(e).text().replace(/(\s+)/g, ' ');
//     console.log(`${row}`);
// });

// console.log(typeof listItems)
// console.log(listItems)

const price = Math.floor(Math.random() * 1000)

// price: integer('price').notNull(),
// createdAt: text('created_at').notNull().default(now),
// commodityId: integer('commodity_id').references(() => commodities.id),
// cityId: integer('city_id').references(() => cities.id),
// stateId: integer('state_id').references(() => states.id), // Novo campo adicionado

// export const cities = sqliteTable('cities', {
//   id: integer('id').primaryKey(),
//   name: text('name'),
//   state: integer('state_abbr').references(() => states.abbr)
// })

const city = await db.insert(schema.cities).values([
  { name: "Campo Grande", stateAbbr: "MS" }
]).onConflictDoNothing().returning()

await db.insert(schema.prices).values([
  { 
    price: 1,
    commodityId: 1, 
    cityId: city[0].id, 
    stateAbbr: "MS", 
    createdAt: String(d)
  }
])
