import type { PigmentKey } from './pigments'
import { productImg, spiceImg } from './images'

export type Category = {
  id: string
  name: string
  slug: string
  pigment: PigmentKey
  description: string
  image: string
  count: number
}

export type PackSize = {
  size: string
  priceInr: number
  stock: number
}

export type Product = {
  id: string
  slug: string
  name: string
  hindiName: string
  categoryId: string
  pigment: PigmentKey
  description: string
  longDescription: string
  images: string[]
  video?: string
  basePriceInr: number
  discountPercent: number
  packSizes: PackSize[]
  moq: string
  stock: number
  origin: string
  specs: { label: string; value: string }[]
  tags: string[]
  featured: boolean
  bestSeller: boolean
  newArrival: boolean
  rating: number
  reviewCount: number
  wholesalePrices?: { country: string; priceUsd: number }[]
}

export type Review = {
  id: string
  productId: string
  author: string
  country: string
  rating: number
  title: string
  body: string
  date: string
}

export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  author: string
  category: string
}

export type Certificate = {
  id: string
  name: string
  issuer: string
  year: string
  description: string
}

export type GalleryItem = {
  id: string
  title: string
  type: 'factory' | 'packaging' | 'farm' | 'export'
  image: string
}

export const categories: Category[] = [
  {
    id: 'cat-whole',
    name: 'Whole Spices',
    slug: 'whole-spices',
    pigment: 'cumin',
    description: 'Sun-dried whole spices, graded for aroma and uniformity.',
    image: productImg.cumin,
    count: 8,
  },
  {
    id: 'cat-ground',
    name: 'Ground Spices',
    slug: 'ground-spices',
    pigment: 'turmeric',
    description: 'Stone-milled powders that keep their pigment and punch.',
    image: productImg.turmeric,
    count: 7,
  },
  {
    id: 'cat-blends',
    name: 'Masala Blends',
    slug: 'masala-blends',
    pigment: 'chili',
    description: 'House recipes for garam masala, chai, and kitchen staples.',
    image: productImg.garam,
    count: 5,
  },
  {
    id: 'cat-seeds',
    name: 'Seeds & Pods',
    slug: 'seeds-pods',
    pigment: 'cardamom',
    description: 'Cardamom, mustard, fenugreek — seeds with character.',
    image: productImg.cardamom,
    count: 4,
  },
  {
    id: 'cat-premium',
    name: 'Premium & Rare',
    slug: 'premium-rare',
    pigment: 'saffron',
    description: 'Saffron threads, high-grade pepper, export-only lots.',
    image: productImg.saffron,
    count: 3,
  },
  {
    id: 'cat-organic',
    name: 'Organic Range',
    slug: 'organic',
    pigment: 'coriander',
    description: 'Certified organic spices from partner farms.',
    image: productImg.coriander,
    count: 4,
  },
]

const makePacks = (base: number): PackSize[] => [
  { size: '100g', priceInr: Math.round(base * 0.35), stock: 120 },
  { size: '250g', priceInr: Math.round(base * 0.75), stock: 80 },
  { size: '500g', priceInr: base, stock: 60 },
  { size: '1kg', priceInr: Math.round(base * 1.8), stock: 40 },
  { size: '5kg', priceInr: Math.round(base * 7.5), stock: 20 },
  { size: '25kg', priceInr: Math.round(base * 32), stock: 8 },
]

