import React, { useRef } from "react";
import "./About.css";
import Reveal from "../Reveal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef();
  const lineRef = useRef();

  useGSAP(
    () => {
      // Timeline Line Drawing Animation
      gsap.fromTo(
        lineRef.current,
        { height: 0, opacity: 0 },
        {
          height: "100%",
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-wrapper",
            start: "top 70%",
            end: "bottom 70%",
            scrub: 1,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section id="about" className="about-section" ref={containerRef}>
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>

      <Reveal direction="up">
        <h2 className="section-header">
          ABOUT <span className="highlight">ME</span>
        </h2>
      </Reveal>

      <div className="about-container">
        
        {/* LEFT PANEL: TIMELINE */}
        <div className="left-panel">
          <div className="timeline-wrapper">
            <div className="timeline-line-glow" ref={lineRef}></div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="info-content">
                <h3>Personal Info</h3>
                <p><b>Name:</b> Sudhanshu Baberwal</p>
                <p><b>Location:</b> India</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="info-content">
                <h3>Education</h3>
                <p><b>Degree:</b> B.Tech (CSE)</p>
                <p><b>College:</b> IIIT Dharwad</p>
                <p><b>CGPA:</b> 7.5</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="info-content">
                <h3>Core Skills</h3>
                <p><b>MERN Stack Developer</b></p>
                <p><b>Data Structures and Algorithms</b></p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: BIO & PHOTO */}
        <div className="right-panel">
          <Reveal direction="left">
            <div className="about-me-content">
              
              {/* FLOATING PHOTO */}
              <div className="large-profile-wrapper">
                <img 
                  src="../../../public/WhatsApp Image 2026-03-01 at 3.40.31 PM.jpeg" 
                  alt="Sudhanshu Baberwal" 
                  className="large-profile-img"
                />
                <div className="img-border-offset"></div>
                <div className="large-img-glow"></div>
              </div>

              {/* WRAPPING TEXT */}
              <div className="bio-text-wrapper">
                <h3>WHO <span className="highlight">I AM</span></h3>
                <p className="bio-text">
                  I am a passionate <b>MERN Stack Developer</b> and a B.Tech Computer Science student at <b>IIIT Dharwad</b>, 
                  driven by the challenge of building scalable, secure, and user-centric web applications from the ground up. 
                  My journey in software engineering is fueled by a deep curiosity for how things work under the hood.
                </p>
                <p className="bio-text">
                  With a strong foundation in <b>Data Structures and Algorithms</b>, I don't just write code that works; 
                  I strive to write code that is highly optimized and maintainable. I approach every project with a rigorous 
                  problem-solving mindset, ensuring efficiency and clean architecture.
                </p>
                <p className="bio-text">
                  My expertise lies in bridging the gap between complex backend logic and intuitive frontend design 
                  using modern technologies like <b>React, Next.js, and Node.js</b>. Beyond the code, I am an avid learner, 
                  constantly exploring the evolving tech landscape to stay at the forefront of innovation. 
                </p>
                <p className="bio-text">
                  I thrive in collaborative environments where I can contribute my technical skills to build meaningful 
                  digital experiences. Currently, I am seeking opportunities to leverage my full-stack capabilities, 
                  contribute to a forward-thinking team, and build real-world solutions.
                </p>
              </div>

            </div>
          </Reveal>
        </div>
        
      </div>
    </section>
  );
};

export default About;