"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();

  const hidden = reduceMotion
    ? { opacity: 1 }
    : { opacity: 0, y: 24, filter: "blur(4px)" };

  const visible = reduceMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, filter: "blur(0px)" };

  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={visible}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 1,
        delay: delay / 1000,
        ease: [0.21, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}