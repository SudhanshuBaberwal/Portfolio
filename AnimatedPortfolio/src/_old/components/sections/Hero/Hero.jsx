import React from 'react';
import { SITE_CONFIG } from '../../data/site';
import heroPortrait from '../../assets/hero-portrait.webp';
import './Hero.css';

const Hero = () => {
  return (
    <header className="hero">
      <div>
        <span className="mono lime">{SITE_CONFIG.roleTagline}</span>
        <h1>
          Backend engineer building systems that <span className="lime">scale.</span>
        </h1>
        <p className="l">{SITE_CONFIG.tagline}</p>
        <div className="hero-actions">
          <a className="btn p" href="#work">
            See my work
          </a>{' '}
          <a
            className="btn"
            href={SITE_CONFIG.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
        <div className="stats">
          {SITE_CONFIG.stats.map((stat, idx) => (
            <div key={idx}>
              <b>{stat.value}</b>
              <span className="mono">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="ph"
        role="img"
        aria-label="Portrait of Sudhanshu"
        style={{ backgroundImage: `url(${heroPortrait})` }}
      >
        <div className="code">
          POST /api/bookings
          <br />
          <span className="lime">201 Created</span> · idempotent
        </div>
      </div>
    </header>
  );
};

export default Hero;

