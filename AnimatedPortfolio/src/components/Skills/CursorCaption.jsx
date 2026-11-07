import React from "react";

export default function CursorCaption({ note, isVisible, pos }) {
  if (!note) return null;

  return (
    <div
      className={`skills__cursor-caption ${isVisible ? "is-visible" : ""}`}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
      aria-hidden="true"
    >
      <div className="skills__cursor-caption-pill">
        <span className="skills__cursor-caption-dot" aria-hidden="true">•</span>
        <span className="skills__cursor-caption-text">{note}</span>
      </div>
    </div>
  );
}
