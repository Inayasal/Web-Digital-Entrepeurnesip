import Link from "next/link";
import { WA_NUMBER } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo" style={{ color: "white" }}>
              <span className="logo-icon">▶</span>
              <span>Video Template Studio</span>
            </div>
            <p>
              Marketplace template video premium untuk kreator konten digital.
              Dari video opening hingga template event, semua siap pakai dan mudah diedit.
            </p>
          </div>

          <div className="footer-col">
            <h4>Navigasi</h4>
            <Link href="/">Home</Link>
            <Link href="/templates">Template</Link>
            <Link href="/services">Layanan</Link>
            <Link href="/about">Tentang</Link>
          </div>

          <div className="footer-col">
            <h4>Kategori</h4>
            <Link href="/templates?category=video-opening">Video Opening</Link>
            <Link href="/templates?category=jedag-jedug">Jedag Jedug</Link>
            <Link href="/templates?category=pkkmb">PKKMB</Link>
            <Link href="/templates?category=gaming">Gaming</Link>
          </div>

          <div className="footer-col">
            <h4>Kontak</h4>
            <Link
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo Video Template Studio!")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </Link>
            <Link href="mailto:hello@videotemplates.id">Email</Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              Instagram
            </Link>
            <Link href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
              TikTok
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Video Template Studio. All rights reserved.</p>
          <p>Made with 💜 for creators</p>
        </div>
      </div>
    </footer>
  );
}
