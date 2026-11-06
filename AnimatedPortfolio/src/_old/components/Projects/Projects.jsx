import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionIndex from "../common/SectionIndex";
import SELECTED_PROJECTS  from "../../data/projects.js";
import "./Projects.css";

gsap.registerPlugin(ScrollTrigger);

// Arrow Link SVG Component
const ExternalArrowIcon = () => (
  <svg className="link-arrow-icon" viewBox="0 0 24 24">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const Projects = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const modalRef = useRef(null);
  const previouslyFocusedElement = useRef(null);

  const [activeProject, setActiveProject] = useState(null);

  // 1. GSAP ScrollTrigger Entrance Stagger
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!prefersReducedMotion && gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".work-card-wrapper");
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 50,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
  }, []);

  // 2. Mouse Move Card Tilt Effect
  const handleCardMouseMove = (e, cardEl) => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion || !cardEl) return;

    const rect = cardEl.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(cardEl, {
      rotationY: x * 10,
      rotationX: -y * 10,
      transformPerspective: 1000,
      duration: 0.3,
      ease: "power1.out",
    });
  };

  const handleCardMouseLeave = (cardEl) => {
    if (!cardEl) return;
    gsap.to(cardEl, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  // 3. Modal Focus Trap & Esc Key Navigation
  const openModal = (project) => {
    previouslyFocusedElement.current = document.activeElement;
    setActiveProject(project);
    if (window.__lenis) {
      window.__lenis.stop();
    }
  };

  const closeModal = () => {
    setActiveProject(null);
    if (window.__lenis) {
      window.__lenis.start();
    }
    if (previouslyFocusedElement.current) {
      previouslyFocusedElement.current.focus();
    }
  };

  useEffect(() => {
    if (!activeProject) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }

      // Simple modal focus trap
      if (e.key === "Tab" && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Focus the modal container
    if (modalRef.current) {
      modalRef.current.focus();
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeProject]);

  return (
    <section className="work-cinematic" id="projects" ref={sectionRef}>
      {/* Background Soft Glow */}
      <div className="work-bg-glow" />

      <div className="work-container-inner">
        {/* SECTION HEADER */}
        <div className="work-header-meta">
          <SectionIndex
            number="03"
            title="SELECTED WORK"
            subtitle="ENGINEERING PORTFOLIO"
            className="mb-2!"
          />
          <div className="work-tagline font-mono">
            // RESILIENT ARCHITECTURES, CONCURRENCY & SCALABLE SYSTEMS.
          </div>
        </div>

        {/* 3D PERSPECTIVE GRID */}
        <div className="work-grid-stage" ref={gridRef}>
          {SELECTED_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="work-card-wrapper"
              tabIndex="0"
              role="button"
              aria-label={`Inspect ${project.title}`}
              onMouseMove={(e) => handleCardMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleCardMouseLeave(e.currentTarget)}
              onClick={() => openModal(project)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openModal(project);
                }
              }}
            >
              <div className="work-card-glass">
                {/* Top Meta Bar */}
                <div className="card-top-row font-mono">
                  <span className="card-index-mono">// {project.id}</span>
                  <span className="card-category-tag">{project.category}</span>
                </div>

                {/* Title */}
                <h3 className="card-title">{project.title}</h3>

                {/* One-Line Problem Box */}
                <div className="card-problem-box">
                  <span className="problem-label font-mono">
                    CHALLENGE / PROBLEM:
                  </span>
                  <p className="problem-text">{project.problem}</p>
                </div>

                {/* Revealed Description on Hover */}
                <p className="card-hover-desc">{project.description}</p>

                {/* Tech Chips */}
                <div className="card-tech-chips font-mono">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="tech-chip">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Bottom Actions Row */}
                <div className="card-bottom-actions font-mono">
                  <div className="card-links-group">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="card-action-link"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`${project.title} GitHub repository`}
                    >
                      <span>GITHUB</span>
                      <ExternalArrowIcon />
                    </a>

                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="card-action-link"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`${project.title} Live deployment`}
                    >
                      <span>LIVE</span>
                      <ExternalArrowIcon />
                    </a>
                  </div>

                  <span className="card-inspect-hint font-mono">
                    [ CLICK TO INSPECT ]
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DETAIL MODAL PANEL */}
      {activeProject && (
        <div
          className="work-modal-backdrop"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          <div
            className="work-modal-panel"
            ref={modalRef}
            tabIndex="-1"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              className="modal-close-btn"
              onClick={closeModal}
              aria-label="Close project details"
            >
              ✕
            </button>

            {/* Header Meta */}
            <div className="modal-header-meta font-mono">
              <span className="modal-index-tag">// {activeProject.id}</span>
              <span className="modal-category-badge">
                {activeProject.category}
              </span>
            </div>

            <h2 id="modal-project-title" className="modal-title">
              {activeProject.title}
            </h2>

            {/* Tech Stack Chips */}
            <div className="card-tech-chips font-mono">
              {activeProject.tech.map((t, i) => (
                <span key={i} className="tech-chip">
                  {t}
                </span>
              ))}
            </div>

            {/* Long Architecture Description */}
            <h4 className="modal-section-title font-mono">
              // ARCHITECTURE & CONTEXT
            </h4>
            <p className="modal-description-text">
              {activeProject.longDescription}
            </p>

            {/* What I Built */}
            <h4 className="modal-section-title font-mono">// WHAT I BUILT</h4>
            <ul className="modal-bullet-list">
              {activeProject.whatIBuilt.map((point, index) => (
                <li key={index} className="modal-bullet-item">
                  <span className="bullet-bracket font-mono">[+]</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* Results / Metric Callout */}
            {activeProject.results && (
              <div className="modal-results-callout">
                <div className="results-label font-mono">
                  // RESULTS & PERFORMANCE
                </div>
                <div className="results-text">{activeProject.results}</div>
              </div>
            )}

            {/* Modal Actions Footer */}
            <div className="modal-actions-bar font-mono">
              <div className="modal-btns-group">
                <a
                  href={activeProject.live}
                  target="_blank"
                  rel="noreferrer"
                  className="modal-btn-primary"
                >
                  <span>LIVE DEMO</span>
                  <ExternalArrowIcon />
                </a>

                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="modal-btn-outline"
                >
                  <span>VIEW REPO</span>
                  <ExternalArrowIcon />
                </a>
              </div>

              <span className="modal-esc-hint font-mono">
                PRESS [ESC] TO CLOSE
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
