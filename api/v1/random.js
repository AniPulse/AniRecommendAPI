const data = require("../../data/anime.json");

export default function handler(req, res) {
  const anime = data[Math.floor(Math.random() * data.length)];
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
