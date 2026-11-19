'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei';
import {
  Color,
  MeshPhysicalMaterial,
  DoubleSide,
  AdditiveBlending,
  Vector2,
  Vector3,
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
  Quaternion,
  Matrix4,
  PointLight,
} from 'three';

// Local fallback component
function JellyfishFallback() {
  return (
    <div
      className="bg-gradient-radial from-crimson-muted/20 relative h-full min-h-[500px] w-full rounded-3xl via-transparent to-transparent lg:min-h-[600px]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="text-crimson-dim/30 h-64 w-64 animate-pulse"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <ellipse cx="50" cy="35" rx="30" ry="18" stroke="currentColor" strokeWidth="1.5" />
          <g stroke="currentColor" strokeWidth="1" strokeLinecap="round">
            <path d="M30 53 Q25 75 35 90" />
            <path d="M40 53 Q40 80 45 92" />
            <path d="M50 53 Q50 82 50 95" />
            <path d="M60 53 Q60 80 55 92" />
            <path d="M70 53 Q75 75 65 90" />
          </g>
        </svg>
      </div>
    </div>
  );
}

// Check for reduced motion preference
const useReducedMotion = () => {
  const [reduced, setReduced] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  return reduced;
};

// Check for WebGL support - default true, only disable if explicitly unsupported
const useWebGLSupport = () => {
  const [supported, setSupported] = useState(true); // Default true - assume WebGL available

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const canvas = document.createElement('canvas');
        console.log('[useWebGLSupport] Created canvas:', canvas);

        // Try webgl2 first with failIfMajorPerformanceCaveat: false
        const gl2 = canvas.getContext('webgl2', {
          failIfMajorPerformanceCaveat: false,
        });
        console.log('[useWebGLSupport] webgl2 context:', gl2);

        let gl: WebGLRenderingContext | WebGL2RenderingContext | null = gl2;

        if (!gl) {
          const gl1 = canvas.getContext('webgl', { failIfMajorPerformanceCaveat: false });
          console.log('[useWebGLSupport] webgl context:', gl1);
          gl = gl1;
        }

        if (!gl) {
          const glExp = canvas.getContext('experimental-webgl', {
            failIfMajorPerformanceCaveat: false,
          });
          console.log('[useWebGLSupport] experimental-webgl context:', glExp);
          // Type assertion since experimental-webgl returns broader type
          gl = glExp as WebGLRenderingContext | WebGL2RenderingContext | null;
        }

        const result = !!gl;
        console.log('[useWebGLSupport] Final WebGL check result:', result);
        // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional sync with browser WebGL capability on mount
        setSupported(result);
      } catch (e) {
        console.log('[useWebGLSupport] WebGL check error:', e);
        // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional fail-open on error
        setSupported(true);
      }
    }
    // SSR: keep default true
  }, []);

  return supported;
};

