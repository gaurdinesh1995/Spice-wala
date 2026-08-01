import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const src = 'C:/Users/DINESH GAUR/AppData/Local/Temp/spice-real'
const out = path.join(__dirname, '..', 'public', 'images', 'products')
fs.mkdirSync(out, { recursive: true })

// Clear old SVG artwork
for (const f of fs.readdirSync(out)) {
  if (f.endsWith('.svg')) fs.unlinkSync(path.join(out, f))
}

const map = {
  'turmeric-1.jpg': '4198933.jpg',
  'turmeric-2.jpg': '27730605.jpg',
  'turmeric-3.jpg': '678414.jpg',
  'chili-1.jpg': '33440718.jpg',
  'chili-2.jpg': '33440713.jpg',
  'chili-3.jpg': '16601542.jpg',
  'cardamom-1.jpg': '37568646.jpg',
  'cardamom-2.jpg': '2802527.jpg',
  'saffron-1.jpg': 'saffron2.jpg',
  'saffron-2.jpg': 'saffron1.jpg',
  'cumin-1.jpg': 'cumin-wm2.jpg',
  'cumin-2.jpg': 'cumin-wm3.jpg',
  'coriander-1.jpg': 'coriander-wm.jpg',
  'coriander-2.jpg': '7263626.jpg',
  'pepper-1.jpg': '31717561.jpg',
  'pepper-2.jpg': '2802527.jpg',
  'cinnamon-1.jpg': '5060299.jpg',
  'cinnamon-2.jpg': '6086352.jpg',
  'fenugreek-1.jpg': 'fenugreek-b.jpg',
  'fenugreek-2.jpg': 'fenugreek-c.jpg',
  'mustard-1.jpg': 'mustard-black.jpg',
  'mustard-2.jpg': 'mustard-mult.jpg',
  'garam-1.jpg': '5740453.jpg',
  'garam-2.jpg': '33694443.jpg',
  'chai-1.jpg': '1340116.jpg',
  'chai-2.jpg': '2802527.jpg',
}

async function run() {
  for (const [dest, source] of Object.entries(map)) {
    const from = path.join(src, source)
    if (!fs.existsSync(from)) {
      console.error('MISSING', source)
      continue
    }
    const to = path.join(out, dest)
    await sharp(from)
      .rotate()
      .resize(1000, 1250, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(to)
    console.log('OK', dest, fs.statSync(to).size)
  }
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
