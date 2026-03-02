import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./AllProjects.css";

const projectsData = [
  {
    id: 1,
    title: "E-COMMERCE.SYS",
    description: "A full-stack MERN e-commerce platform with Stripe integration, admin dashboard, and real-time inventory tracking. Engineered to handle high traffic and secure transactions seamlessly.",
    tech: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
    github: "https://github.com",
    live: "https://live-link.com",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "ALGO_VISUALIZER.EXE",
    description: "Interactive web application to visualize complex sorting and pathfinding algorithms in real-time. Built to simplify data structures and provide a hands-on learning experience for developers.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com",
    live: "https://live-link.com",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "CHAT_MATRIX.LOG",
    description: "Real-time chat application featuring end-to-end encryption, group channels, and instant notifications using WebSockets. Designed with a focus on privacy and instantaneous data delivery.",
    tech: ["Next.js", "Socket.io", "Tailwind", "PostgreSQL"],
    github: "https://github.com",
    live: "https://live-link.com",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop"
  }
];

const AllProjects = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="premium-projects-section">
      {/* Background glow effect */}
      <div className="bg-glow"></div>

      <div className="pp-container">
        
        {/* Header Area */}
        <div className="pp-header">
          <Link to="/" className="pp-back-btn">
            &lt; RETURN_HOME
          </Link>
          <h1 className="pp-title">
            PROJECT <span className="highlight">ARCHIVE</span>
          </h1>
          <div className="pp-divider"></div>
        </div>

        {/* Feature Rows */}
        <div className="pp-list">
          {projectsData.map((project, index) => (
            <div className="pp-row" key={project.id}>
              
              {/* Image Side */}
              <div className="pp-image-wrapper">
                <img src={project.image} alt={project.title} className="pp-image" />
                <div className="pp-image-overlay"></div>
              </div>

              {/* Content Side */}
              <div className="pp-content">
                <div className="pp-number">
                  {/* Pads the index to always be two digits like 01, 02 */}
                  // {String(index + 1).padStart(2, '0')} 
                </div>
                <h2 className="pp-card-title">{project.title}</h2>
                
                <div className="pp-tech-stack">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="pp-tech-tag">{tech}</span>
                  ))}
                </div>

                <p className="pp-card-desc">{project.description}</p>
                
                <div className="pp-actions">
                  <a href={project.live} target="_blank" rel="noreferrer" className="pp-btn solid">
                    LIVE_DEMO.EXE
                  </a>
                  <a href={project.github} target="_blank" rel="noreferrer" className="pp-btn outline">
                    GITHUB.GIT
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AllProjects;