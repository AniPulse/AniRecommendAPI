import axios from "axios";

const OWNER = "Shineii86"; // Your GitHub Username
const REPO = "AniRecommendAPI"; // Your GitHub Repo Name
const FILE_PATH = "data/anime.json"; // Path To anime.json

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

    // Ensure Existing Data Is A Flat Array
    if (!Array.isArray(existing)) {
      throw new Error("anime.json is not a valid array");
    }
  } catch (err) {
    if (err.response?.status === 404) {
      console.log("🚨 anime.json Not Found — Creating New File.");
    } else {
      console.error("❌ Failed To Fetch anime.json:", err.message);
      throw err;
    }
  }

  // Prevent duplicates by title
  const existingTitles = new Set(existing.map((a) => a.title));
  const newEntries = newAnimeList.filter((a) => !existingTitles.has(a.title));

  if (newEntries.length === 0) {
    console.log("✅ No New Anime To Add.");
    return 0;
  }

  const finalData = [...existing, ...newEntries];

  const encodedContent = Buffer.from(JSON.stringify(finalData, null, 2)).toString("base64");

  await axios.put(
    apiUrl,
    {
      message: `🚀 Update anime.json With ${newEntries.length} New Entries`,
      content: encodedContent,
      ...(sha ? { sha } : {}),
    },
    {
      headers: { Authorization: `token ${token}` },
    }
  );

  console.log(`🔥 Added ${newEntries.length} New Anime(s).`);
  return newEntries.length;
}
