'use client';

import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CapsuleGeometry,
  DoubleSide,
  Group,
  InstancedMesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  Object3D,
  Points,
  PointsMaterial,
  SphereGeometry,
  TorusGeometry,
  Vector3,
} from 'three';

const TAU = Math.PI * 2;
const LONG_TENTACLES = 16;
const ORAL_ARMS = 8;
const STRAND_COUNT = LONG_TENTACLES + ORAL_ARMS;
const SEGMENT_COUNT = 15;
const INSTANCE_COUNT = STRAND_COUNT * (SEGMENT_COUNT - 1);

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useMemo(() => {
    if (typeof window === 'undefined') return undefined;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return reduced;
}

function supportsWebGL() {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl'),
    );
  } catch {
    return false;
  }
}

function JellyfishBell({ reducedMotion }: { reducedMotion: boolean }) {
  const bellRef = useRef<Group>(null);

  const domeGeometry = useMemo(
    () => new SphereGeometry(1, 72, 48, 0, TAU, 0, Math.PI / 2),
    [],
  );
  const innerDomeGeometry = useMemo(
    () => new SphereGeometry(1, 56, 36, 0, TAU, 0, Math.PI / 2),
    [],
  );
  const glowGeometry = useMemo(() => new SphereGeometry(0.72, 48, 32), []);

  const shellMaterial = useMemo(
    () =>
      new MeshPhysicalMaterial({
        color: '#ffd0d6',
        emissive: '#8e1429',
        emissiveIntensity: 0.42,
        roughness: 0.17,
        metalness: 0.02,
        transmission: 0.16,
        thickness: 0.65,
        ior: 1.34,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        side: DoubleSide,
      }),
    [],
  );
  const innerMaterial = useMemo(
    () =>
      new MeshBasicMaterial({
        color: '#ff536e',
        transparent: true,
        opacity: 0.3,
        blending: AdditiveBlending,
        depthWrite: false,
        side: DoubleSide,
        toneMapped: false,
      }),
    [],
  );
  const glowMaterial = useMemo(
    () =>
      new MeshBasicMaterial({
        color: '#ff244f',
        transparent: true,
        opacity: 0.3,
        blending: AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      }),
    [],
  );
  const rimGeometry = useMemo(() => new TorusGeometry(1.02, 0.018, 12, 112), []);

  useFrame(({ clock }) => {
    if (!bellRef.current || reducedMotion) return;
    const time = clock.elapsedTime * 0.34;
    const pulse = 1 + Math.sin(time * 1.4) * 0.018;
    bellRef.current.scale.set(1, pulse, 1);
    bellRef.current.rotation.y = Math.sin(time * 0.55) * 0.045;
    bellRef.current.rotation.z = Math.sin(time * 0.42) * 0.018;
  });

  return (
    <group ref={bellRef} position={[0, 0.43, 0]}>
      <mesh
        geometry={domeGeometry}
        material={shellMaterial}
        scale={[1.17, 0.92, 1.17]}
      />
      <mesh
        geometry={innerDomeGeometry}
        material={innerMaterial}
        scale={[1.04, 0.77, 1.04]}
        position={[0, -0.015, 0]}
      />
      <mesh
        geometry={glowGeometry}
        material={glowMaterial}
        scale={[0.88, 0.2, 0.88]}
        position={[0, -0.12, 0]}
      />
      <mesh
        geometry={rimGeometry}
        rotation={[Math.PI / 2, 0, 0]}
        material={
          <meshBasicMaterial
            color="#ff9ba9"
            toneMapped={false}
            transparent
            opacity={0.92}
            blending={AdditiveBlending}
            depthWrite={false}
          />
        }
      />
      <pointLight position={[0, -0.12, 0.15]} color="#ff254e" intensity={1.35} distance={3.5} />
    </group>
  );
}

