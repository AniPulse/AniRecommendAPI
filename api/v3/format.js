import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const userFormat = decodeURIComponent(req.query.type || "").toUpperCase();

    const filePath = path.join(process.cwd(), "data", "anime.json");
    const rawData = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(rawData);

    const filtered = data.filter(
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
      telegram: "https://telegran.me/Shineii86",
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
