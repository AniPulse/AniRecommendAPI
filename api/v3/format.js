import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const userFormat = decodeURIComponent(req.query.format || "").toUpperCase();

  const filePath = path.join(process.cwd(), "data", "anime.json");
  const rawData = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(rawData);

  const filtered = data.filter((a) => (a.format || "").toUpperCase() === userFormat);

  if (!filtered.length) {
    return res.status(404).json({ error: "Format not found. Try TV, MOVIE, OVA, etc." });
  }

  const anime = filtered[Math.floor(Math.random() * filtered.length)];

  res.json({
    ...anime
  });
}