export const products: Product[] = [
  {
    id: 'p1',
    slug: 'haldi-turmeric-powder',
    name: 'Haldi Turmeric Powder',
    hindiName: 'हल्दी',
    categoryId: 'cat-ground',
    pigment: 'turmeric',
    description: 'High-curcumin turmeric milled to a vivid gold pigment.',
    longDescription:
      'Sourced from Erode and Nizamabad farms, our turmeric is steam-sterilized and stone-milled to preserve curcumin colour. Ideal for retail jars, food service, and private-label powders. Lab-tested for curcuminoid content and heavy metals.',
    images: [productImg.turmeric, productImg.turmericDetail, productImg.turmericAlt],
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    basePriceInr: 280,
    discountPercent: 10,
    packSizes: makePacks(280),
    moq: '25kg (wholesale)',
    stock: 420,
    origin: 'India — Tamil Nadu / Telangana',
    specs: [
      { label: 'Curcumin', value: '3.5%–5%' },
      { label: 'Mesh', value: '60–80' },
      { label: 'Moisture', value: '<10%' },
      { label: 'Form', value: 'Fine powder' },
    ],
    tags: ['ground', 'export', 'organic-option'],
    featured: true,
    bestSeller: true,
    newArrival: false,
    rating: 4.8,
    reviewCount: 214,
    wholesalePrices: [
      { country: 'USA', priceUsd: 4.2 },
      { country: 'UK', priceUsd: 3.9 },
      { country: 'UAE', priceUsd: 3.5 },
    ],
  },
  {
    id: 'p2',
    slug: 'kashmiri-chili-powder',
    name: 'Kashmiri Chili Powder',
    hindiName: 'कश्मीरी मिर्च',
    categoryId: 'cat-ground',
    pigment: 'chili',
    description: 'Brick-red colour, mild heat — the pigment chefs trust.',
    longDescription:
      'Selected Kashmiri and Byadgi chillies blended for colour value (ASTA) without aggressive heat. Perfect for tandoori, gravies, and export retail packs where visual appeal matters.',
    images: [productImg.chili, productImg.chiliDetail, productImg.chiliAlt],
    basePriceInr: 420,
    discountPercent: 5,
    packSizes: makePacks(420),
    moq: '25kg (wholesale)',
    stock: 310,
    origin: 'India — Kashmir / Karnataka',
    specs: [
      { label: 'ASTA Colour', value: '100–140' },
      { label: 'SHU', value: '1,000–2,000' },
      { label: 'Mesh', value: '40–60' },
      { label: 'Form', value: 'Powder' },
    ],
    tags: ['ground', 'export'],
    featured: true,
    bestSeller: true,
    newArrival: false,
    rating: 4.9,
    reviewCount: 189,
  },
  {
    id: 'p3',
    slug: 'green-cardamom',
    name: 'Green Cardamom Pods',
    hindiName: 'हरी इलायची',
    categoryId: 'cat-seeds',
    pigment: 'cardamom',
    description: 'Bold 7–8mm pods with olive-green sheen and citrus oil.',
    longDescription:
      'Grade AGMARK Bold cardamom from the Western Ghats. Hand-sorted for colour and size. Available as whole pods, seeds, or powder for tea and bakery exporters.',
    images: [productImg.cardamom, productImg.cardamomDetail],
    basePriceInr: 2800,
    discountPercent: 0,
    packSizes: makePacks(2800),
    moq: '10kg (wholesale)',
    stock: 95,
    origin: 'India — Kerala / Karnataka',
    specs: [
      { label: 'Grade', value: 'AGMARK Bold' },
      { label: 'Size', value: '7–8mm' },
      { label: 'Moisture', value: '<12%' },
      { label: 'Form', value: 'Whole pods' },
    ],
    tags: ['premium', 'export'],
    featured: true,
    bestSeller: true,
    newArrival: false,
    rating: 4.7,
    reviewCount: 96,
  },
  {
    id: 'p4',
    slug: 'kashmir-saffron',
    name: 'Kashmir Mongra Saffron',
    hindiName: 'केसर',
    categoryId: 'cat-premium',
    pigment: 'saffron',
    description: 'Deep ember threads — aroma, colour, and origin verified.',
    longDescription:
      'Mongra-grade stigma from Pampore, Kashmir. ISO 3632 tested for crocin, picrocrocin, and safranal. Packed in light-safe tins for retail and hospitality.',
    images: [productImg.saffron, productImg.saffronDetail],
    basePriceInr: 45000,
    discountPercent: 0,
    packSizes: [
      { size: '1g', priceInr: 450, stock: 200 },
      { size: '5g', priceInr: 2100, stock: 80 },
      { size: '10g', priceInr: 4000, stock: 40 },
      { size: '50g', priceInr: 18500, stock: 15 },
    ],
    moq: '50g (wholesale)',
    stock: 60,
    origin: 'India — Kashmir (Pampore)',
    specs: [
      { label: 'Grade', value: 'Mongra' },
      { label: 'ISO 3632', value: 'Category I' },
      { label: 'Form', value: 'Threads' },
      { label: 'Packaging', value: 'Tin / pouch' },
    ],
    tags: ['premium', 'gift'],
    featured: true,
    bestSeller: false,
    newArrival: true,
    rating: 5.0,
    reviewCount: 42,
  },
  {
    id: 'p5',
    slug: 'cumin-seeds',
    name: 'Cumin Seeds (Jeera)',
    hindiName: 'जीरा',
    categoryId: 'cat-whole',
    pigment: 'cumin',
    description: 'Sand-toned seeds with warm, nutty essential oil.',
    longDescription:
      'Machine-cleaned and gravity-separated cumin from Rajasthan and Gujarat. Singapore and Singapore-plus grades available for Middle East and European buyers.',
    images: [productImg.cumin, productImg.cuminDetail],
    basePriceInr: 380,
    discountPercent: 8,
    packSizes: makePacks(380),
    moq: '50kg (wholesale)',
    stock: 500,
    origin: 'India — Rajasthan / Gujarat',
    specs: [
      { label: 'Purity', value: '99% / 99.5%' },
      { label: 'Oil', value: '2.5%–4%' },
      { label: 'Moisture', value: '<9%' },
      { label: 'Form', value: 'Whole seeds' },
    ],
    tags: ['whole', 'export', 'bestseller'],
    featured: true,
    bestSeller: true,
    newArrival: false,
    rating: 4.6,
    reviewCount: 167,
  },
  {
    id: 'p6',
    slug: 'coriander-seeds',
    name: 'Coriander Seeds',
    hindiName: 'धनिया',
    categoryId: 'cat-whole',
    pigment: 'coriander',
    description: 'Sage-green seeds, citrusy and clean — Eagle / Scooter grades.',
    longDescription:
      'Split and whole coriander for grinding and pickling. Available steam-sterilized for EU and US retail compliance.',
    images: [productImg.coriander, productImg.corianderDetail],
    basePriceInr: 220,
    discountPercent: 0,
    packSizes: makePacks(220),
    moq: '50kg (wholesale)',
    stock: 380,
    origin: 'India — Rajasthan / Madhya Pradesh',
    specs: [
      { label: 'Grade', value: 'Eagle / Scooter' },
      { label: 'Purity', value: '99%' },
      { label: 'Moisture', value: '<9%' },
      { label: 'Form', value: 'Whole / split' },
    ],
    tags: ['whole', 'export'],
    featured: false,
    bestSeller: true,
    newArrival: false,
    rating: 4.5,
    reviewCount: 88,
  },
  {
    id: 'p7',
    slug: 'black-pepper-malabar',
    name: 'Malabar Black Pepper',
    hindiName: 'काली मिर्च',
    categoryId: 'cat-whole',
    pigment: 'pepper',
    description: 'Ash-dark berries with sharp piperine heat.',
    longDescription:
      'MG1 and TGSEB grades from Kerala’s Malabar coast. Whole, crushed, or powdered. Ideal for grinders and premium retail.',
    images: [productImg.pepper, productImg.pepperDetail],
    basePriceInr: 650,
    discountPercent: 12,
    packSizes: makePacks(650),
    moq: '25kg (wholesale)',
    stock: 240,
    origin: 'India — Kerala (Malabar)',
    specs: [
      { label: 'Grade', value: 'MG1 / TGSEB' },
      { label: 'Density', value: '550–580 g/l' },
      { label: 'Moisture', value: '<12%' },
      { label: 'Form', value: 'Whole berries' },
    ],
    tags: ['whole', 'premium', 'export'],
    featured: true,
    bestSeller: false,
    newArrival: true,
    rating: 4.8,
    reviewCount: 112,
  },
  {
    id: 'p8',
    slug: 'cinnamon-quills',
    name: 'Cinnamon Quills',
    hindiName: 'दालचीनी',
    categoryId: 'cat-whole',
    pigment: 'cinnamon',
    description: 'Bark-toned quills with sweet, woody fragrance.',
    longDescription:
      'Cassia and true cinnamon options. Cut sticks, powder, and broken grades for bakery and beverage brands.',
    images: [productImg.cinnamon, productImg.cinnamonDetail],
    basePriceInr: 520,
    discountPercent: 0,
    packSizes: makePacks(520),
    moq: '25kg (wholesale)',
    stock: 160,
    origin: 'India / Sri Lanka sourced',
    specs: [
      { label: 'Type', value: 'Cassia / Ceylon' },
      { label: 'Form', value: 'Quills / broken' },
      { label: 'Moisture', value: '<12%' },
      { label: 'Oil', value: '1%–2%' },
    ],
    tags: ['whole', 'bakery'],
    featured: false,
    bestSeller: false,
    newArrival: true,
    rating: 4.4,
    reviewCount: 54,
  },
  {
    id: 'p9',
    slug: 'garam-masala',
    name: 'House Garam Masala',
    hindiName: 'गरम मसाला',
    categoryId: 'cat-blends',
    pigment: 'chili',
    description: 'Warm blend — cumin, cardamom, cinnamon, clove, pepper.',
    longDescription:
      'Our signature garam masala roasted in small batches. Private-label recipes available with your spice ratios and branding.',
    images: [productImg.garam, productImg.garamDetail, productImg.chai],
    basePriceInr: 480,
    discountPercent: 15,
    packSizes: makePacks(480),
    moq: '25kg (wholesale)',
    stock: 200,
    origin: 'India — Blended in-house',
    specs: [
      { label: 'Roast', value: 'Light / medium' },
      { label: 'Mesh', value: '40–60' },
      { label: 'Allergens', value: 'None declared' },
      { label: 'Form', value: 'Blend powder' },
    ],
    tags: ['blend', 'private-label'],
    featured: true,
    bestSeller: true,
    newArrival: false,
    rating: 4.9,
    reviewCount: 203,
  },
  {
    id: 'p10',
    slug: 'fenugreek-seeds',
    name: 'Fenugreek Seeds',
    hindiName: 'मेथी',
    categoryId: 'cat-seeds',
    pigment: 'fenugreek',
    description: 'Ochre seeds — bitter-sweet, maple-like aroma when roasted.',
    longDescription:
      'Cleaned fenugreek for pickles, curry powders, and supplements. Available as seeds or powder.',
    images: [productImg.fenugreek, productImg.fenugreekDetail],
    basePriceInr: 180,
    discountPercent: 0,
    packSizes: makePacks(180),
    moq: '50kg (wholesale)',
    stock: 290,
    origin: 'India — Rajasthan',
    specs: [
      { label: 'Purity', value: '99%' },
      { label: 'Moisture', value: '<8%' },
      { label: 'Form', value: 'Whole seeds' },
      { label: 'Colour', value: 'Yellow-ochre' },
    ],
    tags: ['seeds', 'export'],
    featured: false,
    bestSeller: false,
    newArrival: false,
    rating: 4.3,
    reviewCount: 41,
  },
  {
    id: 'p11',
    slug: 'mustard-seeds',
    name: 'Yellow Mustard Seeds',
    hindiName: 'राई',
    categoryId: 'cat-seeds',
    pigment: 'mustard',
    description: 'Bright mustard seed — pickling and tempering staple.',
    longDescription:
      'Yellow and black mustard available. Food-grade cleaned for condiment manufacturers and retail.',
    images: [productImg.mustard, productImg.mustardDetail],
    basePriceInr: 160,
    discountPercent: 5,
    packSizes: makePacks(160),
    moq: '50kg (wholesale)',
    stock: 350,
    origin: 'India — Rajasthan / MP',
    specs: [
      { label: 'Type', value: 'Yellow / Black' },
      { label: 'Purity', value: '99%' },
      { label: 'Oil', value: '35%–42%' },
      { label: 'Form', value: 'Whole seeds' },
    ],
    tags: ['seeds', 'export'],
    featured: false,
    bestSeller: false,
    newArrival: true,
    rating: 4.2,
    reviewCount: 33,
  },
  {
    id: 'p12',
    slug: 'chai-masala',
    name: 'Chai Masala Blend',
    hindiName: 'चाय मसाला',
    categoryId: 'cat-blends',
    pigment: 'cinnamon',
    description: 'Cardamom-forward chai spice for cafés and retail tins.',
    longDescription:
      'Balanced chai masala with cardamom, ginger, cinnamon, clove, and black pepper. Custom café blends on request.',
    images: [productImg.chai, productImg.chaiDetail, productImg.garam],
    basePriceInr: 560,
    discountPercent: 10,
    packSizes: makePacks(560),
    moq: '10kg (wholesale)',
    stock: 140,
    origin: 'India — Blended in-house',
    specs: [
      { label: 'Profile', value: 'Cardamom-forward' },
      { label: 'Mesh', value: '40–60' },
      { label: 'Use', value: 'Tea / latte' },
      { label: 'Form', value: 'Blend powder' },
    ],
    tags: ['blend', 'cafe', 'private-label'],
    featured: true,
    bestSeller: false,
    newArrival: true,
    rating: 4.7,
    reviewCount: 77,
  },
]

