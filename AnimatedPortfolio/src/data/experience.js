// TODO: add anything else from the rest of my resume (more experience, hackathons, certifications)

export const EXPERIENCE_META = {
  // TODO: set showAvailability to true only while this is accurate, and update the date
  showAvailability: false,
  availability: "Available from 20 Nov · 25+ hours a week · Remote",
};

export const EXPERIENCE = [
  {
    group: "Experience",
    items: [
      {
        period: "2025 – Present",
        title: "Tech Lead (CIO) & Sole Full-Stack Developer",
        org: "RescrapX — Vehicle Scrapping Auction Marketplace",
        orgUrl: "https://rescrapx.com",
        mode: "Remote",
        summary:
          "Lead engineering for a live auction marketplace where vehicle owners receive bids from authorized scrapping facilities (RVSFs); sole developer owning architecture, backend, frontend, and deployment.",
        highlights: [
          "Designed a microservices backend (API gateway plus auth, user, vehicle, auction, and notification services) on Node.js, Express, and MongoDB, orchestrated with Docker Compose.",
          "Built real-time auction bidding with Socket.io and queue-based notifications with Redis and BullMQ, so bidders get live updates.",
          "Developed Customer, RVSF Partner, and Admin portals with role-based access control and JWT access/refresh tokens; hardened APIs with Helmet, CORS, rate limiting, and input sanitization.",
          "Set up CI/CD with GitHub Actions and deployed containerized services behind Nginx and PM2 on AWS EC2.",
        ],
        tech: [
          "Node.js",
          "Express",
          "MongoDB",
          "Redis",
          "BullMQ",
          "Socket.io",
          "Docker Compose",
          "GitHub Actions",
          "Nginx",
          "PM2",
          "AWS EC2",
        ],
      },
    ],
  },
  {
    group: "Education",
    items: [
      {
        period: "Expected 2028", // TODO: confirm graduation year
        title: "B.Tech, Computer Science and Engineering",
        org: "IIIT Dharwad",
        description: "Data structures and algorithms, OOP, DBMS, operating systems.",
      },
    ],
  },
];
