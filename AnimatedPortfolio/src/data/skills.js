// TODO: remove anything I can't explain in an interview
// TODO: review the descriptions below and edit them in my own words

export const SKILLS = {
  header: {
    title: "Skills",
    sub: "Tools I use",
    note: "Grouped by what I use them for",
  },
  categories: [
    {
      id: "languages",
      name: "Languages",
      items: [
        {
          name: "Java",
          note: "Primary language for backend services, OOP and concurrency.",
          description:
            "A statically typed, object-oriented language that runs on the JVM. Widely used for backend services, with strong support for multithreading and a mature library ecosystem.",
        },
        {
          name: "C++",
          note: "Systems programming, algorithms and problem solving.",
          description:
            "A compiled, high-performance language with fine control over memory. Commonly used for competitive programming, data structures and algorithms, and performance-critical systems.",
        },
        {
          name: "JavaScript",
          note: "Frontend interactivity and full-stack web tooling.",
          description:
            "The language of the web. It runs in the browser for interactivity and on servers through Node.js, and it powers most modern frontend frameworks.",
        },
        {
          name: "SQL",
          note: "Relational queries, schema design, indexes and transactions.",
          description:
            "The standard language for querying relational databases. It covers selecting and joining data, defining schemas, indexing for speed, and running transactions safely.",
        },
      ],
    },
    {
      id: "backend",
      name: "Backend",
      items: [
        {
          name: "Spring Boot",
          note: "Framework for building production-ready REST microservices.",
          description:
            "A Java framework that sets up a Spring application with sensible defaults. It is used to build REST APIs and microservices with built-in support for configuration and security.",
        },
        {
          name: "REST APIs",
          note: "Stateless HTTP service contracts and JSON data exchange.",
          description:
            "An architectural style for web services where resources are exposed over HTTP using standard methods and status codes, usually exchanging JSON between client and server.",
        },
        {
          name: "JWT / Spring Security",
          note: "Authentication, authorization and stateless token validation.",
          description:
            "JWT is a compact signed token used to prove identity without server-side sessions. Spring Security is the Java framework that handles authentication and access control around it.",
        },
        {
          name: "WebSockets",
          note: "Full-duplex real-time client-server communication channels.",
          description:
            "A protocol that keeps a single connection open between client and server so both sides can send messages at any time. Used for chat, live updates and notifications.",
        },
      ],
    },
    {
      id: "data",
      name: "Data",
      items: [
        {
          name: "PostgreSQL",
          note: "Primary relational database for ACID transactional storage.",
          description:
            "An open-source relational database known for reliability, SQL compliance and ACID transactions. It supports indexes, joins and JSON columns for structured application data.",
        },
        {
          name: "MongoDB",
          note: "Document store for flexible and unstructured data models.",
          description:
            "A document database that stores data as flexible JSON-like documents. It suits data whose shape changes over time and scales by spreading data across servers.",
        },
        {
          name: "Redis",
          note: "In-memory store for distributed caching, sessions and locks.",
          description:
            "An in-memory data store with very fast reads and writes. Commonly used for caching, session storage, rate limiting and publish/subscribe messaging.",
        },
      ],
    },
    {
      id: "infra",
      name: "Messaging and infra",
      items: [
        {
          name: "Kafka",
          note: "Distributed event streaming and high-throughput messaging.",
          description:
            "A distributed event-streaming platform that stores messages in ordered logs. Services publish and consume events independently, which helps decouple systems and handle high volumes.",
        },
        {
          name: "Docker",
          note: "Containerization for consistent build and runtime environments.",
          description:
            "A tool that packages an application and its dependencies into a container, so it runs the same way on a laptop, a test server or in production.",
        },
        {
          name: "Kubernetes",
          note: "Container orchestration, workload deployment and scaling.",
          description:
            "An orchestration system that runs and manages containers across many machines. It handles deployment, scaling, restarts and service discovery for containerized applications.",
        },
        {
          name: "AWS",
          note: "Cloud compute, object storage and managed service deployment.",
          description:
            "Amazon's cloud platform, offering virtual servers, storage, managed databases and networking on demand, so applications can be deployed without owning hardware.",
        },
      ],
    },
    {
      id: "frontend",
      name: "Frontend",
      items: [
        {
          name: "React",
          note: "Component-driven user interface development.",
          description:
            "A JavaScript library for building user interfaces from reusable components. It updates only the parts of the page whose data has changed.",
        },
        {
          name: "HTML / CSS",
          note: "Semantic page structuring, accessible layouts and styling.",
          description:
            "HTML gives a page its structure and meaning, and CSS controls layout, color and responsiveness. Together they are the foundation of every website.",
        },
        {
          name: "Vite",
          note: "Fast frontend development server and bundling environment.",
          description:
            "A fast build tool and development server for frontend projects. It starts instantly, reloads changes as you edit, and bundles the app for production.",
        },
      ],
    },
    {
      id: "tools",
      name: "Tools",
      items: [
        {
          name: "Git / GitHub",
          note: "Distributed version control, branching and code collaboration.",
          description:
            "Git tracks every change to a codebase and lets teams branch and merge safely. GitHub hosts repositories and adds pull requests, reviews and automation.",
        },
        {
          name: "Postman",
          note: "API testing, request debugging and environment management.",
          description:
            "An application for building, sending and testing API requests. It is used to inspect responses, save collections of calls and share them with a team.",
        },
        {
          name: "Linux",
          note: "Server operating system, bash scripting and CLI navigation.",
          description:
            "An open-source operating system that runs most servers. Working with it means using the command line, managing files and processes, and writing shell scripts.",
        },
      ],
    },
  ],
};