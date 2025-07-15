import axios from "axios";

const OWNER = "Shineii86";
const REPO = "AniRecommendAPI";
const FILE_PATH = "data/anime.json";

export async function updateAnimeJsonOnGitHub(newAnimeList) {
  const token = process.env.GH_PAT;
  const apiUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`;

  let existing = [];
  let sha = null;

  try {
    const { data } = await axios.get(apiUrl, {
      headers: { Authorization: `token ${token}` },
    });

    sha = data.sha;
    const content = Buffer.from(data.content || "", "base64").toString("utf-8");
    existing = content.trim() ? JSON.parse(content) : [];
    
  } catch (err) {
    if (err.response?.status === 404) {
      console.log("Creating new anime.json file");
    } else {
      console.error("Error fetching existing data:", err.message);
      throw err;
    }
  }

  // Deduplicate using both title and AniList ID
  const existingKeys = new Set();
  existing.forEach(item => {
    existingKeys.add(item.title);
    if (item.anilistId) existingKeys.add(`id:${item.anilistId}`);
  });

  const newEntries = newAnimeList.filter(anime => {
    return !existingKeys.has(anime.title) && 
           !existingKeys.has(`id:${anime.anilistId}`);
  });

  if (newEntries.length === 0) {
    console.log("✅ No new anime to add");
    return 0;
  }

  // Add sequential IDs
  const maxId = existing.reduce((max, item) => 
    Math.max(max, item.id || 0), 0);
  
  const entriesWithIds = newEntries.map((anime, i) => ({
    id: maxId + i + 1,
    ...anime
  }));

  const finalData = [...existing, ...entriesWithIds];
  const content = JSON.stringify(finalData, null, 2);
  const encoded = Buffer.from(content).toString("base64");

  await axios.put(apiUrl, {
    message: `🚀 Added ${entriesWithIds.length} new anime entries`,
    content: encoded,
    sha: sha
  }, {
    headers: {
      Authorization: `token ${token}`,
      "Content-Type": "application/json"
    }
  });

  console.log(`🔥 Added ${entriesWithIds.length} new entries`);
  return entriesWithIds.length;
}
