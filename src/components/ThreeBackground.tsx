"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ color }: { color: string }) {
  const pointsRef = useRef<THREE.Points>(null);
  const tempColor = useMemo(() => new THREE.Color(), []);

  // Generate particles in a beautiful spherical network shape
  const count = 380;
  const [positions, speeds, originalPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.0 + Math.random() * 0.9; // Radius between 2.0 and 2.9
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;

      spd[i] = 0.2 + Math.random() * 0.8;
    }
    return [pos, spd, orig];
  }, []);

  // Generate vertex colors based on the role accent
  const colorAttribute = useMemo(() => {
    const cols = new Float32Array(count * 3);
    const c = new THREE.Color(color);
    for (let i = 0; i < count; i++) {
      cols[i * 3] = c.r;
      cols[i * 3 + 1] = c.g;
      cols[i * 3 + 2] = c.b;
    }
    return cols;
  }, [color]);

  const geomRef = useRef<THREE.BufferGeometry>(null);

  // Transition color smoothly when the theme changes
  useEffect(() => {
    if (geomRef.current) {
      const colorsAttr = geomRef.current.getAttribute("color") as THREE.BufferAttribute;
      if (colorsAttr) {
        const c = tempColor.set(color);
        const array = colorsAttr.array as Float32Array;
        // Smoothly interpolate current color towards the target
        let step = 0;
        const interval = setInterval(() => {
          step++;
          const t = step / 15;
          for (let i = 0; i < count; i++) {
            const currentR = array[i * 3];
            const currentG = array[i * 3 + 1];
            const currentB = array[i * 3 + 2];
            
            array[i * 3]     = currentR + (c.r - currentR) * t;
            array[i * 3 + 1] = currentG + (c.g - currentG) * t;
            array[i * 3 + 2] = currentB + (c.b - currentB) * t;
          }
          colorsAttr.needsUpdate = true;
          if (step >= 15) clearInterval(interval);
        }, 30);

        return () => clearInterval(interval);
      }
    }
  }, [color, tempColor]);

  // Track mouse coordinates normalized between -1 and 1
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Dynamic frame loop
  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Slow rotational drifting
    pointsRef.current.rotation.y = time * 0.05;
    pointsRef.current.rotation.x = time * 0.02;

    // Follow mouse coordinates with smooth damping
    pointsRef.current.position.x += (mouse.current.x * 0.4 - pointsRef.current.position.x) * 0.03;
    pointsRef.current.position.y += (mouse.current.y * 0.4 - pointsRef.current.position.y) * 0.03;

    // Wave-like ripple effect
    const positionsAttr = pointsRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    if (positionsAttr) {
      const arr = positionsAttr.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const idx = i * 3;
        // Calculate offset using coordinate functions
        const wave = Math.sin(time * speeds[i] * 1.2 + originalPositions[idx]) * 0.004;
        arr[idx] = originalPositions[idx] + wave * Math.sin(time);
        arr[idx + 1] = originalPositions[idx + 1] + wave * Math.cos(time);
        arr[idx + 2] = originalPositions[idx + 2] + wave;
      }
      positionsAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colorAttribute, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ThreeBackground({ color = "#8b5cf6" }: { color?: string }) {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.8 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <Particles color={color} />
      </Canvas>
    </div>
  );
}
