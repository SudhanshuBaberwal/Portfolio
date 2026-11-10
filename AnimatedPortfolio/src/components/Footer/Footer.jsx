import React from "react";
import { SITE } from "../../data/site.js";
import "./Footer.css";

export default function Footer() {
  const scrollToTop = () => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: 0,
      behavior: isReduced ? "instant" : "smooth",
    });
  };

  return (
    <footer className="footer" role="contentinfo">
      {/* Top Row */}
      <div className="footer__row">
        <p className="footer__copy">
          {SITE.year} {SITE.fullName}
        </p>

        <button
          type="button"
          className="footer__top-btn cursor-target"
          data-cursor-label="Top"
          onClick={scrollToTop}
          aria-label="Scroll back to top of page"
        >
          <span>Back to top</span>
          <span className="footer__top-arrow" aria-hidden="true">
            ↑
          </span>
        </button>

        <div className="footer__links">
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link cursor-target"
            data-cursor-label="Open"
            aria-label="Sudhanshu Baberwal on LinkedIn"
          >
            LinkedIn
          </a>
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link cursor-target"
            data-cursor-label="Open"
            aria-label="Sudhanshu Baberwal on GitHub"
          >
            GitHub
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="footer__link cursor-target"
            data-cursor-label="Email"
            aria-label={`Send email to ${SITE.email}`}
          >
            Email
          </a>
        </div>
      </div>

      {/* Oversized signature name.
          Drawn as SVG text: the viewBox scales it to the exact width of the footer,
          so it always fits edge to edge, with no JavaScript measuring (no shaking).
          textLength fixes the text to 990 of the 1000 units of width.
          The baseline (y=106) sits below the viewBox height (100), which gives the
          small bottom-edge clip of the original design. */}
      <div className="footer__signature" aria-hidden="true">
        <svg
          className="footer__signature-svg"
          viewBox="0 0 1000 100"
          role="presentation"
          focusable="false"
        >
          <text
            className="footer__signature-text"
            x="5"
            y="106"
            textLength="990"
            lengthAdjust="spacingAndGlyphs"
          >
            {SITE.fullName}
          </text>
        </svg>
      </div>
    </footer>
  );
}
