import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import Bree from "bree";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const app = new Hono();
const prisma = new PrismaClient();

app.get("/", (c) => {
  return c.text("AgroComm");
});

app.get("/users", async (c) => {
  const users = await prisma.user.findMany({});
  return c.json(users);
});

app.get("/cotacoes", async (c) => {
  const data = await prisma.cotacao.findMany({});
  return c.json({ data });
});

app.notFound(c => {
  return c.json({ message: 'Rota não encontrada' }, 404)
})

// const count = await prisma.user.count();
const bree = new Bree({
  root: path.join(path.dirname(fileURLToPath(import.meta.url)), "jobs"),
  defaultExtension: "ts",
  jobs: [
    {
      name: "boi",
      cron: "* * * * *"
      //cron: "* */1 * * *"
      //cron: "11 13 * * 1-5", // seg-sex, 12:??pm
    },
  ],
});

await bree.start();

export default { fetch: app.fetch, port: 4000 };
