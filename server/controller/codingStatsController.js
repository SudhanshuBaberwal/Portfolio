import { getCodingStats } from "../lib/codingStats.js";

// Rate limiting: 30 requests per minute per IP
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

export async function getCodingStatsController(req, res) {
  const ip = req.ip || req.headers["x-forwarded-for"] || "unknown";

  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: "Too many requests. Please try again later." });
  }

  try {
    const stats = await getCodingStats(process.env);
    res.setHeader("Cache-Control", "public, max-age=300");
    return res.status(200).json(stats);
  } catch (error) {
    // Return generic error message with no stack trace or upstream leak
    return res.status(500).json({ error: "Failed to retrieve coding stats" });
  }
}
