import axios from "axios";

export async function fetchAnimeData(page) {
  const query = `
    query ($page: Int) {
      Page(page: $page, perPage: 50) {
        media(type: ANIME, sort: POPULARITY_DESC) {
          title { romaji native }
          description(asHtml: false)
          episodes
          duration
          status
          averageScore
          genres
          studios { nodes { name } }
          coverImage { large }
        }
      }
    }`;

  const res = await axios.post("https://graphql.anilist.co", {
    query,
    variables: { page },
  });

  return res.data.data.Page.media.map((anime) => ({
    title: `${anime.title.romaji} (${anime.title.native})`,
    description: anime.description?.replace(/<[^>]+>/g, "") || "No description available",
    type: "ANIME",
    status: anime.status,
    episodes: anime.episodes || 0,
    duration: anime.duration ? `${anime.duration} Per Ep.` : "Unknown",
    score: anime.averageScore || 0,
    genres: anime.genres,
    studios: anime.studios.nodes.map((s) => s.name),
    image: anime.coverImage.large,
  }));
}
