export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  features: string[];
  software: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  label: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
  waMessage: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
}

export const WA_NUMBER = "628123456789";

export const categories = [
  { label: "Semua", slug: "all" },
  { label: "Video Opening", slug: "video-opening" },
  { label: "Jedag Jedug", slug: "jedag-jedug" },
  { label: "PKKMB", slug: "pkkmb" },
  { label: "Video Outro", slug: "video-outro" },
  { label: "Wedding", slug: "wedding" },
  { label: "Gaming", slug: "gaming" },
  { label: "Slideshow", slug: "slideshow" },
];

export const products: Product[] = [
  {
    id: "1",
    slug: "neon-intro-4k",
    title: "Neon Intro 4K",
    description: "Template video intro neon futuristik dengan efek motion graphics premium. Cocok untuk kreator YouTube & TikTok.",
    longDescription: "Template video intro dengan efek neon glow yang memukau. Dilengkapi motion graphics premium, partikel efek, dan transisi smooth. Resolusi 4K yang tajam dan siap pakai untuk konten YouTube, TikTok, atau presentasi. Mudah diedit dan dikustomisasi sesuai brand kamu.",
    category: "Video Opening",
    categorySlug: "video-opening",
    price: 25000,
    originalPrice: 45000,
    image: "/images/video-opening.jpg",
    badge: "Best Seller",
    features: [
      "Resolusi 4K (3840x2160)",
      "Durasi 10 detik",
      "Mudah edit teks & warna",
      "Format After Effects & CapCut",
      "Termasuk musik background gratis",
      "Panduan edit lengkap",
    ],
    software: ["After Effects", "CapCut", "Premiere Pro"],
  },
  {
    id: "2",
    slug: "jedag-jedug-viral",
    title: "Jedag Jedug Viral Pack",
    description: "Paket template jedag jedug trending yang bikin konten kamu viral! Beat sync, flash transition, & efek dinamis.",
    longDescription: "Koleksi lengkap template jedag jedug yang lagi trending di TikTok & Instagram Reels. Dilengkapi beat sync otomatis, flash transition yang smooth, dan efek visual dinamis. Tinggal masukkan foto/video kamu dan langsung jadi konten viral!",
    category: "Jedag Jedug",
    categorySlug: "jedag-jedug",
    price: 15000,
    image: "/images/jedag-jedug.jpg",
    badge: "Trending 🔥",
    features: [
      "5 variasi template dalam 1 paket",
      "Beat sync otomatis",
      "Flash & glitch transition",
      "Format CapCut & VN Editor",
      "Resolusi HD 1080p",
      "Tutorial penggunaan",
    ],
    software: ["CapCut", "VN Editor", "Alight Motion"],
  },
  {
    id: "3",
    slug: "pkkmb-universitas-premium",
    title: "PKKMB Universitas Premium",
    description: "Template video PKKMB profesional dengan tema akademik. Sempurna untuk acara orientasi mahasiswa baru.",
    longDescription: "Template video PKKMB yang profesional dan elegant untuk acara orientasi mahasiswa baru. Tema akademik dengan sentuhan modern, dilengkapi animasi teks, transisi smooth, dan slot untuk logo universitas. Bisa dikustomisasi warna sesuai identitas kampus.",
    category: "PKKMB",
    categorySlug: "pkkmb",
    price: 35000,
    originalPrice: 60000,
    image: "/images/pkkmb.jpg",
    features: [
      "Tema akademik profesional",
      "Durasi 2-3 menit",
      "Slot logo & teks kampus",
      "Warna bisa dikustomisasi",
      "Format After Effects & PowerPoint",
      "Animasi teks premium",
      "Musik background included",
    ],
    software: ["After Effects", "PowerPoint", "Canva"],
  },
  {
    id: "4",
    slug: "cinematic-outro",
    title: "Cinematic Outro YouTube",
    description: "End screen template yang cinematic dan profesional dengan animasi subscribe button & social media icons.",
    longDescription: "Template outro/end screen YouTube yang cinematic dan profesional. Dengan animasi subscribe button yang eye-catching, social media icons floating, dan slot untuk video recommendation. Buat channel YouTube kamu terlihat lebih profesional dan tingkatkan subscriber!",
    category: "Video Outro",
    categorySlug: "video-outro",
    price: 20000,
    image: "/images/video-outro.jpg",
    features: [
      "Resolusi 4K",
      "Durasi 20 detik",
      "Animasi subscribe button",
      "Social media icons",
      "2 slot video recommendation",
      "Easy to customize",
    ],
    software: ["After Effects", "Premiere Pro", "CapCut"],
  },
  {
    id: "5",
    slug: "wedding-invitation-elegant",
    title: "Wedding Invitation Elegant",
    description: "Template video undangan pernikahan elegan dengan dekorasi floral dan animasi romantis. Save the date!",
    longDescription: "Template video undangan pernikahan yang elegan dan romantis. Dekorasi floral cantik, animasi teks smooth, dan partikel efek yang menawan. Cocok untuk save the date, undangan digital, atau video dokumentasi pernikahan. Sentuhan luxury yang membuat momen spesial makin berkesan.",
    category: "Wedding",
    categorySlug: "wedding",
    price: 45000,
    originalPrice: 75000,
    image: "/images/wedding-invitation.jpg",
    badge: "Premium",
    features: [
      "Dekorasi floral premium",
      "Animasi romantis",
      "Durasi 1-2 menit",
      "Edit nama & tanggal mudah",
      "Format After Effects & CapCut",
      "Background music romantis",
      "Resolusi Full HD",
    ],
    software: ["After Effects", "CapCut", "Premiere Pro"],
  },
  {
    id: "6",
    slug: "gaming-highlight-montage",
    title: "Gaming Highlight Montage",
    description: "Template video montage gaming yang dinamis! Glitch effect, fast zoom, dan transisi aggressive untuk esports.",
    longDescription: "Template video montage khusus gaming & esports. Efek glitch, fast zoom, electric spark, dan transisi aggressive yang bikin highlight gaming kamu makin epic. Cocok untuk content creator gaming di YouTube, TikTok, dan Instagram. Tinggal masukkan clip gameplay dan langsung jadi montage keren!",
    category: "Gaming",
    categorySlug: "gaming",
    price: 30000,
    image: "/images/gaming-highlight.jpg",
    features: [
      "Glitch & shake effects",
      "Fast zoom transitions",
      "Sound effects included",
      "Format Premiere Pro & CapCut",
      "Resolusi Full HD/4K",
      "10+ preset transisi",
      "Color grading presets",
    ],
    software: ["Premiere Pro", "After Effects", "CapCut"],
  },
  {
    id: "7",
    slug: "memory-slideshow-aesthetic",
    title: "Memory Slideshow Aesthetic",
    description: "Template slideshow foto yang aesthetic dan elegan. Cocok untuk birthday, anniversary, atau kompilasi kenangan.",
    longDescription: "Template slideshow foto yang aesthetic dan elegan dengan efek ken burns, transisi smooth, dan tipografi cantik. Bisa digunakan untuk birthday video, anniversary compilation, wisuda, atau kenangan bersama teman. Tinggal drag & drop foto dan edit teks sesuai keinginan.",
    category: "Slideshow",
    categorySlug: "slideshow",
    price: 20000,
    image: "/images/slideshow.jpg",
    features: [
      "15+ slot foto",
      "Ken burns effect",
      "Transisi smooth",
      "Editable text & font",
      "Format CapCut & After Effects",
      "Background music included",
      "Durasi 1-3 menit",
    ],
    software: ["CapCut", "After Effects", "VN Editor"],
  },
];

