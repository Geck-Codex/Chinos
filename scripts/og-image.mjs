// Genera public/images/og-handlove.png (1200x630) para Open Graph / Twitter Cards.
// Se ejecuta a mano (`npm run og:image`) y el PNG se versiona; NO forma parte del
// build de Netlify, que no tiene navegador instalado.

import { chromium } from '@playwright/test'
import { readFileSync, writeFileSync } from 'node:fs'

const mark = readFileSync('public/images/handlove.png').toString('base64')
const wordmark = readFileSync('public/images/logo-white.png').toString('base64')

const html = `<!doctype html>
<html lang="es-MX">
  <head>
    <meta charset="utf-8" />
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        width: 1200px; height: 630px;
        background: #080403;
        display: flex; align-items: center; justify-content: center;
        position: relative; overflow: hidden;
      }
      .bar { position: absolute; left: 0; top: 0; bottom: 0; width: 14px; background: #CD0032; }
      .spot {
        position: absolute; inset: 0;
        background: radial-gradient(ellipse 50% 55% at 50% 50%, rgba(205,0,50,0.26), transparent 70%);
      }
      .lockup { position: relative; z-index: 1; display: flex; align-items: center; gap: 34px; }
      /* handlove.png es pequeño (118x109): se escala poco para que no pixele. */
      .mark { width: 168px; height: auto; display: block; }
      .word { width: 470px; height: auto; display: block; }
    </style>
  </head>
  <body>
    <div class="bar"></div>
    <div class="spot"></div>
    <div class="lockup">
      <img class="mark" src="data:image/png;base64,${mark}" alt="" />
      <img class="word" src="data:image/png;base64,${wordmark}" alt="" />
    </div>
  </body>
</html>`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
await page.setContent(html, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
const buffer = await page.screenshot({ type: 'png' })
await browser.close()

writeFileSync('public/images/og-handlove.png', buffer)
console.log(`  ok public/images/og-handlove.png (${(buffer.length / 1024).toFixed(0)} KB)`)
