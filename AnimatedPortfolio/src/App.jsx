import React, { useState, useEffect } from "react";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Experience from "./components/Experience/Experience";
import Coding from "./components/Coding/Coding";
import Projects from "./components/Projects/Projects";
import Summary from "./components/Summary/Summary";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import PillNav from "./components/PillNav/PillNav";
import TargetCursor from "./components/TargetCursor/TargetCursor";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { NAV_ITEMS } from "./data/site.js";
import logo from "./assets/logo.svg";
import "./index.css";

/* IDs the observer watches — must match section id= attributes */
const SECTION_IDS = [
  "top",
  "about",
  "skills",
  "experience",
  "coding",
  "projects",
  "summary",
  "contact",
];

export default function App() {
  const [activeHref, setActiveHref] = useState("#top");

  // Fallback for unknown hashes/paths: if invalid hash provided, smooth scroll to #top
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const validHashes = SECTION_IDS.map((id) => `#${id}`);
      if (!validHashes.includes(hash)) {
        window.history.replaceState(null, "", window.location.pathname);
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    }
  }, []);

  /* ── IntersectionObserver: track which section is in view ── */
  useEffect(() => {
    const sections = SECTION_IDS.map((id) =>
      document.getElementById(id)
    ).filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: "-35% 0px -35% 0px",
        threshold: 0,
      }
    );

    sections.forEach((s) => observer.observe(s));

    // Handle scroll to the very bottom to reliably activate #contact
    const handleScrollBottom = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
      if (atBottom) {
        setActiveHref("#contact");
      } else if (window.scrollY < 100) {
        setActiveHref("#top");
      }
    };

    window.addEventListener("scroll", handleScrollBottom, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollBottom);
    };
  }, []);

  return (
    <>
      {/* ── Global Target Cursor ──────────────────────────── */}
      <TargetCursor
        spinDuration={2}
        hoverDuration={0.2}
        size={36}
        cornerSize={12}
        thickness={3}
        padding={6}
        dotSize={4}
        cursorColor="#ffffff"
        cursorColorOnTarget="#ffffff"
        blendMode="difference"
        parallaxOn
        matchRadius
        showLabel
        clickEffect
        hideDefaultCursor
      />

      {/* ── Skip to content link for accessibility ────────── */}
      <a href="#main-content" className="skip-to-content cursor-target" data-cursor-label="Open">
        Skip to content
      </a>

      {/* ── Fixed pill nav ─────────────────────────────────── */}
      <div
        style={{
          position: "fixed",
          top: "calc(clamp(12px, 1.8vw, 24px) + env(safe-area-inset-top, 0px))",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
          /* prevent full-width tap on mobile */
          width: "max-content",
          maxWidth: "calc(100vw - 32px)",
        }}
      >
        <PillNav
          logo={logo}
          logoAlt="Sudhanshu Baberwal"
          items={NAV_ITEMS}
          activeHref={activeHref}
          itemStyle="pill"
          hoverEffect="fill"
          indicator="dot"
          layout="split"
          surface="glass"
          size="md"
          bounce={0.3}
          stretch={0.5}
          collapse="auto"
          intro
        />
      </div>

      {/* ── Sections protected by Error Boundaries ─────────── */}
      <ErrorBoundary fallbackMessage="Hero section error.">
        <Hero />
      </ErrorBoundary>

      <main id="main-content">
        {/* About Section */}
        <ErrorBoundary fallbackMessage="About section error.">
          <About />
        </ErrorBoundary>

        {/* Skills Section */}
        <ErrorBoundary fallbackMessage="Skills section error.">
          <Skills />
        </ErrorBoundary>

        {/* Experience Section */}
        <ErrorBoundary fallbackMessage="Experience section error.">
          <Experience />
        </ErrorBoundary>

        {/* Coding Profile Section */}
        <ErrorBoundary fallbackMessage="Coding section error.">
          <Coding />
        </ErrorBoundary>

        {/* Projects Section */}
        <ErrorBoundary fallbackMessage="Projects section error.">
          <Projects />
        </ErrorBoundary>

        {/* Summary Section */}
        <ErrorBoundary fallbackMessage="Summary section error.">
          <Summary />
        </ErrorBoundary>

        {/* Contact Section */}
        <ErrorBoundary fallbackMessage="Contact section error.">
          <Contact />
        </ErrorBoundary>
      </main>

      {/* Footer */}
      <ErrorBoundary fallbackMessage="Footer section error.">
        <Footer />
      </ErrorBoundary>
    </>
  );
}
