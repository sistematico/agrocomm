import { Hono } from "hono";
import { boiService } from "@/cotacoes/boi.service";

const boiRoutes = new Hono();

boiRoutes.get("", async (c) => {
  const cotacoes = await boiService();
  return c.json(cotacoes);
});

export { boiRoutes };
