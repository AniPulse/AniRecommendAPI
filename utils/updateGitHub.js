import axios from "axios";

const OWNER = "Shineii86";
const REPO = "AniRecommendAPI";
const FILE_PATH = "data/anime.json";

export async function updateAnimeJsonOnGitHub(newAnimeList) {
  const token = process.env.GH_PAT;
  const apiUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`;

  let existing = [];
  let sha = null;

  // Fetch existing anime.json file from GitHub
  try {
    const { data } = await axios.get(apiUrl, {
      headers: { Authorization: `token ${token}` },
    });

    sha = data.sha;
    const content = Buffer.from(data.content || "", "base64").toString("utf-8");

    try {
      const parsed = content.trim() ? JSON.parse(content) : [];
      existing = Array.isArray(parsed) ? parsed.flat() : [];
    } catch (e) {
      console.warn("⚠️ Warning: anime.json is not valid JSON. Starting fresh.");
      existing = [];
    }

  } catch (err) {
    if (err.response?.status === 404) {
      console.log("🚨 anime.json not found — creating a new file.");
    } else {
      throw err;
    }
  }

  // Create sets for duplicate checking
  const existingIds = new Set();
  const existingAnilistIds = new Set();
  
  // Process existing entries
  existing.forEach(item => {
    // Track our internal IDs
    if (typeof item.id === "number") {
      existingIds.add(item.id);
    }
    
    // Track AniList IDs for new duplicate check
    if (typeof item.anilistId === "number") {
      existingAnilistIds.add(item.anilistId);
    }
    
    // Backward compatibility: Track old entries without anilistId by title
    if (!item.anilistId && item.title) {
      existingAnilistIds.add(item.title);
    }
  });

  // Filter out duplicates from new data
  const newEntries = newAnimeList.filter(anime => {
    // Check by AniList ID (new entries)
    if (typeof anime.anilistId === "number") {
      return !existingAnilistIds.has(anime.anilistId);
    }
    
    // Fallback to title check (for backward compatibility)
    return !existingAnilistIds.has(anime.title);
  });

  if (newEntries.length === 0) {
    console.log("✅ No new anime to add.");
    return 0;
  }

  // Generate new IDs
  const maxId = Math.max(0, ...Array.from(existingIds));
  let currentId = maxId + 1;
  
  const entriesWithIds = newEntries.map(anime => ({
    id: currentId++,
    ...anime
  }));

  // Create final dataset
  const finalData = [...existing, ...entriesWithIds];
  const encoded = Buffer.from(JSON.stringify(finalData, null, 2)).toString("base64");

  // Upload back to GitHub
  await axios.put(apiUrl, {
    message: `🚀 Added ${entriesWithIds.length} new anime`,
    content: encoded,
    ...(sha ? { sha } : {})
  }, {
    headers: { Authorization: `token ${token}` }
  });

  console.log(`🔥 Added ${entriesWithIds.length} anime entries.`);
  return entriesWithIds.length;
}
