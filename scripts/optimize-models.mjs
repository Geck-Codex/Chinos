// Optimiza para web los modelos .glb que estén CRUDOS en public/images/models/.
// La fuente de verdad es SIEMPRE el archivo en public (el que tú dejas ahí).
// NUNCA regenera desde models-src; al contrario, refresca models-src con el nuevo
// original antes de optimizar. Los que ya están comprimidos (Draco) se omiten.
//
// Receta: simplificación de malla (meshoptimizer) + Draco + texturas webp 1024.
// El normal map conserva el detalle, así que reducir polígonos es imperceptible
// pero hace que el modelo gire fluido.
//
//  fuente / salida:  public/images/models/<nombre>.glb   (se optimiza in situ)
//  respaldo:         models-src/<nombre>.original.glb     (copia del crudo, gitignored)
//
// Uso:  npm run optimize:models

import { execSync } from 'node:child_process'
import { readdirSync, statSync, copyFileSync, existsSync, readFileSync, rmSync, renameSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const MODELS_DIR = 'public/images/models'
const BACKUP_DIR = 'models-src'
const TEXTURE_SIZE = 1024
const SIMPLIFY_RATIO = 0.1     // objetivo ~10% de vértices (≈ nivel del hero, fluido)
const SIMPLIFY_ERROR = 0.02    // tolerancia; imperceptible gracias al normal map
const DRACO_MARKER = 'KHR_draco_mesh_compression'

const mb = (bytes) => (bytes / 1048576).toFixed(2)

function isAlreadyOptimized(path) {
  // El bloque JSON del GLB (con extensionsUsed) está al inicio; leer 256 KB basta.
  return readFileSync(path).subarray(0, 262144).toString('latin1').includes(DRACO_MARKER)
}

function optimize(inPath, outPath) {
  execSync(
    `npx --no-install @gltf-transform/cli optimize "${inPath}" "${outPath}" ` +
      `--compress draco --texture-compress webp --texture-size ${TEXTURE_SIZE} ` +
      `--simplify-ratio ${SIMPLIFY_RATIO} --simplify-error ${SIMPLIFY_ERROR}`,
    { stdio: 'pipe' }
  )
}

if (!existsSync(BACKUP_DIR)) mkdirSync(BACKUP_DIR, { recursive: true })

const files = readdirSync(MODELS_DIR)
  .filter((f) => f.endsWith('.glb') && !f.endsWith('.original.glb'))
  .sort()

let processed = 0

for (const file of files) {
  const outPath = join(MODELS_DIR, file)

  if (isAlreadyOptimized(outPath)) {
    console.log(`• ${file.padEnd(24)} ya optimizado — se omite`)
    continue
  }

  // Archivo crudo = modelo nuevo. Es la fuente de verdad → refrescar el respaldo.
  const backup = join(BACKUP_DIR, file.replace(/\.glb$/, '.original.glb'))
  copyFileSync(outPath, backup)

  const before = statSync(outPath).size
  const tmp = `${outPath}.tmp.glb`
  try {
    optimize(backup, tmp)
  } catch (err) {
    console.error(`✗ ${file}: falló la optimización`)
    console.error(err.stderr?.toString() || err.message)
    if (existsSync(tmp)) rmSync(tmp)
    continue
  }

  const after = statSync(tmp).size
  rmSync(outPath)
  renameSync(tmp, outPath)
  processed++
  const pct = (100 * (1 - after / before)).toFixed(1)
  console.log(`✓ ${file.padEnd(24)} ${mb(before)} MB → ${mb(after)} MB  (−${pct}%)`)
}

console.log(`\nListo: ${processed} modelo(s) optimizado(s).`)
