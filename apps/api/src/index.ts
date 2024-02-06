import { Hono } from "hono";
import { cors } from "hono/cors";
import boiRoutes from "@/routes/boi";
import vacaRoutes from "@/routes/vaca";
import sojaRoutes from "@/routes/soja";
import milhoRoutes from "@/routes/milho";
import Bree from "bree";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { db } from "@/utils";

const app = new Hono();
app.use('*', cors({ origin: Bun.env.APP_URL || 'http://localhost:5173' }))

app.get("/users", async (c) => {
  const users = await db.user.findMany({});
  return c.json(users);
});

app.route('/boi', boiRoutes)
app.route('/vaca', vacaRoutes)
app.route('/soja', sojaRoutes)
app.route('/milho', milhoRoutes)

app.notFound(c => {
  return c.json({ message: 'Rota não encontrada' }, 404)
})

const bree = new Bree({
  root: path.join(path.dirname(fileURLToPath(import.meta.url)), "jobs"),
  defaultExtension: "ts",
  jobs: [
    {
      name: "boi",
      cron: "11 13 * * 1-5", // seg-sex, 13:11pm
    },
    {
      name: "vaca",
      cron: "10 10 * * 1-5", // seg-sex, 10:10am
    },
    {
      name: "soja",
      cron: "18 13 * * 1-5", // seg-sex, 13:18pm
    },
    {
      name: "milho",
      cron: "14 14 * * 1-5", // seg-sex, 14:14pm
    },
  ],
});

await bree.start();

export default { fetch: app.fetch, port: 4000 };