export const reviews: Review[] = [
  {
    id: 'r1',
    productId: 'p1',
    author: 'Priya S.',
    country: 'India',
    rating: 5,
    title: 'True gold colour',
    body: 'The turmeric pigment is vivid — curries look restaurant-grade. Ordering 5kg for my café.',
    date: '2026-06-12',
  },
  {
    id: 'r2',
    productId: 'p2',
    author: 'James W.',
    country: 'UK',
    rating: 5,
    title: 'Colour without fire',
    body: 'Perfect Kashmiri red for tandoori marinades. Export docs were smooth.',
    date: '2026-05-28',
  },
  {
    id: 'r3',
    productId: 'p3',
    author: 'Fatima A.',
    country: 'UAE',
    rating: 5,
    title: 'Bold pods',
    body: 'Uniform green cardamom — our tea brand customers noticed immediately.',
    date: '2026-07-02',
  },
  {
    id: 'r4',
    productId: 'p9',
    author: 'Marco R.',
    country: 'Germany',
    rating: 5,
    title: 'House blend magic',
    body: 'Garam masala smells freshly roasted. Private-label sample approved.',
    date: '2026-04-18',
  },
  {
    id: 'r5',
    productId: 'p5',
    author: 'Aisha K.',
    country: 'Canada',
    rating: 4,
    title: 'Clean jeera',
    body: 'Very few stems. Great for retail pouches. Wish 100g packs had windows.',
    date: '2026-06-30',
  },
]

