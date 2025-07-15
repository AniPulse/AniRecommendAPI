import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const dataDir = path.join(process.cwd(), "data");

    const files = fs.readdirSync(dataDir).filter(file =>
      file.startsWith("anime") && file.endsWith(".json")
    );

    let animeList = [];

    for (const file of files) {
      const filePath = path.join(dataDir, file);
      try {
        const raw = fs.readFileSync(filePath, "utf8");
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          animeList.push(...parsed);
        }
      } catch (e) {
        console.warn(`⚠️ Skipping invalid JSON in ${file}`);
      }
    }

    if (!Array.isArray(animeList)) {
      throw new Error("🔎 Merged anime data should be an array");
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

      // Season
      const s = (anime.season || "UNKNOWN").toUpperCase();
      seasons[s] = (seasons[s] || 0) + 1;

      // Year
      const y = anime.seasonYear || "UNKNOWN";
      years[y] = (years[y] || 0) + 1;

      // Adult
      adult[anime.isAdult ? "true" : "false"]++;

      // Source
      const src = (anime.source || "UNKNOWN").toUpperCase();
      sources[src] = (sources[src] || 0) + 1;
    });

    res.status(200).json({
      total,
      formats,
      genres,
      seasons,
      years,
      adult,
      sources,
      creator: "Shinei Nouzen",
      github: "https://github.com/Shineii86",
      telegram: "https://telegram.me/Shineii86",
      message: "Build with ❤️ by Shinei Nouzen",
      timestamp: new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: true
      })
    });

  } catch (err) {
    console.error("❌ Stats error:", err.message);
    res.status(500).json({ error: "🚨 Failed to generate statistics" });
  }
}
