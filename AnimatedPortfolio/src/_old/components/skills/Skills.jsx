import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import SectionIndex from "../common/SectionIndex";
import stackFigure from "../../assets/stack-figure.png";
import {
  ARCHITECTURE_NODES,
  ARCHITECTURE_EDGES,
  ARCHITECTURE_PILLARS,
} from "../../data/stack";
import "./Skills.css";

// Monochrome minimalist SVG icons for architectural pillars
const PillarIcon = ({ name }) => {
  switch (name) {
    case "kafka":
      return (
        <svg className="pillar-icon-svg" viewBox="0 0 24 24">
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="18" cy="18" r="3" />
          <path d="M8.7 10.7l6.6-3.4M8.7 13.3l6.6 3.4" />
        </svg>
      );
    case "event":
      return (
        <svg className="pillar-icon-svg" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case "microservices":
      return (
        <svg className="pillar-icon-svg" viewBox="0 0 24 24">
          <rect x="2" y="2" width="8" height="8" rx="2" />
          <rect x="14" y="2" width="8" height="8" rx="2" />
          <rect x="2" y="14" width="8" height="8" rx="2" />
          <rect x="14" y="14" width="8" height="8" rx="2" />
        </svg>
      );
    case "redis":
      return (
        <svg className="pillar-icon-svg" viewBox="0 0 24 24">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
    case "database":
      return (
        <svg className="pillar-icon-svg" viewBox="0 0 24 24">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      );
    case "cloud":
    default:
      return (
        <svg className="pillar-icon-svg" viewBox="0 0 24 24">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      );
  }
};

const Skills = () => {
  const containerRef = useRef(null);
  const diagramRef = useRef(null);
  const figureRef = useRef(null);

  const [hoveredNode, setHoveredNode] = useState(null);
  const [activePillar, setActivePillar] = useState(null);

  // 3D Perspective Tilt on Mouse Move
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const handleMouseMove = (e) => {
      if (prefersReducedMotion || !diagramRef.current) return;
      const rect = diagramRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(diagramRef.current, {
        rotationY: x * 8,
        rotationX: -y * 8,
        transformPerspective: 1200,
        duration: 0.6,
        ease: "power2.out",
      });

      if (figureRef.current) {
        gsap.to(figureRef.current, {
          x: x * 15,
          y: y * 10,
          duration: 0.9,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = () => {
      if (diagramRef.current) {
        gsap.to(diagramRef.current, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      }
    };

    const node = diagramRef.current;
    if (node) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      node.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (node) node.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Determine which nodes and edges are highlighted
  const getIsNodeActive = (nodeId) => {
    if (hoveredNode) {
      if (hoveredNode.id === nodeId) return true;
      // Also highlight directly connected neighbours
      return ARCHITECTURE_EDGES.some(
        (edge) =>
          (edge.from === hoveredNode.id && edge.to === nodeId) ||
          (edge.to === hoveredNode.id && edge.from === nodeId)
      );
    }
    if (activePillar) {
      return activePillar.relatedNodes.includes(nodeId);
    }
    return true; // Default: all active
  };

  const getIsEdgeActive = (edge) => {
    if (hoveredNode) {
      return edge.from === hoveredNode.id || edge.to === hoveredNode.id;
    }
    if (activePillar) {
      return (
        activePillar.relatedNodes.includes(edge.from) &&
        activePillar.relatedNodes.includes(edge.to)
      );
    }
    return true;
  };

  const hasAnySelection = hoveredNode !== null || activePillar !== null;

  return (
    <section className="stack-cinematic" id="skills" ref={containerRef}>
      {/* Background Soft Glow */}
      <div className="stack-bg-glow" />

      <div className="stack-container-inner">
        {/* TOP TWO-COLUMN HERO GRID */}
        <div className="stack-hero-grid">
          {/* LEFT COLUMN: FIGURE + INTRO TEXT */}
          <div className="stack-left-col">
            <SectionIndex
              number="05"
              title=""
              subtitle="TECH STACK & ARCHITECTURE"
              className="mb-2!"
            />

            <div className="stack-intro-text font-mono">
              <div className="stack-tagline-1">
                SYSTEM ARCHITECTURE IN ACTION.
              </div>
              <div className="stack-tagline-2">
                DESIGNING REAL-WORLD SYSTEMS THAT SCALE.
              </div>
            </div>

            <div className="stack-figure-frame" ref={figureRef}>
              <img
                src={stackFigure}
                alt="System Architecture Exploration"
                className="stack-figure-img"
                loading="lazy"
              />
              <div className="stack-figure-mask" />
              <div className="stack-figure-badge font-mono">
                // ARCHITECTURE.LIVE
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE 3D ARCHITECTURE DIAGRAM */}
          <div className="stack-right-col">
            {/* Desktop Full 3D Interactive Diagram */}
            <div className="diagram-stage-3d" ref={diagramRef}>
              <div className="diagram-header-bar font-mono">
                <div className="diagram-title">
                  <span className="status-dot-pulse" />
                  <span>SYSTEM_TOPOLOGY_V2.6 // LIVE EVENT FLOW</span>
                </div>
                <div className="diagram-stats">
                  <span className="diagram-stat-item">LATENCY: &lt;12ms</span>
                  <span className="diagram-stat-item">NODES: 9</span>
                  <span className="diagram-stat-item">MODE: ASYNC EVENT-DRIVEN</span>
                </div>
              </div>

              <div className="diagram-canvas-wrap">
                {/* SVG Connections & Particle Flows */}
                <svg
                  className="diagram-svg-overlay"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <marker
                      id="arrow"
                      viewBox="0 0 10 10"
                      refX="6"
                      refY="5"
                      markerWidth="4"
                      markerHeight="4"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="rgba(255,255,255,0.4)" />
                    </marker>
                    <marker
                      id="arrow-active"
                      viewBox="0 0 10 10"
                      refX="6"
                      refY="5"
                      markerWidth="4"
                      markerHeight="4"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#ffffff" />
                    </marker>
                  </defs>

                  {ARCHITECTURE_EDGES.map((edge, index) => {
                    const isActive = getIsEdgeActive(edge);
                    const isDimmed = hasAnySelection && !isActive;

                    return (
                      <g key={index}>
                        <path
                          d={edge.path}
                          className={`diagram-edge ${
                            isActive && hasAnySelection ? "active" : ""
                          } ${isDimmed ? "dimmed" : ""}`}
                          markerEnd={
                            isActive && hasAnySelection
                              ? "url(#arrow-active)"
                              : "url(#arrow)"
                          }
                        />
                        {/* Animated Travelling Particle Dot */}
                        <circle
                          r="0.8"
                          className="flow-dot"
                          opacity={isDimmed ? 0.05 : 0.9}
                        >
                          <animateMotion
                            path={edge.path}
                            dur={`${2.2 + (index % 3) * 0.6}s`}
                            repeatCount="indefinite"
                          />
                        </circle>
                      </g>
                    );
                  })}
                </svg>

                {/* Real DOM Nodes */}
                <div className="diagram-nodes-layer">
                  {ARCHITECTURE_NODES.map((node) => {
                    const isActive = getIsNodeActive(node.id);
                    const isDimmed = hasAnySelection && !isActive;

                    return (
                      <div
                        key={node.id}
                        className={`diagram-node-card ${
                          isActive && hasAnySelection ? "active" : ""
                        } ${isDimmed ? "dimmed" : ""}`}
                        style={{
                          left: `${node.x}%`,
                          top: `${node.y}%`,
                          width: `${node.width}%`,
                          height: `${node.height}%`,
                        }}
                        onMouseEnter={() => setHoveredNode(node)}
                        onMouseLeave={() => setHoveredNode(null)}
                      >
                        <div className="node-card-label">{node.label}</div>
                        <div className="node-card-sublabel font-mono">
                          {node.sublabel}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Hover Tooltip */}
                {hoveredNode && (
                  <div className="node-tooltip">
                    <span className="tooltip-tag font-mono">
                      [{hoveredNode.label}]:
                    </span>
                    <span className="tooltip-text">{hoveredNode.desc}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Fallback: Simplified Vertical Layer List */}
            <div className="mobile-layers-list font-mono">
              {ARCHITECTURE_NODES.map((node) => (
                <div key={node.id} className="mobile-layer-card">
                  <div className="mobile-layer-title">{node.label}</div>
                  <div className="mobile-layer-desc">{node.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: 6 ARCHITECTURE PILLARS */}
        <div className="stack-pillars-section">
          <div className="pillars-header font-mono">
            <span className="pillars-title">// ARCHITECTURAL PILLARS</span>
            <span className="pillars-hint">
              [ CLICK TO HIGHLIGHT CONNECTED SUBSYSTEMS ]
            </span>
          </div>

          <div className="pillars-grid">
            {ARCHITECTURE_PILLARS.map((pillar, index) => {
              const isSelected = activePillar?.id === pillar.id;

              return (
                <div
                  key={pillar.id}
                  className={`pillar-card ${isSelected ? "active" : ""}`}
                  onClick={() =>
                    setActivePillar(isSelected ? null : pillar)
                  }
                >
                  <div className="pillar-top-row">
                    <PillarIcon name={pillar.icon} />
                    <span className="pillar-index font-mono">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="pillar-title">{pillar.title}</div>
                  <div className="pillar-subtitle font-mono">
                    {pillar.subtitle}
                  </div>
                  <p className="pillar-desc">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
