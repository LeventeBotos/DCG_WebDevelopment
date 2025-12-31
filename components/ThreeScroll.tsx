// app/components/ServicesFullScreenScroll.tsx
"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Box3,
  MathUtils,
  MeshBasicMaterial,
  Vector3,
  type Group,
  type Mesh,
} from "three";
import { GLTFLoader, type GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { servicesBySlug } from "@/lib/services";
import { Button } from "@/components/ui/button";

type DemoService = {
  slug: string;
  title: string;
  body: string;
};

type SceneCamera = {
  position: [number, number, number];
  fov?: number;
};

type ServiceVisualConfig = {
  slug: string;
  visualFile?: string;
  camera?: SceneCamera;
  targetSize?: number;
  baseRotation?: [number, number, number];
  rotateTurns?: number;
};

type ServiceCard = DemoService & {
  visual: ServiceVisualConfig;
};

const WIRE_COLOR = "#009aca";
const WIRE_OPACITY = 0.25;

const SERVICE_VISUALS: ServiceVisualConfig[] = [
  {
    slug: "digital-twin",
    visualFile: "/oilrig.obj",
    camera: { position: [8, 5, 10], fov: 70 },
    targetSize: 15,
    baseRotation: [-0.1, MathUtils.degToRad(20), 0],
    rotateTurns: 1.15,
  },
  {
    slug: "deep-learning",
    visualFile: "/nn_visualization.obj",
    camera: { position: [6, 4, 8], fov: 70 },
    targetSize: 12,
    baseRotation: [-0.1, MathUtils.degToRad(20), 0],
    rotateTurns: 1.0,
  },
  {
    slug: "computer-vision",
    visualFile: "/computervision.obj",
    camera: { position: [8, 5, 10], fov: 70 },
    targetSize: 15,
    baseRotation: [-0.1, MathUtils.degToRad(20), 0],
    rotateTurns: 1.1,
  },
];

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

function clampInt(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

function useScrollProgress(
  containerRef: React.RefObject<HTMLDivElement | null>
) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const tick = () => {
      raf = window.requestAnimationFrame(tick);

      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight || 1;

      const totalScrollable = el.offsetHeight - viewportH;
      const scrolled = -rect.top;

      const p = totalScrollable <= 1 ? 0 : scrolled / totalScrollable;
      setProgress(clamp01(p));
    };

    tick();
    return () => window.cancelAnimationFrame(raf);
  }, [containerRef]);

  return progress;
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[6, 10, 6]} intensity={1} />
      <pointLight position={[-6, -4, -6]} intensity={0.45} color={WIRE_COLOR} />
    </>
  );
}

function SceneShell({
  camera,
  children,
}: React.PropsWithChildren<{
  camera: SceneCamera;
}>) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: camera.position, fov: camera.fov ?? 45 }}
      className="h-full w-full"
    >
      <SceneLights />
      {children}
    </Canvas>
  );
}

function convertMeshesToWireframe(scene: Group) {
  scene.traverse((child) => {
    if ((child as Mesh).isMesh) {
      const mesh = child as Mesh;
      if (!mesh.geometry) return;

      const originalMaterials = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];

      originalMaterials.forEach((material) => {
        if (material && "dispose" in material) {
          (material as unknown as { dispose: () => void }).dispose();
        }
      });

      mesh.material = new MeshBasicMaterial({
        color: WIRE_COLOR,
        wireframe: true,
        transparent: WIRE_OPACITY < 1,
        opacity: WIRE_OPACITY,
      });
    }
  });
}

function normalizeModel(
  scene: Group,
  targetSize: number,
  baseRotation?: [number, number, number]
) {
  const box = new Box3().setFromObject(scene);
  const size = new Vector3();
  const center = new Vector3();
  box.getSize(size);
  box.getCenter(center);

  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = targetSize / maxDim;

  scene.scale.setScalar(scale);
  scene.position.sub(center.multiplyScalar(scale));

  if (baseRotation) scene.rotation.set(...baseRotation);

  convertMeshesToWireframe(scene);
  return scene;
}

