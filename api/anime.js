import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const query = req.query;

    const filePath = path.join(process.cwd(), "data", "anime.json");
    const rawData = fs.readFileSync(filePath, "utf8");
    const animeList = JSON.parse(rawData);

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
      telegram: "https://telegran.me/Shineii86",
      message: "Build with ❤️ by Shinei Nouzen",
      timestamp: new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: true,
      })
    });
  } catch (err) {
    console.error("🚫 Filter API error:", err);
    res.status(500).json({ error: "🚨 Internal Server Error" });
  }
}
