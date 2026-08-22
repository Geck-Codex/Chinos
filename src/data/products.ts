import CONTENT from './products.content.json'

// Datos del catalogo. Viven aparte de la pagina porque los consumen tambien
// ProductPage (ficha individual), ProductsPage y el prerender de SEO.

export const LINE_THEME = {
  Dexterity: {
    bg: '#CD0032',
    fg: '#FFFFFF',
    label: '#FFD7DF',
    chipBg: 'rgba(255,255,255,0.14)',
    chipBorder: 'rgba(255,255,255,0.25)',
    chipText: 'rgba(255,255,255,0.78)',
    spotlight: 'transparent',
    ghost: 'rgba(255,255,255,0.1)',
    shadow: 'drop-shadow(0 18px 30px rgba(0,0,0,0.5))',
    accent: '#FFFFFF',
    icon: 'rgba(255,255,255,0.7)',
  },
  Edge: {
    bg: '#264a82',
    fg: '#FFFFFF',
    label: '#CDE0FF',
    chipBg: 'rgba(255,255,255,0.14)',
    chipBorder: 'rgba(255,255,255,0.25)',
    chipText: 'rgba(255,255,255,0.78)',
    spotlight: 'transparent',
    ghost: 'rgba(255,255,255,0.1)',
    shadow: 'drop-shadow(0 18px 30px rgba(0,0,0,0.5))',
    accent: '#7FA3DC',
    icon: 'rgba(255,255,255,0.7)',
  },
  Lite: {
    bg: '#EDF1F5',
    fg: '#15191F',
    label: '#CD0032',
    chipBg: 'rgba(20,25,32,0.06)',
    chipBorder: 'rgba(20,25,32,0.16)',
    chipText: 'rgba(20,25,32,0.62)',
    spotlight: 'transparent',
    ghost: 'rgba(20,25,32,0.06)',
    shadow: 'drop-shadow(0 16px 28px rgba(60,70,85,0.3))',
    accent: '#CD0032',
    icon: 'rgba(20,25,32,0.5)',
  },
}

export function themeForLine(line: string) {
  return LINE_THEME[line as keyof typeof LINE_THEME] ?? LINE_THEME.Dexterity
}

export const MODELS: Record<string, { url: string; tint?: string }> = {
  'ultra-grip':    { url: '/images/models/dexterityultra.glb' },
  'poly-sand':     { url: '/images/models/polysand.glb' },
  'nanoflex':      { url: '/images/models/nanoflex1.glb' },
  'edge-plus-a7':  { url: '/images/models/edgeplusa7.glb' },
  'edge-plus-a3':  { url: '/images/models/edgeplusa3.glb' },
  'edge-lite-a4':  { url: '/images/models/edgeliteaa4.glb' },
  'edge-lite-a3':  { url: '/images/models/edgelitea3.glb' },
  'lite-pu-gris':   { url: '/images/models/litepugris.glb' },
  'lite-pu-black':  { url: '/images/models/litepublack.glb' },
  'lite-pu-blanco': { url: '/images/models/litepublanco.glb' },
  'lite-cotton-60':{ url: '/images/models/litecotton60gr.glb' },
  'lite-cotton-70':{ url: '/images/models/litecotton70gr.glb' },
  'lite-nylon-100':{ url: '/images/models/litenylon100.glb' },
}

