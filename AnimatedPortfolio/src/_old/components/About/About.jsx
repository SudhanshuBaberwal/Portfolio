import React, { useRef, useEffect, useState, lazy, Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionIndex from "../common/SectionIndex";
import portraitImg from "../../assets/about-portrait.png";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

// Lazy-load 3D R3F Brain Canvas for performance
const BrainCanvas = lazy(() => import("../../_old/components/BrainCanvas"));

const THINKING_STEPS = [
  "ANALYZE",
  "BREAK_DOWN",
  "DESIGN",
  "IMPLEMENT",
  "TEST",
  "ITERATE",
];

const PHILOSOPHY_ITEMS = [
  {
    num: "01",
    desc: "Turn complex problems into simple, scalable solutions",
  },
  {
    num: "02",
    desc: "Build systems that create real world impact",
  },
  {
    num: "03",
    desc: "Constantly learn, improve and stay curious",
  },
  {
    num: "04",
    desc: "Technology is a tool to empower people",
  },
];

const About = () => {
  const sectionRef = useRef(null);
  const portraitRef = useRef(null);
  const philosophyListRef = useRef(null);
  const narrativeRef = useRef(null);

  // Mouse position state for subtle brain tilt & portrait parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Type-in & highlight state for THINKING_PROCESS
  const [typedIndex, setTypedIndex] = useState(0);
  const [activeHighlightIndex, setActiveHighlightIndex] = useState(-1);

  // 1. Thinking Process typewriter & continuous highlight loop
  useEffect(() => {
    // Type in sequentially
    if (typedIndex < THINKING_STEPS.length) {
      const timer = setTimeout(() => {
        setTypedIndex((prev) => prev + 1);
      }, 350);
      return () => clearTimeout(timer);
    } else {
      // Loop highlight through steps continuously
      const loopInterval = setInterval(() => {
        setActiveHighlightIndex((prev) => (prev + 1) % THINKING_STEPS.length);
      }, 1200);
      return () => clearInterval(loopInterval);
    }
  }, [typedIndex]);

  // 2. Parallax and GSAP ScrollTrigger Animations
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Mouse movement handler
    const handleMouseMove = (e) => {
      if (prefersReducedMotion) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });

      // Portrait gentle parallax shift
      if (portraitRef.current) {
        gsap.to(portraitRef.current, {
          x: x * 10,
          y: y * 8,
          duration: 1.2,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // ScrollTrigger animations
    if (!prefersReducedMotion && philosophyListRef.current) {
      const items = philosophyListRef.current.querySelectorAll(".philosophy-item");
      gsap.fromTo(
        items,
        {
          opacity: 0,
          x: 40,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.16,
          ease: "power3.out",
          scrollTrigger: {
            trigger: philosophyListRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Narrative fade in
    if (!prefersReducedMotion && narrativeRef.current) {
      gsap.fromTo(
        narrativeRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: narrativeRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section className="about-cinematic" ref={sectionRef} id="about">
      {/* Background Soft Glow */}
      <div className="about-bg-glow" />

      <div className="about-container-inner">
        {/* 3-COLUMN MASTER GRID */}
        <div className="about-grid">
          {/* COLUMN 1: PORTRAIT & 02 SECTION INDEX */}
          <div className="about-col-left">
            <div className="about-header-meta">
              <SectionIndex
                number="02"
                title=""
                subtitle="ABOUT ME"
                className="mb-2!"
              />
              <div className="about-curious-tag font-mono">
                CURIOUS / LEARNER / PROBLEM SOLVER.
              </div>
            </div>

            <div className="portrait-frame" ref={portraitRef}>
              <img
                src={portraitImg}
                alt="Sudhanshu Babbar - Profile"
                className="portrait-img"
                loading="lazy"
              />
              <div className="portrait-fade-mask" />
              <div className="portrait-scanline font-mono">// PROFILE.RAW</div>
            </div>
          </div>

          {/* COLUMN 2: 3D GLOWING BRAIN & THINKING_PROCESS PANEL */}
          <div className="about-col-center">
            <div className="brain-stage-wrapper">
              <div className="brain-glow-ring" />
              <Suspense
                fallback={
                  <div className="text-zinc-600 font-mono text-xs flex items-center justify-center h-full">
                    INITIALIZING NEURAL CLOUD...
                  </div>
                }
              >
                <BrainCanvas mousePos={mousePos} />
              </Suspense>
            </div>

            {/* THINKING_PROCESS.EXE PANEL */}
            <div className="thinking-panel">
              <div className="thinking-panel-header">
                <span className="panel-title font-mono">
                  THINKING_PROCESS.EXE
                </span>
                <span className="panel-status font-mono">RUNNING</span>
              </div>
              <div className="thinking-steps font-mono">
                {THINKING_STEPS.map((step, idx) => {
                  const isVisible = idx < typedIndex;
                  const isHighlighted = idx === activeHighlightIndex;
                  return (
                    <span
                      key={step}
                      className={`step-bracket ${
                        isVisible ? "active" : "opacity-0"
                      } ${isHighlighted ? "highlight-loop" : ""}`}
                    >
                      [{step}]
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* COLUMN 3: // MY PHILOSOPHY */}
          <div className="about-col-right">
            <div className="philosophy-header">
              <span className="philosophy-title font-mono">// MY PHILOSOPHY</span>
              <div className="philosophy-line" />
            </div>

            <div className="philosophy-list" ref={philosophyListRef}>
              {PHILOSOPHY_ITEMS.map((item) => (
                <div key={item.num} className="philosophy-item">
                  <span className="phil-number font-mono">({item.num})</span>
                  <p className="phil-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM EXTENDED NARRATIVE & VALUES BAR */}
        <div className="about-narrative-section" ref={narrativeRef}>
          {/* Tag row */}
          <div className="keywords-tag-row font-mono">
            <span>[ IDEAS ]</span>
            <span>[ PEOPLE ]</span>
            <span>[ TECHNOLOGY ]</span>
            <span>[ IMPACT ]</span>
          </div>

          {/* Headline */}
          <h2 className="about-headline">
            I AM A PROBLEM SOLVER, ARCHITECTING SCALABLE SOLUTIONS...
          </h2>

          {/* Paragraph */}
          <p className="about-body-paragraph">
            With a strong focus on backend infrastructure, systems engineering, and modern cloud architecture,
            I craft resilient systems designed to endure scale and high throughput. I believe great engineering
            is not simply about writing lines of code, but deeply understanding human needs, isolating bottlenecks,
            and iteratively delivering elegant digital architecture.
          </p>

          {/* Values Bar */}
          <div className="values-bar font-mono">
            <span className="value-item">INNOVATION</span>
            <span className="value-divider" />
            <span className="value-item">EFFICIENCY</span>
            <span className="value-divider" />
            <span className="value-item">COLLABORATION</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
