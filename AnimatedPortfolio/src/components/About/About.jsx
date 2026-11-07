import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import TextType from "../TextType/TextType.jsx";
import ErrorBoundary from "../common/ErrorBoundary.jsx";
import { ABOUT } from "../../data/about.js";
import "./About.css";

const Lanyard = lazy(() => import("../Lanyard/Lanyard.jsx"));

function hasWebGLSupport() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export default function About() {
  const sectionRef = useRef(null);
  const [photoError, setPhotoError] = useState(false);
  const [nearViewport, setNearViewport] = useState(false);
  const [canUse3D, setCanUse3D] = useState(false);

  // Determine if device / user preferences support 3D Lanyard
  useEffect(() => {
    const check3D = () => {
      const isMobile = window.innerWidth < 900;
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const webgl = hasWebGLSupport();
      setCanUse3D(!isMobile && !isReduced && webgl);
    };

    check3D();
    window.addEventListener("resize", check3D);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    motionQuery.addEventListener("change", check3D);

    return () => {
      window.removeEventListener("resize", check3D);
      motionQuery.removeEventListener("change", check3D);
    };
  }, []);

  // IntersectionObserver with rootMargin 200px to lazy mount Lanyard only when near viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearViewport(true);
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Check in DEV mode if resume.pdf is missing
  useEffect(() => {
    if (import.meta.env?.DEV) {
      fetch("/resume.pdf", { method: "HEAD" })
        .then((res) => {
          if (!res.ok) {
            console.warn("[About] public/resume.pdf was not found (HTTP " + res.status + ")");
          }
        })
        .catch(() => {
          console.warn("[About] Failed to check for public/resume.pdf");
        });
    }
  }, []);

  // IntersectionObserver for staggered fade-up of label, photo, facts, actions
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      section.querySelectorAll(".about__reveal-item").forEach((el) => {
        el.classList.add("is-revealed");
      });
      return;
    }

    const revealItems = section.querySelectorAll(".about__reveal-item");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(revealItems).indexOf(entry.target);
            setTimeout(() => {
              entry.target.classList.add("is-revealed");
            }, index * 70);
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  // Static photo fallback element (used for mobile, reduced motion, fallback, or during lazy loading)
  const renderStaticPhoto = () => (
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
    <section
      id="about"
      ref={sectionRef}
      className="about"
      aria-labelledby="about-heading"
    >
      <div className="about__grid">
        {/* Col 1 to 3: Small top-left label + Lanyard / Sticky Portrait Photo */}
        <div className="about__label-col about__reveal-item">
          <h2 id="about-heading" className="about__label">
            About
          </h2>
          <span className="about__label-sub">Who I am</span>

          {canUse3D && nearViewport ? (
            <ErrorBoundary fallback={renderStaticPhoto()}>
              <Suspense fallback={renderStaticPhoto()}>
                <div
                  className="about__lanyard-wrap cursor-target"
                  data-cursor-label="Drag"
                  role="img"
                  aria-label="Interactive ID card with a portrait of Sudhanshu Baberwal. Drag to swing it."
                >
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
                </div>
              </Suspense>
            </ErrorBoundary>
          ) : (
            renderStaticPhoto()
          )}
        </div>

        {/* Col 4 to 12: Main Statement with TextType & Reserved Height */}
        <div className="about__statement-col">
          <div className="about__statement-container">
            {/* Screen reader text & reserved height ghost */}
            <p className="about__statement-ghost">
              {ABOUT.statement}
            </p>

            {/* Visual animated typed text */}
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

        {/* Col 4 to 12: Facts Row */}
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

        {/* Col 4 to 12: Actions Row */}
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
                    className={`about__action-arrow ${
                      link.arrow === "↓" ? "about__action-arrow--down" : ""
                    }`}
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
