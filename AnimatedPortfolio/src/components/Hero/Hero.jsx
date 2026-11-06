import React, { useEffect, useRef, useState, useCallback } from "react";
import "./Hero.css";
import { SITE } from "../../data/site.js";

// Portrait lives in public/ so the <link rel="preload"> hint in index.html works.
// If the file is absent the component falls back to a CSS gradient.
const HERO_PHOTO = "/hero.jpg";

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
  const [photoError, setPhotoError] = useState(false);

  const heroRef  = useRef(null);
  const photoRef = useRef(null);
  const nameRef  = useRef(null);
  const dotRef   = useRef(null);   // red cursor-follower dot

  /* Parallax state */
  const mouse    = useRef({ x: 0, y: 0 });
  const photoPos = useRef({ x: 0, y: 0 });
  const namePos  = useRef({ x: 0, y: 0 });
  const rafId    = useRef(null);
  const dotPos   = useRef({
    x: typeof window !== "undefined" ? window.innerWidth  / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  });
  const targetDot = useRef({ ...dotPos.current });

  /* ── Entrance animations ─────────────────────────────────
     PillNav intro lasts ~560ms (60ms delay + 500ms transition).
     Hero text starts after 500ms so the pill lands first.
  ──────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (prefersReducedMotion()) return;

    // Elements that fade-up: meta, year, label, projects, contact, down
    const toFade = heroRef.current?.querySelectorAll(
      ".hero__meta p, .hero__year, .hero__label, .hero__projects, .hero__contact, .hero__down"
    );

    if (toFade) {
      toFade.forEach((el, i) => {
        // Start at 500ms, stagger by 80ms each
        const delay = 0.5 + i * 0.08;
        el.style.transition = `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`;
        requestAnimationFrame(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        });
      });
    }

    // Letter-by-letter name rise — starts at 500ms
    const letters = nameRef.current?.querySelectorAll(".hero__name-letter");
    if (letters) {
      letters.forEach((el, i) => {
        const delay = 0.5 + i * 0.045;
        el.style.transition = `transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`;
        requestAnimationFrame(() => {
          el.style.transform = "translateY(0)";
        });
      });
    }

    // Photo fade-in + slight scale
    const photo = photoRef.current;
    if (photo) {
      photo.style.opacity    = "0";
      photo.style.transform  = "scale(1.06)";
      photo.style.transition = "opacity 1.2s ease 0.4s, transform 1.2s ease 0.4s";
      requestAnimationFrame(() => {
        photo.style.opacity   = "1";
        photo.style.transform = "scale(1)";
      });
    }
  }, []);

  /* ── Mouse parallax loop ─────────────────────────────────── */
  useEffect(() => {
    if (prefersReducedMotion() || isTouchDevice()) return;

    const handleMove = (e) => {
      mouse.current.x       = e.clientX;
      mouse.current.y       = e.clientY;
      targetDot.current.x   = e.clientX;
      targetDot.current.y   = e.clientY;
    };
    window.addEventListener("mousemove", handleMove, { passive: true });

    const tick = () => {
      const { x: mx, y: my } = mouse.current;
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      const dx = (mx - cx) / cx;
      const dy = (my - cy) / cy;

      // Photo moves opposite 12px
      photoPos.current.x = lerp(photoPos.current.x, -dx * 12, 0.07);
      photoPos.current.y = lerp(photoPos.current.y, -dy * 12, 0.07);
      if (photoRef.current) {
        photoRef.current.style.transform =
          `translate(${photoPos.current.x}px, ${photoPos.current.y}px)`;
      }

      // Name moves with cursor 6px
      namePos.current.x = lerp(namePos.current.x, dx * 6, 0.07);
      namePos.current.y = lerp(namePos.current.y, dy * 6, 0.07);
      if (nameRef.current) {
        nameRef.current.style.transform =
          `translate(${namePos.current.x}px, ${namePos.current.y}px)`;
      }

      // Cursor-follower dot (lagged)
      dotPos.current.x = lerp(dotPos.current.x, targetDot.current.x, 0.1);
      dotPos.current.y = lerp(dotPos.current.y, targetDot.current.y, 0.1);
      if (dotRef.current) {
        dotRef.current.style.left = `${dotPos.current.x}px`;
        dotRef.current.style.top  = `${dotPos.current.y}px`;
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
    const dot = dotRef.current;
    if (!dot) return;

    const enter = () => dot.classList.add("is-hovering");
    const leave = () => dot.classList.remove("is-hovering");
    const links = document.querySelectorAll("a, button");
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

  /* ── Smooth scroll ───────────────────────────────────────── */
  const smoothScroll = useCallback((e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    const reduced = prefersReducedMotion();
    target.scrollIntoView({ behavior: reduced ? "instant" : "smooth" });
  }, []);

  /* ── Split name into letter spans ───────────────────────── */
  const letters = SITE.heroName.split("").map((char, i) => (
    <span key={i} className="hero__name-letter" aria-hidden="true">
      {char}
    </span>
  ));

  return (
    <>
      {/* Red cursor-follower dot — hidden on touch & mobile */}
      {!isTouchDevice() && (
        <div
          ref={dotRef}
          className="hero__dot-follower"
          aria-hidden="true"
        />
      )}

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
              src={HERO_PHOTO}
              alt=""
              className="hero__photo"
              loading="eager"
              onError={() => setPhotoError(true)}
            />
          )}
          <div className="hero__gradient" />
        </div>

        {/* ── Top row: role (left) + year (right) ──────── */}
        {/* PillNav floats fixed above this row in the center */}
        <div className="hero__top">
          {/* Role + location */}
          <div className="hero__meta" aria-label="Role and location">
            <p>{SITE.role}</p>
            <p>{SITE.location}</p>
          </div>

          {/* Year — hidden on small screens */}
          <span className="hero__year">{SITE.year}</span>
        </div>

        {/* ── Middle floating label ─────────────────────── */}
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
