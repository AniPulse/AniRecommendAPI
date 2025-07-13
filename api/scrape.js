import { fetchAnimeData } from "../utils/fetchAnime.js";
import { saveUniqueAnime } from "../utils/saveAnime.js";

export default async function handler(req, res) {
  const { query } = req;
  const key = query?.key;

  if (key !== "Quinx") {
    return res.status(401).json({ error: "Invalid API Key" });
  }

  let allAnime = [];

  for (let i = 1; i <= 100; i++) {
    try {
      const pageData = await fetchAnimeData(i);
      allAnime.push(...pageData);
    } catch (err) {
      console.error(`Page ${i} failed`, err.message);
      break;
    }
  }

  const newCount = await saveUniqueAnime(allAnime);

  res.json({
    status: "success",
    added: newCount,
    totalScraped: allAnime.length,
    message: `🚀 Scraped & added ${newCount} new anime to anime.json`
  });
}
