import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "data", "anime.json");
    const rawData = fs.readFileSync(filePath, "utf8");
    let data = JSON.parse(rawData);

    if (!Array.isArray(data)) throw new Error("🚧 anime.json Is Not A Valid Array");
    data = data.flat();

    const withId = data.filter(a => typeof a.id === "number");
    const idParam = req.query.id;

    let anime;

    if (idParam) {
      const requestedId = parseInt(idParam);
      if (isNaN(requestedId)) {
        return res.status(400).json({ error: "🚨 Invalid ID. Must Be A Number." });
      }

      anime = withId.find(a => a.id === requestedId);
      if (!anime) {
        return res.status(404).json({ error: `🔎 No Anime Found With ID ${requestedId}` });
      }
    } else {
      // Random anime with ID
      anime = withId[Math.floor(Math.random() * withId.length)];
    }

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
    console.error("🚫 ID API error:", err.message);
    res.status(500).json({ error: "🚨 Internal server error" });
  }
}
