import axios from "axios";

const OWNER = "Shineii86";
const REPO = "AniRecommendAPI";
const FILE_PATH = "data/anime.json";

export async function updateAnimeJsonOnGitHub(newAnimeList) {
  const token = process.env.GH_PAT;
  const apiUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`;

  let existing = [];
  let sha = null;

  // 1. Get existing data
  try {
    const { data } = await axios.get(apiUrl, {
      headers: { Authorization: `token ${token}` },
    });

    sha = data.sha;
    const content = Buffer.from(data.content || "", "base64").toString("utf-8");

    try {
      existing = content.trim() ? JSON.parse(content) : [];
    } catch {
      console.warn("⚠️ anime.json is not valid. Starting with empty array.");
      existing = [];
    }
  } catch (err) {
    if (err.response?.status === 404) {
      console.log("📁 anime.json not found. Will create it.");
    } else {
      throw err;
    }
  }

  // 2. Create map of existing _key to avoid duplicates
  const existingMap = new Map(existing.map((anime) => [anime._key, anime]));

  // 3. Merge new anime (add only if _key is not already present)
  let added = 0;
  for (const anime of newAnimeList) {
    if (!existingMap.has(anime._key)) {
      existingMap.set(anime._key, anime);
      added++;
    }
  }

  if (added === 0) {
    console.log("✅ No new anime to add. All are duplicates.");
    return 0;
  }

  // 4. Assign IDs based on existing highest ID
  const allAnime = Array.from(existingMap.values());
  const maxId = allAnime.reduce((max, a) => (a.id > max ? a.id : max), 0);
  let nextId = maxId + 1;

  for (const anime of allAnime) {
    if (!anime.id) {
      anime.id = nextId++;
    }
  }

  // 5. Save final merged list back to GitHub
  const finalEncoded = Buffer.from(JSON.stringify(allAnime, null, 2)).toString("base64");

  await axios.put(
    apiUrl,
    {
      message: `✨ Added ${added} new anime entries`,
      content: finalEncoded,
      ...(sha ? { sha } : {}),
    },
    {
      headers: { Authorization: `token ${token}` },
    }
  );

  console.log(`🔥 Added ${added} new anime. Total: ${allAnime.length}`);
  return added;
}
