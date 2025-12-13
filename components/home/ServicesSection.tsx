"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import Link from "next/link";
import { useMemo, useRef } from "react";
import { MathUtils, type Mesh } from "three";

type DemoService = {
  slug: string;
  title: string;
  body: string;
  accent: string;
};

const demoServices: DemoService[] = [
  {
    slug: "data",
    title: "Data Platforms & Products",
    body: "Design and run lakehouse architectures, governed data products, and realtime pipelines that keep analytics and AI reliable.",
    accent: "#0b5cff",
  },
  {
    slug: "ai",
    title: "Applied AI & Agents",
    body: "Ship AI features—from RAG to agentic workflows—with evaluation, safety, and MLOps so they stay accurate and cost-aware in production.",
    accent: "#16a34a",
  },
  {
    slug: "cloud-operations",
    title: "Cloud Operations",
    body: "SRE, security, and FinOps practices that make Azure, AWS, and GCP estates resilient, auditable, and budget-friendly.",
    accent: "#0f172a",
  },
];

function CubeScene({ accent }: { accent: string }) {
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
        <meshStandardMaterial color={accent} wireframe />
      </mesh>
    );
  }

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [2.8, 1.8, 3.2], fov: 45 }}
      className="w-full h-full"
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 6, 5]} intensity={1} />
      <pointLight position={[-4, -4, -3]} intensity={0.4} color={accent} />
      <AnimatedCube />
    </Canvas>
  );
}

export default function ServicesSection() {
  const services = useMemo(() => demoServices, []);

  return (
    <section className="space-y-8  w-full px-4 md:px-10">
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
              <CubeScene accent={service.accent} />
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
