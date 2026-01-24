import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Projects.css";
import Reveal from "../Reveal"; // Using the component we made earlier

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "E-Commerce Platform",
    desc: "A full-stack Amazon clone with payment gateway integration, user auth, and admin dashboard.",
    tech: ["React", "Node.js", "MongoDB", "Redux"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop",
    link: "#"
  },
  {
    title: "Real-Time Chat App",
    desc: "High-performance chat application handling 10k+ concurrent users using Socket.io and Redis.",
    tech: ["Socket.io", "Express", "React", "Docker"],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
    link: "#"
  },
  {
    title: "AlgoVisualizer (DSA)",
    desc: "Interactive visualization of sorting and pathfinding algorithms (Dijkstra, BFS, DFS) in Java/JS.",
    tech: ["Java", "JavaScript", "DSA", "HTML5"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
    link: "#"
  },
  {
    title: "Task Management System",
    desc: "Collaborative project management tool with Kanban boards and team real-time updates.",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?q=80&w=1000&auto=format&fit=crop",
    link: "#"
  }
];

const Projects = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    
    // Staggered Fade In for Cards
    gsap.fromTo(".project-card", 
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        stagger: 0.2, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%"
        }
      }
    );
  }, []);

  return (
    <section id="projects" className="projects-section" ref={containerRef}>
      
      <Reveal direction="down">
        <h2 className="section-header">FEATURED <span className="highlight">WORK</span></h2>
      </Reveal>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            
            {/* Image Overlay Area */}
            <div className="card-image">
              <img src={project.image} alt={project.title} />
              <div className="card-overlay">
                <div className="card-actions">
                  <a href={project.link} className="btn-view">View Live</a>
                  <a href={project.link} className="btn-github">GitHub</a>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="card-content">
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
              
              <div className="tech-stack">
                {project.tech.map((t, i) => (
                  <span key={i} className="tech-pill">{t}</span>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;