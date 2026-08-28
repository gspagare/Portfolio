"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import profile from "@/data/profile.json";
import SliderPill from "@/components/SliderPill";
import Magnetic from "@/components/Magnetic";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % profile.roles.length),
      3000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section id="front" className="relative min-h-dvh flex flex-col">
      <div className="flex-1 flex justify-center px-6 pt-[calc(var(--nav-h)+8px)] sm:pt-[calc(var(--nav-h)+24px)] pb-12 lg:pt-[calc(var(--nav-h)+40px)] lg:pb-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid w-full max-w-5xl self-center lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
        >
          <motion.div
            variants={item}
            className="relative flex self-center justify-center lg:justify-end lg:col-start-2 lg:row-start-1 mb-8 lg:mb-0"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-[var(--gradient-primary)] opacity-25 blur-2xl"
            />
            <div className="relative rounded-full bg-[var(--gradient-primary)] p-[3px] shadow-[var(--glow-primary)]">
              <Image
                src={profile.profileImage}
                alt="Gaurav Pagare"
                width={320}
                height={320}
                priority
                className="h-32 w-32 sm:h-44 sm:w-44 lg:h-80 lg:w-80 rounded-full object-cover object-top"
              />
            </div>
          </motion.div>

          <div className="text-center lg:text-left lg:col-start-1 lg:row-start-1 overflow-visible">
            <motion.p
              variants={item}
              className="text-base md:text-lg font-outfit text-[var(--accent-primary)] mb-3"
            >
              {profile.tagline}
            </motion.p>

            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl md:text-6xl font-pacifico mb-4 gradient-text overflow-visible leading-[1.5] py-3"
            >
              {profile.name}.
            </motion.h1>

            <motion.div variants={item} className="mb-4 overflow-visible">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={roleIndex}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="text-xl md:text-3xl font-semibold text-[var(--text-secondary)] leading-snug"
                >
                  {profile.roles[roleIndex]}
                  <span className="text-[var(--accent-primary)]">.</span>
                </motion.h2>
              </AnimatePresence>
            </motion.div>

            <motion.p
              variants={item}
              className="text-sm md:text-lg text-[var(--text-muted)] max-w-xl mx-auto lg:mx-0 mb-6 leading-relaxed"
            >
              {profile.description}
            </motion.p>

            <motion.div variants={item} className="overflow-visible">
              <SliderPill className="grid grid-cols-2 gap-x-2 gap-y-2 items-center w-fit mx-auto mb-8 lg:flex lg:flex-wrap lg:gap-2 lg:justify-start lg:w-auto lg:mx-0">
                {profile.chips.map((chip, i) => (
                  <span
                    key={chip}
                    data-slide
                    className={`relative px-4 py-1.5 text-xs font-medium rounded-full whitespace-nowrap text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors ${
                      i % 2 === 0 ? "justify-self-end" : "justify-self-start"
                    }`}
                  >
                    {chip}
                  </span>
                ))}
              </SliderPill>
            </motion.div>

            <motion.div
              variants={item}
              className="flex justify-center lg:justify-start gap-8"
            >
              <Magnetic strength={0.3} className="inline-block">
                <motion.a
                  href="#contact"
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="block px-6 py-3 rounded-lg font-semibold text-sm btn-gradient"
                >
                  Get In Touch
                </motion.a>
              </Magnetic>
              <Magnetic strength={0.3} className="inline-block">
                <motion.a
                  href="#projects"
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="block px-6 py-3 rounded-lg font-semibold text-sm border border-[rgba(59,130,246,0.45)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] hover:border-[var(--accent-primary)] transition-colors"
                >
                  View My Work
                </motion.a>
              </Magnetic>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="pb-7 flex justify-center">
        <div className="flex flex-col items-center gap-2.5">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted)]">
            scroll
          </span>
          <motion.div
            aria-hidden="true"
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-9 w-5 rounded-full border-2 border-[var(--text-muted)]/60 flex justify-center pt-1.5"
          >
            <motion.div
              animate={{ y: [0, 13, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-[var(--accent-primary)]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}