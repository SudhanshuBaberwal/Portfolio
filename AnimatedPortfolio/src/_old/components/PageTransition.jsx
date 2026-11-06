import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const PageTransition = () => {
  const leftPanel = useRef(null);
  const rightPanel = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Panels start covering the screen, then slide away
    tl.to(leftPanel.current, {
      width: "0%",
      duration: 1.2,
      ease: "power4.inOut",
      delay: 0.2
    })
    .to(rightPanel.current, {
      width: "0%",
      duration: 1.2,
      ease: "power4.inOut",
    }, "<"); // "<" means run at the same time as previous animation
  }, []);

  const styles = {
    panel: {
      position: "fixed",
      top: 0,
      height: "100vh",
      width: "50vw", // Covers half screen
      backgroundColor: "#000",
      zIndex: 9999,
    }
  };

  return (
    <>
      <div ref={leftPanel} style={{ ...styles.panel, left: 0, borderRight: "1px solid #333" }}></div>
      <div ref={rightPanel} style={{ ...styles.panel, right: 0, borderLeft: "1px solid #333" }}></div>
    </>
  );
};

export default PageTransition;