// Projects data for Projects section and All Projects page

export const PROJECTS = [
  {
    id: "01",
    featured: true,
    title: "Distributed Car Rental Platform",
    year: "2024", // TODO: verify project year
    tags: ["Java", "Spring", "PostgreSQL", "Redis"],
    tech: ["Java 17", "Spring Boot", "PostgreSQL", "Redis", "Distributed Locking", "REST APIs"], // TODO: verify full tech stack
    problem:
      "Preventing double-booking and inventory inconsistencies when multiple concurrent users attempt to reserve the same vehicle simultaneously during peak demand.", // TODO: verify problem statement
    built: [
      "Designed distributed concurrency control using Redis locks to eliminate race conditions on car inventory.", // TODO: verify implementation details
      "Implemented transactional reservation workflows backed by PostgreSQL with ACID compliance.",
      "Developed stateless REST APIs for vehicle catalog browsing, pricing calculation, and booking lifecycle management.",
    ],
    image: "/public/951a996c-3aff-4101-8138-ba1400a59248 (1).png", // TODO: verify screenshot asset
    github: "https://github.com/SudhanshuBaberwal/Car-Rental-Project",
    live: "", // TODO: verify if live deployment exists
    result: "", // Left intentionally empty
  },
  {
    id: "02",
    featured: true,
    title: "Chatify",
    year: "2024", // TODO: verify project year
    tags: ["WebSockets", "Redis Pub/Sub", "Spring"],
    tech: ["Java", "Spring Boot", "STOMP / WebSockets", "Redis Pub/Sub", "Spring Security"], // TODO: verify full tech stack
    problem:
      "Delivering real-time messages reliably across horizontally scaled backend nodes without duplicate delivery or dropped connections.", // TODO: verify problem statement
    built: [
      "Engineered a WebSocket communication layer using STOMP protocol for low-latency bidirectional messaging.", // TODO: verify implementation details
      "Integrated Redis Pub/Sub message broker to synchronize chat rooms across multiple running application instances.",
      "Implemented secure connection handshakes, user authentication, and message persistence schemas.",
    ],
    image: "/public/chatify.jpg", // TODO: verify screenshot asset
    github: "https://github.com/SudhanshuBaberwal/Chatify",
    live: "", // TODO: verify if live deployment exists
    result: "", // Left intentionally empty
  },
  {
    id: "03",
    featured: true,
    title: "Identity & Auth Engine",
    year: "2024", // TODO: verify project year
    tags: ["JWT", "Redis", "Spring Security"],
    tech: ["Java", "Spring Security", "JWT (JSON Web Tokens)", "Redis", "TypeScript / Next.js"], // TODO: verify full tech stack
    problem:
      "Providing a centralized, reusable authentication and session service with stateless token verification and immediate session revocation.", // TODO: verify problem statement
    built: [
      "Built asymmetric JWT issuance and verification pipeline ensuring decoupled verification across dependent services.", // TODO: verify implementation details
      "Utilized Redis as a token blocklist and active session store to enable instantaneous token revocation and logout.",
      "Configured role-based access control (RBAC), refresh token rotation, and secure HTTP-only cookie handling.",
    ],
    image: "/public/auth-engine.jpg", // TODO: verify screenshot asset
    github: "https://github.com/SudhanshuBaberwal/Auth-with_TSandNext",
    live: "", // TODO: verify if live deployment exists
    result: "", // Left intentionally empty
  },
  {
    id: "04",
    featured: false,
    title: "IIIT-DWD Timetable Optimizer",
    year: "2024", // TODO: verify project year
    tags: ["Algorithms", "Java"],
    tech: ["Java", "Constraint Satisfaction", "Backtracking / Heuristics", "Data Structures"], // TODO: verify full tech stack
    problem:
      "Generating conflict-free academic timetables across multiple batches, faculty members, and limited classrooms while satisfying institutional constraints.", // TODO: verify problem statement
    built: [
      "Formulated schedule allocation as a constraint satisfaction problem with hard constraints (no room or instructor clashes) and soft preferences.", // TODO: verify implementation details
      "Developed an algorithmic backtracking engine with heuristic pruning to resolve dense schedule conflicts efficiently.",
      "Structured data models for courses, student batches, faculty availability slots, and lecture hall capacities.",
    ],
    image: "/projects/timetable.jpg", // TODO: verify screenshot asset
    github: "https://github.com/SudhanshuBaberwal/Automated-Time-Table-IIIT-DWD",
    live: "", // TODO: verify if live deployment exists
    result: "", // Left intentionally empty
  },
];
