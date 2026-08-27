"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

export default function SliderPill({
  children,
  className = "",
  mode = "border",
  pillClassName,
}: {
  children: React.ReactNode;
  className?: string;
  mode?: "border" | "fill";
  pillClassName?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const w = useMotionValue(0);
  const h = useMotionValue(0);
  const opacity = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 400, damping: 30 });
  const sy = useSpring(y, { stiffness: 400, damping: 30 });
  const sw = useSpring(w, { stiffness: 400, damping: 30 });
  const sh = useSpring(h, { stiffness: 400, damping: 30 });
  const so = useSpring(opacity, { stiffness: 300, damping: 25 });

  const onMouseOver = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container || reduceMotion) return;
    const target = (e.target as HTMLElement).closest(
      "[data-slide]"
    ) as HTMLElement | null;
    if (!target) return;

    const box = container.getBoundingClientRect();
    const r = target.getBoundingClientRect();
    x.set(r.left - box.left);
    y.set(r.top - box.top);
    w.set(r.width);
    h.set(r.height);
    opacity.set(1);
  };

  const onMouseLeave = () => {
    if (reduceMotion) return;
    opacity.set(0);
  };

  const baseClass = `pointer-events-none absolute left-0 top-0 ${
    mode === "fill"
      ? "rounded bg-[var(--accent-primary)]"
      : "z-10 rounded-full border border-[var(--accent-primary)]"
  }`;

  return (
    <div
      ref={containerRef}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      className={`relative ${className}`}
    >
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className={pillClassName ?? baseClass}
          style={{
            x: sx,
            y: sy,
            width: sw,
            height: sh,
            opacity: so,
          }}
        />
      )}
      {children}
    </div>
  );
}