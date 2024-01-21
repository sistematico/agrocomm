import * as cheerio from "cheerio";
import { loadUrl, extractDateFromString, getOrCreateCity } from "@/utils";
import { estadosBrasileiros } from "@/constants";
import type { Cotacao } from "@/types";

const cotacoes: Cotacao[] = [];

export async function scrapePecuaria(url: string, commodity: number, content: string, dateDiv: string): Promise<Cotacao[]> {
  const body = await loadUrl(url);
  const $ = cheerio.load(body);
  const rows = $(content).toArray();
  const current = extractDateFromString($(dateDiv).text());

  let i = 0;
  for (const row of rows) {
    if (i > 2) {
      const locationStr = $(row).children("td:nth-child(1)").text().trim();
      
      const location = locationStr.split(/\s+/);
      if (location.length === 0) continue;

      const estadoStr = location[0].toUpperCase();
      const cidadeStr = location.slice(1).join(" ");
      
      const estado = estadosBrasileiros.find((e) => e.sigla === estadoStr);
      if (!estado) continue;

      const cidade = await getOrCreateCity(cidadeStr, estadoStr);
      if (!cidade) continue;

      const preco = $(row).children("td:nth-child(2)").text().replace(/\D/g, "");

      cotacoes.push({ data: current || new Date(), commodity, cidade: cidade.id, estado: estado.sigla, preco: Number(preco) });
    }
    i++;
  }

  return cotacoes
}

export async function scrapeAgricultura(url: string, commodity: number, content: string, dateDiv: string): Promise<Cotacao[]> {
  const body = await loadUrl(url);
  const $ = cheerio.load(body);
  const rows = $(content).toArray();
  const current = extractDateFromString($(dateDiv).text());

  let i = 0;
  let oldEstadoStr, estadoStr = "";

  for (const row of rows) {
    if (i > 2) {
      const locationStr = $(row).children("td:nth-child(1)").text().trim();      
      const location = locationStr.split(/\s+/);
      
      if (location[0] !== "") {
        oldEstadoStr = location[0].toUpperCase();
        estadoStr = location[0].toUpperCase();
      } else {
        if (oldEstadoStr) estadoStr = oldEstadoStr;
      }

      const estado = estadosBrasileiros.find((e) => e.sigla === estadoStr);
      if (!estado) continue;

      const cidadeStr = $(row).children("td:nth-child(2)").text().trim();

      const cidade = await getOrCreateCity(cidadeStr, estado.sigla);
      if (!cidade) continue;

      const preco = $(row).children("td:nth-child(3)").text().replace(/\D/g, "");

      cotacoes.push({ data: current || new Date(), commodity, cidade: cidade.id, estado: estado.sigla, preco: Number(preco) });
    }
    i++;
  }

  return cotacoes
}