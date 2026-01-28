import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Handle Navbar Background
      setScrolled(window.scrollY > 50);

      // 2. Handle Progress Bar
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      
      {/* Logo Area */}
      <div className="logo">
        Babber<span className="dot">.</span>
      </div>

      {/* Desktop & Mobile Links */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        {/* Close button for mobile strictly */}
        <div className="mobile-close" onClick={() => setMenuOpen(false)}>×</div>
        
        {["Home", "Projects", "About"].map((item) => (
          <li key={item}>
            <a 
              href={`#${item.toLowerCase()}`} 
              onClick={() => setMenuOpen(false)}
            >
              <span className="link-text">{item}</span>
              <span className="link-glow"></span>
            </a>
          </li>
        ))}
        <li>
          <a href="#contact" className="contact-btn-cyber" onClick={() => setMenuOpen(false)}>
            Let's Talk
          </a>
        </li>
      </ul>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
      </div>

      {/* Scroll Progress Bar (Bottom of Nav) */}
      <div 
        className="scroll-progress-bar" 
        style={{ transform: `scaleX(${scrollProgress})` }}
      ></div>

    </nav>
  );
};

export default Navbar;