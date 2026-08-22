// Avisa a Bing (y a Yandex, Seznam y demas buscadores del consorcio IndexNow)
// de que las URLs del sitemap cambiaron, para que las re-rastreen en horas en
// vez de esperar semanas. Google NO usa IndexNow: alli hay que enviar el sitemap
// desde Search Console.
//
// Importa porque Bing es lo que alimenta las respuestas de ChatGPT.
//
// Uso: npm run indexnow   (despues de publicar, no en el build)

import { readFileSync, readdirSync } from 'node:fs'

const SITE_URL = readFileSync('src/seo/config.ts', 'utf8').match(
  /export const SITE_URL = '([^']+)'/,
)[1]
const host = new URL(SITE_URL).host

// La key es el nombre del archivo .txt de 32 caracteres que vive en public/.
const keyFile = readdirSync('public').find((f) => /^[0-9a-f]{32}\.txt$/.test(f))
if (!keyFile) throw new Error('indexnow: no encuentro el archivo de key en public/')
const key = keyFile.replace('.txt', '')

const sitemap = readFileSync('dist/sitemap.xml', 'utf8')
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
if (urlList.length === 0) throw new Error('indexnow: sitemap vacio, corre npm run build antes')

const res = await fetch('https://api.indexnow.org/IndexNow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host,
    key,
    keyLocation: `${SITE_URL}/${keyFile}`,
    urlList,
  }),
})

console.log(`IndexNow -> ${res.status} ${res.statusText} (${urlList.length} URLs enviadas)`)
if (res.status === 403) {
  console.log(`Revisa que ${SITE_URL}/${keyFile} responda con el contenido "${key}".`)
}
