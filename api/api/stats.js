import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "data", "anime.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const formatStats = {};
    const genreStats = {};

    data.forEach(anime => {
      // Count format
      const format = (anime.format || "Unknown").toUpperCase();
      formatStats[format] = (formatStats[format] || 0) + 1;

      // Count genres
      anime.genres?.forEach(genre => {
        genreStats[genre] = (genreStats[genre] || 0) + 1;
      });
    });

    res.status(200).json({
      total: data.length,
      formats: Object.fromEntries(Object.entries(formatStats).sort()),
      genres: Object.fromEntries(Object.entries(genreStats).sort()),
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
    console.error("❌ Stats error:", err.message);
    res.status(500).json({ error: "🚨 Internal Server Error" });
  }
}
