import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const query = req.query;

    const dataDir = path.join(process.cwd(), "data");

    // Load all anime*.json files
    const files = fs.readdirSync(dataDir).filter(
      file => file.startsWith("anime") && file.endsWith(".json")
    );

    let animeList = [];

    for (const file of files) {
      const filePath = path.join(dataDir, file);
      const rawData = fs.readFileSync(filePath, "utf8");

      try {
        const parsed = JSON.parse(rawData);
        if (Array.isArray(parsed)) {
          animeList.push(...parsed);
        }
      } catch {
        console.warn(`⚠️ Skipping invalid JSON in ${file}`);
      }
    }

    const filtered = animeList.filter((anime) => {
      if (query.season && (anime.season || "").toUpperCase() !== query.season.toUpperCase()) return false;
      if (query.year && anime.seasonYear !== parseInt(query.year)) return false;
      if (query.score && anime.score < parseInt(query.score)) return false;
      if (query.adult && anime.isAdult !== (query.adult === "true")) return false;
      if (query.format && (anime.format || "").toUpperCase() !== query.format.toUpperCase()) return false;
      if (query.source && (anime.source || "").toUpperCase() !== query.source.toUpperCase()) return false;

      if (query.genre) {
        const targetGenre = query.genre.toLowerCase();
        const genres = anime.genres?.map(g => g.toLowerCase()) || [];
        if (!genres.includes(targetGenre)) return false;
      }

      return true;
    });

    if (!filtered.length) {
      return res.status(404).json({ error: "🚨 No anime matched the provided filters" });
    }

    const anime = filtered[Math.floor(Math.random() * filtered.length)];

    res.status(200).json({
      ...anime,
      creator: "Shinei Nouzen",
      github: "https://github.com/Shineii86",
      telegram: "https://telegram.me/Shineii86",
      message: "Build with ❤️ by Shinei Nouzen",
      timestamp: new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: true,
      })
    });

  } catch (err) {
    console.error("🚫 Anime API error:", err.message);
    res.status(500).json({ error: "🚨 Internal Server Error" });
  }
}
