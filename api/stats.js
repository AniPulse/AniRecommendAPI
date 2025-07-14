import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "data", "anime.json");
    const raw = fs.readFileSync(filePath, "utf8");
    const animeList = JSON.parse(raw);

    if (!Array.isArray(animeList)) {
      throw new Error("anime.json should be a flat array");
    }

    let total = animeList.length;
    const formats = {};
    const genres = {};

    animeList.forEach(anime => {
      // count formats
      const fmt = (anime.format || anime.type || "UNKNOWN").toUpperCase();
      formats[fmt] = (formats[fmt] || 0) + 1;

      // count genres
      (anime.genres || []).forEach(g => {
        genres[g] = (genres[g] || 0) + 1;
      });
    });

    res.setHeader("X-Creator", "Shinei Nouzen");
    res.setHeader("X-GitHub", "https://github.com/Shineii86");
    res.setHeader("X-Telegram", "https://telegram.me/Shineii86");
    res.setHeader("X-Timestamp", new Date().toISOString());

    res.status(200).json({ total, formats, genres });
  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ error: "Failed to generate statistics" });
  }
}
