-- ========================================================
-- Video Template Studio - PostgreSQL Database Schema
-- ========================================================

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(50) UNIQUE NOT NULL,
  label VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Products (Video Templates) Table
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(50) PRIMARY KEY,
  slug VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  category VARCHAR(100) NOT NULL,
  category_slug VARCHAR(50) NOT NULL REFERENCES categories(slug) ON DELETE CASCADE,
  price INTEGER NOT NULL,
  original_price INTEGER,
  image VARCHAR(255) NOT NULL,
  badge VARCHAR(50),
  features JSONB DEFAULT '[]'::jsonb,
  software JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  label VARCHAR(100) NOT NULL,
  price VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  features JSONB DEFAULT '[]'::jsonb,
  featured BOOLEAN DEFAULT false,
  wa_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Customer Inquiries & Order Logs (Direct WhatsApp Orders)
CREATE TABLE IF NOT EXISTS inquiries (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(150),
  customer_phone VARCHAR(50),
  product_id VARCHAR(50) REFERENCES products(id) ON DELETE SET NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'contacted', 'completed', 'cancelled'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ========================================================
-- Initial Seed Data
-- ========================================================

-- Insert Categories
INSERT INTO categories (slug, label) VALUES
  ('all', 'Semua'),
  ('video-opening', 'Video Opening'),
  ('jedag-jedug', 'Jedag Jedug'),
  ('pkkmb', 'PKKMB'),
  ('video-outro', 'Video Outro'),
  ('wedding', 'Wedding'),
  ('gaming', 'Gaming'),
  ('slideshow', 'Slideshow')
ON CONFLICT (slug) DO NOTHING;

-- Insert Products
INSERT INTO products (id, slug, title, description, long_description, category, category_slug, price, original_price, image, badge, features, software) VALUES
(
  '1',
  'neon-intro-4k',
  'Neon Intro 4K',
  'Template video intro neon futuristik dengan efek motion graphics premium. Cocok untuk kreator YouTube & TikTok.',
  'Template video intro dengan efek neon glow yang memukau. Dilengkapi motion graphics premium, partikel efek, dan transisi smooth. Resolusi 4K yang tajam dan siap pakai untuk konten YouTube, TikTok, atau presentasi. Mudah diedit dan dikustomisasi sesuai brand kamu.',
  'Video Opening',
  'video-opening',
  25000,
  45000,
  '/images/video-opening.jpg',
  'Best Seller',
  '["Resolusi 4K (3840x2160)", "Durasi 10 detik", "Mudah edit teks & warna", "Format After Effects & CapCut", "Termasuk musik background gratis", "Panduan edit lengkap"]'::jsonb,
  '["After Effects", "CapCut", "Premiere Pro"]'::jsonb
),
(
  '2',
  'jedag-jedug-viral',
  'Jedag Jedug Viral Pack',
  'Paket template jedag jedug trending yang bikin konten kamu viral! Beat sync, flash transition, & efek dinamis.',
  'Koleksi lengkap template jedag jedug yang lagi trending di TikTok & Instagram Reels. Dilengkapi beat sync otomatis, flash transition yang smooth, dan efek visual dinamis. Tinggal masukkan foto/video kamu dan langsung jadi konten viral!',
  'Jedag Jedug',
  'jedag-jedug',
  15000,
  NULL,
  '/images/jedag-jedug.jpg',
  'Trending 🔥',
  '["5 variasi template dalam 1 paket", "Beat sync otomatis", "Flash & glitch transition", "Format CapCut & VN Editor", "Resolusi HD 1080p", "Tutorial penggunaan"]'::jsonb,
  '["CapCut", "VN Editor", "Alight Motion"]'::jsonb
),
(
  '3',
  'pkkmb-universitas-premium',
  'PKKMB Universitas Premium',
  'Template video PKKMB profesional dengan tema akademik. Sempurna untuk acara orientasi mahasiswa baru.',
  'Template video PKKMB yang profesional dan elegant untuk acara orientasi mahasiswa baru. Tema akademik dengan sentuhan modern, dilengkapi animasi teks, transisi smooth, dan slot untuk logo universitas. Bisa dikustomisasi warna sesuai identitas kampus.',
  'PKKMB',
  'pkkmb',
  35000,
  60000,
  '/images/pkkmb.jpg',
  NULL,
  '["Tema akademik profesional", "Durasi 2-3 menit", "Slot logo & teks kampus", "Warna bisa dikustomisasi", "Format After Effects & PowerPoint", "Animasi teks premium", "Musik background included"]'::jsonb,
  '["After Effects", "PowerPoint", "Canva"]'::jsonb
),
(
  '4',
  'cinematic-outro',
  'Cinematic Outro YouTube',
  'End screen template yang cinematic dan profesional dengan animasi subscribe button & social media icons.',
  'Template outro/end screen YouTube yang cinematic dan profesional. Dengan animasi subscribe button yang eye-catching, social media icons floating, dan slot untuk video recommendation. Buat channel YouTube kamu terlihat lebih profesional dan tingkatkan subscriber!',
  'Video Outro',
  'video-outro',
  20000,
  NULL,
  '/images/video-outro.jpg',
  NULL,
  '["Resolusi 4K", "Durasi 20 detik", "Animasi subscribe button", "Social media icons", "2 slot video recommendation", "Easy to customize"]'::jsonb,
  '["After Effects", "Premiere Pro", "CapCut"]'::jsonb
),
(
  '5',
  'wedding-invitation-elegant',
  'Wedding Invitation Elegant',
  'Template video undangan pernikahan elegan dengan dekorasi floral dan animasi romantis. Save the date!',
  'Template video undangan pernikahan yang elegan dan romantis. Dekorasi floral cantik, animasi teks smooth, dan partikel efek yang menawan. Cocok untuk save the date, undangan digital, atau video dokumentasi pernikahan. Sentuhan luxury yang membuat momen spesial makin berkesan.',
  'Wedding',
  'wedding',
  45000,
  75000,
  '/images/wedding-invitation.jpg',
  'Premium',
  '["Dekorasi floral premium", "Animasi romantis", "Durasi 1-2 menit", "Edit nama & tanggal mudah", "Format After Effects & CapCut", "Background music romantis", "Resolusi Full HD"]'::jsonb,
  '["After Effects", "CapCut", "Premiere Pro"]'::jsonb
),
(
  '6',
  'gaming-highlight-montage',
  'Gaming Highlight Montage',
  'Template video montage gaming yang dinamis! Glitch effect, fast zoom, dan transisi aggressive untuk esports.',
  'Template video montage khusus gaming & esports. Efek glitch, fast zoom, electric spark, dan transisi aggressive yang bikin highlight gaming kamu makin epic. Cocok untuk content creator gaming di YouTube, TikTok, dan Instagram. Tinggal masukkan clip gameplay dan langsung jadi montage keren!',
  'Gaming',
  'gaming',
  30000,
  NULL,
  '/images/gaming-highlight.jpg',
  NULL,
  '["Glitch & shake effects", "Fast zoom transitions", "Sound effects included", "Format Premiere Pro & CapCut", "Resolusi Full HD/4K", "10+ preset transisi", "Color grading presets"]'::jsonb,
  '["Premiere Pro", "After Effects", "CapCut"]'::jsonb
),
(
  '7',
  'memory-slideshow-aesthetic',
  'Memory Slideshow Aesthetic',
  'Template slideshow foto yang aesthetic dan elegan. Cocok untuk birthday, anniversary, atau kompilasi kenangan.',
  'Template slideshow foto yang aesthetic dan elegan dengan efek ken burns, transisi smooth, dan tipografi cantik. Bisa digunakan untuk birthday video, anniversary compilation, wisuda, atau kenangan bersama teman. Tinggal drag & drop foto dan edit teks sesuai keinginan.',
  'Slideshow',
  'slideshow',
  20000,
  NULL,
  '/images/slideshow.jpg',
  NULL,
  '["15+ slot foto", "Ken burns effect", "Transisi smooth", "Editable text & font", "Format CapCut & After Effects", "Background music included", "Durasi 1-3 menit"]'::jsonb,
  '["CapCut", "After Effects", "VN Editor"]'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- Insert Services
INSERT INTO services (id, title, label, price, description, features, featured, wa_message) VALUES
(
  's1',
  'Jasa Edit Video Opening',
  'Video Intro & Outro Custom',
  'Mulai Rp 49.000',
  'Buat video opening/outro yang unik dan profesional sesuai brand kamu. Kami desain dari nol dengan animasi premium.',
  '["Desain custom sesuai brand identity", "Animasi motion graphics premium", "Resolusi hingga 4K", "File sumber (project file) included", "Revisi hingga 3x via WhatsApp"]'::jsonb,
  true,
  'Halo, saya tertarik dengan *Jasa Edit Video Opening* custom. Bisa diskusi lebih lanjut?'
),
(
  's2',
  'Jasa Edit Jedag Jedug',
  'Konten TikTok & Reels',
  'Mulai Rp 29.000',
  'Kami buatin konten jedag jedug yang viral sesuai tren terbaru. Tinggal kasih foto/video, kami yang edit!',
  '["Beat sync presisi tinggi", "Efek transisi trending", "Resolusi HD optimized for socmed", "Delivery 1-2 hari kerja", "Revisi & konsultasi via WhatsApp"]'::jsonb,
  false,
  'Halo, saya mau order *Jasa Edit Jedag Jedug*. Bisa bantu saya?'
),
(
  's3',
  'Jasa Video Event & PKKMB',
  'Video Acara & Institusi',
  'Mulai Rp 99.000',
  'Video profesional untuk acara kampus, PKKMB, seminar, atau event perusahaan. Dari konsep hingga finishing.',
  '["Konsep & storyboard", "Animasi teks & transisi profesional", "Slot logo & branding custom", "Background music licensed", "Pendampingan hingga tuntas"]'::jsonb,
  false,
  'Halo, saya butuh *Jasa Video Event/PKKMB*. Bisa diskusi kebutuhannya?'
)
ON CONFLICT (id) DO NOTHING;
