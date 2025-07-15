import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const dataDir = path.join(process.cwd(), "data");

    // Load all anime*.json files
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
      } catch (e) {
        console.warn(`⚠️ Skipping invalid JSON in ${file}`);
      }
    }

    if (!allAnime.length) {
      return res.status(404).json({ error: "🚨 No anime data found." });
    }

    const anime = allAnime[Math.floor(Math.random() * allAnime.length)];

    res.json({
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
    console.error("🚫 Random API error:", err.message);
    res.status(500).json({ error: "🚨 Internal Server Error" });
  }
}
