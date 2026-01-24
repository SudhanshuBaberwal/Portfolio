import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Home.css";

// Reliable 3D Avatar (Microsoft Fluent Emoji)
const avatarImg = "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Man%20Technologist.png";

const Home = () => {
  const bgTextRef = useRef(null);
  const avatarRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // 1. Entrance Animation
    tl.fromTo(bgTextRef.current, { opacity: 0, scale: 1.2 }, { opacity: 0.05, scale: 1, duration: 1.5 })
      .fromTo(avatarRef.current, { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }, "-=1")
      .fromTo(contentRef.current.children, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 }, "-=0.8");

    // 2. Parallax Mouse Move Effect
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2;

      // Move Background Text (Slowly)
      gsap.to(bgTextRef.current, { x: x * 20, y: y * 20, duration: 1 });
      
      // Move Avatar (Medium speed + rotation)
      gsap.to(avatarRef.current, { 
        x: x * -30, 
        y: y * -30, 
        rotationY: x * 10,
        rotationX: -y * 10,
        duration: 0.6 
      });

      // Move Text Content (Fastest)
      gsap.to(contentRef.current, { x: x * -10, y: y * -10, duration: 1 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="hero">
      {/* 1. Background Giant Text */}
      <div className="bg-text" ref={bgTextRef}>DEVELOPER</div>

      <div className="hero-container">
        {/* 2. Left Content */}
        <div className="hero-content" ref={contentRef}>
          <h3>HELLO, I'M</h3>
          <h1>Sudhanshu <span className="stroke-text">Baberwal</span></h1>
          <p>
            A passionate <b>Full Stack Developer</b> crafting immersive web experiences with 
            React, Next.js, and Modern UI.
          </p>
          
          <div className="btn-group">
            <button className="btn-primary">Hire Me</button>
            <button className="btn-secondary">My Work</button>
          </div>

          <div className="stats">
            <div><h4>2+</h4><span>Years Exp.</span></div>
            <div><h4>20+</h4><span>Projects</span></div>
          </div>
        </div>

        {/* 3. Right Avatar */}
        <div className="hero-image-wrapper" ref={avatarRef}>
          <div className="glow-circle"></div>
          <img src={avatarImg} alt="3D Avatar" className="hero-img" />

          {/* Floating Glass Cards */}
          <div className="float-card card-1">
            <span className="emoji">⚛️</span> React
          </div>
          <div className="float-card card-2">
            <span className="emoji">💻</span> Code
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-down">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <span>Scroll Down</span>
      </div>
    </section>
  );
};

export default Home;