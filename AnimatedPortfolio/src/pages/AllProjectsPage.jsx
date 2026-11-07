import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PillNav from "../components/PillNav/PillNav.jsx";
import Footer from "../components/Footer/Footer.jsx";
import ProjectCard from "../components/Projects/ProjectCard.jsx";
import { PROJECTS } from "../data/projects.js";
import { NAV_ITEMS } from "../data/site.js";
import logo from "../assets/logo.svg";
import "./AllProjectsPage.css";

export default function AllProjectsPage() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "All projects — Sudhanshu Baberwal";
    window.scrollTo({ top: 0, behavior: "instant" });
    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <div className="all-projects-page">
      {/* ── Fixed pill nav ── */}
      <div
        style={{
          position: "fixed",
          top: "calc(clamp(12px, 1.8vw, 24px) + env(safe-area-inset-top, 0px))",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
          width: "max-content",
          maxWidth: "calc(100vw - 32px)",
        }}
      >
        <PillNav
          logo={logo}
          logoAlt="Sudhanshu Baberwal"
          items={NAV_ITEMS}
          activeHref="/#projects"
          itemStyle="pill"
          hoverEffect="fill"
          indicator="dot"
          layout="split"
          surface="glass"
          size="md"
          bounce={0.3}
          stretch={0.5}
          collapse="auto"
          intro={false}
        />
      </div>

      <main className="all-projects-page__main">
        <div className="all-projects-page__container">
          {/* Header Row */}
          <header className="all-projects-page__header">
            <div className="all-projects-page__header-left">
              <span className="all-projects-page__label">
                All projects / {PROJECTS.length} total
              </span>
              <h1 className="all-projects-page__title">Selected & Open Source</h1>
            </div>

            <div className="all-projects-page__header-right">
              <Link
                to="/"
                className="all-projects-page__back-link cursor-target"
                data-cursor-label="Open"
              >
                <span>← Back home</span>
              </Link>
            </div>
          </header>

          {/* 2-Column Grid (1 Column on mobile) of ALL Projects */}
          <div className="all-projects-page__grid">
            {PROJECTS.map((project, idx) => (
              <div key={project.id} className="all-projects-page__card-wrap">
                <ProjectCard
                  project={project}
                  index={idx}
                  total={PROJECTS.length}
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