export const blogs: BlogPost[] = [
  {
    id: 'b1',
    slug: 'spices-as-pigment',
    title: 'Spices as Pigment: Why Colour Grades Matter',
    excerpt: 'ASTA, curcumin, and crocin — how we grade spices by the colour they leave behind.',
    content:
      'At SpiceWala we treat every spice like a pigment. Turmeric is judged by curcumin glow, chili by ASTA colour units, saffron by crocin depth. Colour is quality you can see — and it travels well in photographs, menus, and finished dishes. Our pigment swatch system on the site mirrors the same lab language we use on the factory floor.',
    image: spiceImg.powders,
    date: '2026-07-10',
    author: 'SpiceWala Lab',
    category: 'Quality',
  },
  {
    id: 'b2',
    slug: 'export-docs-checklist',
    title: 'Export Documents Checklist for Spice Buyers',
    excerpt: 'COO, phytosanitary, FSSAI, Halal, Kosher — what arrives with every consignment.',
    content:
      'Whether you buy a pallet or a container, we attach commercial invoice, packing list, certificate of origin, phytosanitary certificate, and lab reports. Halal and Kosher certificates available on request. Steam sterilization certificates for EU retail are standard on selected SKUs.',
    image: spiceImg.market,
    date: '2026-06-22',
    author: 'Export Desk',
    category: 'Export',
  },
  {
    id: 'b3',
    slug: 'private-label-playbook',
    title: 'Private Label Playbook for Spice Brands',
    excerpt: 'From recipe lock to artwork — how OEM spice packaging works with us.',
    content:
      'Share your recipe or start from ours. We lock MOQ, mesh size, and roast profile, then run artwork on pouches, tins, or jars. Lead time typically 3–5 weeks after artwork approval. Samples ship worldwide.',
    image: spiceImg.bowl,
    date: '2026-05-15',
    author: 'OEM Team',
    category: 'Private Label',
  },
]

