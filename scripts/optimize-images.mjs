// Convierte las fotos de producto de PNG a WebP conservando transparencia.
//
//   images-src/products/*.png  (fuente, NO se despliega)
//        -> public/images/products/*.webp  (lo que se sirve)
//
// Mismo patron que models-src/ para los .glb originales.
//
// Se ejecuta a mano (`npm run optimize:images`) y los .webp se versionan; NO
// forma parte del build de Netlify, que no tiene navegador.
//
// Por que: las 13 fotos sumaban 4,4 MB en PNG y son el grueso del peso del
// catalogo. Una de ellas (litepublack) venia ademas a 1024x1024 cuando las otras
// son 433x577, pesando ella sola 1,4 MB.

import { chromium } from '@playwright/test'
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const SOURCE_DIR = 'images-src/products'
const OUT_DIR = 'public/images/products'
const QUALITY = 0.86
const MAX_WIDTH = 600 // el display real nunca pasa de ~500 px de ancho

const files = readdirSync(SOURCE_DIR).filter((f) => f.endsWith('.png'))

const browser = await chromium.launch()
const page = await browser.newPage()

let before = 0
let after = 0

for (const file of files) {
  const source = join(SOURCE_DIR, file)
  const target = join(OUT_DIR, file.replace(/\.png$/, '.webp'))
  const base64 = readFileSync(source).toString('base64')

  const dataUrl = await page.evaluate(
    async ([b64, quality, maxWidth]) => {
      const img = new Image()
      img.src = `data:image/png;base64,${b64}`
      await img.decode()

      const scale = Math.min(1, maxWidth / img.naturalWidth)
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(img.naturalWidth * scale)
      canvas.height = Math.round(img.naturalHeight * scale)

      const ctx = canvas.getContext('2d')
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      return canvas.toDataURL('image/webp', quality)
    },
    [base64, QUALITY, MAX_WIDTH],
  )

  const buffer = Buffer.from(dataUrl.split(',')[1], 'base64')
  writeFileSync(target, buffer)

  const originalSize = statSync(source).size
  before += originalSize
  after += buffer.length
  const saved = Math.round((1 - buffer.length / originalSize) * 100)
  console.log(
    `  ${file.padEnd(24)} ${String(Math.round(originalSize / 1024)).padStart(5)} KB -> ` +
      `${String(Math.round(buffer.length / 1024)).padStart(4)} KB  (-${saved}%)`,
  )
}

await browser.close()

console.log(
  `\n  TOTAL  ${Math.round(before / 1024)} KB -> ${Math.round(after / 1024)} KB ` +
    `(-${Math.round((1 - after / before) * 100)}%)`,
)
