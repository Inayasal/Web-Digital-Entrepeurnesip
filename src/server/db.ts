import { Pool } from "pg";
import { products as fallbackProducts, categories as fallbackCategories, services as fallbackServices, Product } from "../lib/data";

// Initialize PostgreSQL pool if DATABASE_URL is available
let pool: Pool | null = null;

if (process.env.DATABASE_URL) {
  try {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
    });
  } catch (err) {
    console.warn("⚠️ Failed to initialize PostgreSQL pool, falling back to local dataset:", err);
  }
}

export interface ProductFilterOptions {
  category?: string;
  search?: string;
  sort?: string;
}

export interface InquiryInput {
  customerName?: string;
  customerPhone?: string;
  productId?: string;
  message: string;
}

export const db = {
  /**
   * Check if PostgreSQL connection is active
   */
  async checkConnection(): Promise<{ connected: boolean; mode: "postgres" | "local-fallback"; error?: string }> {
    if (!pool) {
      return { connected: false, mode: "local-fallback" };
    }
    try {
      const client = await pool.connect();
      client.release();
      return { connected: true, mode: "postgres" };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      return { connected: false, mode: "local-fallback", error: errorMsg };
    }
  },

  /**
   * Retrieve products with filtering, search, and sorting
   */
  async getProducts(options: ProductFilterOptions = {}): Promise<Product[]> {
    const { category, search, sort } = options;

    if (pool) {
      try {
        let query = "SELECT * FROM products WHERE is_active = true";
        const params: (string | number)[] = [];

        if (category && category !== "all") {
          params.push(category);
          query += ` AND category_slug = $${params.length}`;
        }

        if (search) {
          params.push(`%${search.toLowerCase()}%`);
          query += ` AND (LOWER(title) LIKE $${params.length} OR LOWER(description) LIKE $${params.length})`;
        }

        if (sort === "price-low") {
          query += " ORDER BY price ASC";
        } else if (sort === "price-high") {
          query += " ORDER BY price DESC";
        } else if (sort === "name-asc") {
          query += " ORDER BY title ASC";
        } else {
          query += " ORDER BY CASE WHEN badge IS NOT NULL THEN 0 ELSE 1 END, created_at DESC";
        }

        const res = await pool.query(query, params);
        if (res.rows.length > 0) {
          return res.rows.map((row) => ({
            id: row.id,
            slug: row.slug,
            title: row.title,
            description: row.description,
            longDescription: row.long_description,
            category: row.category,
            categorySlug: row.category_slug,
            price: row.price,
            originalPrice: row.original_price,
            image: row.image,
            badge: row.badge,
            features: typeof row.features === "string" ? JSON.parse(row.features) : row.features || [],
            software: typeof row.software === "string" ? JSON.parse(row.software) : row.software || [],
          }));
        }
      } catch (err) {
        console.warn("⚠️ Postgres query failed, falling back to local data:", err);
      }
    }

    // Fallback to local memory data
    let list = [...fallbackProducts];

    if (category && category !== "all") {
      list = list.filter((p) => p.categorySlug === category);
    }

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (sort === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (sort === "name-asc") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  },

  /**
   * Retrieve a single product by slug
   */
  async getProductBySlug(slug: string): Promise<Product | null> {
    if (pool) {
      try {
        const res = await pool.query("SELECT * FROM products WHERE slug = $1 LIMIT 1", [slug]);
        if (res.rows.length > 0) {
          const row = res.rows[0];
          return {
            id: row.id,
            slug: row.slug,
            title: row.title,
            description: row.description,
            longDescription: row.long_description,
            category: row.category,
            categorySlug: row.category_slug,
            price: row.price,
            originalPrice: row.original_price,
            image: row.image,
            badge: row.badge,
            features: typeof row.features === "string" ? JSON.parse(row.features) : row.features || [],
            software: typeof row.software === "string" ? JSON.parse(row.software) : row.software || [],
          };
        }
      } catch (err) {
        console.warn("⚠️ Postgres single query failed, falling back to local data:", err);
      }
    }

    return fallbackProducts.find((p) => p.slug === slug) || null;
  },

  /**
   * Get all categories
   */
  async getCategories() {
    if (pool) {
      try {
        const res = await pool.query("SELECT slug, label FROM categories ORDER BY id ASC");
        if (res.rows.length > 0) {
          return res.rows;
        }
      } catch (err) {
        console.warn("⚠️ Postgres categories query failed:", err);
      }
    }
    return fallbackCategories;
  },

  /**
   * Record a customer inquiry or WhatsApp order click
   */
  async createInquiry(data: InquiryInput) {
    if (pool) {
      try {
        const res = await pool.query(
          "INSERT INTO inquiries (customer_name, customer_phone, product_id, message) VALUES ($1, $2, $3, $4) RETURNING *",
          [data.customerName || null, data.customerPhone || null, data.productId || null, data.message]
        );
        return res.rows[0];
      } catch (err) {
        console.warn("⚠️ Postgres insert inquiry failed:", err);
      }
    }

    // In-memory record
    return {
      id: Date.now(),
      customer_name: data.customerName || null,
      customer_phone: data.customerPhone || null,
      product_id: data.productId || null,
      message: data.message,
      created_at: new Date().toISOString(),
    };
  },

  /**
   * Get all services
   */
  async getServices() {
    return fallbackServices;
  },
};
