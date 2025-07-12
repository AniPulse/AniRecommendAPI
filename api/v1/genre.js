const data = require("../../data/anime.json");

export default function handler(req, res) {
  const genre = decodeURIComponent(req.query.genre);
  const filtered = data.filter(a =>
    a.genres.map(g => g.toLowerCase()).includes(genre.toLowerCase())
  );

  const anime = filtered[Math.floor(Math.random() * filtered.length)];
  if (!anime) return res.status(404).json({ error: "Genre not found" });

  res.json({
    ...anime,
    image: undefined,
    creator: "Shinei Nouzen",
    github: "https://github.com/Shineii86",
    telegram: "https://telegran.me/Shineii86",
    message: "Build with ❤️ by Shinei Nouzen",
    timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
  });
}
