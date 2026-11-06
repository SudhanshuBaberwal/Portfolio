import React from 'react';
import { PROJECTS } from '../../data/projects';
import './Work.css';

const Work = () => {
  return (
    <section id="work">
      <div className="w">
        <span className="mono">Selected work</span>
        <h2>Projects built around the hard parts.</h2>

        <div className="stackc">
          {PROJECTS.map((p, i) => (
            <article className="card" key={p.id}>
              <div className="t">
                <span className="mono">
                  Project {i + 1} of {PROJECTS.length}
                </span>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                {p.result && <p className="mono lime">{p.result}</p>}
                <div className="chips">
                  {p.tech.map((x, idx) => (
                    <span key={idx}>{x}</span>
                  ))}
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-chip"
                    >
                      GitHub ↗
                    </a>
                  )}
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-chip"
                    >
                      Live ↗
                    </a>
                  )}
                </div>
              </div>
              <div className="art" aria-hidden="true">
                {i + 1}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;

