import React, { useEffect, useState } from "react";
import "./VentureDetail.css";
import Reveal from "../Reveal";

const VentureDetail = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    window.scrollTo(0, 0);

    // Target Launch Date: July 24th
    const targetDate = new Date("July 24, 2026 00:00:00").getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          secs: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="venture-teaser-wrapper">
      {/* Structural Minimalist Grid Background */}
      <div className="teaser-grid-overlay"></div>
      <div className="teaser-ambient-glow"></div>

      <div className="teaser-container">
        
        {/* Top Header Log */}
        <div className="teaser-meta-top">
          <span className="teaser-tag">// PROJECT CODE: STEALTH_VENTURE</span>
          <span className="teaser-status-pill">
            <span className="status-blink"></span> INITIALIZING ARCHITECTURE
          </span>
        </div>

        {/* Big Typographic Statement */}
        <section className="teaser-hero">
          <div className="editorial-eyebrow">A NEW STARTUP IS BORN</div>
          <Reveal direction="up">
            <h1 className="teaser-main-title">
              THE COMPLETE <br />
              <span className="teaser-outline">SYSTEM SHIFT.</span>
            </h1>
          </Reveal>
          <p className="teaser-lead">
            Something entirely custom is being engineered behind closed doors. Full-stack infrastructure, 
            autonomous agentic reasoning logic, and pixel-perfect dashboard mechanics—packaged into a disruptive startup asset.
          </p>
        </section>

        {/* The Giant Countdown Matrix */}
        <section className="countdown-matrix">
          <div className="matrix-block">
            <span className="matrix-number">{String(timeLeft.days).padStart(2, "0")}</span>
            <span className="matrix-label">DAYS</span>
          </div>
          <div className="matrix-colon">:</div>
          <div className="matrix-block">
            <span className="matrix-number">{String(timeLeft.hours).padStart(2, "0")}</span>
            <span className="matrix-label">HOURS</span>
          </div>
          <div className="matrix-colon">:</div>
          <div className="matrix-block">
            <span className="matrix-number">{String(timeLeft.mins).padStart(2, "0")}</span>
            <span className="matrix-label">MINUTES</span>
          </div>
          <div className="matrix-colon">:</div>
          <div className="matrix-block animate-pulse-sec">
            <span className="matrix-number highlight-sec">{String(timeLeft.secs).padStart(2, "0")}</span>
            <span className="matrix-label">SECONDS</span>
          </div>
        </section>

        {/* Big Reveal Drop Date Banner */}
        <section className="launch-footer-banner">
          <div className="banner-left">
            <span className="launch-date-badge">LAUNCHING // JULY 24, 2026</span>
          </div>
          <div className="banner-right">
            <p className="confidential-text">
              🔒 STACK SCHEMATICS & PRODUCTION CODEBASE ARE CURRENTLY ENCRYPTED UNDER STEALTH VALIDATION. UNLOCKING AUTOMATICALLY ON THE ZERO HOUR.
            </p>
          </div>
        </section>

      </div>
    </main>
  );
};

export default VentureDetail;