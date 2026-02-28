import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- PREMIUM SMOOTH SCROLL FUNCTION ---
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMenuOpen(false); 

    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    const navbarHeight = 80; // Adjust if your navbar is taller/shorter
    const elementPosition = targetElement.getBoundingClientRect().top;
    const targetPosition = elementPosition + window.scrollY - navbarHeight;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    
    // Animation settings
    const duration = 1200; // 1.2 seconds. Increase for slower, decrease for faster.
    let startTime = null;

    // Premium Easing Curve (easeInOutQuart) - Starts slow, speeds up, glides to a stop
    const ease = (t) => {
      return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
    };

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1); // Prevents going over 100%

      // Calculate the next frame's position using the easing curve
      window.scrollTo(0, startPosition + distance * ease(progress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation); // Keep animating until duration is met
      }
    };

    requestAnimationFrame(animation); // Start the animation
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      
      <div className="logo">
        Babber<span className="dot">.</span>
      </div>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <div className="mobile-close" onClick={() => setMenuOpen(false)}>×</div>
        
        {["Home", "Projects", "About"].map((item) => {
          const sectionId = item.toLowerCase();
          return (
            <li key={item}>
              <a 
                href={`#${sectionId}`} 
                onClick={(e) => handleNavClick(e, sectionId)}
              >
                <span className="link-text">{item}</span>
                <span className="link-glow"></span>
              </a>
            </li>
          );
        })}
        <li>
          <a 
            href="#contact" 
            className="contact-btn-cyber" 
            onClick={(e) => handleNavClick(e, "contact")}
          >
            Let's Talk
          </a>
        </li>
      </ul>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
      </div>

      <div 
        className="scroll-progress-bar" 
        style={{ transform: `scaleX(${scrollProgress})` }}
      ></div>

    </nav>
  );
};

export default Navbar;