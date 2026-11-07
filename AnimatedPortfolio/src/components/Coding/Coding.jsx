import React, { useEffect, useRef } from "react";
import { CODING } from "../../data/coding.js";
import "./Coding.css";

export default function Coding() {
  const sectionRef = useRef(null);

  // Staggered scroll reveal
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      section.querySelectorAll(".coding__reveal-item").forEach((el) => {
        el.classList.add("is-revealed");
      });
      return;
    }

    const revealItems = section.querySelectorAll(".coding__reveal-item");

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

    revealItems.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Filter platforms that have a filled URL
  const activePlatforms = CODING.platforms.filter((p) => Boolean(p.url && p.url.trim()));

  return (
    <section
      id="coding"
      ref={sectionRef}
      className="coding"
      aria-labelledby="coding-heading"
    >
      <div className="coding__grid">
        {/* Col 1 to 3: Small top-left label */}
        <div className="coding__label-col coding__reveal-item">
          <h2 id="coding-heading" className="coding__label">
            Coding
          </h2>
          <span className="coding__label-sub">Problem solving</span>
        </div>

        {/* Col 4 to 12: Platforms Cards & Language note */}
        <div className="coding__content-col">
          <div className="coding__cards">
            {activePlatforms.map((platform, idx) => (
              <a
                key={idx}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="coding__card coding__reveal-item cursor-target"
                data-cursor-label="Open"
                aria-label={`${platform.name} profile`}
              >
                <div className="coding__card-header">
                  <h3 className="coding__platform-name">{platform.name}</h3>
                  <span className="coding__arrow" aria-hidden="true">
                    ↗
                  </span>
                </div>

                <div className="coding__card-body">
                  {platform.handle && (
                    <span className="coding__handle">@{platform.handle}</span>
                  )}
                  {platform.stat && (
                    <span className="coding__stat">{platform.stat}</span>
                  )}
                </div>
              </a>
            ))}
          </div>

          {CODING.language && (
            <p className="coding__footer-note coding__reveal-item">
              {CODING.language}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
