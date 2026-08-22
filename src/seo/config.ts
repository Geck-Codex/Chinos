// ⚠️ ÚNICO lugar donde se define el dominio del sitio.
// Cuando tengas el dominio final, cambia SOLO esta línea y se actualizan
// canonical, Open Graph, sitemap.xml y todos los datos estructurados (JSON-LD).
export const SITE_URL = 'https://handloves.mx'

export const SITE_NAME = 'Handlove Mexico'
export const SITE_PHONE = '+526146888300'
export const SITE_PHONE_DISPLAY = '+52 614 688 8300'
export const SITE_LOCALE = 'es_MX'
export const SITE_REGION = 'Chihuahua, México'

export const DEFAULT_TITLE =
  'Guantes de seguridad al por mayor | Handlove Mexico'
export const DEFAULT_DESCRIPTION =
  'Guantes de seguridad industriales al por mayor: anticorte ANSI A3–A7, alta destreza y uso general. ISO 9001, personalización y entrega puntual en México.'

// Imagen para redes sociales (Open Graph / Twitter). Debe ser una URL absoluta.
// 1200×630 px — generada con `npm run og:image`.
export const OG_IMAGE = `${SITE_URL}/images/og-handlove.png`
export const OG_IMAGE_WIDTH = '1200'
export const OG_IMAGE_HEIGHT = '630'
export const OG_IMAGE_TYPE = 'image/png'
export const OG_IMAGE_ALT = 'Handlove Mexico — guantes de seguridad industriales'

export const absoluteUrl = (path = '/') =>
  `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
