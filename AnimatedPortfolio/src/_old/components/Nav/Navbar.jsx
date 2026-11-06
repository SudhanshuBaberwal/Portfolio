import React, { useState, useEffect } from "react";
import "./Navbar.css";

const NAV_ITEMS = [
  { label: "HOME", targetId: "home" },
  { label: "ABOUT", targetId: "about" },
  { label: "WORK", targetId: "projects" },
  { label: "STACK", targetId: "skills" },
  { label: "BLOG", targetId: "startup" },
  { label: "CONTACT", targetId: "contact" },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Determine active section based on scroll position
      const scrollY = window.scrollY;
      const offset = 180;

      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const el = document.getElementById(item.targetId);
        if (el) {
          const top = el.offsetTop - offset;
          if (scrollY >= top) {
            setActiveSection(item.targetId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMenuOpen(false);

    if (window.__lenis) {
      window.__lenis.scrollTo(`#${targetId}`, { offset: -60, duration: 1.2 });
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className={`cinematic-nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-container">
        {/* Brand / Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          className="brand-logo"
        >
          <span className="brand-dot" />
          <span className="brand-text">PORTFOLIO</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.targetId;
            return (
              <a
                key={item.targetId}
                href={`#${item.targetId}`}
                onClick={(e) => handleNavClick(e, item.targetId)}
                className={`nav-item ${isActive ? "active" : ""}`}
              >
                <span className="nav-label">{item.label}</span>
                {isActive && <span className="active-underline" />}
              </a>
            );
          })}
        </nav>

        {/* Action / Status Pill */}
        <div className="nav-right">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className="status-indicator"
          >
            <span className="pulse-dot" />
            <span className="status-label font-mono">AVAILABLE FOR WORK</span>
          </a>

          {/* Mobile Hamburger */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            className="mobile-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`toggle-line ${menuOpen ? "open-top" : ""}`} />
            <span className={`toggle-line ${menuOpen ? "open-bottom" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="mobile-menu-links">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.targetId;
            return (
              <a
                key={item.targetId}
                href={`#${item.targetId}`}
                onClick={(e) => handleNavClick(e, item.targetId)}
                className={`mobile-nav-item ${isActive ? "active" : ""}`}
              >
                <span className="mobile-nav-label font-mono">{item.label}</span>
                {isActive && <span className="mobile-active-dot" />}
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
