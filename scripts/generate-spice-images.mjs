/**
 * Unique pigment product art per SKU.
 * Run: node scripts/generate-spice-images.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '..', 'public', 'images', 'products')
fs.mkdirSync(outDir, { recursive: true })

const products = [
  { id: 'turmeric', name: 'Haldi', en: 'Turmeric Powder', hex: '#D4A017', hex2: '#F0C040', grain: '#B8860B', form: 'powder' },
  { id: 'chili', name: 'Mirchi', en: 'Kashmiri Chili', hex: '#B33A2B', hex2: '#D45A48', grain: '#8B2E22', form: 'powder' },
  { id: 'cardamom', name: 'Elaichi', en: 'Green Cardamom', hex: '#6B7A3A', hex2: '#8FA04E', grain: '#55622E', form: 'pods' },
  { id: 'saffron', name: 'Kesar', en: 'Mongra Saffron', hex: '#C45C26', hex2: '#E07840', grain: '#9A4518', form: 'threads' },
  { id: 'cumin', name: 'Jeera', en: 'Cumin Seeds', hex: '#A67C52', hex2: '#C49A6C', grain: '#8A6640', form: 'seeds' },
  { id: 'coriander', name: 'Dhania', en: 'Coriander Seeds', hex: '#8A9A5B', hex2: '#A8B870', grain: '#6E7C48', form: 'round-seeds' },
  { id: 'pepper', name: 'Kali Mirch', en: 'Malabar Pepper', hex: '#3D3A36', hex2: '#5A564F', grain: '#2A2825', form: 'round-seeds' },
  { id: 'cinnamon', name: 'Dalchini', en: 'Cinnamon Quills', hex: '#8B4513', hex2: '#A85A28', grain: '#6E3610', form: 'quills' },
  { id: 'fenugreek', name: 'Methi', en: 'Fenugreek Seeds', hex: '#C4A35A', hex2: '#D8BC78', grain: '#A88840', form: 'seeds' },
  { id: 'mustard', name: 'Rai', en: 'Mustard Seeds', hex: '#E8B923', hex2: '#F5D04A', grain: '#C49A18', form: 'round-seeds' },
  { id: 'garam', name: 'Garam Masala', en: 'House Blend', hex: '#B33A2B', hex2: '#D4A017', grain: '#8B4513', form: 'blend' },
  { id: 'chai', name: 'Chai Masala', en: 'Tea Spice Blend', hex: '#8B4513', hex2: '#C45C26', grain: '#6B7A3A', form: 'blend' },
]

function formArt(p) {
  if (p.form === 'powder') {
    return `
      <ellipse cx="320" cy="470" rx="230" ry="70" fill="${p.grain}" opacity="0.9"/>
      <path d="M120 430 Q320 220 520 430 Q320 520 120 430Z" fill="${p.hex}"/>
      <path d="M170 410 Q320 260 470 410 Q320 480 170 410Z" fill="${p.hex2}" opacity="0.9"/>
      <path d="M220 400 Q320 300 420 400 Q320 450 220 400Z" fill="${p.hex}" opacity="0.75"/>
    `
  }
  if (p.form === 'pods') {
    // cardamom pods — oval pointed
    return Array.from({ length: 18 }, (_, i) => {
      const col = i % 6
      const row = Math.floor(i / 6)
      const x = 160 + col * 55 + (row % 2) * 20
      const y = 340 + row * 70
      const rot = -25 + (i % 5) * 12
      return `<g transform="translate(${x} ${y}) rotate(${rot})">
        <ellipse cx="0" cy="0" rx="28" ry="14" fill="${p.hex2}"/>
        <ellipse cx="-4" cy="-2" rx="18" ry="8" fill="${p.hex}" opacity="0.7"/>
        <ellipse cx="18" cy="0" rx="6" ry="4" fill="${p.grain}"/>
      </g>`
    }).join('\n')
  }
  if (p.form === 'threads') {
    // saffron threads
    return Array.from({ length: 40 }, (_, i) => {
      const x = 160 + (i % 10) * 32
      const y = 320 + Math.floor(i / 10) * 55 + (i % 3) * 8
      const len = 36 + (i % 5) * 6
      const rot = -40 + (i % 7) * 14
      return `<g transform="translate(${x} ${y}) rotate(${rot})">
        <path d="M0 0 Q4 ${len / 2} 1 ${len}" stroke="${i % 2 ? p.hex2 : p.hex}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <circle cx="0" cy="0" r="3" fill="${p.hex2}"/>
      </g>`
    }).join('\n')
  }
  if (p.form === 'seeds') {
    // elongated cumin/fenugreek style
    return Array.from({ length: 55 }, (_, i) => {
      const x = 140 + ((i * 47) % 340)
      const y = 310 + ((i * 31) % 200)
      const rot = (i * 23) % 180
      return `<ellipse cx="${x}" cy="${y}" rx="14" ry="5" transform="rotate(${rot} ${x} ${y})" fill="${i % 3 ? p.hex : p.hex2}"/>`
    }).join('\n')
  }
  if (p.form === 'round-seeds') {
    return Array.from({ length: 70 }, (_, i) => {
      const x = 145 + ((i * 53) % 350)
      const y = 310 + ((i * 37) % 200)
      const r = 5 + (i % 4)
      return `<circle cx="${x}" cy="${y}" r="${r}" fill="${i % 2 ? p.hex : p.hex2}"/>`
    }).join('\n')
  }
  if (p.form === 'quills') {
    return Array.from({ length: 7 }, (_, i) => {
      const x = 150 + i * 55
      const y = 300 + (i % 2) * 30
      return `<g transform="translate(${x} ${y})">
        <rect x="0" y="0" width="36" height="220" rx="10" fill="${p.hex}"/>
        <rect x="6" y="10" width="10" height="200" rx="4" fill="${p.hex2}" opacity="0.5"/>
        <rect x="20" y="20" width="8" height="180" rx="3" fill="${p.grain}" opacity="0.45"/>
      </g>`
    }).join('\n')
  }
  // blend — multi pigment mounds
  return `
    <ellipse cx="220" cy="420" rx="110" ry="95" fill="${p.hex}"/>
    <ellipse cx="360" cy="400" rx="120" ry="100" fill="${p.hex2}"/>
    <ellipse cx="290" cy="360" rx="90" ry="75" fill="${p.grain}"/>
    <ellipse cx="320" cy="470" rx="200" ry="55" fill="${p.grain}" opacity="0.5"/>
  `
}

function svgFor(p, variant = 'card') {
  const detail = variant === 'detail'
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="800" viewBox="0 0 640 800">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${detail ? '#241810' : '#1A120B'}"/>
      <stop offset="100%" stop-color="#120C08"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="45%" r="50%">
      <stop offset="0%" stop-color="${p.hex}" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="${p.hex}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="640" height="800" fill="url(#bg)"/>
  <rect width="640" height="800" fill="url(#glow)"/>
  <rect x="0" y="0" width="16" height="800" fill="${p.hex}"/>
  <rect x="16" y="0" width="8" height="800" fill="${p.hex2}" opacity="0.75"/>
  <text x="44" y="64" fill="#D4A017" font-family="Georgia, 'Times New Roman', serif" font-size="13" letter-spacing="3.5">SPICEWALA · PIGMENT LOT</text>
  <text x="44" y="118" fill="#F3E8D8" font-family="Georgia, 'Times New Roman', serif" font-size="44" font-weight="700">${p.name}</text>
  <text x="44" y="154" fill="#C4B09A" font-family="Arial, Helvetica, sans-serif" font-size="17">${p.en}</text>
  <rect x="44" y="180" width="48" height="48" fill="${p.hex}"/>
  <rect x="100" y="180" width="48" height="48" fill="${p.hex2}"/>
  <rect x="156" y="180" width="48" height="48" fill="${p.grain}"/>
  <g transform="${detail ? 'translate(0 20)' : ''}">
    ${formArt(p)}
  </g>
  <text x="44" y="770" fill="#8A7664" font-family="Consolas, 'Courier New', monospace" font-size="12" letter-spacing="2">${p.hex.toUpperCase()} · ${p.form.toUpperCase()}</text>
</svg>`
}

for (const p of products) {
  fs.writeFileSync(path.join(outDir, `${p.id}.svg`), svgFor(p, 'card'))
  fs.writeFileSync(path.join(outDir, `${p.id}-detail.svg`), svgFor(p, 'detail'))
  console.log('wrote', p.id)
}
console.log('Done')
