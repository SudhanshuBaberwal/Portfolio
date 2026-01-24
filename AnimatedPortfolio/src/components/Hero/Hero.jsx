import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Hero.css"

// REPLACE THIS WITH YOUR OWN IMAGE IF YOU WANT
import myImage from "../assets/hero.png"; // Uncomment if using local file
const avatarUrl = "https://cdni.iconscout.com/illustration/premium/thumb/3d-businessman-holding-laptop-2937691-2426391.png";

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const avatarRef = useRef(null);
  const bgTextRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // 1. Entrance Sequence
    tl.fromTo(bgTextRef.current, 
      { opacity: 0, scale: 1.5 },
      { opacity: 0.05, scale: 1, duration: 1.5, ease: "power4.out" }
    )
    .fromTo(avatarRef.current,
      { y: 500, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }, "-=1"
    )
    .fromTo(textRef.current.children, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 }, "-=0.8"
    );

    // 2. Mouse Parallax (The 3D Effect)
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2;

      // Background Text moves SLOWLY (Depth)
      gsap.to(bgTextRef.current, {
        x: x * 20, y: y * 20, duration: 1
      });

      // Avatar moves MEDIUM (Midground)
      gsap.to(avatarRef.current, {
        x: x * -30, y: y * -30, 
        rotationY: x * 10, // 3D Rotate
        rotationX: -y * 10,
        duration: 0.5
      });

      // Foreground Text moves FAST
      gsap.to(textRef.current, {
        x: x * -10, y: y * -10, duration: 1
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      
      {/* 1. Background Giant Text */}
      <div className="bg-text" ref={bgTextRef}>
        DEVELOPER
      </div>

      <div className="hero-container">
        {/* 2. Left Side: Content */}
        <div className="hero-content" ref={textRef}>
          <h3>Hello, I'm</h3>
          <h1>AYUSH <span className="highlight">SAHU</span></h1>
          <p>Creative Developer & UI/UX Designer crafting immersive digital experiences.</p>
          
          <div className="btn-group">
            <button className="btn-primary">Hire Me</button>
            <button className="btn-secondary">My Work</button>
          </div>
          
          <div className="stats">
            <div><h4>20+</h4><span>Projects</span></div>
            <div><h4>10+</h4><span>Clients</span></div>
          </div>
        </div>

        {/* 3. Right Side: 3D Avatar */}
        <div className="hero-image-wrapper" ref={avatarRef}>
          {/* Use myImage variable if you have a local file */}
          <img src={avatarUrl} alt="3D Avatar" className="hero-img" />
          
          {/* Floating Icons */}
          <div className="float-card icon-react">⚛️</div>
          <div className="float-card icon-code">{'</>'}</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;