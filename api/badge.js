import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "data", "anime.json");
    const json = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(json);

    const total = Array.isArray(data) ? data.length : 0;

    // Add optional metadata
    res.setHeader("X-Creator", "Shinei Nouzen");
    res.setHeader("X-GitHub", "https://github.com/Shineii86");
    res.setHeader("X-Telegram", "https://telegram.me/Shineii86");
    res.setHeader("X-Timestamp", new Date().toISOString());

    res.status(200).json({
      schemaVersion: 1,
      label: "AniRecommend",
      message: `${total} anime`,
      color: "blue"
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
