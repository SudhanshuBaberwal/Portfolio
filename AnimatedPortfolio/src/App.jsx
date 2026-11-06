import React, { useState, useEffect } from "react";
import Hero from "./components/Hero/Hero";
import Work from "./components/Work/Work";
import About from "./components/About/About";
import PillNav from "./components/PillNav/PillNav";
import { NAV_ITEMS } from "./data/site.js";
import logo from "./assets/logo.svg";
import "./index.css";

/* IDs the observer watches — must match section id= attributes */
const SECTION_IDS = ["top", "work", "about", "contact"];

export default function App() {
  const [activeHref, setActiveHref] = useState("#top");

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
        // Fire when section centre crosses the viewport centre.
        // rootMargin clips 45% from top and 45% from bottom,
        // so only the middle 10% of the viewport triggers updates.
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
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

      {/* ── Sections ───────────────────────────────────────── */}
      <Hero />

      <main>
        {/* Work / Selected Projects Section */}
        <Work />

        {/* About / Who I am Section */}
        <About />

        {/* Contact placeholder */}
        <section
          id="contact"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(20px, 2.5vw, 44px)",
            background: "#0b0b0b",
            color: "#fbece3",
            fontFamily: "'Inter Tight', sans-serif",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
            }}
          >
            Contact
          </h2>
        </section>
      </main>
    </>
  );
}
