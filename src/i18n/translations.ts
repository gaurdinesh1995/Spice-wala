import type { LangCode } from '../data/pigments'

type Dict = Record<string, string>

const en: Dict = {
  shop: 'Shop',
  categories: 'Categories',
  export: 'Export',
  privateLabel: 'Private Label',
  bulkOrders: 'Bulk Orders',
  distributor: 'Distributor',
  about: 'About',
  certifications: 'Certifications',
  blogs: 'Blogs',
  gallery: 'Gallery',
  contact: 'Contact',
  faq: 'FAQ',
  account: 'My Account',
  wishlist: 'Wishlist',
  cart: 'Cart',
  checkout: 'Checkout',
  trackOrder: 'Track Order',
  searchPlaceholder: 'Search spices, blends, grades…',
  addToCart: 'Add to Cart',
  buyNow: 'Buy Now',
  requestQuote: 'Request Quote',
  featured: 'Featured',
  bestSelling: 'Best Selling',
  newArrivals: 'New Arrivals',
  whyUs: 'Why SpiceWala',
  newsletter: 'Stay in the pigment loop',
  subscribe: 'Subscribe',
  emptyCart: 'Your cart is empty',
  emptyWishlist: 'No saved spices yet',
  login: 'Login',
  register: 'Register',
  logout: 'Logout',
  continueShopping: 'Continue shopping',
  placeOrder: 'Place Order',
  guestCheckout: 'Guest Checkout',
}

const hi: Dict = {
  ...en,
  shop: 'खरीदें',
  categories: 'श्रेणियाँ',
  export: 'निर्यात',
  privateLabel: 'प्राइवेट लेबल',
  bulkOrders: 'थोक ऑर्डर',
  distributor: 'वितरक',
  about: 'हमारे बारे में',
  contact: 'संपर्क',
  wishlist: 'इच्छा सूची',
  cart: 'कार्ट',
  checkout: 'चेकआउट',
  addToCart: 'कार्ट में डालें',
  buyNow: 'अभी खरीदें',
  requestQuote: 'कोटेशन माँगें',
  searchPlaceholder: 'मसाले खोजें…',
  login: 'लॉगिन',
  register: 'रजिस्टर',
}

const ar: Dict = {
  ...en,
  shop: 'تسوق',
  categories: 'الفئات',
  export: 'تصدير',
  cart: 'السلة',
  wishlist: 'المفضلة',
  contact: 'اتصل بنا',
  addToCart: 'أضف إلى السلة',
  searchPlaceholder: 'ابحث عن التوابل…',
}

const fr: Dict = {
  ...en,
  shop: 'Boutique',
  categories: 'Catégories',
  export: 'Export',
  cart: 'Panier',
  wishlist: 'Favoris',
  contact: 'Contact',
  addToCart: 'Ajouter au panier',
  searchPlaceholder: 'Rechercher des épices…',
}

const de: Dict = {
  ...en,
  shop: 'Shop',
  categories: 'Kategorien',
  export: 'Export',
  cart: 'Warenkorb',
  wishlist: 'Wunschliste',
  contact: 'Kontakt',
  addToCart: 'In den Warenkorb',
  searchPlaceholder: 'Gewürze suchen…',
}

const es: Dict = {
  ...en,
  shop: 'Tienda',
  categories: 'Categorías',
  export: 'Exportación',
  cart: 'Carrito',
  wishlist: 'Lista de deseos',
  contact: 'Contacto',
  addToCart: 'Añadir al carrito',
  searchPlaceholder: 'Buscar especias…',
}

const dictionaries: Record<LangCode, Dict> = { en, hi, ar, fr, de, es }

export function t(lang: LangCode, key: string): string {
  return dictionaries[lang][key] ?? dictionaries.en[key] ?? key
}
