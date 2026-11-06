import React, { useEffect, useRef, useState, useCallback } from "react";
import "./Hero.css";
import { SITE } from "../../data/site.js";

// Vite glob: picks up hero.jpg if it exists, empty record otherwise.
// Add your portrait photo as src/assets/hero.jpg to enable the full background.
const heroPhotos = import.meta.glob("../../assets/hero.jpg", { eager: true, query: "?url", import: "default" });
const heroPhoto = heroPhotos["../../assets/hero.jpg"] ?? null;

/* ─── helpers ─────────────────────────────────────────────── */
const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const isTouchDevice = () =>
  "ontouchstart" in window || navigator.maxTouchPoints > 0;

function lerp(a, b, t) {
  return a + (b - a) * t;
}

/* ─── Hero ─────────────────────────────────────────────────── */
export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [photoError, setPhotoError] = useState(false);

  /* Refs for DOM nodes that JS will animate */
  const heroRef = useRef(null);
  const photoRef = useRef(null);
  const nameRef = useRef(null);
  const dotRef = useRef(null);
  const topRowRef = useRef(null);

  /* Parallax state */
  const mouse = useRef({ x: 0, y: 0 });
  const photoPos = useRef({ x: 0, y: 0 });
  const namePos = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);
  const dotPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const targetDot = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  /* ── Entrance animation ──────────────────────────────────── */
  useEffect(() => {
    if (prefersReducedMotion()) return;

    // Gather top-row animatable elements
    const toFade = heroRef.current?.querySelectorAll(
      ".hero__logo, .hero__meta p, .hero__nav a, .hero__year, .hero__menu-btn, .hero__label, .hero__projects, .hero__contact, .hero__down"
    );

    // Stagger top-row fade-ups
    if (toFade) {
      toFade.forEach((el, i) => {
        const delay = 0.1 + i * 0.08;
        el.style.transition = `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`;
        // Trigger on next frame
        requestAnimationFrame(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        });
      });
    }

    // Letter-by-letter name rise
    const letters = nameRef.current?.querySelectorAll(".hero__name-letter");
    if (letters) {
      letters.forEach((el, i) => {
        const delay = 0.25 + i * 0.045;
        el.style.transition = `transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`;
        requestAnimationFrame(() => {
          el.style.transform = "translateY(0)";
        });
      });
    }

    // Photo fade-in + slight scale
    const photo = photoRef.current;
    if (photo) {
      photo.style.opacity = "0";
      photo.style.transform = "scale(1.06)";
      photo.style.transition = "opacity 1.1s ease 0.15s, transform 1.1s ease 0.15s";
      requestAnimationFrame(() => {
        photo.style.opacity = "1";
        photo.style.transform = "scale(1)";
      });
    }
  }, []);

  /* ── Parallax loop ───────────────────────────────────────── */
  useEffect(() => {
    if (prefersReducedMotion() || isTouchDevice()) return;

    const handleMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      targetDot.current.x = e.clientX;
      targetDot.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMove, { passive: true });

    const tick = () => {
      const { x: mx, y: my } = mouse.current;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (mx - cx) / cx; // -1 to 1
      const dy = (my - cy) / cy;

      // Photo moves opposite 12px
      photoPos.current.x = lerp(photoPos.current.x, -dx * 12, 0.07);
      photoPos.current.y = lerp(photoPos.current.y, -dy * 12, 0.07);
      if (photoRef.current) {
        photoRef.current.style.transform = `translate(${photoPos.current.x}px, ${photoPos.current.y}px)`;
      }

      // Name moves with cursor 6px
      namePos.current.x = lerp(namePos.current.x, dx * 6, 0.07);
      namePos.current.y = lerp(namePos.current.y, dy * 6, 0.07);
      if (nameRef.current) {
        nameRef.current.style.transform = `translate(${namePos.current.x}px, ${namePos.current.y}px)`;
      }

      // Dot follower lagged
      dotPos.current.x = lerp(dotPos.current.x, targetDot.current.x, 0.1);
      dotPos.current.y = lerp(dotPos.current.y, targetDot.current.y, 0.1);
      if (dotRef.current) {
        dotRef.current.style.left = `${dotPos.current.x}px`;
        dotRef.current.style.top = `${dotPos.current.y}px`;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  /* ── Dot hover scaling ───────────────────────────────────── */
  useEffect(() => {
    if (isTouchDevice()) return;
    const links = document.querySelectorAll("a, button");
    const dot = dotRef.current;
    if (!dot) return;

    const enter = () => dot.classList.add("is-hovering");
    const leave = () => dot.classList.remove("is-hovering");

    links.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      links.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  /* ── Smooth scroll helper ────────────────────────────────── */
  const smoothScroll = useCallback((e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  }, []);

  /* ── Split name into letter spans ───────────────────────── */
  const letters = SITE.heroName.split("").map((char, i) => (
    <span
      key={i}
      className="hero__name-letter"
      aria-hidden="true"
    >
      {char}
    </span>
  ));

  return (
    <>
      {/* Red dot follower — hidden on touch */}
      {!isTouchDevice() && (
        <div ref={dotRef} className="hero__dot-follower" aria-hidden="true" />
      )}

      {/* Mobile full-screen menu overlay */}
      <div
        className={`hero__overlay${menuOpen ? " is-open" : ""}`}
        aria-modal="true"
        role="dialog"
        aria-label="Navigation menu"
      >
        <button
          className="hero__overlay-close"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>
        {SITE.navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => smoothScroll(e, link.href)}
          >
            {link.label}
          </a>
        ))}
        <a
          className="hero__overlay-email"
          href={`mailto:${SITE.email}`}
        >
          {SITE.email}
        </a>
      </div>

      {/* ── Hero section ─────────────────────────────────── */}
      <header
        id="top"
        className="hero"
        ref={heroRef}
        aria-label={`${SITE.fullName} – portfolio hero`}
      >
        {/* Background photo */}
        <div
          className={`hero__bg${photoError ? " hero__bg--fallback" : ""}`}
          aria-hidden="true"
        >
          {!photoError && (
            <img
              ref={photoRef}
              src={heroPhoto}
              alt=""
              className="hero__photo"
              loading="eager"
              onError={() => setPhotoError(true)}
            />
          )}
          <div className="hero__gradient" />
        </div>

        {/* ── Top row (navbar) ───────────────────────────── */}
        <div className="hero__top" ref={topRowRef}>
          {/* Col 1: logo */}
          <a
            href="#top"
            className="hero__logo"
            aria-label={`${SITE.fullName} – back to top`}
            onClick={(e) => smoothScroll(e, "#top")}
          >
            {SITE.firstName}
          </a>

          {/* Col 2: role + location */}
          <div className="hero__meta" aria-label="Role and location">
            <p>{SITE.role}</p>
            <p>{SITE.location}</p>
          </div>

          {/* Col 3: nav */}
          <nav className="hero__nav" aria-label="Primary">
            {SITE.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => smoothScroll(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Col 4: year */}
          <span className="hero__year" aria-label="Year">{SITE.year}</span>

          {/* Mobile: menu button (replaces cols 2-4) */}
          <button
            className="hero__menu-btn"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
          >
            Menu
          </button>
        </div>

        {/* ── Middle label ──────────────────────────────── */}
        <div className="hero__label" aria-hidden="true">
          <p>{SITE.labelLine1}</p>
          <p>{SITE.labelLine2}</p>
        </div>

        {/* ── All projects link ─────────────────────────── */}
        <div className="hero__projects">
          <a
            href="#work"
            className="hero__projects-link"
            onClick={(e) => smoothScroll(e, "#work")}
            aria-label="View all projects"
          >
            {SITE.allProjectsText}
            <span className="hero__arrow-icon" aria-hidden="true">↗</span>
          </a>
        </div>

        {/* ── Bottom area ───────────────────────────────── */}
        <div className="hero__bottom">
          {/* Giant name */}
          <div className="hero__name-wrap">
            <h1
              ref={nameRef}
              className="hero__name"
              aria-label={SITE.heroName}
            >
              {letters}
            </h1>
          </div>

          {/* Contact bottom right */}
          <address className="hero__contact">
            <p>Get in touch at</p>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </address>
        </div>

        {/* ── Down arrow ────────────────────────────────── */}
        <div className="hero__down" aria-hidden="true">
          <button
            className="hero__down-btn"
            onClick={(e) => smoothScroll(e, "#work")}
            aria-label="Scroll to next section"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M10 2v14M4 11l6 6 6-6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </header>
    </>
  );
}
