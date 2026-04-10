"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type DeferredRenderProps = {
  children: ReactNode;
  placeholder?: ReactNode;
  rootMargin?: string;
  className?: string;
};

export default function DeferredRender({
  children,
  placeholder = null,
  rootMargin = "300px 0px",
  className,
}: DeferredRenderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isVisible) return;

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true);
        }
      },
      { rootMargin },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return (
    <div ref={containerRef} className={className}>
      {isVisible ? children : placeholder}
    </div>
  );
}