// Jellyfish Bell Component
function JellyfishBell({
  reducedMotion,
  intensity = 1,
}: {
  reducedMotion: boolean;
  intensity?: number;
}) {
  const bellRef = useRef<Mesh>(null);
  const clock = useRef(new Clock()).current;

  // Create geometry once using useMemo
  const bellGeometry = useMemo(() => {
    const points: Vector2[] = [];
    const segments = 32;
    for (let i = 0; i <= segments; i++) {
      const v = i / segments;
      const radius = Math.sin(v * Math.PI * 0.5) * (1 - v * 0.3) + 0.15;
      const y = Math.cos(v * Math.PI * 0.5) * 1.2;
      points.push(new Vector2(radius, y));
    }
    const geometry = new LatheGeometry(points, 64);
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  // Create material once using useMemo
  const bellMaterial = useMemo(() => {
    const mat = new MeshPhysicalMaterial({
      color: new Color(0x1a0508),
      // opacity removed — let transmission + thickness + IOR create true volumetric translucency
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

    // Add fresnel/rim glow via onBeforeCompile — sells the thin membrane
    mat.onBeforeCompile = shader => {
      shader.uniforms.uFresnelPower = { value: 3.0 };
      shader.uniforms.uFresnelIntensity = { value: 0.35 };
      shader.vertexShader = `
          varying vec3 vWorldNormal;
          varying vec3 vWorldPosition;
          ${shader.vertexShader}
        `.replace(
        '#include <worldposition_vertex>',
        `#include <worldposition_vertex>
          vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
          vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
          `
      );
      shader.fragmentShader = `
          varying vec3 vWorldNormal;
          varying vec3 vWorldPosition;
          uniform float uFresnelPower;
          uniform float uFresnelIntensity;
          ${shader.fragmentShader}
        `.replace(
        '#include <dithering_fragment>',
        `#include <dithering_fragment>
          // Fresnel/rim glow for organic membrane feel
          vec3 viewDir = normalize(cameraPosition - vWorldPosition);
          float fresnel = pow(1.0 - abs(dot(viewDir, vWorldNormal)), uFresnelPower);
          gl_FragColor.rgb += vec3(fresnel * uFresnelIntensity) * vec3(1.0, 0.15, 0.2);
          `
      );
    };

    return mat;
  }, []);

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

  return <mesh ref={bellRef} geometry={bellGeometry} material={bellMaterial} />;
}

// Inner Glow Component
function InnerGlow({
  reducedMotion,
  intensity = 1,
}: {
  reducedMotion: boolean;
  intensity?: number;
}) {
  const glowRef = useRef<Mesh>(null);
  const clock = useRef(new Clock()).current;

  const glowGeometry = useMemo(() => new SphereGeometry(0.85, 48, 32), []);
  const glowMaterial = useMemo(
    () =>
      new MeshPhysicalMaterial({
        color: new Color(0xff2a3a),
        transparent: true,
        opacity: 0.12,
        blending: AdditiveBlending,
        depthWrite: false,
        side: BackSide,
      }),
    []
  );

  useFrame(() => {
    if (!glowRef.current || reducedMotion) return;
    const t = clock.getElapsedTime() * 0.5 * intensity;

    const pulse = 1 + Math.sin(t * 0.7) * 0.15 * intensity;
    if (glowRef.current.material instanceof Material) {
      (glowRef.current.material as MeshPhysicalMaterial).opacity = 0.12 * pulse * intensity;
    }

    const scale = 0.92 + Math.sin(t * 0.4) * 0.02 * intensity;
    glowRef.current.scale.setScalar(scale);
  });

  return <mesh ref={glowRef} geometry={glowGeometry} material={glowMaterial} />;
}

// Deterministic pseudo-random for per-tentacle variation (no Math.random in hot path)
const tentacleSeeds = new Array(20).fill(0).map((_, i) => {
  // Simple deterministic hash from index
  let x = (i + 1) * 1234567;
  x = ((x ^ (x >> 13)) * 1664525) >>> 0;
  x = ((x ^ (x >> 17)) * 1664525) >>> 0;
  return (x >>> 0) / 0xffffffff;
});

// Additional seeds for phase drift (independent from main variation)
const tentaclePhaseSeeds = new Array(20).fill(0).map((_, i) => {
  let x = (i + 1) * 7654321;
  x = ((x ^ (x >> 11)) * 1664525) >>> 0;
  x = ((x ^ (x >> 19)) * 1664525) >>> 0;
  return (x >>> 0) / 0xffffffff;
});

// Tentacle Component
function Tentacle({
  index,
  count,
  reducedMotion,
  intensity = 1,
}: {
  index: number;
  count: number;
  reducedMotion: boolean;
  intensity?: number;
}) {
  const tentacleRef = useRef<Group>(null);
  const clock = useRef(new Clock()).current;
  const phaseOffset = (index / count) * Math.PI * 2;
  const baseAngle = (index / count) * Math.PI * 2;

  // Per-tentacle deterministic variation (seeded from index)
  const seed = tentacleSeeds[index % tentacleSeeds.length];
  const frequencyMult = 0.7 + 0.6 * seed; // 0.7–1.3 (widened from 0.9–1.1)
  const amplitudeMult = 0.6 + 0.8 * ((seed * 997) % 1); // 0.6–1.4 (widened from 0.8–1.2)

  // Per-tentacle phase drift (slow rotation of wave phase over time)
  const phaseSeed = tentaclePhaseSeeds[index % tentaclePhaseSeeds.length];
  const phaseDriftSpeed = 0.02 + phaseSeed * 0.03; // 0.02–0.05 rad/s

  const segmentGeometry = useMemo(() => new CapsuleGeometry(0.025, 0.15, 4, 8), []);
  const segmentMaterial = useMemo(
    () =>
      new MeshPhysicalMaterial({
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
      }),
    []
  );

  const segments = 18;

  // Per-segment quaternion refs for slerp smoothing (primary motion)
  const segmentQuaternions = useRef<Quaternion[]>([]);
  // Secondary motion (follow-through): each segment inherits parent rotation with 1-frame delay + 0.85 damping
  const segmentSecondaryQuaternions = useRef<Quaternion[]>([]);
  const prevParentQuaternions = useRef<Quaternion[]>([]);

  useFrame(() => {
    if (!tentacleRef.current || reducedMotion) return;
    const elapsedTime = clock.getElapsedTime();
    const phaseDrift = elapsedTime * phaseDriftSpeed * intensity;
    const t = elapsedTime * 0.8 * intensity * frequencyMult + phaseOffset + phaseDrift;

    const children = tentacleRef.current.children as Object3D[];
    children.forEach((segment, i) => {
      const segmentIndex = i / (children.length - 1);
      const waveX =
        Math.sin(t + segmentIndex * 2.5) * 0.15 * (segmentIndex + 0.3) * intensity * amplitudeMult;
      const waveZ =
        Math.cos(t * 0.7 + segmentIndex * 2) *
        0.1 *
        (segmentIndex + 0.3) *
        intensity *
        amplitudeMult;
      const waveY = Math.sin(t * 0.5 + segmentIndex * 1.5) * 0.03 * intensity * amplitudeMult;

      segment.position.x = waveX;
      segment.position.z = waveZ;
      segment.position.y = -segmentIndex * 1.8 + waveY;

      if (i < children.length - 1) {
        const nextSegment = children[i + 1];
        const dx = nextSegment.position.x - segment.position.x;
        const dz = nextSegment.position.z - segment.position.z;
        const dy = nextSegment.position.y - segment.position.y;

        // Target quaternion from lookAt
        const target = new Vector3(
          segment.position.x + dx,
          segment.position.y + dy,
          segment.position.z + dz
        );
        const targetQuat = new Quaternion();
        const matrix = new Matrix4().lookAt(segment.position, target, new Vector3(0, 1, 0));
        targetQuat.setFromRotationMatrix(matrix);

        // Initialize quaternion ref on first frame (primary)
        if (!segmentQuaternions.current[i]) {
          segmentQuaternions.current[i] = targetQuat.clone();
        }

        // Initialize secondary quaternion ref on first frame
        if (!segmentSecondaryQuaternions.current[i]) {
          segmentSecondaryQuaternions.current[i] = targetQuat.clone();
        }
        // Initialize previous parent quaternion ref
        if (!prevParentQuaternions.current[i]) {
          prevParentQuaternions.current[i] = targetQuat.clone();
        }

        // Primary motion: slerp toward target (smoothing factor ~0.15 = ~3-5 frames to settle)
        segmentQuaternions.current[i].slerp(targetQuat, 0.15);

        // Secondary motion (follow-through): inherit parent rotation with 1-frame delay + 0.85 damping
        // Parent is the previous segment (i-1), or the tentacle root for i=0
        let parentQuat: Quaternion;
        if (i === 0) {
          if (!tentacleRef.current) return;
          parentQuat = tentacleRef.current.quaternion.clone();
        } else {
          parentQuat = prevParentQuaternions.current[i - 1].clone();
        }

        // Apply damping (0.85) and slerp toward parent with delay
        const dampedParentQuat = new Quaternion().slerpQuaternions(
          new Quaternion().set(0, 0, 0, 1), // identity
          parentQuat,
          0.85
        );
        segmentSecondaryQuaternions.current[i].slerp(dampedParentQuat, 0.2);

        // Combine primary and secondary (secondary has lower weight for subtle follow-through)
        const combinedQuat = new Quaternion().copy(segmentQuaternions.current[i]);
        combinedQuat.slerp(segmentSecondaryQuaternions.current[i], 0.3);
        segment.quaternion.copy(combinedQuat);

        // Store current quaternion for next frame's delay
        prevParentQuaternions.current[i] = segmentQuaternions.current[i].clone();
      }
    });

    tentacleRef.current.rotation.y = baseAngle;
    tentacleRef.current.rotation.z = Math.sin(t * 0.3) * 0.1 * intensity;
  });

  // Create segment nodes once using useMemo
  const segmentNodes = useMemo(() => {
    const nodes = [];
    for (let i = 0; i < segments; i++) {
      nodes.push(
        <mesh
          key={i}
          geometry={segmentGeometry}
          material={segmentMaterial}
          position={[0, -i * 0.18, 0]}
          scale={1 - i * 0.035}
        />
      );
    }
    return nodes;
  }, [segmentGeometry, segmentMaterial, segments]);

  return <group ref={tentacleRef}>{segmentNodes}</group>;
}

// Pre-generate random values at module level to avoid Math.random during render
const PARTICLE_COUNT = 300;
const particleRandomValues = new Array(PARTICLE_COUNT * 6).fill(0).map(() => Math.random());
// Indices: 0=radius, 1=theta, 2=phi, 3=size/alpha, 4=resetX, 5=resetZ

// Particle System
function Particles({
  reducedMotion,
  intensity = 1,
}: {
  reducedMotion: boolean;
  intensity?: number;
}) {
  const particlesRef = useRef<Points>(null);
  const clock = useRef(new Clock()).current;

  // Create geometry once with pre-generated random data
  const geometry = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const alphas = new Float32Array(PARTICLE_COUNT);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    // Store initial distances for sorting reference
    const initialDistances = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const radius = particleRandomValues[i * 4] * 1.2;
      const theta = particleRandomValues[i * 4 + 1] * Math.PI * 2;
      const phi = Math.acos(2 * particleRandomValues[i * 4 + 2] - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi) * 2 - 1.5;
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      // Initial distance to bell center (0, 0, 0) for proximity glow
      initialDistances[i] = Math.sqrt(
        positions[i * 3] ** 2 + positions[i * 3 + 1] ** 2 + positions[i * 3 + 2] ** 2
      );

      sizes[i] = 0.02 + particleRandomValues[i * 4 + 3] * 0.02;
      alphas[i] = 0.2 + particleRandomValues[(i * 4 + 3) % (PARTICLE_COUNT * 4)] * 0.4;

      const colorMix = particleRandomValues[(i * 4 + 3) % (PARTICLE_COUNT * 4)];
      colors[i * 3] = 0.8 + colorMix * 0.2;
      colors[i * 3 + 1] = 0.05 + colorMix * 0.1;
      colors[i * 3 + 2] = 0.08 + colorMix * 0.1;
    }

    const geo = new BufferGeometry();
    geo.setAttribute('position', new BufferAttribute(positions, 3));
    geo.setAttribute('size', new BufferAttribute(sizes, 1));
    geo.setAttribute('alpha', new BufferAttribute(alphas, 1));
    geo.setAttribute('color', new BufferAttribute(colors, 3));
    // Store initial distances for proximity glow calculation
    geo.setAttribute('initialDistance', new BufferAttribute(initialDistances, 1));
    return geo;
  }, []);

  const material = useMemo(
    () =>
      new PointsMaterial({
        size: 0.03,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      }),
    []
  );

  useFrame((state) => {
    if (!particlesRef.current || reducedMotion) return;
    const geometry = particlesRef.current.geometry as BufferGeometry;
    const positions = geometry.attributes.position.array as Float32Array;
    const sizes = geometry.attributes.size.array as Float32Array;
    const alphas = geometry.attributes.alpha?.array as Float32Array | undefined;
    const initialDistances = geometry.attributes.initialDistance.array as Float32Array;
    const time = clock.getElapsedTime();
    const camera = state.camera;

    // Camera position in world space
    const cameraPos = new Vector3();
    camera.getWorldPosition(cameraPos);

    // Create array of indices for depth sorting
    const indices = new Array(PARTICLE_COUNT).fill(0).map((_, i) => i);

    // First pass: update positions and compute camera distances
    const cameraDistances = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const phase = (i / PARTICLE_COUNT) * Math.PI * 8;

      positions[i3 + 1] += 0.002 * intensity;
      positions[i3] += Math.sin(time * 0.5 + phase) * 0.001 * intensity;
      positions[i3 + 2] += Math.cos(time * 0.3 + phase) * 0.001 * intensity;

      if (positions[i3 + 1] > 3) {
        positions[i3 + 1] = -1.5;
        const resetIdx = i * 6;
        positions[i3] = (particleRandomValues[resetIdx + 4] - 0.5) * 1.5;
        positions[i3 + 2] = (particleRandomValues[resetIdx + 5] - 0.5) * 1.5;
      }

      // Compute camera distance for depth sorting
      const dx = positions[i3] - cameraPos.x;
      const dy = positions[i3 + 1] - cameraPos.y;
      const dz = positions[i3 + 2] - cameraPos.z;
      cameraDistances[i] = dx * dx + dy * dy + dz * dz; // squared distance
    }

    // Sort indices by camera distance (far to near for correct alpha blending)
    indices.sort((a, b) => cameraDistances[b] - cameraDistances[a]);

    // Second pass: apply glow proximity response and update sorted attributes
    // We need to reorder the buffer attributes based on sorted indices
    const sortedPositions = new Float32Array(PARTICLE_COUNT * 3);
    const sortedSizes = new Float32Array(PARTICLE_COUNT);
    const sortedAlphas = alphas ? new Float32Array(PARTICLE_COUNT) : undefined;
    const sortedColors = new Float32Array(PARTICLE_COUNT * 3);
    const sortedInitialDistances = new Float32Array(PARTICLE_COUNT);

    for (let sortedIdx = 0; sortedIdx < PARTICLE_COUNT; sortedIdx++) {
      const i = indices[sortedIdx];
      const i3 = i * 3;
      const sortedI3 = sortedIdx * 3;

      // Copy position
      sortedPositions[sortedI3] = positions[i3];
      sortedPositions[sortedI3 + 1] = positions[i3 + 1];
      sortedPositions[sortedI3 + 2] = positions[i3 + 2];

      // Glow proximity response: modulate alpha/size by distance to bell center
      // Bell center is approximately at (0, 0, 0) - inner glow is at radius ~0.85
      const distToBell = initialDistances[i];
      // Proximity factor: 1.0 at center, fading to 0.3 at distance > 2.0
      const proximityFactor = Math.max(0.3, 1.0 - distToBell * 0.35);

      // Base size with time variation
      const baseSize = 0.02 + Math.sin(time * 2 + (i / PARTICLE_COUNT) * Math.PI * 8) * 0.01 * intensity;
      sortedSizes[sortedIdx] = baseSize * proximityFactor;

      if (alphas) {
        const baseAlpha = 0.3 + Math.sin(time * 1.5 + (i / PARTICLE_COUNT) * Math.PI * 8) * 0.2 * intensity;
        sortedAlphas![sortedIdx] = baseAlpha * proximityFactor;
      }

      // Copy color (slightly brighten near glow)
      const colorIdx = i * 3;
      const brightnessBoost = 1.0 + (1.0 - proximityFactor) * 0.2; // slight desaturation far from glow
      sortedColors[sortedI3] = Math.min(1.0, positions[colorIdx] * brightnessBoost);
      sortedColors[sortedI3 + 1] = Math.min(1.0, positions[colorIdx + 1] * brightnessBoost);
      sortedColors[sortedI3 + 2] = Math.min(1.0, positions[colorIdx + 2] * brightnessBoost);

      sortedInitialDistances[sortedIdx] = initialDistances[i];
    }

    // Update geometry with sorted data
    geometry.setAttribute('position', new BufferAttribute(sortedPositions, 3));
    geometry.setAttribute('size', new BufferAttribute(sortedSizes, 1));
    if (alphas && sortedAlphas) {
      geometry.setAttribute('alpha', new BufferAttribute(sortedAlphas, 1));
    }
    geometry.setAttribute('color', new BufferAttribute(sortedColors, 3));
    geometry.setAttribute('initialDistance', new BufferAttribute(sortedInitialDistances, 1));

    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.size.needsUpdate = true;
    if (alphas) geometry.attributes.alpha.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;
  });

  return <points ref={particlesRef} geometry={geometry} material={material} />;
}

