import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertEmployeeSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  app.get("/api/employees", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const employees = await storage.getEmployees();
    res.json(employees);
  });

  app.get("/api/employees/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const employee = await storage.getEmployee(parseInt(req.params.id));
    if (!employee) return res.sendStatus(404);
    res.json(employee);
  });

  app.post("/api/employees", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const parsed = insertEmployeeSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
    const employee = await storage.createEmployee(parsed.data);
    res.status(201).json(employee);
  });

  app.patch("/api/employees/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const parsed = insertEmployeeSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
    const employee = await storage.updateEmployee(parseInt(req.params.id), parsed.data);
    res.json(employee);
  });

  app.delete("/api/employees/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    await storage.deleteEmployee(parseInt(req.params.id));
    res.sendStatus(204);
  });

  const httpServer = createServer(app);
  return httpServer;
}
