import React, { useRef } from "react";
import "./Experience.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const containerRef = useRef();


  
  
  
  

  useGSAP(() => {
    gsap.from(".glass-module", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".dashboard-grid",
        start: "top 85%",
      }
    });
  }, { scope: containerRef });

  return (
    <section id="experience" className="experience-section" ref={containerRef}>
      <div className="bg-orb-experience"></div>
      
      <div className="header-group">
        <h2 className="section-header">CODING <span className="highlight">COMMAND CENTER</span></h2>
        <div className="status-bar">
          <span className="pulse-dot"></span> 
        </div>
      </div>

      <div className="dashboard-grid">
        
        {/* LEETCODE MODULE */}
        <div className="glass-module">
          <div className="module-header">
            <div className="platform-info">
              <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png" alt="LC" className="invert-logo" />
              <span>LEETCODE.SYS</span>
            </div>
            <div className="rank-tag">#12,402</div>
          </div>

          <div className="main-display">
            <div className="progress-ring">
              <svg viewBox="0 0 100 100">
                <circle className="ring-bg" cx="50" cy="50" r="45" />
                <circle className="ring-meter lc-meter" cx="50" cy="50" r="45" />
              </svg>
              <div className="ring-text">
                <span className="big-num">542</span>
                <span className="label">SOLVED</span>
              </div>
            </div>

            <div className="bars-container">
              <div className="bar-item"><div className="bar-bg"><div className="bar-fill" style={{width: '70%', background: '#00b8a3'}}></div></div><span>210</span></div>
              <div className="bar-item"><div className="bar-bg"><div className="bar-fill" style={{width: '45%', background: '#ffc01e'}}></div></div><span>280</span></div>
              <div className="bar-item"><div className="bar-bg"><div className="bar-fill" style={{width: '15%', background: '#ef4743'}}></div></div><span>52</span></div>
            </div>
          </div>

          <div className="module-footer">
            <div className="footer-stat"><span>RATING</span><strong>1842</strong></div>
            <div className="footer-stat"><span>STREAK</span><strong>45 Days</strong></div>
          </div>
        </div>

        {/* CODEFORCES MODULE */}
        <div className="glass-module">
          <div className="module-header">
            <div className="platform-info">
              <img src="https://cdn.iconscout.com/icon/free/png-256/free-code-forces-3521352-2944796.png" alt="CF" />
              <span>CODEFORCES.EXE</span>
            </div>
            <span className="badge specialist">SPECIALIST</span>
          </div>
          
          <div className="hero-section">
            <h2 className="hero-rating cf-color">1458</h2>
            <p className="hero-sub">MAX RATING: 1502</p>
          </div>

          <div className="stats-mini-grid">
            <div className="mini-box"><span>CONTESTS</span><strong>62</strong></div>
            <div className="mini-box"><span>RANK</span><strong>Top 15%</strong></div>
          </div>

          <a href="#" className="action-btn">ACCESS_PROFILE _</a>
        </div>

        {/* CODECHEF MODULE - FORCED VISIBILITY */}
        <div className="glass-module cc-card-fixed">
          <div className="module-header">
            <div className="platform-info">
              <img src="https://cdn.iconscout.com/icon/free/png-256/free-code-chef-3521351-2944795.png" alt="CC" className="invert-logo" />
              <span style={{color: '#888'}}>CODECHEF.LOG</span>
            </div>
            <div className="stars">★★★<span style={{color: '#333'}}>☆☆</span></div>
          </div>
          
          <div className="hero-section">
            <h2 className="hero-rating cc-color">1685</h2>
            <p className="hero-sub" style={{color: '#aaa'}}>GLOBAL RANK: #4,521</p>
          </div>

          <div className="stats-mini-grid">
            <div className="mini-box"><span>DIVISION</span><strong style={{color: '#fff'}}>Div 2</strong></div>
            <div className="mini-box"><span>RECENT</span><strong style={{color: '#fff'}}>Rank 412</strong></div>
          </div>

          <a href="#" className="action-btn cc-btn">VIEW_STATS.EXE</a>
        </div>

      </div>
    </section>
  );
};

export default Experience;