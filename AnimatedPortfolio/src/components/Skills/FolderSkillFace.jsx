import React, { useRef, useEffect } from "react";
import SkillLogo from "./SkillLogo.jsx";
import "./FolderSkillFace.css";

export default function FolderSkillFace({
  category,
  skills,
  activeSkill,
  onSelectSkill,
  onBack,
  reducedMotion = false,
}) {
  const backBtnRef = useRef(null);

  useEffect(() => {
    if (activeSkill && backBtnRef.current) {
      backBtnRef.current.focus();
    }
  }, [activeSkill]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && activeSkill) {
        e.stopPropagation();
        onBack();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSkill, onBack]);

  return (
    <div
      className={`folder-skill-face ${reducedMotion ? "no-motion" : ""}`}
      onClick={(e) => e.stopPropagation()} // Don't toggle folder open/close when clicking inside face
      aria-live="polite"
    >
      {activeSkill ? (
        /* In-Card Detail View */
        <div className="folder-skill-face__detail">
          <div className="folder-skill-face__detail-top">
            <span className="folder-skill-face__detail-badge">
              {category.name}
            </span>
            <button
              ref={backBtnRef}
              type="button"
              className="folder-skill-face__back-btn cursor-target"
              data-cursor-label="Open"
              onClick={(e) => {
                e.stopPropagation();
                onBack();
              }}
              aria-label="Back to skills grid"
            >
              ← Back
            </button>
          </div>

          <div className="folder-skill-face__detail-body">
            <div className="folder-skill-face__detail-icon">
              <SkillLogo name={activeSkill.name} size={44} onWhite={true} />
            </div>
            <h4 className="folder-skill-face__detail-name">
              {activeSkill.name}
            </h4>
            <p className="folder-skill-face__detail-note">
              {activeSkill.note}
            </p>
          </div>
        </div>
      ) : (
        /* Compact Logo Grid View (Dark text on warm cream flap) */
        <div className="folder-skill-face__grid">
          {skills.map((skill) => {
            return (
              <button
                key={skill.name}
                type="button"
                className="folder-skill-face__btn cursor-target"
                data-cursor-label="Open"
                aria-pressed={false}
                aria-label={`View details for ${skill.name}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectSkill(skill);
                }}
              >
                <div className="folder-skill-face__icon-wrap">
                  <SkillLogo name={skill.name} size={30} onWhite={true} />
                </div>
                <span className="folder-skill-face__label">{skill.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
