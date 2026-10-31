'use client';

import React, { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Download, Heart, X } from 'lucide-react';
import { imageAssets } from '@/config/assets.config';

function Starfield() {
  const pointsRef = useRef();
  const particleCount = 3000;

  const [positions] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 1200;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 1200;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1200;
    }
    return [pos];
  }, [particleCount]);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.00015;
      pointsRef.current.rotation.x += 0.00008;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1.2}
        color="#ffffff"
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
}

function Card3DItem({ card, position, onSelect }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ camera }) => {
    if (groupRef.current) {
      groupRef.current.lookAt(camera.position);
    }
  });

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      {/* Invisible hit plane */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelect(card);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <planeGeometry args={[4.5, 6]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <Html
        transform
        distanceFactor={10}
        position={[0, 0, 0.01]}
        style={{
          transition: "all 0.3s ease",
          transform: hovered ? "scale(1.15)" : "scale(1)",
          pointerEvents: "none"
        }}
      >
        <div
          className="w-40 h-52 rounded-lg overflow-hidden shadow-2xl bg-[#1F2121] p-3 select-none"
          style={{
            boxShadow: hovered
              ? "0 25px 50px rgba(49, 184, 198, 0.5), 0 0 30px rgba(49, 184, 198, 0.3)"
              : "0 15px 30px rgba(0, 0, 0, 0.6)",
            border: hovered
              ? "2px solid rgba(49, 184, 198, 0.5)"
              : "1px solid rgba(255, 255, 255, 0.1)"
          }}
        >
          <img
            src={card.imageUrl || "/placeholder.svg"}
            alt={card.alt}
            className="w-full h-40 object-cover rounded-md pointer-events-none"
            loading="lazy"
            draggable={false}
          />
          <div className="mt-1 text-center">
            <p className="text-white text-xs font-medium truncate">
              {card.title}
            </p>
          </div>
        </div>
      </Html>
    </group>
  );
}

function SphereGallery({ cards, onSelectCard }) {
  const positions = useMemo(() => {
    const list = [];
    const count = cards.length;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = (2 * Math.PI * i) / goldenRatio;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      const dist = 14 + (i % 3) * 3;

      list.push({
        x: x * dist,
        y: y * dist,
        z: z * dist
      });
    }
    return list;
  }, [cards.length]);

  return (
    <>
      {/* Wireframe reference spheres */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color="#1a1a2e" transparent opacity={0.15} wireframe />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[14, 32, 32]} />
        <meshStandardMaterial color="#31b8c6" transparent opacity={0.05} wireframe />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[18, 32, 32]} />
        <meshStandardMaterial color="#31b8c6" transparent opacity={0.03} wireframe />
      </mesh>

      {cards.map((card, idx) => (
        <Card3DItem
          key={card.id}
          card={card}
          position={positions[idx]}
          onSelect={onSelectCard}
        />
      ))}
    </>
  );
}

function CardDetailModal({ card, onClose }) {
  const [favorited, setFavorited] = useState(false);
  if (!card) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative max-w-sm w-full bg-[#18191a] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="overflow-hidden rounded-xl shadow-lg border border-white/10 mb-5">
          <img
            src={card.imageUrl}
            alt={card.alt}
            className="w-full h-72 object-cover"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white tracking-wide">
              {card.title}
            </h3>
            <p className="text-xs text-cyan-400 font-mono mt-0.5">
              3D Memory Capsule
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={card.imageUrl}
              download
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#31b8c6] text-black font-medium text-xs hover:opacity-90 active:scale-95 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save</span>
            </a>
            <button
              onClick={() => setFavorited(!favorited)}
              className="p-2 rounded-lg bg-[#31b8c6] text-black hover:opacity-90 active:scale-95 transition-all"
            >
              <Heart
                className="w-4 h-4"
                fill={favorited ? "currentColor" : "none"}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ThreeDSection() {
  const [mounted, setMounted] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '200px 0px' }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [mounted]);

  if (!mounted) {
    return <div className="w-full h-screen bg-black" />;
  }

  return (
    <div ref={containerRef} className="w-full h-screen relative overflow-hidden bg-black select-none">
      {/* 3D Canvas */}
      <Canvas
        frameloop={isInView ? "always" : "never"}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 16], fov: 60 }}
        className="absolute inset-0 z-10"
        style={{ touchAction: 'pan-y' }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.9} />
          <directionalLight position={[10, 10, 10]} intensity={1.2} />
          <pointLight position={[-10, -10, -10]} intensity={0.6} />

          <Starfield />
          <SphereGallery cards={imageAssets.universe} onSelectCard={setSelectedCard} />

          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate
            enableDamping
            dampingFactor={0.05}
            minDistance={6}
            maxDistance={40}
            autoRotate={false}
            rotateSpeed={0.5}
            target={[0, 0, 0]}
          />
        </Suspense>
      </Canvas>

      {/* Floating UI overlay */}
      <div className="absolute top-8 left-8 z-20 pointer-events-none">
        <h2 className="text-white font-bold text-2xl tracking-wider drop-shadow-md">
          3D MEMORY GALAXY
        </h2>
        <p className="text-cyan-400 font-mono text-xs mt-1">
          Drag to rotate the galaxy · Click any card to inspect
        </p>
      </div>

      {selectedCard && (
        <CardDetailModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </div>
  );
}
