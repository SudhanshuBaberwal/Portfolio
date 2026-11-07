import React, { useEffect, useRef } from "react";
import { CODING } from "../../data/coding.js";
import { useCodingStats } from "../../hooks/useCodingStats.js";
import { CountUp } from "./CountUp.jsx";
import { siGithub, siLeetcode, siCodechef } from "simple-icons";
import "./Coding.css";

const PLATFORM_ICONS = {
  GitHub: siGithub,
  LeetCode: siLeetcode,
  CodeChef: siCodechef,
};

export default function Coding() {
  const sectionRef = useRef(null);
  const { status, data: statsData } = useCodingStats(sectionRef);

  // Staggered scroll reveal
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      section.querySelectorAll(".coding__reveal-item").forEach((el) => {
        el.classList.add("is-revealed");
      });
      return;
    }

    const revealItems = section.querySelectorAll(".coding__reveal-item");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(revealItems).indexOf(entry.target);
            setTimeout(() => {
              entry.target.classList.add("is-revealed");
            }, index * 70);
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealItems.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const isDev = import.meta.env.DEV;

  // Filter platforms: in production, if CodeChef is unconfigured on server OR handle is empty, hide it
  const codechefServerStatus = statsData?.codechef?.status;
  const isCodechefConfigured = Boolean(
    CODING.platforms.find((p) => p.name === "CodeChef")?.handle ||
    (codechefServerStatus && codechefServerStatus !== "unconfigured")
  );

  const displayPlatforms = CODING.platforms.filter((p) => {
    if (p.name === "CodeChef") {
      if (!isCodechefConfigured && !isDev) {
        return false;
      }
    }
    return true;
  });

  return (
    <section
      id="coding"
      ref={sectionRef}
      className="coding"
      aria-labelledby="coding-heading"
    >
      <div className="coding__grid">
        {/* Col 1 to 3: Small top-left label */}
        <div className="coding__label-col coding__reveal-item">
          <h2 id="coding-heading" className="coding__label">
            Coding
          </h2>
          <span className="coding__label-sub">Problem solving</span>
        </div>

        {/* Col 4 to 12: Platforms Cards & Language note */}
        <div className="coding__content-col">
          {/* aria-live region to announce updates */}
          <div className="sr-only" aria-live="polite">
            {status === "ok" ? "Coding stats updated from server." : ""}
          </div>

          <div
            className={`coding__cards ${displayPlatforms.length === 2 ? "coding__cards--two-cols" : ""}`}
            aria-busy={status === "loading"}
          >
            {displayPlatforms.map((platform, idx) => {
              const iconData = PLATFORM_ICONS[platform.name];
              const keyName = platform.name.toLowerCase();
              const serverPlatform = statsData ? statsData[keyName] : null;

              // Check if CodeChef is unconfigured
              const isUnconfigured =
                platform.name === "CodeChef" &&
                (!platform.handle && (!serverPlatform || serverPlatform.status === "unconfigured"));

              if (isUnconfigured) {
                // In DEV: render dashed placeholder card
                return (
                  <div
                    key={idx}
                    className="coding__card coding__card--placeholder coding__reveal-item"
                    title="Set CODECHEF_USERNAME on the server"
                  >
                    {iconData && (
                      <div className="coding__ghost-logo" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="coding__ghost-svg">
                          <path d={iconData.path} />
                        </svg>
                      </div>
                    )}
                    <div className="coding__card-top">
                      <div className="coding__icon-wrap">
                        {iconData && (
                          <svg viewBox="0 0 24 24" fill="currentColor" className="coding__icon-svg" aria-hidden="true">
                            <path d={iconData.path} />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="coding__card-mid">
                      <h3 className="coding__platform-name">{platform.name}</h3>
                      <p className="coding__purpose">{platform.purpose}</p>
                    </div>
                    <div className="coding__card-bottom">
                      <span className="coding__dev-hint">
                        Set CODECHEF_USERNAME on the server
                      </span>
                    </div>
                  </div>
                );
              }

              // Determine stats state
              const hasServerOk = serverPlatform && serverPlatform.status === "ok" && serverPlatform.data;
              const isServerErr = status === "error" || (serverPlatform && serverPlatform.status === "error");
              const targetUrl = serverPlatform?.profileUrl || platform.url;

              return (
                <div
                  key={idx}
                  className="coding__card coding__reveal-item"
                >
                  {/* Ghost background logo */}
                  {iconData && (
                    <div className="coding__ghost-logo" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="coding__ghost-svg">
                        <path d={iconData.path} />
                      </svg>
                    </div>
                  )}

                  {/* Top: monochrome logo */}
                  <div className="coding__card-top">
                    <div className="coding__icon-wrap">
                      {iconData && (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="coding__icon-svg" aria-hidden="true">
                          <path d={iconData.path} />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Middle: name + purpose */}
                  <div className="coding__card-mid">
                    <h3 className="coding__platform-name">{platform.name}</h3>
                    <p className="coding__purpose">{platform.purpose}</p>
                  </div>

                  {/* Stats Area */}
                  <div className="coding__stats-area">
                    {status === "loading" && (
                      <div className="coding__skeleton-wrap" aria-hidden="true">
                        <div className="coding__skeleton coding__skeleton--row" />
                        <div className="coding__skeleton coding__skeleton--bar" />
                      </div>
                    )}

                    {status !== "loading" && hasServerOk && platform.name === "GitHub" && (
                      <div className="coding__github-stats">
                        <div className="coding__stat-row">
                          <div className="coding__stat-block">
                            <span className="coding__stat-val">
                              <CountUp end={serverPlatform.data.publicRepos ?? 0} />
                            </span>
                            <span className="coding__stat-lbl">Repositories</span>
                          </div>
                          <div className="coding__stat-block">
                            <span className="coding__stat-val">
                              <CountUp end={serverPlatform.data.followers ?? 0} />
                            </span>
                            <span className="coding__stat-lbl">Followers</span>
                          </div>
                          <div className="coding__stat-block">
                            <span className="coding__stat-val">
                              <CountUp end={serverPlatform.data.totalStars ?? 0} />
                            </span>
                            <span className="coding__stat-lbl">Stars</span>
                          </div>
                        </div>

                        {/* Top 3 languages segmented bar */}
                        {serverPlatform.data.topLanguages && serverPlatform.data.topLanguages.length > 0 && (
                          <div className="coding__lang-section">
                            <div className="coding__lang-bar">
                              {serverPlatform.data.topLanguages.map((l, lIdx) => {
                                const total = serverPlatform.data.topLanguages.reduce((a, b) => a + b.count, 0);
                                const pct = total > 0 ? (l.count / total) * 100 : 33;
                                return (
                                  <div
                                    key={lIdx}
                                    className="coding__lang-segment"
                                    style={{ width: `${pct}%`, opacity: 1 - lIdx * 0.25 }}
                                    title={`${l.language}: ${l.count} repos`}
                                  />
                                );
                              })}
                            </div>
                            <div className="coding__lang-labels">
                              {serverPlatform.data.topLanguages.map((l, lIdx) => (
                                <span key={lIdx} className="coding__lang-tag">
                                  {l.language} ({l.count})
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Contributions bar if available */}
                        {serverPlatform.data.totalContributions != null && (
                          <div className="coding__contrib-section">
                            <span className="coding__contrib-text">
                              <CountUp end={serverPlatform.data.totalContributions} /> contributions in the last year
                            </span>
                            {serverPlatform.data.recentWeeklyContributions && (
                              <div className="coding__weekly-strip" aria-hidden="true">
                                {(() => {
                                  const weeks = serverPlatform.data.recentWeeklyContributions;
                                  const max = Math.max(...weeks, 1);
                                  return weeks.map((wCount, wIdx) => {
                                    const hPct = Math.max(12, Math.round((wCount / max) * 100));
                                    return (
                                      <div
                                        key={wIdx}
                                        className="coding__weekly-bar"
                                        style={{ height: `${hPct}%`, opacity: wCount > 0 ? 0.9 : 0.2 }}
                                        title={`${wCount} contributions`}
                                      />
                                    );
                                  });
                                })()}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {status !== "loading" && hasServerOk && platform.name === "LeetCode" && (
                      <div className="coding__leetcode-stats">
                        <div className="coding__stat-row">
                          <div className="coding__stat-block">
                            <span className="coding__stat-val">
                              <CountUp end={serverPlatform.data.solved?.all ?? 0} />
                            </span>
                            <span className="coding__stat-lbl">Problems solved</span>
                          </div>
                          {serverPlatform.data.ranking && (
                            <div className="coding__stat-block">
                              <span className="coding__stat-val">
                                ~<CountUp end={serverPlatform.data.ranking} />
                              </span>
                              <span className="coding__stat-lbl">Global rank</span>
                            </div>
                          )}
                        </div>

                        {/* Easy / Medium / Hard Segmented Bar */}
                        {serverPlatform.data.solved && (
                          <div className="coding__difficulty-section">
                            <div className="coding__difficulty-bar">
                              {(() => {
                                const all = serverPlatform.data.solved.all || 1;
                                const easyPct = ((serverPlatform.data.solved.easy || 0) / all) * 100;
                                const medPct = ((serverPlatform.data.solved.medium || 0) / all) * 100;
                                const hardPct = ((serverPlatform.data.solved.hard || 0) / all) * 100;
                                return (
                                  <>
                                    <div className="coding__diff-seg coding__diff-seg--easy" style={{ width: `${easyPct}%` }} />
                                    <div className="coding__diff-seg coding__diff-seg--med" style={{ width: `${medPct}%` }} />
                                    <div className="coding__diff-seg coding__diff-seg--hard" style={{ width: `${hardPct}%` }} />
                                  </>
                                );
                              })()}
                            </div>
                            <div className="coding__difficulty-labels">
                              <span>Easy: {serverPlatform.data.solved.easy ?? 0}</span>
                              <span>Med: {serverPlatform.data.solved.medium ?? 0}</span>
                              <span>Hard: {serverPlatform.data.solved.hard ?? 0}</span>
                            </div>
                          </div>
                        )}

                        {serverPlatform.data.contestRating && (
                          <div className="coding__contest-row">
                            <span className="coding__contest-stat">
                              Contest rating: <strong>{serverPlatform.data.contestRating}</strong>
                            </span>
                            {serverPlatform.data.attendedContests && (
                              <span className="coding__contest-stat">
                                Contests: <strong>{serverPlatform.data.attendedContests}</strong>
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {status !== "loading" && hasServerOk && platform.name === "CodeChef" && (
                      <div className="coding__codechef-stats">
                        <div className="coding__stat-row">
                          {serverPlatform.data.rating && (
                            <div className="coding__stat-block">
                              <span className="coding__stat-val">
                                <CountUp end={serverPlatform.data.rating} />
                              </span>
                              <span className="coding__stat-lbl">Rating {serverPlatform.data.stars ? `(${serverPlatform.data.stars})` : ""}</span>
                            </div>
                          )}
                          {serverPlatform.data.globalRank && (
                            <div className="coding__stat-block">
                              <span className="coding__stat-val">
                                <CountUp end={serverPlatform.data.globalRank} />
                              </span>
                              <span className="coding__stat-lbl">Global rank</span>
                            </div>
                          )}
                        </div>
                        {serverPlatform.data.problemsSolved && (
                          <div className="coding__codechef-problems">
                            <span>Problems solved: {serverPlatform.data.problemsSolved}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Fallback state when server fails or has error */}
                    {status !== "loading" && (!hasServerOk || isServerErr) && (
                      <div className="coding__fallback-msg">
                        {platform.fallback?.stats && platform.fallback.stats.length > 0 ? (
                          <div className="coding__manual-fallback">
                            <div className="coding__stat-row">
                              {platform.fallback.stats.map((st, sIdx) => (
                                <div key={sIdx} className="coding__stat-block">
                                  <span className="coding__stat-val">{st.value}</span>
                                  <span className="coding__stat-lbl">{st.label}</span>
                                </div>
                              ))}
                            </div>
                            {platform.fallback.asOf && (
                              <span className="coding__as-of">Last updated {platform.fallback.asOf}</span>
                            )}
                          </div>
                        ) : (
                          <span className="coding__unavailable">Stats unavailable right now.</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Bottom: handle and real View profile ↗ link */}
                  <div className="coding__card-bottom">
                    {platform.handle && (
                      <span className="coding__handle">@{platform.handle}</span>
                    )}
                    {targetUrl ? (
                      <a
                        href={targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="coding__profile-link cursor-target"
                        data-cursor-label="Open"
                      >
                        <span>View profile</span>
                        <span className="coding__red-arrow" aria-hidden="true">↗</span>
                      </a>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>

          {CODING.language && (
            <p className="coding__footer-note coding__reveal-item">
              {CODING.language}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
