import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Preloader.css";

const Preloader = ({ setLoading }) => {
  const componentRef = useRef();
  const nameRef = useRef();
  const name = "IT'S BABBER";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setLoading(false),
      });

      // 1. Initial Reveal of 3D letters
      tl.from(".char", {
        opacity: 0,
        y: 100,
        rotateX: -90,
        stagger: 0.08,
        duration: 1.2,
        ease: "expo.out",
      });

      // 2. Subtle "Breathe" animation while loading
      tl.to(".char", {
        z: 50,
        textShadow: "0 0 20px rgba(0,229,255,0.6)",
        color: "#ffffff",
        duration: 0.8,
        stagger: 0.05,
      });

      // 3. THE TRANSITION: Fly through the name
      // We scale the whole container so large it fills the screen with "empty space"
      tl.to(nameRef.current, {
        scale: 80, 
        z: 2000,
        opacity: 0,
        duration: 2,
        ease: "power4.inOut",
        delay: 0.2
      });

      // 4. Fade out the background overlay simultaneously
      tl.to(componentRef.current, {
        backgroundColor: "transparent",
        duration: 1,
        ease: "power2.inOut"
      }, "-=1.5");

    }, componentRef);

    return () => ctx.revert();
  }, [setLoading]);

  return (
    <div className="preloader-portal" ref={componentRef}>
      <div className="perspective-layer">
        <div className="main-content" ref={nameRef}>
          <div className="pre-text">PORTFOLIO '26</div>
          <h1 className="name-3d">
            {name.split("").map((char, i) => (
              <span key={i} className="char" data-text={char}>
                {char}
              </span>
            ))}
          </h1>
          <div className="post-text">CREATIVE DEVELOPER</div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;