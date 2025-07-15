import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "data", "anime.json");
  const rawData = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(rawData);

  const anime = data[Math.floor(Math.random() * data.length)];
  delete anime.images;

  res.json({
    ...anime,
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
