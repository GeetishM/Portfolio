"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { TargetRole, roleConfigs } from "./data";

export interface NetworkNode {
  id: string;
  name: string;
  role: TargetRole;
  info: string;
}

export const NETWORK_NODES: NetworkNode[] = [
  { id: "edu", name: "B.Tech CSE (GPA 8.28)", role: "general", info: "BIT Durg · Graduating July 2026" },
  { id: "bsp", name: "Steel Plant Django Intern", role: "data", info: "Procurement systems · -60% delay" },
  { id: "matdar", name: "Me Matdar Flutter Intern", role: "flutter", info: "Live product optimization · -30% load" },
  { id: "astitva", name: "Astitva Digital Intern", role: "pm", info: "NGO digital transformation · 500+ impacted" },
  { id: "aurora", name: "Aurora RAG Core", role: "rag", info: "93.7% Relevancy · 29 languages" },
  { id: "resq", name: "ResQVision YOLOv8", role: "ml", info: "91% mAP accident tracker" },
  { id: "sarthi", name: "MindSarthi App", role: "flutter", info: "Gemini AI mental wellness app" }
];

export const NETWORK_CONNECTIONS = [
  { from: "edu", to: "bsp" },
  { from: "edu", to: "matdar" },
  { from: "edu", to: "sarthi" },
  { from: "bsp", to: "astitva" },
  { from: "astitva", to: "aurora" },
  { from: "matdar", to: "resq" },
  { from: "sarthi", to: "aurora" },
  { from: "sarthi", to: "resq" },
  { from: "aurora", to: "resq" }
];

// Aligns nodes to distinct layout schemes in real time
export function getNodePosition(nodeId: string, role: TargetRole): [number, number, number] {
  // 1. Constellation / Neural Net (General, ML, RAG)
  const defaultPositions: Record<string, [number, number, number]> = {
    edu: [-2.2, 1.2, 0],
    bsp: [-1.2, -0.6, 0.6],
    matdar: [-0.2, 1.6, -0.5],
    astitva: [0.8, 1.0, 0.4],
    aurora: [1.2, -0.8, 0.8],
    resq: [2.5, 0.6, -0.2],
    sarthi: [0.2, -1.5, -0.4],
  };

  // 2. Data Analyst (3D Scatter Grid / Coordinate Box representation)
  if (role === "data") {
    const positions: Record<string, [number, number, number]> = {
      edu: [-2.0, -1.0, -1.0],      // Data base
      bsp: [-1.0, 1.5, -0.5],      // High spike ( BSP -60% processing)
      matdar: [0.0, -0.2, 0.5],     // Mid point
      astitva: [0.6, 0.4, -0.2],    // Operations log
      aurora: [1.2, 0.8, 1.0],      // RAG precision point
      resq: [2.2, 1.6, -0.5],       // High spike (91% mAP CV model)
      sarthi: [0.5, -0.8, -1.0],    // Mobile data point
    };
    return positions[nodeId] || defaultPositions[nodeId];
  }

  // 3. SDE / Flutter (System Architecture circular dependancy ring)
  if (role === "flutter" || role === "sde") {
    const angles: Record<string, number> = {
      edu: 0,
      bsp: Math.PI / 3,
      matdar: (2 * Math.PI) / 3,
      astitva: Math.PI,
      aurora: (4 * Math.PI) / 3,
      resq: (5 * Math.PI) / 3,
      sarthi: (5.5 * Math.PI) / 3,
    };
    const angle = angles[nodeId] !== undefined ? angles[nodeId] : 0;
    const radius = 2.4;
    return [
      Math.cos(angle) * radius,
      Math.sin(angle) * radius * 0.75, // slightly squished height for 3D depth
      Math.sin(angle) * radius * 0.4,
    ];
  }

  // 4. Project Manager (Staircase chronological milestones timeline)
  if (role === "pm") {
    const positions: Record<string, [number, number, number]> = {
      edu: [-2.5, -1.6, -1.2],      // Step 1: Education
      sarthi: [-1.8, -1.0, -0.8],    // Step 2: MindSarthi App (2024)
      matdar: [-1.0, -0.4, -0.4],    // Step 3: Me Matdar Flutter (Jan 2025)
      bsp: [-0.2, 0.2, 0.0],         // Step 4: Django Intern BSP (May 2025)
      astitva: [0.6, 0.8, 0.4],      // Step 5: Astitva Digital Transformation (Jun 2025)
      resq: [1.4, 1.4, 0.8],         // Step 6: ResQVision YOLOv8 (Sep 2025)
      aurora: [2.2, 2.0, 1.2],       // Step 7: Aurora RAG Core (2026)
    };
    return positions[nodeId] || defaultPositions[nodeId];
  }

  return defaultPositions[nodeId] || [0, 0, 0];
}

