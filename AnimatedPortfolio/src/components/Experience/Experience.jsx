import React, { useEffect, useRef } from "react";
import { EXPERIENCE } from "../../data/experience.js";
import "./Experience.css";

export default function Experience() {
  const sectionRef = useRef(null);

  // Staggered scroll reveal
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      section.querySelectorAll(".experience__reveal-item, .experience__row").forEach((el) => {
        el.classList.add("is-revealed");
      });
      return;
    }

    const revealItems = section.querySelectorAll(".experience__reveal-item");
    const rows = section.querySelectorAll(".experience__row");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains("experience__reveal-item")) {
              entry.target.classList.add("is-revealed");
              obs.unobserve(entry.target);
            } else if (entry.target.classList.contains("experience__row")) {
              const rowIndex = Array.from(rows).indexOf(entry.target);
              setTimeout(() => {
                entry.target.classList.add("is-revealed");
              }, rowIndex * 70);
              obs.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealItems.forEach((el) => observer.observe(el));
    rows.forEach((r) => observer.observe(r));

    return () => observer.disconnect();
  }, []);

  // Filter groups that have entries
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
          <span className="experience__label-sub">Education and more</span>
        </div>

        {/* Col 4 to 12: Content groups */}
        <div className="experience__content-col">
          {activeGroups.map((group, gIdx) => (
            <div key={gIdx} className="experience__group experience__reveal-item">
              <h3 className="experience__group-heading">{group.group}</h3>
              <ol className="experience__list">
                {group.items.map((item, rIdx) => (
                  <li key={rIdx} className="experience__row">
                    <span className="experience__period">{item.period}</span>
                    <div className="experience__title-wrap">
                      <h4 className="experience__title">{item.title}</h4>
                      {item.org && <span className="experience__org">{item.org}</span>}
                    </div>
                    <p className="experience__desc">{item.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
