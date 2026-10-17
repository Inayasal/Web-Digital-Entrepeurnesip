"use client";
import { useState } from "react";
import Link from "next/link";
import { WA_NUMBER } from "@/lib/data";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Template", href: "/templates" },
  { label: "Layanan", href: "/services" },
  { label: "Tentang", href: "/about" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <Link href="/" className="logo">
            <span className="logo-icon">▶</span>
            <span>Video Template Studio</span>
          </Link>

          <nav>
            <ul className="nav-links">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo Video Template Studio, saya tertarik dengan layanan kalian!")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="header-cta"
          >
            Hubungi Kami
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
          </Link>

          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
            )}
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <Link
          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo Video Template Studio!")}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMobileOpen(false)}
          style={{ color: "var(--accent-primary)", fontWeight: 600, marginTop: 8 }}
        >
          💬 Hubungi via WhatsApp
        </Link>
      </div>
    </>
  );
}
