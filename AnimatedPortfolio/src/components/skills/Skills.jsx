import React, { useRef } from "react";
import "./Skills.css";
import Reveal from "../Reveal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- 3D FLIP BADGE COMPONENT ---
const SkillBadge = ({ name, icon, invert }) => {
  return (
    <div className="skill-flip-container">
      <div className="skill-flip-inner">
        {/* FRONT: Text */}
        <div className="skill-flip-front">{name}</div>
        {/* BACK: Logo */}
        <div className="skill-flip-back">
          <img
            src={icon}
            alt={`${name} logo`}
            className="skill-logo"
            // If a logo is naturally black (like Next.js), this turns it white so it's visible on dark mode!
            style={{ filter: invert ? "brightness(0) invert(1)" : "none" }}
          />
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const containerRef = useRef();

  useGSAP(
    () => {
      gsap.fromTo(
        ".skill-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills-container",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section id="skills" className="skills-section" ref={containerRef}>
      <div className="bg-orb orb-3"></div>
      <div className="bg-orb orb-4"></div>

      <Reveal direction="up">
        <h2 className="section-header">
          MY <span className="highlight">SKILLS</span>
        </h2>
      </Reveal>

      <div className="skills-container">
        {/* CARD 1: FRONTEND */}
        <div className="skill-card">
          <div className="card-glow"></div>
          <h3>Frontend Development</h3>
          <div className="skills-grid">
            <SkillBadge
              name="React.js"
              icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
            />
            <SkillBadge
              name="Next.js"
              icon="https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png"
              invert={true}
            />
            <SkillBadge
              name="Tailwind CSS"
              icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
            />
            {/* <SkillBadge name="HTML5" icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" /> */}
            <SkillBadge
              name="Redux"
              icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg"
            />
          </div>
        </div>

        {/* CARD 2: BACKEND */}
        <div className="skill-card">
          <div className="card-glow"></div>
          <h3>Backend Development</h3>
          <div className="skills-grid">
            <SkillBadge
              name="Node.js"
              icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
            />
            <SkillBadge
              name="Express.js"
              icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg"
              invert={true}
            />
            <SkillBadge
              name="JWT Auth"
              icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/json/json-original.svg"
            />
            <SkillBadge
              name="WebSockets"
              icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg"
              invert={true}
            />
            <SkillBadge
              name="Spring boot [Learning]"
              icon="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Spring_Framework_Logo_2018.svg/1280px-Spring_Framework_Logo_2018.svg.png"
              invert={true}
            />
          </div>
        </div>

        {/* CARD 3: DATABASES */}
        <div className="skill-card">
          <div className="card-glow"></div>
          <h3>Databases & Services</h3>
          <div className="skills-grid">
            <SkillBadge
              name="MongoDB"
              icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg"
            />
            <SkillBadge
              name="MySQL"
              icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg"
            />
            <SkillBadge
              name="Cloudinary"
              icon="https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/1/cloudinary-icon-ug0qqy8ms6ozyzy6cntbll.png/cloudinary-icon-hz05evx1htrghud89kpab4.png?_a=DATAiZAAZAA0"
            />
            <SkillBadge
              name="Imagekit"
              icon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcYZb9ocjmCaPKFZS6qMv3zXFMmQzuXZnHGQ&s"
            />
            <SkillBadge
              name="Nodemailer"
              icon="https://blog.nodemailer.com/wp-content/uploads/2017/01/cropped-nm_logo_1000x680.png"
            />
          </div>
        </div>

        {/* CARD 4: CORE & TOOLS */}
        <div className="skill-card">
          <div className="card-glow"></div>
          <h3>Core & Tools</h3>
          <div className="skills-grid">
            {/* <SkillBadge name="C++" icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" /> */}
            {/* <SkillBadge name="Data Structures" icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/thealgorithms/thealgorithms-original.svg" invert={true} /> */}
            <SkillBadge
              name="Git & GitHub"
              icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
              invert={true}
            />
            <SkillBadge
              name="Postman"
              icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg"
            />
            <SkillBadge
              name="VS Code"
              icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg"
            />
          </div>
        </div>

        {/* CARD 5: Others */}
        <div className="skill-card">
          <div className="card-glow"></div>
          <h3>Languages</h3>
          <div className="skills-grid">
             <SkillBadge
              name="JAVA"
              icon="/javaImage.png"
            />
             <SkillBadge
              name="Python"
              icon="https://logos-world.net/wp-content/uploads/2021/10/Python-Emblem.png"
            />
            <SkillBadge
              name="HTML"
              icon="https://cdn.iconscout.com/icon/free/png-256/free-html-5-icon-svg-download-png-1175208.png"
            />
            <SkillBadge
              name="CSS"
              icon="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/css-icon.png"
            />
            <SkillBadge
              name="Java Script"
              icon="https://upload.wikimedia.org/wikipedia/commons/c/ce/Unofficial_JavaScript_logo.svg"
              invert={true}
            />
            <SkillBadge
              name="Type Script"
              icon="https://cdn.iconscout.com/icon/free/png-256/free-typescript-icon-svg-download-png-1174965.png?f=webp"
              invert={true}
            />
          </div>
        </div>

        {/* CARD 6: DEVOPS */}
        <div className="skill-card">
          <div className="card-glow"></div>
          <h3>
            DevOps{" "}
            <span
              style={{
                fontSize: "0.8rem",
                color: "var(--neon-cyan)",
                fontWeight: "normal",
                verticalAlign: "middle",
              }}
            >
              (Learning)
            </span>
          </h3>
          <div className="skills-grid">
            <SkillBadge
              name="Docker"
              icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
            />
            <SkillBadge
              name="AWS"
              icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
              invert={true}
            />
            <SkillBadge
              name="Linux"
              icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