const preloaded = new Set<string>()
export function preloadModel(url?: string) {
  if (!url || preloaded.has(url)) return
  preloaded.add(url)
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'fetch'
  // crossOrigin es obligatorio para que el preload case con el fetch de
  // GLTFLoader; sin el, el .glb se descarga dos veces.
  link.crossOrigin = 'anonymous'
  link.href = url
  document.head.appendChild(link)
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const ALL_PRODUCTS = [
  {
    id: 'ultra-grip', num: '01', line: 'Dexterity',
    name: 'Dexterity Ultra Grip', category: 'Alta Destreza / Agarre',
    image: '/images/products/dexterityultra.webp',
    description: 'Guante de poliéster calibre 15 con palma recubierta de nitrilo liso. Agarre confiable y comodidad durante jornadas prolongadas para industria automotriz, logística y manufactura ligera.',
    primaryColor: '#CD0032', palmColor: '#8B001E', cuffColor: '#111111',
    accentColor: '#CD0032', accentGlow: 'rgba(205,0,50,0.22)',
    specs: [
      { label: 'Material', value: 'Poliéster' }, { label: 'Calibre', value: '15G' },
      { label: 'Recubrimiento', value: 'Nitrilo liso' }, { label: 'EN388', value: '4121' },
    ],
  },
  {
    id: 'poly-sand', num: '02', line: 'Dexterity',
    name: 'Dexterity Poly Sand', category: 'Agarre Superior',
    image: '/images/products/polysand.webp',
    description: 'Guante de poliéster calibre 15 con palma recubierta de nitrilo arenoso. Excelente agarre y alta destreza para ensamblaje, mantenimiento y manejo de herramientas manuales.',
    primaryColor: '#8B001E', palmColor: '#1a1a1a', cuffColor: '#CD0032',
    accentColor: '#8B001E', accentGlow: 'rgba(139,0,30,0.25)',
    specs: [
      { label: 'Material', value: 'Poliéster' }, { label: 'Calibre', value: '15G' },
      { label: 'Recubrimiento', value: 'Nitrilo arenoso' }, { label: 'EN388', value: '4121' },
    ],
  },
  {
    id: 'nanoflex', num: '03', line: 'Dexterity',
    name: 'Dexterity Nanoflex', category: 'Precisión Táctil',
    image: '/images/products/nanoflex.webp',
    description: 'Guante premium de nylon calibre 18 con palma recubierta de nitrilo microespumado. Máxima sensibilidad táctil y agarre confiable para electrónica, ensamblaje e inspección de calidad.',
    primaryColor: '#6B7A8D', palmColor: '#3D4A5C', cuffColor: '#252E3A',
    accentColor: '#5A6B7D', accentGlow: 'rgba(107,122,141,0.22)',
    specs: [
      { label: 'Material', value: 'Nylon' }, { label: 'Calibre', value: '18G' },
      { label: 'Recubrimiento', value: 'Nitrilo microespumado' }, { label: 'EN388', value: '4121' },
    ],
  },
  {
    id: 'edge-plus-a7', num: '04', line: 'Edge',
    name: 'Edge Plus A7', category: 'Anticorte Premium',
    image: '/images/products/edgeplusa7.webp',
    description: 'Anticorte de alto nivel con nitrilo arenoso en palma y compatibilidad táctil. Ideal para vidrio, aeroespacial y automotriz de alto riesgo.',
    primaryColor: '#1A3A6A', palmColor: '#0E2040', cuffColor: '#080C14',
    accentColor: '#1A3A6A', accentGlow: 'rgba(26,58,106,0.3)',
    specs: [
      { label: 'Material', value: 'HPPE' }, { label: 'Calibre', value: '13G' },
      { label: 'Recubrimiento', value: 'Nitrilo arenoso' }, { label: 'ANSI CUT', value: 'A7' },
    ],
  },
  {
    id: 'edge-plus-a3', num: '05', line: 'Edge',
    name: 'Edge Plus A3', category: 'Anticorte',
    image: '/images/products/egeplusa3.webp',
    description: 'Anticorte con nitrilo arenoso en palma y compatibilidad con pantallas táctiles para entornos metalmecánicos y automotrices.',
    primaryColor: '#2C4A7C', palmColor: '#1A3054', cuffColor: '#0A0E18',
    accentColor: '#2C4A7C', accentGlow: 'rgba(44,74,124,0.28)',
    specs: [
      { label: 'Material', value: 'HPPE' }, { label: 'Calibre', value: '13G' },
      { label: 'Recubrimiento', value: 'Nitrilo arenoso' }, { label: 'ANSI CUT', value: 'A3' },
    ],
  },
  {
    id: 'edge-lite-a4', num: '06', line: 'Edge',
    name: 'Edge Lite A4', category: 'Anticorte Ligero',
    image: '/images/products/edgelitea4.webp',
    description: 'Anticorte ligero con recubrimiento de poliuretano. Buena comodidad y movilidad para manipulación de piezas con bordes filosos.',
    primaryColor: '#2C4A7C', palmColor: '#1A3054', cuffColor: '#0A0E18',
    accentColor: '#2C4A7C', accentGlow: 'rgba(44,74,124,0.28)',
    specs: [
      { label: 'Material', value: 'HPPE' }, { label: 'Calibre', value: '13G' },
      { label: 'Recubrimiento', value: 'Poliuretano' }, { label: 'ANSI CUT', value: 'A4' },
    ],
  },
  {
    id: 'edge-lite-a3', num: '07', line: 'Edge',
    name: 'Edge Lite A3', category: 'Anticorte',
    image: '/images/products/edgelitea3.webp',
    description: 'Anticorte en calibre 13 para alta destreza, con recubrimiento de poliuretano y protección de nitrilo entre pulgar e índice.',
    primaryColor: '#2C4A7C', palmColor: '#1A3054', cuffColor: '#0A0E18',
    accentColor: '#2C4A7C', accentGlow: 'rgba(44,74,124,0.28)',
    specs: [
      { label: 'Material', value: 'HPPE' }, { label: 'Calibre', value: '13G' },
      { label: 'Recubrimiento', value: 'Poliuretano' }, { label: 'ANSI CUT', value: 'A3' },
    ],
  },
  {
    id: 'lite-pu-gris', num: '08', line: 'Lite',
    name: 'Lite PU Gris', category: 'Alta Destreza',
    image: '/images/products/litepugris.webp',
    description: 'Guante de poliéster calibre 15 con recubrimiento de poliuretano en tono gris. Ideal para ensamblaje, logística y manufactura ligera.',
    primaryColor: '#4A5568', palmColor: '#2D3748', cuffColor: '#1A202C',
    accentColor: '#4A5568', accentGlow: 'rgba(74,85,104,0.25)',
    specs: [
      { label: 'Material', value: 'Poliéster' }, { label: 'Calibre', value: '15G' },
      { label: 'Recubrimiento', value: 'Poliuretano' }, { label: 'EN388', value: '3131' },
    ],
  },
  {
    id: 'lite-pu-blanco', num: '09', line: 'Lite',
    name: 'Lite PU Blanco', category: 'Alta Destreza',
    image: '/images/products/litepublanco.webp',
    description: 'Guante de poliéster calibre 15 con recubrimiento de poliuretano en blanco. Óptimo para ensamblaje electrónico y ambientes de sala limpia.',
    primaryColor: '#718096', palmColor: '#4A5568', cuffColor: '#2D3748',
    accentColor: '#718096', accentGlow: 'rgba(113,128,150,0.22)',
    specs: [
      { label: 'Material', value: 'Poliéster' }, { label: 'Calibre', value: '15G' },
      { label: 'Recubrimiento', value: 'Poliuretano' }, { label: 'EN388', value: '3131' },
    ],
  },
  {
    id: 'lite-pu-black', num: '10', line: 'Lite',
    name: 'Lite PU Black', category: 'Alta Destreza',
    image: '/images/products/litepublack.webp',
    description: 'Versión negra del Lite PU. Diseñado para ambientes donde la suciedad es visible, como metalmecánica y automotriz.',
    primaryColor: '#2D3748', palmColor: '#1A202C', cuffColor: '#0D1117',
    accentColor: '#2D3748', accentGlow: 'rgba(45,55,72,0.3)',
    specs: [
      { label: 'Material', value: 'Poliéster' }, { label: 'Calibre', value: '15G' },
      { label: 'Recubrimiento', value: 'Poliuretano' }, { label: 'EN388', value: '3131' },
    ],
  },
  {
    id: 'lite-cotton-60', num: '11', line: 'Lite',
    name: 'Lite Cotton 60gr', category: 'Uso General',
    image: '/images/products/litecotton60gr.webp',
    description: 'Guante de algodón de 60 gramos sin recubrimiento. Comodidad y transpirabilidad para tareas generales de mantenimiento y logística.',
    primaryColor: '#7A6545', palmColor: '#5C4D36', cuffColor: '#3D3324',
    accentColor: '#7A6545', accentGlow: 'rgba(122,101,69,0.25)',
    specs: [
      { label: 'Material', value: 'Algodón' }, { label: 'Peso', value: '60g' },
      { label: 'Recubrimiento', value: 'Sin recubrimiento' }, { label: 'Certificación', value: 'ISO 9001' },
    ],
  },
  {
    id: 'lite-cotton-70', num: '12', line: 'Lite',
    name: 'Lite Cotton 70gr', category: 'Uso General',
    image: '/images/products/litecotton70gr.webp',
    description: 'Guante de algodón 70g con mayor resistencia al desgaste. Adecuado para jardinería, construcción ligera y logística.',
    primaryColor: '#6B5A3E', palmColor: '#4D4230', cuffColor: '#3D3324',
    accentColor: '#6B5A3E', accentGlow: 'rgba(107,90,62,0.25)',
    specs: [
      { label: 'Material', value: 'Algodón' }, { label: 'Peso', value: '70g' },
      { label: 'Recubrimiento', value: 'Sin recubrimiento' }, { label: 'Certificación', value: 'ISO 9001' },
    ],
  },
  {
    id: 'lite-nylon-100', num: '13', line: 'Lite',
    name: 'Lite Nylon 100', category: 'Precisión Táctil',
    image: '/images/products/litenylon100.webp',
    description: 'Guante de nylon calibre 13 sin recubrimiento. Alta destreza y sensibilidad táctil para inspección de calidad y ensamblaje fino.',
    primaryColor: '#3D6B4F', palmColor: '#2D5040', cuffColor: '#1D3328',
    accentColor: '#3D6B4F', accentGlow: 'rgba(61,107,79,0.25)',
    specs: [
      { label: 'Material', value: 'Nylon' }, { label: 'Calibre', value: '13G' },
      { label: 'Recubrimiento', value: 'Sin recubrimiento' }, { label: 'Certificación', value: 'ISO 9001' },
    ],
  },
]

export const LINES = [
  { key: 'Dexterity', label: 'Línea Dexterity', sub: 'Alta destreza y agarre para manufactura de precisión' },
  { key: 'Edge', label: 'Línea Edge', sub: 'Anticorte certificado ANSI / CE para industrias de alto riesgo' },
  { key: 'Lite', label: 'Línea Lite', sub: 'Destreza, uso general y protección básica para jornadas largas' },
]

export interface ProductContent {
  tagline: string
  overview: string
  material: string
  color: string
  cuff: string
  sizes: string
  certifications: { label: string; value: string }[]
  uses: string[]
  industries: string[]
  limitations: string[]
}

// Contenido de la ficha tecnica (PDF 2026.1), en products.content.json para que
// el prerender de SEO lo lea sin tener que interpretar TypeScript.
export const CARE_INSTRUCTIONS = CONTENT._care as string[]

export const contentFor = (id: string) =>
  (CONTENT as Record<string, unknown>)[id] as ProductContent | undefined

export type Product = (typeof ALL_PRODUCTS)[0]

export const productBySlug = (slug: string) => ALL_PRODUCTS.find((p) => p.id === slug)
