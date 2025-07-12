const fs = require("fs");
const axios = require("axios");

const query = `
query {
  Page(perPage: 100) {
    media(type: ANIME, sort: POPULARITY_DESC, isAdult: false) {
      title {
        romaji
        native
      }
      type
      status
      episodes
      duration
      averageScore
      genres
      studios(isMain: true) {
        nodes {
          name
        }
      }
      coverImage {
        large
      }
    }
  }
}
`;

const fetchAnime = async () => {
  try {
    const res = await axios.post("https://graphql.anilist.co", { query });
    const animeList = res.data.data.Page.media.map(anime => ({
      title: `${anime.title.romaji} (${anime.title.native})`,
      type: anime.type,
      status: anime.status,
      episodes: anime.episodes,
      duration: anime.duration ? `${anime.duration} Per Ep.` : "Unknown",
      score: anime.averageScore || 0,
      genres: anime.genres,
      studios: anime.studios.nodes.map(n => n.name),
      image: anime.coverImage.large
    }));

    fs.writeFileSync("data/anime.json", JSON.stringify(animeList, null, 2));
    console.log("✅ Anime data updated.");
  } catch (err) {
    console.error("❌ Error fetching data:", err.message);
  }
};

fetchAnime();
