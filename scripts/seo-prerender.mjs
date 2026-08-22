// Post-build: genera un HTML por ruta con sus metas, su canonical, su JSON-LD y
// un bloque de contenido estatico dentro de #root.
//
// Por que: el sitio es una SPA. El HTML que sirve Netlify es <div id="root"></div>,
// asi que los rastreadores que no ejecutan JS (GPTBot, PerplexityBot, ClaudeBot,
// Facebook, WhatsApp, LinkedIn, Bing) no ven ni contenido ni las metas por ruta.
// React monta con createRoot, que vacia #root al montar: el bloque estatico solo
// lo ven los rastreadores y los usuarios sin JS.
//
// Tambien regenera sitemap.xml (con lastmod) y llms.txt.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const DIST = 'dist'
const SITE_URL = readFileSync('src/seo/config.ts', 'utf8').match(
  /export const SITE_URL = '([^']+)'/,
)[1]

const esc = (t) =>
  t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Los productos se leen del propio codigo para que no se desincronicen.
function readProducts() {
  const src = readFileSync('src/data/products.ts', 'utf8')
  const block = src.slice(src.indexOf('export const ALL_PRODUCTS = ['))
  const re =
    /id: '([^']+)', num: '([^']+)', line: '([^']+)',\s*\n\s*name: '([^']+)', category: '([^']+)',\s*\n\s*image: '([^']+)',\s*\n\s*description: '([^']+)'/g
  const products = []
  let m
  while ((m = re.exec(block))) {
    products.push({
      id: m[1], num: m[2], line: m[3],
      name: m[4], category: m[5], image: m[6], description: m[7],
    })
  }
  if (products.length === 0) throw new Error('seo-prerender: no se pudo leer ALL_PRODUCTS')
  return products
}

const PRODUCTS = readProducts()

// Contenido de las fichas tecnicas (PDF 2026.1). Es JSON justamente para que
// este script pueda leerlo sin interpretar TypeScript.
const CONTENT = JSON.parse(readFileSync('src/data/products.content.json', 'utf8'))
const CARE = CONTENT._care

for (const p of PRODUCTS) {
  p.content = CONTENT[p.id]
  if (!p.content) throw new Error(`seo-prerender: falta contenido de ficha para "${p.id}"`)
}

