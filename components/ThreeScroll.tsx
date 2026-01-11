// app/components/ServicesFullScreenScrollPerf.tsx
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
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "./ui/button";

const MOBILE_NAV_HEIGHT = 72;
const MOBILE_BOTTOM_BAR_HEIGHT = 72;

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

type ServiceCard = {
  slug: string;
  title: string;
  body: string;
  visual: ServiceVisualConfig;
};

const WIRE_COLOR = "#009aca";
const WIRE_OPACITY = 0.25;

const SERVICE_VISUALS: ServiceVisualConfig[] = [
  {
    slug: "digital-twin",
    visualFile: "/dl_network.obj",
    camera: { position: [8, 5, 10], fov: 70 },
    targetSize: 10,
    baseRotation: [-0.1, MathUtils.degToRad(20), 0],
    rotateTurns: 0.5,
  },
  {
    slug: "deep-learning",
    visualFile: "/nn_visualization.obj",
    camera: { position: [6, 4, 8], fov: 70 },
    targetSize: 8,
    baseRotation: [-0.1, MathUtils.degToRad(20), 0],
    rotateTurns: 0.5,
  },
  {
    slug: "computer-vision",
    visualFile: "/computervision.obj",
    camera: { position: [8, 5, 10], fov: 70 },
    targetSize: 10,
    baseRotation: [-0.1, MathUtils.degToRad(180), MathUtils.degToRad(0)],
    rotateTurns: 0.5,
  },
];

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

function clampInt(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
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

const modelCache = new Map<string, Group>();

async function loadAndPrepareModel(
  fileName: string,
  targetSize: number,
  baseRotation?: [number, number, number]
) {
  const cacheKey = `${fileName}::${targetSize}::${
    baseRotation?.join(",") ?? ""
  }`;
  const cached = modelCache.get(cacheKey);
  if (cached) return cached;

  const isObj = fileName.toLowerCase().endsWith(".obj");
  const loader = isObj ? new OBJLoader() : new GLTFLoader();

  const root: Group = await new Promise((resolve, reject) => {
    loader.load(
      fileName,
      (loaded) => {
        const g =
          "scene" in loaded ? (loaded as GLTF).scene : (loaded as Group);
        resolve(g);
      },
      undefined,
      reject
    );
  });

  const prepared = normalizeModel(root, targetSize, baseRotation);
  modelCache.set(cacheKey, prepared);
  return prepared;
}

function setGroupOpacity(group: Group, opacityFactor: number) {
  const clamped = clamp01(opacityFactor);

  group.traverse((child) => {
    if (!(child as Mesh).isMesh) return;

    const mesh = child as Mesh;
    const materials = Array.isArray(mesh.material)
      ? mesh.material
      : [mesh.material];

    materials.forEach((mat) => {
      if (!mat || typeof (mat as MeshBasicMaterial).opacity !== "number")
        return;

      const material = mat as MeshBasicMaterial;
      material.transparent = true;
      material.opacity = WIRE_OPACITY * clamped;
    });
  });
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

function useScrollDriver(
  sectionRef: React.RefObject<HTMLDivElement | null>,
  total: number
) {
  const progressRef = useRef(0);
  const activeIndexRef = useRef(0);
  const segTRef = useRef(0);

  const [, forceRender] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let raf = 0;

    const tick = () => {
      raf = window.requestAnimationFrame(tick);

      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight || 1;

      const totalScrollable = el.offsetHeight - viewportH;
      const scrolled = -rect.top;

      const p = totalScrollable <= 1 ? 0 : scrolled / totalScrollable;
      const progress = clamp01(p);

      progressRef.current = progress;

      const scaled = progress * total;
      const idx = clampInt(Math.floor(scaled), 0, total - 1);
      const segT = scaled - Math.floor(scaled);

      segTRef.current = segT;

      if (idx !== activeIndexRef.current) {
        activeIndexRef.current = idx;
        setActiveIndex(idx);
      }

      forceRender((v) => (v + 1) % 1000000);
    };

    tick();
    return () => window.cancelAnimationFrame(raf);
  }, [sectionRef, total]);

  return { activeIndex, segTRef };
}

