#!/usr/bin/env node
/**
 * server/scripts/check-stats.mjs
 * Quick sanity check for the coding-stats aggregate.
 * Run with: node server/scripts/check-stats.mjs
 */
import { getCodingStats } from "../lib/codingStats.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "../.env") });

console.log("Fetching coding stats...\n");
const t0 = Date.now();

getCodingStats(process.env, { debug: true })
  .then((stats) => {
    const elapsed = Date.now() - t0;
    const platforms = ["github", "leetcode", "codechef", "codeforces"];
    console.log(`=== Coding Stats Summary (${elapsed}ms total) ===\n`);
    for (const p of platforms) {
      const s = stats[p];
      if (!s) { console.log(`${p}: NOT FOUND`); continue; }
      const di = stats.debugInfo?.[p];
      let line = `${p.toUpperCase().padEnd(12)} status=${s.status}`;
      if (s.errorCode) line += `  errorCode=${s.errorCode}`;
      if (di?.durationMs != null) line += `  ${di.durationMs}ms`;
      if (s.status === "ok" && s.data) {
        const d = s.data;
        if (p === "leetcode") line += `  solved=${d.solved?.all}  ranking=${d.ranking}  badges=${d.badgesCount}`;
        if (p === "github") line += `  repos=${d.publicRepos}  followers=${d.followers}  stars=${d.totalStars}`;
        if (p === "codechef") line += `  rating=${d.currentRating}  stars=${d.stars}  globalRank=${d.globalRank}`;
        if (p === "codeforces") line += `  rating=${d.rating}  rank=${d.rank}  contests=${d.contests}`;
      }
      console.log(line);
    }
    console.log(`\nupdatedAt: ${stats.updatedAt}`);
    if (stats.stale) console.log("⚠ STALE (served from cache)");
  })
  .catch((err) => {
    console.error("check-stats failed:", err.message);
    process.exit(1);
  });
