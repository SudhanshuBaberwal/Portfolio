import React from "react";
import "./About.css";
// 1. Import the Reveal Component
import Reveal from "../Reveal"; 

const About = () => {
  return (
    <section id="about" className="about-section">
      
      {/* Header comes from bottom */}
      <Reveal direction="up">
        <h2 className="section-header">ABOUT <span className="highlight">ME</span></h2>
      </Reveal>

      <div className="about-container">
        
        {/* --- LEFT SIDE: SLIDES FROM LEFT --- */}
        <div className="left-panel">
          <div className="timeline-wrapper">
            <div className="timeline-line"></div>

            <Reveal direction="left" delay={0.2}>
                <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="info-content">
                    <h3>Personal Info</h3>
                    <ul className="info-list">
                    <li><span>Name:</span> Ayush Sahu</li>
                    <li><span>Age:</span> 22 Years</li>
                    </ul>
                </div>
                </div>
            </Reveal>

            <Reveal direction="left" delay={0.4}>
                <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="info-content">
                    <h3>Education</h3>
                    <ul className="info-list">
                    <li><span>Degree:</span> B.Tech (CSE)</li>
                    <li><span>CGPA:</span> 8.2</li>
                    </ul>
                </div>
                </div>
            </Reveal>

          </div>
        </div>

        {/* --- RIGHT SIDE: SLIDES FROM RIGHT --- */}
        <div className="right-panel">
          
          <Reveal direction="right" delay={0.2}>
            <div className="skill-card-large mern-card">
                <h4>MERN STACK WEB DEVELOPER</h4>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.4}>
            <div className="skill-card-large java-card">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" className="main-icon" />
                <h4>JAVA DEVELOPER</h4>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.6}>
            <div className="skill-card-large dsa-card">
                <h4>DATA STRUCTURES & ALGORITHMS</h4>
            </div>
          </Reveal>

        </div>

      </div>
    </section>
  );
};

export default About;