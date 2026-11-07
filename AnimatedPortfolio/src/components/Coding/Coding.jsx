import React, { useEffect, useRef } from "react";
import { CODING } from "../../data/coding.js";
import { siGithub, siLeetcode, siCodechef } from "simple-icons";
import "./Coding.css";

const PLATFORM_ICONS = {
  GitHub: siGithub,
  LeetCode: siLeetcode,
  CodeChef: siCodechef,
};

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

  const isDev = import.meta.env.DEV;

  // Filter or show DEV fallbacks
  const displayPlatforms = CODING.platforms.filter((p) => {
    const hasUrl = Boolean(p.url && p.url.trim());
    return hasUrl || isDev;
  });

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
            {displayPlatforms.map((platform, idx) => {
              const iconData = PLATFORM_ICONS[platform.name];
              const hasUrl = Boolean(platform.url && platform.url.trim());

              if (!hasUrl) {
                // DEV placeholder fallback
                return (
                  <div
                    key={idx}
                    className="coding__card coding__card--placeholder coding__reveal-item"
                    title="Add your username in src/data/coding.js"
                  >
                    {/* Ghost logo anchored bottom-right */}
                    {iconData && (
                      <div className="coding__ghost-logo" aria-hidden="true">
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="coding__ghost-svg"
                        >
                          <path d={iconData.path} />
                        </svg>
                      </div>
                    )}

                    <div className="coding__card-top">
                      <div className="coding__icon-wrap">
                        {iconData && (
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="coding__icon-svg"
                            aria-hidden="true"
                          >
                            <path d={iconData.path} />
                          </svg>
                        )}
                      </div>
                    </div>

                    <div className="coding__card-mid">
                      <h3 className="coding__platform-name">{platform.name}</h3>
                      <p className="coding__purpose">{platform.purpose}</p>
                    </div>

                    <div className="coding__card-bottom">
                      <span className="coding__dev-hint">
                        Add your username in src/data/coding.js
                      </span>
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={idx}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="coding__card coding__reveal-item cursor-target"
                  data-cursor-label="Open"
                  aria-label={`${platform.name} profile`}
                >
                  {/* Ghost background logo */}
                  {iconData && (
                    <div className="coding__ghost-logo" aria-hidden="true">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="coding__ghost-svg"
                      >
                        <path d={iconData.path} />
                      </svg>
                    </div>
                  )}

                  {/* Top: monochrome logo + red arrow */}
                  <div className="coding__card-top">
                    <div className="coding__icon-wrap">
                      {iconData && (
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="coding__icon-svg"
                          aria-hidden="true"
                        >
                          <path d={iconData.path} />
                        </svg>
                      )}
                    </div>
                    <span className="coding__arrow" aria-hidden="true">
                      ↗
                    </span>
                  </div>

                  {/* Middle: large title + muted purpose */}
                  <div className="coding__card-mid">
                    <h3 className="coding__platform-name">{platform.name}</h3>
                    <p className="coding__purpose">{platform.purpose}</p>
                  </div>

                  {/* Bottom: @handle + optional stat */}
                  <div className="coding__card-bottom">
                    {platform.handle && (
                      <span className="coding__handle">@{platform.handle}</span>
                    )}
                    {platform.stat && (
                      <span className="coding__stat">{platform.stat}</span>
                    )}
                  </div>
                </a>
              );
            })}
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
