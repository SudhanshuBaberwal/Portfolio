import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import "./PillNav.css";

/* ─── spring easing from bounce prop ─────────────────────── */
function springEasing(bounce) {
  const b = Math.max(0, Math.min(1, bounce ?? 0.3));
  const overshoot = (1 + b * 1.5).toFixed(2);           // 1.0 – 2.5
  return `cubic-bezier(0.34, ${overshoot}, 0.64, 1)`;
}

/* ─── PillNav ─────────────────────────────────────────────── */
export default function PillNav({
  logo,
  logoAlt     = "Logo",
  items       = [],
  activeHref,
  /* itemStyle = "pill"   — only "pill" implemented */
  /* hoverEffect = "fill" — only "fill" implemented */
  indicator   = "dot",
  /* layout = "split"     — logo left, items center */
  surface     = "glass",
  size        = "md",
  bounce      = 0.3,
  /* stretch = 0.5        — handled via spring easing */
  collapse    = "auto",   /* "auto" → ≤768px collapses to toggle */
  intro       = false,
}) {
  const [mounted, setMounted]   = useState(!intro);
  const [menuOpen, setMenuOpen] = useState(false);

  const navRef      = useRef(null);
  const itemRefs    = useRef({});
  const dotRef      = useRef(null);
  const easing      = springEasing(bounce);

  /* ── Intro reveal ──────────────────────────────────────── */
  useEffect(() => {
    if (!intro) return;
    // allow one paint so CSS transition fires correctly
    const id = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(id);
  }, [intro]);

  /* ── Dot positioning ───────────────────────────────────── */
  const positionDot = useCallback(() => {
    const dot       = dotRef.current;
    const container = navRef.current?.querySelector(".pillnav__items");
    const activeEl  = itemRefs.current[activeHref];
    if (!dot || !container || !activeEl) return;

    const cRect = container.getBoundingClientRect();
    const iRect = activeEl.getBoundingClientRect();
    const x = iRect.left - cRect.left + (iRect.width - 6) / 2;
    dot.style.transform = `translateX(${x}px)`;
  }, [activeHref]);

  /* position when active changes */
  useEffect(() => {
    const id = setTimeout(positionDot, 50);
    return () => clearTimeout(id);
  }, [positionDot]);

  /* position when pill finishes intro reveal */
  useEffect(() => {
    if (!mounted) return;
    const id = setTimeout(positionDot, 80);
    return () => clearTimeout(id);
  }, [mounted, positionDot]);

  /* position on resize */
  useEffect(() => {
    const ro = new ResizeObserver(positionDot);
    if (navRef.current) ro.observe(navRef.current);
    return () => ro.disconnect();
  }, [positionDot]);

  /* ── Close menu on outside click ───────────────────────── */
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (!navRef.current?.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, [menuOpen]);

  /* ── Close on Escape ───────────────────────────────────── */
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [menuOpen]);

  /* ── Smooth scroll helper ──────────────────────────────── */
  const handleClick = useCallback((e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduced ? "instant" : "smooth" });
  }, []);

  /* ── Class list ────────────────────────────────────────── */
  const cls = [
    "pillnav",
    `pillnav--${size}`,
    `pillnav--${surface}`,
    `pillnav--layout-${collapse}`,
    mounted   ? "pillnav--visible" : "",
    menuOpen  ? "pillnav--open"    : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <nav
      ref={navRef}
      className={cls}
      aria-label="Primary"
      style={{ "--pn-spring": easing }}
    >
      {/* ── Logo (split: always left) ─────────────────── */}
      {logo && (
        <a
          href={items[0]?.href ?? "#top"}
          className="pillnav__logo cursor-target"
          data-cursor-label="Go"
          aria-label={logoAlt}
          onClick={(e) => handleClick(e, items[0]?.href ?? "#top")}
        >
          <img src={logo} alt="" aria-hidden="true" width="20" height="20" />
        </a>
      )}

      {/* ── Desktop items ─────────────────────────────── */}
      <div className="pillnav__items" role="list">
        {/* Sliding dot */}
        {indicator === "dot" && (
          <span
            ref={dotRef}
            className="pillnav__dot"
            aria-hidden="true"
            style={{
              transition: `transform 0.5s ${easing}`,
            }}
          />
        )}

        {items.map((item) => {
          const isActive = activeHref === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              role="listitem"
              ref={(el) => {
                if (el) itemRefs.current[item.href] = el;
              }}
              className={`pillnav__item cursor-target${isActive ? " is-active" : ""}`}
              data-cursor-label="Go"
              aria-current={isActive ? "page" : undefined}
              onClick={(e) => handleClick(e, item.href)}
            >
              {/* Rising fill */}
              <span className="pillnav__item-fill" aria-hidden="true" />

              {/* Rolling label (two copies) */}
              <span className="pillnav__item-label">
                <span className="pillnav__item-text">{item.label}</span>
                <span
                  className="pillnav__item-text pillnav__item-text--alt"
                  aria-hidden="true"
                >
                  {item.label}
                </span>
              </span>
            </a>
          );
        })}
      </div>

      {/* ── Mobile toggle ─────────────────────────────── */}
      <button
        className="pillnav__toggle cursor-target"
        data-cursor-label="Open"
        onClick={(e) => {
          e.stopPropagation();
          setMenuOpen((v) => !v);
        }}
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        aria-controls="pillnav-mobile-menu"
      >
        {/* Animated hamburger → X lines */}
        <span className="pillnav__toggle-line" aria-hidden="true" />
        <span className="pillnav__toggle-line" aria-hidden="true" />
        <span className="pillnav__toggle-line" aria-hidden="true" />
      </button>

      {/* ── Mobile dropdown ───────────────────────────── */}
      <div
        id="pillnav-mobile-menu"
        className={`pillnav__mobile-menu${menuOpen ? " is-open" : ""}`}
        role="menu"
        aria-label="Site navigation"
      >
        {items.map((item) => {
          const isActive = activeHref === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              role="menuitem"
              className={`pillnav__mobile-item cursor-target${isActive ? " is-active" : ""}`}
              data-cursor-label="Go"
              aria-current={isActive ? "page" : undefined}
              onClick={(e) => handleClick(e, item.href)}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

