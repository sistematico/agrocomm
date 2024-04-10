import { eq, and } from 'drizzle-orm'
import { db } from '-/db/index'
import * as schema from '-/db/schema'
import { scrapeUrl } from '@/services/scrape.services'

// let delay = Math.floor(Math.random() * (600 - 60 + 1)) + 60 * 1000
// Bun.sleep(delay)

const arrobaDoBoi = await scrapeUrl('boi', 'scot')

// await db.insert(schema.prices)
//   .values(arrobaDoBoi)
//   .onConflictDoNothing({ target: [schema.prices.id, schema.prices.createdAt, schema.prices.price, schema.prices.state, schema.prices.city] })

await db.insert(schema.prices)
  .values(arrobaDoBoi)
  .onConflictDoNothing()

// for (const item of arrobaDoBoi) {
  // console.log(item)

  // await db
  //   .insert(schema.prices)
  //   .values(item)
  //   .onConflictDoUpdate({
  //     target: [schema.prices.id, schema.prices.createdAt, schema.prices.price, schema.prices.state, schema.prices.city],
  //     set: { 
  //       price: item.price 
  //     }
  //   })
// }