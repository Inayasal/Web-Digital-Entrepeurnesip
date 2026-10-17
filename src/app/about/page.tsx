import type { Metadata } from "next";
import Link from "next/link";
import { testimonials, WA_NUMBER } from "@/lib/data";

export const metadata: Metadata = {
  title: "Tentang Kami | Video Template Studio",
  description:
    "Mengenal Video Template Studio - Marketplace dan jasa pembuatan template video digital untuk kreator konten di Indonesia dengan harga ramah kantong mulai 15 ribuan.",
};

const values = [
  {
    icon: "⚡",
    title: "Hemat Waktu & Tenaga",
    desc: "Gak perlu pusing buat animasi opening atau effect jedag jedug dari nol. Tinggal drag-and-drop dan video langsung siap di-upload.",
  },
  {
    icon: "🎨",
    title: "Visual Selalu Up to Date",
    desc: "Template kami dirancang mengikuti tren visual terkini di TikTok, Instagram Reels, dan YouTube Shorts agar kontenmu selalu relevan.",
  },
  {
    icon: "💰",
    title: "Harga Ramah Pemula",
    desc: "Semua template dirancang dengan harga terjangkau mulai dari Rp 15.000, cocok untuk pelajar, mahasiswa, hingga profesional.",
  },
  {
    icon: "🤝",
    title: "Bantuan & Support Cepat",
    desc: "Bingung cara pasang template di CapCut atau Premiere Pro? Tim support kami siap membantu melalui chat WhatsApp yang ramah dan responsif.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* About Hero */}
      <section className="about-hero animate-fade-in-up">
        <div className="section-inner">
          <span className="hero-badge">Tentang Video Template Studio</span>
          <h1>
            Membantu Kreator <span className="highlight">Bikin Konten Keren</span> Tanpa Ribet
          </h1>
          <p>
            Video Template Studio lahir untuk membantu content creator, mahasiswa, dan UMKM di Indonesia memiliki video dengan tampilan visual profesional tanpa harus jago animasi dari nol.
          </p>

          <div className="about-stats">
            <div className="stat-card">
              <div className="stat-number">1.500+</div>
              <div className="stat-label">Template Terjual</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Kreator Terbantu</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">4.9 / 5.0</div>
              <div className="stat-label">Rating Kepuasan</div>
            </div>
          </div>
        </div>
      </section>

      {/* Story & Mission Section */}
      <section className="section">
        <div className="section-inner">
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }} className="animate-fade-in-up">
            <span className="section-label">Misi Kami</span>
            <h2>Demokratisasi Konten Video Berkualitas</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.8, marginTop: 16 }}>
              Di era konten yang bergerak sangat cepat, konsistensi upload adalah kunci utama. Namun, seringkali waktu kreator habis untuk mengutak-atik animasi opening, transisi jedag jedug, atau intro yang rumit.
            </p>
            <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.8, marginTop: 12 }}>
              Kami menyediakan template siap pakai dalam format <strong>CapCut, Adobe Premiere Pro, After Effects, dan VN Editor</strong>, serta melayani request custom editing dengan komunikasi yang super simpel langsung via <strong>WhatsApp</strong>.
            </p>
          </div>

          {/* Values Grid */}
          <div className="features-grid" style={{ marginTop: 56 }}>
            {values.map((v, i) => (
              <div key={i} className={`feature-card animate-fade-in-up delay-${i + 1}`}>
                <div className="feature-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section section-alt">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-label">Kata Mereka</span>
            <h2>Cerita Para Kreator yang Menggunakan Template Kami</h2>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((t, idx) => (
              <div key={idx} className={`testimonial-card animate-fade-in-up delay-${idx + 1}`}>
                <p className="testimonial-text">&ldquo;{t.text}&rdquo;</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">
                      {t.role} &bull; {t.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="bottom-cta animate-fade-in-up" style={{ marginTop: 64 }}>
            <div>
              <h4>Siap Tingkatkan Kualitas Videomu Hari Ini?</h4>
              <p>Mulai dengan memilih template favoritmu atau chat kami di WhatsApp untuk konsultasi.</p>
            </div>
            <div className="bottom-cta-actions">
              <Link href="/templates" className="btn btn-primary">
                Lihat Katalog Template
              </Link>
              <Link
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo admin Video Template Studio!")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                💬 Chat via WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
