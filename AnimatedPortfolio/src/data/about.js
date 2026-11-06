import { SITE } from "./site.js";

// TODO: edit — rewrite in your own words if needed
export const ABOUT = {
  statement:
    "I'm a backend-focused software engineer and B.Tech student at IIIT Dharwad. I like turning messy requirements into small, well-named services that stay fast and easy to read. Right now I'm building projects around concurrency, real-time messaging and authentication, and looking for a team where I can ship real systems.",

  facts: [
    {
      label: "Studying",
      value: "B.Tech CSE, IIIT Dharwad",
    },
    {
      label: "Focus",
      value: "Backend, System Design",
    },
    {
      label: "Looking for",
      value: "Internships and full-time roles",
    },
  ],

  timeline: [
    {
      period: "Now",
      title: "IIIT Dharwad",
      description: "B.Tech in Computer Science and Engineering",
    },
    {
      period: "Building",
      title: "Backend projects",
      description: "Concurrency, real-time messaging, auth and distributed systems",
    },
    {
      period: "Next",
      title: "Looking for a backend role",
      description: "Ready to contribute to scalable engineering teams",
    },
  ],

  links: [
    {
      label: "Download resume",
      href: SITE.resume,
      download: true,
      arrow: "↓",
    },
    {
      label: "GitHub",
      href: SITE.github,
      external: true,
      arrow: "↗",
    },
    {
      label: "LinkedIn",
      href: SITE.linkedin,
      external: true,
      arrow: "↗",
    },
  ],
};
