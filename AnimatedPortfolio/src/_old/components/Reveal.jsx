import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Reveal = ({ children, direction = "up", delay = 0, className = "" }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    
    // Determine start position based on direction
    let x = 0;
    let y = 0;

    if (direction === "left") x = -100; // Coming from Left
    if (direction === "right") x = 100; // Coming from Right
    if (direction === "up") y = 50;     // Coming from Bottom
    if (direction === "down") y = -50;  // Coming from Top

    gsap.fromTo(
      el,
      { 
        x: x, 
        y: y, 
        opacity: 0 
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1.2,
        delay: delay,
        ease: "power3.out", // The "GSAP Feel" (snappy but smooth)
        scrollTrigger: {
          trigger: el,
          start: "top 85%", // Starts when top of element hits 85% of viewport height
          toggleActions: "play none none reverse" // Replays when scrolling back up (optional)
        }
      }
    );
  }, [direction, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default Reveal;