export const services: ServiceItem[] = [
  {
    id: "s1",
    title: "Jasa Edit Video Opening",
    label: "Video Intro & Outro Custom",
    price: "Mulai Rp 49.000",
    description: "Buat video opening/outro yang unik dan profesional sesuai brand kamu. Kami desain dari nol dengan animasi premium.",
    features: [
      "Desain custom sesuai brand identity",
      "Animasi motion graphics premium",
      "Resolusi hingga 4K",
      "File sumber (project file) included",
      "Revisi hingga 3x via WhatsApp",
    ],
    featured: true,
    waMessage: "Halo, saya tertarik dengan *Jasa Edit Video Opening* custom. Bisa diskusi lebih lanjut?",
  },
  {
    id: "s2",
    title: "Jasa Edit Jedag Jedug",
    label: "Konten TikTok & Reels",
    price: "Mulai Rp 29.000",
    description: "Kami buatin konten jedag jedug yang viral sesuai tren terbaru. Tinggal kasih foto/video, kami yang edit!",
    features: [
      "Beat sync presisi tinggi",
      "Efek transisi trending",
      "Resolusi HD optimized for socmed",
      "Delivery 1-2 hari kerja",
      "Revisi & konsultasi via WhatsApp",
    ],
    waMessage: "Halo, saya mau order *Jasa Edit Jedag Jedug*. Bisa bantu saya?",
  },
  {
    id: "s3",
    title: "Jasa Video Event & PKKMB",
    label: "Video Acara & Institusi",
    price: "Mulai Rp 99.000",
    description: "Video profesional untuk acara kampus, PKKMB, seminar, atau event perusahaan. Dari konsep hingga finishing.",
    features: [
      "Konsep & storyboard",
      "Animasi teks & transisi profesional",
      "Slot logo & branding custom",
      "Background music licensed",
      "Pendampingan hingga tuntas",
    ],
    waMessage: "Halo, saya butuh *Jasa Video Event/PKKMB*. Bisa diskusi kebutuhannya?",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Rizky Pratama",
    role: "Content Creator",
    company: "YouTube 120K Subs",
    text: "Template intro-nya keren banget! Channel YouTube saya jadi keliatan lebih profesional. Harganya juga terjangkau buat pemula kayak saya.",
  },
  {
    name: "Anisa Putri",
    role: "Mahasiswa",
    company: "Universitas Brawijaya",
    text: "Beli template PKKMB di sini buat acara ospek kampus. Hasilnya bagus dan gampang diedit. Tim BEM langsung suka!",
  },
  {
    name: "Dimas Saputra",
    role: "Gaming Creator",
    company: "TikTok 500K Followers",
    text: "Template jedag jedug dan gaming montage-nya viral semua! Konten saya langsung naik engagement-nya. Recommended banget.",
  },
];

export function formatPrice(price: number): string {
  return `Rp ${price.toLocaleString("id-ID")}`;
}

export function getWhatsAppLink(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getProductWAMessage(product: Product): string {
  return `Halo, saya tertarik dengan template *${product.title}* (${formatPrice(product.price)}). Bagaimana cara ordernya?`;
}
