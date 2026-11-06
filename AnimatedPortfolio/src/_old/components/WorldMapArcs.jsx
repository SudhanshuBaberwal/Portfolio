import React from 'react';

// Coordinates scaled to SVG 1000 x 500
// Bengaluru (Hub) -> San Francisco, London, Tokyo, New York
const CITIES = {
  bengaluru: { x: 690, y: 310, name: 'BENGALURU' },
  sanFrancisco: { x: 190, y: 195, name: 'SAN FRANCISCO' },
  newYork: { x: 290, y: 190, name: 'NEW YORK' },
  london: { x: 490, y: 160, name: 'LONDON' },
  tokyo: { x: 860, y: 200, name: 'TOKYO' },
};

// Generate great-arc SVG bezier quadratic curve
const createArcPath = (from, to, curvature = -60) => {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2 + curvature;
  return `M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`;
};

const ARCS = [
  { id: 'sf', path: createArcPath(CITIES.bengaluru, CITIES.sanFrancisco, -140), dur: '3.6s' },
  { id: 'ny', path: createArcPath(CITIES.bengaluru, CITIES.newYork, -120), dur: '3.2s' },
  { id: 'ldn', path: createArcPath(CITIES.bengaluru, CITIES.london, -90), dur: '2.8s' },
  { id: 'tky', path: createArcPath(CITIES.bengaluru, CITIES.tokyo, -70), dur: '2.4s' },
];

// World map stylized dot matrix
const generateMapDots = () => {
  const dots = [];
  // Continent bounding cluster heuristics
  const clusters = [
    // North America
    { minX: 130, maxX: 320, minY: 110, maxY: 260, density: 0.5 },
    // South America
    { minX: 280, maxX: 380, minY: 280, maxY: 440, density: 0.45 },
    // Europe
    { minX: 460, maxX: 580, minY: 110, maxY: 220, density: 0.55 },
    // Africa
    { minX: 470, maxX: 600, minY: 220, maxY: 400, density: 0.45 },
    // Asia
    { minX: 600, maxX: 880, minY: 110, maxY: 330, density: 0.52 },
    // Australia
    { minX: 800, maxX: 920, minY: 340, maxY: 450, density: 0.45 },
  ];

  clusters.forEach((c, cIdx) => {
    for (let x = c.minX; x <= c.maxX; x += 16) {
      for (let y = c.minY; y <= c.maxY; y += 16) {
        if (Math.sin(x * 0.05) * Math.cos(y * 0.05) > 0.1) {
          dots.push({ x: x + (Math.random() - 0.5) * 4, y: y + (Math.random() - 0.5) * 4, key: `${cIdx}-${x}-${y}` });
        }
      }
    }
  });

  return dots;
};

const DOTS = generateMapDots();

const WorldMapArcs = () => {
  return (
    <div className="world-map-wrap" aria-hidden="true">
      <svg
        viewBox="0 0 1000 500"
        className="world-map-svg"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Ambient Grid Lines */}
        <line x1="50" y1="250" x2="950" y2="250" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
        <line x1="500" y1="50" x2="500" y2="450" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />

        {/* Landmass Dots */}
        {DOTS.map((dot) => (
          <circle
            key={dot.key}
            cx={dot.x}
            cy={dot.y}
            r="1.8"
            fill="rgba(255, 255, 255, 0.12)"
          />
        ))}

        {/* Global Connection Arcs */}
        {ARCS.map((arc) => (
          <g key={arc.id}>
            {/* Background Arc path */}
            <path
              d={arc.path}
              fill="none"
              stroke="rgba(255, 255, 255, 0.16)"
              strokeWidth="1.2"
              strokeDasharray="4 3"
            />
            {/* Glowing Traveling Packet */}
            <circle r="2.8" fill="#ffffff" filter="drop-shadow(0 0 5px #ffffff)">
              <animateMotion
                path={arc.path}
                dur={arc.dur}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}

        {/* City Markers */}
        {Object.entries(CITIES).map(([key, city]) => {
          const isHub = key === 'bengaluru';
          return (
            <g key={key}>
              {isHub && (
                <circle
                  cx={city.x}
                  cy={city.y}
                  r="8"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.4)"
                  strokeWidth="1"
                >
                  <animate
                    attributeName="r"
                    values="4;14;4"
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.8;0;0.8"
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
              <circle
                cx={city.x}
                cy={city.y}
                r={isHub ? 3.5 : 2.5}
                fill="#ffffff"
                filter="drop-shadow(0 0 6px #ffffff)"
              />
              <text
                x={city.x}
                y={city.y - 8}
                fill="rgba(255, 255, 255, 0.7)"
                fontSize="11"
                fontFamily="JetBrains Mono, monospace"
                textAnchor="middle"
                letterSpacing="0.1em"
              >
                {city.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default WorldMapArcs;

