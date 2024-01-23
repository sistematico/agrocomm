import { Hono } from "hono";
import { vacaService } from "@/cotacoes/vaca.service";

const app = new Hono();

app.get("", async (c) => {
  const cotacoes = await vacaService();
  return c.json(cotacoes);
});

export default app;
