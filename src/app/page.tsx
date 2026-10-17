import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import {
  products,
  services,
  testimonials,
  formatPrice,
  getWhatsAppLink,
  WA_NUMBER,
} from "@/lib/data";

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
);

// Group products by category for display
const openingProducts = products.filter(p => p.categorySlug === "video-opening" || p.categorySlug === "jedag-jedug");
const otherProducts = products.filter(p => !openingProducts.includes(p)).slice(0, 4);

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-content animate-fade-in-up">
            <span className="hero-badge">Template Video & Jasa Editing</span>
            <h1>
              Kontenmu Butuh <span className="highlight">Video Keren?</span> Kami Punya Templatenya
            </h1>
            <p>
              Template video premium siap pakai untuk kreator konten. Dari video opening, jedag jedug, hingga template PKKMB — semua mudah diedit dan langsung viral!
            </p>
            <div className="hero-actions">
              <Link
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo, saya butuh bantuan untuk memilih template video yang tepat untuk konten saya!")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Hubungi Kami <ArrowIcon />
              </Link>
              <Link href="/templates" className="btn btn-outline">
                Lihat Template <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section section-alt" id="products">
        <div className="section-inner">
          <div className="section-header section-header-row">
            <div>
              <span className="section-label">Pilih Template mu</span>
              <h2>Template Video Siap Pakai!</h2>
            </div>
            <Link href="/templates" className="view-all-link">
              Lihat Semua ({products.length}) <ArrowIcon />
            </Link>
          </div>

          <div style={{ marginBottom: 16 }}>
            <p className="category-label">Video Opening & Jedag Jedug</p>
          </div>
          <div className="products-grid" style={{ marginBottom: 40 }}>
            {openingProducts.map((product, i) => (
              <div key={product.id} className={`animate-fade-in-up delay-${i + 1}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 16 }}>
            <p className="category-label">Event, Wedding & Lainnya</p>
          </div>
          <div className="products-grid">
            {otherProducts.map((product, i) => (
              <div key={product.id} className={`animate-fade-in-up delay-${i + 1}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section" id="features">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-label">Keunggulan Kami</span>
            <h2>Kenapa Pilih Template Kami?</h2>
          </div>
          <div className="features-grid">
            <div className="feature-card animate-fade-in-up delay-1">
              <span className="feature-number">01</span>
              <h3>Kualitas Premium</h3>
              <p>
                Semua template dibuat dengan kualitas profesional, resolusi tinggi, dan animasi smooth. Cocok untuk konten yang ingin tampil beda.
              </p>
            </div>
            <div className="feature-card animate-fade-in-up delay-2">
              <span className="feature-number">02</span>
              <h3>Mudah Diedit</h3>
              <p>
                Gak perlu skill editing pro! Template kami support CapCut, VN Editor, dan After Effects. Ada panduan edit yang lengkap juga.
              </p>
            </div>
            <div className="feature-card animate-fade-in-up delay-3">
              <span className="feature-number">03</span>
              <h3>Harga Terjangkau</h3>
              <p>
                Mulai dari Rp 15.000 aja udah dapet template video keren! Investasi kecil tapi dampak besar buat konten kamu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section section-alt" id="services">
        <div className="section-inner">
          <div className="section-header" style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 48px" }}>
            <span className="section-label">Layanan Kami</span>
            <h2>Males Edit Sendiri? Kami yang Kerjain!</h2>
            <p style={{ margin: "8px auto 0" }}>
              Kirim aja bahan kontennya, kami yang edit jadi video keren siap upload.
            </p>
          </div>
          <div className="services-grid">
            {services.map((service, i) => (
              <div
                key={service.id}
                className={`service-card ${service.featured ? "featured" : ""} animate-fade-in-up delay-${i + 1}`}
              >
                {service.featured && (
                  <span className="popular-badge">Paling Populer</span>
                )}
                <div>
                  <span className="service-card-label">{service.label}</span>
                  <h3>{service.title}</h3>
                  <div className="service-card-price">{service.price}</div>
                  <p>{service.description}</p>
                  <div className="service-features">
                    {service.features.map((feat, j) => (
                      <div key={j} className="service-feature-item">
                        <CheckIcon />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Link
                  href={getWhatsAppLink(service.waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn ${service.featured ? "btn-primary" : "btn-ghost"}`}
                  style={{ width: "100%", textAlign: "center", justifyContent: "center" }}
                >
                  Pesan Sekarang
                </Link>
              </div>
            ))}
          </div>

          <div className="bottom-cta">
            <div>
              <h4>Mau edit sendiri dengan template kami?</h4>
              <p>Tersedia template siap pakai mulai dari Rp 15.000 dengan file sumber lengkap.</p>
            </div>
            <div className="bottom-cta-actions">
              <Link href="/templates" className="btn btn-ghost">
                Lihat Katalog Template
              </Link>
              <Link href="/services" className="btn btn-primary">
                Detail Layanan <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-dark cta-section">
        <div className="section-inner" style={{ maxWidth: 700 }}>
          <h2>Kurang Yakin?</h2>
          <p>Ceritain kebutuhan kontenmu, kami bantu pilihkan template atau jasa yang paling cocok.</p>
          <Link
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo, saya butuh bantuan memilih template/jasa video yang tepat untuk konten saya!")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ background: "white", border: "none" }}
          >
            Chat dengan Tim Kami <ArrowIcon />
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section-alt">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-label">Testimoni</span>
            <h2>Dipercaya oleh kreator & profesional</h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className={`testimonial-card animate-fade-in-up delay-${i + 1}`}>
                <p>&ldquo;{t.text}&rdquo;</p>
                <div className="testimonial-author">
                  <strong>{t.name}</strong>
                  <span>{t.role} — {t.company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
