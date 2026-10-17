# 🎬 Video Template Studio

Web bisnis layanan dan marketplace penjualan konten digital video template untuk para kreator konten (video opening/intro, video jedag-jedug, template PKKMB, gaming montage, wedding invitation, dan lainnya) dengan tema desain **Playfully Minimal** (terinspirasi dari *template-design-studio.vercel.app*), harga terjangkau mulai dari Rp 15.000, alur order langsung via WhatsApp, didukung backend **Express.js**, database **PostgreSQL**, dan siap di-deploy ke **Vercel**.

---

## ✨ Fitur Utama

1. **🎨 Desain Playfully Minimal & Responsif**
   - Palet warna modern berenergi ungu & pink (*#7C3AED*, *#F472B6*) dengan background bersih, typography Google Font *Plus Jakarta Sans*, micro-animations halus, dan floating WhatsApp order button.
   - 100% responsif untuk tampilan Mobile, Tablet, dan Desktop.

2. **📁 Katalog Template Interaktif (`/templates`)**
   - Filter instan berdasarkan kategori: *Video Opening*, *Jedag Jedug*, *PKKMB*, *Video Outro*, *Wedding*, *Gaming*, *Slideshow*.
   - Fitur pencarian realtime (cari berdasarkan judul, deskripsi, atau software seperti CapCut/Premiere).
   - Fitur pengurutan harga (Termurah mulai 15k, Termahal, Terpopuler, A-Z).
   - Status jumlah hasil dan tampilan *Empty State* yang ramah jika pencarian tidak ditemukan.

3. **🔍 Halaman Detail Template Dinamis (`/templates/[slug]`)**
   - Preview visual template resolusi tinggi dengan badge status (*Best Seller*, *Trending 🔥*).
   - Kompatibilitas software lengkap: **CapCut**, **Adobe Premiere Pro**, **After Effects**, **VN Editor**, **Canva**.
   - Perbandingan harga coret & persentase diskon hemat.
   - Tombol **"Beli Sekarang via WhatsApp"** yang otomatis mengarahkan ke chat WhatsApp dengan pesan order terformat rapi (nama template + harga).
   - Panduan 4 langkah mudah cara penggunaan template.
   - Rekomendasi template terkait.

4. **💼 Layanan Jasa Edit Video Custom (`/services`)**
   - Pilihan paket custom: Jasa Edit Video Opening, Jasa Edit Jedag Jedug, Jasa Video Event/PKKMB, dan Paket Bundling Creator Bulanan.
   - Alur kerja 4 langkah: Konsultasi ➔ Kirim Materi ➔ Pengerjaan ➔ Revisi & Final.
   - Accordion Tanya Jawab (FAQ) lengkap.

5. **📖 Halaman Tentang Kami (`/about`)**
   - Profil, statistik pencapaian (1.500+ template terjual, 4.9/5 rating kepuasan), misi demokratisasi konten video berkualitas, dan ulasan kreator.

6. **⚡ Backend Dual-Mode (Next.js Serverless + Express.js & PostgreSQL)**
   - API endpoints:
     - `GET /api/health` — Status server dan koneksi PostgreSQL.
     - `GET /api/products` — Data template dengan filter kategori, search, dan sort.
     - `GET /api/products/:slug` — Detail template berdasarkan slug.
     - `GET /api/categories` — Daftar kategori template.
     - `GET /api/services` — Daftar paket jasa editing.
     - `POST /api/inquiries` — Mencatat leads/pesanan WhatsApp ke database.
   - Koneksi PostgreSQL tangguh dengan fallback otomatis ke memori lokal jika database belum terhubung.

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (App Router), React 19, TypeScript
- **Styling**: Vanilla CSS (Playfully Minimal Design System, custom tokens & animations)
- **Backend**: Express.js & Next.js Serverless Route Handlers
- **Database**: PostgreSQL (`pg` connection pool + `schema.sql`)
- **Deployment**: Vercel ready (`vercel.json`)

---

## 🚀 Panduan Memulai Cepat (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Konfigurasi Environment Variables
Salin file `.env.example` menjadi `.env.local`:
```bash
copy .env.example .env.local
```
Sesuaikan nomor WhatsApp Anda pada baris:
```env
NEXT_PUBLIC_WA_NUMBER=628123456789
```
*(Gunakan format internasional tanpa tanda + atau awalan 0, contoh: 6281234567890)*

### 3. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka browser di `http://localhost:3000`.

### 4. Menjalankan Standalone Express Server (Opsional)
Jika ingin menjalankan backend Express secara terpisah di port 5000:
```bash
npm run server
```

---

## 🗄️ Konfigurasi PostgreSQL

Jika Anda ingin menghubungkan database PostgreSQL (bisa menggunakan **Neon**, **Supabase**, **Railway**, atau PostgreSQL lokal):

1. Buka dashboard database Anda dan salin Connection String (`DATABASE_URL`).
2. Masukkan ke file `.env.local`:
   ```env
   DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
   ```
3. Eksekusi query yang terdapat pada file [`schema.sql`](./schema.sql) di database SQL editor Anda untuk membuat tabel dan mengisi seed data default.
4. Cek endpoint `http://localhost:3000/api/health` — status database akan berubah menjadi:
   ```json
   {
     "status": "ok",
     "database": { "connected": true, "mode": "postgres" }
   }
   ```
*(Catatan: Jika `DATABASE_URL` belum diisi, aplikasi tetap berjalan 100% normal menggunakan dataset in-memory bawaan)*.

---

## ☁️ Panduan Deploy ke Vercel

1. Push repository ini ke GitHub / GitLab.
2. Buka dashboard [Vercel](https://vercel.com/) dan klik **Add New Project** ➔ **Import Git Repository**.
3. Pada bagian **Environment Variables**, tambahkan:
   - `NEXT_PUBLIC_WA_NUMBER`: Nomor WhatsApp Anda (misal `6281234567890`).
   - `DATABASE_URL`: (Opsional) Connection string PostgreSQL dari Neon / Supabase / Railway.
4. Klik tombol **Deploy**. Vercel akan otomatis melakukan build dan aplikasi langsung online dengan URL live!

---

## 📂 Struktur Direktori

```text
├── public/
│   └── images/                # Aset gambar template video resolusi tinggi
├── src/
│   ├── app/
│   │   ├── api/               # API Route catch-all serverless untuk Vercel
│   │   ├── templates/         # Halaman katalog template & filter
│   │   │   └── [slug]/        # Halaman detail dinamis per template
│   │   ├── services/          # Halaman jasa custom video editing & FAQ
│   │   ├── about/             # Halaman profil studio & ulasan kreator
│   │   ├── globals.css        # Core design system & animasi playfully minimal
│   │   ├── layout.tsx         # Root layout dengan Header, Footer, & WA Button
│   │   └── page.tsx           # Home page
│   ├── components/
│   │   ├── Header.tsx         # Navbar dengan menu responsif mobile
│   │   ├── Footer.tsx         # Footer navigasi & link media sosial
│   │   ├── ProductCard.tsx    # Card template video dengan hover effect
│   │   └── WhatsAppFloat.tsx  # Floating button chat WA animasi bounce
│   ├── lib/
│   │   └── data.ts            # Tipe data, mock data, & helper WhatsApp link
│   └── server/
│       ├── app.ts             # Express.js application & API routes
│       ├── db.ts              # PostgreSQL pool client dengan failover lokal
│       └── standalone.ts      # Standalone runner untuk express lokal
├── schema.sql                 # DDL PostgreSQL table & seed data
├── vercel.json                # Konfigurasi build Vercel
└── package.json
```