function ModelRig({
  service,
  segTRef,
  isMobile,
}: {
  service: ServiceVisualConfig;
  segTRef: React.MutableRefObject<number>;
  isMobile: boolean;
}) {
  const groupRef = useRef<Group>(null);
  const [scene, setScene] = useState<Group | null>(null);
  const lastOpacityRef = useRef(1);

  useEffect(() => {
    let cancelled = false;

    const file = service.visualFile;
    if (!file) {
      setScene(null);
      return;
    }

    loadAndPrepareModel(file, service.targetSize ?? 10, service.baseRotation)
      .then((prepared) => {
        if (cancelled) return;
        setScene(prepared.clone(true));
      })
      .catch(() => {
        if (!cancelled) setScene(null);
      });

    return () => {
      cancelled = true;
    };
  }, [service.visualFile, service.targetSize, service.baseRotation]);

  useFrame(() => {
    const g = groupRef.current;
    if (!g) return;

    const t = segTRef.current;

    // Lift the model from well below the frame and fade it out as it exits the top.
    const travelStart = -5.5;
    const travelEnd = 5.5;
    g.position.y = MathUtils.lerp(travelStart, travelEnd, t);
    g.position.x = isMobile ? 0 : 0.55;

    const turns = service.rotateTurns ?? 1;
    g.rotation.y = MathUtils.degToRad(360) * turns * t;
    g.rotation.x = MathUtils.lerp(0.1, 0.55, t);

    const fadeIn = clamp01((t - 0.05) / 0.25);
    const fadeOut = clamp01((1.05 - t) / 0.25);
    const opacityFactor = fadeIn * fadeOut;

    if (Math.abs(opacityFactor - lastOpacityRef.current) > 0.001) {
      lastOpacityRef.current = opacityFactor;
      g.visible = opacityFactor > 0.01;
      setGroupOpacity(g, opacityFactor);
    }
  });

  if (!scene) return null;

  return (
    <group ref={groupRef} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

export default function ServicesFullScreenScrollPerf() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [mobileViewportHeight, setMobileViewportHeight] = useState<
    number | null
  >(null);

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
  const { activeIndex, segTRef } = useScrollDriver(sectionRef, total);

  const active = services[activeIndex];
  if (!active) return null;

  useEffect(() => {
    if (!isMobile) return;

    const updateHeight = () => {
      const available =
        window.innerHeight - MOBILE_NAV_HEIGHT - MOBILE_BOTTOM_BAR_HEIGHT;
      setMobileViewportHeight(Math.max(available, 360));
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [isMobile]);

  const camera = active.visual.camera ?? { position: [6, 4, 8], fov: 55 };

  const maxDpr = isMobile ? 1.25 : 1.75;
  const dpr =
    typeof window === "undefined"
      ? 1
      : Math.min(window.devicePixelRatio || 1, maxDpr);

  const mobileSizingStyle =
    isMobile && mobileViewportHeight
      ? {
          minHeight: `${mobileViewportHeight}px`,
          paddingTop: `${MOBILE_NAV_HEIGHT}px`,
          paddingBottom: `${MOBILE_BOTTOM_BAR_HEIGHT}px`,
        }
      : undefined;

  return (
    <section className="w-full bg-black">
      <div ref={sectionRef} className="relative">
        <div className="relative h-[240vh] sm:h-[300vh] lg:h-[320vh]">
          <div className="sticky top-0 w-full">
            <div
              className="flex min-h-screen flex-col gap-8 px-4 py-10 sm:px-6 md:h-screen md:flex-row md:items-stretch md:gap-12 lg:px-12"
              style={mobileSizingStyle}
            >
              <div className="flex w-full flex-col items-center justify-center text-center md:w-1/2 md:items-start md:text-left">
                <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-[0.15em] text-white/70">
                  <span>Service</span>
                  <span className="opacity-70 ">{activeIndex + 1} of {total}</span>
                </div>

                <h2 className="mt-6 font-sans text-[clamp(34px,6vw,72px)] font-bold leading-none tracking-[-0.03em] text-white sm:mt-7">
                  {active.title}
                </h2>

                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:mt-6 md:text-lg">
                  {active.body}
                </p>

                <div className="mt-6 flex items-center gap-4 sm:mt-7">
                  <Link
                    href={`/services/${active.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 underline-offset-4 transition hover:text-white hover:underline"
                  >
                    View this service →
                  </Link>
                </div>
              </div>

              <div className="relative h-[320px] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-white/5 via-white/0 to-transparent sm:h-[420px] md:h-full md:min-h-0 md:w-1/2 lg:rounded-3xl">
                <Canvas
                  dpr={[1, dpr]}
                  camera={{ position: camera.position, fov: camera.fov ?? 45 }}
                  className="absolute inset-0 h-full w-full"
                  gl={{
                    antialias: true,
                    powerPreference: "high-performance",
                    alpha: true,
                  }}
                >
                  <SceneLights />
                  <ModelRig
                    service={active.visual}
                    segTRef={segTRef}
                    isMobile={isMobile}
                  />
                </Canvas>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center bg-black pb-12 pt-8 text-white">
          <Button asChild variant="secondary" size="lg">
            <Link href="/services">Explore all services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

// // app/components/ServicesFullScreenScroll.tsx
// "use client";

// import Link from "next/link";
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import {
//   Box3,
//   MathUtils,
//   MeshBasicMaterial,
//   Vector3,
//   type Group,
//   type Mesh,
// } from "three";
// import { GLTFLoader, type GLTF } from "three/examples/jsm/loaders/GLTFLoader";
// import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
// import { servicesBySlug } from "@/lib/services";
// import { Button } from "@/components/ui/button";

// type DemoService = {
//   slug: string;
//   title: string;
//   body: string;
// };

// type SceneCamera = {
//   position: [number, number, number];
//   fov?: number;
// };

// type ServiceVisualConfig = {
//   slug: string;
//   visualFile?: string;
//   camera?: SceneCamera;
//   targetSize?: number;
//   baseRotation?: [number, number, number];
//   rotateTurns?: number;
// };

// type ServiceCard = DemoService & {
//   visual: ServiceVisualConfig;
// };

// const WIRE_COLOR = "#009aca";
// const WIRE_OPACITY = 0.25;

// const SERVICE_VISUALS: ServiceVisualConfig[] = [
//   {
//     slug: "digital-twin",
//     visualFile: "/dl_network.obj",
//     camera: { position: [8, 5, 10], fov: 70 },
//     targetSize: 15,
//     baseRotation: [-0.1, MathUtils.degToRad(20), 0],
//     rotateTurns: 1.15,
//   },
//   {
//     slug: "deep-learning",
//     visualFile: "/nn_visualization.obj",
//     camera: { position: [6, 4, 8], fov: 70 },
//     targetSize: 12,
//     baseRotation: [-0.1, MathUtils.degToRad(20), 0],
//     rotateTurns: 1.0,
//   },
//   {
//     slug: "computer-vision",
//     visualFile: "/computervision.obj",
//     camera: { position: [8, 5, 10], fov: 70 },
//     targetSize: 15,
//     baseRotation: [-0.1, MathUtils.degToRad(20), 0],
//     rotateTurns: 1.1,
//   },
// ];

// function clamp01(v: number) {
//   return Math.min(1, Math.max(0, v));
// }

// function clampInt(v: number, min: number, max: number) {
//   return Math.min(max, Math.max(min, v));
// }

// function useScrollProgress(
//   containerRef: React.RefObject<HTMLDivElement | null>
// ) {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     let raf = 0;

//     const tick = () => {
//       raf = window.requestAnimationFrame(tick);

//       const el = containerRef.current;
//       if (!el) return;

//       const rect = el.getBoundingClientRect();
//       const viewportH = window.innerHeight || 1;

//       const totalScrollable = el.offsetHeight - viewportH;
//       const scrolled = -rect.top;

//       const p = totalScrollable <= 1 ? 0 : scrolled / totalScrollable;
//       setProgress(clamp01(p));
//     };

//     tick();
//     return () => window.cancelAnimationFrame(raf);
//   }, [containerRef]);

//   return progress;
// }

// function SceneLights() {
//   return (
//     <>
//       <ambientLight intensity={0.6} />
//       <directionalLight position={[6, 10, 6]} intensity={1} />
//       <pointLight position={[-6, -4, -6]} intensity={0.45} color={WIRE_COLOR} />
//     </>
//   );
// }

// function SceneShell({
//   camera,
//   children,
// }: React.PropsWithChildren<{
//   camera: SceneCamera;
// }>) {
//   return (
//     <Canvas
//       dpr={[1, 2]}
//       camera={{ position: camera.position, fov: camera.fov ?? 45 }}
//       className="h-full w-full"
//     >
//       <SceneLights />
//       {children}
//     </Canvas>
//   );
// }

// function convertMeshesToWireframe(scene: Group) {
//   scene.traverse((child) => {
//     if ((child as Mesh).isMesh) {
//       const mesh = child as Mesh;
//       if (!mesh.geometry) return;

//       const originalMaterials = Array.isArray(mesh.material)
//         ? mesh.material
//         : [mesh.material];

//       originalMaterials.forEach((material) => {
//         if (material && "dispose" in material) {
//           (material as unknown as { dispose: () => void }).dispose();
//         }
//       });

//       mesh.material = new MeshBasicMaterial({
//         color: WIRE_COLOR,
//         wireframe: true,
//         transparent: WIRE_OPACITY < 1,
//         opacity: WIRE_OPACITY,
//       });
//     }
//   });
// }

// function normalizeModel(
//   scene: Group,
//   targetSize: number,
//   baseRotation?: [number, number, number]
// ) {
//   const box = new Box3().setFromObject(scene);
//   const size = new Vector3();
//   const center = new Vector3();
//   box.getSize(size);
//   box.getCenter(center);

//   const maxDim = Math.max(size.x, size.y, size.z) || 1;
//   const scale = targetSize / maxDim;

//   scene.scale.setScalar(scale);
//   scene.position.sub(center.multiplyScalar(scale));

//   if (baseRotation) scene.rotation.set(...baseRotation);

//   convertMeshesToWireframe(scene);
//   return scene;
// }

// function WireframeModel({
//   fileName,
//   targetSize = 8,
//   baseRotation,
//   rotateTurns = 1,
//   onError,
//   scrollT,
// }: {
//   fileName: string;
//   targetSize?: number;
//   baseRotation?: [number, number, number];
//   rotateTurns?: number;
//   onError: () => void;

//   scrollT: number;
// }) {
//   const groupRef = useRef<Group>(null);
//   const [scene, setScene] = useState<Group | null>(null);

//   useEffect(() => {
//     let cancelled = false;

//     const isObj = fileName.toLowerCase().endsWith(".obj");
//     const loader = isObj ? new OBJLoader() : new GLTFLoader();
//     if (!isObj) (loader as GLTFLoader).setResourcePath("/");

//     loader.load(
//       fileName,
//       (loaded) => {
//         if (cancelled) return;

//         const root =
//           "scene" in loaded ? (loaded as GLTF).scene : (loaded as Group);

//         const prepared = normalizeModel(root, targetSize, baseRotation);
//         setScene(prepared);
//       },
//       undefined,
//       () => {
//         if (!cancelled) onError();
//       }
//     );

//     return () => {
//       cancelled = true;
//     };
//   }, [fileName, targetSize, baseRotation, onError]);

//   useFrame(() => {
//     const g = groupRef.current;
//     if (!g) return;

//     const t = scrollT;

//     g.position.y = MathUtils.lerp(-1.35, 1.35, t);
//     g.position.x = 0.55;

//     const yRot = MathUtils.degToRad(360) * rotateTurns * t;
//     g.rotation.y = yRot;

//     g.rotation.x = MathUtils.lerp(0.1, 0.55, t);
//   });

//   if (!scene) return null;

//   return (
//     <group ref={groupRef} dispose={null}>
//       <primitive object={scene} />
//     </group>
//   );
// }

// function ServiceVisual({
//   visual,
//   scrollT,
// }: {
//   visual: ServiceVisualConfig;
//   scrollT: number;
// }) {
//   const [hasError, setHasError] = useState(false);
//   const camera = visual.camera ?? { position: [6, 4, 8], fov: 55 };

//   if (hasError || !visual.visualFile) {
//     return (
//       <SceneShell camera={{ position: [2.8, 1.8, 3.2], fov: 45 }}>
//         <mesh>
//           <boxGeometry args={[1.8, 1.8, 1.8]} />
//           <meshBasicMaterial
//             color={WIRE_COLOR}
//             wireframe
//             transparent={WIRE_OPACITY < 1}
//             opacity={WIRE_OPACITY}
//           />
//         </mesh>
//       </SceneShell>
//     );
//   }

//   return (
//     <SceneShell camera={camera}>
//       <WireframeModel
//         fileName={visual.visualFile}
//         targetSize={visual.targetSize}
//         baseRotation={visual.baseRotation}
//         rotateTurns={visual.rotateTurns}
//         onError={() => setHasError(true)}
//         scrollT={scrollT}
//       />
//     </SceneShell>
//   );
// }

// export default function ServicesFullScreenScroll() {
//   const wrapRef = useRef<HTMLDivElement>(null);
//   const progress = useScrollProgress(wrapRef);

//   const services = useMemo(() => {
//     return SERVICE_VISUALS.map((visual) => {
//       const svc = servicesBySlug[visual.slug];
//       if (!svc) return null;

//       return {
//         slug: visual.slug,
//         title: svc.title,
//         body: svc.summary ?? svc.intro ?? "",
//         visual,
//       };
//     }).filter(Boolean) as ServiceCard[];
//   }, []);

//   const total = services.length || 1;

//   const scaled = progress * total;
//   const activeIndex = clampInt(Math.floor(scaled), 0, total - 1);
//   const segT = scaled - Math.floor(scaled);

//   const active = services[activeIndex];
//   if (!active) return null;

//   return (
//     <section className="w-full bg-black">
//       <div ref={wrapRef} className="relative">
//         <div className="relative h-[320vh]">
//           <div className="sticky top-0 h-screen w-full">
//             <div className="mx-auto grid h-full max-w-6xl grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-2">
//               <div className="relative">
//                 <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-[0.15em] text-white/70">
//                   <span>Service</span>
//                   <span className="opacity-70">{activeIndex + 1} of 27</span>
//                 </div>

//                 <div className="mt-7">
//                   <h2 className="font-sans text-[clamp(40px,5vw,80px)] font-bold leading-none tracking-[-0.03em] text-white">
//                     {active.title}
//                   </h2>

//                   <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
//                     {active.body}
//                   </p>

//                   <div className="mt-7 flex items-center gap-4">
//                     <Link
//                       href={`/services/${active.slug}`}
//                       className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 underline-offset-4 transition hover:text-white hover:underline"
//                     >
//                       View this service →
//                     </Link>
//                   </div>

//                   <div className="mt-8 flex gap-2">
//                     {services.map((_, i) => (
//                       <div
//                         key={i}
//                         className="h-2 rounded-full bg-white transition-all"
//                         style={{
//                           width: i === activeIndex ? 30 : 10,
//                           opacity: i === activeIndex ? 0.9 : 0.25,
//                         }}
//                       />
//                     ))}
//                   </div>

//                   <div className="mt-6 text-xs text-white/45">
//                     Scroll to move and rotate the model
//                   </div>
//                 </div>
//               </div>

//               <div className="relative h-[78vh] w-full">
//                 <ServiceVisual visual={active.visual} scrollT={segT} />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-center text-white bg-black pb-12 pt-8">
//           <Button asChild variant="secondary" size="lg">
//             <Link href="/services">Explore all services</Link>
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// }
