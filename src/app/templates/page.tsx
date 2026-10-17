"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products, categories, WA_NUMBER } from "@/lib/data";

function TemplatesCatalog() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("popular");

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Filter by category
        const matchesCategory =
          selectedCategory === "all" || product.categorySlug === selectedCategory;

        // Filter by search query
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.software.some((s) => s.toLowerCase().includes(query));

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") {
          return a.price - b.price;
        }
        if (sortBy === "price-high") {
          return b.price - a.price;
        }
        if (sortBy === "name-asc") {
          return a.title.localeCompare(b.title);
        }
        // default "popular" - priority to badge items
        const aScore = a.badge ? 2 : 1;
        const bScore = b.badge ? 2 : 1;
        return bScore - aScore;
      });
  }, [selectedCategory, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSortBy("popular");
  };

  return (
    <div className="section">
      <div className="section-inner">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }} className="animate-fade-in-up">
          <span className="hero-badge">Katalog Lengkap</span>
          <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)", fontWeight: 800, marginTop: 12 }}>
            Koleksi <span className="highlight">Template Video</span> Digital
          </h1>
          <p style={{ color: "var(--text-secondary)", maxWidth: 620, margin: "12px auto 0" }}>
            Pilih template video siap pakai mulai Rp 15.000. Kompatibel dengan CapCut, Premiere Pro, After Effects, dan VN Editor.
          </p>
        </div>

        {/* Catalog Toolbar */}
        <div className="catalog-toolbar animate-fade-in-up delay-1">
          {/* Category Tabs */}
          <div className="filter-tabs">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`filter-tab ${selectedCategory === cat.slug ? "active" : ""}`}
                type="button"
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="catalog-search-row">
            <div className="search-wrapper">
              <span className="search-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </span>
              <input
                type="text"
                className="search-input"
                placeholder="Cari template (contoh: jedag jedug, intro, pkkmb, 4k)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  style={{
                    position: "absolute",
                    right: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-muted)",
                    padding: 4,
                  }}
                  aria-label="Hapus pencarian"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="sort-wrapper">
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Urutkan template"
              >
                <option value="popular">Urutkan: Terpopuler 🔥</option>
                <option value="price-low">Harga: Termurah (Mulai 15rb)</option>
                <option value="price-high">Harga: Tertinggi</option>
                <option value="name-asc">Nama: A - Z</option>
              </select>
            </div>
          </div>

          {/* Status info */}
          <div className="catalog-status">
            <span>
              Menampilkan <strong>{filteredProducts.length}</strong> template
              {selectedCategory !== "all" && ` dalam kategori "${categories.find(c => c.slug === selectedCategory)?.label}"`}
              {searchQuery && ` untuk "${searchQuery}"`}
            </span>
            {(selectedCategory !== "all" || searchQuery) && (
              <button
                type="button"
                onClick={resetFilters}
                style={{ color: "var(--accent-primary)", fontSize: "0.85rem", fontWeight: 600 }}
              >
                Reset Filter ✕
              </button>
            )}
          </div>
        </div>

        {/* Products Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product, i) => (
              <div key={product.id} className={`animate-fade-in-up delay-${(i % 3) + 1}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state animate-fade-in">
            <span className="empty-icon">🔍</span>
            <h3>Tidak Ada Template yang Ditemukan</h3>
            <p>
              Kami tidak dapat menemukan template yang cocok dengan pencarian atau filter kamu.
            </p>
            <button type="button" onClick={resetFilters} className="btn btn-primary">
              Lihat Semua Template
            </button>
          </div>
        )}

        {/* Custom Order Banner */}
        <div className="bottom-cta animate-fade-in-up" style={{ marginTop: 64 }}>
          <div>
            <h4>Punya Ide atau Butuh Custom Template Khusus?</h4>
            <p>Tim video editor kami siap membuatkan template opening, jedag jedug, atau event sesuai brand kamu.</p>
          </div>
          <div className="bottom-cta-actions">
            <Link
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo Video Template Studio, saya mau request custom video template!")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              💬 Request Custom via WA
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  return (
    <Suspense fallback={<div className="section" style={{ textAlign: "center", padding: "100px 0" }}>Memuat katalog...</div>}>
      <TemplatesCatalog />
    </Suspense>
  );
}
