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
  const [dataLoaded, setDataLoaded] = useState(false);

  // API Data States
  const [lcData, setLcData] = useState(null);
  const [cfData, setCfData] = useState(null);
  const [ghData, setGhData] = useState(null); // <-- NEW: GitHub State

  // Leetcode Data
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
      try {
        const data = await axios.get("http://localhost:3000/api/leetcode");
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
          let n = data.data.badges.length;
          setLActiveBadge(data.data.badges[n - 1].displayName);
          setLActiveBadgeIcon(data.data.badges[n - 1].icon);
        }
      } catch (err) {
        console.error(err);
      }
    };

    const codeforcesData = async () => {
      try {
        const data = await axios.get("http://localhost:3000/api/code-forces", {
          withCredentials: true,
        });
        setCfData(data.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    const githubData = async () => {
      try {
        const data = await axios.get("http://localhost:3000/api/github");
        console.log(data)
        setGhData(data.data.data); // <-- NEW: Saving GitHub data to state
      } catch (err) {
        console.error(err);
      }
    };

    // Load everything
    Promise.all([leetcodeData(), codeforcesData(), githubData()]).then(() => {
      setDataLoaded(true); // Triggers GSAP animation once all APIs return
    });
  }, []);

  useGSAP(
    () => {
      gsap.fromTo(
        ".glass-module",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        },
      );
    },
    { scope: containerRef, dependencies: [dataLoaded] },
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
        <div
          className={`glass-module ${activeCard === "lc" ? "expanded" : activeCard ? "collapsed" : ""}`}
          onMouseEnter={() => setActiveCard("lc")}
          onMouseLeave={() => setActiveCard(null)}
        >
          {/* COMPACT VIEW */}
          <div className="view-compact">
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
                  <circle className="ring-meter lc-meter" cx="50" cy="50" r="45" />
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
                    <div className="bar-fill easy-fill" style={{ width: "70%" }}></div>
                  </div>
                  <span className="bar-val">{lEasyQuestion}</span>
                </div>
                <div className="bar-row">
                  <span className="bar-label">MED</span>
                  <div className="bar-bg">
                    <div className="bar-fill med-fill" style={{ width: "45%" }}></div>
                  </div>
                  <span className="bar-val">{lMediumQuestion}</span>
                </div>
                <div className="bar-row">
                  <span className="bar-label">HARD</span>
                  <div className="bar-bg">
                    <div className="bar-fill hard-fill" style={{ width: "15%" }}></div>
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
            <div className="exp-header" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              {lAvatar && (
                <img
                  src={lAvatar}
                  alt="avatar"
                  style={{ width: "50px", height: "50px", borderRadius: "50%", border: "2px solid #00f2ff" }}
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

                <div style={{ marginTop: "20px" }}>
                  <p style={{ marginBottom: "10px" }}>
                    Latest Badge: <strong style={{ color: "#ffc01e" }}>{lActiveBadge || "None"}</strong>
                  </p>

                  {lActiveBadgeIcon && (
                    <img
                      src={lActiveBadgeIcon}
                      alt={lActiveBadge}
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "contain",
                        filter: "drop-shadow(0px 0px 12px rgba(255, 192, 30, 0.4))",
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="terminal-log">
                <p className="log-line"> {">"} INIT_USER: {lRealName}</p>
                <p className="log-line"> {">"} ACTIVE_DAYS_LOGGED: {totalActiveDays}</p>
                <p className="log-line success"> {">"} CONSISTENCY_STREAK: {strak} DAYS</p>
                <p className="log-line success"> {">"} SYSTEM_STATUS: OPTIMAL</p>
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
                <strong>{cfData ? cfData.contestsAttended : 5}</strong>
              </div>
              <div className="mini-box">
                <span>BEST RANK</span>
                <strong>{cfData?.bestRank || "N/A"}</strong>
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
                <p className="log-line"> {">"} Max Rating Achieved: {cfData?.maxRating}</p>
                <p className="log-line success"> {">"} STATUS: CONNECTED</p>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== GITHUB MODULE ==================== */}
        <div
          className={`glass-module ${activeCard === "gh" ? "expanded" : activeCard ? "collapsed" : ""}`}
          onMouseEnter={() => setActiveCard("gh")}
          onMouseLeave={() => setActiveCard(null)}
        >
          {/* COMPACT VIEW */}
          <div className="view-compact">
            {/* Inline SVG GitHub Logo */}
            <div className="big-logo-container">
              <svg viewBox="0 0 24 24" fill="white" className="huge-logo">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </div>

            <div className="compact-text-group">
              <div className="platform-title">GITHUB.GIT</div>
              <div className="rank-tag" style={{ color: "#2ea043", borderColor: "rgba(46, 160, 67, 0.3)", background: "rgba(46, 160, 67, 0.1)" }}>
                OPEN_SOURCE
              </div>
            </div>

            <div className="hero-section">
              <h2 className="hero-rating" style={{ color: "#2ea043" }}>
                {/* Note: Map these to whatever keys your custom API actually returns! */}
                {ghData?.publicRepos || "32"} 
              </h2>
              <p className="hero-sub">PUBLIC REPOSITORIES</p>
            </div>

            <div className="stats-mini-grid">
              <div className="mini-box">
                <span>FOLLOWERS</span>
                <strong>{ghData?.followers || "12"}</strong>
              </div>
              <div className="mini-box">
                <span>FOLLOWING</span>
                <strong>{ghData?.following || "15"}</strong>
              </div>
            </div>

            <a href="#" className="action-btn" style={{ borderColor: "#2ea043", color: "#2ea043" }}>
              VIEW_COMMITS.SH
            </a>
          </div>

          {/* EXPANDED VIEW */}
          <div className="view-expanded">
            <div className="exp-header" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              {/* Uses your github avatar if the API provides it! */}
              {ghData?.avatar_url && (
                <img
                  src={ghData.avatar_url}
                  alt="avatar"
                  style={{ width: "50px", height: "50px", borderRadius: "50%", border: "2px solid #2ea043" }}
                />
              )}
              <h2>
                GITHUB.GIT // <span style={{ color: "#2ea043" }}>{ghData?.login?.toUpperCase() || "DEVELOPER"}</span>
              </h2>
            </div>
            <div className="exp-content">
              <div className="exp-stats-box">
                <p>Total Contributions: <strong>{ghData?.contributions || "Loading..."}</strong></p>
                <p>Account Type: <strong>{ghData?.type || "User"}</strong></p>
              </div>
              <div className="terminal-log">
                <p className="log-line"> {">"} git status</p>
                <p className="log-line"> {">"} On branch main</p>
                <p className="log-line"> {">"} Your branch is up to date with 'origin/main'.</p>
                <p className="log-line success" style={{ color: "#2ea043" }}> {">"} STATUS: CLEAN, READY TO DEPLOY</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;