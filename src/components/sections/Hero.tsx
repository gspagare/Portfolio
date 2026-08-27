"use client";

import { motion } from "framer-motion";
import profile from "@/data/profile.json";
import ScrollReveal from "@/components/ScrollReveal";
import SliderPill from "@/components/SliderPill";

export default function Hero() {
  return (
    <section
      id="front"
      className="min-h-screen flex items-center justify-center px-6"
    >
      <div className="max-w-4xl text-center overflow-visible">
        <ScrollReveal>
          <p className="text-lg font-outfit text-[var(--accent-primary)] mb-4">
            {profile.tagline}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={100} className="overflow-visible">
          <h1 className="text-5xl md:text-7xl font-pacifico mb-4 pb-5 gradient-text overflow-visible leading-[1.2]">
            {profile.name}.
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-secondary)] mb-6 leading-snug">
            {profile.description}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={300}>
          <SliderPill className="flex flex-wrap justify-center gap-3 mb-10">
            {profile.chips.map((chip) => (
              <span
                key={chip}
                data-slide
                className="relative px-4 py-1.5 text-xs font-medium rounded-full text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
              >
                {chip}
              </span>
            ))}
          </SliderPill>
        </ScrollReveal>
        <ScrollReveal delay={400}>
          <div className="flex justify-center gap-4">
            <motion.a
              href="#contact"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ y: 0, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="px-6 py-3 rounded-lg font-semibold text-sm btn-gradient"
            >
              Get In Touch
            </motion.a>
            <motion.a
              href="#projects"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="px-6 py-3 rounded-lg font-semibold text-sm border border-[var(--border-light)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] hover:border-[var(--accent-primary)] transition-colors"
            >
              View My Work
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
