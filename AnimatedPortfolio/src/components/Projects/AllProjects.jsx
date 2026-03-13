import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./AllProjects.css";

const projectsData = [
  {
    id: 1,
    title: "IIIT-DWD automated Time table",
    description:
      "A web application that automatically generates optimized academic timetables based on constraints such as subjects, faculty availability, and classroom allocation. The system reduces manual scheduling effort and ensures conflict-free timetables through algorithmic optimization.",
    tech: ["Python", "openpyxl", "pandas"],
    github:
      "https://github.com/SudhanshuBaberwal/Automated-Time-Table-IIIT-DWD",
    live: "https://live-link.com",
    image: "/ChatGPT Image Feb 28, 2026, 03_04_28 PM.png",
  },
  {
    id: 2,
    title: "Advance Authenticaiton",
    description:
      "A secure full-stack authentication system featuring user signup, login, email OTP verification, password reset via token, and protected routes. Built to simulate real-world authentication workflows using modern web technologies.",
    tech: ["Next", "TypeScript", "Tailwind CSS", "Nodemailer"],
    github: "https://github.com/SudhanshuBaberwal/Auth-with_TSandNext",
    live: "https://live-link.com",
    image: "/ChatGPT Image Mar 8, 2026, 03_47_37 PM.png",
  },
  {
    id: 3,
    title: "Clutu",
    description:
      "A modern social media web application built using React, featuring user authentication powered by Clerk. The platform allows users to create profiles, share posts, interact through likes and comments, and explore a dynamic feed. This project focuses on building a responsive and interactive UI while integrating secure authentication without a custom backend.",
    tech: ["React", "Tailwind CSS"],
    github: "https://github.com/SudhanshuBaberwal/clutu-APP",
    live: "https://live-link.com",
    image: "/ChatGPT Image Mar 8, 2026, 04_19_01 PM.png",
  },
  {
    id: 3,
    title: "Mstry-Message",
    description:
      "A AI powered Chat App to send Mistry messages to friends",
    tech: ["NEXT", "Tailwind CSS", "ZOD", "OPNE-AI"],
    github: "https://github.com/SudhanshuBaberwal/MSTRYmessage",
    live: "/ChatGPT Image Mar 13, 2026, 04_06_10 PM.png",
    image:
      "/ChatGPT Image Feb 28, 2026, 04_50_16 PM.png",
  },
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
                <img
                  src={project.image}
                  alt={project.title}
                  className="pp-image"
                />
                <div className="pp-image-overlay"></div>
              </div>

              {/* Content Side */}
              <div className="pp-content">
                <div className="pp-number">
                  {/* Pads the index to always be two digits like 01, 02 */}
                  // {String(index + 1).padStart(2, "0")}
                </div>
                <h2 className="pp-card-title">{project.title}</h2>

                <div className="pp-tech-stack">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="pp-tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="pp-card-desc">{project.description}</p>

                <div className="pp-actions">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="pp-btn solid"
                  >
                    LIVE_DEMO.EXE
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="pp-btn outline"
                  >
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
