import axios from "axios";

// Define the GraphQL query as a constant for reusability
const ANIME_QUERY = `
  query ($page: Int) {
    Page(page: $page, perPage: 50) {
      media(type: ANIME, sort: POPULARITY_DESC) {
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

// Helper function to transform API response
function transformAnimeItem(anime: any) {
  return {
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
    studios: anime.studios.nodes.map((s: any) => s.name),
    image: anime.coverImage.large,
  };
}

// Fetch a single page with rate limit handling
async function fetchAnimePage(page: number) {
  try {
    const response = await axios.post("https://graphql.anilist.co", {
      query: ANIME_QUERY,
      variables: { page },
    });

    return {
      data: response.data.data.Page.media.map(transformAnimeItem),
      headers: response.headers,
    };
  } catch (error) {
    console.error(`Error fetching page ${page}:`, error);
    throw error;
  }
}

// Main function to fetch multiple pages
export async function fetchMultipleAnimePages(
  startPage: number = 1,
  numPages: number = 100
) {
  let allAnime: any[] = [];
  let currentPage = startPage;
  let delay = 700; // Initial delay (ms) between requests

  for (let i = 0; i < numPages; i++) {
    const { data, headers } = await fetchAnimePage(currentPage);
    allAnime = [...allAnime, ...data];
    currentPage++;

    // Handle rate limiting
    const remaining = parseInt(headers["x-ratelimit-remaining"] || "90");
    const resetIn = parseInt(headers["retry-after"] || "0") * 1000;
    
    if (remaining <= 2) {
      const waitTime = resetIn > 0 ? resetIn : delay;
      console.log(`Approaching rate limit. Waiting ${waitTime}ms...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    } else if (remaining < 10) {
      delay = Math.min(delay + 50, 2000); // Increase delay gradually
    }
  }

  return allAnime;
}

// Existing single-page fetch function
export async function fetchAnimeData(page: number) {
  const { data } = await fetchAnimePage(page);
  return data;
}
