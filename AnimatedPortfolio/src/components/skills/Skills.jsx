import React, { useRef } from "react";
import "./Skills.css";
import Reveal from "../Reveal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Minimalistic Modern Token Pill Component
const SkillToken = ({ name, icon, invert }) => {
  return (
    <div className="tech-token">
      <div className="token-glow"></div>
      <img
        src={icon}
        alt={`${name} logo`}
        className="token-icon"
        style={{ filter: invert ? "brightness(0) invert(1)" : "none" }}
      />
      <span className="token-name">{name}</span>
    </div>
  );
};

const Skills = () => {
  const containerRef = useRef();

  useGSAP(
    () => {
      gsap.fromTo(
        ".dashboard-row",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".skills-dashboard",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section id="skills" className="skills-fresh-section" ref={containerRef}>
      <div className="matrix-glow-top"></div>
      <div className="matrix-glow-bottom"></div>

      <div className="header-wrapper">
        <Reveal direction="up">
          <span className="section-subtitle">// CAPABILITIES & EXPERTISE</span>
          <h2 className="section-header-fresh">
            TECH <span className="highlight-fresh">STACK</span>
          </h2>
        </Reveal>
      </div>

      <div className="skills-dashboard">
        {/* ROW 1: TRADITIONAL MACHINE LEARNING & DATA */}
        <div className="dashboard-row">
          <div className="row-sidebar">
            <span className="row-index">01</span>
            <h3 className="row-title">Machine Learning & Data</h3>
            <span className="learning-status">
                <span className="pulse-dot"></span>
                CURRENTLY LEARNING
              </span>
            <div className="accent-bar ml-bar"></div>
          </div>
          <div className="row-content">
            <SkillToken
              name="Python"
              icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
            />
            <SkillToken
              name="Pandas"
              icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg"
              invert={true}
            />
            <SkillToken
              name="NumPy"
              icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg"
            />
            <SkillToken
              name="Matplotlib"
              icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg"
            />
            <SkillToken
              name="Seaborn"
              icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/seaborn/seaborn-original.svg"
            />
            <SkillToken
              name="Scikit-learn"
              icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg"
            />
            <SkillToken
              name="OpenCV"
              icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg"
            />
            <SkillToken
              name="TensorFlow"
              icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg"
            />
          </div>
        </div>

        {/* ROW 2: GENERATIVE AI & AGENTIC SYSTEMS */}
        <div className="dashboard-row">
          <div className="row-sidebar">
            <span className="row-index">02</span>
            <div className="title-status-wrapper">
              <h3 className="row-title">Generative AI & Agents</h3>
              <span className="learning-status">
                <span className="pulse-dot"></span>
                CURRENTLY LEARNING
              </span>
            </div>
            <div className="accent-bar ai-bar"></div>
          </div>
          <div className="row-content">
            <SkillToken
              name="Gemini LLM"
              icon="https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/assets/gemini-color.png"
            />
            <SkillToken
              name="LangChain"
              icon="https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/assets/langchain-color.png"
            />
            <SkillToken
              name="LangGraph"
              icon="https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/assets/langchain-color.png"
            />
            <SkillToken
              name="Tavily AI"
              icon="https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/assets/tavily-color.png"
            />
            {/* <SkillToken
              name="Jupyter"
              icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg"
            /> */}
          </div>
        </div>

        {/* ROW 3: FRONTEND ARCHITECTURE */}
        <div className="dashboard-row">
          <div className="row-sidebar">
            <span className="row-index">03</span>
            <h3 className="row-title">Frontend Architecture</h3>
            <div className="accent-bar dev-bar"></div>
          </div>
          <div className="row-content">
            <SkillToken
              name="React.js"
              icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
            />
            <SkillToken
              name="Next.js"
              icon="https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png"
              invert={true}
            />
            <SkillToken
              name="Tailwind CSS"
              icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
            />
            <SkillToken
              name="Redux"
              icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg"
            />
            <SkillToken
              name="Zustand"
              icon="https://raw.githubusercontent.com/pmndrs/zustand/main/docs/favicon.ico"
            />
            <SkillToken
              name="Framer Motion"
              icon="https://images.seeklogo.com/logo-png/43/b/framer-motion-logo-png_seeklogo-434057.png"
            />
            <SkillToken
              name="Shadcn UI"
              icon="https://avatar.iran.liara.run/public/37"
              invert={true}
            />
          </div>
        </div>

        {/* ROW 4: BACKEND ENGINEERING */}
        <div className="dashboard-row">
          <div className="row-sidebar">
            <span className="row-index">04</span>
            <h3 className="row-title">Backend Engineering</h3>
            <div className="accent-bar dev-bar"></div>
          </div>
          <div className="row-content">
            <SkillToken
              name="Node.js"
              icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
            />
            <SkillToken
              name="Express.js"
              icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg"
              invert={true}
            />
            <SkillToken
              name="JWT Auth"
              icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/json/json-original.svg"
            />
            <SkillToken
              name="WebSockets"
              icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg"
              invert={true}
            />
            <SkillToken
              name="Spring Boot"
              icon="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Spring_Framework_Logo_2018.svg/1280px-Spring_Framework_Logo_2018.svg.png"
              invert={true}
            />
            <SkillToken
              name="Spring Security"
              icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg"
            />
            <SkillToken
              name="REST APIs"
              icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/openapi/openapi-original.svg"
            />
            <SkillToken
              name="Maven"
              icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/maven/maven-original.svg"
            />
          </div>
        </div>

        {/* ROW 5: TWO-COLUMN SPLIT (Databases & DevOps) */}
        <div className="dashboard-split-container">
          <div className="dashboard-row split-row">
            <div className="row-sidebar">
              <span className="row-index">05</span>
              <h3 className="row-title">Databases & Cloud</h3>
              <div className="accent-bar data-bar"></div>
            </div>
            <div className="row-content">
              <SkillToken
                name="MongoDB"
                icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg"
              />
              <SkillToken
                name="MySQL"
                icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg"
              />
              <SkillToken
                name="Cloudinary"
                icon="https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/1/cloudinary-icon-ug0qqy8ms6ozyzy6cntbll.png/cloudinary-icon-hz05evx1htrghud89kpab4.png?_a=DATAiZAAZAA0"
              />
              <SkillToken
                name="Imagekit"
                icon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcYZb9ocjmCaPKFZS6qMv3zXFMmQzuXZnHGQ&s"
              />
            </div>
          </div>

          <div className="dashboard-row split-row">
            <div className="row-sidebar">
              <span className="row-index">06</span>
              <h3 className="row-title">DevOps & Systems</h3>
              <div className="accent-bar data-bar"></div>
            </div>
            <div className="row-content">
              <SkillToken
                name="Docker"
                icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
              />
              <SkillToken
                name="AWS"
                icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
                invert={true}
              />
              <SkillToken
                name="Linux"
                icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg"
              />
              <SkillToken
                name="Redis"
                icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg"
              />
              <SkillToken
                name="Nginx"
                icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg"
              />
            </div>
          </div>
        </div>

        {/* ROW 6: TWO-COLUMN SPLIT (Languages & Core Utilities) */}
        <div className="dashboard-split-container">
          <div className="dashboard-row split-row">
            <div className="row-sidebar">
              <span className="row-index">07</span>
              <h3 className="row-title">Languages</h3>
              <div className="accent-bar core-bar"></div>
            </div>
            <div className="row-content">
              <SkillToken
                name="Java"
                icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg"
              />
              <SkillToken
                name="JavaScript"
                icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"
              />
              <SkillToken
                name="TypeScript"
                icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
              />
              <SkillToken
                name="HTML/CSS"
                icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg"
              />
            </div>
          </div>

          <div className="dashboard-row split-row">
            <div className="row-sidebar">
              <span className="row-index">08</span>
              <h3 className="row-title">Core Utilities</h3>
              <div className="accent-bar core-bar"></div>
            </div>
            <div className="row-content">
              <SkillToken
                name="Git & GitHub"
                icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
                invert={true}
              />
              <SkillToken
                name="Postman"
                icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg"
              />
              <SkillToken
                name="VS Code"
                icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg"
              />
              <SkillToken
                name="IntelliJ"
                icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;