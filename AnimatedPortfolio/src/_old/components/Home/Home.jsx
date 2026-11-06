import React, { useRef, useEffect, lazy, Suspense } from "react";
import gsap from "gsap";
import heroFigure from "../../assets/hero-figure.png";
import { SITE_CONFIG } from "../../data/site";
import { CONTACT_INFO } from "../../data/contact";
import "./Home.css";

// Lazy load R3F Canvas component for performance & faster initial paint
const HeroDustCanvas = lazy(() => import("../../_old/components/HeroDustCanvas"));

// Minimalist Arrow SVG Icon
const ArrowUpRight = () => (
  <svg className="pill-arrow-svg" viewBox="0 0 24 24">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const Home = () => {
  const containerRef = useRef(null);
  const frameRef = useRef(null);
  const nameRef = useRef(null);
  const figureRef = useRef(null);
  const bgGlowRef = useRef(null);
  const reflectionRef = useRef(null);

 // Helper to split text into animated spans while keeping semantic structure
const renderLetters = (text = "", className) => {
  // Add a safety check to prevent crashes if text is undefined
  if (!text) return null; 

  return (
    <span className={`hero-name-line ${className}`} aria-label={text}>
      {text.split("").map((char, index) => (
        <span key={index} className="char-wrap" aria-hidden="true">
          <span className="char-inner letter-anim">
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </span>
  );
};
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // 1. Initial Animations: Frame draw-in, letter slide up, and figure fade-up
    if (!prefersReducedMotion) {
      const tl = gsap.timeline();

      // Frame border draw-in / fade
      if (frameRef.current) {
        tl.fromTo(
          frameRef.current,
          { opacity: 0, scale: 0.98, borderColor: "rgba(255,255,255,0.02)" },
          {
            opacity: 1,
            scale: 1,
            borderColor: "rgba(255,255,255,0.12)",
            duration: 1.2,
            ease: "power3.out",
          }
        );
      }

      // Letters staggered slide-up
      const letters = containerRef.current.querySelectorAll(".letter-anim");
      if (letters.length > 0) {
        tl.fromTo(
          letters,
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.03,
            duration: 1.0,
            ease: "power3.out",
          },
          "-=0.8"
        );
      }

      // Figure fades and slides up
      if (figureRef.current) {
        tl.fromTo(
          figureRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
          },
          "-=0.9"
        );
      }
    }

    if (prefersReducedMotion) return;

    // 2. Mouse-Move Parallax at Three Distinct Speeds
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const xNorm = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const yNorm = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1

      // Speed 1 (Slowest): Spotlight glow
      if (bgGlowRef.current) {
        gsap.to(bgGlowRef.current, {
          x: xNorm * 14,
          y: yNorm * 10,
          duration: 1.6,
          ease: "power1.out",
        });
      }

      // Speed 2 (Moderate): Name in background
      if (nameRef.current) {
        gsap.to(nameRef.current, {
          x: xNorm * -20,
          y: yNorm * -12,
          duration: 1.2,
          ease: "power2.out",
        });
      }

      // Speed 3 (Fastest): Foreground Figure & floor reflection
      if (figureRef.current) {
        gsap.to(figureRef.current, {
          x: xNorm * 34,
          y: yNorm * 18,
          rotationY: xNorm * 4,
          duration: 0.85,
          ease: "power2.out",
        });
      }

      if (reflectionRef.current) {
        gsap.to(reflectionRef.current, {
          x: xNorm * 34,
          duration: 0.85,
          ease: "power2.out",
        });
      }
    };

    // 3. Scroll away fade-out & displacement
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      if (scrollY < viewportHeight * 1.5) {
        const factor = Math.min(scrollY / viewportHeight, 1);
        if (nameRef.current) {
          nameRef.current.style.opacity = `${1 - factor * 1.2}`;
          nameRef.current.style.transform = `translateY(${scrollY * 0.25}px)`;
        }
        if (figureRef.current) {
          figureRef.current.style.opacity = `${1 - factor * 1.1}`;
          figureRef.current.style.transform = `translateY(${scrollY * 0.15}px)`;
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="hero-cinematic" ref={containerRef} id="home">
      {/* LAYER 1: Background, 6-8% Spotlight & 3% Film Grain */}
      <div className="hero-glow-layer" ref={bgGlowRef}>
        <div className="hero-spotlight" />
        <div className="hero-vignette" />
      </div>

      <div className="hero-film-grain" aria-hidden="true" />

      {/* Lazy-Loaded R3F Dust Canvas */}
      <Suspense fallback={null}>
        <HeroDustCanvas />
      </Suspense>

      {/* GLASS FRAME CONTAINER (inset ~24px from viewport) */}
      <div className="hero-glass-frame" ref={frameRef}>
        {/* TOP METADATA ROW */}
        <div className="hero-top-meta">
          {/* Top-Left: Small 01 + Short Line + Role + Tagline + 3 Pill Links */}
          <div className="top-left-block font-mono">
            <div className="role-badge-row">
              <span className="role-index">01</span>
              <span className="role-divider-line" />
              <span className="role-text-label">
                {SITE_CONFIG.roleLine1} / {SITE_CONFIG.roleLine2}
              </span>
            </div>

            <p className="hero-one-line-intro">
              {SITE_CONFIG.tagline}
            </p>

            <div className="hero-pill-links-row">
              {/* GitHub */}
              <a
                href={CONTACT_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="hero-pill-btn"
                aria-label="GitHub Profile"
              >
                <span>GITHUB</span>
                <ArrowUpRight />
              </a>

              {/* LinkedIn */}
              <a
                href={CONTACT_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hero-pill-btn"
                aria-label="LinkedIn Profile"
              >
                <span>LINKEDIN</span>
                <ArrowUpRight />
              </a>

              {/* Resume */}
              <a
                href="/Sudhanshu_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="hero-pill-btn"
                aria-label="Download Resume PDF"
              >
                <span>RESUME</span>
                <ArrowUpRight />
              </a>
            </div>
          </div>

          {/* Top-Right: // 2026 List */}
          <div className="top-right-block">
            <div className="year-tag font-mono">// 2026</div>
            <ul className="credentials-list">
              {SITE_CONFIG.credentials?.map((item, idx) => (
                <li key={idx} className="font-mono">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CENTER STAGE: Huge Left-Aligned Name + Standing Figure + Floor Reflection */}
        <div className="hero-stage">
          {/* LAYER: Left-aligned name fitting ~90% width */}
          <div className="hero-name-container" ref={nameRef}>
            {renderLetters(SITE_CONFIG.firstName, "white-line")}
            {renderLetters(SITE_CONFIG.lastName, "grey-line")}
          </div>

          {/* LAYER: Transparent Cutout Figure (standing ~55% from left, ~80vh tall) */}
          <div className="hero-figure-wrapper" ref={figureRef}>
            <img
              src={heroFigure}
              alt={`${SITE_CONFIG.firstName} ${SITE_CONFIG.lastName}`}
              className="hero-figure-img"
              loading="eager"
            />
          </div>

          {/* LAYER: Glossy floor reflection */}
          <div
            className="hero-floor-reflection"
            ref={reflectionRef}
            aria-hidden="true"
          >
            <img src={heroFigure} alt="" className="reflection-figure" />
          </div>
        </div>

        {/* BOTTOM METADATA ROW */}
        <div className="hero-bottom-row">
          {/* Bottom-Left: Mouse icon & scroll */}
          <div className="bottom-left-scroll">
            <div className="mouse-icon">
              <div className="mouse-wheel" />
            </div>
            <span className="scroll-text font-mono">SCROLL TO EXPLORE</span>
          </div>

          {/* Bottom-Right: Quote / Motto */}
          <div className="bottom-right-quote">
            <span className="quote-text font-mono">
              "{SITE_CONFIG.footerMotto}"
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
