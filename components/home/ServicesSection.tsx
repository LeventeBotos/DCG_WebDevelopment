"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import {
  Box3,
  MeshBasicMaterial,
  MathUtils,
  Vector3,
  type Group,
  type Mesh,
} from "three";
import { GLTFLoader, type GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
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
  spinSpeed?: number;
  restRotationX?: number;
  orbit?: boolean;
  baseRotation?: [number, number, number];
};

type ServiceCard = DemoService & {
  visual: ServiceVisualConfig;
};

const WIRE_COLOR = "#000000";
// const WIRE_COLOR = "#009aca";
const WIRE_OPACITY = 0.25;

// Add new featured services here; provide the slug and, if desired, the model filename to render.
const SERVICE_VISUALS: ServiceVisualConfig[] = [
  {
    slug: "digital-twin",
    visualFile: "/oilrig.obj",
    camera: { position: [8, 5, 10], fov: 70 },
    targetSize: 15,
    spinSpeed: 0.1,
    restRotationX: -0.2,
    baseRotation: [-0.1, MathUtils.degToRad(20), 0],
  },
  {
    slug: "deep-learning",
    visualFile: "/nn_visualization.obj",
    camera: { position: [6, 4, 8], fov: 70 },
    targetSize: 12,
    spinSpeed: 0.1,
    restRotationX: -0.2,
    baseRotation: [-0.1, MathUtils.degToRad(20), 0],
  },
  {
    slug: "computer-vision",
    visualFile: "/computervision.obj",
    camera: { position: [8, 5, 10], fov: 70 },
    targetSize: 15,
    spinSpeed: 0.1,
    restRotationX: -0.2,
    baseRotation: [-0.1, MathUtils.degToRad(20), 0],
  },
];

function AnimatedCube() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    mesh.rotation.y += delta * 0.35;
    mesh.rotation.x = MathUtils.lerp(mesh.rotation.x, 0.35, 0.04);
    mesh.rotation.z = MathUtils.lerp(mesh.rotation.z, -0.2, 0.04);
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <boxGeometry args={[1.8, 1.8, 1.8]} />
      <meshBasicMaterial
        color={WIRE_COLOR}
        wireframe
        transparent={WIRE_OPACITY < 1}
        opacity={WIRE_OPACITY}
      />
    </mesh>
  );
}

function SceneLights({ preset = "model" }: { preset?: "model" | "cube" }) {
  if (preset === "cube") {
    return (
      <>
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 6, 5]} intensity={1} />
        <pointLight
          position={[-4, -4, -3]}
          intensity={0.4}
          color={WIRE_COLOR}
        />
      </>
    );
  }

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[6, 10, 6]} intensity={1} castShadow />
      <pointLight position={[-6, -4, -6]} intensity={0.45} color={WIRE_COLOR} />
    </>
  );
}

function OrbitControlsWrapper() {
  const { camera, gl } = useThree();
  const controlsRef = useRef<OrbitControls | null>(null);

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 4;
    controls.maxDistance = 18;
    controls.maxPolarAngle = Math.PI / 1.9;
    controlsRef.current = controls;

    return () => controls.dispose();
  }, [camera, gl]);

  useFrame(() => {
    controlsRef.current?.update();
  });

  return null;
}

function SceneShell({
  children,
  camera,
  lightPreset = "model",
  orbit = true,
}: PropsWithChildren<{
  camera: SceneCamera;
  lightPreset?: "model" | "cube";
  orbit?: boolean;
}>) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: camera.position, fov: camera.fov ?? 45 }}
      className="w-full h-full"
    >
      <SceneLights preset={lightPreset} />
      {children}
      {orbit ? <OrbitControlsWrapper /> : null}
    </Canvas>
  );
}

function convertMeshesToWireframe(scene: Group) {
  scene.traverse((child) => {
    if ((child as Mesh).isMesh) {
      const mesh = child as Mesh;
      if (!mesh.geometry) return;

      // Dispose original materials to prevent leaks, then enforce a single unlit wireframe material.
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

  if (baseRotation) {
    scene.rotation.set(...baseRotation);
  }

  convertMeshesToWireframe(scene);
  return scene;
}

function WireframeModel({
  fileName,
  targetSize = 8,
  spinSpeed = 0.2,
  restRotationX = 0.12,
  baseRotation,
  onError,
}: {
  fileName: string;
  targetSize?: number;
  spinSpeed?: number;
  restRotationX?: number;
  baseRotation?: [number, number, number];
  onError: () => void;
}) {
  const groupRef = useRef<Group>(null);
  const [scene, setScene] = useState<Group | null>(null);

  useEffect(() => {
    let cancelled = false;
    const isObj = fileName.toLowerCase().endsWith(".obj");
    const loader = isObj ? new OBJLoader() : new GLTFLoader();
    if (!isObj) {
      (loader as GLTFLoader).setResourcePath("/");
    }

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

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    group.rotation.y += delta * spinSpeed;
    group.rotation.x = MathUtils.lerp(group.rotation.x, restRotationX, 0.03);
  });

  if (!scene) {
    return <AnimatedCube />;
  }

  return (
    <group ref={groupRef} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

function ServiceVisual({ visual }: { visual: ServiceVisualConfig }) {
  const [hasError, setHasError] = useState(false);
  const isCube = hasError || !visual.visualFile;

  const camera = visual.camera ?? {
    position: isCube ? [2.8, 1.8, 3.2] : [6, 4, 8],
    fov: 45,
  };

  return (
    <SceneShell
      camera={camera}
      lightPreset={isCube ? "cube" : "model"}
      orbit={visual.orbit ?? !isCube}
    >
      {isCube ? (
        <AnimatedCube />
      ) : (
        <WireframeModel
          fileName={visual.visualFile!}
          targetSize={visual.targetSize}
          spinSpeed={visual.spinSpeed}
          restRotationX={visual.restRotationX}
          baseRotation={visual.baseRotation}
          onError={() => setHasError(true)}
        />
      )}
    </SceneShell>
  );
}

export default function ServicesSection() {
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

  return (
    <section className="space-y-8  w-full ">
      {services.map((service, index) => {
        const isEven = index % 2 === 1;
        return (
          <div
            key={service.slug}
            className="relative flex h-96 w-full flex-col overflow-hidden lg:flex-row"
          >
            <div
              className={`relative flex-1  ${isEven ? "lg:order-last" : ""}`}
            >
              <ServiceVisual visual={service.visual} />
            </div>
            <div
              className={`relative flex-1 px-6 py-10 md:px-10 lg:px-14 lg:py-16 ${
                isEven ? "" : "lg:order-last"
              }`}
            >
              <div className="flex h-full flex-col justify-center gap-5">
                <div className="space-y-3">
                  <h3 className="text-4xl font-semibold text-dcg-ink md:text-5xl">
                    {service.title}
                  </h3>
                  <p className="text-base text-dcg-slate md:text-lg">
                    {service.body}
                  </p>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-dcg-ink/80 underline-offset-4 transition hover:text-dcg-ink hover:underline"
                  >
                    View this service →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="flex justify-center pt-4">
        <Button asChild variant="secondary" size="lg">
          <Link href="/services">Explore all services</Link>
        </Button>
      </div>
    </section>
  );
}
