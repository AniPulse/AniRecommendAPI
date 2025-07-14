import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "data", "anime.json");
    const raw = fs.readFileSync(filePath, "utf8");
    const animeList = JSON.parse(raw);

    if (!Array.isArray(animeList)) {
      throw new Error("🔎 anime.json Should Be A Flat Array");
    }

    const total = animeList.length;

    const formats = {};
    const genres = {};
    const seasons = {};
    const years = {};
    const adult = { true: 0, false: 0 };
    const sources = {};

    animeList.forEach((anime) => {
      // Format
      const fmt = (anime.format || anime.type || "UNKNOWN").toUpperCase();
      formats[fmt] = (formats[fmt] || 0) + 1;

      // Genres
      (anime.genres || []).forEach((g) => {
        genres[g] = (genres[g] || 0) + 1;
      });

      // Seasons
      const s = (anime.season || "UNKNOWN").toUpperCase();
      seasons[s] = (seasons[s] || 0) + 1;

      // Years
      const y = anime.seasonYear || "UNKNOWN";
      years[y] = (years[y] || 0) + 1;

      // Adult
      adult[anime.isAdult ? "true" : "false"]++;

      // Source
      const src = (anime.source || "UNKNOWN").toUpperCase();
      sources[src] = (sources[src] || 0) + 1;
    });

    // Add metadata headers
    res.setHeader("X-Creator", "Shinei Nouzen");
    res.setHeader("X-GitHub", "https://github.com/Shineii86");
    res.setHeader("X-Telegram", "https://telegram.me/Shineii86");
    res.setHeader("X-Timestamp", new Date().toISOString());

    // Respond with full stats object
    res.status(200).json({
      total,
      formats,
      genres,
      seasons,
      years,
      adult,
      sources
    });
  } catch (err) {
    console.error("❌ Stats error:", err.message);
    res.status(500).json({ error: "🚨 Failed To Generate Statistics" });
  }
}