// Main Jellyfish Scene
interface JellyfishSceneProps {
  intensity: number;
  reducedMotion: boolean;
}

// Pulsing point lights component (must be inside Canvas for useFrame)
function PulsingPointLights({ intensity, reducedMotion }: { intensity: number; reducedMotion: boolean }) {
  const pointLightTopRef = useRef<PointLight>(null);
  const pointLightBottomRef = useRef<PointLight>(null);

  useFrame(() => {
    if (reducedMotion) return;
    const t = performance.now() * 0.001 * 0.5 * intensity;
    const pulse = 1 + Math.sin(t * 0.7) * 0.15 * intensity;

    if (pointLightTopRef.current) {
      pointLightTopRef.current.intensity = 0.8 * pulse * intensity;
    }
    if (pointLightBottomRef.current) {
      pointLightBottomRef.current.intensity = 0.4 * pulse * intensity;
    }
  });

  return (
    <>
      <pointLight
        ref={pointLightTopRef}
        position={[0, 2, 2]}
        intensity={0.8}
        color="#ff2a3a"
        distance={10}
        decay={2}
      />
      <pointLight
        ref={pointLightBottomRef}
        position={[0, -1, 0]}
        intensity={0.4}
        color="#c01c28"
        distance={5}
        decay={2}
      />
    </>
  );
}

