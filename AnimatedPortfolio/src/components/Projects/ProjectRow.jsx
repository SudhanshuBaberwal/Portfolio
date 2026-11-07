import React from "react";

export default function ProjectRow({
  project,
  index,
  isOpen,
  isRevealed,
  onToggle,
  onMouseEnter,
  onMouseLeave,
  isDimmed,
}) {
  const panelId = `project-panel-${project.id}`;
  const headerId = `project-header-${project.id}`;

  return (
    <li
      data-row-id={project.id}
      className={`projects__row ${isOpen ? "is-open" : ""} ${
        isRevealed ? "is-revealed" : ""
      } ${isDimmed ? "is-dimmed" : ""}`}
      onMouseEnter={() => onMouseEnter(project)}
      onMouseLeave={onMouseLeave}
    >
      <button
        type="button"
        id={headerId}
        className="projects__row-header"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => onToggle(project.id)}
      >
        <span className="projects__row-index" aria-hidden="true">
          {project.id}
        </span>
        <span className="projects__row-title">{project.title}</span>
        <span className="projects__row-tags">{project.tags.join(", ")}</span>
        <span className="projects__row-icon" aria-hidden="true">
          <svg
            className="projects__plus-icon"
            viewBox="0 0 20 20"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <line x1="10" y1="4" x2="10" y2="16" className="projects__plus-v" />
            <line x1="4" y1="10" x2="16" y2="10" className="projects__plus-h" />
          </svg>
        </span>
      </button>

      {/* Accordion panel with smooth grid 0fr -> 1fr transition */}
      <div
        id={panelId}
        className="projects__row-collapse"
        role="region"
        aria-labelledby={headerId}
      >
        <div className="projects__row-collapse-inner">
          <div className="projects__detail-grid">
            {/* Left Column: Problem & Built */}
            <div className="projects__detail-left">
              <div className="projects__detail-block">
                <h4 className="projects__detail-heading">Problem</h4>
                <p className="projects__detail-text">{project.problem}</p>
              </div>

              <div className="projects__detail-block">
                <h4 className="projects__detail-heading">What I built</h4>
                <ul className="projects__built-list">
                  {project.built.map((item, idx) => (
                    <li key={idx} className="projects__built-item">
                      <span className="projects__built-dot" aria-hidden="true">
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {project.result && (
                <div className="projects__detail-block">
                  <h4 className="projects__detail-heading">Result</h4>
                  <p className="projects__detail-text">{project.result}</p>
                </div>
              )}
            </div>

            {/* Right Column: Screenshot, full tech tags, links */}
            <div className="projects__detail-right">
              <div className="projects__detail-image-wrap">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={`${project.title} interface preview`}
                    width="640"
                    height="400"
                    className="projects__detail-image"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      if (e.currentTarget.nextElementSibling) {
                        e.currentTarget.nextElementSibling.style.display = "flex";
                      }
                    }}
                  />
                ) : null}
                <div
                  className="projects__preview-fallback projects__detail-image-fallback"
                  style={{ display: project.image ? "none" : "flex" }}
                >
                  <span className="projects__fallback-index">{project.id}</span>
                  <span className="projects__fallback-title">{project.title}</span>
                </div>
              </div>

              <div className="projects__detail-meta">
                <div className="projects__tech-chips" aria-label="Technologies used">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="projects__tech-chip">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="projects__detail-links">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="projects__detail-link"
                      aria-label={`${project.title} source code on GitHub`}
                    >
                      <span>GitHub</span>
                      <span className="projects__arrow" aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="projects__detail-link"
                      aria-label={`${project.title} live deployment`}
                    >
                      <span>Live</span>
                      <span className="projects__arrow" aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
