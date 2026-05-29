# Chinos — Handlove Mexico Landing Page

## Objetivo del proyecto

Landing page de venta para **Handlove Mexico**, marca de guantes. El objetivo es una página de alto impacto visual que muestre el catálogo, transmita la identidad de marca y convierta visitantes en compradores.

## Estructura del repo

```
C:\Web\chinos\
├── jack-portfolio/       # Proyecto de referencia (NO es el producto final)
│                          # Úsalo para inspiración de estructura, animaciones y estilo
└── handlove-landing/     # Proyecto real — landing de Handlove Mexico
```

## Proyecto de referencia: jack-portfolio

Stack y patrones que DEBE seguir el proyecto real:

| Herramienta       | Versión    | Notas                          |
|-------------------|------------|--------------------------------|
| React             | 19         |                                |
| TypeScript        | ~6.0       |                                |
| Vite              | ^8         |                                |
| Tailwind CSS      | ^3.4       |                                |
| Framer Motion     | ^12        | Animaciones scroll y fade-in   |
| Lucide React      | ^1.16      | Iconos                         |
| PostCSS           | ^8.5       |                                |

### Paleta base (dark theme)

```
Background : #0c0c0c
Text/Border: #D7E2EA
Gradiente heading: linear-gradient(180deg, #646973 0%, #bbccd7 100%)
```

### Tipografía

- Familia: **Kanit** (Google Fonts, sans-serif)
- Headings: `font-black uppercase tracking-tight` con `font-size: clamp()`
- Labels: `uppercase tracking-wider font-medium opacity-60`

### Estructura de código

```
src/
├── assets/            # Imágenes y SVGs
├── components/        # Componentes reutilizables (animaciones, botones, etc.)
│   ├── FadeIn.tsx     # Wrapper de fade-in con Framer Motion
│   ├── Magnet.tsx     # Efecto magnético en hover
│   └── ...
└── sections/          # Secciones de página (una por bloque visual)
    ├── HeroSection.tsx
    ├── MarqueeSection.tsx
    └── ...
```

### Patrones de animación establecidos

- `FadeIn` wrapper para entradas al hacer scroll
- `useScroll` + `useTransform` para efectos de paralaje y sticky cards
- Función `fadeProps(delay, y, x)` para entradas con `framer-motion`
- Efecto `Magnet` en elementos interactivos

## Secciones planeadas para handlove-landing

1. **HeroSection** — Impacto visual, nombre de marca, CTA principal
2. **MarqueeSection** — Ticker con palabras clave / ventajas del producto
3. **ProductsSection** — Catálogo de guantes (tarjetas con scroll sticky como en jack-portfolio)
4. **FeaturesSection** — Materiales, durabilidad, certificaciones (de las fichas técnicas)
5. **TestimonialsSection** — Social proof
6. **ContactSection** — Formulario o WhatsApp CTA

## Comandos

```bash
# Desde la carpeta del proyecto
npm run dev        # Servidor de desarrollo
npm run build      # Build de producción (tsc + vite build)
npm run preview    # Preview del build
npm run lint       # ESLint
```

## Convenciones de código

- Todos los componentes en PascalCase exportados con `export function`
- Tailwind para layout y spacing; `style={}` solo para valores dinámicos o que escapan a Tailwind
- `clamp()` para tamaños de texto responsivos
- No crear helpers ni abstracciones que no existan en jack-portfolio a menos que sean estrictamente necesarios
- Sin comentarios innecesarios; los nombres de las funciones y variables deben ser autoexplicativos

## Recursos de marca

- `FICHAS TECNICAS HANDLOVE MEXICO (1).pdf` — Especificaciones técnicas de los productos