function JellyfishScene({ intensity, reducedMotion }: JellyfishSceneProps) {
  return (
    <group>
      <InnerGlow reducedMotion={reducedMotion} intensity={intensity} />

      <JellyfishBell reducedMotion={reducedMotion} intensity={intensity} />

      <group>
        {Array.from({ length: 12 }, (_, i) => (
          <Tentacle
            key={i}
            index={i}
            count={12}
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
            reducedMotion={reducedMotion}
            intensity={intensity * 0.5}
          />
        ))}
      </group>

      <Particles reducedMotion={reducedMotion} intensity={intensity} />

      <PulsingPointLights intensity={intensity} reducedMotion={reducedMotion} />

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

  // Pulse point lights in sync with inner glow (0.5 Hz)
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
    return <JellyfishFallback />;
  }

  return (
    <div className="relative h-full w-full" style={{ willChange: 'transform' }}>
      <Canvas
        camera={{ position: [0, 0.5, 3.5], fov: 35 }}
        gl={{
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: false,
          powerPreference: 'high-performance',
        }}
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

        {/* Environment cubemap removed — no /env/ assets. Procedural lighting suffices. */}
        {/* <Environment
          background={false}
          files={['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']}
          path="/env/"
          preset="studio"
        /> */}

        <JellyfishScene intensity={intensity} reducedMotion={reducedMotion} />

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
