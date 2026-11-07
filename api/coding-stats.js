import { getCodingStats } from "../server/lib/codingStats.js";

// Rate limiting in-memory store for serverless instance
const ipRequests = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 30;

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = ipRequests.get(ip) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW };

  if (now > entry.resetAt) {
    entry.count = 1;
    entry.resetAt = now + RATE_LIMIT_WINDOW;
    ipRequests.set(ip, entry);
    return true;
  }

  if (entry.count >= MAX_REQUESTS) {
    return false;
  }

  entry.count++;
  ipRequests.set(ip, entry);
  return true;
}

export default async function handler(req, res) {
  // CORS check
  const origin = req.headers.origin;
  const allowedOrigin = process.env.ALLOWED_ORIGIN;
  const isDev = process.env.NODE_ENV !== "production";

  let permitOrigin = false;
  if (!origin) {
    permitOrigin = true;
  } else if (origin === allowedOrigin) {
    permitOrigin = true;
  } else if (isDev && (/^http:\/\/localhost:\d+$/.test(origin) || /^http:\/\/127\.0\.0\.1:\d+$/.test(origin))) {
    permitOrigin = true;
  } else if (origin === "https://animatedportfolio-new.vercel.app") {
    permitOrigin = true;
  }

  if (permitOrigin && origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ip = req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown";
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: "Too many requests. Please try again later." });
  }

  try {
    const stats = await getCodingStats(process.env);
    res.setHeader("Cache-Control", "public, max-age=300");
    return res.status(200).json(stats);
  } catch {
    return res.status(500).json({ error: "Failed to retrieve coding stats" });
  }
}
