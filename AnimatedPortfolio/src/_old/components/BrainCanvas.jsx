import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Procedural 3D Brain Particle Cloud with Hemispheres, Lobes & Nodes
const BrainParticleCloud = ({ mousePos }) => {
  const pointsRef = useRef();
  const nodesRef = useRef();

  // Generate brain particle coordinates
  const { positions, colors, nodePositions } = useMemo(() => {
    const count = 1800;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    // Two hemispheres: left (-1) and right (+1)
    let idx = 0;
    for (let i = 0; i < count; i++) {
      const hemisphere = Math.random() > 0.5 ? 1 : -1;

      // Parametric ellipsoid with indentation & lobes
      const u = Math.random() * Math.PI; // latitude
      const v = Math.random() * Math.PI * 2; // longitude
      const r = 0.85 + Math.random() * 0.35;

      // Brain shape offsets: slightly longer in z, split in x
      let x = r * Math.sin(u) * Math.sin(v) * 0.95;
      let y = r * Math.cos(u) * 0.85;
      let z = r * Math.sin(u) * Math.cos(v) * 1.25;

      // Separate hemispheres along x
      x = x + hemisphere * 0.35;

      // Cerebellum / brainstem slight taper at bottom
      if (y < -0.3) {
        x *= 0.7;
        z = z * 0.85 - 0.2;
      }

      pos[idx * 3 + 0] = x;
      pos[idx * 3 + 1] = y + 0.1;
      pos[idx * 3 + 2] = z;

      // White to pale cyan/grey gradient
      const brightness = 0.55 + Math.random() * 0.45;
      col[idx * 3 + 0] = brightness;
      col[idx * 3 + 1] = brightness * 0.96;
      col[idx * 3 + 2] = brightness * (0.95 + (hemisphere > 0 ? 0.05 : 0));

      idx++;
    }

    // Key synaptic nodes (larger glowing points)
    const nodeCount = 36;
    const nPos = new Float32Array(nodeCount * 3);
    for (let j = 0; j < nodeCount; j++) {
      const randIdx = Math.floor(Math.random() * count);
      nPos[j * 3 + 0] = pos[randIdx * 3 + 0] * 1.02;
      nPos[j * 3 + 1] = pos[randIdx * 3 + 1] * 1.02;
      nPos[j * 3 + 2] = pos[randIdx * 3 + 2] * 1.02;
    }

    return { positions: pos, colors: col, nodePositions: nPos };
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    if (pointsRef.current) {
      // Continuous slow rotation
      pointsRef.current.rotation.y += delta * 0.35;
      // Mouse reaction tilt
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(
        pointsRef.current.rotation.x,
        (mousePos?.y || 0) * 0.3 + 0.15,
        0.05
      );
      pointsRef.current.rotation.z = THREE.MathUtils.lerp(
        pointsRef.current.rotation.z,
        -(mousePos?.x || 0) * 0.2,
        0.05
      );
    }

    if (nodesRef.current) {
      nodesRef.current.rotation.y = pointsRef.current.rotation.y;
      nodesRef.current.rotation.x = pointsRef.current.rotation.x;
      nodesRef.current.rotation.z = pointsRef.current.rotation.z;

      // Pulse nodes intensity
      const pulse = 0.6 + Math.sin(time * 3) * 0.35;
      nodesRef.current.material.opacity = pulse;
    }
  });

  return (
    <group position={[0, 0.4, 0]}>
      {/* Primary Brain Point Cloud */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          vertexColors
          transparent
          opacity={0.82}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Pulsing Synaptic Nodes */}
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.11}
          color="#ffffff"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
};

// Stacked Translucent Glass Layers that float slowly beneath the brain
const FloatingGlassLayers = () => {
  const layer1 = useRef();
  const layer2 = useRef();
  const layer3 = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (layer1.current) {
      layer1.current.position.y = -1.1 + Math.sin(t * 1.2) * 0.04;
      layer1.current.rotation.z = Math.sin(t * 0.6) * 0.02;
    }
    if (layer2.current) {
      layer2.current.position.y = -1.35 + Math.sin(t * 1.2 + 0.8) * 0.05;
      layer2.current.rotation.z = -Math.sin(t * 0.5) * 0.03;
    }
    if (layer3.current) {
      layer3.current.position.y = -1.6 + Math.sin(t * 1.2 + 1.6) * 0.06;
      layer3.current.rotation.z = Math.sin(t * 0.7) * 0.02;
    }
  });

  return (
    <group>
      {/* Top Glass Sheet */}
      <mesh ref={layer1} position={[0, -1.1, 0]} rotation={[-Math.PI / 2.3, 0, 0]}>
        <planeGeometry args={[2.8, 2.2]} />
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Middle Glass Sheet */}
      <mesh ref={layer2} position={[0, -1.35, 0]} rotation={[-Math.PI / 2.3, 0, 0]}>
        <planeGeometry args={[3.4, 2.6]} />
        <meshBasicMaterial
          color="#a1a1aa"
          wireframe
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Bottom Glass Sheet */}
      <mesh ref={layer3} position={[0, -1.6, 0]} rotation={[-Math.PI / 2.3, 0, 0]}>
        <planeGeometry args={[4.0, 3.0]} />
        <meshBasicMaterial
          color="#52525b"
          wireframe
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

const BrainCanvas = ({ mousePos }) => {
  return (
    <div className="w-full h-full relative pointer-events-none select-none">
      <Canvas
        camera={{ position: [0, 0.2, 4.4], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      >
        <ambientLight intensity={0.5} />
        <BrainParticleCloud mousePos={mousePos} />
        <FloatingGlassLayers />
      </Canvas>
    </div>
  );
};

export default BrainCanvas;

