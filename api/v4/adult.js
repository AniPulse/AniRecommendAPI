export default function handler(req, res) {
  const isAdult = req.query.value === "true";
  const filePath = path.join(process.cwd(), "data", "anime.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const filtered = data.filter((a) => a.isAdult === isAdult);
  if (!filtered.length) return res.status(404).json({ error: "No anime found with this adult filter" });

  const anime = filtered[Math.floor(Math.random() * filtered.length)];
  res.json({ ...anime, creator: "Shinei Nouzen", github: "https://github.com/Shineii86", telegram: "https://telegran.me/Shineii86", message: "Build with ❤️ by Shinei Nouzen", timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: true }) });
}
