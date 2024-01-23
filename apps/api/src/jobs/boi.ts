import { db } from "@/utils";
import { boiService } from "@/cotacoes/boi.service";

const cotacao = await boiService();

if (cotacao) {
  await db.cotacao.createMany({ data: cotacao.cotacoes, skipDuplicates: true });
  db.$disconnect();
}

process.exit(0);