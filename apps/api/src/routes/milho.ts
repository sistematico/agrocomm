import { Hono } from "hono";
import { milhoService } from "@/cotacoes/milho.service";

const app = new Hono();

app.get("", async (c) => {
  const cotacoes = await milhoService();
  return c.json(cotacoes);
});

export default app;
