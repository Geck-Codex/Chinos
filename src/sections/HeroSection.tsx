import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { motion } from 'framer-motion'
import { GloveModel } from '../components/GloveModel'

function fade(delay: number, y = 30) {
  return {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.72, delay, ease: [0.25, 0.1, 0.25, 1] as const },
  }
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [canvasActive, setCanvasActive] = useState(true)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setCanvasActive(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-[76px]"
      style={{ backgroundColor: '#080403' }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: '#CD0032' }} />

      <div className="relative z-10 flex flex-col lg:flex-row w-full items-center px-8 md:px-16 py-16 gap-8">

        {/* ── Left: copy ── */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl">
          <motion.p
            {...fade(0.15)}
            className="uppercase tracking-[0.3em] font-semibold mb-5"
            style={{ color: '#CD0032', fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)' }}
          >
            Handlove Mexico
          </motion.p>

          <div className="overflow-hidden mb-6">
            <motion.h1
              {...fade(0.3, 50)}
              className="font-black uppercase leading-[0.9] tracking-tight"
              style={{ color: '#FAFBFC', fontSize: 'clamp(3.5rem, 8vw, 8.5rem)' }}
            >
              Seguridad<br />
              <span style={{ color: '#CD0032' }}>en cada</span><br />
              guante.
            </motion.h1>
          </div>

          <motion.p
            {...fade(0.48)}
            className="font-semibold uppercase tracking-wider mb-3"
            style={{ color: '#FAFBFC', opacity: 0.8, fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)' }}
          >
            Guantes de seguridad al por mayor para cada tarea.
          </motion.p>

          <motion.p
            {...fade(0.58)}
            className="font-light leading-relaxed max-w-[420px]"
            style={{ color: '#FAFBFC', opacity: 0.5, fontSize: 'clamp(1rem, 1.5vw, 1.2rem)' }}
          >
            ¡Guantes seguros, de calidad y protectores! Personaliza tus guantes,
            compra al por mayor a precios competitivos y te los entregaremos puntualmente.
          </motion.p>

          <motion.div {...fade(0.72)} className="flex gap-4 mt-9 flex-wrap">
            <a
              href="#productos"
              className="uppercase tracking-widest font-bold px-8 py-4"
              style={{ backgroundColor: '#CD0032', color: '#FAFBFC', fontSize: 'clamp(0.85rem, 1.2vw, 1rem)', borderRadius: '6px' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#a80029')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#CD0032')}
            >
              Ver productos
            </a>
            <a
              href="#mayoreo"
              className="uppercase tracking-widest font-bold px-8 py-4 border"
              style={{ borderColor: 'rgba(250,251,252,0.35)', color: '#FAFBFC', fontSize: 'clamp(0.85rem, 1.2vw, 1rem)', borderRadius: '6px' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FAFBFC'
                e.currentTarget.style.color = '#080403'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#FAFBFC'
              }}
            >
              Mayoreo
            </a>
          </motion.div>
        </div>

        {/* ── Right: 3D glove ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.3 }}
          className="flex-1 w-full"
          style={{ height: 'clamp(400px, 56vw, 700px)', minWidth: 0 }}
        >
          <Canvas
            camera={{ position: [0, 0.3, 5.2], fov: 42 }}
            dpr={[1, 1.5]}
            frameloop={canvasActive ? 'always' : 'never'}
            gl={{ alpha: true, antialias: true }}
            style={{ background: 'transparent' }}
          >
            <ambientLight intensity={0.22} />
            <directionalLight position={[3.5, 5, 3]} intensity={3} color="#FAFBFC" />
            <directionalLight position={[-3, -2, 1.5]} intensity={0.9} color="#CD0032" />
            <directionalLight position={[0, 3, -5]} intensity={0.6} color="#FAFBFC" />
            <pointLight position={[0, 5, 1]} intensity={25} color="#FAFBFC" />

            <Suspense fallback={null}>
              <GloveModel />
              <ContactShadows
                position={[0, -2.4, 0]}
                opacity={0.4}
                scale={6}
                blur={3}
                color="#CD0032"
              />
              <Environment preset="warehouse" />
            </Suspense>
          </Canvas>
        </motion.div>

      </div>
    </section>
  )
}
