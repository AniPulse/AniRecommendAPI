// api/scrap.js
import { fetchAnimeData } from "../utils/fetchAnime.js";
import { updateAnimeJsonOnGitHub } from "../utils/updateGitHub.js";

// Configure scraping parameters
const MAX_PAGES = 50; // Reduced from 100 to prevent timeouts
const DELAY_MS = 500; // Delay between requests to avoid rate limits
const CONCURRENT_REQUESTS = 5; // Number of parallel requests

export default async function handler(req, res) {
  const key = req.query.key;
  if (key !== process.env.API_KEY) {
    return res.status(401).json({ error: "🔑 Invalid API KEY" });
  }

  try {
    let allAnime = [];
    const pageGroups = [];

    // Create page groups for concurrent fetching
    for (let i = 1; i <= MAX_PAGES; i += CONCURRENT_REQUESTS) {
      const group = [];
      for (let j = 0; j < CONCURRENT_REQUESTS && i + j <= MAX_PAGES; j++) {
        group.push(i + j);
      }
      pageGroups.push(group);
    }

    // Process page groups sequentially with delay
    for (const [index, group] of pageGroups.entries()) {
      try {
        const requests = group.map(page => fetchAnimeData(page));
        const results = await Promise.allSettled(requests);
        
        results.forEach(result => {
          if (result.status === "fulfilled") {
            allAnime.push(...result.value);
          }
        });

        // Add delay between groups except last one
        if (index < pageGroups.length - 1) {
          await new Promise(resolve => setTimeout(resolve, DELAY_MS));
        }
        
        console.log(`✅ Processed pages ${group[0]}-${group[group.length-1]}`);
      } catch (groupError) {
        console.error(`🚨 Group error:`, groupError.message);
      }
    }

    console.log(`📊 Total scraped: ${allAnime.length} anime`);

    // Update GitHub with new entries
    const added = await updateAnimeJsonOnGitHub(allAnime);
    
    res.json({
      message: `🎉 Success! Scraped ${allAnime.length} anime. Added ${added} new entries.`,
      stats: {
        total: allAnime.length,
        newEntries: added,
        pagesProcessed: MAX_PAGES
      }
    });
  } catch (error) {
    console.error("🚨 Critical error:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message
    });
  }
}
