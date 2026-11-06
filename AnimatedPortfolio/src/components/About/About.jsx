import React, { useEffect, useRef } from "react";
import WordReveal from "./WordReveal.jsx";
import { ABOUT } from "../../data/about.js";
import "./About.css";

export default function About() {
  const sectionRef = useRef(null);

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

  // IntersectionObserver for staggered fade-up of label, facts, timeline, actions
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
        {/* Col 1 to 3: Small top-left label */}
        <div className="about__label-col about__reveal-item">
          <h2 id="about-heading" className="about__label">
            About
          </h2>
          <span className="about__label-sub">Who I am</span>
        </div>

        {/* Col 4 to 12: Main Statement with word-by-word reveal */}
        <div className="about__statement-col">
          <WordReveal
            text={ABOUT.statement}
            className="about__statement"
          />
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

        {/* Col 4 to 12: Education and Path (Timeline) */}
        <div className="about__timeline-col about__reveal-item">
          <h3 className="about__timeline-heading">Education & Path</h3>
          <ol className="about__timeline">
            {ABOUT.timeline.map((item, idx) => (
              <li key={idx} className="about__timeline-row about__reveal-item">
                <span className="about__timeline-period">{item.period}</span>
                <span className="about__timeline-title">{item.title}</span>
                <span className="about__timeline-desc">{item.description}</span>
              </li>
            ))}
          </ol>
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
                  className="about__action-link"
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
