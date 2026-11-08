import fetch from "node-fetch";
import * as cheerio from "cheerio"; // Important: imports cheerio for HTML parsing

// 1-hour in-memory cache, serve stale up to 24 hours
let codechefCache = {
  data: null,
  cachedAt: 0,
};

const ONE_HOUR = 60 * 60 * 1000;
const TWENTY_FOUR_HOURS = 24 * ONE_HOUR;

export const fetchCodeChefStats = async (username) => {
  const now = Date.now();
  if (codechefCache.data && now - codechefCache.cachedAt < ONE_HOUR) {
    return {
      status: "ok",
      handle: username,
      profileUrl: `https://www.codechef.com/users/${username}`,
      data: codechefCache.data,
    };
  }

  try {
    // Fetch directly from the CodeChef website, masquerading as a normal web browser
    const response = await fetch(`https://www.codechef.com/users/${username}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      timeout: 12000,
    });

    if (!response.ok) {
      throw new Error(`CodeChef page returned status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Scrape the elements directly from the HTML structure
    const currentRating = $(".rating-number").text().trim();

    if (!currentRating) {
      throw new Error("Could not find rating. Username might be invalid.");
    }

    // Extract Highest Rating using Regex from the header text
    const headerText = $(".rating-header").text() || "";
    const highestRatingMatch = headerText.match(/Highest Rating\s+(\d+)/);
    const highestRating = highestRatingMatch
      ? highestRatingMatch[1]
      : currentRating;

    // Extract stars (e.g., "1★")
    const stars = $(".rating-star").first().text().trim() || "1★";

    // Global and Country Ranks
    const globalRank =
      $(".rating-ranks ul li:nth-child(1) a strong").text().trim() || "Inactive";
    const countryRank =
      $(".rating-ranks ul li:nth-child(2) a strong").text().trim() || "Inactive";

    const parsedData = {
      currentRating: parseInt(currentRating, 10),
      highestRating: parseInt(highestRating, 10),
      stars,
      globalRank,
      countryRank,
    };

    codechefCache.data = parsedData;
    codechefCache.cachedAt = now;

    return {
      status: "ok",
      handle: username,
      profileUrl: `https://www.codechef.com/users/${username}`,
      data: parsedData,
    };
  } catch (error) {
    console.error("CodeChef Service Error:", error.message);
    // Serve stale cache if available
    if (codechefCache.data && now - codechefCache.cachedAt < TWENTY_FOUR_HOURS) {
      console.log("[CodeChef] Serving stale cache from", new Date(codechefCache.cachedAt).toISOString());
      return {
        status: "ok",
        handle: username,
        profileUrl: `https://www.codechef.com/users/${username}`,
        data: codechefCache.data,
      };
    }
    return { status: "error", handle: username, error: error.message };
  }
};

export const getCodeChefData = async (req, res) => {
  try {
    const username = "aided_care_69";
    const result = await fetchCodeChefStats(username);

    if (result.status === "error") {
      return res
        .status(502)
        .json({ success: false, message: "Failed to fetch CodeChef data" });
    }

    return res.status(200).json({ success: true, data: result.data });
  } catch (error) {
    console.error("CodeChef Controller Error:", error);
    return res.status(502).json({ success: false, message: "Internal Server Error" });
  }
};