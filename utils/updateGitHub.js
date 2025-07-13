import axios from "axios";

const OWNER = "Shineii86"; // Your Github Org Or Username
const REPO = "AniRecommendAPI";  // Your Github Repo Name
const FILE_PATH = "data/anime.json";

export async function updateAnimeJsonOnGitHub(newAnimeList) {
  const token = process.env.GH_PAT;
  const apiUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`;

  // Get current content
  const { data } = await axios.get(apiUrl, {
    headers: { Authorization: `token ${token}` },
  });

  const sha = data.sha;
  const existing = JSON.parse(Buffer.from(data.content, "base64").toString("utf-8"));
  const existingTitles = new Set(existing.map((a) => a.title));

  const newEntries = newAnimeList.filter((a) => !existingTitles.has(a.title)).map((anime) => ({
    ...anime,
    creator: "Shinei Nouzen",
    github: "https://github.com/Shineii86",
    telegram: "https://telegran.me/Shineii86",
    message: "Build with ❤️ by Shinei Nouzen",
    timestamp: new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: true,
    }),
  }));

  if (newEntries.length === 0) return 0;

  const updatedData = [...existing, ...newEntries];
  const encoded = Buffer.from(JSON.stringify(updatedData, null, 2)).toString("base64");

  await axios.put(
    apiUrl,
    {
      message: `🚀 Update anime.json with ${newEntries.length} new anime`,
      content: encoded,
      sha,
    },
    { headers: { Authorization: `token ${token}` } }
  );

  return newEntries.length;
}
