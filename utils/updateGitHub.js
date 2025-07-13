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
    if (err.response && err.response.status === 404) {
      console.log("anime.json not found, creating new file.");
    } else {
      console.error("❌ Failed to fetch anime.json:", err.message);
      throw err;
    }
  }

  const existingTitles = new Set(existing.map((a) => a.title));

  const newEntries = newAnimeList.filter(
    (a) => !existingTitles.has(a.title)
  );

  if (newEntries.length === 0) return 0;

  const finalData = [...existing, ...newEntries];
  const encodedContent = Buffer.from(JSON.stringify(finalData, null, 2)).toString("base64");

  await axios.put(
    apiUrl,
    {
      message: `🚀 Update anime.json with ${newEntries.length} new anime`,
      content: encodedContent,
      ...(sha ? { sha } : {}),
    },
    {
      headers: { Authorization: `token ${token}` },
    }
  );

  return newEntries.length;
}
