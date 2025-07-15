import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const dataDir = path.join(process.cwd(), "data");
    const files = fs.readdirSync(dataDir).filter(f => f.startsWith("anime") && f.endsWith(".json"));

    let allAnime = [];

    for (const file of files) {
      const raw = fs.readFileSync(path.join(dataDir, file), "utf8");
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          allAnime.push(...parsed);
        }
      } catch (e) {
        console.warn(`⚠️ Skipped invalid JSON in ${file}`);
      }
    }

    const total = allAnime.filter(a => typeof a.id === "number").length;

    res.setHeader("X-Creator", "Shinei Nouzen");
    res.setHeader("X-GitHub", "https://github.com/Shineii86");
    res.setHeader("X-Telegram", "https://telegram.me/Shineii86");
    res.setHeader("X-Timestamp", new Date().toISOString());

    res.status(200).json({
      schemaVersion: 1,
      label: "AniRecommend",
      message: `Total ${total} animes`,
      color: "green"
    });

  } catch (error) {
    console.error("❌ Badge error:", error.message);
    res.setHeader("X-Error", error.message);

    res.status(200).json({
      schemaVersion: 1,
      label: "AniRecommend",
      message: "Error",
      color: "lightgrey"
    });
  }
}
