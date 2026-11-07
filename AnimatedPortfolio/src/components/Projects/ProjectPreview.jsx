import React from "react";

export default function ProjectPreview({
  activeProject,
  isVisible,
  pos,
}) {
  if (!activeProject) return null;

  return (
    <div
      className={`projects__cursor-preview ${isVisible ? "is-visible" : ""}`}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
      aria-hidden="true"
    >
      <div className="projects__cursor-preview-inner">
        {activeProject.image ? (
          <img
            src={activeProject.image}
            alt=""
            width="360"
            height="240"
            className="projects__cursor-preview-img"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              if (e.currentTarget.nextElementSibling) {
                e.currentTarget.nextElementSibling.style.display = "flex";
              }
            }}
          />
        ) : null}
        <div
          className="projects__preview-fallback"
          style={{ display: activeProject.image ? "none" : "flex" }}
        >
          <span className="projects__fallback-index">{activeProject.id}</span>
          <span className="projects__fallback-title">{activeProject.title}</span>
        </div>
      </div>
    </div>
  );
}