const ROUTES = [
  {
    path: '/',
    dir: '',
    title: 'Guantes de seguridad al por mayor | Handlove Mexico',
    description:
      'Guantes de seguridad industriales al por mayor: anticorte ANSI A3–A7, alta destreza y uso general. ISO 9001, personalización y entrega puntual en México.',
    changefreq: 'weekly',
    priority: '1.0',
    body: `
      <h1>Guantes de seguridad industriales al por mayor en México — Handlove Mexico</h1>
      <p>Handlove Mexico fabrica y distribuye guantes de seguridad industriales al por mayor en
      México, con más de 20 años de experiencia y certificación ISO 9001. Atendemos pedidos en
      volumen y personalizados desde Chihuahua para todo el país.</p>
      <h2>Líneas de producto</h2>
      <ul>
        <li><strong>Edge</strong> — guantes anticorte en HPPE calibre 13, niveles ANSI A3 a A7 y certificación EN388.</li>
        <li><strong>Dexterity</strong> — guantes de alta destreza y agarre en poliéster calibre 15 y nylon calibre 18.</li>
        <li><strong>Lite PU</strong> — guantes de uso general en poliéster con recubrimiento de poliuretano, EN388 3131.</li>
        <li><strong>Lite Basic</strong> — guantes de protección básica sin recubrimiento, en algodón y nylon.</li>
      </ul>
      <h2>Industrias que atendemos</h2>
      <p>Construcción, fabricación, industria química, automotriz, minería, logística y electrónica.</p>
      <h2>Contacto</h2>
      <p>Teléfono de ventas: +52 614 688 8300 (solo llamadas). Correo: contacto.mexico@handloves.com.
      Cotizaciones al por mayor para toda la República Mexicana.</p>
      <p><a href="/productos/">Ver el catálogo completo de guantes</a> ·
      <a href="/nosotros/">Conocer a Handlove Mexico</a></p>`,
  },
  {
    path: '/productos',
    dir: 'productos',
    title: 'Catálogo de guantes de seguridad | Handlove Mexico',
    description:
      '13 modelos de guantes de seguridad: anticorte Edge (ANSI A3–A7, EN388), alta destreza Dexterity y uso general Lite. Cotiza al por mayor en México.',
    changefreq: 'weekly',
    priority: '0.9',
    body: `
      <h1>Catálogo de guantes de seguridad industriales — 13 modelos Handlove Mexico</h1>
      <p>Catálogo completo de guantes de seguridad Handlove Mexico: 13 modelos repartidos en cuatro
      familias, todos fabricados bajo certificación ISO 9001 y disponibles en tallas #7 a #10.
      Solicita cotización al por mayor.</p>
      ${PRODUCTS.map(
        (p) => `<article>
        <h2><a href="/productos/${p.id}/">${esc(p.name)}</a></h2>
        <p><strong>Categoría:</strong> ${esc(p.category)}</p>
        <p>${esc(p.description)}</p>
        <p><a href="/productos/${p.id}/">Ver ficha completa de ${esc(p.name)}</a></p>
      </article>`,
      ).join('\n      ')}
      <p><a href="/">Inicio</a> · <a href="/nosotros/">Sobre Handlove Mexico</a></p>`,
  },
  {
    path: '/nosotros',
    dir: 'nosotros',
    title: 'Fabricante de guantes de seguridad | Handlove Mexico',
    description:
      '22 años fabricando guantes de seguridad industriales para 15+ mercados. Planta de 30.000 m², certificación ISO 9001 y control de calidad integral.',
    changefreq: 'monthly',
    priority: '0.7',
    body: `
      <h1>Fabricante de guantes de seguridad industriales en México — Handlove Mexico</h1>
      <p>Handlove Mexico es la operación mexicana de Handlove, fabricante de guantes de seguridad
      industriales desde 2002. Más de 20 años de experiencia, presencia en más de 15 mercados
      internacionales e instalaciones de 30.000 m² con certificación ISO 9001.</p>
      <h2>Control de calidad</h2>
      <p>Cada lote pasa por control de calidad integral: verificación de materia prima, pruebas de
      resistencia al corte según ANSI/ISEA 105 y EN388, e inspección final antes del embarque.</p>
      <h2>Contacto</h2>
      <p>Teléfono: +52 614 688 8300 · Correo: contacto.mexico@handloves.com · Chihuahua, México.</p>
      <p><a href="/productos/">Ver catálogo de guantes</a> · <a href="/">Inicio</a></p>`,
  },
]

// Una ruta por producto: /productos/<id>. Son 13 URLs indexables mas, cada una
// con su schema Product propio y enlaces a los demas modelos de su linea.
for (const p of PRODUCTS) {
  const related = PRODUCTS.filter((r) => r.line === p.line && r.id !== p.id)
  const c = p.content
  ROUTES.push({
    path: `/productos/${p.id}`,
    dir: `productos/${p.id}`,
    product: p,
    title: `${p.name} — ${p.category} | Handlove Mexico`.slice(0, 65),
    description: `${p.name}: ${p.content.tagline}`.slice(0, 155),
    changefreq: 'monthly',
    priority: '0.8',
    body: `
      <nav><a href="/">Inicio</a> · <a href="/productos/">Catálogo</a> · ${esc(p.name)}</nav>
      <h1>${esc(p.name)} — ${esc(p.category)}</h1>
      <p><strong>Línea ${esc(p.line)}.</strong> ${esc(c.tagline)}</p>

      <h2>Descripción general</h2>
      <p>${esc(c.overview)}</p>

      <h2>Usos recomendados</h2>
      <ul>${c.uses.map((u) => `<li>${esc(u)}</li>`).join('')}</ul>

      <h2>Industrias</h2>
      <p>${c.industries.map(esc).join(', ')}.</p>

      <h2>Certificaciones y niveles</h2>
      <ul>${c.certifications.map((x) => `<li>${esc(x.label)}: ${esc(x.value)}</li>`).join('')}</ul>

      <h2>Material y presentación</h2>
      <ul>
        <li>Material: ${esc(c.material)}</li>
        <li>Color: ${esc(c.color)}</li>
        <li>Puño: ${esc(c.cuff)}</li>
        <li>Tallas disponibles: ${esc(c.sizes)}</li>
      </ul>

      <h2>Limitaciones y cuidado</h2>
      <ul>${[...c.limitations, ...CARE].map((x) => `<li>${esc(x)}</li>`).join('')}</ul>

      <h2>Cotizar ${esc(p.name)}</h2>
      <p>Venta al por mayor en México. Teléfono +52 614 688 8300 (solo llamadas) o
      contacto.mexico@handloves.com. Fabricado bajo sistema de gestión de calidad ISO 9001.</p>
      ${
        related.length
          ? `<h2>Más de la línea ${esc(p.line)}</h2>
      <ul>${related
        .map((r) => `<li><a href="/productos/${r.id}/">${esc(r.name)} — ${esc(r.category)}</a></li>`)
        .join('')}</ul>`
          : ''
      }
      <p><a href="/productos/">Ver el catálogo completo de guantes de seguridad</a></p>`,
  })
}

