'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const skills = [
  // Programming
  'Python', 'JavaScript', 'TypeScript', 'C++', 'Rust',
  // IoT & Hardware
  'Arduino', 'Raspberry Pi', 'ESP32', 'STM32', 'FPGA',
  // Frameworks
  'React', 'Next.js', 'Node.js', 'TensorFlow', 'PyTorch',
  // Cloud & DevOps
  'AWS', 'Docker', 'Kubernetes', 'Git', 'CI/CD',
  // Robotics
  'ROS', 'OpenCV', 'MQTT', 'LoRaWAN', 'Zigbee',
  // Databases
  'PostgreSQL', 'MongoDB', 'Redis', 'InfluxDB',
  // Design
  'PCB Design', 'CAD', 'Fusion 360', '3D Printing',
]

function SkillText({ skill, index, total }: { skill: string; index: number; total: number }) {
  const ref = useRef<THREE.Group>(null)
  
  // Fibonacci sphere distribution for even spacing
  const position = useMemo(() => {
    const phi = Math.acos(-1 + (2 * index) / total)
    const theta = Math.sqrt(total * Math.PI) * phi
    const radius = 3.5
    
    return new THREE.Vector3(
      radius * Math.cos(theta) * Math.sin(phi),
      radius * Math.sin(theta) * Math.sin(phi),
      radius * Math.cos(phi)
    )
  }, [index, total])

  useFrame((state) => {
    if (ref.current) {
      ref.current.lookAt(state.camera.position)
    }
  })

  // Color based on skill category
  const getColor = (skill: string) => {
    const programming = ['Python', 'JavaScript', 'TypeScript', 'C++', 'Rust']
    const hardware = ['Arduino', 'Raspberry Pi', 'ESP32', 'STM32', 'FPGA']
    const frameworks = ['React', 'Next.js', 'Node.js', 'TensorFlow', 'PyTorch']
    const cloud = ['AWS', 'Docker', 'Kubernetes', 'Git', 'CI/CD']
    
    if (programming.includes(skill)) return '#60A5FA' // Blue
    if (hardware.includes(skill)) return '#34D399' // Green
    if (frameworks.includes(skill)) return '#F472B6' // Pink
    if (cloud.includes(skill)) return '#FBBF24' // Yellow
    return '#A78BFA' // Purple for others
  }

  return (
    <group ref={ref} position={position}>
      <Text
        fontSize={0.25}
        color={getColor(skill)}
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        {skill}
      </Text>
    </group>
  )
}

function Globe() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.05) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Wireframe sphere */}
      <mesh>
        <sphereGeometry args={[3, 32, 32]} />
        <meshBasicMaterial
          color="#3B82F6"
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>
      
      {/* Core glow */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.5} />
      </mesh>
      
      {/* Skill texts */}
      {skills.map((skill, index) => (
        <SkillText
          key={skill}
          skill={skill}
          index={index}
          total={skills.length}
        />
      ))}
      
      {/* Connecting lines */}
      <ConnectionLines />
    </group>
  )
}

function ConnectionLines() {
  const linesRef = useRef<THREE.LineSegments>(null)
  
  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = []
    const total = skills.length
    
    for (let i = 0; i < 30; i++) {
      const idx1 = Math.floor(Math.random() * total)
      const idx2 = Math.floor(Math.random() * total)
      if (idx1 === idx2) continue
      
      const phi1 = Math.acos(-1 + (2 * idx1) / total)
      const theta1 = Math.sqrt(total * Math.PI) * phi1
      const phi2 = Math.acos(-1 + (2 * idx2) / total)
      const theta2 = Math.sqrt(total * Math.PI) * phi2
      const radius = 3.5
      
      points.push(
        new THREE.Vector3(
          radius * Math.cos(theta1) * Math.sin(phi1),
          radius * Math.sin(theta1) * Math.sin(phi1),
          radius * Math.cos(phi1)
        ),
        new THREE.Vector3(
          radius * Math.cos(theta2) * Math.sin(phi2),
          radius * Math.sin(theta2) * Math.sin(phi2),
          radius * Math.cos(phi2)
        )
      )
    }
    
    const geo = new THREE.BufferGeometry().setFromPoints(points)
    return geo
  }, [])

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial color="#3B82F6" transparent opacity={0.2} />
    </lineSegments>
  )
}

export default function SkillGlobe() {
  return (
    <div className="w-full h-[500px] md:h-[600px]">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Globe />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI * 3 / 4}
        />
      </Canvas>
      
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-400"></div>
          <span className="text-gray-600 dark:text-gray-400">Programming</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <span className="text-gray-600 dark:text-gray-400">Hardware</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-pink-400"></div>
          <span className="text-gray-600 dark:text-gray-400">Frameworks</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <span className="text-gray-600 dark:text-gray-400">Cloud</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-400"></div>
          <span className="text-gray-600 dark:text-gray-400">Other</span>
        </div>
      </div>
    </div>
  )
}
