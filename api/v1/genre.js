import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const genre = decodeURIComponent(req.query.genre || "").trim().toLowerCase();

  if (!genre) {
    return res.status(400).json({ error: "❌ Genre query parameter is required. Example: /api/genre?genre=Action" });
  }

  const filePath = path.join(process.cwd(), "data", "anime.json");
  const rawData = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(rawData);

  const filtered = data.filter((a) =>
    Array.isArray(a.genres) && a.genres.map((g) => g.toLowerCase()).includes(genre)
  );

  if (filtered.length === 0) {
    return res.status(404).json({ error: `❌ No anime found for genre: ${genre}` });
  }

  const anime = filtered[Math.floor(Math.random() * filtered.length)];

  // Remove the `images` field from response
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
}