function TentacleField({ reducedMotion }: { reducedMotion: boolean }) {
  const meshRef = useRef<InstancedMesh>(null);
  const geometry = useMemo(() => new CapsuleGeometry(0.013, 0.12, 4, 7), []);
  const material = useMemo(
    () =>
      new MeshPhysicalMaterial({
        color: '#ffa0ad',
        emissive: '#8d1029',
        emissiveIntensity: 0.55,
        roughness: 0.28,
        metalness: 0.015,
        transparent: true,
        opacity: 0.86,
        depthWrite: false,
        clearcoat: 0.55,
        clearcoatRoughness: 0.2,
      }),
    [],
  );
  const helpers = useMemo(
    () => ({
      from: new Vector3(),
      to: new Vector3(),
      direction: new Vector3(),
      up: new Vector3(0, 1, 0),
      object: new Object3D(),
    }),
    [],
  );

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const time = reducedMotion ? 0 : clock.elapsedTime * 0.78;
    let instance = 0;

    for (let strand = 0; strand < STRAND_COUNT; strand++) {
      const isOralArm = strand >= LONG_TENTACLES;
      const strandIndex = isOralArm ? strand - LONG_TENTACLES : strand;
      const strandTotal = isOralArm ? ORAL_ARMS : LONG_TENTACLES;
      const angle = (strandIndex / strandTotal) * TAU + (isOralArm ? 0.12 : 0);
      const phase = strand * 1.71;
      const length = isOralArm ? 1.1 : 1.82;
      const rootRadius = isOralArm ? 0.22 : 0.52;

      for (let segment = 0; segment < SEGMENT_COUNT - 1; segment++) {
        const u = segment / (SEGMENT_COUNT - 1);
        const nextU = (segment + 1) / (SEGMENT_COUNT - 1);

        const pointAt = (target: Vector3, progress: number) => {
          const wave = reducedMotion
            ? 0
            : Math.sin(time + phase + progress * 3.3) * progress * (isOralArm ? 0.105 : 0.22);
          const curl = reducedMotion
            ? 0
            : Math.cos(time * 0.72 + phase + progress * 2.4) * progress * (isOralArm ? 0.055 : 0.12);
          const radius = rootRadius + progress * 0.075;
          target.set(
            Math.cos(angle) * radius - Math.sin(angle) * wave + Math.cos(angle) * curl * 0.15,
            0.25 - progress * length + (reducedMotion ? 0 : Math.sin(time * 0.65 + phase + progress * 2) * progress * 0.035),
            Math.sin(angle) * radius + Math.cos(angle) * wave + Math.sin(angle) * curl * 0.15,
          );
        };

        pointAt(helpers.from, u);
        pointAt(helpers.to, nextU);
        helpers.direction.subVectors(helpers.to, helpers.from);
        const segmentLength = helpers.direction.length();
        helpers.direction.normalize();

        helpers.object.position.copy(helpers.from).add(helpers.to).multiplyScalar(0.5);
        helpers.object.quaternion.setFromUnitVectors(helpers.up, helpers.direction);
        const taper = (isOralArm ? 1.16 : 1) * (1 - u * 0.5);
        helpers.object.scale.set(taper, segmentLength / 0.15, taper);
        helpers.object.updateMatrix();
        mesh.setMatrixAt(instance++, helpers.object.matrix);
      }
    }

    mesh.count = instance;
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, INSTANCE_COUNT]}
      frustumCulled={false}
    />
  );
}

function FloatingParticles({ reducedMotion }: { reducedMotion: boolean }) {
  const geometry = useMemo(() => {
    const positions = new Float32Array(110 * 3);
    for (let i = 0; i < 110; i++) {
      const seed = i + 1;
      positions[i * 3] = Math.sin(seed * 12.9898) * 1.7;
      positions[i * 3 + 1] = ((seed * 37) % 101) / 100 * 3.2 - 1.55;
      positions[i * 3 + 2] = Math.cos(seed * 78.233) * 0.9;
    }
    const result = new BufferGeometry();
    result.setAttribute('position', new BufferAttribute(positions, 3));
    return result;
  }, []);
  const material = useMemo(
    () =>
      new PointsMaterial({
        color: '#ff9eaa',
        size: 0.022,
        transparent: true,
        opacity: 0.34,
        blending: AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
        toneMapped: false,
      }),
    [],
  );

  useFrame(({ clock }, delta) => {
    if (reducedMotion) return;
    const positions = geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < 110; i++) {
      const offset = i * 3;
      positions[offset + 1] += delta * (0.035 + (i % 5) * 0.009);
      positions[offset] += Math.sin(clock.elapsedTime * 0.24 + i) * delta * 0.006;
      if (positions[offset + 1] > 1.7) positions[offset + 1] = -1.6;
    }
    geometry.attributes.position.needsUpdate = true;
  });

  return <points geometry={geometry} material={material} />;
}

