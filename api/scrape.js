import { fetchAnimeData } from "../utils/fetchAnime.js";
import { updateAnimeJsonOnGitHub } from "../utils/updateGitHub.js";

// Configure scraping parameters
const MAX_PAGES = 50;
const DELAY_MS = 1000; // Increased delay to prevent rate limiting
const CONCURRENT_REQUESTS = 3; // Reduced concurrency

export default async function handler(req, res) {
  const key = req.query.key;
  if (key !== process.env.API_KEY) {
    return res.status(401).json({ error: "🔑 Invalid API KEY" });
  }

  try {
    let allAnime = [];
    let currentPage = 1;
    let hasMore = true;

    while (hasMore && currentPage <= MAX_PAGES) {
      try {
        const requests = [];
        // Create batch of requests
        for (let i = 0; i < CONCURRENT_REQUESTS; i++) {
          if (currentPage <= MAX_PAGES) {
            requests.push(fetchAnimeData(currentPage));
            console.log(`🔄 Adding page ${currentPage} to batch`);
            currentPage++;
          }
        }

        // Process batch
        const results = await Promise.allSettled(requests);
        
        // Process results
        for (const result of results) {
          if (result.status === "fulfilled") {
            allAnime = [...allAnime, ...result.value];
            console.log(`✅ Fetched ${result.value.length} anime`);
          } else {
            console.error("❌ Page failed:", result.reason.message);
          }
        }

        // Add delay between batches
        if (currentPage <= MAX_PAGES) {
          console.log(`⏳ Waiting ${DELAY_MS}ms before next batch...`);
          await new Promise(resolve => setTimeout(resolve, DELAY_MS));
        }
      } catch (batchError) {
        console.error("🚨 Batch error:", batchError.message);
        hasMore = false;
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
        pagesProcessed: currentPage - 1
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
