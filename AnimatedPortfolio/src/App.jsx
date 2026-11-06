import React, { useState, useEffect } from "react";
import Hero from "./components/Hero/Hero";
import Work from "./components/Work/Work";
import About from "./components/About/About";
import Stack from "./components/Stack/Stack";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import PillNav from "./components/PillNav/PillNav";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { NAV_ITEMS } from "./data/site.js";
import logo from "./assets/logo.svg";
import "./index.css";

/* IDs the observer watches — must match section id= attributes */
const SECTION_IDS = ["top", "work", "about", "stack", "contact"];

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
      {/* ── Skip to content link for accessibility ────────── */}
      <a href="#main-content" className="skip-to-content">
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
        {/* Work / Selected Projects Section */}
        <ErrorBoundary fallbackMessage="Projects section error.">
          <Work />
        </ErrorBoundary>

        {/* About / Who I am Section */}
        <ErrorBoundary fallbackMessage="About section error.">
          <About />
        </ErrorBoundary>

        {/* Stack / Tools I use Section */}
        <ErrorBoundary fallbackMessage="Stack section error.">
          <Stack />
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
