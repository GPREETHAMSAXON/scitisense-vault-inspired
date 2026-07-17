"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { RootState } from "@react-three/fiber";
import * as THREE from "three";

// ─── Constants ────────────────────────────────────────────────────────────────
const N            = 400;
const HOLD_SECS    = 12;
const MORPH_SECS   = 5;
const CONN_DIST    = 0.6;
const CONN_POOL    = 150;
const MAX_LINES    = 6000;

// ─── Easing ───────────────────────────────────────────────────────────────────
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ─── Shape generators ─────────────────────────────────────────────────────────
function networkShape(): Float32Array {
  const p = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.acos(2 * Math.random() - 1);
    const r     = 4 * Math.cbrt(Math.random());
    p[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    p[i * 3 + 2] = r * Math.cos(phi);
  }
  return p;
}

function brainShape(): Float32Array {
  const p = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const cx    = Math.random() < 0.5 ? -1.2 : 1.2;
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.acos(2 * Math.random() - 1);
    const r     = 1.8 * Math.cbrt(Math.random());
    p[i * 3]     = cx + r * Math.sin(phi) * Math.cos(theta);
    p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    p[i * 3 + 2] = r * Math.cos(phi) * 0.7;
  }
  return p;
}

function circuitShape(): Float32Array {
  const all: [number, number, number][] = [];
  for (let xi = 0; xi < 12; xi++)
    for (let yi = 0; yi < 12; yi++)
      for (let zi = 0; zi < 6; zi++)
        all.push([(xi - 5.5) * 0.7, (yi - 5.5) * 0.7, (zi - 2.5) * 0.5]);

  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }

  const p = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    p[i * 3]     = all[i][0];
    p[i * 3 + 1] = all[i][1];
    p[i * 3 + 2] = all[i][2];
  }
  return p;
}

