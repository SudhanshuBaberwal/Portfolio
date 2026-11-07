// Summary data
import { PROJECTS } from "./projects.js";

export const SUMMARY = {
  sectionLabel: "Summary / In short",
  headline: "Backend engineer, ready to ship.",
  recap: [
    {
      title: "What I do",
      body: "Design, build and optimize server-side systems — distributed state, transactional workflows, and real-time messaging.",
    },
    {
      title: "What I've built",
      body: `${PROJECTS.length} backend projects, from messaging to authentication. Production-ready patterns with Spring, Redis and PostgreSQL.`,
    },
    {
      title: "What I'm looking for",
      body: "Summer 2025 backend internships and 2026 full-time engineering roles. Ready to contribute from day one.", // TODO: verify availability dates
    },
  ],
  links: [
    { label: "Resume", href: "/resume.pdf", external: true }, // TODO: verify resume path
    { label: "Selected Projects", href: "#projects", external: false },
    { label: "Get in touch", href: "#contact", external: false },
  ],
};
