import React from "react";

export default function ProjectRow({
  project,
  index,
  isOpen,
  onToggle,
  onMouseEnter,
  onMouseLeave,
  isDimmed,
}) {
  const panelId = `project-panel-${project.id}`;
  const headerId = `project-header-${project.id}`;

  return (
    <li
      className={`work__row ${isOpen ? "is-open" : ""} ${
        isDimmed ? "is-dimmed" : ""
      }`}
      onMouseEnter={() => onMouseEnter(project)}
      onMouseLeave={onMouseLeave}
    >
      <button
        type="button"
        id={headerId}
        className="work__row-header"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => onToggle(project.id)}
      >
        <span className="work__row-index" aria-hidden="true">
          {project.id}
        </span>
        <span className="work__row-title">{project.title}</span>
        <span className="work__row-tags">{project.tags.join(", ")}</span>
        <span className="work__row-icon" aria-hidden="true">
          <svg
            className="work__plus-icon"
            viewBox="0 0 20 20"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <line x1="10" y1="4" x2="10" y2="16" className="work__plus-v" />
            <line x1="4" y1="10" x2="16" y2="10" className="work__plus-h" />
          </svg>
        </span>
      </button>

      {/* Accordion panel with smooth grid 0fr -> 1fr transition */}
      <div
        id={panelId}
        className="work__row-collapse"
        role="region"
        aria-labelledby={headerId}
      >
        <div className="work__row-collapse-inner">
          <div className="work__detail-grid">
            {/* Left Column: Problem & Built */}
            <div className="work__detail-left">
              <div className="work__detail-block">
                <h4 className="work__detail-heading">Problem</h4>
                <p className="work__detail-text">{project.problem}</p>
              </div>

              <div className="work__detail-block">
                <h4 className="work__detail-heading">What I built</h4>
                <ul className="work__built-list">
                  {project.built.map((item, idx) => (
                    <li key={idx} className="work__built-item">
                      <span className="work__built-dot" aria-hidden="true">
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {project.result && (
                <div className="work__detail-block">
                  <h4 className="work__detail-heading">Result</h4>
                  <p className="work__detail-text">{project.result}</p>
                </div>
              )}
            </div>

            {/* Right Column: Screenshot, full tech tags, links */}
            <div className="work__detail-right">
              <div className="work__detail-image-wrap">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={`${project.title} interface preview`}
                    width="640"
                    height="400"
                    className="work__detail-image"
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
                  className="work__preview-fallback work__detail-image-fallback"
                  style={{ display: project.image ? "none" : "flex" }}
                >
                  <span className="work__fallback-index">{project.id}</span>
                  <span className="work__fallback-title">{project.title}</span>
                </div>
              </div>

              <div className="work__detail-meta">
                <div className="work__tech-chips" aria-label="Technologies used">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="work__tech-chip">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="work__detail-links">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work__detail-link"
                      aria-label={`${project.title} source code on GitHub`}
                    >
                      <span>GitHub</span>
                      <span className="work__arrow" aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work__detail-link"
                      aria-label={`${project.title} live deployment`}
                    >
                      <span>Live</span>
                      <span className="work__arrow" aria-hidden="true">
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
