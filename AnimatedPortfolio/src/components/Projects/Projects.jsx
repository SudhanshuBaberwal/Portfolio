import React, { useState, useEffect, useRef, useCallback } from "react";
import ProjectRow from "./ProjectRow";
import ProjectPreview from "./ProjectPreview";
import { PROJECTS } from "../../data/projects";
import "./Projects.css";

function lerp(a, b, t) {
  return a + (b - a) * t;
}

export default function Projects() {
  const [openId, setOpenId] = useState(null);
  const [revealedIds, setRevealedIds] = useState(new Set());
  const [isHeaderRevealed, setIsHeaderRevealed] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [previewPos, setPreviewPos] = useState({ x: -1000, y: -1000 });

  const sectionRef = useRef(null);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const currentPos = useRef({ x: -1000, y: -1000 });
  const rafId = useRef(null);
  const isHoveringRef = useRef(false);

  // Toggle single row at a time
  const handleToggle = useCallback((id) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  // Cursor preview animation loop
  const startPreviewLoop = useCallback(() => {
    if (rafId.current) return;

    const animate = () => {
      if (!isHoveringRef.current) {
        rafId.current = null;
        return;
      }

      currentPos.current.x = lerp(currentPos.current.x, mousePos.current.x, 0.12);
      currentPos.current.y = lerp(currentPos.current.y, mousePos.current.y, 0.12);

      // Offset by 24px so preview floats slightly off cursor center
      setPreviewPos({
        x: Math.round(currentPos.current.x - 180),
        y: Math.round(currentPos.current.y - 120),
      });

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);
  }, []);

  // Mouse move handler on window/section
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (currentPos.current.x === -1000) {
        currentPos.current = { x: e.clientX, y: e.clientY };
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handleMouseEnter = useCallback((project) => {
    // Only run on non-touch desktop devices and without reduced-motion
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced || window.innerWidth <= 900) return;

    isHoveringRef.current = true;
    setHoveredProject(project);
    startPreviewLoop();
  }, [startPreviewLoop]);

  const handleMouseLeave = useCallback(() => {
    isHoveringRef.current = false;
    setHoveredProject(null);
  }, []);

  // Scroll reveal with IntersectionObserver using React state
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setIsHeaderRevealed(true);
      setRevealedIds(new Set(PROJECTS.map((p) => p.id)));
      return;
    }

    const rows = section.querySelectorAll(".projects__row");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === section) {
              setIsHeaderRevealed(true);
            } else if (entry.target.classList.contains("projects__row")) {
              const rowId = entry.target.dataset.rowId;
              const rowIndex = Array.from(rows).indexOf(entry.target);
              setTimeout(() => {
                setRevealedIds((prev) => new Set([...prev, rowId]));
              }, rowIndex * 70);
              obs.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(section);
    rows.forEach((r) => observer.observe(r));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`work ${isHeaderRevealed ? "is-header-revealed" : ""}`}
      aria-labelledby="projects-heading"
    >
      {/* Header Row */}
      <div className="projects__header">
        <div className="projects__label-wrap">
          <h2 id="projects-heading" className="projects__label">
            Selected Projects
          </h2>
          <span className="projects__label-sub">2024–2026</span>
        </div>

        <a
          href="https://github.com/SudhanshuBaberwal"
          target="_blank"
          rel="noopener noreferrer"
          className="projects__all-link"
          aria-label="View all projects on GitHub"
        >
          <span>All on GitHub</span>
          <span className="projects__arrow" aria-hidden="true">
            ↗
          </span>
        </a>
      </div>

      {/* Projects List */}
      <ul className="projects__list" aria-label="Projects list">
        {PROJECTS.map((project, idx) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={idx}
            isOpen={openId === project.id}
            isRevealed={revealedIds.has(project.id)}
            onToggle={handleToggle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            isDimmed={hoveredProject !== null && hoveredProject.id !== project.id}
          />
        ))}
      </ul>

      {/* Desktop Floating Cursor Preview */}
      <ProjectPreview
        activeProject={hoveredProject}
        isVisible={hoveredProject !== null}
        pos={previewPos}
      />
    </section>
  );
}
