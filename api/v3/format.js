import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const userFormat = decodeURIComponent(req.query.type || "").toUpperCase();

    if (!userFormat) {
      return res.status(400).json({
        error: "❌ Format type is required. Example: /api/format?type=TV"
      });
    }

    const dataDir = path.join(process.cwd(), "data");
    const files = fs.readdirSync(dataDir).filter(
      file => file.startsWith("anime") && file.endsWith(".json")
    );

    let allAnime = [];

    for (const file of files) {
      const filePath = path.join(dataDir, file);
      const rawData = fs.readFileSync(filePath, "utf8");

      try {
        const parsed = JSON.parse(rawData);
        if (Array.isArray(parsed)) {
          allAnime.push(...parsed);
        }
      } catch {
        console.warn(`⚠️ Skipping invalid JSON in ${file}`);
      }
    }

    const filtered = allAnime.filter(
      (anime) => (anime.format || "").toUpperCase() === userFormat
    );

    if (!filtered.length) {
      return res.status(404).json({
        error: "🚨 Format not found. Try types like TV, MOVIE, OVA, ONA, SPECIAL."
      });
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
        hour12: true
      })
    });

  } catch (err) {
    console.error("❌ Format API error:", err.message);
    res.status(500).json({ error: "🚨 Internal Server Error" });
  }
}
