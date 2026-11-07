import React from "react";

export default function SkillsItem({
  item,
  isHovered,
  isAnyHovered,
  isPinned,
  onMouseEnter,
  onMouseLeave,
  onClick,
  itemIndex,
}) {
  // If some item is hovered, dim this one unless it IS the hovered one
  const isDimmed = isAnyHovered && !isHovered;

  return (
    <span className="skills__item-wrapper">
      <button
        type="button"
        className={`skills__item-btn ${isHovered ? "is-hovered" : ""} ${
          isDimmed ? "is-dimmed" : ""
        } ${isPinned ? "is-pinned" : ""}`}
        aria-pressed={isPinned}
        aria-label={`${item.name} — ${item.note}`}
        onMouseEnter={() => onMouseEnter(item)}
        onMouseLeave={onMouseLeave}
        onClick={() => onClick(item)}
        style={{
          "--item-idx": itemIndex,
        }}
      >
        <span className="skills__item-name">{item.name}</span>
        {isPinned && <span className="skills__item-pinned-dot" aria-hidden="true">•</span>}
      </button>
    </span>
  );
}