export const certificates: Certificate[] = [
  {
    id: 'c1',
    name: 'FSSAI License',
    issuer: 'Food Safety & Standards Authority of India',
    year: '2025',
    description: 'Licensed manufacturer & packer for domestic and export.',
  },
  {
    id: 'c2',
    name: 'ISO 22000',
    issuer: 'International Organization for Standardization',
    year: '2024',
    description: 'Food safety management across processing lines.',
  },
  {
    id: 'c3',
    name: 'HACCP',
    issuer: 'Accredited certification body',
    year: '2024',
    description: 'Hazard analysis critical control points certified.',
  },
  {
    id: 'c4',
    name: 'Halal Certification',
    issuer: 'Halal India',
    year: '2025',
    description: 'Halal-compliant processing for GCC markets.',
  },
  {
    id: 'c5',
    name: 'Kosher Certification',
    issuer: 'Kosher certifier',
    year: '2025',
    description: 'Kosher supervision for selected SKUs.',
  },
  {
    id: 'c6',
    name: 'Organic (NPOP / USDA)',
    issuer: 'Accredited organic body',
    year: '2025',
    description: 'Organic range certified for India & US retail.',
  },
]

export const gallery: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Bazaar pigment bowls',
    type: 'factory',
    image: spiceImg.market,
  },
  {
    id: 'g2',
    title: 'Ground spice powders',
    type: 'packaging',
    image: spiceImg.powders,
  },
  {
    id: 'g3',
    title: 'Whole spice assortment',
    type: 'export',
    image: spiceImg.assortment,
  },
  {
    id: 'g4',
    title: 'Colour grade bowl',
    type: 'factory',
    image: spiceImg.bowl,
  },
  {
    id: 'g5',
    title: 'Kitchen masala flatlay',
    type: 'farm',
    image: spiceImg.flatlay,
  },
  {
    id: 'g6',
    title: 'Spoon pigment samples',
    type: 'factory',
    image: spiceImg.spoons,
  },
  {
    id: 'g7',
    title: 'Turmeric powder pour',
    type: 'packaging',
    image: spiceImg.turmericPour,
  },
  {
    id: 'g8',
    title: 'Fresh red chili lot',
    type: 'export',
    image: spiceImg.chili,
  },
]

