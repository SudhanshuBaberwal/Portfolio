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

      {/* Oversized Signature Name */}
      <div className="footer__signature" aria-hidden="true">
        <span className="footer__signature-text">{SITE.fullName}</span>
      </div>
    </footer>
  );
}