function makeColors(): Float32Array {
  const colors = new Float32Array(N * 3);
  const bs  = new THREE.Color("#C2761A"); // butterscotch 60%
  const nav = new THREE.Color("#14213D"); // navy         25%
  const amb = new THREE.Color("#E0941F"); // amber        15%
  for (let i = 0; i < N; i++) {
    const rng = Math.random();
    const c   = rng < 0.6 ? bs : rng < 0.85 ? nav : amb;
    colors[i * 3]     = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  return colors;
}

// ─── ParticleField ────────────────────────────────────────────────────────────
function ParticleField() {
  const { gl, size } = useThree();

  // Pre-compute all three shapes (stable across renders)
  const shapes = useMemo<Float32Array[]>(() => [networkShape(), brainShape(), circuitShape()], []);

  // Live position buffer (written into every frame during morph)
  const current = useMemo<Float32Array>(() => new Float32Array(shapes[0]), [shapes]);

  // Colors (static)
  const colors = useMemo<Float32Array>(makeColors, []);

  // Pre-allocated line position buffer
  const lineBuffer = useMemo<Float32Array>(() => new Float32Array(MAX_LINES * 6), []);

  // Three.js geometries — created once
  const pointsGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(current, 3));
    geo.setAttribute("color",    new THREE.BufferAttribute(colors,  3));
    return geo;
  }, [current, colors]);

  const linesGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(lineBuffer, 3));
    geo.setDrawRange(0, 0);
    return geo;
  }, [lineBuffer]);

  // Refs for scene objects
  const groupRef  = useRef<THREE.Group>(null!);

  // Mutable state stored in refs (no re-renders)
  const mouse     = useRef({ x: 0, y: 0 });
  const autoRotY  = useRef(0);
  const frameRef  = useRef(0);
  const morph     = useRef({
    from:    0,
    to:      1,
    t:       0,
    elapsed: 0,
    phase:   "hold" as "hold" | "morph",
  });

  // Mouse tracking via the WebGL canvas DOM element
  useEffect(() => {
    const canvas = gl.domElement;
    const onMove = (e: MouseEvent) => {
      const rect   = canvas.getBoundingClientRect();
      mouse.current.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      mouse.current.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
    };
    canvas.addEventListener("mousemove", onMove, { passive: true });
    return () => canvas.removeEventListener("mousemove", onMove);
  }, [gl.domElement]);

  useFrame((_state: RootState, delta: number) => {
    if (!groupRef.current) return;

    frameRef.current++;
    const m = morph.current;
    m.elapsed += delta;

    // ── Morph state machine ──────────────────────────────────────────────────
    if (m.phase === "hold") {
      if (m.elapsed >= HOLD_SECS) {
        m.phase   = "morph";
        m.elapsed = 0;
        m.t       = 0;
        m.from    = m.to;
        m.to      = (m.to + 1) % 3;
      }
    } else {
      m.t        = Math.min(m.elapsed / MORPH_SECS, 1);
      const e    = easeInOutCubic(m.t);
      const from = shapes[m.from];
      const to   = shapes[m.to];
      for (let i = 0; i < N * 3; i++) {
        current[i] = from[i] + (to[i] - from[i]) * e;
      }
      if (m.t >= 1) {
        current.set(shapes[m.to]);
        m.phase   = "hold";
        m.elapsed = 0;
      }
    }

    // Update particle positions
    (pointsGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;

    // ── Connection lines (every 3rd frame, desktop only) ─────────────────────
    const isMobile = size.width < 768;
    if (frameRef.current % 3 === 0 && !isMobile) {
      let lineCount = 0;
      const dist2   = CONN_DIST * CONN_DIST;
      for (let i = 0; i < CONN_POOL; i++) {
        for (let j = i + 1; j < CONN_POOL; j++) {
          if (lineCount >= MAX_LINES) break;
          const dx = current[i * 3]     - current[j * 3];
          const dy = current[i * 3 + 1] - current[j * 3 + 1];
          const dz = current[i * 3 + 2] - current[j * 3 + 2];
          if (dx * dx + dy * dy + dz * dz < dist2) {
            const b = lineCount * 6;
            lineBuffer[b]     = current[i * 3];
            lineBuffer[b + 1] = current[i * 3 + 1];
            lineBuffer[b + 2] = current[i * 3 + 2];
            lineBuffer[b + 3] = current[j * 3];
            lineBuffer[b + 4] = current[j * 3 + 1];
            lineBuffer[b + 5] = current[j * 3 + 2];
            lineCount++;
          }
        }
      }
      (linesGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      linesGeo.setDrawRange(0, lineCount * 2);
    }

    // ── Group rotation — mouse influence + auto spin ─────────────────────────
    autoRotY.current += 0.0003;
    const targetY = mouse.current.x * 0.3 + autoRotY.current;
    const targetX = -mouse.current.y * 0.3;
    const g       = groupRef.current;
    g.rotation.y += (targetY - g.rotation.y) * 0.008;
    g.rotation.x += (targetX - g.rotation.x) * 0.008;
  });

  return (
    <group ref={groupRef}>
      <points geometry={pointsGeo}>
        <pointsMaterial
          size={0.018}
          vertexColors
          transparent
          opacity={0.35}
          sizeAttenuation
        />
      </points>
      <lineSegments geometry={linesGeo}>
        <lineBasicMaterial color="#C2761A" transparent opacity={0.03} />
      </lineSegments>
    </group>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export default function WebGLBackground({ noMotion }: { noMotion: boolean }) {
  const creamBg: React.CSSProperties = {
    position: "absolute",
    inset:    0,
    background: "linear-gradient(160deg, #FBF3E7 0%, #F4E8D5 60%, #FBF3E7 100%)",
  };

  if (noMotion) return <div style={creamBg} />;

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
      {/* Base cream gradient — visible behind the semi-transparent canvas */}
      <div style={creamBg} />

      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        style={{
          position: "absolute",
          inset:    0,
          width:    "100%",
          height:   "100%",
          opacity:  0.35,
        }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ParticleField />
      </Canvas>
    </div>
  );
}
