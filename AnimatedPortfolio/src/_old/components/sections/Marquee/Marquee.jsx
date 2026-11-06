import React from 'react';
import { MARQUEE_ITEMS } from '../../data/marquee';
import './Marquee.css';

const Marquee = () => {
  // Duplicated list for infinite seamless scroll loop
  const duplicatedItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="mq" aria-hidden="true">
      <div>
        {duplicatedItems.map((item, idx) => (
          <span key={idx}>{item}</span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;

