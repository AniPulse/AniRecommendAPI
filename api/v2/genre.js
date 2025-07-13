import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const genre = decodeURIComponent(req.query.genre || "").toLowerCase();

  const filePath = path.join(process.cwd(), "data", "anime.json");
  const rawData = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(rawData);

  const filtered = data.filter(a =>
    a.genres.map(g => g.toLowerCase()).includes(genre)
  );

  const anime = filtered[Math.floor(Math.random() * filtered.length)];

  if (!anime) {
    return res.status(404).json({ error: "Genre not found" });
  }

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
