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

## Catálogo de productos (13 productos, 4 familias)

> Fuente: `FICHAS TECNICAS HANDLOVE MEXICO (1).pdf` — Todos son ISO 9001, fabricados en China por Handlove China. Tallas #7–#10 (o M/L en algodón).

### Familia EDGE — Anticorte (4 productos)
Línea de protección contra cortes. Material base: HPPE calibre 13.

| Modelo | Recubrimiento | Color | Nivel corte | Destacados |
|--------|--------------|-------|-------------|------------|
| EDGE LITE A3 | Poliuretano | Gris | ANSI A3 | Protección nitrilo entre pulgar e índice |
| EDGE LITE A4 | Poliuretano | Gris | ANSI A4 | Mayor nivel de protección en la línea Lite |
| EDGE PLUS A3 | Nitrilo arenoso | Gris | ANSI A3 | Compatible pantallas táctiles, agarre superior |
| EDGE PLUS A7 | Nitrilo arenoso | Azul | ANSI A7 / CE EN388 4X42F | El de mayor protección del catálogo, táctil |

### Familia DEXTERITY — Alta destreza / Agarre (3 productos) ⭐ LOS MÁS POPULARES
Línea para manipulación precisa y buen agarre. **Son los 3 productos destacados en el hero del catálogo (ProductsSection).**

| Modelo | Material base | Recubrimiento | Color | Industria principal |
|--------|--------------|--------------|-------|---------------------|
| DEXTERITY ULTRA GRIP | Poliéster cal.15 | Nitrilo liso | Rojo / puño negro | Automotriz, logística |
| DEXTERITY POLY SAND | Poliéster cal.15 | Nitrilo arenoso | Negro / puño Rojo | Automotriz, logística |
| DEXTERITY NANOFLEX | Nylon cal.18 | Nitrilo microespumado | Gris | Automotriz, electrónica |

### Familia LITE PU — Uso general (3 productos)
Mismo guante (poliéster 15, PU), tres colores. EN388: 3131.

| Modelo | Color |
|--------|-------|
| LITE PU Gris | Gris |
| LITE PU Blanco | Blanco |
| LITE PU Black | Negro |

### Familia LITE BASIC — Protección básica (3 productos)
Sin recubrimiento. Para uso general, almacén, logística.

| Modelo | Material | Peso/Calibre | Color |
|--------|----------|-------------|-------|
| LITE COTTON 60GR | Algodón | 60 g | Blanco |
| LITE COTTON 70GR | Algodón | 70 g | Gris |
| LITE NYLON 100 | Nylon | Cal. 13 | Blanco |

---

## Secciones planeadas para handlove-landing

1. **HeroSection** — Impacto visual, nombre de marca, CTA principal
2. **MarqueeSection** — Ticker con palabras clave / ventajas del producto
3. **ProductsSection** — Los 3 DEXTERITY van en el grid principal (tarjetas grandes, son los más populares). El resto del catálogo en carriles tipo Netflix por familia (EDGE, LITE PU, LITE BASIC) debajo.
4. **FeaturesSection** — Materiales, certificaciones (ISO 9001, ANSI, EN388), beneficios de la línea
5. **IndustriesSection** — Industrias que sirve: automotriz, metalmecánica, aeroespacial, logística, electrónica
6. **CTASection** — WhatsApp CTA o formulario de contacto

### Estructura de datos para ProductsSection
Cada tarjeta de producto debe mostrar:
- Nombre del modelo
- Familia / categoría
- Color del guante
- Nivel de protección principal (corte, agarre, destreza)
- Certificaciones (ANSI CUT / EN388)
- Industrias recomendadas (2–3 máximo)
- CTA: "Solicitar cotización" → WhatsApp

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
