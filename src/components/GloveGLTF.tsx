import { useRef, useEffect, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Center } from '@react-three/drei'
import { Mesh, MeshStandardMaterial } from 'three'
import type { Group } from 'three'

export const HERO_MODEL_URL = '/images/models/guante2.glb'

interface GloveGLTFProps {
  url?: string
  rotationSpeed?: number
  scale?: number
  tint?: string
}

export function GloveGLTF({ url = HERO_MODEL_URL, rotationSpeed = 0.38, scale = 1.7, tint }: GloveGLTFProps) {
  const groupRef = useRef<Group>(null)
  const { scene } = useGLTF(url)

  const model = useMemo(() => {
    const clone = scene.clone(true)
    clone.traverse((obj) => {
      if (obj instanceof Mesh) {
        if (!obj.geometry.attributes.normal) obj.geometry.computeVertexNormals()
        if (tint || !obj.material) {
          obj.material = new MeshStandardMaterial({ color: tint ?? '#CD0032', roughness: 0.5, metalness: 0.05 })
        }
        obj.castShadow = true
      }
    })
    return clone
  }, [scene, tint])

  const { mouse } = useThree()
  const t = useRef(0)
  const speedRef = useRef(rotationSpeed)
  useEffect(() => { speedRef.current = rotationSpeed }, [rotationSpeed])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    t.current += delta
    groupRef.current.rotation.y += delta * speedRef.current
    groupRef.current.position.y = Math.sin(t.current * 0.75) * 0.09
    const targetX = -mouse.y * 0.1
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05
  })

  return (
    <group ref={groupRef} rotation={[0.06, 0.3, 0]}>
      <Center scale={scale}>
        <primitive object={model} />
      </Center>
    </group>
  )
}

useGLTF.preload(HERO_MODEL_URL)
