import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Preloader.css";

const Preloader = ({ setLoading }) => {
  const containerRef = useRef();
  const lineRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setLoading(false),
      });

      // Set initial states explicitly to prevent flash of content
      gsap.set(".editorial-title, .meta-left, .meta-right", { opacity: 0 });

      // 1. Sharp, instant typographic reveal
      tl.to(".editorial-title", {
        opacity: 1,
        duration: 0.4,
        ease: "power1.out"
      });

      // 2. Animate the minimal asymmetric divider stretching across
      tl.fromTo(lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power3.inOut" },
        "-=0.2"
      );

      // 3. Slide up the small metadata blocks cleanly
      tl.fromTo([".meta-left", ".meta-right"],
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
        "-=0.4"
      );

      // 4. THE EXIT: Slide text off-screen in opposite directions (Shear Effect)
      tl.to(".title-top", {
        x: -60,
        opacity: 0,
        duration: 0.8,
        ease: "power4.in",
        delay: 0.3
      });

      tl.to(".title-bottom", {
        x: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power4.in"
      }, "-=0.8");

      // Shrink the divider away cleanly
      tl.to(lineRef.current, {
        scaleX: 0,
        transformOrigin: "right center",
        duration: 0.6,
        ease: "power3.inOut"
      }, "-=0.6");

      // 5. Unveil the main site by sliding the entire screen vertically up like a premium curtain
      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut"
      }, "-=0.2");

    }, containerRef);

    return () => ctx.revert();
  }, [setLoading]);

  return (
    <div className="editorial-preloader" ref={containerRef}>
      <div className="editorial-frame">
        
        {/* Main Asymmetric Typographic Stack */}
        <div className="editorial-center">
          <h1 className="editorial-title title-top">SUDHANSHU</h1>
          
          {/* Minimalist Structural Divider Line */}
          <div className="editorial-divider" ref={lineRef}></div>
          
          <h1 className="editorial-title title-bottom">PORTFOLIO '26</h1>
        </div>

        {/* Human Editorial Footer Layout */}
        <div className="editorial-footer">
          <div className="meta-left">
            <p className="meta-label">DESIGN & DEV</p>
            <p className="meta-value">CREATIVE ARCHITECTURE</p>
          </div>
          <div className="meta-right">
            <p className="meta-label">STATUS</p>
            <p className="meta-value">COMPILING_ASSETS</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Preloader;