function CameraController({ activeRole, focusedNode }: { activeRole: TargetRole; focusedNode: string | null }) {
  const targetPos = useMemo(() => new THREE.Vector3(0, 0, 5), []);
  const targetLook = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const currentLook = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  useEffect(() => {
    // Focus camera on the active selected node or role-relevant node
    const targetNodeId = focusedNode || NETWORK_NODES.find(n => n.role === activeRole && n.id !== "edu")?.id;
    if (targetNodeId) {
      const nodePos = getNodePosition(targetNodeId, activeRole);
      targetPos.set(nodePos[0] + 0.4, nodePos[1] - 0.15, nodePos[2] + 1.8);
      targetLook.set(nodePos[0], nodePos[1], nodePos[2]);
    } else {
      // General overview coordinate layout
      targetPos.set(0, 0, 4.6);
      targetLook.set(0, 0, 0);
    }
  }, [activeRole, focusedNode, targetPos, targetLook]);

  useFrame((state) => {
    state.camera.position.lerp(targetPos, 0.05);
    currentLook.lerp(targetLook, 0.05);
    state.camera.lookAt(currentLook);
  });

  return null;
}

function Synapse({ fromId, toId, activeRole, color }: { fromId: string; toId: string; activeRole: TargetRole; color: string }) {
  const targetFrom = useMemo(() => new THREE.Vector3(), []);
  const targetTo = useMemo(() => new THREE.Vector3(), []);
  
  const currentFrom = useRef(new THREE.Vector3());
  const currentTo = useRef(new THREE.Vector3());

  useEffect(() => {
    const fromP = getNodePosition(fromId, activeRole);
    const toP = getNodePosition(toId, activeRole);
    currentFrom.current.set(...fromP);
    currentTo.current.set(...toP);
  }, []);

  const line = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      opacity: 0.22,
      transparent: true,
      depthWrite: false,
    });
    return new THREE.Line(geometry, material);
  }, []);

  useEffect(() => {
    if (line.material instanceof THREE.LineBasicMaterial) {
      line.material.color.set(color);
    }
  }, [color, line]);

  useFrame(() => {
    const fromP = getNodePosition(fromId, activeRole);
    const toP = getNodePosition(toId, activeRole);
    
    targetFrom.set(...fromP);
    targetTo.set(...toP);
    
    currentFrom.current.lerp(targetFrom, 0.08);
    currentTo.current.lerp(targetTo, 0.08);
    
    const points = [currentFrom.current, currentTo.current];
    line.geometry.setFromPoints(points);
  });

  return <primitive object={line} />;
}

function Pulse({ fromId, toId, activeRole, color, seed }: { fromId: string; toId: string; activeRole: TargetRole; color: string; seed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const targetFrom = useMemo(() => new THREE.Vector3(), []);
  const targetTo = useMemo(() => new THREE.Vector3(), []);
  
  const currentFrom = useRef(new THREE.Vector3());
  const currentTo = useRef(new THREE.Vector3());

  useEffect(() => {
    const fromP = getNodePosition(fromId, activeRole);
    const toP = getNodePosition(toId, activeRole);
    currentFrom.current.set(...fromP);
    currentTo.current.set(...toP);
  }, []);

  const speed = useMemo(() => 0.22 + seed * 0.25, [seed]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const fromP = getNodePosition(fromId, activeRole);
    const toP = getNodePosition(toId, activeRole);
    
    targetFrom.set(...fromP);
    targetTo.set(...toP);
    
    currentFrom.current.lerp(targetFrom, 0.08);
    currentTo.current.lerp(targetTo, 0.08);

    const t = (state.clock.getElapsedTime() * speed + seed) % 1.0;
    meshRef.current.position.lerpVectors(currentFrom.current, currentTo.current, t);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.045, 8, 8]} />
      <meshBasicMaterial color={color} opacity={0.7} transparent depthWrite={false} />
    </mesh>
  );
}

