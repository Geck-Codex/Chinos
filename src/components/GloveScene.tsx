import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, OrbitControls } from '@react-three/drei'
import { GloveModel } from './GloveModel'
import { GloveGLTF } from './GloveGLTF'
import { ErrorBoundary } from './ErrorBoundary'

interface GloveSceneProps {
  variant?: 'hero' | 'modal'
  primaryColor?: string
  palmColor?: string
  cuffColor?: string
  rotationSpeed?: number
  active?: boolean
  modelUrl?: string
  modelTint?: string
}

export function GloveScene({
  variant = 'hero',
  primaryColor,
  palmColor,
  cuffColor,
  rotationSpeed,
  active = true,
  modelUrl,
  modelTint,
}: GloveSceneProps) {
  const hero = variant === 'hero'
  const accent = primaryColor ?? '#CD0032'
  const renderGLTF = hero || !!modelUrl

  // Hero: gira solo (render continuo mientras está en pantalla).
  // Modal: el usuario lo gira arrastrando → render solo bajo demanda (0 GPU en reposo).
  const frameloop = hero ? (active ? 'always' : 'never') : 'demand'

  return (
    <ErrorBoundary>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Canvas
          camera={{ position: hero ? [0, 0.3, 5.2] : [0, 0.2, 3.2], fov: hero ? 42 : 44 }}
          dpr={[1, 1.5]}
          frameloop={frameloop}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={hero ? 0.7 : 0.5} />
          <hemisphereLight args={['#ffffff', '#2a1a1c', hero ? 1.2 : 1.0]} />
          <directionalLight position={[3.5, 5, 3]} intensity={hero ? 3.6 : 3.4} color="#ffffff" />
          <directionalLight position={[-3, -2, 1.5]} intensity={hero ? 1.2 : 0.95} color={accent} />

          <Suspense fallback={null}>
            {renderGLTF ? (
              <GloveGLTF
                url={modelUrl}
                tint={modelTint}
                scale={hero ? 1.7 : 1.3}
                autoRotate={hero}
                rotationSpeed={rotationSpeed ?? 0.38}
              />
            ) : (
              <GloveModel
                primaryColor={primaryColor}
                palmColor={palmColor}
                cuffColor={cuffColor}
                rotationSpeed={rotationSpeed ?? 0.55}
              />
            )}
            <ContactShadows
              position={hero ? [0, -2.4, 0] : [0, -2.2, 0]}
              opacity={hero ? 0.4 : 0.3}
              scale={hero ? 6 : 5}
              blur={hero ? 3.5 : 3}
              resolution={256}
              color={accent}
            />
          </Suspense>

          {!hero && (
            <OrbitControls
              makeDefault
              enablePan={false}
              enableZoom={false}
              enableDamping
              dampingFactor={0.08}
              rotateSpeed={0.9}
            />
          )}
        </Canvas>

        {!hero && (
          <div
            style={{
              position: 'absolute',
              bottom: '14px',
              left: '50%',
              transform: 'translateX(-50%)',
              pointerEvents: 'none',
              color: 'rgba(250,251,252,0.45)',
              fontSize: '0.6rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              whiteSpace: 'nowrap',
            }}
          >
            ↻ Arrastra para girar
          </div>
        )}
      </div>
    </ErrorBoundary>
  )
}
