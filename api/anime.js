import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "data", "anime.json");
    const rawData = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(rawData);

    const { genre, format } = req.query;
    let results = data;

    // Genre filtering (case-insensitive)
    if (genre) {
      const g = genre.toLowerCase();
      results = results.filter(anime =>
        anime.genres?.some(gen => gen.toLowerCase() === g)
      );
    }

    // Format filtering (TV, MOVIE, etc.)
    if (format) {
      const f = format.toUpperCase();
      results = results.filter(anime =>
        anime.format?.toUpperCase() === f
      );
    }

    if (!results.length) {
      return res.status(404).json({ error: "🔎 No Matching Anime Found." });
    }

    const anime = results[Math.floor(Math.random() * results.length)];

    res.status(200).json({
      ...anime,
      creator: "Shinei Nouzen",
      github: "https://github.com/Shineii86",
      telegram: "https://telegran.me/Shineii86",
      message: "Build with ❤️ by Shinei Nouzen",
      timestamp: new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: true,
      })
    });
  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({ error: "🚨 Server Error While Reading Anime Data." });
  }
}
