import { Hono } from "hono";
import { cors } from "hono/cors";
import Bree from "bree";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { db } from "@/utils";
import { boi } from "@/scrape/scrape.services";

const app = new Hono();
app.use('*', cors({ origin: Bun.env.APP_URL || 'http://localhost:5173' }))

app.get("/", (c) => {
  return c.text("AgroComm");
});

app.get("/users", async (c) => {
  const users = await db.user.findMany({});
  return c.json(users);
});

app.get("/cotacoes", async (c) => {
  const data = await db.cotacao.findMany({});

  if (!Array.isArray(data) || data.length === 0) {
    const cotacao = await boi();    
    if (!Array.isArray(cotacao) || cotacao.length === 0) return c.json({ message: "Sem dados" });

    const insert = await db.cotacao.createMany({ data: cotacao });
    console.log("Dados inseridos:", insert.count)
    
    db.$disconnect();
    
    return c.json({ cotacao });
  }

  console.log("Dados já existentes")

  return c.json({ data });
});

app.notFound(c => {
  return c.json({ message: 'Rota não encontrada' }, 404)
})

// const count = await db.user.count();
const bree = new Bree({
  root: path.join(path.dirname(fileURLToPath(import.meta.url)), "jobs"),
  defaultExtension: "ts",
  jobs: [
    {
      name: "boi",
      //cron: "* * * * *"
      cron: "5 8 * * *"
      //cron: "11 13 * * 1-5", // seg-sex, 12:??pm
    },
  ],
});

await bree.start();

export default { fetch: app.fetch, port: 4000 };
