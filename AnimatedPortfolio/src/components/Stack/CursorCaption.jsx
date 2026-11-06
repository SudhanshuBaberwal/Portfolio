import React from "react";

export default function CursorCaption({ note, isVisible, pos }) {
  if (!note) return null;

  return (
    <div
      className={`stack__cursor-caption ${isVisible ? "is-visible" : ""}`}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
      aria-hidden="true"
    >
      <div className="stack__cursor-caption-pill">
        <span className="stack__cursor-caption-dot" aria-hidden="true">•</span>
        <span className="stack__cursor-caption-text">{note}</span>
      </div>
    </div>
  );
}
