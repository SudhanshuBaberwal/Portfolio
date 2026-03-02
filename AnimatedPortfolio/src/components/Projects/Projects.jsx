import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom"; // Allows redirecting to a new page
import "./Projects.css";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Your Projects Array
const projects = [
  {
    id: "01",
    title: "A Car Rental Project",
    category: "Full Stack",
    desc: "🚗 Car Rental Platform (Full Stack Web App). A full-stack car rental web application where users can browse available cars, book rentals, and manage their bookings.",
    tech: ["React", "Node", "MongoDB", "Express"],
    image: "/951a996c-3aff-4101-8138-ba1400a59248 (1).png",
    link: "#",
    github: "https://github.com/SudhanshuBaberwal/Car-Rental-Project",
  },
  {
    id: "02",
    title: "Chatify",
    category: "WebSocket",
    desc: "High-performance chat application handling 10k+ concurrent users.",
    tech: ["Socket.io", "Redux", "React"],
    image: "/ChatGPT Image Feb 27, 2026, 11_39_38 PM.png",
    link: "#",
    github: "https://github.com/SudhanshuBaberwal/Chatify",
  },
  {
    id: "03",
    title: "Authentication Page",
    category: "Security",
    desc: "🔐 Advanced Authentication System Full Stack Security Platform.",
    tech: ["JS", "Nodemailer", "Express"],
    image: "/ChatGPT Image Feb 27, 2026, 11_53_08 PM.png",
    link: "#",
    github: "https://github.com/SudhanshuBaberwal/Authentication_Master",
  },
  // The rest of your projects are safely ignored by the slice below
];

const Projects = () => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate(); // Hook for routing

  // 1. Force the array to only contain a MAXIMUM of 3 projects
  const displayedProjects = projects.slice(0, 3);
  const totalItems = displayedProjects.length;

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Horizontal Scroll Animation
      ScrollTrigger.matchMedia({
        "(min-width: 769px)": function () {
          gsap.to(sectionRef.current, {
            x: `-${(totalItems - 1) * 100}vw`,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: () => `+=${totalItems * 800}`, // Determines how long scrolling takes
              scrub: 1,
              pin: true,
              onUpdate: (self) => {
                const index = Math.round(self.progress * (totalItems - 1));
                setActiveIndex(index);
              },
            },
          });
        },
        "(max-width: 768px)": function () {
          // Fallback for mobile (no horizontal pin)
          setActiveIndex(0);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [totalItems]);

  return (
    <section id="projects" className="projects-master-container">
      {/* --- PINNED HORIZONTAL SCROLL SECTION --- */}
      <div className="projects-container-main" ref={containerRef}>
        
        {/* HEADER */}
        <div className="projects-header">
          <h2>
            FEATURED <span className="highlight">WORK</span>
          </h2>
          <p>Selected projects from my portfolio</p>
        </div>

        {/* DYNAMIC NAVIGATION BAR */}
        <div className="project-nav-bar">
          <div className="nav-items-container">
            {displayedProjects.map((project, index) => (
              <div key={project.id} className={`nav-item ${activeIndex === index ? "active" : ""}`}>
                <span className="nav-number">{project.id}</span>
                <span className="nav-title">{project.title}</span>
              </div>
            ))}
          </div>
          <div className="nav-line-bg">
            <div
              className="nav-line-active"
              style={{
                width: `${100 / totalItems}%`,
                transform: `translateX(${activeIndex * 100}%)`,
              }}
            ></div>
          </div>
        </div>

        {/* SCROLLING PANELS */}
        <div ref={sectionRef} className="scroll-section-inner" style={{ width: `${totalItems * 100}vw` }}>
          {displayedProjects.map((project, index) => (
            <div className="project-panel" key={index}>
              <div className="project-content-container">
                
                {/* Text Info */}
                <div className="project-info">
                  <div className="project-id">{project.id}</div>
                  <div className="project-category">{project.category}</div>
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                  <div className="tech-stack-row">
                    {project.tech.map((t, i) => (
                      <span key={i} className="tech-tag">{t}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={project.link} className="btn-main">View Live</a>
                    <a href={project.github} className="btn-outline">GitHub</a>
                  </div>
                </div>

                {/* Visual Image - FIXED HTML STRUCTURE TO MATCH CSS */}
                <div className="project-visual">
                  <div className="image-frame-glow">
                    <div className="image-inner-wrapper">
                      <img src={project.image} alt={project.title} />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- "VIEW MORE" SECTION (Unpinned, scrolls normally below) --- */}
      <div className="view-more-container">
        <button onClick={() => navigate('/all-projects')} className="btn-main mega-btn">
          VIEW ALL PROJECTS
        </button>
      </div>
    </section>
  );
};

export default Projects;