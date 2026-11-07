import React, { useState, useEffect, useRef } from "react";
import ContactForm from "./ContactForm.jsx";
import { SITE } from "../../data/site.js";
import "./Contact.css";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef(null);

  const headlineWords = ["Let's", "work", "together"];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SITE.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Scroll reveal observer
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      section.classList.add("is-headline-revealed");
      section.querySelectorAll(".contact__reveal-item").forEach((el) => {
        el.classList.add("is-revealed");
      });
      return;
    }

    const revealItems = section.querySelectorAll(".contact__reveal-item");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === section) {
              section.classList.add("is-headline-revealed");
            } else if (entry.target.classList.contains("contact__reveal-item")) {
              const idx = Array.from(revealItems).indexOf(entry.target);
              setTimeout(() => {
                entry.target.classList.add("is-revealed");
              }, idx * 70);
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

    observer.observe(section);
    revealItems.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="contact"
      aria-labelledby="contact-heading"
    >
      <div className="contact__grid">
        {/* Col 1 to 3: Small top-left label */}
        <div className="contact__label-col contact__reveal-item">
          <h2 id="contact-heading" className="contact__label">
            Contact
          </h2>
          <span className="contact__label-sub">Let's talk</span>
        </div>

        {/* Col 4 to 12: Huge headline with word-rise inside mask */}
        <div className="contact__headline-col">
          <h3 className="contact__headline">
            {headlineWords.map((word, i) => (
              <span key={i} className="contact__headline-word-wrap">
                <span
                  className="contact__headline-word"
                  style={{ "--word-idx": i }}
                >
                  {word}
                </span>
              </span>
            ))}
            <span className="contact__headline-arrow-wrap">
              <span
                className="contact__headline-arrow"
                style={{ "--word-idx": headlineWords.length }}
                aria-hidden="true"
              >
                ↗
              </span>
            </span>
          </h3>
        </div>

        {/* Left Column (Cols 4 to 7): Email + Available for */}
        <div className="contact__left-col contact__reveal-item">
          <div className="contact__email-block">
            <h4 className="contact__block-label">Email</h4>
            <div className="contact__email-row">
              <a
                href={`mailto:${SITE.email}`}
                className="contact__email-link cursor-target"
                data-cursor-label="Email"
                aria-label={`Send email to ${SITE.email}`}
              >
                {SITE.email}
              </a>
              <button
                type="button"
                className="contact__copy-btn cursor-target"
                data-cursor-label="Open"
                onClick={handleCopyEmail}
                aria-label="Copy email address"
              >
                {copied ? "Copied" : "Copy"}
              </button>
              {/* Aria-live announcement for screen readers */}
              <span className="sr-only" aria-live="polite" style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}>
                {copied ? "Email address copied to clipboard." : ""}
              </span>
            </div>
          </div>

          <div className="contact__available-block">
            <h4 className="contact__block-label">Available for</h4>
            <ul className="contact__available-list">
              {SITE.availableFor?.map((item, idx) => (
                <li key={idx} className="contact__available-item">
                  <span className="contact__available-dot" aria-hidden="true">
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column (Cols 8 to 12): Form */}
        <div className="contact__right-col contact__reveal-item">
          <ContactForm />
        </div>

        {/* Social Links Row (Cols 4 to 12) */}
        <div className="contact__socials-col contact__reveal-item">
          <div className="contact__socials">
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact__social-link cursor-target"
              data-cursor-label="Open"
              aria-label="Sudhanshu Baberwal on LinkedIn"
            >
              <span>LinkedIn</span>
              <span className="contact__social-arrow" aria-hidden="true">
                ↗
              </span>
            </a>

            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact__social-link cursor-target"
              data-cursor-label="Open"
              aria-label="Sudhanshu Baberwal on GitHub"
            >
              <span>GitHub</span>
              <span className="contact__social-arrow" aria-hidden="true">
                ↗
              </span>
            </a>

            <a
              href={SITE.resume}
              download
              className="contact__social-link cursor-target"
              data-cursor-label="Open"
              aria-label="Download resume PDF"
            >
              <span>Resume</span>
              <span
                className="contact__social-arrow contact__social-arrow--down"
                aria-hidden="true"
              >
                ↓
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
