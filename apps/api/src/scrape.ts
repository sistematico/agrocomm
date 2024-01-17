import * as cheerio from "cheerio";
import type { Cotacao } from "@/types";

const cotacoes: Cotacao[] = []

async function scrape(url: string) {
  const data = await fetch(url)
    .then((response) => response.arrayBuffer())
    .then((buffer) => {
      const decoder = new TextDecoder("iso-8859-1" as any);
      return decoder.decode(buffer);
    });

  return data;
}

const body = await scrape("https://www.scotconsultoria.com.br/cotacoes/boi-gordo/?ref=smnb");
const $ = cheerio.load(body);
const rows = $('div.conteudo_centro:nth-child(4) > table:nth-child(5) > tbody:nth-child(2) tr').toArray()

for (const row of rows) {
  const td = $(row).children()
  const estadoCidadeStr = $(td[0]).text()
  cotacoes.push({ data: new Date(), commodityId: 1, estado: 'MS', cidadeId: 1, preco: 1 })
}

console.log(cotacoes)
