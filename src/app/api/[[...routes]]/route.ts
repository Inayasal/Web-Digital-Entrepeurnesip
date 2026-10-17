import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ routes?: string[] }> }
) {
  const { routes } = await context.params;
  const path = routes ? routes.join("/") : "";
  const { searchParams } = new URL(request.url);

  // /api/health
  if (path === "health") {
    const dbStatus = await db.checkConnection();
    return NextResponse.json({
      status: "ok",
      service: "Video Template Studio API (Next.js & Express)",
      timestamp: new Date().toISOString(),
      database: dbStatus,
    });
  }

  // /api/categories
  if (path === "categories") {
    const categories = await db.getCategories();
    return NextResponse.json({ success: true, data: categories });
  }

  // /api/services
  if (path === "services") {
    const services = await db.getServices();
    return NextResponse.json({ success: true, data: services });
  }

  // /api/products
  if (path === "products") {
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;
    const sort = searchParams.get("sort") || undefined;

    const products = await db.getProducts({ category, search, sort });
    return NextResponse.json({
      success: true,
      count: products.length,
      data: products,
    });
  }

  // /api/products/[slug]
  if (path.startsWith("products/")) {
    const slug = path.replace("products/", "");
    const product = await db.getProductBySlug(slug);
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Template video tidak ditemukan" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: product });
  }

  return NextResponse.json(
    {
      message: "Video Template Studio API",
      endpoints: [
        "/api/health",
        "/api/products",
        "/api/products/:slug",
        "/api/categories",
        "/api/services",
        "POST /api/inquiries",
      ],
    },
    { status: 200 }
  );
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ routes?: string[] }> }
) {
  const { routes } = await context.params;
  const path = routes ? routes.join("/") : "";

  // /api/inquiries
  if (path === "inquiries") {
    try {
      const body = await request.json();
      if (!body.message) {
        return NextResponse.json(
          { success: false, message: "Pesan wajib diisi" },
          { status: 400 }
        );
      }
      const result = await db.createInquiry({
        customerName: body.customerName,
        customerPhone: body.customerPhone,
        productId: body.productId,
        message: body.message,
      });
      return NextResponse.json(
        {
          success: true,
          message: "Inquiry berhasil dicatat",
          data: result,
        },
        { status: 201 }
      );
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON body" },
        { status: 400 }
      );
    }
  }

  return NextResponse.json({ error: "Endpoint not found" }, { status: 404 });
}
