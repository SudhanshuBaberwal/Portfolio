import React from "react";
import { SKILL_ICONS } from "../../data/skillIcons.js";

// Helper to determine whether a brand hex is too light to read on a white background
function getContrastColor(hex) {
  if (!hex) return "#111111";
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  if (Number.isNaN(num)) return "#111111";
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  // Relative luminance
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  // If too bright (e.g. yellow, white, very pale cream), use dark
  if (lum > 0.7) return "#111111";
  return `#${clean}`;
}

export default function SkillLogo({
  name,
  size = 24,
  color,
  onWhite = false,
  className = "",
  style = {},
}) {
  const icon = SKILL_ICONS[name];
  const hex = icon?.hex;
  const resolvedColor =
    color || (onWhite ? getContrastColor(hex) : "currentColor");

  if (!icon || !icon.path) {
    // Neutral monogram badge (rounded square, first letters, cream on dark / dark on white)
    const initials = icon?.monogram || (name ? name.slice(0, 3).toUpperCase() : "•••");
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={`skill-logo skill-logo--monogram ${className}`.trim()}
        style={{ verticalAlign: "middle", flexShrink: 0, ...style }}
      >
        <rect
          x="1"
          y="1"
          width="22"
          height="22"
          rx="5"
          fill={onWhite ? "#18181b" : "rgba(251, 236, 227, 0.12)"}
          stroke={onWhite ? "rgba(0,0,0,0.15)" : "rgba(251, 236, 227, 0.3)"}
          strokeWidth="1.2"
        />
        <text
          x="12"
          y="15.5"
          fill={onWhite ? "#fbece3" : "#fbece3"}
          fontSize={initials.length > 2 ? "8" : "10"}
          fontWeight="600"
          fontFamily="Inter Tight, -apple-system, sans-serif"
          textAnchor="middle"
        >
          {initials}
        </text>
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`skill-logo ${className}`.trim()}
      style={{
        verticalAlign: "middle",
        flexShrink: 0,
        color: resolvedColor,
        fill: "currentColor",
        ...style,
      }}
    >
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}
