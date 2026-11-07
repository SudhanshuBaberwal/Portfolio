import React from "react";
import { SUMMARY } from "../../data/summary.js";
import "./Summary.css";

export default function Summary() {
  const { sectionLabel, headline, recap, links } = SUMMARY;

  return (
    <section id="summary" className="summary" aria-label="Summary">
      <div className="summary__grid">
        {/* Label column: cols 1 to 3 */}
        <div className="summary__label-col">
          <p className="summary__label">
            {sectionLabel.split("/").map((part, i) => (
              <span key={i} className="summary__label-line">
                {part.trim()}
                {i === 0 && <span className="summary__label-slash"> / </span>}
              </span>
            ))}
          </p>
        </div>

        {/* Content column: cols 4 to 12 */}
        <div className="summary__content-col">
          <h2 className="summary__headline">{headline}</h2>

          <div className="summary__recap-row">
            {recap.map((col, idx) => (
              <div key={idx} className="summary__recap-col">
                <h3 className="summary__recap-title">{col.title}</h3>
                <p className="summary__recap-body">{col.body}</p>
              </div>
            ))}
          </div>

          <div className="summary__links-row">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="summary__link"
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
              >
                <span className="summary__link-label">{link.label}</span>
                <span className="summary__link-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
