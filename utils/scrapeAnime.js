export async function scrapeAnime(slugOrId = "demon-slayer") {
  const query = `
    query ($search: String) {
      Media(search: $search, type: ANIME) {
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
        studios { nodes { name } }
        coverImage { large }
      }
    }
  `;

  const variables = { search: slugOrId };

  const res = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  const { data } = await res.json();
  const anime = data.Media;

  return {
    title: `${anime.title.romaji} (${anime.title.native})`,
    type: anime.type,
    status: anime.status,
    episodes: anime.episodes,
    duration: anime.duration + " Per Ep.",
    score: anime.averageScore,
    genres: anime.genres,
    studios: anime.studios.nodes.map((s) => s.name),
    image: anime.coverImage.large,
    creator: "Shinei Nouzen",
    github: "https://github.com/Shineii86",
    telegram: "https://telegran.me/Shineii86",
    message: "Build with ❤️ by Shinei Nouzen",
    timestamp: new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: true,
    }),
  };
}
