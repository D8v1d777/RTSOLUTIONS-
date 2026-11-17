'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  OrbitControls,
  ContactShadows,
  Environment,
} from '@react-three/drei';
import {
  Color,
  MeshPhysicalMaterial,
  DoubleSide,
  AdditiveBlending,
  Vector2,
  LatheGeometry,
  SphereGeometry,
  CapsuleGeometry,
  BufferGeometry,
  BufferAttribute,
  PointsMaterial,
  Points,
  Group,
  Mesh,
  Clock,
  Object3D,
  Material,
  BackSide,
} from 'three';

// Check for reduced motion preference
const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  return reduced;
};

// Check for WebGL support
const useWebGLSupport = () => {
  const [supported, setSupported] = useState(true);
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setSupported(!!gl);
    } catch {
      setSupported(false);
    }
  }, []);
  return supported;
};

// Jellyfish Bell Component
function JellyfishBell({
  time,
  reducedMotion,
  intensity = 1,
}: {
  time: number;
  reducedMotion: boolean;
  intensity?: number;
}) {
  const bellRef = useRef<Mesh>(null);
  const clock = useRef(new Clock()).current;

  useFrame(() => {
    if (!bellRef.current || reducedMotion) return;
    const t = clock.getElapsedTime() * 0.3 * intensity;

    // Pulsing animation - subtle breathing
    const pulse = 1 + Math.sin(t) * 0.03 * intensity;
    bellRef.current.scale.setScalar(pulse);

    // Gentle rotation drift
    bellRef.current.rotation.y = Math.sin(t * 0.3) * 0.15 * intensity;
    bellRef.current.rotation.x = Math.cos(t * 0.2) * 0.05 * intensity;
  });

  // Procedural bell geometry using lathe-like approach
  const bellGeometry = useRef<LatheGeometry>(null);
  if (!bellGeometry.current) {
    const points: Vector2[] = [];
    const segments = 32;
    for (let i = 0; i <= segments; i++) {
      const v = i / segments;
      const radius = Math.sin(v * Math.PI * 0.5) * (1 - v * 0.3) + 0.15;
      const y = Math.cos(v * Math.PI * 0.5) * 1.2;
      points.push(new Vector2(radius, y));
    }
    bellGeometry.current = new LatheGeometry(points, 64);
    bellGeometry.current.computeVertexNormals();
  }

  const bellMaterial = useRef<MeshPhysicalMaterial>(null);
  if (!bellMaterial.current) {
    bellMaterial.current = new MeshPhysicalMaterial({
      color: new Color(0x1a0508),
      transparent: true,
      opacity: 0.15,
      transmission: 0.95,
      thickness: 0.5,
      roughness: 0.05,
      metalness: 0.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      ior: 1.33,
      envMapIntensity: 1.5,
      side: DoubleSide,
      depthWrite: false,
    });
  }

  return <mesh ref={bellRef} geometry={bellGeometry.current} material={bellMaterial.current} />;
}

// Inner Glow Component
function InnerGlow({
  time,
  reducedMotion,
  intensity = 1,
}: {
  time: number;
  reducedMotion: boolean;
  intensity?: number;
}) {
  const glowRef = useRef<Mesh>(null);

  useFrame(() => {
    if (!glowRef.current || reducedMotion) return;
    const t = time * 0.5 * intensity;

    const pulse = 1 + Math.sin(t * 0.7) * 0.15 * intensity;
    if (glowRef.current.material instanceof Material) {
      (glowRef.current.material as MeshPhysicalMaterial).opacity = 0.12 * pulse * intensity;
    }

    const scale = 0.92 + Math.sin(t * 0.4) * 0.02 * intensity;
    glowRef.current.scale.setScalar(scale);
  });

  const glowGeometry = useRef<SphereGeometry>(null);
  if (!glowGeometry.current) {
    glowGeometry.current = new SphereGeometry(0.85, 48, 32);
  }

  const glowMaterial = useRef<MeshPhysicalMaterial>(null);
  if (!glowMaterial.current) {
    glowMaterial.current = new MeshPhysicalMaterial({
      color: new Color(0xff2a3a),
      transparent: true,
      opacity: 0.12,
      blending: AdditiveBlending,
      depthWrite: false,
      side: BackSide,
    });
  }

  return <mesh ref={glowRef} geometry={glowGeometry.current} material={glowMaterial.current} />;
}

