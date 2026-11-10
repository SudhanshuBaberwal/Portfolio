import React, { useState, useEffect } from "react";
import Folder from "../Folder/Folder.jsx";
import FolderSkillFace from "./FolderSkillFace.jsx";
import SkillLogo from "./SkillLogo.jsx";
import { SKILLS } from "../../data/skills.js";
import "./Skills.css";

const FOLDER_COLOR = "#e9dcd3";
const MAX_PAPERS = 6;

export default function Skills() {
  const { header, categories } = SKILLS;
  // activeDetails: { categoryId: string, skill: object } | null
  const [activeDetails, setActiveDetails] = useState(null);
  const [showAsList, setShowAsList] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const handler = (e) => setReducedMotion(e.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  const handleSelectSkill = (categoryId, skill) => {
    if (
      activeDetails &&
      activeDetails.categoryId === categoryId &&
      activeDetails.skill.name === skill.name
    ) {
      setActiveDetails(null);
    } else {
      setActiveDetails({ categoryId, skill });
    }
  };

  return (
    <section id="skills" className="skills" aria-labelledby="skills-heading">
      <div className="skills__container">
        {/* Header row with Title, Sub, Note, and List toggle */}
        <div className="skills__header">
          <div className="skills__header-left">
            <h2 id="skills-heading" className="skills__title">
              {header.title}
            </h2>
            <span className="skills__sub">{header.sub}</span>
          </div>

          <div className="skills__header-right">
            <p className="skills__note">{header.note}</p>
            <button
              type="button"
              className="skills__toggle-btn cursor-target"
              data-cursor-label="Open"
              onClick={() => setShowAsList((prev) => !prev)}
              aria-pressed={showAsList}
            >
              {showAsList ? "Show 3D Folders" : "Show as list"}
            </button>
          </div>
        </div>

        {/* Visually hidden full list for screen readers */}
        <div className="sr-only">
          <h3>Full Skills Directory</h3>
          {categories.map((cat) => (
            <div key={cat.id}>
              <h4>{cat.name}</h4>
              <ul>
                {cat.items.map((item, idx) => (
                  <li key={idx}>
                    <strong>{item.name}</strong>: {item.description || item.note}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Grid or List View */}
        {showAsList ? (
          <div className="skills__list-view">
            {categories.map((cat) => (
              <div key={cat.id} className="skills__list-category">
                <h3 className="skills__list-category-title">{cat.name}</h3>
                <ul className="skills__list-items">
                  {cat.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="skills__list-item cursor-target"
                      data-cursor-label="Open"
                      onClick={() => handleSelectSkill(cat.id, item)}
                    >
                      <div className="skills__list-item-header">
                        <SkillLogo name={item.name} size={20} onWhite={false} />
                        <strong className="skills__list-item-name">{item.name}</strong>
                      </div>
                      <span className="skills__list-item-note">
                        {item.description || item.note}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="skills__folders-grid">
            {categories.map((category) => {
              // Paper content: logo, name and a short paragraph about the skill
              const papers = category.items.slice(0, MAX_PAPERS).map((skill) => ({
                key: skill.name,
                content: (
                  <div className="skills__paper-card">
                    <div className="skills__paper-icon">
                      <SkillLogo name={skill.name} size={28} onWhite={true} />
                    </div>
                    <span className="skills__paper-title">{skill.name}</span>
                    <p className="skills__paper-desc">
                      {skill.description || skill.note}
                    </p>
                  </div>
                ),
                raw: skill,
              }));

              const isThisFolderActive = activeDetails?.categoryId === category.id;
              const currentActiveSkill = isThisFolderActive ? activeDetails.skill : null;

              return (
                <div key={category.id} className="skills__folder-cell">
                  <div className="skills__folder-wrap">
                    <Folder
                      label={category.name}
                      items={papers}
                      mode="flap"
                      variant="solid"
                      layout="spread"
                      color={FOLDER_COLOR}
                      paperColor="#ffffff"
                      tabPosition="right"
                      openOn="click"
                      size={1.3}
                      frost={0.25}
                      tilt={reducedMotion ? 0 : 0.5}
                      speed={reducedMotion ? 0.4 : 1}
                      bounce={reducedMotion ? 0 : 0.4}
                      peek={!reducedMotion}
                      intro={!reducedMotion}
                      draggable={!reducedMotion}
                      zoomOnClick={!reducedMotion}
                      theme="dark"
                      frontContent={
                        <FolderSkillFace
                          category={category}
                          skills={category.items}
                          activeSkill={currentActiveSkill}
                          onSelectSkill={(skill) => handleSelectSkill(category.id, skill)}
                          onBack={() => setActiveDetails(null)}
                          reducedMotion={reducedMotion}
                        />
                      }
                      onItemClick={(item) => {
                        if (item?.raw) {
                          handleSelectSkill(category.id, item.raw);
                        }
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
