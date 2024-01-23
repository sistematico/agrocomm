import { Hono } from "hono";
import { sojaService } from "@/cotacoes/soja.service";

const app = new Hono();

app.get("", async (c) => {
  const cotacoes = await sojaService();
  return c.json(cotacoes);
});

export default app;
