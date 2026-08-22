// Genera public/images/og-handlove.png (1200x630) para Open Graph / Twitter Cards.
// Se ejecuta a mano (`npm run og:image`) y el PNG se versiona; NO forma parte del
// build de Netlify, que no tiene navegador instalado.

import { chromium } from '@playwright/test'
import { readFileSync, writeFileSync } from 'node:fs'

const logo = readFileSync('public/images/logo-white.png').toString('base64')

const html = `<!doctype html>
<html lang="es-MX">
  <head>
    <meta charset="utf-8" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,700;9..40,900&display=swap"
      rel="stylesheet"
    />
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        width: 1200px; height: 630px;
        background: #080403;
        font-family: 'DM Sans', system-ui, sans-serif;
        color: #FAFBFC;
        display: flex; flex-direction: column; justify-content: space-between;
        padding: 68px 76px;
        position: relative; overflow: hidden;
      }
      .bar { position: absolute; left: 0; top: 0; bottom: 0; width: 14px; background: #CD0032; }
      .spot {
        position: absolute; inset: 0;
        background: radial-gradient(ellipse 55% 60% at 78% 46%, rgba(205,0,50,0.34), transparent 70%);
      }
      .ghost {
        position: absolute; right: -90px; bottom: -140px;
        font-size: 300px; font-weight: 900; letter-spacing: -0.05em;
        color: transparent; -webkit-text-stroke: 2px rgba(250,251,252,0.07);
        line-height: 1; white-space: nowrap;
      }
      header, main, footer { position: relative; z-index: 1; }
      img { height: 52px; width: auto; display: block; }
      h1 {
        font-size: 92px; font-weight: 900; text-transform: uppercase;
        line-height: 0.92; letter-spacing: -0.03em; max-width: 900px;
      }
      h1 em { font-style: normal; color: #CD0032; }
      p.sub {
        margin-top: 26px; font-size: 30px; font-weight: 400;
        color: rgba(250,251,252,0.55); max-width: 760px; line-height: 1.3;
      }
      footer { display: flex; gap: 14px; flex-wrap: wrap; }
      span.tag {
        border: 1px solid rgba(250,251,252,0.22); border-radius: 999px;
        padding: 11px 24px; font-size: 21px; font-weight: 700;
        text-transform: uppercase; letter-spacing: 0.09em;
        color: rgba(250,251,252,0.75);
      }
    </style>
  </head>
  <body>
    <div class="bar"></div>
    <div class="spot"></div>
    <div class="ghost">HANDLOVE</div>

    <header><img src="data:image/png;base64,${logo}" alt="" /></header>

    <main>
      <h1>Guantes de<br /><em>seguridad</em> al<br />por mayor</h1>
      <p class="sub">Anticorte ANSI A3–A7, alta destreza y uso general. Fabricación propia en México.</p>
    </main>

    <footer>
      <span class="tag">ISO 9001</span>
      <span class="tag">EN388</span>
      <span class="tag">ANSI CUT</span>
      <span class="tag">13 modelos</span>
    </footer>
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
