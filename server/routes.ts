import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json({ success: true, message: "Mensagem enviada com sucesso!", data: message });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Dados inválidos", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Erro ao enviar mensagem" });
      }
    }
  });

  app.get("/api/services", async (_req, res) => {
    const services = [
      { id: "sites-profissionais", title: "Sites Profissionais", icon: "fas fa-globe" },
      { id: "e-commerce", title: "E-commerce", icon: "fas fa-shopping-cart" },
      { id: "landing-pages", title: "Landing Pages", icon: "fas fa-rocket" },
      { id: "identidade-visual", title: "Identidade Visual", icon: "fas fa-paint-brush" },
      { id: "criativos-ia", title: "Criativos com IA", icon: "fas fa-wand-magic-sparkles" },
      { id: "trafego-pago", title: "Tráfego Pago", icon: "fas fa-chart-line" },
      { id: "automacao", title: "Automação", icon: "fas fa-robot" },
      { id: "paginas-vendas", title: "Páginas de Vendas", icon: "fas fa-file-invoice-dollar" },
      { id: "sistemas-personalizados", title: "Sistemas Personalizados", icon: "fas fa-cogs" },
      { id: "consultoria-digital", title: "Consultoria Digital", icon: "fas fa-lightbulb" },
      { id: "presenca-online", title: "Presença Online", icon: "fas fa-share-nodes" },
    ];
    res.json(services);
  });

  app.get("/api/health", async (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  return httpServer;
}