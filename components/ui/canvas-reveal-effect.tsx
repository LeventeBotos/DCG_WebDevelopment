"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";
import { Canvas, RootState, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export const CanvasRevealEffect = ({
  animationSpeed = 0.4,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[0, 255, 255]],
  containerClassName,
  dotSize,
  showGradient = true,
}: {
  animationSpeed?: number;
  opacities?: number[];
  colors?: number[][];
  containerClassName?: string;
  dotSize?: number;
  showGradient?: boolean;
}) => {
  return (
    <div className={cn("relative h-full w-full bg-white", containerClassName)}>
      <div className="h-full w-full">
        <DotMatrix
          colors={colors ?? [[0, 255, 255]]}
          dotSize={dotSize ?? 3}
          opacities={
            opacities ?? [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1]
          }
          shader={`
            float animation_speed_factor = ${Number(animationSpeed).toFixed(2)};
            float intro_offset = distance(u_resolution / 2.0 / u_total_size, st2) * 0.01 + (random(st2) * 0.15);
            opacity *= step(intro_offset, u_time * animation_speed_factor);
            opacity *= clamp((1.0 - step(intro_offset + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.25);
          `}
          center={["x", "y"]}
        />
      </div>

      {showGradient ? (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent" />
      ) : null}
    </div>
  );
};

interface DotMatrixProps {
  colors?: number[][];
  opacities?: number[];
  totalSize?: number;
  dotSize?: number;
  shader?: string;
  center?: ("x" | "y")[];
}

const DotMatrix: React.FC<DotMatrixProps> = ({
  colors = [[0, 0, 0]],
  opacities = [0.04, 0.04, 0.04, 0.04, 0.04, 0.08, 0.08, 0.08, 0.08, 0.14],
  totalSize = 4,
  dotSize = 2,
  shader = "",
  center = ["x", "y"],
}) => {
  const uniforms = useMemo(() => {
    let colorsArray: number[][] = [
      colors[0],
      colors[0],
      colors[0],
      colors[0],
      colors[0],
      colors[0],
    ];

    if (colors.length === 2) {
      colorsArray = [
        colors[0],
        colors[0],
        colors[0],
        colors[1],
        colors[1],
        colors[1],
      ];
    } else if (colors.length === 3) {
      colorsArray = [
        colors[0],
        colors[0],
        colors[1],
        colors[1],
        colors[2],
        colors[2],
      ];
    } else if (colors.length > 3) {
      colorsArray = [
        colors[0],
        colors[1],
        colors[2],
        colors[3],
        colors[0],
        colors[1],
      ];
    }

    return {
      u_colors: {
        value: colorsArray.map(
          (c) => new THREE.Vector3(c[0] / 255, c[1] / 255, c[2] / 255),
        ),
      },
      u_opacities: { value: opacities },
      u_total_size: { value: totalSize },
      u_dot_size: { value: dotSize },
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(1, 1) },
    } as const;
  }, [colors, opacities, totalSize, dotSize]);

  const fragment = useMemo(() => {
    const cx = center.includes("x")
      ? "st.x -= abs(floor((mod(u_resolution.x, u_total_size) - u_dot_size) * 0.5));"
      : "";
    const cy = center.includes("y")
      ? "st.y -= abs(floor((mod(u_resolution.y, u_total_size) - u_dot_size) * 0.5));"
      : "";

    return `
      precision highp float;

      in vec2 fragCoord;

      uniform float u_time;
      uniform float u_opacities[10];
      uniform vec3 u_colors[6];
      uniform float u_total_size;
      uniform float u_dot_size;
      uniform vec2 u_resolution;

      out vec4 fragColor;

      float PHI = 1.61803398874989484820459;

      float random(vec2 xy) {
        return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x);
      }

      void main() {
        vec2 st = fragCoord.xy;

        ${cx}
        ${cy}

        float opacity = step(0.0, st.x);
        opacity *= step(0.0, st.y);

        vec2 st2 = vec2(int(st.x / u_total_size), int(st.y / u_total_size));

        float frequency = 5.0;
        float show_offset = random(st2);

        float rand = random(st2 * floor((u_time / frequency) + show_offset + frequency) + 1.0);

        opacity *= u_opacities[int(rand * 10.0)];

        opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.x / u_total_size));
        opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.y / u_total_size));

        vec3 color = u_colors[int(show_offset * 6.0)];

        ${shader}

        fragColor = vec4(color, opacity);
        fragColor.rgb *= fragColor.a;
      }
    `;
  }, [center, shader]);

  return <Shader source={fragment} uniforms={uniforms} maxFps={60} />;
};

const Shader: React.FC<{
  source: string;
  uniforms: Record<string, THREE.IUniform>;
  maxFps?: number;
}> = ({ source, uniforms, maxFps = 60 }) => {
  return (
    <Canvas
      className="absolute inset-0 h-full w-full"
      dpr={[1, 2]}
      gl={{ antialias: true }}
    >
      <ShaderPlane source={source} uniforms={uniforms} maxFps={maxFps} />
    </Canvas>
  );
};

const ShaderPlane: React.FC<{
  source: string;
  uniforms: Record<string, THREE.IUniform>;
  maxFps: number;
}> = ({ source, uniforms, maxFps }) => {
  const { size, viewport } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const lastFrameRef = useRef(0);

  const material = useMemo(() => {
    const m = new THREE.ShaderMaterial({
      vertexShader: `
        precision highp float;

        uniform vec2 u_resolution;
        out vec2 fragCoord;

        void main() {
          gl_Position = vec4(position.xy, 0.0, 1.0);

          fragCoord = (position.xy + vec2(1.0)) * 0.5 * u_resolution;
          fragCoord.y = u_resolution.y - fragCoord.y;
        }
      `,
      fragmentShader: source,
      uniforms,
      glslVersion: THREE.GLSL3,
      transparent: true,
      depthWrite: false,
      blending: THREE.CustomBlending,
      blendSrc: THREE.SrcAlphaFactor,
      blendDst: THREE.OneFactor,
    });

    return m;
  }, [source, uniforms]);

  useEffect(() => {
    const m = materialRef.current;
    if (!m) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    m.uniforms.u_resolution.value.set(size.width * dpr, size.height * dpr);
    m.needsUpdate = true;
  }, [size.width, size.height]);

  const elapsedRef = useRef(0);

  useFrame((_state, delta) => {
    const m = materialRef.current;
    if (!m) return;

    elapsedRef.current += delta;
    const t = elapsedRef.current;

    if (t - lastFrameRef.current < 1 / maxFps) return;
    lastFrameRef.current = t;

    m.uniforms.u_time.value = t;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const rx = size.width * dpr;
    const ry = size.height * dpr;

    const r = m.uniforms.u_resolution.value as THREE.Vector2;
    if (r.x !== rx || r.y !== ry) r.set(rx, ry);
  });
  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <primitive object={material} attach="material" ref={materialRef as any} />
    </mesh>
  );
};
