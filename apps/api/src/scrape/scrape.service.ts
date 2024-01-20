import * as cheerio from "cheerio";
import { loadUrl, extractDateFromString, getOrCreateCity } from "@/utils";
import { estadosBrasileiros } from "@/constants";
import type { Cotacao } from "@/types";

export const cotacoes: Cotacao[] = [];

export async function scrape(url: string, content: string, dateDiv: string) {
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

      cotacoes.push({ data: current || new Date(), commodityId: 1, cidade, estado: estado.sigla, preco: Number(preco) });
    }
    i++;
  }

  return cotacoes
}