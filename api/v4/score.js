import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const minScore = parseInt(req.query.min || "0");

  const filePath = path.join(process.cwd(), "data", "anime.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const filtered = data.filter((a) => a.score >= minScore);

  if (!filtered.length) {
    return res.status(404).json({ error: "No anime found above this score" });
  }

  const anime = filtered[Math.floor(Math.random() * filtered.length)];

  res.json({
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
}
