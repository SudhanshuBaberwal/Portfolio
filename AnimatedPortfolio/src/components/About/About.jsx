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

  const skills = [
    {
      name : "PYTHON",
      icon : "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/3840px-Python-logo-notext.svg.png"
    },
    {
      name : "HTML",
      icon : "https://cdn.worldvectorlogo.com/logos/html-1.svg"
    },
    {
      name : "CSS",
      icon : "https://ultimatecourses.com/assets/category/css-fcba6b473cb1125595dc28163be24eb673907258b5f6f6c82967a0587a9df20c.svg"
    },
    {
      name : "Java Script",
      icon : "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
    },
    {
      name: "Type Script",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmOm4u60oQR6t9DM-jorQugVTthmHLc_ae_g&s",
    },
    {
      name : "React",
      icon : "https://cdn.worldvectorlogo.com/logos/html-1.svg"
    },
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "Express",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      invert: true,
    },
    {
      name: "MongoDB",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
    {
      name: "Java",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    },
    {
      name: "Next.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      invert: true,
    },
    {
      name: "Tailwind",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    },
    {
      name: "GSAP",
      icon: "https://gsap.com/community/uploads/monthly_2020_03/tweenmax.png.cf27916e926fbb328ff214f66b4c8429.png",
    },
    {
      name : "DOCKER",
      icon : "https://brandlogos.net/wp-content/uploads/2025/10/docker_mark-logo_brandlogos.net_yetav.png"
    },
  ];

  useGSAP(
    () => {
      // 1. Timeline Line Drawing Animation
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
            scrub: 1, // Smoothly ties animation to scroll
          },
        },
      );

      // 2. Skills Grid Staggered Entrance
      gsap.from(".tech-card", {
        y: 50,
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        stagger: 0.1, // Cards pop in one by one
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 85%",
        },
      });
    },
    { scope: containerRef },
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
        <div className="left-panel">
          <div className="timeline-wrapper">
            {/* The Glowing Animated Line */}
            <div className="timeline-line-glow" ref={lineRef}></div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="info-content">
                <h3>Personal Info</h3>
                <p>
                  <b>Name:</b> Sudhanshu Baberwal
                </p>
                <p>
                  <b>Age:</b> 20 Years
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="info-content">
                <h3>Education</h3>
                <p>
                  <b>Degree:</b> B.Tech (CSE)
                </p>
                <p>
                  <b>
                    Collage: Indian Institute Of Information Technology Dharwad
                  </b>
                </p>
                <p>
                  <b>CGPA:</b> 7.5
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="info-content">
                <h3>Tech Stack</h3>
                <p>
                  <b>MERN Stack Developer</b>
                </p>
                <p>
                  <b>Data Structure And Algorithms</b>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="right-panel">
          <h3>
            MY <span className="highlight">SKILLS</span>
          </h3>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="tech-card">
                <div className="tech-card-inner">
                  <div className="tech-front">
                    <span>{skill.name}</span>
                  </div>
                  <div className="tech-back">
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className={skill.invert ? "invert" : ""}
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Add this inside your .skills-grid div after your other skill mappings */}
            <div className="tech-card mern-special-card">
              <div className="tech-card-inner">
                <div className="tech-front">
                  <span>MERN Developer</span>
                </div>
                <div className="tech-back">
                  <div className="mern-logos-container">
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
                      alt="mongo"
                    />
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"
                      alt="express"
                      className="invert"
                    />
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                      alt="react"
                    />
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
                      alt="node"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
