import React, { useEffect, useRef } from 'react';
import './About.css';

const ABOUT_TEXT =
  "I build backend systems that stay fast under load and easy to read for the next person. I like turning messy requirements into small, well-named services, and I keep learning in public.";

const About = () => {
  const bigRef = useRef(null);

  useEffect(() => {
    const el = bigRef.current;
    if (!el) return;

    const spans = el.querySelectorAll('span');

    const handleScroll = () => {
      const r = el.getBoundingClientRect();
      const pr = Math.min(
        1,
        Math.max(
          0,
          (window.innerHeight * 0.85 - r.top) / (r.height + window.innerHeight * 0.3)
        )
      );
      spans.forEach((s, i) => {
        s.classList.toggle('on', i / spans.length < pr);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const words = ABOUT_TEXT.split(' ');

  return (
    <section id="about">
      <div className="w">
        <span className="mono">About</span>
        <p className="big" ref={bigRef} style={{ marginTop: '14px' }}>
          {words.map((word, i) => {
            const isLime = /scale|fast|readable/.test(word);
            return (
              <React.Fragment key={i}>
                <span className={isLime ? 'k' : ''}>{word}</span>
                {i < words.length - 1 && ' '}
              </React.Fragment>
            );
          })}
        </p>

        <div className="facts">
          <div>
            <span className="mono">Studying</span>
            <b>B.Tech CSE, IIIT Dharwad</b>
          </div>
          <div>
            <span className="mono">Core</span>
            <b>Java / Spring</b>
          </div>
          <div>
            <span className="mono">Interests</span>
            <b>System design, AI apps</b>
          </div>
          <div>
            <span className="mono">Based in</span>
            <b>India</b>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

