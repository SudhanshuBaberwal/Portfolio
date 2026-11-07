import React, { useState, useEffect, useRef, useCallback } from "react";
import SkillsItem from "./SkillsItem.jsx";
import CursorCaption from "./CursorCaption.jsx";
import { SKILLS } from "../../data/skills.js";
import "./Skills.css";

function lerp(a, b, t) {
  return a + (b - a) * t;
}

export default function Skills() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [pinnedItems, setPinnedItems] = useState({}); // categoryId -> item
  const [captionPos, setCaptionPos] = useState({ x: -1000, y: -1000 });

  const sectionRef = useRef(null);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const currentPos = useRef({ x: -1000, y: -1000 });
  const rafId = useRef(null);
  const isHoveringRef = useRef(false);

  // Animation frame loop for cursor caption
  const startCaptionLoop = useCallback(() => {
    if (rafId.current) return;

    const animate = () => {
      if (!isHoveringRef.current) {
        rafId.current = null;
        return;
      }

      currentPos.current.x = lerp(currentPos.current.x, mousePos.current.x, 0.15);
      currentPos.current.y = lerp(currentPos.current.y, mousePos.current.y, 0.15);

      setCaptionPos({
        x: Math.round(currentPos.current.x + 16),
        y: Math.round(currentPos.current.y - 36),
      });

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (currentPos.current.x === -1000) {
        currentPos.current = { x: e.clientX, y: e.clientY };
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handleItemMouseEnter = useCallback(
    (item) => {
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (isTouch || isReduced || window.innerWidth <= 900) return;

      isHoveringRef.current = true;
      setHoveredItem(item);
      startCaptionLoop();
    },
    [startCaptionLoop]
  );

  const handleItemMouseLeave = useCallback(() => {
    isHoveringRef.current = false;
    setHoveredItem(null);
  }, []);

  const handleItemClick = useCallback((categoryId, item) => {
    setPinnedItems((prev) => {
      if (prev[categoryId]?.name === item.name) {
        const next = { ...prev };
        delete next[categoryId];
        return next;
      }
      return {
        ...prev,
        [categoryId]: item,
      };
    });
  }, []);

  // Staggered scroll reveal
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      section.classList.add("is-header-revealed");
      section.querySelectorAll(".skills__row").forEach((el) => {
        el.classList.add("is-revealed");
      });
      return;
    }

    const rows = section.querySelectorAll(".skills__row");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === section) {
              section.classList.add("is-header-revealed");
            } else if (entry.target.classList.contains("skills__row")) {
              const rowIndex = Array.from(rows).indexOf(entry.target);
              setTimeout(() => {
                entry.target.classList.add("is-revealed");
              }, rowIndex * 70);
              obs.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(section);
    rows.forEach((r) => observer.observe(r));

    return () => observer.disconnect();
  }, []);

  const isAnyHovered = hoveredItem !== null;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="skills"
      aria-labelledby="skills-heading"
    >
      {/* Header Row */}
      <div className="skills__header">
        <div className="skills__label-wrap">
          <h2 id="skills-heading" className="skills__label">
            {SKILLS.header.title}
          </h2>
          <span className="skills__label-sub">{SKILLS.header.sub}</span>
        </div>

        <span className="skills__header-note">{SKILLS.header.note}</span>
      </div>

      {/* Categories List */}
      <ul className="skills__list">
        {SKILLS.categories.map((category) => {
          const count = String(category.items.length).padStart(2, "0");
          const pinned = pinnedItems[category.id];

          return (
            <li key={category.id} className="skills__row">
              <div className="skills__row-grid">
                {/* Col 1 to 3: Category Name & Count */}
                <div className="skills__category-col">
                  <span className="skills__category-name">{category.name}</span>
                  <span className="skills__category-count">{count}</span>
                </div>

                {/* Col 4 to 12: Items List */}
                <div className="skills__items-col">
                  {category.items.map((item, idx) => {
                    const isHovered = hoveredItem?.name === item.name;
                    const isPinned = pinned?.name === item.name;

                    return (
                      <React.Fragment key={item.name}>
                        <SkillsItem
                          item={item}
                          itemIndex={idx}
                          isHovered={isHovered}
                          isAnyHovered={isAnyHovered}
                          isPinned={isPinned}
                          onMouseEnter={handleItemMouseEnter}
                          onMouseLeave={handleItemMouseLeave}
                          onClick={(clickedItem) =>
                            handleItemClick(category.id, clickedItem)
                          }
                        />
                        {idx < category.items.length - 1 && (
                          <span className="skills__separator" aria-hidden="true">
                            /
                          </span>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Pinned Note Panel if clicked */}
                {pinned && (
                  <div
                    className="skills__pinned-panel"
                    role="status"
                    aria-live="polite"
                  >
                    <span className="skills__pinned-name">{pinned.name}:</span>
                    <span className="skills__pinned-text">{pinned.note}</span>
                    <button
                      type="button"
                      className="skills__pinned-close"
                      onClick={() => handleItemClick(category.id, pinned)}
                      aria-label={`Unpin note for ${pinned.name}`}
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {/* Floating Cursor Caption (Desktop only) */}
      <CursorCaption
        note={hoveredItem?.note}
        isVisible={hoveredItem !== null}
        pos={captionPos}
      />
    </section>
  );
}
