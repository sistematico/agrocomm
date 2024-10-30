// import { scrapeBoi, scrapeVaca, scrapeMilho, scrapeSoja } from '@/services/scrappers/scot/vaca'
import { scrapeVaca } from '@/services/scrappers/scot/vaca'
// import { scrapeLeilao } from '@/services/scrappers/correadacosta/leilao.services'

function getRandomNumber(max: number, min: number): number {
  return ((Math.floor(Math.random() * (max - min + 1)) + min) * 1000) * 60
}

async function scrape() {
  let min = 1, max = 5, delay = getRandomNumber(min, max)
  
  // await Bun.sleep(delay)
  // await scrapeBoi()
  //   .then(_ => { console.log("🐂 Scrape Boi completo.") })
  //   .catch(e => { console.log(e) })

  delay = getRandomNumber(min, max)
  await Bun.sleep(delay)
  await scrapeVaca()
    .then(_ => { console.log("🐄 Scrape Vaca completo.") })
    .catch(e => { console.log(e) })

  // delay = getRandomNumber(min, max)
  // await Bun.sleep(delay)
  // await scrapeMilho()
  //   .then(_ => { console.log("🌽 Scrape Milho completo.") })
  //   .catch(e => { console.log(e) })  

  // delay = getRandomNumber(min, max)
  // await Bun.sleep(delay)
  // await scrapeSoja()
  //   .then(_ => "🌱 Scrape Soja completo.")
  //   .catch(e => { console.log(e) })

  // delay = getRandomNumber(min, max)
  // await Bun.sleep(delay)
  // await scrapeLeilao()
  //   .then(_ => "🔨 Scrape Leilão completo.")
  //   .catch(e => { console.log(e) })
}

scrape()
  .finally(() => { 
    console.log("🕸️ Scrape completo.")
    process.exit(0)
  })