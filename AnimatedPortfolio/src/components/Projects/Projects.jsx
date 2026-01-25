import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Projects.css";
import Reveal from "../Reveal";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    title: "E-Commerce Platform",
    category: "Full Stack",
    desc: "A full-stack Amazon clone with payment gateway integration.",
    tech: ["React", "Node", "MongoDB"],
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1920&auto=format&fit=crop",
    link: "#",
    github: "#",
  },
  {
    id: "02",
    title: "Real-Time Chat App",
    category: "WebSocket",
    desc: "High-performance chat application handling 10k+ concurrent users.",
    tech: ["Socket.io", "Redis", "Docker"],
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1920&auto=format&fit=crop",
    link: "#",
    github: "#",
  },
  {
    id: "03",
    title: "AlgoVisualizer",
    category: "Algorithms",
    desc: "Interactive visualization of sorting and pathfinding algorithms.",
    tech: ["Java", "JS", "HTML5"],
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1920&auto=format&fit=crop",
    link: "#",
    github: "#",
  },
  {
    id: "04",
    title: "Task Management",
    category: "Productivity",
    desc: "Collaborative project management tool with Kanban boards.",
    tech: ["Next.js", "Prisma", "Postgres"],
    image:
      "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?q=80&w=1920&auto=format&fit=crop",
    link: "#",
    github: "#",
  },
];

const Projects = () => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  // State to track which project is currently visible
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 769px)": function () {
          gsap.fromTo(
            sectionRef.current,
            { translateX: 0 },
            {
              translateX: "-300vw",
              ease: "none",
              duration: 1,
              scrollTrigger: {
                trigger: triggerRef.current,
                start: "top top",
                end: "2000 top",
                scrub: 0.6,
                pin: true,
                // Calculate progress to update the Active Index
                onUpdate: (self) => {
                  // self.progress is 0 to 1. We map it to 0 to 3 (index)
                  const index = Math.round(
                    self.progress * (projects.length - 1),
                  );
                  setActiveIndex(index);
                },
              },
            },
          );
        },

        "(max-width: 768px)": function () {
          // Reset for mobile
          setActiveIndex(null);
          gsap.from(".project-panel", {
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 1,
            scrollTrigger: {
              trigger: triggerRef.current,
              start: "top 80%",
            },
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="projects-container-main" ref={containerRef}>
      <div className="scroll-trigger-wrapper" ref={triggerRef}>
        {/* --- HEADER --- */}
        <div className="projects-header">
          <Reveal direction="down">
            <h2>
              FEATURED <span className="highlight">WORK</span>
            </h2>
            <p>Selected projects from my portfolio</p>
          </Reveal>
        </div>

        {/* --- NEW: PROJECT NAVIGATION BAR --- */}
        <div className="project-nav-bar">
          <div className="nav-items-container">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`nav-item ${activeIndex === index ? "active" : ""}`}
                onClick={() => {
                  // Optional: Click to scroll logic could go here
                }}
              >
                <span className="nav-number">0{index + 1}</span>
                <span className="nav-title">{project.title}</span>
              </div>
            ))}
          </div>
          {/* The Horizontal Line */}
          <div className="nav-line-bg">
            {/* The Active Indicator Line */}
            <div
              className="nav-line-active"
              style={{
                width: `${100 / projects.length}%`,
                transform: `translateX(${activeIndex * 100}%)`,
              }}
            ></div>
          </div>
        </div>

        {/* --- HORIZONTAL SCROLL CONTENT --- */}
        <div ref={sectionRef} className="scroll-section-inner">
          {projects.map((project, index) => (
            <div className="project-panel" key={index}>
              <div className="project-content-container">
                <div className="project-info">
                  <div className="project-id">{project.id}</div>
                  <div className="project-category">{project.category}</div>
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                  <div className="tech-stack-row">
                    {project.tech.map((t, i) => (
                      <span key={i} className="tech-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={project.link} className="btn-main">
                      View Live
                    </a>
                    <a href={project.github} className="btn-outline">
                      GitHub
                    </a>
                  </div>
                </div>
                <div className="project-visual">
                  <div className="image-wrapper">
                    <img src={project.image} alt={project.title} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
