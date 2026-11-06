import React from "react";

export default function ProjectPreview({
  activeProject,
  isVisible,
  pos,
}) {
  if (!activeProject) return null;

  return (
    <div
      className={`work__cursor-preview ${isVisible ? "is-visible" : ""}`}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
      aria-hidden="true"
    >
      <div className="work__cursor-preview-inner">
        {activeProject.image ? (
          <img
            src={activeProject.image}
            alt=""
            className="work__cursor-preview-img"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              if (e.currentTarget.nextElementSibling) {
                e.currentTarget.nextElementSibling.style.display = "flex";
              }
            }}
          />
        ) : null}
        <div
          className="work__preview-fallback"
          style={{ display: activeProject.image ? "none" : "flex" }}
        >
          <span className="work__fallback-index">{activeProject.id}</span>
          <span className="work__fallback-title">{activeProject.title}</span>
        </div>
      </div>
    </div>
  );
}
