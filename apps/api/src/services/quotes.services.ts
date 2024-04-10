import { db } from '-/db/index'
import * as schema from '-/db/schema'
import { scrapeUrl } from '@/services/scrape.services'

let delay = Math.floor(Math.random() * (600 - 60 + 1)) + 60 * 1000;
Bun.sleep(delay)

const arrobaDoBoi = await scrapeUrl('boi', 'scot')

const city = await db.insert(schema.cities).values([
  { name: "Campo Grande", stateAbbr: "MS" }
]).onConflictDoNothing().returning()


arrobaDoBoi.forEach((item) => {
  arrobaDoBoi.cityId = city[0].id
}

// await db.insert(schema.prices).values([
//   { 
//     price: arrobaDoBoi[0].price,
//     commodityId: 1, 
//     cityId: city[0].id, 
//     stateAbbr: "MS", 
//     createdAt: '01/01/2021'
//   }
// ])

await db.insert(schema.prices).values(arrobaDoBoi).onConflictDoNothing()
