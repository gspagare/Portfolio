"use client";

import { useEffect, useRef } from "react";

export default function BackgroundFX() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced || window.innerWidth < 768) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let rafId = 0;

    const PARTICLE_COUNT = 80;
    const CONNECTION_DISTANCE = 180;

    type Particle = {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      opacity: number;
    };

    let particles: Particle[] = [];

    const setup = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const createParticles = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 2,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        opacity: Math.random() * 0.5 + 0.3,
      }));
    };

    const updateParticles = () => {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x > width) p.x = 0;
        if (p.x < 0) p.x = width;
        if (p.y > height) p.y = 0;
        if (p.y < 0) p.y = height;
      }
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            ctx.strokeStyle = `rgba(59, 130, 246, ${
              0.25 * (1 - dist / CONNECTION_DISTANCE)
            })`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    };

    const drawParticles = () => {
      for (const p of particles) {
        ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(59, 130, 246, 0.8)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      updateParticles();
      drawConnections();
      drawParticles();
      rafId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      const prevW = width;
      const prevH = height;
      setup();
      const scaleX = width / prevW;
      const scaleY = height / prevH;
      for (const p of particles) {
        p.x *= scaleX;
        p.y *= scaleY;
      }
    };

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(handleResize, 250);
    };

    setup();
    createParticles();
    animate();
    window.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden"
    >
      <div className="animated-shapes">
        <div className="shape shape-1" />
        <div className="shape shape-2" />
        <div className="shape shape-3" />
        <div className="shape shape-4" />
      </div>

      <canvas ref={canvasRef} className="bg-fx-canvas" />

      <div className="bg-grid opacity-[var(--bg-pattern-opacity)]" />
    </div>
  );
}