import React, { useRef } from "react";
import "./Summary.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Summary = () => {
  const sectionRef = useRef();

  const onDownload = () => {
    const link = document.createElement("a");
    link.href = "/Sudhanshu_Resume.pdf"; 
    link.download = "Sudhanshu_Babber_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      }
    });

    tl.from(".hero-panel", {
      x: -150,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out"
    })
    .from(".content-panel", {
      x: 150,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out"
    }, "-=0.8");
  }, { scope: sectionRef });

  return (
    <section className="summary-viewport" ref={sectionRef}>
      
      {/* LEFT CONTAINER (40% WIDTH - ON TOP) */}
      <div className="hero-panel">
        <div className="image-wrapper">
          <img src="/your-pic.jpg" alt="Sudhanshu Babber" className="profile-img-full" />
          <div className="overlay-gradient"></div>
        </div>
        <div className="hero-intro">
          <h2 className="hero-lastname highlight">Sudhanshu</h2>
          <h1 className="hero-firstname">Baberwal</h1>
          <div className="hero-badge">SR. DEVELOPER // KNIGHT</div>
        </div>
      </div>

      {/* RIGHT CONTAINER (60% WIDTH - UNDERNEATH) */}
      <div className="content-panel">
        <div className="content-inner">
          <div className="summary-block">
            <span className="terminal-tag"># COMMAND_SUMMARY</span>
            <p className="description-text">
              Bridging the gap between raw algorithmic power and elegant user interfaces. 
              My expertise lies in building **high-concurrency systems** and optimizing 
              **complex data structures** for real-world performance.
            </p>
          </div>

          <div className="stats-row">
            <div className="stat-pill">
              <strong>1200+</strong>
              <span>MAX_RATING</span>
            </div>
            <div className="stat-pill">
              <strong>500+</strong>
              <span>STREAK</span>
            </div>
          </div>

          <button className="cv-button-main" onClick={onDownload}>
            <span className="btn-glitch">DOWNLOAD_CV.EXE</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </button>
        </div>
      </div>

    </section>
  );
};

export default Summary;