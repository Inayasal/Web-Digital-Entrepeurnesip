import type { Metadata } from "next";
import Link from "next/link";
import { services, WA_NUMBER, getWhatsAppLink } from "@/lib/data";

export const metadata: Metadata = {
  title: "Layanan Jasa Edit Video Digital | Video Template Studio",
  description:
    "Layanan jasa editing video opening, konten jedag jedug TikTok, video PKKMB, dan konten digital kreator dengan hasil profesional dan harga terjangkau mulai Rp 29.000.",
};

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

const extraPackages = [
  ...services,
  {
    id: "s4",
    title: "Paket Bundling Creator Bulanan",
    label: "Solusi Kreator Rutin",
    price: "Mulai Rp 199.000",
    description: "Paket hemat untuk kreator atau brand yang butuh stok konten rutin setiap bulan. Termasuk opening, 5 video jedag-jedug/reels, dan outro.",
    features: [
      "1x Video Opening kustom",
      "5x Video Reels / TikTok viral",
      "1x Video Outro YouTube/TikTok",
      "Revisi tanpa batas",
      "Waktu pengerjaan prioritas 24 jam",
      "Dedicated editor via WhatsApp VIP",
    ],
    featured: false,
    waMessage: "Halo, saya tertarik dengan *Paket Bundling Creator Bulanan*. Bisa jelaskan detail dan diskonnya?",
  },
];

const faqs = [
  {
    q: "Berapa lama proses pengerjaan jasa edit video?",
    a: "Untuk template siap pakai, pengiriman instan dalam beberapa menit setelah pembayaran. Untuk jasa custom edit, pengerjaan normal adalah 1-2 hari kerja tergantung kompleksitas materi.",
  },
  {
    q: "Bagaimana cara pembayaran dan konfirmasinya?",
    a: "Semua pembayaran langsung diproses melalui WhatsApp. Kami menerima QRIS, Bank Transfer (BCA, Mandiri, BRI, BNI), serta E-Wallet (GoPay, OVO, DANA, ShopeePay). Sangat praktis tanpa ribet registrasi akun!",
  },
  {
    q: "Apakah ada garansi revisi jika ada yang kurang cocok?",
    a: "Tentu! Setiap layanan custom edit sudah mencakup garansi revisi hingga 3 kali secara gratis via WhatsApp untuk memastikan hasil akhir memuaskan dan sesuai visi konten kamu.",
  },
  {
    q: "Bagaimana cara mengirim file bahan / video mentah?",
    a: "Kamu bisa mengirimkan bahan video melalui link Google Drive, Dropbox, atau langsung lampirkan video di chat WhatsApp.",
  },
  {
    q: "Apakah file project source (AE / Premiere / CapCut) disertakan?",
    a: "Ya! Untuk pembelian template, file project selalu disertakan lengkap. Untuk jasa custom, kamu juga bisa meminta file project tanpa biaya tambahan.",
  },
];

export default function ServicesPage() {
  return (
    <div className="section">
      <div className="section-inner">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }} className="animate-fade-in-up">
          <span className="hero-badge">Jasa Video Kreator</span>
          <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)", fontWeight: 800, marginTop: 12 }}>
            Layanan Editing & <span className="highlight">Video Custom</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", maxWidth: 640, margin: "12px auto 0" }}>
            Gak sempat edit sendiri atau butuh sentuhan animasi khusus? Serahkan pada tim editor kreatif kami. Hasil cepat, rapi, dan langsung siap viral!
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid" style={{ marginBottom: 64 }}>
          {extraPackages.map((pkg, idx) => (
            <div
              key={pkg.id}
              className={`service-card ${pkg.featured ? "service-featured" : ""} animate-fade-in-up delay-${(idx % 3) + 1}`}
              style={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              {pkg.featured && (
                <span
                  style={{
                    position: "absolute",
                    top: -12,
                    right: 24,
                    background: "var(--accent-gradient)",
                    color: "white",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    padding: "4px 12px",
                    borderRadius: "var(--radius-full)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  Paling Populer ⭐
                </span>
              )}
              <span className="service-label">{pkg.label}</span>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginTop: 4 }}>{pkg.title}</h3>
              <div className="service-price" style={{ margin: "16px 0 12px" }}>
                {pkg.price}
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", marginBottom: 20 }}>
                {pkg.description}
              </p>

              <div style={{ flex: 1 }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-secondary)" }}>
                  Fitur Termasuk:
                </span>
                <ul className="service-features" style={{ marginTop: 12 }}>
                  {pkg.features.map((feature, fIdx) => (
                    <li key={fIdx}>
                      <CheckIcon />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: 24 }}>
                <Link
                  href={getWhatsAppLink(pkg.waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={pkg.featured ? "btn btn-primary" : "btn btn-outline"}
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Pesan via WhatsApp <ArrowIcon />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Workflow */}
        <div style={{ marginTop: 64 }} className="animate-fade-in-up">
          <div className="section-header">
            <span className="section-label">Alur Kerja</span>
            <h2>Proses Pemesanan Sangat Mudah</h2>
            <p>Tanpa ribet, langsung konsultasi dan pembayaran via WhatsApp.</p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <span className="step-number">1</span>
              <h4>1. Chat & Konsultasi</h4>
              <p>Pilih paket layanan yang kamu inginkan, klik pesan via WA dan diskusikan konsep videomu dengan admin.</p>
            </div>
            <div className="step-card">
              <span className="step-number">2</span>
              <h4>2. Kirim Materi</h4>
              <p>Kirimkan logo, footage video mentah, atau foto yang ingin diedit melalui Google Drive atau WA.</p>
            </div>
            <div className="step-card">
              <span className="step-number">3</span>
              <h4>3. Pengerjaan Cepat</h4>
              <p>Editor kami memproses video sesuai deadline (1-2 hari). Kami kirimkan video preview untuk dicek.</p>
            </div>
            <div className="step-card">
              <span className="step-number">4</span>
              <h4>4. Revisi & File Final</h4>
              <p>Revisi jika ada detail yang ingin disesuaikan. Setelah oke, file full resolution langsung dikirim!</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div style={{ marginTop: 80 }} className="animate-fade-in-up">
          <div className="section-header">
            <span className="section-label">Tanya Jawab</span>
            <h2>Pertanyaan yang Sering Diajukan</h2>
            <p>Jawaban untuk pertanyaan umum seputar pembelian template dan jasa edit video.</p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item">
                <div className="faq-question">
                  <span>{faq.q}</span>
                  <span style={{ color: "var(--accent-primary)", fontSize: "1.2rem", fontWeight: "bold" }}>+</span>
                </div>
                <div className="faq-answer">
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bottom-cta animate-fade-in-up" style={{ marginTop: 64 }}>
          <div>
            <h4>Masih Bingung Mau Pilih Paket yang Mana?</h4>
            <p>Konsultasikan kebutuhan channel YouTube, akun TikTok, atau acara kampusmu secara gratis dengan kami.</p>
          </div>
          <div className="bottom-cta-actions">
            <Link
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo admin Video Template Studio, saya mau konsultasi video yang cocok untuk kebutuhan saya.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              💬 Chat WhatsApp Sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
