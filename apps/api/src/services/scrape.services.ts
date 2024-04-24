import { scrapeBoi, scrapeVaca, scrapeMilho, scrapeSoja } from '@/services/scrappers/scot'
import { scrapeLeilao } from '@/services/scrappers/correadacosta/leilao.services'
import { getRandomNumber } from '@/utils'

Bun.sleep(getRandomNumber(1, 2))
await scrapeBoi().then(_ => "🐂 Scrape Boi complete.").catch(e => e)

Bun.sleep(getRandomNumber(1, 2))
await scrapeVaca().then(_ => "🐄 Scrape Vaca complete.").catch(e => e)

Bun.sleep(getRandomNumber(1, 2))
await scrapeMilho().then(_ => "🌽 Scrape Milho complete.").catch(e => e)  

Bun.sleep(getRandomNumber(1, 2))
await scrapeSoja().then(_ => "🌱 Scrape Soja complete.").catch(e => e)

Bun.sleep(getRandomNumber(1, 2))
await scrapeLeilao().then(_ => "🐂 Scrape Leilão complete.").catch(e => e)

process.exit(0)

// Promise.all([boi, vaca, milho, soja, leilao]).then((values) => {
//   console.log(values)
//   process.exit(0)
// }).catch(e => {
//   console.error(e)
//   process.exit(0)
// })