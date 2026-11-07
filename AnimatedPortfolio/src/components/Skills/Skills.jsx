import React, { useState, useEffect } from "react";
import Folder from "../Folder/Folder.jsx";
import { SKILLS } from "../../data/skills.js";
import "./Skills.css";

const FOLDER_COLOR = "#e9dcd3";
const MAX_PAPERS = 6;

export default function Skills() {
  const { header, categories } = SKILLS;
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [showAsList, setShowAsList] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const handler = (e) => setReducedMotion(e.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  const handleItemClick = (skill, categoryName) => {
    if (selectedSkill && selectedSkill.name === skill.name) {
      setSelectedSkill(null);
    } else {
      setSelectedSkill({ ...skill, category: categoryName });
    }
  };

  return (
    <section id="skills" className="skills" aria-labelledby="skills-heading">
      <div className="skills__container">
        {/* Header row */}
        <div className="skills__header">
          <div className="skills__header-left">
            <h2 id="skills-heading" className="skills__title">
              {header.title}
            </h2>
            <span className="skills__sub">{header.sub}</span>
          </div>
          <div className="skills__header-right">
            <p className="skills__note">{header.note}</p>
          </div>
        </div>

        {/* Visually hidden full list for screen-reader & accessibility */}
        <div className="sr-only">
          <h3>Full Skills Directory</h3>
          {categories.map((cat) => (
            <div key={cat.id}>
              <h4>{cat.name}</h4>
              <ul>
                {cat.items.map((item, idx) => (
                  <li key={idx}>
                    <strong>{item.name}</strong>: {item.note}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* View toggle button */}
        <div className="skills__toggle-wrap">
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
                      onClick={() => handleItemClick(item, cat.name)}
                    >
                      <strong className="skills__list-item-name">{item.name}</strong>
                      <span className="skills__list-item-note">{item.note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="skills__folders-grid">
            {categories.map((category) => {
              const primaryItems = category.items.slice(0, MAX_PAPERS).map((skill) => ({
                title: skill.name,
                raw: skill,
              }));
              const extraItems = category.items.slice(MAX_PAPERS);

              return (
                <div key={category.id} className="skills__folder-cell">
                  <div className="skills__folder-wrap">
                    <Folder
                      label={category.name}
                      items={primaryItems}
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
                      onItemClick={(item) => handleItemClick(item.raw, category.name)}
                    />
                  </div>

                  {extraItems.length > 0 && (
                    <div className="skills__folder-extras">
                      <span className="skills__folder-extras-label">Also: </span>
                      {extraItems.map((item, i) => (
                        <button
                          key={i}
                          type="button"
                          className="skills__extra-item-btn cursor-target"
                          data-cursor-label="Open"
                          onClick={() => handleItemClick(item, category.name)}
                        >
                          {item.name}
                          {i < extraItems.length - 1 ? ", " : ""}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Single shared info panel under the grid */}
        <div
          className={`skills__info-panel ${selectedSkill ? "is-active" : ""}`}
          aria-live="polite"
        >
          {selectedSkill ? (
            <div className="skills__info-content">
              <span className="skills__info-category">{selectedSkill.category} /</span>
              <strong className="skills__info-name">{selectedSkill.name}:</strong>
              <span className="skills__info-note">{selectedSkill.note}</span>
              <button
                type="button"
                className="skills__info-close cursor-target"
                data-cursor-label="Open"
                onClick={() => setSelectedSkill(null)}
                aria-label="Clear selected skill note"
              >
                ×
              </button>
            </div>
          ) : (
            <p className="skills__info-placeholder">
              Click any skill paper or item to view details.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
