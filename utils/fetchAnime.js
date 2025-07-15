import axios from "axios";

export async function fetchAnimeData(page) {
  const query = `
    query ($page: Int) {
      Page(page: $page, perPage: 50) {
        media(type: ANIME, sort: POPULARITY_DESC) {
          id  # AniList ID
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
          coverImage {
            bannerImage
            large
            medium
            extraLarge
            color
          }
        }
      }
    }`;

  const res = await axios.post("https://graphql.anilist.co", {
    query,
    variables: { page },
  });

  return res.data.data.Page.media.map((anime) => ({
    anilistId: anime.id,  // AniList ID
    title: `${anime.title.romaji} (${anime.title.native})`,
    description: anime.description?.replace(/<[^>]+>/g, "") || "No description available",
    type: "ANIME",
    format: anime.format || "UNKNOWN",
    status: anime.status,
    episodes: anime.episodes || 0,
    duration: anime.duration ? `${anime.duration} Per Ep.` : "Unknown",
    score: anime.averageScore || 0,
    genres: anime.genres,
    isAdult: anime.isAdult,
    source: anime.source || "UNKNOWN",
    season: anime.season || "UNKNOWN",
    seasonYear: anime.seasonYear || null,
    startDate: anime.startDate || {},
    endDate: anime.endDate || {},
    studios: anime.studios.nodes.map((s) => s.name),
    images: {
      cover: {
        banner: anime.bannerImage || "",
        large: anime.coverImage?.large || "",
        medium: anime.coverImage?.medium || "",
        extraLarge: anime.coverImage?.extraLarge || "",
        color: anime.coverImage?.color || ""
      }, 
    }
  }));
}
