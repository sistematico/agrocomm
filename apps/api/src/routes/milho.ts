import { Hono } from "hono";
import { milhoService } from "@/cotacoes/milho.service";

const milhoRoutes = new Hono();

milhoRoutes.get("", async (c) => {
  const cotacoes = await milhoService();
  return c.json(cotacoes);
});

export { milhoRoutes };
