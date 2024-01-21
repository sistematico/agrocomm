import { scrapePecuaria } from "@/scrape/scrape.service";
import { db, ultimaDataUtil } from "@/utils";
import { Commodities } from "@/constants";

export async function boiService() {
  const url = "https://www.scotconsultoria.com.br/cotacoes/boi-gordo/?ref=smnb";
  const content = "div.conteudo_centro:nth-child(4) > table:nth-child(5) > tbody:nth-child(2) tr";
  const dateDiv = "div.conteudo_centro:nth-child(4) > table:nth-child(5) > thead:nth-child(1) > tr:nth-child(1) > th:nth-child(1)";
  
  const diaUtil = await ultimaDataUtil(Commodities.Boi);

  const existeData = await db.cotacao.findMany({
    where: { data: diaUtil, commodity: Commodities.Boi },
    orderBy: [ { estado: 'asc' }, { cidades: { nome: 'asc' } } ],
    include: { cidades: true }
  })

  if (existeData && existeData.length > 0) return { cotacoes: existeData }; 

  const cotacoes = await scrapePecuaria(url, Commodities.Boi, content, dateDiv);
  if (cotacoes) {
    await db.cotacao.createMany({ data: cotacoes });
    return { cotacoes }; 
  }

  return null;
}