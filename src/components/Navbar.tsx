"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeProvider";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      const lineY = 96;
      let best = "";
      for (const { href } of navLinks) {
        const el = document.getElementById(href.slice(1));
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= lineY && r.bottom > lineY) {
          best = href.slice(1);
          break;
        }
      }
      setActiveSection(best);
    };

    requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const smoothScrollTo = (y: number) => {
    if (window.__lenis) {
      window.__lenis.scrollTo(y, { duration: 1.2 });
    } else {
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const scrollToHash = (href: string) => {
    const el = document.querySelector(href);
    if (!el) return;
    const navHeight = 64;
    const y = el.getBoundingClientRect().top + window.scrollY - navHeight;
    smoothScrollTo(Math.max(0, y));
    window.history.replaceState(null, "", href);
  };

  const handleClick = (href: string) => {
    setMobileOpen(false);
    if (!isHome) {
      router.push("/");
      const tryScroll = (attempts = 0) => {
        const el = document.querySelector(href);
        if (el || attempts > 20) {
          scrollToHash(href);
          return;
        }
        requestAnimationFrame(() => tryScroll(attempts + 1));
      };
      requestAnimationFrame(() => setTimeout(() => tryScroll(), 50));
      return;
    }
    scrollToHash(href);
  };

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled
          ? "bg-[var(--bg-glass)] backdrop-blur-xl shadow-[var(--shadow-md)]"
          : "bg-transparent"
      }`}
    >
      <motion.div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-violet)]"
        style={{ scaleX: progress }}
      />
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 h-16">
        {isHome ? (
          <a
            href="#front"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo(0);
              window.history.replaceState(null, "", "#front");
            }}
            className="flex items-center"
          >
            <img
              src={theme === "dark" ? "/logo/dark-theme.png" : "/logo/light-theme.png"}
              alt="GP Logo"
              className="h-[81px] w-auto"
            />
          </a>
        ) : (
          <Link href="/#front" className="flex items-center">
            <img
              src={theme === "dark" ? "/logo/dark-theme.png" : "/logo/light-theme.png"}
              alt="GP Logo"
              className="h-[81px] w-auto"
            />
          </Link>
        )}

        <ul className="hidden md:flex items-center gap-1 pr-20">
          {!isHome && (
            <li>
              <motion.a
                href="/#front"
                onClick={(e) => {
                  e.preventDefault();
                  handleClick("#front");
                }}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="px-3 py-2 text-base font-outfit rounded-lg transition-colors duration-200 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
              >
                Home
              </motion.a>
            </li>
          )}
          {navLinks.map((link) => (
            <li key={link.href}>
              <motion.a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(link.href);
                }}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`nav-link px-3 py-2 text-base font-outfit transition-colors duration-200 text-[var(--text-muted)] hover:text-[var(--text-primary)] ${
                  activeSection === link.href.slice(1) ? "nav-active" : ""
                }`}
              >
                {link.label}
              </motion.a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <motion.button
            onClick={toggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              </svg>
            )}
          </motion.button>

          <motion.button
            onClick={() => setMobileOpen(!mobileOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="md:hidden p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </motion.button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[var(--bg-glass-strong)] backdrop-blur-xl border-t border-[var(--border-light)]">
          <ul className="flex flex-col p-4 gap-1">
            {!isHome && (
              <li>
                <motion.a
                  href="/#front"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpen(false);
                    handleClick("#front");
                  }}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.97 }}
                  className="block px-4 py-3 rounded-lg text-base font-outfit transition-colors text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                >
                  Home
                </motion.a>
              </li>
            )}
            {navLinks.map((link) => (
              <li key={link.href}>
                <motion.a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(link.href);
                  }}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.97 }}
                  className={`nav-link block px-4 py-3 text-base font-outfit transition-colors text-[var(--text-muted)] hover:text-[var(--text-primary)] ${
                    activeSection === link.href.slice(1) ? "nav-active" : ""
                  }`}
                >
                  {link.label}
                </motion.a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
