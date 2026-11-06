import React from 'react';
import { SITE_CONFIG } from '../../data/site';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <div className="w">
        <a className="logo" href="#top">
          {SITE_CONFIG.shortName}
          <i aria-hidden="true" />
        </a>

        <ul>
          {SITE_CONFIG.navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>

        <span className="pill">
          <span className="dot" aria-hidden="true" />
          {SITE_CONFIG.availabilityText}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;

