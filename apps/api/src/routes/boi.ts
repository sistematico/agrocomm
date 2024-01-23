import { Hono } from "hono";
import { boiService } from "@/cotacoes/boi.service";

const app = new Hono();

app.get("", async (c) => {
  const cotacoes = await boiService();
  return c.json(cotacoes);
});

export default app;