// Tentacle Component
function Tentacle({
  index,
  count,
  time,
  reducedMotion,
  intensity = 1,
}: {
  index: number;
  count: number;
  time: number;
  reducedMotion: boolean;
  intensity?: number;
}) {
  const tentacleRef = useRef<Group>(null);
  const phaseOffset = (index / count) * Math.PI * 2;
  const baseAngle = (index / count) * Math.PI * 2;

  useFrame(() => {
    if (!tentacleRef.current || reducedMotion) return;
    const t = time * 0.8 * intensity + phaseOffset;

    const children = tentacleRef.current.children as Object3D[];
    children.forEach((segment, i) => {
      const segmentIndex = i / (children.length - 1);
      const waveX = Math.sin(t + segmentIndex * 2.5) * 0.15 * (segmentIndex + 0.3) * intensity;
      const waveZ = Math.cos(t * 0.7 + segmentIndex * 2) * 0.1 * (segmentIndex + 0.3) * intensity;
      const waveY = Math.sin(t * 0.5 + segmentIndex * 1.5) * 0.03 * intensity;

      segment.position.x = waveX;
      segment.position.z = waveZ;
      segment.position.y = -segmentIndex * 1.8 + waveY;

      if (i < children.length - 1) {
        const nextSegment = children[i + 1];
        const dx = nextSegment.position.x - segment.position.x;
        const dz = nextSegment.position.z - segment.position.z;
        const dy = nextSegment.position.y - segment.position.y;
        segment.lookAt(
          segment.position.x + dx,
          segment.position.y + dy,
          segment.position.z + dz
        );
      }
    });

    tentacleRef.current.rotation.y = baseAngle;
    tentacleRef.current.rotation.z = Math.sin(t * 0.3) * 0.1 * intensity;
  });

  const segmentGeometry = useRef<CapsuleGeometry>(null);
  if (!segmentGeometry.current) {
    segmentGeometry.current = new CapsuleGeometry(0.025, 0.15, 4, 8);
  }

  const segmentMaterial = useRef<MeshPhysicalMaterial>(null);
  if (!segmentMaterial.current) {
    segmentMaterial.current = new MeshPhysicalMaterial({
      color: new Color(0x8b151d),
      transparent: true,
      opacity: 0.6,
      transmission: 0.7,
      thickness: 0.1,
      roughness: 0.2,
      metalness: 0.0,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      envMapIntensity: 1.0,
      depthWrite: false,
    });
  }

  const segments = 18;
  const segmentNodes = [];
  for (let i = 0; i < segments; i++) {
    segmentNodes.push(
      <mesh
        key={i}
        geometry={segmentGeometry.current}
        material={segmentMaterial.current}
        position={[0, -i * 0.18, 0]}
        scale={1 - i * 0.035}
      />
    );
  }

  return <group ref={tentacleRef}>{segmentNodes}</group>;
}

// Particle System
function Particles({
  time,
  reducedMotion,
  intensity = 1,
}: {
  time: number;
  reducedMotion: boolean;
  intensity?: number;
}) {
  const particlesRef = useRef<Points>(null);
  const count = 300;

  useFrame(() => {
    if (!particlesRef.current || reducedMotion) return;
    const geometry = particlesRef.current.geometry as BufferGeometry;
    const positions = geometry.attributes.position.array as Float32Array;
    const sizes = geometry.attributes.size.array as Float32Array;
    const alphas = geometry.attributes.alpha?.array as Float32Array | undefined;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const phase = (i / count) * Math.PI * 8;

      positions[i3 + 1] += 0.002 * intensity;
      positions[i3] += Math.sin(time * 0.5 + phase) * 0.001 * intensity;
      positions[i3 + 2] += Math.cos(time * 0.3 + phase) * 0.001 * intensity;

      if (positions[i3 + 1] > 3) {
        positions[i3 + 1] = -1.5;
        positions[i3] = (Math.random() - 0.5) * 1.5;
        positions[i3 + 2] = (Math.random() - 0.5) * 1.5;
      }

      sizes[i] = 0.02 + Math.sin(time * 2 + phase) * 0.01 * intensity;
      if (alphas) {
        alphas[i] = 0.3 + Math.sin(time * 1.5 + phase) * 0.2 * intensity;
      }
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.size.needsUpdate = true;
    if (alphas) geometry.attributes.alpha.needsUpdate = true;
  });

  const geometry = useRef<BufferGeometry>(null);
  if (!geometry.current) {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const alphas = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 1.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi) * 2 - 1.5;
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      sizes[i] = 0.02 + Math.random() * 0.02;
      alphas[i] = 0.2 + Math.random() * 0.4;

      const colorMix = Math.random();
      colors[i * 3] = 0.8 + colorMix * 0.2;
      colors[i * 3 + 1] = 0.05 + colorMix * 0.1;
      colors[i * 3 + 2] = 0.08 + colorMix * 0.1;
    }

    const geo = new BufferGeometry();
    geo.setAttribute('position', new BufferAttribute(positions, 3));
    geo.setAttribute('size', new BufferAttribute(sizes, 1));
    geo.setAttribute('alpha', new BufferAttribute(alphas, 1));
    geo.setAttribute('color', new BufferAttribute(colors, 3));
    geometry.current = geo;
  }

  const material = useRef<PointsMaterial>(null);
  if (!material.current) {
    material.current = new PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
  }

  return <points ref={particlesRef} geometry={geometry.current} material={material.current} />;
}

