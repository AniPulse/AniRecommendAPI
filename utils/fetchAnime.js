import axios from "axios";

// Slugify for URL-safe titles
function slugifyRomaji(title = "") {
  return title
    .trim()
    .replace(/[^\w\s-]/g, "")      // Remove special chars
    .replace(/\s+/g, "-")          // Replace spaces with hyphens
    .replace(/-+/g, "-")           // Collapse multiple hyphens
    .toUpperCase();                // Optional: AniList often uses uppercase
}

export async function fetchAnimeData(page) {
  const query = `
    query ($page: Int) {
      Page(page: $page, perPage: 5000) {
        media(type: ANIME, sort: TRENDING_DESC) {
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
          endDate   { year month day }
          studios { nodes { name } }
          coverImage {
            large
            medium
            extraLarge
            color
          }
          bannerImage
        }
      }
    }`;

  const res = await axios.post("https://graphql.anilist.co", {
    query,
    variables: { page },
  });

  return res.data.data.Page.media.map((anime) => {
    const romajiTitle = anime.title.romaji || "Unknown";
    const titleSlug = slugifyRomaji(romajiTitle);
    const anilistURL = `https://anilist.co/anime/${anime.id}/${titleSlug}/`;

    return {
      anilistId: anime.id,
      title: `${romajiTitle} (${anime.title.native || ""})`,
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
      anilistURL,
      images: {
        large: anime.coverImage.large,
        medium: anime.coverImage.medium,
        extraLarge: anime.coverImage.extraLarge,
        banner: anime.bannerImage || null,
        color: anime.coverImage.color || null
      }
    };
  });
}
