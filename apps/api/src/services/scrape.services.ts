import { scrapeBoi, scrapeVaca, scrapeMilho, scrapeSoja } from '@/services/scrappers/scot'
import { scrapeLeilao } from '@/services/scrappers/correadacosta/leilao.services'
import { getRandomNumber } from '@/utils'

Bun.sleep(getRandomNumber(1, 2))
const boi = scrapeBoi().then(_ => "🐂 Scrape Boi complete.").catch(e => e)

Bun.sleep(getRandomNumber(1, 2))
const vaca = scrapeVaca().then(_ => "🐄 Scrape Vaca complete.").catch(e => e)

Bun.sleep(getRandomNumber(1, 2))
const milho = scrapeMilho().then(_ => "🌽 Scrape Milho complete.").catch(e => e)  

Bun.sleep(getRandomNumber(1, 2))
const soja = scrapeSoja().then(_ => "🌱 Scrape Soja complete.").catch(e => e)

Bun.sleep(getRandomNumber(1, 2))
const leilao = scrapeLeilao().then(_ => "🐂 Scrape Leilão complete.").catch(e => e)

Promise.all([boi, vaca, milho, soja, leilao]).then((values) => {
  console.log(values)
  process.exit(0)
}).catch(e => {
  console.error(e)
  process.exit(0)
})