// Main Jellyfish Scene
function JellyfishScene() {
  const reducedMotion = useReducedMotion();
  const webglSupported = useWebGLSupport();
  const clock = useRef(new Clock()).current;

  const [intensity, setIntensity] = useState(1);
  useEffect(() => {
    const updateIntensity = () => {
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isLowPower = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
      setIntensity(isMobile || isLowPower ? 0.6 : 1);
    };
    updateIntensity();
    window.addEventListener('resize', updateIntensity);
    return () => window.removeEventListener('resize', updateIntensity);
  }, []);

  if (!webglSupported) {
    return null;
  }

  return (
    <group>
      <InnerGlow
        time={clock.getElapsedTime()}
        reducedMotion={reducedMotion}
        intensity={intensity}
      />

      <JellyfishBell
        time={clock.getElapsedTime()}
        reducedMotion={reducedMotion}
        intensity={intensity}
      />

      <group>
        {Array.from({ length: 12 }, (_, i) => (
          <Tentacle
            key={i}
            index={i}
            count={12}
            time={clock.getElapsedTime()}
            reducedMotion={reducedMotion}
            intensity={intensity}
          />
        ))}
      </group>

      <group>
        {Array.from({ length: 8 }, (_, i) => (
          <Tentacle
            key={`oral-${i}`}
            index={i}
            count={8}
            time={clock.getElapsedTime()}
            reducedMotion={reducedMotion}
            intensity={intensity * 0.5}
          />
        ))}
      </group>

      <Particles
        time={clock.getElapsedTime()}
        reducedMotion={reducedMotion}
        intensity={intensity}
      />

      <ContactShadows
        opacity={0.15}
        scale={3}
        blur={2}
        far={5}
        color="#c01c28"
        position={[0, -1.6, 0]}
      />
    </group>
  );
}

export function JellyfishCanvas() {
  const reducedMotion = useReducedMotion();
  const webglSupported = useWebGLSupport();

  if (!webglSupported) {
    return null;
  }

  return (
    <div className="relative w-full h-full" style={{ willChange: 'transform' }}>
      <Canvas
        camera={{ position: [0, 0.5, 3.5], fov: 35 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false, powerPreference: 'high-performance' }}
        shadows={false}
        dpr={Math.min(window.devicePixelRatio, 2)}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <color attach="background" args={['#0a0a0a']} />
        <fog attach="fog" args={['#0a0a0a', 2, 10]} />

        <ambientLight intensity={0.3} color="#1a1a1a" />
        <directionalLight
          position={[-2, 4, 3]}
          intensity={1.2}
          color="#fff5f0"
          castShadow={false}
        />
        <directionalLight
          position={[2, 2, -2]}
          intensity={0.6}
          color="#ff4455"
          castShadow={false}
        />
        <pointLight position={[0, 2, 2]} intensity={0.8} color="#ff2a3a" distance={10} decay={2} />
        <pointLight position={[0, -1, 0]} intensity={0.4} color="#c01c28" distance={5} decay={2} />

        <Environment
          background={false}
          files={['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']}
          path="/env/"
          preset="studio"
        />

        <JellyfishScene />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={!reducedMotion}
          autoRotate={!reducedMotion}
          autoRotateSpeed={0.2}
          minPolarAngle={Math.PI * 0.3}
          maxPolarAngle={Math.PI * 0.7}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}