function routeJsonLd(route, canonical) {
  const breadcrumb = (name) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name, item: canonical },
    ],
  })

  if (route.path === '/') {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: [
        [
          '¿Sus guantes están en stock o son hechos a medida?',
          'Ofrecemos soluciones tanto en stock como a medida, lo que le permite elegir entre nuestra amplia gama o adaptarlas a sus necesidades específicas.',
        ],
        [
          '¿Cuál es la cantidad mínima de pedido (MOQ)?',
          'El MOQ varía según el tipo de guante y el nivel de personalización. Contáctanos para obtener información específica para tu pedido.',
        ],
        [
          '¿Cuál es el plazo de entrega de los pedidos?',
          'Los plazos de entrega dependen del volumen y la personalización requerida. Consulta con nuestro equipo para conocer los tiempos exactos para tu caso.',
        ],
        [
          '¿Qué tipo de soporte postventa ofrecen?',
          'Ofrecemos soporte completo postventa: seguimiento de pedidos, atención a reclamaciones y asesoría técnica para garantizar tu satisfacción.',
        ],
      ].map(([name, text]) => ({
        '@type': 'Question',
        name,
        acceptedAnswer: { '@type': 'Answer', text },
      })),
    }
  }

  if (route.path === '/productos') {
    return [
      breadcrumb('Catálogo'),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Catálogo de guantes de seguridad Handlove Mexico',
        url: canonical,
        numberOfItems: PRODUCTS.length,
        itemListElement: PRODUCTS.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Product',
            name: p.name,
            category: p.category,
            description: p.description,
            image: `${SITE_URL}${p.image}`,
            brand: { '@type': 'Brand', name: 'Handlove Mexico' },
          },
        })),
      },
    ]
  }

  if (route.product) {
    const p = route.product
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Catálogo', item: `${SITE_URL}/productos/` },
          { '@type': 'ListItem', position: 3, name: p.name, item: canonical },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: p.name,
        description: p.content.overview,
        category: p.category,
        image: `${SITE_URL}${p.image}`,
        url: canonical,
        brand: { '@type': 'Brand', name: 'Handlove Mexico' },
        manufacturer: { '@id': `${SITE_URL}/#organization` },
        material: p.content.material,
        color: p.content.color,
        size: p.content.sizes,
        audience: p.content.industries.map((name) => ({
          '@type': 'Audience',
          audienceType: name,
        })),
        additionalProperty: p.content.certifications.map((x) => ({
          '@type': 'PropertyValue',
          name: x.label,
          value: x.value,
        })),
      },
    ]
  }

  return [
    breadcrumb('Nosotros'),
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      url: canonical,
      mainEntity: { '@id': `${SITE_URL}/#organization` },
    },
  ]
}

const template = readFileSync(join(DIST, 'index.html'), 'utf8')

function renderRoute(route) {
  // Netlify sirve cada ruta como carpeta: la URL real lleva barra final.
  // Sin ella devuelve un 301, y no se declara canonica una URL que redirige.
  const canonical = `${SITE_URL}${route.path.endsWith('/') ? route.path : `${route.path}/`}`
  let html = template

  const set = (pattern, replacement) => {
    if (!pattern.test(html)) throw new Error(`seo-prerender: patron no encontrado -> ${pattern}`)
    html = html.replace(pattern, replacement)
  }

  set(/<title>[^<]*<\/title>/, `<title>${esc(route.title)}</title>`)
  set(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${esc(route.description)}" />`,
  )
  set(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`)
  set(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${esc(route.title)}" />`,
  )
  set(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${esc(route.description)}" />`,
  )
  set(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonical}" />`)
  set(
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${esc(route.title)}" />`,
  )
  set(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${esc(route.description)}" />`,
  )

  const jsonLd = routeJsonLd(route, canonical)
  html = html.replace(
    '</head>',
    `  <script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n    </script>\n  </head>`,
  )

  if (!html.includes('<div id="root"></div>')) {
    throw new Error('seo-prerender: no se encontro <div id="root"></div>')
  }
  // data-seo-fallback lo oculta por CSS: solo lo leen los rastreadores sin JS.
  // React lo elimina del DOM al montar con createRoot.
  return html.replace(
    '<div id="root"></div>',
    `<div id="root"><div data-seo-fallback>${route.body}</div></div>`,
  )
}

