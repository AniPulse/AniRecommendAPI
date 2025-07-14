// /api/v4/filter.js

import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const {
      season,
      year,
      score,
      adult,
      source,
      format,
      genre,
    } = req.query;

    const filePath = path.join(process.cwd(), "data", "anime.json");
    const raw = fs.readFileSync(filePath, "utf8");
    const animeList = JSON.parse(raw);

    let filtered = animeList;

    // Apply filters
    if (season) {
      filtered = filtered.filter(a =>
        (a.season || "").toUpperCase() === season.toUpperCase()
      );
    }

    if (year) {
      filtered = filtered.filter(a =>
        String(a.seasonYear || "").toLowerCase() === String(year).toLowerCase()
      );
    }

    if (score) {
      const minScore = parseInt(score);
      if (!isNaN(minScore)) {
        filtered = filtered.filter(a => (a.score || 0) >= minScore);
      }
    }

    if (adult !== undefined) {
      const isAdult = adult === "true";
      filtered = filtered.filter(a => a.isAdult === isAdult);
    }

    if (source) {
      filtered = filtered.filter(a =>
        (a.source || "").toUpperCase() === source.toUpperCase()
      );
    }

    if (format) {
      filtered = filtered.filter(a =>
        (a.format || "").toUpperCase() === format.toUpperCase()
      );
    }

    if (genre) {
      filtered = filtered.filter(a =>
        (a.genres || []).some(g => g.toLowerCase() === genre.toLowerCase())
      );
    }

    if (filtered.length === 0) {
      return res.status(404).json({ error: "No anime matched your filters." });
    }

    // Return a random one or the full list
    const random = filtered[Math.floor(Math.random() * filtered.length)];

    res.status(200).json({
      ...random,
      creator: "Shinei Nouzen",
      github: "https://github.com/Shineii86",
      telegram: "https://telegran.me/Shineii86",
      message: "Build with ❤️ by Shinei Nouzen",
      timestamp: new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: true
      })
    });

  } catch (err) {
    console.error("❌ /api/v4/filter error:", err.message);
    res.status(500).json({ error: "🚨 Failed to apply filters" });
  }
}
