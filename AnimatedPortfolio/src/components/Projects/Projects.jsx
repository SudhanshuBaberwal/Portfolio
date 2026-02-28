import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Projects.css";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Your Projects Array
const projects = [
  {
    id: "01", title: "A Car Rental Project", category: "Full Stack",
    desc: "🚗 Car Rental Platform (Full Stack Web App). A full-stack car rental web application where users can browse available cars, book rentals, and manage their bookings.",
    tech: ["React", "Node", "MongoDB", "Express"],
    image: "/951a996c-3aff-4101-8138-ba1400a59248 (1).png", link: "#", github: "#",
  },
  {
    id: "02", title: "Chatify", category: "WebSocket",
    desc: "High-performance chat application handling 10k+ concurrent users.",
    tech: ["Socket.io", "Redux", "React"],
    image: "/ChatGPT Image Feb 27, 2026, 11_39_38 PM.png", link: "#", github: "#",
  },
  {
    id: "03", title: "Authentication Page", category: "Security",
    desc: "🔐 Advanced Authentication System Full Stack Security Platform.",
    tech: ["JS", "Nodemailer", "Express"],
    image: "/ChatGPT Image Feb 27, 2026, 11_53_08 PM.png", link: "#", github: "#",
  },
  {
    id: "04", title: "Luminary - Book Store", category: "Productivity",
    desc: "Luminary is a modern, immersive book store web application that transforms traditional online reading into a cinematic 3D experience.",
    tech: ["React.js", "GSAP", "ContextAPI"],
    image: "/ChatGPT Image Feb 28, 2026, 02_43_10 PM.png", link: "#", github: "#",
  },
  {
    id: "05", title: "Automated Timetable", category: "Productivity",
    desc: "A fully automated academic scheduling system built in Python.",
    tech: ["Python", "Pandas", "openpyxl", "CSV"],
    image: "/ChatGPT Image Feb 28, 2026, 03_04_28 PM.png", link: "#", github: "#",
  },
  {
    id: "06", title: "Clutu", category: "Productivity",
    desc: "Intelligent slot allocation, room optimization, and elective synchronization.",
    tech: ["Python", "Pandas", "openpyxl", "CSV"],
    image: "../../../public/ChatGPT Image Feb 28, 2026, 04_50_16 PM.png", link: "#", github: "#",
  },
];

// --- HELPER: Splits your projects array into chunks of 4 ---
const chunkArray = (arr, size) => {
  const chunked = [];
  for (let i = 0; i < arr.length; i += size) {
    chunked.push(arr.slice(i, i + size));
  }
  return chunked;
};

// --- SUB-COMPONENT: Handles ONE block of up to 4 projects ---
const ProjectGroup = ({ chunk, groupIndex }) => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const totalItems = chunk.length;

      // If only 1 item, no horizontal scroll needed
      if (totalItems <= 1) return;

      ScrollTrigger.matchMedia({
        "(min-width: 769px)": function () {
          gsap.to(sectionRef.current, {
            // Slide left by 100vw for every extra project
            x: `-${(totalItems - 1) * 100}vw`,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top", // Pin when the container hits the top
              // Make the scroll length proportional to how many items are in the chunk
              end: () => `+=${totalItems * 800}`, 
              scrub: 1, // Smooth scrubbing
              pin: true,
              onUpdate: (self) => {
                // Update the active nav line based on scroll progress
                const index = Math.round(self.progress * (totalItems - 1));
                setActiveIndex(index);
              },
            },
          });
        },
        "(max-width: 768px)": function () {
          // Mobile Fallback: Just stack them normally without horizontal scroll
          setActiveIndex(0);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [chunk.length]);

  return (
    <div className="projects-container-main" ref={containerRef}>
      {/* HEADER (Only render it on the very first group) */}
      {groupIndex === 0 && (
        <div className="projects-header">
          <h2>FEATURED <span className="highlight">WORK</span></h2>
          <p>Selected projects from my portfolio</p>
        </div>
      )}

      {/* DYNAMIC NAVIGATION BAR FOR THIS SPECIFIC CHUNK */}
      <div className="project-nav-bar">
        <div className="nav-items-container">
          {chunk.map((project, index) => (
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
              width: `${100 / chunk.length}%`,
              transform: `translateX(${activeIndex * 100}%)`,
            }}
          ></div>
        </div>
      </div>

      {/* THE HORIZONTALLY SCROLLING WRAPPER */}
      <div 
        ref={sectionRef} 
        className="scroll-section-inner" 
        style={{ width: `${chunk.length * 100}vw` }} // Width adjusts automatically!
      >
        {chunk.map((project, index) => (
          <div className="project-panel" key={index}>
            <div className="project-content-container">
              
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
  );
};

// --- MAIN COMPONENT ---
const Projects = () => {
  // 1. Break the 6 projects into arrays of 4 (e.g., [4 items], [2 items])
  const projectChunks = chunkArray(projects, 4);

  return (
    <section id="projects" className="projects-master-container">
      {/* Map through the chunks. Group 1 will scroll horizontally, then unpin. 
          Then you scroll vertically to Group 2, which will pin and scroll horizontally. */}
      {projectChunks.map((chunk, index) => (
        <ProjectGroup key={index} chunk={chunk} groupIndex={index} />
      ))}
    </section>
  );
};

export default Projects;