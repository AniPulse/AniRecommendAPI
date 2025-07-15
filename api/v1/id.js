import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "data", "anime.json");
    const rawData = fs.readFileSync(filePath, "utf8");
    let data = JSON.parse(rawData);

    if (!Array.isArray(data)) throw new Error("🚧 anime.json is not a valid array");
    data = data.flat();

    const withId = data.filter(a => typeof a.id === "number");
    const idParam = req.query.id;

    let anime;

    if (idParam) {
      const requestedId = parseInt(idParam);
      if (isNaN(requestedId)) {
        return res.status(400).json({ error: "🚨 Invalid ID. Must be a number." });
      }

      anime = withId.find(a => a.id === requestedId);
      if (!anime) {
        return res.status(404).json({ error: `🔎 No anime found with ID ${requestedId}` });
      }
    } else {
      // Return random anime with ID
      anime = withId[Math.floor(Math.random() * withId.length)];
    }

    // Remove images from the response
    const { images, ...cleanAnime } = anime;

    res.status(200).json({
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

  } catch (err) {
    console.error("🚫 ID API error:", err.message);
    res.status(500).json({ error: "🚨 Internal server error" });
  }
}