function JellyfishScene({ reducedMotion }: { reducedMotion: boolean }) {
  const rigRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!rigRef.current || reducedMotion) return;
    const time = clock.elapsedTime;
    rigRef.current.position.y = Math.sin(time * 0.42) * 0.055;
    rigRef.current.rotation.y = Math.sin(time * 0.2) * 0.12;
    rigRef.current.rotation.z = Math.sin(time * 0.31) * 0.018;
  });

  return (
    <group ref={rigRef}>
      <JellyfishBell reducedMotion={reducedMotion} />
      <TentacleField reducedMotion={reducedMotion} />
      <FloatingParticles reducedMotion={reducedMotion} />
    </group>
  );
}

export function JellyfishFallback() {
  return (
    <div className="relative h-full min-h-[420px] w-full overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 420 520" className="h-full w-full" fill="none">
        <defs>
          <radialGradient id="jelly-bell-fill" cx="50%" cy="28%" r="75%">
            <stop offset="0%" stopColor="#ffc3cb" stopOpacity="0.9" />
            <stop offset="42%" stopColor="#f04b68" stopOpacity="0.52" />
            <stop offset="100%" stopColor="#7a1028" stopOpacity="0.12" />
          </radialGradient>
          <linearGradient id="jelly-tentacle" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#ffb4bf" stopOpacity="0.9" />
            <stop offset="1" stopColor="#a10e2c" stopOpacity="0.12" />
          </linearGradient>
          <filter id="jelly-glow">
            <feGaussianBlur stdDeviation="13" />
          </filter>
        </defs>
        <ellipse cx="210" cy="165" rx="112" ry="76" fill="#e9234a" opacity="0.22" filter="url(#jelly-glow)" />
        <path d="M98 168C102 92 145 55 210 55C275 55 318 92 322 168C285 195 135 195 98 168Z" fill="url(#jelly-bell-fill)" stroke="#ff9aa9" strokeOpacity="0.8" strokeWidth="2" />
        <path d="M108 168C155 187 265 187 312 168" stroke="#ffb1bd" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
        <path d="M148 180C130 253 154 301 122 385M174 184C164 260 194 317 174 440M199 185C206 280 190 346 208 462M224 185C239 266 219 341 243 438M250 182C272 250 247 318 286 405M276 178C306 238 283 292 321 362" stroke="url(#jelly-tentacle)" strokeWidth="3" strokeLinecap="round" />
        <path d="M184 177C172 226 183 255 199 294M236 177C250 220 237 257 221 294" stroke="#ff8296" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
      </svg>
    </div>
  );
}

export function JellyfishCanvas() {
  const reducedMotion = useReducedMotion();
  const webglSupported = useMemo(() => supportsWebGL(), []);

  if (!webglSupported) return <JellyfishFallback />;

  return (
    <div
      className="relative h-full min-h-[420px] w-full"
      role="img"
      aria-label="A luminous translucent jellyfish with a softly glowing bell and long flowing tentacles."
      data-testid="jellyfish-visual"
    >
      <Canvas
        camera={{ position: [0, 0.12, 5.15], fov: 37, near: 0.1, far: 30 }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: false,
          powerPreference: 'high-performance',
        }}
        fallback={<JellyfishFallback />}
        shadows={false}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <color attach="background" args={['#090607']} />
        <fog attach="fog" args={['#090607', 7, 14]} />
        <ambientLight intensity={0.72} color="#ffd1d7" />
        <hemisphereLight color="#ffdce1" groundColor="#310813" intensity={0.7} />
        <directionalLight position={[-3, 4, 4]} intensity={1.55} color="#fff0f2" />
        <directionalLight position={[3, 1, -3]} intensity={1.15} color="#ff385b" />
        <spotLight
          position={[1.2, 3.5, 3.2]}
          angle={0.58}
          penumbra={0.9}
          intensity={2}
          color="#ffb5bf"
          distance={10}
        />
        <pointLight position={[-2, -0.3, 1.5]} intensity={0.85} color="#ff3658" distance={7} />
        <JellyfishScene reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
