import { db } from "@/utils";
import { vacaService } from "@/cotacoes/vaca.service";

const cotacao = await vacaService();

if (cotacao) {
  await db.cotacao.createMany({ data: cotacao.cotacoes, skipDuplicates: true });
  db.$disconnect();
}

process.exit(0);