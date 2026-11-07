import React, { useState } from "react";
import "./ProjectCard.css";

export default function ProjectCard({ project, index, total = 3 }) {
  const [imgError, setImgError] = useState(false);
  const formattedIndex = `${project.id} / ${String(total).padStart(2, "0")}`;

  return (
    <article className="project-card" aria-label={project.title}>
      {/* Left Column: Information, Problem, Built, Tech, Links */}
      <div className="project-card__info">
        <div className="project-card__meta">
          <span className="project-card__index">{formattedIndex}</span>
          <span className="project-card__year">{project.year}</span>
          {project.tags && project.tags.length > 0 && (
            <span className="project-card__tags">
              {project.tags.join(" • ")}
            </span>
          )}
        </div>

        <h3 className="project-card__title">{project.title}</h3>

        {project.problem && (
          <p className="project-card__problem">{project.problem}</p>
        )}

        {project.built && project.built.length > 0 && (
          <div className="project-card__built-wrap">
            <h4 className="project-card__built-heading">What I built:</h4>
            <ul className="project-card__built-list">
              {project.built.map((point, idx) => (
                <li key={idx} className="project-card__built-item">
                  <span className="project-card__built-dot" aria-hidden="true">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.tech && project.tech.length > 0 && (
          <div className="project-card__chips">
            {project.tech.map((t, idx) => (
              <span key={idx} className="project-card__chip">
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="project-card__links">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link cursor-target"
              data-cursor-label="View"
              aria-label={`${project.title} GitHub repository`}
            >
              <span>GitHub</span>
              <span className="project-card__link-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          )}

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link cursor-target"
              data-cursor-label="View"
              aria-label={`${project.title} Live deployment`}
            >
              <span>Live Demo</span>
              <span className="project-card__link-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          )}
        </div>
      </div>

      {/* Right Column: Screenshot or Fallback Tile */}
      <div className="project-card__media">
        {!imgError && project.image ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            width="800"
            height="500"
            className="project-card__img"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="project-card__fallback" aria-hidden="true">
            <span className="project-card__fallback-id">{project.id}</span>
            <span className="project-card__fallback-label">{project.title}</span>
          </div>
        )}
      </div>
    </article>
  );
}
