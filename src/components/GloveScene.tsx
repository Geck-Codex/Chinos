import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import { GloveModel } from './GloveModel'
import { GloveGLTF } from './GloveGLTF'

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

  return (
    <Canvas
      camera={{ position: hero ? [0, 0.3, 5.2] : [0, 0.2, 3.2], fov: hero ? 42 : 44 }}
      dpr={[1, 1.5]}
      frameloop={active ? 'always' : 'never'}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={hero ? 0.65 : 0.4} />
      <hemisphereLight args={['#ffffff', '#2a1a1c', hero ? 1.1 : 0.9]} />
      <directionalLight position={[3.5, 5, 3]} intensity={hero ? 3.2 : 3} color="#ffffff" />
      <directionalLight position={[-3, -2, 1.5]} intensity={hero ? 1.2 : 0.9} color={accent} />
      <directionalLight position={[0, 3, -5]} intensity={hero ? 0.6 : 0.5} color="#ffffff" />
      <pointLight position={[0, 5, 1]} intensity={hero ? 25 : 22} color="#ffffff" />

      <Suspense fallback={null}>
        {renderGLTF ? (
          <GloveGLTF
            url={modelUrl}
            tint={modelTint}
            scale={hero ? 1.7 : 1.3}
            rotationSpeed={rotationSpeed ?? (hero ? 0.38 : 0.5)}
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
          color={accent}
        />
      </Suspense>
    </Canvas>
  )
}
