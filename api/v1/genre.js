import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const genre = decodeURIComponent(req.query.genre || "").trim().toLowerCase();

    if (!genre) {
      return res.status(400).json({
        error: "❌ Genre query parameter is required. Example: /api/genre?genre=Action"
      });
    }

    const dataDir = path.join(process.cwd(), "data");

    // Collect all files that start with "anime" and end with ".json"
    const files = fs.readdirSync(dataDir).filter(
      (file) => file.startsWith("anime") && file.endsWith(".json")
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
      } catch (e) {
        console.warn(`⚠️ Skipped invalid JSON in ${file}`);
      }
    }

    const filtered = allAnime.filter(
      (a) => Array.isArray(a.genres) &&
             a.genres.map(g => g.toLowerCase()).includes(genre)
    );

    if (!filtered.length) {
      return res.status(404).json({ error: `❌ No anime found for genre: ${genre}` });
    }

    const anime = filtered[Math.floor(Math.random() * filtered.length)];
    const { images, ...cleanAnime } = anime;

    res.json({
      ...cleanAnime,
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
    console.error("🚫 Genre query parameter is required. Example: /api/genre?genre=Action");
    res.status(500).json({ error: "🚨 Internal server error" });
  }
}