function WireframeModel({
  fileName,
  targetSize = 8,
  baseRotation,
  rotateTurns = 1,
  onError,
  scrollT,
}: {
  fileName: string;
  targetSize?: number;
  baseRotation?: [number, number, number];
  rotateTurns?: number;
  onError: () => void;

  scrollT: number;
}) {
  const groupRef = useRef<Group>(null);
  const [scene, setScene] = useState<Group | null>(null);

  useEffect(() => {
    let cancelled = false;

    const isObj = fileName.toLowerCase().endsWith(".obj");
    const loader = isObj ? new OBJLoader() : new GLTFLoader();
    if (!isObj) (loader as GLTFLoader).setResourcePath("/");

    loader.load(
      fileName,
      (loaded) => {
        if (cancelled) return;

        const root =
          "scene" in loaded ? (loaded as GLTF).scene : (loaded as Group);

        const prepared = normalizeModel(root, targetSize, baseRotation);
        setScene(prepared);
      },
      undefined,
      () => {
        if (!cancelled) onError();
      }
    );

    return () => {
      cancelled = true;
    };
  }, [fileName, targetSize, baseRotation, onError]);

  useFrame(() => {
    const g = groupRef.current;
    if (!g) return;

    const t = scrollT;

    g.position.y = MathUtils.lerp(-1.35, 1.35, t);
    g.position.x = 0.55;

    const yRot = MathUtils.degToRad(360) * rotateTurns * t;
    g.rotation.y = yRot;

    g.rotation.x = MathUtils.lerp(0.1, 0.55, t);
  });

  if (!scene) return null;

  return (
    <group ref={groupRef} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

function ServiceVisual({
  visual,
  scrollT,
}: {
  visual: ServiceVisualConfig;
  scrollT: number;
}) {
  const [hasError, setHasError] = useState(false);
  const camera = visual.camera ?? { position: [6, 4, 8], fov: 55 };

  if (hasError || !visual.visualFile) {
    return (
      <SceneShell camera={{ position: [2.8, 1.8, 3.2], fov: 45 }}>
        <mesh>
          <boxGeometry args={[1.8, 1.8, 1.8]} />
          <meshBasicMaterial
            color={WIRE_COLOR}
            wireframe
            transparent={WIRE_OPACITY < 1}
            opacity={WIRE_OPACITY}
          />
        </mesh>
      </SceneShell>
    );
  }

  return (
    <SceneShell camera={camera}>
      <WireframeModel
        fileName={visual.visualFile}
        targetSize={visual.targetSize}
        baseRotation={visual.baseRotation}
        rotateTurns={visual.rotateTurns}
        onError={() => setHasError(true)}
        scrollT={scrollT}
      />
    </SceneShell>
  );
}

export default function ServicesFullScreenScroll() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(wrapRef);

  const services = useMemo(() => {
    return SERVICE_VISUALS.map((visual) => {
      const svc = servicesBySlug[visual.slug];
      if (!svc) return null;

      return {
        slug: visual.slug,
        title: svc.title,
        body: svc.summary ?? svc.intro ?? "",
        visual,
      };
    }).filter(Boolean) as ServiceCard[];
  }, []);

  const total = services.length || 1;

  const scaled = progress * total;
  const activeIndex = clampInt(Math.floor(scaled), 0, total - 1);
  const segT = scaled - Math.floor(scaled);

  const active = services[activeIndex];
  if (!active) return null;

  return (
    <section className="w-full bg-black">
      <div ref={wrapRef} className="relative">
        <div className="relative h-[320vh]">
          <div className="sticky top-0 h-screen w-full">
            <div className="mx-auto grid h-full max-w-6xl grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-2">
              <div className="relative">
                <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-[0.15em] text-white/70">
                  <span>Service</span>
                  <span className="opacity-70">{activeIndex + 1} of 27</span>
                </div>

                <div className="mt-7">
                  <h2 className="font-sans text-[clamp(40px,5vw,80px)] font-bold leading-none tracking-[-0.03em] text-white">
                    {active.title}
                  </h2>

                  <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                    {active.body}
                  </p>

                  <div className="mt-7 flex items-center gap-4">
                    <Link
                      href={`/services/${active.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 underline-offset-4 transition hover:text-white hover:underline"
                    >
                      View this service →
                    </Link>
                  </div>

                  <div className="mt-8 flex gap-2">
                    {services.map((_, i) => (
                      <div
                        key={i}
                        className="h-2 rounded-full bg-white transition-all"
                        style={{
                          width: i === activeIndex ? 30 : 10,
                          opacity: i === activeIndex ? 0.9 : 0.25,
                        }}
                      />
                    ))}
                  </div>

                  <div className="mt-6 text-xs text-white/45">
                    Scroll to move and rotate the model
                  </div>
                </div>
              </div>

              <div className="relative h-[78vh] w-full">
                <ServiceVisual visual={active.visual} scrollT={segT} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center text-white bg-black pb-12 pt-8">
          <Button asChild variant="secondary" size="lg">
            <Link href="/services">Explore all services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