for (const route of ROUTES) {
  const dir = join(DIST, route.dir)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), renderRoute(route), 'utf8')
  console.log(`  ok ${route.dir ? `/${route.dir}/` : '/'}index.html`)
}

// 404.html: Netlify lo sirve con status 404 real para cualquier ruta que no
// exista como archivo. Lleva noindex para que Google no lo indexe.
const notFound = template
  .replace(/<title>[^<]*<\/title>/, '<title>Página no encontrada | Handlove Mexico</title>')
  .replace(
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/>/,
    '<meta name="robots" content="noindex, follow" />',
  )
  .replace(/<link rel="canonical" href="[^"]*" \/>/, '')
  .replace(
    '<div id="root"></div>',
    `<div id="root"><div data-seo-fallback>
      <h1>Página no encontrada — Handlove Mexico</h1>
      <p>La dirección que abriste no existe o cambió de lugar.</p>
      <p><a href="/">Inicio</a> · <a href="/productos/">Catálogo de guantes de seguridad</a> ·
      <a href="/nosotros/">Sobre Handlove Mexico</a></p>
    </div></div>`,
  )
writeFileSync(join(DIST, '404.html'), notFound, 'utf8')
console.log('  ok 404.html')

const lastmod = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (r) => `  <url>
    <loc>${SITE_URL}${r.path.endsWith('/') ? r.path : `${r.path}/`}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
).join('\n')}
</urlset>
`
writeFileSync(join(DIST, 'sitemap.xml'), sitemap, 'utf8')
console.log('  ok sitemap.xml')

const llms = `# Handlove Mexico

> Fabricante y distribuidor de guantes de seguridad industriales al por mayor en México.
> Más de 20 años de experiencia, certificación ISO 9001, base de operaciones en Chihuahua
> y venta a toda la República Mexicana.

## Qué vendemos

Guantes de seguridad industriales en cuatro familias, 13 modelos, tallas #7 a #10 (M/L en algodón):

- **Edge** — guantes anticorte en HPPE calibre 13, niveles ANSI A3 a A7 y certificación EN388.
  Recubrimiento de poliuretano (línea Lite) o nitrilo arenoso (línea Plus, compatible con
  pantallas táctiles). El Edge Plus A7 es el de mayor protección del catálogo (EN388 4X42F).
- **Dexterity** — guantes de alta destreza y agarre, los más solicitados. Poliéster calibre 15
  con nitrilo liso o arenoso, y nylon calibre 18 con nitrilo microespumado.
- **Lite PU** — guantes de uso general en poliéster calibre 15 con poliuretano, EN388 3131,
  en gris, blanco y negro.
- **Lite Basic** — guantes de protección básica sin recubrimiento, en algodón (60 y 70 g) y
  nylon calibre 13, para almacén y logística.

## Industrias que atendemos

Automotriz, metalmecánica, aeroespacial, electrónica, construcción, industria química,
minería y logística.

## Cómo comprar

Venta al por mayor con posibilidad de personalización. La cantidad mínima de pedido (MOQ) y el
plazo de entrega dependen del modelo y del nivel de personalización; se cotizan caso por caso.

- Teléfono de ventas: +52 614 688 8300 (solo llamadas, no WhatsApp)
- Correo: contacto.mexico@handloves.com

## Páginas

- [Inicio](${SITE_URL}/): líneas de producto, características y preguntas frecuentes.
- [Catálogo](${SITE_URL}/productos/): los 13 modelos con especificaciones técnicas.
- [Nosotros](${SITE_URL}/nosotros/): historia, planta de 30.000 m² y control de calidad.

### Ficha de cada modelo

${PRODUCTS.map((p) => `- [${p.name}](${SITE_URL}/productos/${p.id}/) — ${p.category} (línea ${p.line}): ${p.description}`).join('\n')}
`
writeFileSync(join(DIST, 'llms.txt'), llms, 'utf8')
console.log('  ok llms.txt')
