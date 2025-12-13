"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Box3,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  MathUtils,
  Vector3,
  type Group,
  type Mesh,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { servicesBySlug } from "@/lib/services";

type DemoService = {
  slug: string;
  title: string;
  body: string;
  accent: string;
};

const featuredSlugs = ["digital-twin", "deep-learning", "computer-vision"];
const accents = ["#000000", "#0f172a", "#16a34a"];

function AnimatedCube({ accent }: { accent: string }) {
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
      <meshStandardMaterial color={accent} wireframe />
    </mesh>
  );
}

function CubeScene({ accent }: { accent: string }) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [2.8, 1.8, 3.2], fov: 45 }}
      className="w-full h-full"
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 6, 5]} intensity={1} />
      <pointLight position={[-4, -4, -3]} intensity={0.4} color={accent} />
      <AnimatedCube accent={accent} />
    </Canvas>
  );
}

function OilRigModel({ onError }: { onError: () => void }) {
  const wireColor = "#000000";
  const [scene, setScene] = useState<Group | null>(null);
  const groupRef = useRef<Group>(null);

  useEffect(() => {
    let cancelled = false;
    const loader = new GLTFLoader();
    loader.setResourcePath("/"); // look for textures relative to public root

    loader.load(
      "/oilrig.gltf",
      (gltf) => {
        if (cancelled) return;
        const loadedScene = gltf.scene;

        // normalize size and center the model so it stays in view
        const box = new Box3().setFromObject(loadedScene);
        const size = new Vector3();
        box.getSize(size);
        const center = new Vector3();
        box.getCenter(center);

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = maxDim ? 9 / maxDim : 1; // enlarge model in view

        loadedScene.scale.setScalar(scale);
        loadedScene.position.sub(center.multiplyScalar(scale));
        loadedScene.rotation.set(-0.1, MathUtils.degToRad(20), 0);

        loadedScene.traverse((child) => {
          if ((child as Mesh).isMesh) {
            const mesh = child as Mesh;
            const parent = mesh.parent;
            if (!parent || !mesh.geometry) return;

            const edges = new EdgesGeometry(mesh.geometry, 80); // much higher threshold leaves only the broadest silhouette edges
            const lineMaterial = new LineBasicMaterial({ color: wireColor });
            const wireframe = new LineSegments(edges, lineMaterial);

            wireframe.position.copy(mesh.position);
            wireframe.rotation.copy(mesh.rotation);
            wireframe.scale.copy(mesh.scale);

            parent.add(wireframe);
            parent.remove(mesh);
          }
        });

        setScene(loadedScene);
      },
      undefined,
      () => {
        if (!cancelled) onError();
      }
    );

    return () => {
      cancelled = true;
    };
  }, [onError]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    group.rotation.y += delta * 0.22;
    group.rotation.x = MathUtils.lerp(group.rotation.x, -0.2, 0.03);
  });

  if (!scene) {
    return <AnimatedCube accent={wireColor} />;
  }

  return (
    <group ref={groupRef} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

function DeepLearningModel({
  accent,
  onError,
}: {
  accent: string;
  onError: () => void;
}) {
  const [scene, setScene] = useState<Group | null>(null);
  const groupRef = useRef<Group>(null);

  useEffect(() => {
    let cancelled = false;
    const loader = new OBJLoader();

    loader.load(
      "/dl_network.obj",
      (obj) => {
        if (cancelled) return;

        // normalize and center
        const box = new Box3().setFromObject(obj);
        const size = new Vector3();
        const center = new Vector3();
        box.getSize(size);
        box.getCenter(center);
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = maxDim ? 8 / maxDim : 1;

        obj.scale.setScalar(scale);
        obj.position.sub(center.multiplyScalar(scale));
        obj.rotation.set(0.2, MathUtils.degToRad(25), 0);

        obj.traverse((child) => {
          if ((child as Mesh).isMesh) {
            const mesh = child as Mesh;
            const parent = mesh.parent;
            if (!parent || !mesh.geometry) return;

            const edges = new EdgesGeometry(mesh.geometry, 50);
            const lineMaterial = new LineBasicMaterial({ color: accent });
            const wireframe = new LineSegments(edges, lineMaterial);

            wireframe.position.copy(mesh.position);
            wireframe.rotation.copy(mesh.rotation);
            wireframe.scale.copy(mesh.scale);

            parent.add(wireframe);
            parent.remove(mesh);
          }
        });

        setScene(obj);
      },
      undefined,
      () => {
        if (!cancelled) onError();
      }
    );

    return () => {
      cancelled = true;
    };
  }, [accent, onError]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    group.rotation.y += delta * 0.16;
    group.rotation.x = MathUtils.lerp(group.rotation.x, 0.12, 0.02);
  });

  if (!scene) {
    return <AnimatedCube accent={accent} />;
  }

  return (
    <group ref={groupRef} dispose={null}>
      <primitive object={scene} />
    </group>
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

function DigitalTwinScene() {
  const [hasError, setHasError] = useState(false);
  const wireColor = "#000000";

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [8, 5, 10], fov: 45 }}
      className="w-full h-full"
    >
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[6, 10, 6]}
        intensity={1.1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-6, -4, -6]} intensity={0.45} color={wireColor} />
      {hasError ? (
        <AnimatedCube accent={wireColor} />
      ) : (
        <OilRigModel onError={() => setHasError(true)} />
      )}
      <OrbitControlsWrapper />
    </Canvas>
  );
}

function DeepLearningScene({ accent }: { accent: string }) {
  const [hasError, setHasError] = useState(false);

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [6, 4, 8], fov: 45 }}
      className="w-full h-full"
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[6, 10, 6]} intensity={1} />
      <pointLight position={[-6, -4, -6]} intensity={0.4} color={accent} />
      {hasError ? (
        <AnimatedCube accent={accent} />
      ) : (
        <DeepLearningModel accent={accent} onError={() => setHasError(true)} />
      )}
      <OrbitControlsWrapper />
    </Canvas>
  );
}

function ServiceVisual({ slug, accent }: { slug: string; accent: string }) {
  if (slug === "digital-twin") {
    return <DigitalTwinScene />;
  }
  if (slug === "deep-learning") {
    return <DeepLearningScene accent={accent} />;
  }
  return <CubeScene accent={accent} />;
}

export default function ServicesSection() {
  const services = useMemo(() => {
    return featuredSlugs
      .map((slug, idx) => {
        const svc = servicesBySlug[slug];
        if (!svc) return null;
        return {
          slug,
          title: svc.title,
          body: svc.summary ?? svc.intro ?? "",
          accent: accents[idx % accents.length],
        };
      })
      .filter(Boolean) as DemoService[];
  }, []);

  return (
    <section className="space-y-8  w-full ">
      {services.map((service, index) => {
        const isEven = index % 2 === 1;
        return (
          <div
            key={service.slug}
            className="relative flex h-[36rem] w-full flex-col overflow-hidden lg:flex-row"
          >
            <div
              className={`relative flex-1  ${isEven ? "lg:order-last" : ""}`}
            >
              <ServiceVisual slug={service.slug} accent={service.accent} />
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
        <Link
          href="/services"
          className="rounded-full border border-dcg-ink/15 px-5 py-2 text-sm font-semibold text-dcg-ink transition hover:-translate-y-0.5 hover:shadow-md"
        >
          Explore all services
        </Link>
      </div>
    </section>
  );
}
