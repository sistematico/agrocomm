import { Hono } from "hono";
import { sojaService } from "@/cotacoes/soja.service";

const sojaRoutes = new Hono();

sojaRoutes.get("", async (c) => {
  const cotacoes = await sojaService();
  return c.json(cotacoes);
});

export { sojaRoutes };
