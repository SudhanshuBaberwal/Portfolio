import React from 'react';
import { PRINCIPLES } from '../../data/principles';
import './Principles.css';

const Principles = () => {
  return (
    <section className="limes">
      <div className="w">
        <h2>Principles, not adjectives.</h2>
        <div className="g4">
          {PRINCIPLES.map((item, idx) => (
            <div key={idx}>
              <b>{item.title}</b>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Principles;

