import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollStack, { ScrollStackItem } from "../ScrollStack/ScrollStack.jsx";
import ProjectCard from "./ProjectCard.jsx";
import { PROJECTS } from "../../data/projects.js";
import "./Projects.css";

export default function Projects() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const handler = (e) => setReducedMotion(e.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  // Home page shows projects.filter(p => p.featured).slice(0, 3)
  const featuredProjects = PROJECTS.filter((p) => p.featured).slice(0, 3);
  if (featuredProjects.length < 3) {
    const remaining = PROJECTS.filter((p) => !featuredProjects.includes(p));
    featuredProjects.push(...remaining.slice(0, 3 - featuredProjects.length));
  }

  return (
    <section id="projects" className="projects" aria-labelledby="projects-heading">
      <div className="projects__container">
        {/* Header row */}
        <div className="projects__header">
          <div className="projects__header-left">
            <h2 id="projects-heading" className="projects__label-title">
              Selected Projects
            </h2>
            <span className="projects__label-sub">2024–2026</span>
          </div>

          <div className="projects__header-right">
            <a
              href="https://github.com/SudhanshuBaberwal"
              target="_blank"
              rel="noopener noreferrer"
              className="projects__github-link cursor-target"
              data-cursor-label="Open"
              aria-label="Sudhanshu Baberwal on GitHub"
            >
              <span>All on GitHub</span>
              <span className="projects__github-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </div>

        {/* ScrollStack (or plain vertical list for reduced motion) */}
        {reducedMotion ? (
          <div className="projects__plain-list">
            {featuredProjects.map((project, idx) => (
              <div key={project.id} className="projects__plain-item">
                <ProjectCard project={project} index={idx} total={3} />
              </div>
            ))}
          </div>
        ) : (
          <div className="projects__stack-wrapper">
            <ScrollStack
              useWindowScroll={true}
              stackPosition="12%"
              itemDistance={120}
              itemStackDistance={24}
              itemScale={0.04}
              baseScale={0.92}
              dimAmount={0.25}
              holdDistance={160}
            >
              {featuredProjects.map((project, idx) => (
                <ScrollStackItem key={project.id}>
                  <ProjectCard project={project} index={idx} total={3} />
                </ScrollStackItem>
              ))}
            </ScrollStack>
          </div>
        )}

        {/* Under the stack: Prominent link "All projects ↗" */}
        <div className="projects__footer">
          <Link
            to="/projects"
            className="projects__all-link cursor-target"
            data-cursor-label="View all"
          >
            <span>All projects</span>
            <span className="projects__all-arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
