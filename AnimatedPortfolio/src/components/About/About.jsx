import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import TextType from "../TextType/TextType.jsx";
import ErrorBoundary from "../common/ErrorBoundary.jsx";
import { ABOUT } from "../../data/about.js";
import "./About.css";

const Lanyard = lazy(() => import("../Lanyard/Lanyard.jsx"));

// Checked ONCE (creating a WebGL context on every resize leaks contexts).
let webglCache = null;
function hasWebGLSupport() {
  if (webglCache !== null) return webglCache;
  try {
    const canvas = document.createElement("canvas");
    webglCache = Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    webglCache = false;
  }
  return webglCache;
}

// The 3D card runs on ALL screen sizes. It is skipped only when the visitor
// asked for reduced motion, WebGL is missing, the device is very low-memory,
// or the browser is in data-saver mode.
function canRun3D() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lowMemory = typeof navigator.deviceMemory === "number" && navigator.deviceMemory <= 2;
  const saveData = Boolean(navigator.connection?.saveData);
  return !reduced && !lowMemory && !saveData && hasWebGLSupport();
}

export default function About() {
  const sectionRef = useRef(null);
  const [photoError, setPhotoError] = useState(false);
  const [nearViewport, setNearViewport] = useState(false);
  const [canUse3D, setCanUse3D] = useState(false);

  // Decide whether the 3D card may run (re-check if the motion preference changes)
  useEffect(() => {
    const update = () => setCanUse3D(canRun3D());
    update();
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    motionQuery.addEventListener("change", update);
    return () => motionQuery.removeEventListener("change", update);
  }, []);

  // Mount the Lanyard only when the section is near the viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNearViewport(true);
      },
      { rootMargin: "200px" }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // DEV: warn if resume.pdf is missing
  useEffect(() => {
    if (import.meta.env?.DEV) {
      fetch("/resume.pdf", { method: "HEAD" })
        .then((res) => {
          if (!res.ok) console.warn("[About] public/resume.pdf was not found (HTTP " + res.status + ")");
        })
        .catch(() => console.warn("[About] Failed to check for public/resume.pdf"));
    }
  }, []);

  // Staggered fade-up of label, facts, actions
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const revealItems = section.querySelectorAll(".about__reveal-item");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealItems.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(revealItems).indexOf(entry.target);
            setTimeout(() => entry.target.classList.add("is-revealed"), index * 70);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  // Static photo (fallback, and the placeholder while the 3D module loads)
  const photo = (
    <div className="about__photo-wrap">
      {!photoError ? (
        <picture>
          <source srcSet="/about.webp" type="image/webp" />
          <img
            src="/about.jpg"
            alt="Portrait of Sudhanshu Baberwal"
            width="320"
            height="400"
            className="about__photo"
            loading="lazy"
            onError={() => setPhotoError(true)}
          />
        </picture>
      ) : (
        <div className="about__photo-fallback" aria-hidden="true">
          <span className="about__photo-fallback-initial">S</span>
        </div>
      )}
    </div>
  );

  return (
    <section id="about" ref={sectionRef} className="about" aria-labelledby="about-heading">
      <div className="about__grid">
        {/* Left column: label + ID card. Spans the paragraph, facts and links rows so it can stay in view. */}
        <div className="about__label-col about__reveal-item">
          <h2 id="about-heading" className="about__label">About</h2>
          <span className="about__label-sub">Who I am</span>

          {canUse3D ? (
            // The block keeps its size from the start, so nothing jumps when the 3D card loads.
            <div
              className="about__lanyard-wrap cursor-target"
              data-cursor-label="Drag"
              role="img"
              aria-label="Interactive ID card with a portrait of Sudhanshu Baberwal. Drag to swing it."
            >
              {nearViewport ? (
                <ErrorBoundary fallback={photo}>
                  <Suspense fallback={photo}>
                    <Lanyard
                      frontImage="/hero.jpg"
                      backImage="/card-back.jpg"
                      strapImage="/band.png"
                      imageFit="cover"
                      cardColor="#ffffff"
                      orientation="portrait"
                      // finish="glossy"
                      cornerRadius={0.3}
                      size={0.6}
                      anchor="center"
                      strapLength={0.5}
                      strapColor="#111111"
                      strapWidth={0.65}
                      // metal="silver"
                      gravity={1}
                      damping={0.5}
                      elasticity={0.5}
                      breeze={0.5}
                      interactive
                      intro
                    />
                  </Suspense>
                </ErrorBoundary>
              ) : (
                photo
              )}
            </div>
          ) : (
            photo
          )}
        </div>

        {/* Main statement with TextType and reserved height */}
        <div className="about__statement-col">
          <div className="about__statement-container">
            <p className="about__statement-ghost">{ABOUT.statement}</p>
            <div className="about__statement-typed" aria-hidden="true">
              <TextType
                text={[ABOUT.statement]}
                typingSpeed={20}
                showCursor={true}
                cursorCharacter="_"
                cursorBlinkDuration={0.5}
                cursorColor="currentColor"
                loop={false}
                startOnVisible={true}
              />
            </div>
          </div>
        </div>

        {/* Facts row */}
        <div className="about__facts-col about__reveal-item">
          <div className="about__facts">
            {ABOUT.facts.map((fact, idx) => (
              <div key={idx} className="about__fact">
                <span className="about__fact-label">{fact.label}</span>
                <span className="about__fact-value">{fact.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions row */}
        <div className="about__actions-col about__reveal-item">
          <div className="about__actions">
            {ABOUT.links.map((link, idx) => {
              const isDownload = link.download;
              return (
                <a
                  key={idx}
                  href={link.href}
                  download={isDownload ? true : undefined}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="about__action-link cursor-target"
                  data-cursor-label="Open"
                  aria-label={`${link.label} (${isDownload ? "download file" : "external link"})`}
                >
                  <span>{link.label}</span>
                  <span
                    className={`about__action-arrow ${link.arrow === "↓" ? "about__action-arrow--down" : ""}`}
                    aria-hidden="true"
                  >
                    {link.arrow}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
