import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import type { Group } from 'three'

const WHITE = '#FAFBFC'

// meshPhysicalMaterial — solo para las dos superficies principales de la palma
function Mat({ color, roughness = 0.52 }: { color: string; roughness?: number }) {
  return (
    <meshPhysicalMaterial
      color={color}
      roughness={roughness}
      metalness={0.0}
      clearcoat={0.18}
      clearcoatRoughness={0.45}
    />
  )
}

// meshStandardMaterial — para todo lo demás (dedos, puño, nudillos, pulgar)
function MatSimple({ color, roughness = 0.52 }: { color: string; roughness?: number }) {
  return <meshStandardMaterial color={color} roughness={roughness} metalness={0.05} />
}

function Finger({ x, baseY, r, len, tiltZ = 0, color }: {
  x: number; baseY: number; r: number; len: number; tiltZ?: number; color: string
}) {
  const centerY = baseY + len / 2
  return (
    <group position={[x, centerY, 0]} rotation={[0, 0, tiltZ]}>
      <mesh>
        <capsuleGeometry args={[r, len, 8, 20]} />
        <MatSimple color={color} />
      </mesh>
      <mesh position={[0, 0, r + 0.006]}>
        <boxGeometry args={[0.01, len * 0.75, 0.005]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
    </group>
  )
}

interface GloveModelProps {
  primaryColor?: string
  palmColor?: string
  cuffColor?: string
  rotationSpeed?: number
}

export function GloveModel({
  primaryColor = '#CD0032',
  palmColor = '#8B001E',
  cuffColor = '#4A0010',
  rotationSpeed = 0.38,
}: GloveModelProps) {
  const groupRef = useRef<Group>(null)
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

      {/* CUFF */}
      <mesh position={[0, -1.35, 0]}>
        <cylinderGeometry args={[0.555, 0.62, 0.8, 32]} />
        <MatSimple color={cuffColor} roughness={0.65} />
      </mesh>
      {[-1.66, -1.52, -1.38, -1.24, -1.1, -0.97].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <torusGeometry args={[0.585, 0.012, 8, 48]} />
          <meshStandardMaterial color={i % 2 === 0 ? cuffColor : palmColor} roughness={0.7} />
        </mesh>
      ))}
      <mesh position={[0, -0.97, 0]}>
        <torusGeometry args={[0.558, 0.022, 8, 48]} />
        <meshStandardMaterial color={WHITE} roughness={0.5} />
      </mesh>

      {/* PALM BODY */}
      <RoundedBox args={[1.08, 1.02, 0.38]} radius={0.13} smoothness={6} position={[0, 0, 0]}>
        <Mat color={primaryColor} />
      </RoundedBox>
      <RoundedBox args={[0.88, 0.76, 0.06]} radius={0.09} smoothness={5} position={[0, -0.06, 0.22]}>
        <Mat color={palmColor} roughness={0.38} />
      </RoundedBox>
      {Array.from({ length: 5 }, (_, row) =>
        Array.from({ length: 4 }, (_, col) => (
          <mesh key={`${row}-${col}`} position={[-0.21 + col * 0.14, -0.3 + row * 0.16, 0.256]}>
            <sphereGeometry args={[0.024, 10, 10]} />
            <meshStandardMaterial color={palmColor} roughness={0.3} />
          </mesh>
        ))
      )}

      {/* KNUCKLE STRIP */}
      <RoundedBox args={[0.98, 0.1, 0.14]} radius={0.05} smoothness={4} position={[0, 0.49, 0.04]}>
        <MatSimple color={primaryColor} />
      </RoundedBox>
      {[-0.24, 0, 0.24].map((x, i) => (
        <mesh key={i} position={[x, 0.52, 0.14]}>
          <sphereGeometry args={[0.068, 14, 14]} />
          <MatSimple color={primaryColor} roughness={0.45} />
        </mesh>
      ))}

      {/* FINGERS */}
      <Finger x={-0.33} baseY={0.44} r={0.094} len={0.56} tiltZ={0.04} color={primaryColor} />
      <Finger x={-0.11} baseY={0.47} r={0.102} len={0.64} color={primaryColor} />
      <Finger x={0.11}  baseY={0.42} r={0.094} len={0.58} tiltZ={-0.03} color={primaryColor} />
      <Finger x={0.335} baseY={0.30} r={0.079} len={0.44} tiltZ={-0.08} color={primaryColor} />

      {/* THUMB */}
      <group position={[-0.66, -0.14, 0.07]} rotation={[0.08, -0.18, -0.75]}>
        <mesh>
          <capsuleGeometry args={[0.09, 0.42, 8, 20]} />
          <MatSimple color={primaryColor} />
        </mesh>
        <mesh position={[0, 0, 0.098]}>
          <boxGeometry args={[0.01, 0.32, 0.005]} />
          <meshStandardMaterial color={palmColor} roughness={0.8} />
        </mesh>
      </group>

      {/* BACK BRAND PANEL */}
      <RoundedBox args={[0.44, 0.2, 0.022]} radius={0.04} smoothness={3} position={[0.01, -0.28, -0.2]}>
        <meshStandardMaterial color={cuffColor} roughness={0.4} />
      </RoundedBox>
    </group>
  )
}
