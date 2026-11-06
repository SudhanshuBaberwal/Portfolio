import React from 'react';
import { SERVICES } from '../../data/services';
import './Services.css';

const Services = () => {
  return (
    <section id="build">
      <div className="w">
        <span className="mono">What I build</span>
        <h2>Four ways to put me to work.</h2>
        {SERVICES.map((svc, idx) => (
          <div className="svc" key={idx}>
            <h3>{svc.title}</h3>
            <p>{svc.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;

