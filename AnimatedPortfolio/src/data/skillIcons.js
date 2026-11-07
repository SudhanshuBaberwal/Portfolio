import {
  siOpenjdk,
  siCplusplus,
  siJavascript,
  siSpringboot,
  siJsonwebtokens,
  siPostgresql,
  siMongodb,
  siRedis,
  siApachekafka,
  siDocker,
  siKubernetes,
  siReact,
  siHtml5,
  siCss,
  siVite,
  siGit,
  siGithub,
  siPostman,
  siLinux,
  siLeetcode,
  siCodechef,
} from "simple-icons";

// Map each skill name to an icon object { title, hex, path }
// For items without an official icon in simple-icons (SQL, REST APIs, WebSockets, AWS),
// monogram is provided with fallback initials.
export const SKILL_ICONS = {
  Java: {
    title: "Java",
    hex: siOpenjdk.hex,
    path: siOpenjdk.path,
  },
  "C++": {
    title: "C++",
    hex: siCplusplus.hex,
    path: siCplusplus.path,
  },
  JavaScript: {
    title: "JavaScript",
    hex: siJavascript.hex,
    path: siJavascript.path,
  },
  SQL: {
    title: "SQL",
    monogram: "SQL",
    hex: "4479A1",
  },
  "Spring Boot": {
    title: "Spring Boot",
    hex: siSpringboot.hex,
    path: siSpringboot.path,
  },
  "REST APIs": {
    title: "REST APIs",
    monogram: "API",
    hex: "009688",
  },
  "JWT / Spring Security": {
    title: "JWT",
    hex: siJsonwebtokens.hex,
    path: siJsonwebtokens.path,
  },
  WebSockets: {
    title: "WebSockets",
    monogram: "WS",
    hex: "010101",
  },
  PostgreSQL: {
    title: "PostgreSQL",
    hex: siPostgresql.hex,
    path: siPostgresql.path,
  },
  MongoDB: {
    title: "MongoDB",
    hex: siMongodb.hex,
    path: siMongodb.path,
  },
  Redis: {
    title: "Redis",
    hex: siRedis.hex,
    path: siRedis.path,
  },
  Kafka: {
    title: "Apache Kafka",
    hex: siApachekafka.hex,
    path: siApachekafka.path,
  },
  Docker: {
    title: "Docker",
    hex: siDocker.hex,
    path: siDocker.path,
  },
  Kubernetes: {
    title: "Kubernetes",
    hex: siKubernetes.hex,
    path: siKubernetes.path,
  },
  AWS: {
    title: "AWS",
    monogram: "AWS",
    hex: "FF9900",
  },
  React: {
    title: "React",
    hex: siReact.hex,
    path: siReact.path,
  },
  "HTML / CSS": {
    title: "HTML / CSS",
    hex: siHtml5.hex,
    path: siHtml5.path,
  },
  Vite: {
    title: "Vite",
    hex: siVite.hex,
    path: siVite.path,
  },
  "Git / GitHub": {
    title: "Git",
    hex: siGit.hex,
    path: siGit.path,
  },
  Postman: {
    title: "Postman",
    hex: siPostman.hex,
    path: siPostman.path,
  },
  Linux: {
    title: "Linux",
    hex: siLinux.hex,
    path: siLinux.path,
  },
  GitHub: {
    title: "GitHub",
    hex: siGithub.hex,
    path: siGithub.path,
  },
  LeetCode: {
    title: "LeetCode",
    hex: siLeetcode.hex,
    path: siLeetcode.path,
  },
  CodeChef: {
    title: "CodeChef",
    hex: siCodechef.hex,
    path: siCodechef.path,
  },
};
