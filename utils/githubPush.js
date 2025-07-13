import { Octokit } from "octokit";
import fs from "fs";

const GITHUB_REPO = "Shineii86/AniRecommendAPI";
const FILE_PATH = "data/anime.json";

export async function updateAnimeJson(newAnime) {
  const octokit = new Octokit({ auth: process.env.GH_PAT });

  const [owner, repo] = GITHUB_REPO.split("/");
  const { data: file } = await octokit.repos.getContent({ owner, repo, path: FILE_PATH });
  const sha = file.sha;

  const currentData = JSON.parse(
    Buffer.from(file.content, "base64").toString("utf8")
  );
  currentData.push(newAnime);

  const contentEncoded = Buffer.from(JSON.stringify(currentData, null, 2)).toString("base64");

  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: FILE_PATH,
    message: `Add anime: ${newAnime.title}`,
    content: contentEncoded,
    sha,
  });
}
