import axios from "axios";

const OWNER = "Shineii86";
const REPO = "AniRecommendAPI";
const FILE_PATH = "data/anime1.json";

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
    const parsed = content.trim() ? JSON.parse(content) : [];
    existing = Array.isArray(parsed) ? parsed.flat() : [];
  } catch (err) {
    if (err.response?.status !== 404) throw err;
    console.log("📁 anime.json not found. Creating new file.");
  }

  const existingTitles = new Set(existing.map((a) => a.title));
  const maxId = existing.reduce((max, a) => (a.id > max ? a.id : max), 0);

  const newRaw = newAnimeList.filter((a) => !existingTitles.has(a.title));
  if (newRaw.length === 0) {
    console.log("✅ No new anime to add.");
    return 0;
  }

  const newEntries = newRaw.map((anime, i) => ({
    id: maxId + i + 1,
    ...anime,
  }));

  const finalData = [...existing, ...newEntries];
  const encoded = Buffer.from(JSON.stringify(finalData, null, 2)).toString("base64");

  await axios.put(apiUrl, {
    message: `🚀 Added ${newEntries.length} new anime`,
    content: encoded,
    ...(sha ? { sha } : {}),
  }, {
    headers: { Authorization: `token ${token}` },
  });

  console.log(`🔥 Added ${newEntries.length} anime entries.`);
  return newEntries.length;
}
