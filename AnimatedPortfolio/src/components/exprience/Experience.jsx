import React, { useRef, useState, useEffect } from "react";
import "./Experience.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const containerRef = useRef();
  const [activeCard, setActiveCard] = useState(null);

  // API Data States
  const [lcData, setLcData] = useState(null);
  const [cfData, setCfData] = useState(null);

  // leetcode Data
  const [lAllQuestion, setlAllQuestion] = useState(0);
  const [lEasyQuestion, setlEasyQuestion] = useState(0);
  const [lMediumQuestion, setlMediumQuestion] = useState(0);
  const [lHardQuestion, setlHardQuestion] = useState(0);
  const [totalActiveDays, setTotalActiveDays] = useState(0);
  const [strak, setStrak] = useState(0);

  const [lRanking, setLRanking] = useState(0);
  const [lRealName, setLRealName] = useState("");
  const [lAvatar, setLAvatar] = useState("");
  const [lActiveBadge, setLActiveBadge] = useState("");
  const [lBadgeCount, setLBadgeCount] = useState(0);
  const [lActiveBadgeIcon, setLActiveBadgeIcon] = useState("");

  useEffect(() => {
    const leetcodeData = async () => {
      const data = await axios.get("http://localhost:3000/api/leetcode");
      console.log(data);
      setlAllQuestion(data.data.submitStats.acSubmissionNum[0].count);
      setlEasyQuestion(data.data.submitStats.acSubmissionNum[1].count);
      setlMediumQuestion(data.data.submitStats.acSubmissionNum[2].count);
      setlHardQuestion(data.data.submitStats.acSubmissionNum[3].count);
      setTotalActiveDays(data.data.userCalendar.totalActiveDays);
      setStrak(data.data.userCalendar.streak);
      setLRanking(data.data.profile.ranking);
      setLRealName(data.data.profile.realName);
      setLAvatar(data.data.profile.userAvatar);

      if (data.data.activeBadge) {
        setLActiveBadge(data.data.activeBadge.displayName);
      }
      if (data.data.badges) {
        setLBadgeCount(data.data.badges.length);
      }
      if (data.data.badges) {
        let n = data.data.badges.length;
        console.log(data.data.badges[3].icon)
        setLActiveBadge(data.data.badges[n-1].displayName);
        setLActiveBadgeIcon(data.data.badges[n-1].icon);
      }
    };
    leetcodeData();
  }, []);

  useGSAP(
    () => {
      gsap.from(".glass-module", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".dashboard-grid",
          start: "top 85%",
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section id="experience" className="experience-section" ref={containerRef}>
      <div className="header-group">
        <h2 className="section-header">
          CODING <span className="highlight">COMMAND CENTER</span>
        </h2>
      </div>

      <div className={`dashboard-grid ${activeCard ? "has-active" : ""}`}>
        {/* ==================== LEETCODE MODULE ==================== */}
        {/* ==================== LEETCODE MODULE ==================== */}
        <div
          className={`glass-module ${activeCard === "lc" ? "expanded" : activeCard ? "collapsed" : ""}`}
          onMouseEnter={() => setActiveCard("lc")}
          onMouseLeave={() => setActiveCard(null)}
        >
          {/* COMPACT VIEW */}
          <div className="view-compact">
            {/* Inline SVG LeetCode Logo */}
            <div className="big-logo-container">
              <svg viewBox="0 0 24 24" fill="white" className="huge-logo">
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.541l5.967 5.68c.8.761 2.077.761 2.877 0l5.611-5.343a1.36 1.36 0 0 0 0-1.921 1.362 1.362 0 0 0-1.922 0l-4.65 4.427a.496.496 0 0 1-.72 0l-5.966-5.68a3.166 3.166 0 0 1-.871-1.377 3.016 3.016 0 0 1-.145-1.597 3.253 3.253 0 0 1 .655-1.287 3.204 3.204 0 0 1 .482-.49L7.18 8.16l4.424-4.737a.496.496 0 0 1 .72 0l3.852 4.126a1.362 1.362 0 0 0 1.922 0 1.362 1.362 0 0 0 0-1.921L14.246.438A1.374 1.374 0 0 0 13.483 0zm5.105 10.103c-.663 0-1.2.537-1.2 1.2s.537 1.2 1.2 1.2h4.008c.663 0 1.2-.537 1.2-1.2s-.537-1.2-1.2-1.2h-4.008z" />
              </svg>
            </div>

            <div className="compact-text-group">
              <div className="platform-title">LEETCODE.SYS</div>
              <div className="rank-tag">
                #{lRanking ? lRanking.toLocaleString() : "..."}
              </div>
            </div>

            <div className="main-display lc-split">
              <div className="progress-ring">
                <svg viewBox="0 0 100 100">
                  <circle className="ring-bg" cx="50" cy="50" r="45" />
                  <circle
                    className="ring-meter lc-meter"
                    cx="50"
                    cy="50"
                    r="45"
                  />
                </svg>
                <div className="ring-text">
                  <span className="big-num">{lAllQuestion}</span>
                  <span className="label">SOLVED</span>
                </div>
              </div>

              <div className="bars-container">
                <div className="bar-row">
                  <span className="bar-label">EASY</span>
                  <div className="bar-bg">
                    <div
                      className="bar-fill easy-fill"
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                  <span className="bar-val">{lEasyQuestion}</span>
                </div>
                <div className="bar-row">
                  <span className="bar-label">MED</span>
                  <div className="bar-bg">
                    <div
                      className="bar-fill med-fill"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                  <span className="bar-val">{lMediumQuestion}</span>
                </div>
                <div className="bar-row">
                  <span className="bar-label">HARD</span>
                  <div className="bar-bg">
                    <div
                      className="bar-fill hard-fill"
                      style={{ width: "15%" }}
                    ></div>
                  </div>
                  <span className="bar-val">{lHardQuestion}</span>
                </div>
              </div>
            </div>

            <div className="module-footer lc-footer">
              <div className="footer-stat">
                TOTAL ACTIVE DAYS <strong>{totalActiveDays}</strong>
              </div>
              <div className="footer-stat">
                STREAK <strong>{strak} Days</strong>
              </div>
            </div>
          </div>

          {/* EXPANDED VIEW */}
          <div className="view-expanded">
            <div
              className="exp-header"
              style={{ display: "flex", alignItems: "center", gap: "15px" }}
            >
              {lAvatar && (
                <img
                  src={lAvatar}
                  alt="avatar"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    border: "2px solid #00f2ff",
                  }}
                />
              )}
              <h2>
                LEETCODE.SYS //{" "}
                <span className="highlight">
                  {lRealName ? lRealName.toUpperCase() : "LOADING_USER..."}
                </span>
              </h2>
            </div>
            <div className="exp-content">
             <div className="exp-stats-box">
                <p>Global Ranking: <strong>#{lRanking ? lRanking.toLocaleString() : "0"}</strong></p>
                <p>Badges Earned: <strong>{lBadgeCount}</strong></p>
                
                {/* Updated Badge Section */}
                <div style={{ marginTop: '20px' }}>
                  <p style={{ marginBottom: '10px' }}>
                    Latest Badge: <strong style={{color: "#ffc01e"}}>{lActiveBadge || "None"}</strong>
                  </p>
                  
                  {/* It will only render the image if the user actually has an active badge */}
                  {lActiveBadgeIcon && (
                    <img 
                      src={lActiveBadgeIcon} 
                      alt={lActiveBadge} 
                      style={{ 
                        width: '70px', 
                        height: '70px', 
                        objectFit: 'contain',
                        filter: 'drop-shadow(0px 0px 12px rgba(255, 192, 30, 0.4))' // Gives it a cool yellow glow!
                      }} 
                    />
                  )}
                </div>
              </div>
              <div className="terminal-log">
                <p className="log-line">
                  {" "}
                  {">"} INIT_USER: {lRealName}
                </p>
                <p className="log-line">
                  {" "}
                  {">"} ACTIVE_DAYS_LOGGED: {totalActiveDays}
                </p>
                <p className="log-line success">
                  {" "}
                  {">"} CONSISTENCY_STREAK: {strak} DAYS
                </p>
                <p className="log-line success">
                  {" "}
                  {">"} SYSTEM_STATUS: OPTIMAL
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== CODEFORCES MODULE ==================== */}
        <div
          className={`glass-module ${activeCard === "cf" ? "expanded" : activeCard ? "collapsed" : ""}`}
          onMouseEnter={() => setActiveCard("cf")}
          onMouseLeave={() => setActiveCard(null)}
        >
          {/* COMPACT VIEW */}
          <div className="view-compact">
            {/* Pure CSS Codeforces Logo - Will never break! */}
            <div className="big-logo-container cf-bars-wrapper">
              <div className="cf-big-bar yellow"></div>
              <div className="cf-big-bar blue"></div>
              <div className="cf-big-bar red"></div>
            </div>

            <div className="compact-text-group">
              <div className="platform-title">CODEFORCES.EXE</div>
              <div className="rank-tag">
                {cfData ? cfData.rank.toUpperCase() : "SPECIALIST"}
              </div>
            </div>

            <div className="hero-section">
              <h2 className="hero-rating cf-color">
                {cfData ? cfData.rating : "1458"}
              </h2>
              <p className="hero-sub">
                MAX RATING: {cfData ? cfData.maxRating : "1502"}
              </p>
            </div>

            <div className="stats-mini-grid">
              <div className="mini-box">
                <span>CONTESTS</span>
                <strong>62</strong>
              </div>
              <div className="mini-box">
                <span>RANK</span>
                <strong>Top 15%</strong>
              </div>
            </div>

            <a href="#" className="action-btn">
              ACCESS_PROFILE _
            </a>
          </div>

          {/* EXPANDED VIEW */}
          <div className="view-expanded">
            <div className="exp-header">
              <h2>
                CODEFORCES.EXE //{" "}
                <span className="cf-color">
                  {cfData?.handle || "Loading..."}
                </span>
              </h2>
            </div>
            <div className="exp-content">
              <div className="exp-stats-box">
                <p>
                  Current Rating:{" "}
                  <strong className="cf-color">{cfData?.rating || "0"}</strong>
                </p>
                <p>
                  Organization: <strong>{cfData?.organization || "N/A"}</strong>
                </p>
              </div>
              <div className="terminal-log">
                <p className="log-line">
                  {" "}
                  {">"} Max Rating Achieved: {cfData?.maxRating}
                </p>
                <p className="log-line success"> {">"} STATUS: CONNECTED</p>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== CODECHEF MODULE ==================== */}
        <div
          className={`glass-module ${activeCard === "cc" ? "expanded" : activeCard ? "collapsed" : ""}`}
          onMouseEnter={() => setActiveCard("cc")}
          onMouseLeave={() => setActiveCard(null)}
        >
          {/* COMPACT VIEW */}
          <div className="view-compact">
            {/* Inline SVG CodeChef-style Logo - Will never break! */}
            <div className="big-logo-container">
              <svg viewBox="0 0 24 24" fill="white" className="huge-logo">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-12.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm4 0a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" />
              </svg>
            </div>

            <div className="compact-text-group">
              <div className="platform-title">CODECHEF.LOG</div>
              <div className="stars">
                ★★★<span style={{ color: "#555" }}>☆☆</span>
              </div>
            </div>

            <div className="hero-section">
              <h2 className="hero-rating cc-color">1685</h2>
              <p className="hero-sub">GLOBAL RANK: #4,521</p>
            </div>

            <div className="stats-mini-grid">
              <div className="mini-box">
                <span>DIVISION</span>
                <strong>Div 2</strong>
              </div>
              <div className="mini-box">
                <span>RECENT</span>
                <strong>Rank 412</strong>
              </div>
            </div>

            <a href="#" className="action-btn">
              VIEW_STATS.EXE
            </a>
          </div>

          {/* EXPANDED VIEW */}
          <div className="view-expanded">
            <div className="exp-header">
              <h2>
                CODECHEF.LOG // <span>SUDHANSHU</span>
              </h2>
            </div>
            <div className="exp-content">
              <div className="exp-stats-box">
                <p>
                  Highest Rating: <strong>1720</strong>
                </p>
                <p>
                  Division: <strong>Div 2</strong>
                </p>
              </div>
              <div className="terminal-log">
                <p className="log-line"> {">"} Starters 124: Rank 412 (+35)</p>
                <p className="log-line success"> {">"} RATING TREND: UPWARD</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
