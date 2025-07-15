import axios from "axios";

export async function fetchAnimeData(page, sort = "TRENDING_DESC") {
  const query = `
    query ($page: Int, $sort: [MediaSort]) {
      Page(page: $page, perPage: 50) {
        media(type: ANIME, sort: $sort) {
          id
          title { romaji native }
          description(asHtml: false)
          episodes
          duration
          status
          format
          averageScore
          genres
          isAdult
          season
          seasonYear
          source
          startDate { year month day }
          endDate { year month day }
          studios { nodes { name } }
          coverImage { large }
        }
      }
    }`;

  try {
    const res = await axios.post("https://graphql.anilist.co", {
      query,
      variables: { page, sort },
    });

    return res.data.data.Page.media.map((anime) => ({
      id: anime.id,
      title: `${anime.title.romaji} (${anime.title.native})`,
      description: anime.description?.replace(/<[^>]+>/g, "") || "No description",
      type: "ANIME",
      format: anime.format || "UNKNOWN",
      status: anime.status,
      episodes: anime.episodes || 0,
      duration: anime.duration ? `${anime.duration} min/ep` : "Unknown",
      score: anime.averageScore || 0,
      genres: anime.genres,
      isAdult: anime.isAdult,
      source: anime.source || "UNKNOWN",
      season: anime.season || "UNKNOWN",
      seasonYear: anime.seasonYear || null,
      startDate: anime.startDate,
      endDate: anime.endDate,
      studios: anime.studios.nodes.map((s) => s.name),
      image: anime.coverImage.large,
    }));
  } catch (error) {
    console.error("🚨 Error Fetching Anime Data:", error);
    return [];
  }
}
