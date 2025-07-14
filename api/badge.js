import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "data", "anime.json");
    const json = fs.readFileSync(filePath, "utf8");
    let data = JSON.parse(json);

    // Ensure it's a flat array
    if (!Array.isArray(data)) throw new Error("anime.json is not an array");
    data = data.flat();

    // Filter only valid entries that have an ID
    const total = data.filter(a => typeof a.id === "number").length;

    // Optional metadata
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
