 Opción 1 — Imagen AI con fondo transparente (más rápido)

  Generás una imagen hiperrealista con IA, le quitas el fondo, y la usas
  como PNG en el hero con animación flotante (igual que jack-portfolio
  usa el retrato).

  Herramientas para generar la imagen:
  - Midjourney (mejor calidad) — prompt ejemplo:
  red safety work glove, industrial, product photography,
  studio lighting, white background, photorealistic, 8k,
  floating, brand color #CD0032
  - DALL-E 3 (via ChatGPT Plus) — más fácil de usar
  - Adobe Firefly — integrado con Photoshop, fondo transparente directo

  Para quitar el fondo:
  - https://remove.bg — automático, gratis
  - Adobe Photoshop con IA
  - Canva (https://canva.com) — background remover

  Resultado: PNG flotante con Framer Motion, se ve increíble y pesa poco.

  ---
  Opción 2 — Modelo 3D generado por IA (más impresionante)

  Generás un modelo GLB/GLTF real que carga directo en el R3F que ya
  tenemos.

  Herramientas:
  - Meshy.ai (https://meshy.ai) — el mejor actualmente, genera modelos 3D
   desde texto o imagen, exporta GLB
  - Tripo3D.ai (https://tripo3d.ai) — similar, muy buena calidad
  - CSM.ai (https://csm.ai) — convierte imagen → modelo 3D

  Prompt para Meshy:
  Red industrial safety glove, right hand,
  nitrile coated palm, knit back, rubber cuff

  Resultado: modelo real que rota interactivo en R3F, con texturas PBR.

  ---
  Opción 3 — Modelo 3D pre-hecho (más rápido si encuentras uno)

  - Sketchfab (https://sketchfab.com) — busca "work glove" o "safety
  glove", filtrar por free + downloadable
  - Free3D (https://free3d.com)

  ---
  Mi recomendación

  ┌───────────────────────┬───────────────────────────────────────┐
  │       Objetivo        │                Opción                 │
  ├───────────────────────┼───────────────────────────────────────┤
  │ Listo hoy, se ve pro  │ Midjourney + remove.bg → PNG flotante │
  ├───────────────────────┼───────────────────────────────────────┤
  │ Máximo impacto visual │ Meshy.ai → GLB en R3F                 │
  └───────────────────────┴───────────────────────────────────────┘

  El flujo ideal: generás en Meshy.ai con tu guante, lo exportás como
  GLB, y con 5 líneas de código lo cargo en el R3F que ya tenemos con
  useGLTF de drei — rotación, física y todo automático.

  ¿Tienes acceso a Midjourney o Meshy? ¿Quieres que preparemos el código
  para cargar el GLB cuando lo tengas listo?