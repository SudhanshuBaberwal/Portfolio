
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
          note: "My primary language for backend development, OOP and DSA.",
          description:
            "A statically typed, object-oriented programming language that runs on the JVM. I use Java to build backend applications, implement object-oriented concepts, solve DSA problems and develop Spring Boot services.",
        },
        {
          name: "JavaScript",
          note: "Building interactive frontend and full-stack web applications.",
          description:
            "A versatile programming language used for frontend and backend development. I use JavaScript with React, Next.js and Node.js to build interactive user interfaces and full-stack web applications.",
        },
        {
          name: "TypeScript",
          note: "Type-safe development for scalable React and Next.js applications.",
          description:
            "A strongly typed superset of JavaScript that adds static type checking. I use TypeScript to write more maintainable application code, define interfaces and improve reliability in frontend and backend projects.",
        },
        {
          name: "Python",
          note: "Scripting, data processing and AI-related development.",
          description:
            "A high-level programming language used for automation, data processing and AI development. I have worked with Python libraries such as Pandas, BeautifulSoup and Selenium for data analysis and web scraping.",
        },
        {
          name: "SQL",
          note: "Relational database queries and data management.",
          description:
            "A language used to communicate with relational databases. I use SQL to retrieve, insert, update and manage structured data, work with relationships between tables and understand database constraints.",
        },
      ],
    },
    {
      id: "backend",
      name: "Backend",
      items: [
        {
          name: "Spring Boot",
          note: "Building Java REST APIs and modular microservices.",
          description:
            "A Java framework for developing backend applications and RESTful services. I use Spring Boot for building microservices, implementing controllers and services, managing dependencies, integrating databases and developing secure APIs.",
        },
        {
          name: "Node.js / Express.js",
          note: "Building server-side applications and RESTful backend services.",
          description:
            "Node.js provides a JavaScript runtime for server-side development, while Express.js simplifies HTTP routing and middleware management. I use them to build REST APIs, handle requests, implement authentication and connect applications with databases.",
        },
        {
          name: "REST APIs",
          note: "Designing endpoints and handling JSON-based client-server communication.",
          description:
            "An architectural approach for building web services using HTTP methods and status codes. I develop REST APIs with structured request and response formats, validation, error handling and database integration.",
        },
        {
          name: "JWT / Spring Security",
          note: "Implementing authentication, authorization and protected API endpoints.",
          description:
            "JWT provides a signed token-based approach to authentication, while Spring Security handles application security and access control. I have implemented JWT authentication, security filters, protected endpoints and role-based authorization in Spring Boot applications.",
        },
        {
          name: "Microservices Architecture",
          note: "Designing independent services with distributed communication.",
          description:
            "An architectural approach where an application is divided into smaller independent services. I have worked with Spring Boot microservices, API gateways, service discovery, independent databases and asynchronous communication between services.",
        },
        {
          name: "DTO / MVC Architecture",
          note: "Organizing backend applications with structured layers and data transfer objects.",
          description:
            "MVC separates application responsibilities into models, views and controllers, while DTOs define structured objects for transferring data between application layers. I use DTO-based request and response handling to keep backend APIs organized and maintainable.",
        },
      ],
    },
    {
      id: "data",
      name: "Data",
      items: [
        {
          name: "PostgreSQL",
          note: "Relational database management for structured application data.",
          description:
            "An open-source relational database management system that supports SQL, relationships, constraints and transactions. I have used PostgreSQL in backend microservices for storing and managing structured application data.",
        },
        {
          name: "MongoDB",
          note: "NoSQL document database for flexible application data.",
          description:
            "A document-oriented NoSQL database that stores data in flexible BSON documents. I use MongoDB with Spring Boot and Mongoose to design schemas, perform CRUD operations and manage application data.",
        },
        {
          name: "MySQL",
          note: "Relational database queries, tables and schema management.",
          description:
            "A relational database management system used to store structured data in tables. I have worked with SQL queries, table relationships, primary keys, foreign keys and database operations.",
        },
        {
          name: "Redis",
          note: "In-memory data storage and caching for backend applications.",
          description:
            "An in-memory data store commonly used for caching and fast data access. I have explored Redis for backend microservices and retrieval-augmented generation architectures.",
        },
      ],
    },
    {
      id: "infra",
      name: "Messaging and infra",
      items: [
        {
          name: "Kafka",
          note: "Asynchronous event-driven communication between microservices.",
          description:
            "Apache Kafka is a distributed event-streaming platform that enables services to exchange messages through topics. I have used Kafka for event-driven communication between Spring Boot microservices.",
        },
        {
          name: "Docker",
          note: "Containerizing applications and managing development environments.",
          description:
            "A containerization platform that packages applications and their dependencies into portable containers. I have worked with Docker for building, running and managing application containers during backend development.",
        },
        {
          name: "Eureka Service Discovery",
          note: "Service registration and discovery in Spring Boot microservices.",
          description:
            "Netflix Eureka is a service discovery tool used in distributed systems. I have integrated Eureka clients into Spring Boot microservices to enable service registration and discovery between independent services.",
        },
        {
          name: "AWS EC2",
          note: "Cloud-based virtual machine deployment and server management.",
          description:
            "Amazon EC2 provides scalable virtual computing instances in the AWS cloud. I have explored EC2 for hosting backend applications and understanding cloud deployment and server management.",
        },
        {
          name: "Vercel / Render",
          note: "Deploying frontend applications and backend services.",
          description:
            "Vercel and Render are cloud deployment platforms used to host web applications and backend services. I have worked with Vercel for frontend deployment and Render for deploying backend applications.",
        },
      ],
    },
    {
      id: "frontend",
      name: "Frontend",
      items: [
        {
          name: "React",
          note: "Building reusable, component-driven user interfaces.",
          description:
            "A JavaScript library for building interactive user interfaces using reusable components and state management. I use React to develop responsive frontend applications and integrate them with backend REST APIs.",
        },
        {
          name: "Next.js",
          note: "Developing modern full-stack applications with the App Router.",
          description:
            "A React framework that provides routing, server-side rendering and full-stack development capabilities. I use Next.js with TypeScript to build structured web applications, implement authentication and integrate backend services.",
        },
        {
          name: "HTML / CSS / Tailwind CSS",
          note: "Creating responsive layouts and modern user interfaces.",
          description:
            "HTML provides page structure, CSS handles styling and layouts, and Tailwind CSS offers utility-first styling. I use these technologies to build responsive interfaces, reusable UI components and modern website designs.",
        },
        {
          name: "Vite",
          note: "Fast frontend development and production build tooling.",
          description:
            "A modern frontend build tool that provides a fast development server and optimized production builds. I have used Vite to set up and develop React applications.",
        },
        {
          name: "GSAP / Framer Motion",
          note: "Creating interactive animations and smooth user experiences.",
          description:
            "GSAP and Framer Motion are animation libraries for web applications. I use them to create scroll-triggered animations, interactive transitions, motion effects and engaging portfolio experiences.",
        },
        {
          name: "Three.js / React Three Fiber",
          note: "Building interactive 3D scenes and immersive web experiences.",
          description:
            "Three.js is a JavaScript 3D graphics library, while React Three Fiber provides a React-based approach to working with Three.js. I have used them to create procedural 3D scenes, camera animations and immersive portfolio experiences.",
        },
      ],
    },
    {
      id: "tools",
      name: "Tools",
      items: [
        {
          name: "Git / GitHub",
          note: "Version control, branching and collaborative development.",
          description:
            "Git is a distributed version control system used to track code changes, manage branches and merge updates. GitHub provides remote repositories and collaboration features for managing development projects.",
        },
        {
          name: "Postman",
          note: "Testing REST APIs and debugging backend requests.",
          description:
            "An API development and testing platform used to send HTTP requests, inspect responses and debug backend services. I use Postman to test endpoints, validate API responses and troubleshoot application issues.",
        },
        {
          name: "Linux / Fedora",
          note: "Working with Linux environments, terminal commands and development tools.",
          description:
            "Linux is an open-source operating system widely used in software development and server environments. I work with Fedora Linux, use terminal commands, manage development environments and configure my Hyprland desktop.",
        },
        {
          name: "IntelliJ IDEA / VS Code",
          note: "Development environments for Java, frontend and backend projects.",
          description:
            "IntelliJ IDEA and Visual Studio Code are development environments used for writing, debugging and managing code. I use them for Java Spring Boot development, React, Next.js and other full-stack projects.",
        },
      ],
    },
  ],
};
