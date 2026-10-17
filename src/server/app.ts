import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./db";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// 1. Health check & DB connection status
app.get("/api/health", async (_req: Request, res: Response) => {
  const dbStatus = await db.checkConnection();
  res.json({
    status: "ok",
    service: "Video Template Studio API (Express + PostgreSQL)",
    timestamp: new Date().toISOString(),
    database: dbStatus,
  });
});

// 2. Categories
app.get("/api/categories", async (_req: Request, res: Response) => {
  try {
    const categories = await db.getCategories();
    res.json({ success: true, data: categories });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ success: false, error: msg });
  }
});

// 3. Products List (with category, search, and sort)
app.get("/api/products", async (req: Request, res: Response) => {
  try {
    const { category, search, sort } = req.query;
    const products = await db.getProducts({
      category: typeof category === "string" ? category : undefined,
      search: typeof search === "string" ? search : undefined,
      sort: typeof sort === "string" ? sort : undefined,
    });
    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ success: false, error: msg });
  }
});

// 4. Single Product by Slug
app.get("/api/products/:slug", async (req: Request, res: Response) => {
  try {
    const slugParam = req.params.slug;
    const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
    if (!slug) {
      res.status(400).json({ success: false, message: "Slug parameter is required" });
      return;
    }
    const product = await db.getProductBySlug(slug);
    if (!product) {
      res.status(404).json({ success: false, message: "Template video tidak ditemukan" });
      return;
    }
    res.json({ success: true, data: product });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ success: false, error: msg });
  }
});

// 5. Services List
app.get("/api/services", async (_req: Request, res: Response) => {
  try {
    const services = await db.getServices();
    res.json({ success: true, data: services });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ success: false, error: msg });
  }
});

// 6. Record WhatsApp Inquiry / Order Lead
app.post("/api/inquiries", async (req: Request, res: Response) => {
  try {
    const { customerName, customerPhone, productId, message } = req.body;
    if (!message) {
      res.status(400).json({ success: false, message: "Pesan wajib diisi" });
      return;
    }
    const result = await db.createInquiry({
      customerName,
      customerPhone,
      productId,
      message,
    });
    res.status(201).json({
      success: true,
      message: "Inquiry berhasil dicatat",
      data: result,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ success: false, error: msg });
  }
});

export default app;
