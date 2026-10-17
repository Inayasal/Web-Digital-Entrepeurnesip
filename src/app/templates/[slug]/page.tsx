import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import {
  products,
  formatPrice,
  getWhatsAppLink,
  getProductWAMessage,
  WA_NUMBER,
} from "@/lib/data";

interface TemplatePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: TemplatePageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Template Tidak Ditemukan | Video Template Studio",
    };
  }

  return {
    title: `${product.title} - Template Video Siap Pakai | Video Template Studio`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  };
}

const CheckCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

export default async function TemplateDetailPage({ params }: TemplatePageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Related products from same category or fallback to other products
  const related = products
    .filter((p) => p.id !== product.id)
    .sort((a, b) => (a.categorySlug === product.categorySlug ? -1 : 1))
    .slice(0, 3);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="section" style={{ paddingTop: 32 }}>
      <div className="section-inner">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <Link href="/templates">Template</Link>
          <span className="breadcrumb-separator">/</span>
          <Link href={`/templates?category=${product.categorySlug}`}>{product.category}</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{product.title}</span>
        </nav>

        {/* Main Product Layout */}
        <div className="detail-layout">
          {/* Left Column: Image Preview & Compatibility */}
          <div className="detail-gallery">
            <div className="detail-main-img-box">
              <img src={product.image} alt={product.title} />
              {product.badge && (
                <span className="detail-tag-floating">{product.badge}</span>
              )}
            </div>

            {/* Software Compatibility */}
            <div style={{ marginTop: 24 }}>
              <span style={{ fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-secondary)" }}>
                Software & Aplikasi Kompatibel:
              </span>
              <div className="software-tags">
                {product.software.map((sw) => (
                  <span key={sw} className="software-tag">
                    <span style={{ color: "var(--accent-primary)" }}>✓</span> {sw}
                  </span>
                ))}
              </div>
            </div>

            {/* Quality Badges */}
            <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                <CheckCircleIcon /> File Bersih & Siap Pakai
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                <CheckCircleIcon /> Panduan Video / PDF
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                <CheckCircleIcon /> Support WhatsApp
              </div>
            </div>
          </div>

          {/* Right Column: Info & Action Box */}
          <div className="detail-info">
            <div className="detail-meta">
              <span className="detail-category">{product.category}</span>
              <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 4 }}>
                ⭐ <strong>5.0</strong> (48+ Ulasan Terverifikasi)
              </span>
            </div>

            <h1 className="detail-title">{product.title}</h1>
            <p className="detail-desc">{product.longDescription || product.description}</p>

            {/* Price Box */}
            <div className="detail-price-box">
              <span className="detail-current-price">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="detail-original-price">{formatPrice(product.originalPrice)}</span>
                  {discountPercent && (
                    <span className="discount-tag">HEMAT {discountPercent}%</span>
                  )}
                </>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="detail-cta-box">
              <Link
                href={getWhatsAppLink(getProductWAMessage(product))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp-order"
              >
                <WhatsAppIcon />
                <span>Beli Sekarang via WhatsApp</span>
              </Link>

              <Link
                href={getWhatsAppLink(`Halo, saya mau tanya-tanya dulu soal template *${product.title}*.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Tanya Admin / Konsultasi Dulu
              </Link>
            </div>

            {/* What's Included */}
            <div className="detail-features" style={{ marginTop: 32 }}>
              <h3>Yang Kamu Dapatkan dalam Paket Ini:</h3>
              <ul>
                {product.features.map((feature, idx) => (
                  <li key={idx}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment & Delivery Guarantee Info */}
            <div style={{ marginTop: 24, padding: "16px 20px", background: "var(--accent-gradient-soft)", borderRadius: "var(--radius-lg)", border: "1px solid var(--accent-primary-light)" }}>
              <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--accent-primary)", marginBottom: 4 }}>
                ⚡ Pengiriman Instan via WhatsApp & Google Drive
              </h4>
              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                Setelah konfirmasi pembayaran via WhatsApp (QRIS/Transfer Bank/E-Wallet), link download template beserta tutorial edit langsung dikirim dalam hitungan menit!
              </p>
            </div>
          </div>
        </div>

        {/* How to use section */}
        <div style={{ marginTop: 80 }} className="animate-fade-in-up">
          <div className="section-header">
            <span className="section-label">Langkah Mudah</span>
            <h2>Cara Pakai Template Ini</h2>
            <p>Hanya 4 langkah cepat dari download sampai konten siap publish.</p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <span className="step-number">1</span>
              <h4>Pesan via WhatsApp</h4>
              <p>Klik tombol order di atas, chat admin kami, dan lakukan pembayaran dengan metode favoritmu.</p>
            </div>
            <div className="step-card">
              <span className="step-number">2</span>
              <h4>Terima File Template</h4>
              <p>Admin akan langsung mengirimkan link file template lengkap beserta aset pendukung & panduan.</p>
            </div>
            <div className="step-card">
              <span className="step-number">3</span>
              <h4>Buka & Edit Teks/Foto</h4>
              <p>Buka template di aplikasi (CapCut / AE / Premiere), ganti nama, foto, dan musik sesukamu.</p>
            </div>
            <div className="step-card">
              <span className="step-number">4</span>
              <h4>Export & Siap Viral!</h4>
              <p>Export video dengan kualitas tinggi hingga 4K. Kontenmu siap diupload ke medsos!</p>
            </div>
          </div>
        </div>

        {/* Related Templates */}
        {related.length > 0 && (
          <div style={{ marginTop: 80 }}>
            <div className="section-header section-header-row">
              <div>
                <span className="section-label">Pilihan Lainnya</span>
                <h2>Template Serupa yang Mungkin Kamu Suka</h2>
              </div>
              <Link href="/templates" className="view-all-link">
                Lihat Semua ({products.length})
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
              </Link>
            </div>

            <div className="products-grid">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
