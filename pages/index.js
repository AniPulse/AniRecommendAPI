export default function handler(req, res) {
  const isHTML = req.headers.accept?.includes("text/html");

  const metadata = {
    status: "alive",
    message: "🎉 Welcome to AniRecommendAPI — built with ❤️ by Shinei Nouzen",
    endpoints: {
      random: "/api/v2/random",
      byGenre: "/api/v2/genre?genre=Action",
      byFormat: "/api/v3/format?type=Movie",
      byId: "/api/v1/id?id=27",
      anime: "/api/anime?season=SPRING&year=2020&format=TV&genre=Action",
      stats: "/api/stats",
      badge: "/api/badge",
      posterV5: "/api/v5/poster?id=27"
    },
    documentation: "https://github.com/Shineii86/AniRecommendAPI#readme",
    creator: "Shinei Nouzen",
    github: "https://github.com/Shineii86",
    telegram: "https://telegram.me/Shineii86",
    timestamp: new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: true
    })
  };

  if (!isHTML) {
    res.setHeader("Content-Type", "application/json");
    return res.status(200).json(metadata);
  }

  // HTML Response
  res.setHeader("Content-Type", "text/html");
  res.status(200).end(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>AniRecommendAPI</title>
      <style>
        body {
          font-family: sans-serif;
          background: #f8f9fa;
          color: #222;
          padding: 2rem;
          line-height: 1.6;
        }
        a { color: #0070f3; text-decoration: none; }
        a:hover { text-decoration: underline; }
        code { background: #eaeaea; padding: 2px 5px; border-radius: 4px; }
      </style>
    </head>
    <body>
      <h1>🎌 AniRecommendAPI</h1>
      <p>Built with ❤️ by <a href="${metadata.github}" target="_blank">${metadata.creator}</a></p>
      <h2>Endpoints</h2>
      <ul>
        <li><a href="${metadata.endpoints.random}">/api/v2/random</a></li>
        <li><a href="${metadata.endpoints.byGenre}">/api/v2/genre?genre=Action</a></li>
        <li><a href="${metadata.endpoints.byFormat}">/api/v3/format?type=Movie</a></li>
        <li><a href="${metadata.endpoints.byId}">/api/v1/id?id=27</a></li>
        <li><a href="${metadata.endpoints.anime}">/api/anime?season=SPRING&year=2020&format=TV&genre=Action</a></li>
        <li><a href="${metadata.endpoints.stats}">/api/stats</a></li>
        <li><a href="${metadata.endpoints.badge}">/api/badge</a></li>
      </ul>

      <h3>Documentation</h3>
      <p>📘 View full docs on <a href="${metadata.documentation}" target="_blank">GitHub</a></p>

      <h3>Connect</h3>
      <p>
        <a href="${metadata.github}" target="_blank">GitHub</a> |
        <a href="${metadata.telegram}" target="_blank">Telegram</a>
      </p>

      <p><small>Last updated: ${metadata.timestamp}</small></p>
    </body>
    </html>
  `);
}