interface NodeProps {
  node: NetworkNode;
  activeRole: TargetRole;
  isFocused: boolean;
  onSelect: (id: string) => void;
  accent: string;
}

function Node({ node, activeRole, isFocused, onSelect, accent }: NodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "default";
    return () => { document.body.style.cursor = "default"; };
  }, [hovered]);

  const isRoleMatch = node.role === activeRole;
  const size = isFocused ? 0.22 : hovered ? 0.17 : isRoleMatch ? 0.14 : 0.11;
  const targetPos = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    if (!groupRef.current || !meshRef.current) return;
    
    const tPos = getNodePosition(node.id, activeRole);
    targetPos.set(...tPos);
    groupRef.current.position.lerp(targetPos, 0.08);

    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
    meshRef.current.scale.lerp(new THREE.Vector3(size, size, size), 0.12);

    if (glowRef.current) {
      const glowScale = size * 1.55;
      glowRef.current.scale.lerp(new THREE.Vector3(glowScale, glowScale, glowScale), 0.12);
      glowRef.current.rotation.z = -state.clock.getElapsedTime() * 0.2;
    }
  });

  const nodeColor = isFocused ? "#10b981" : isRoleMatch ? accent : "#4b5563";

  return (
    <group ref={groupRef}>
      {/* Halo outer selection ring */}
      {(isFocused || hovered) && (
        <mesh ref={glowRef}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshBasicMaterial
            color={nodeColor}
            wireframe
            opacity={0.25}
            transparent
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Core Node Sphere */}
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onSelect(node.id); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color={nodeColor}
          emissive={nodeColor}
          emissiveIntensity={isFocused || hovered ? 0.7 : 0.18}
          roughness={0.15}
          metalness={0.85}
        />
      </mesh>
    </group>
  );
}

// Drifting ambient particle background
function AmbientParticles({ color, role }: { color: string; role: TargetRole }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 180;

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
      spd[i] = 0.15 + Math.random() * 0.45;
    }
    return [pos, spd];
  }, []);

  const speedScale = useMemo(() => {
    if (role === "ml") return 2.2;
    if (role === "data") return 0.7;
    if (role === "pm") return 0.55;
    return 1.0;
  }, [role]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    
    if (posAttr) {
      const arr = posAttr.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const idx = i * 3;
        // Float particles upwards
        arr[idx + 1] += speeds[i] * 0.004 * speedScale;
        
        // Add horizontal sway
        arr[idx] += Math.sin(time * speeds[i] + i) * 0.002;

        // Reset if drifted too far high
        if (arr[idx + 1] > 3) {
          arr[idx + 1] = -3;
          arr[idx] = (Math.random() - 0.5) * 8;
        }
      }
      posAttr.needsUpdate = true;
    }
    pointsRef.current.rotation.y = time * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color={color}
        transparent
        opacity={0.4}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

interface ThreeNeuralNetworkProps {
  activeRole: TargetRole;
  focusedNode: string | null;
  onSelectNode: (id: string | null) => void;
}

export default function ThreeNeuralNetwork({ activeRole, focusedNode, onSelectNode }: ThreeNeuralNetworkProps) {
  const accent = roleConfigs[activeRole].accent;

  const synapses = useMemo(() => {
    return NETWORK_CONNECTIONS.map((c, i) => {
      const fromNode = NETWORK_NODES.find(n => n.id === c.from);
      const toNode = NETWORK_NODES.find(n => n.id === c.to);
      if (!fromNode || !toNode) return null;
      return (
        <group key={i}>
          <Synapse fromId={fromNode.id} toId={toNode.id} activeRole={activeRole} color={accent} />
          <Pulse fromId={fromNode.id} toId={toNode.id} activeRole={activeRole} color={accent} seed={i * 0.11} />
        </group>
      );
    });
  }, [accent, activeRole]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        opacity: 0.85
      }}
      onClick={() => onSelectNode(null)}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.4} />
        
        {synapses}
        
        {NETWORK_NODES.map(node => (
          <Node
            key={node.id}
            node={node}
            activeRole={activeRole}
            isFocused={focusedNode === node.id}
            onSelect={onSelectNode}
            accent={accent}
          />
        ))}

        <AmbientParticles color={accent} role={activeRole} />
        
        <CameraController activeRole={activeRole} focusedNode={focusedNode} />
      </Canvas>
    </div>
  );
}
