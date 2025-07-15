import axios from "axios";

const ANIME_QUERY = `
  query ($page: Int) {
    Page(page: $page, perPage: 500) {
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

function transformAnimeItem(anime) {
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
    studios: anime.studios.nodes.map((s) => s.name),
    image: anime.coverImage.large,
  };
}

async function fetchAnimePage(page) {
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

export async function fetchMultipleAnimePages(startPage = 1, numPages = 10) {
  let allAnime = [];
  let currentPage = startPage;
  let delay = 700;

  for (let i = 0; i < numPages; i++) {
    const { data, headers } = await fetchAnimePage(currentPage);
    allAnime = [...allAnime, ...data];
    currentPage++;

    const remaining = parseInt(headers["x-ratelimit-remaining"] || "90");
    const resetIn = parseInt(headers["retry-after"] || "0") * 1000;
    
    if (remaining <= 2) {
      const waitTime = resetIn > 0 ? resetIn : delay;
      console.log(`Approaching rate limit. Waiting ${waitTime}ms...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    } else if (remaining < 10) {
      delay = Math.min(delay + 50, 2000);
    }
  }

  return allAnime;
}

export async function fetchAnimeData(page) {
  const { data } = await fetchAnimePage(page);
  return data;
}
