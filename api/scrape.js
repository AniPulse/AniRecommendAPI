import { fetchAnimeData } from "../utils/fetchAnime.js";
import { updateAnimeJsonOnGitHub } from "../utils/updateGitHub.js";

export default async function handler(req, res) {
  const key = req.query.key;
  if (key !== process.env.API_KEY) {
    return res.status(401).json({ error: "👀 Invalid API KEY" });
  }

  let allAnime = [];

  for (let page = 1; page <= 100; page++) {
    try {
      const data = await fetchAnimeData(page);
      allAnime.push(...data);
    } catch (err) {
      console.log(`Page ${page} failed`, err.message);
      break;
    }
  }

  const added = await updateAnimeJsonOnGitHub(allAnime);

  res.json({
    message: `✅ Scraped ${allAnime.length} anime. Added ${added} new entries to GitHub.`,
  });
}
