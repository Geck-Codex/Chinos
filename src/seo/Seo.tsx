import { useEffect } from 'react'
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  OG_IMAGE,
  OG_IMAGE_ALT,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_TYPE,
  OG_IMAGE_WIDTH,
  SITE_LOCALE,
  SITE_NAME,
  absoluteUrl,
} from './config'

interface SeoProps {
  title?: string
  description?: string
  path?: string
  image?: string
  type?: 'website' | 'article' | 'product'
  noindex?: boolean
  jsonLd?: object | object[]
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image = OG_IMAGE,
  type = 'website',
  noindex = false,
  jsonLd,
}: SeoProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE
  const canonical = absoluteUrl(path)

  useEffect(() => {
    document.title = fullTitle
    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large')
    upsertLink('canonical', canonical)

    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:site_name', SITE_NAME)
    upsertMeta('property', 'og:locale', SITE_LOCALE)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:image', image)
    upsertMeta('property', 'og:image:width', OG_IMAGE_WIDTH)
    upsertMeta('property', 'og:image:height', OG_IMAGE_HEIGHT)
    upsertMeta('property', 'og:image:type', OG_IMAGE_TYPE)
    upsertMeta('property', 'og:image:alt', OG_IMAGE_ALT)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', image)
    upsertMeta('name', 'twitter:image:alt', OG_IMAGE_ALT)
  }, [fullTitle, description, canonical, image, type, noindex])

  useEffect(() => {
    if (!jsonLd) return
    // El prerender ya dejo un bloque data-seo="route" en el HTML estatico: se
    // retira para no publicar dos JSON-LD de la misma ruta al hidratar.
    document.head.querySelectorAll('script[data-seo="route"]').forEach((el) => el.remove())
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.seo = 'route'
    script.textContent = JSON.stringify(jsonLd)
    document.head.appendChild(script)
    return () => {
      script.remove()
    }
  }, [jsonLd])

  return null
}