export const faqs = [
  {
    q: 'Do you ship internationally?',
    a: 'Yes. We export to USA, Canada, UK, UAE, Australia, Germany, Saudi Arabia, and across Europe & Asia. Retail parcels and full containers both supported.',
  },
  {
    q: 'What is the MOQ for wholesale?',
    a: 'Most ground and whole spices start at 25–50kg. Premium items like saffron and cardamom have lower MOQs. See each product page.',
  },
  {
    q: 'Can I order private-label packaging?',
    a: 'Yes. We offer OEM / private label with custom recipes, mesh, and artwork on pouches, jars, and tins.',
  },
  {
    q: 'How does currency pricing work?',
    a: 'Retail prices convert automatically from an INR base using daily-style rates. B2B buyers can request country-specific wholesale quotes.',
  },
  {
    q: 'Which payment methods do you accept?',
    a: 'Cards, UPI, net banking, wallets, Apple Pay, Google Pay, PayPal, Stripe, Razorpay, bank transfer, and Wise.',
  },
  {
    q: 'Can I request samples?',
    a: 'Yes — use the Sample Request on Bulk Orders or Contact. Sample fees may apply and are credited on first bulk order.',
  },
  {
    q: 'Do you provide export documents?',
    a: 'COO, phytosanitary, invoice, packing list, lab reports, Halal/Kosher, and steam-sterilization certificates as required.',
  },
  {
    q: 'How do I become a distributor?',
    a: 'Fill the Distributor Registration form. Our trade team reviews territory fit and responds within 3 business days.',
  },
]

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(categoryId: string) {
  return products.filter((p) => p.categoryId === categoryId)
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((p) => p.id !== product.id && (p.pigment === product.pigment || p.categoryId === product.categoryId))
    .slice(0, limit)
}

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug)
}

export function getBlogBySlug(slug: string) {
  return blogs.find((b) => b.slug === slug)
}

export function searchProducts(query: string) {
  const q = query.toLowerCase().trim()
  if (!q) return products
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.hindiName.includes(q) ||
      p.tags.some((t) => t.includes(q)) ||
      p.description.toLowerCase().includes(q),
  )
}
