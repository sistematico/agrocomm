import * as cheerio from "cheerio";
import { scrape, extractDateFromString, getOrCreateCity, limparCidadeEstado } from "@/utils";
import type { Cotacao } from "@/types";

export const cotacoes: Cotacao[] = [];

const body = await scrape("https://www.scotconsultoria.com.br/cotacoes/boi-gordo/?ref=smnb");
const $ = cheerio.load(body);
const rows = $("div.conteudo_centro:nth-child(4) > table:nth-child(5) > tbody:nth-child(2) tr").toArray();
const current = extractDateFromString($('div.conteudo_centro:nth-child(4) > table:nth-child(5) > thead:nth-child(1) > tr:nth-child(1) > th:nth-child(1)').text())

let i = 0;
for (const row of rows) {
  if (i > 2) {
    // const locationStr = $(row).children("td:nth-child(1)").text().trim().replace(/(\s+)/g, " "); 
    const locationStr = $(row).children("td:nth-child(1)").text().trim(); 
    const location = locationStr.split(/\s+/);
    if (location.length === 0) continue;

    const estado = location[0].toUpperCase();
    const cidadeStr = location[1];
    // const estadoValido = estadosBrasileiros.find(e => e.sigla === estado);
    // if (!estadoValido) continue;

    const cidadeId = await getOrCreateCity(cidadeStr, estado);

    const preco = $(row).children("td:nth-child(2)").text().replace(/\D/g,'');
    //const trinta = $(row).children("td:nth-child(3)").text().replace(/\D/g,'');
  
    cotacoes.push({ data: current || new Date(), commodityId: 1, estado, cidadeId, preco: Number(preco) });    
  }
  i++;
}

// console.log(cotacoes);
