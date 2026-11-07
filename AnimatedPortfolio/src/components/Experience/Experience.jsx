import React, { useEffect, useRef } from "react";
import { EXPERIENCE, EXPERIENCE_META } from "../../data/experience.js";
import "./Experience.css";

export default function Experience() {
  const sectionRef = useRef(null);

  // Staggered scroll reveal
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      section.querySelectorAll(".experience__reveal-item").forEach((el) => {
        el.classList.add("is-revealed");
      });
      return;
    }

    const revealItems = section.querySelectorAll(".experience__reveal-item");

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

  // Render only groups that have entries
  const activeGroups = EXPERIENCE.filter((g) => g.items && g.items.length > 0);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="experience"
      aria-labelledby="experience-heading"
    >
      <div className="experience__grid">
        {/* Col 1 to 3: Small top-left label */}
        <div className="experience__label-col experience__reveal-item">
          <h2 id="experience-heading" className="experience__label">
            Experience
          </h2>
          <span className="experience__label-sub">Where I&apos;ve worked</span>
        </div>

        {/* Col 4 to 12: Content groups */}
        <div className="experience__content-col">
          {/* Availability pill if showAvailability is true */}
          {EXPERIENCE_META.showAvailability && (
            <div className="experience__availability-wrap experience__reveal-item">
              <div className="experience__availability-pill">
                <span className="experience__pulsing-dot" aria-hidden="true" />
                <span>{EXPERIENCE_META.availability}</span>
              </div>
            </div>
          )}

          {activeGroups.map((group, gIdx) => (
            <div key={gIdx} className="experience__group experience__reveal-item">
              <h3 className="experience__group-heading">{group.group}</h3>

              {group.group === "Experience" ? (
                <div className="experience__blocks">
                  {group.items.map((item, idx) => (
                    <article key={idx} className="experience__entry-block">
                      {/* Top Row: Period and Remote */}
                      <div className="experience__entry-header">
                        <span className="experience__entry-period">{item.period}</span>
                        {item.mode && (
                          <span className="experience__entry-mode">{item.mode}</span>
                        )}
                      </div>

                      {/* Title */}
                      <h4 className="experience__entry-title">{item.title}</h4>

                      {/* Org link */}
                      {item.org && (
                        <div className="experience__entry-org-wrap">
                          {item.orgUrl ? (
                            <a
                              href={item.orgUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="experience__entry-org-link cursor-target"
                              data-cursor-label="Open"
                            >
                              <span>{item.org}</span>
                              <span className="experience__red-arrow" aria-hidden="true">
                                ↗
                              </span>
                            </a>
                          ) : (
                            <span className="experience__entry-org">{item.org}</span>
                          )}
                        </div>
                      )}

                      {/* Summary paragraph */}
                      {item.summary && (
                        <p className="experience__entry-summary">{item.summary}</p>
                      )}

                      {/* Highlights grid */}
                      {item.highlights && item.highlights.length > 0 && (
                        <div className="experience__highlights-grid">
                          {item.highlights.map((hl, hIdx) => {
                            const num = String(hIdx + 1).padStart(2, "0");
                            return (
                              <div key={hIdx} className="experience__highlight-item">
                                <span className="experience__highlight-num">{num}</span>
                                <p className="experience__highlight-text">{hl}</p>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Tech chips */}
                      {item.tech && item.tech.length > 0 && (
                        <div className="experience__tech-chips" aria-label="Technologies used">
                          {item.tech.map((techItem, tIdx) => (
                            <span key={tIdx} className="experience__tech-chip">
                              {techItem}
                            </span>
                          ))}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              ) : (
                /* Education and other compact groups */
                <ol className="experience__education-list">
                  {group.items.map((item, rIdx) => (
                    <li key={rIdx} className="experience__education-row">
                      <span className="experience__education-period">{item.period}</span>
                      <div className="experience__education-main">
                        <h4 className="experience__education-title">{item.title}</h4>
                        {item.org && (
                          <span className="experience__education-org">{item.org}</span>
                        )}
                      </div>
                      {item.description && (
                        <p className="experience__education-desc">{item.description}</p>
                      )}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
