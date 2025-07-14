import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const {
    season,
    year,
    score,
    adult,
    source,
    format,
    genre
  } = req.query;

  const filePath = path.join(process.cwd(), "data", "anime.json");
  const raw = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(raw);

  let filtered = data;

  if (season)
    filtered = filtered.filter(a => (a.season || "").toUpperCase() === season.toUpperCase());

  if (year)
    filtered = filtered.filter(a => a.seasonYear === parseInt(year));

  if (score)
    filtered = filtered.filter(a => a.score >= parseInt(score));

  if (adult === "true" || adult === "false")
    filtered = filtered.filter(a => a.isAdult === (adult === "true"));

  if (source)
    filtered = filtered.filter(a => (a.source || "").toUpperCase() === source.toUpperCase());

  if (format)
    filtered = filtered.filter(a => (a.format || "").toUpperCase() === format.toUpperCase());

  if (genre)
    filtered = filtered.filter(a =>
      (a.genres || []).map(g => g.toLowerCase()).includes(genre.toLowerCase())
    );

  if (filtered.length === 0)
    return res.status(404).json({ error: "❌ No anime found matching all criteria" });

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
}
