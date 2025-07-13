import { readJson, writeJson } from "fs-extra";
import { join } from "path";

const FILE_PATH = join(process.cwd(), "data", "anime.json");

export async function saveUniqueAnime(animeList) {
  const existing = await readJson(FILE_PATH).catch(() => []);
  const existingTitles = new Set(existing.map((a) => a.title));

  const newAnime = animeList.filter((a) => !existingTitles.has(a.title)).map((anime) => ({
    ...anime,
    creator: "Shinei Nouzen",
    github: "https://github.com/Shineii86",
    telegram: "https://telegran.me/Shineii86",
    message: "Build with ❤️ by Shinei Nouzen",
    timestamp: new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: true
    })
  }));

  const finalList = [...existing, ...newAnime];
  await writeJson(FILE_PATH, finalList, { spaces: 2 });

  return newAnime.length;
}
