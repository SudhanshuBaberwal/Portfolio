import fetch from "node-fetch";
import * as cheerio from "cheerio"; // Important: imports cheerio for HTML parsing

export const fetchCodeChefStats = async (username) => {
  try {
    // Fetch directly from the CodeChef website, masquerading as a normal web browser
    const response = await fetch(`https://www.codechef.com/users/${username}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9"
      }
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
    const highestRating = highestRatingMatch ? highestRatingMatch[1] : currentRating;
    
    // Extract stars (e.g., "1★")
    const stars = $(".rating-star").first().text().trim() || "1★";

    // Global and Country Ranks
    const globalRank = $(".rating-ranks ul li:nth-child(1) a strong").text().trim() || "Inactive";
    const countryRank = $(".rating-ranks ul li:nth-child(2) a strong").text().trim() || "Inactive";

    return {
      status: "ok",
      handle: username,
      profileUrl: `https://www.codechef.com/users/${username}`,
      data: {
        currentRating: parseInt(currentRating, 10),
        highestRating: parseInt(highestRating, 10),
        stars,
        globalRank,
        countryRank
      }
    };
  } catch (error) {
    console.error("CodeChef Service Error:", error.message);
    return { status: "error", handle: username, error: error.message };
  }
};

export const getCodeChefData = async (req, res) => {
  try {
    const username = "aided_care_69"; 
    const result = await fetchCodeChefStats(username);
    
    if (result.status === "error") {
      return res.status(500).json({ success: false, message: "Failed to fetch CodeChef data" });
    }
    
    return res.status(200).json({ success: true, data: result.data });
  } catch (error) {
    console.error("CodeChef Controller Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};