import React, { useEffect, useRef, useState } from "react";

/**
 * WordReveal:
 * Renders statement as real accessible DOM text.
 * Each word transitions from 20% to 100% opacity as the paragraph
 * moves through the viewport.
 * If reduced motion is preferred, renders all words at 100% opacity immediately.
 */
export default function WordReveal({ text, className }) {
  const containerRef = useRef(null);
  const words = text.split(/\s+/).filter(Boolean);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      setProgress(1);
      return;
    }

    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // Start reveal when top enters viewport (vh * 0.9)
      // Fully reveal when top is halfway up (vh * 0.35)
      const start = vh * 0.9;
      const end = vh * 0.35;
      const current = rect.top;

      const p = Math.min(1, Math.max(0, (start - current) / (start - end)));
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalWords = words.length;

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, i) => {
        // Individual word threshold
        const wordThreshold = i / totalWords;
        const isRevealed = progress >= wordThreshold;

        return (
          <span
            key={i}
            className={`about__word ${isRevealed ? "is-revealed" : ""}`}
            style={{
              opacity: isRevealed ? 1 : 0.2,
              transition: "opacity 0.25s ease",
            }}
          >
            {word}
            {i < totalWords - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}
