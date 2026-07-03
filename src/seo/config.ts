// ⚠️ ÚNICO lugar donde se define el dominio del sitio.
// Cuando tengas el dominio final, cambia SOLO esta línea y se actualizan
// canonical, Open Graph, sitemap.xml y todos los datos estructurados (JSON-LD).
export const SITE_URL = 'https://handslove.netlify.app'

export const SITE_NAME = 'Handlove Mexico'
export const SITE_PHONE = '+526146888300'
export const SITE_PHONE_DISPLAY = '+52 614 688 8300'
export const SITE_LOCALE = 'es_MX'
export const SITE_REGION = 'Chihuahua, México'

export const DEFAULT_TITLE =
  'Handlove Mexico — Guantes de seguridad industriales al por mayor'
export const DEFAULT_DESCRIPTION =
  'Fabricante de guantes de seguridad industriales al por mayor: líneas anticorte (ANSI A3–A7, EN388), alta destreza y uso general. Certificación ISO 9001, personalización y entrega puntual en México.'

// Imagen para redes sociales (Open Graph / Twitter). Debe ser una URL absoluta.
export const OG_IMAGE = `${SITE_URL}/images/handlove.png`

export const absoluteUrl = (path = '/') =>
  `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
