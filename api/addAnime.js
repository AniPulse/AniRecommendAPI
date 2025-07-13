// api/add-anime.js

import { scrapeAnime } from "../utils/scrapeAnime.js";
import { updateAnimeJson } from "../utils/githubPush.js";

export default async function handler(req, res) {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ error: "👀 Missing 'title' query param" });
  }

  try {
    const animeData = await scrapeAnime(title);
    await updateAnimeJson(animeData);

    res.status(200).json({
      message: "🚀 Anime added successfully",
      data: animeData,
    });
  } catch (err) {
    res.status(500).json({ error: "🤧 Failed to add anime", details: err.message });
  }
}
