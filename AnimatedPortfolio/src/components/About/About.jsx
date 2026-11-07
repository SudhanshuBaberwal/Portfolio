import React, { useEffect, useRef, useState } from "react";
import TextType from "../TextType/TextType.jsx";
import { ABOUT } from "../../data/about.js";
import "./About.css";

export default function About() {
  const sectionRef = useRef(null);
  const [photoError, setPhotoError] = useState(false);

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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about"
      aria-labelledby="about-heading"
    >
      <div className="about__grid">
        {/* Col 1 to 3: Small top-left label + Sticky Portrait Photo */}
        <div className="about__label-col about__reveal-item">
          <h2 id="about-heading" className="about__label">
            About
          </h2>
          <span className="about__label-sub">Who I am</span>

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
