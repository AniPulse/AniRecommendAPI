<div align="center">
   
# [AniRecommendAPI](https://github.com/AniPulse)

*A serverless REST API to discover anime recommendations — random, genre-based, or format-filtered — powered by AniList.*

[![Anime Count](https://img.shields.io/endpoint?url=https://anirecommend.vercel.app/api/badge)](https://anirecommend.vercel.app/api/badge)


[![Deploy](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://anirecommend.vercel.app)
[![Contributions](https://img.shields.io/badge/Contributions-Welcome-brightgreen)](CONTRIBUTING.md)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

![Last Commit](https://img.shields.io/github/last-commit/Shineii86/AniRecommendAPI?style=for-the-badge)
![Repo Size](https://img.shields.io/github/repo-size/Shineii86/AniRecommendAPI?style=for-the-badge) [![GitHub Stars](https://img.shields.io/github/stars/Shineii86/AniRecommendAPI?style=for-the-badge)](https://github.com/Shineii86/AniRecommendAPI/stargazers) [![GitHub Forks](https://img.shields.io/github/forks/Shineii86/AniRecommendAPI?style=for-the-badge)](https://github.com/Shineii86/AniRecommendAPI/fork)
[![API Status](https://img.shields.io/website?down_color=lightgrey&down_message=offline&label=API%20Status&style=for-the-badge&up_color=green&up_message=online&url=https%3A%2F%2Fanirecommend.vercel.app)](https://anirecommend.vercel.app)

</div>

---

## ✨ Features

- 🎲 Get random anime recommendations
- 🔥 Get anime by `id`
- 🎯 Filter by genre (`/genre?genre=Action`)
- 🖼️ Dual API versions (with or without image)
- 📺 Filter by anime format (`TV`, `MOVIE`, `OVA`, etc.)
- 🧠 Smart scraper with no duplicates
- ☁️ GitHub-based auto JSON store
- 🆓 100% free to deploy on Vercel

---

## 🚀 Quick Start

#### Random anime (without image)
```bash
https://anirecommend.vercel.app/api/v1/random
```

#### Get Action anime (with image)
```bash
https://anirecommend.vercel.app/api/v2/genre?genre=action
```

#### Filter by format (e.g., Movie)
```bash
https://anirecommend.vercel.app/api/v3/format?type=movie
```

#### Filter by both genre and format
```bash
https://anirecommend.vercel.app/api/anime?genre=action&format=tv
```

#### Get anime by ID
```bash
https://anirecommend.vercel.app/api/v1/id?id=27
```

#### Random anime with ID included
```bash
https://anirecommend.vercel.app/api/v1/id
```

Get stats summary
```bash
https://anirecommend.vercel.app/api/stats
```

---

## 🌐 API Endpoints

### Version 1 (Basic, no image)

| Endpoint                     | Description                            |
| ---------------------------- | -------------------------------------- |
| `/api/v1/random`             | Get a random anime                     |
| `/api/v1/genre?genre=Action` | Get a random anime from specific genre |
| `/api/v1/id`                 | Get random anime (with ID)             |
| `/api/v1/id?id=27`           | Get anime by ID                        |

### Version 2 (With image)

| Endpoint                    | Description                   |
| --------------------------- | ----------------------------- |
| `/api/v2/random`            | Random anime with cover image |
| `/api/v2/genre?genre=Drama` | Genre filter with image       |

### Version 3 (By format)

| Endpoint                    | Description                                |
| --------------------------- | ------------------------------------------ |
| `/api/v3/format?type=movie` | Get anime by format (Movie, TV, OVA, etc.) |

### Universal

| Endpoint                               | Description                 |
| -------------------------------------- | --------------------------- |
| `/api/anime?genre=Action&format=Movie` | Get anime with both filters |

### Statistics

| Endpoint           | Description                    |
| ------------------ | ------------------------------ |
| `/api/stats`       | Show genre & format counts     |
| `/api/stats/badge` | JSON badge showing total anime |

---

> [!TIP]
> All query values are case-insensitive (e.g., `action`, `Action`, `ACTION` work the same).


### 🔥 Anime API Endpoints

| Endpoint | Description | Parameters |
|----------|-------------|------------|
| `GET /api/anime?genre={genre}` | Filters anime by specific genre | `genre`: Action, Adventure, Comedy, etc. |
| `GET /api/anime?format={type}` | Filters anime by media type | `format`: TV, Movie, OVA, ONA, Special |
| `GET /api/anime?genre={genre}&format={type}` | Filters by both genre and media type | Combination of above parameters |

---

## 🎯 Supported Genres

| Endpoint for v1 & v2 | Description |  
| :------ | :---------- |  
| `/api/v1/genre?genre=Action` | Returns anime with intense physical combat, battles, or fast-paced plots. |  
| `/api/v1/genre?genre=Adventure` | Features anime centered around exploration, travel, or quests. |  
| `/api/v1/genre?genre=Comedy` | Lighthearted anime focused on humor and funny situations. |  
| `/api/v1/genre?genre=Drama` | Emotional, character-driven stories with serious themes. |  
| `/api/v1/genre?genre=Fantasy` | Anime set in magical worlds or with supernatural elements. |  
| `/api/v1/genre?genre=Horror` | Scary or unsettling anime, often with supernatural threats. |  
| `/api/v1/genre?genre=Mystery` | Anime involving puzzles, secrets, or investigative plots. |  
| `/api/v1/genre?genre=Romance` | Focuses on love stories and romantic relationships. |  
| `/api/v1/genre?genre=Sci-Fi` | Futuristic technology, space travel, or scientific themes. |  
| `/api/v1/genre?genre=Supernatural` | Anime with ghosts, spirits, or otherworldly phenomena. |  
| `/api/v1/genre?genre=Slice of Life` | Everyday life stories with minimal fantastical elements. |  
| `/api/v1/genre?genre=Psychological` | Mind-bending narratives exploring mental states or illusions. |  
| `/api/v1/genre?genre=Ecchi` | Anime with playful, risqué humor and mild fanservice. |  
| `/api/v1/genre?genre=Mecha` | Features giant robots or mechanized suits. |  
| `/api/v1/genre?genre=Thriller` | High-stakes tension, suspense, or danger-driven plots. |  
| `/api/v1/genre?genre=Sports` | Anime centered around competitive sports or athletics. |  
| `/api/v1/genre?genre=Music` | Focuses on musicians, bands, or music-related stories. |  
| `/api/v1/genre?genre=Martial Arts` | Combat-focused anime emphasizing fighting techniques. |  
| `/api/v1/genre?genre=Game` | Anime involving video games, game worlds, or players. |  
| `/api/v1/genre?genre=Shounen` | Targets young male audiences; action-packed or friendship themes. |  
| `/api/v1/genre?genre=Seinen` | Anime for adult men, often darker or more mature. |  
| `/api/v1/genre?genre=Shoujo` | Targets young female audiences; romance or personal growth. |  
| `/api/v1/genre?genre=Josei` | Anime for adult women, often realistic or dramatic. |  
| `/api/v1/genre?genre=Super Power` | Characters with unique abilities or superhuman traits. |  
| `/api/v1/genre?genre=Magic` | Anime where magic is a central element. |  
| `/api/v1/genre?genre=Demons` | Features demons, demon hunters, or underworld themes. |  
| `/api/v1/genre?genre=Historical` | Set in a specific historical period or inspired by real events. |  
| `/api/v1/genre?genre=Military` | Focuses on warfare, soldiers, or military strategy. |  
| `/api/v1/genre?genre=Parody` | Humorous anime that satirizes other works or tropes. |  
| `/api/v1/genre?genre=Police` | Crime-solving, detective work, or law enforcement themes. |  
| `/api/v1/genre?genre=Space` | Set in outer space or involving interstellar travel. |  
| `/api/v1/genre?genre=Vampire` | Anime centered around vampires or vampiric lore. |  

## 📺 Supported Formats

| Endpoint | Description |
| :------ | :---------- |
| `/api/v3/format?type=TV` | **TV Series** - Episodic anime aired on television with standard episode lengths (20-24 mins). |
| `/api/v3/format?type=MOVIE` | **Movie** - Feature-length anime films (typically 60+ mins), often with cinematic production quality. |
| `/api/v3/format?type=OVA` | **Original Video Animation** - Direct-to-video releases, often higher-budget or experimental (1-6 episodes). |
| `/api/v3/format?type=ONA` | **Original Net Animation** - Web-distributed anime, usually shorter or with unconventional formats. |
| `/api/v3/format?type=SPECIAL` | **Special** - Bonus content (recaps, shorts, or side stories) tied to existing series. |

**Example Request:**  

GET `/api/v3/format?type=MOVIE`

## 📦 Sample Response

```json
{
  "id": 42,
  "title": "Demon Slayer (鬼滅の刃)",
  "description": "Tanjiro Kamado is a kindhearted boy...",
  "type": "ANIME",
  "status": "FINISHED",
  "format": "TV",
  "episodes": 26,
  "duration": "24 Per Ep.",
  "score": 85,
  "genres": ["Action", "Supernatural", "Fantasy"],
  "studios": ["ufotable"],
  "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922.jpg"
}
```

---

 ## 🛠️ Deployment Guide

### Step 1: Fork the Repo

1. Visit: [https://github.com/Shineii86/AniRecommendAPI](https://github.com/Shineii86/AniRecommendAPI)
2. Click the `Fork` button

### Step 2: Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FShineii86%2Fanirecommendapi)

1. Select your forked repo
2. Set the Environment Variable:
🔐 Environment Variables

Set these on [Vercel](https://vercel.com) → Project → Settings → Environment Variables:

| Key       | Value             | Description                         |
| --------- | ----------------- | ----------------------------------- |
| `GH_PAT`  | Your GitHub token | Allows writing to `data/anime.json` |
| `API_KEY` | `API KEY` | Secures `/api/scrape` route|

4. Deploy

---

## 🧠 Example JSON Response

```json
{
  "id": 42,
  "title": "Demon Slayer (鬼滅の刃)",
  "type": "ANIME",
  "format": "TV",
  "status": "FINISHED",
  "episodes": 26,
  "duration": "24 Per Ep.",
  "score": 85,
  "genres": ["Action", "Supernatural", "Fantasy"],
  "studios": ["ufotable"],
  "description": "A young boy becomes a demon slayer...",
  "creator": "Shinei Nouzen",
  "github": "https://github.com/Shineii86",
  "telegram": "https://telegran.me/Shineii86",
  "message": "Build with ❤️ by Shinei Nouzen",
  "timestamp": "14/7/2025, 11:57:00 pm"
}
```

---

## 📊 Sample Stats (`/api/stats`)

```json
{
  "formats": {
    "TV": 35,
    "MOVIE": 20,
    "OVA": 5,
    "ONA": 10,
    "SPECIAL": 10
  },
  "genres": {
    "Action": 25,
    "Fantasy": 18,
    "Romance": 10,
    "Drama": 7,
    "Comedy": 12
  },
  "total": 80
}
```

---

# Roadmap

## ✅ Completed
- /api/v1, /v2, /v3 with genre + format support
- GitHub Auto Update with GH_PAT
- Vercel Deployment
- API Key Security

## 🚀 Coming Soon
- 🔍 /api/v3/search?title=Naruto
- 📊 /api/stats with genres + formats
- 📄 /api/v3/all?page=1&limit=50
- 📌 /api/docs with Swagger Playground
- 🔑 Rate-limiting by IP (via Upstash)

## 🧠 Ideas
- Anime quiz API using this dataset
- Top-rated anime /api/v3/top
- Suggest-anime endpoint (/suggest)
- Telegram bot version

--- 

## 📬 Support

* Issues: [GitHub Issues](https://github.com/Shineii86/AniRecommendAPI/issues)

## 🪪 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💕 Loved My Work?
🚨 [Follow me on GitHub](https://github.com/Shineii86/Shineii86)

⭐ [Give a star to this project](https://github.com/Shineii86/AniRecommendAPI/)

<a href="https://github.com/Shineii86/AniRecommendAPI">
<img src="https://github.com/Shineii86/AniPay/blob/main/Source/Banner6.png" alt="Banner">
</a>

## ☎️ Contact

<div align="center">
  
  *For inquiries or collaborations*
     
[![Telegram Badge](https://img.shields.io/badge/-Telegram-2CA5E0?style=flat&logo=Telegram&logoColor=white)](https://telegram.me/Shineii86 "Contact on Telegram")
[![Instagram Badge](https://img.shields.io/badge/-Instagram-C13584?style=flat&logo=Instagram&logoColor=white)](https://instagram.com/ikx7.a "Follow on Instagram")
[![Pinterest Badge](https://img.shields.io/badge/-Pinterest-E60023?style=flat&logo=Pinterest&logoColor=white)](https://pinterest.com/ikx7a "Follow on Pinterest")
[![Gmail Badge](https://img.shields.io/badge/-Gmail-D14836?style=flat&logo=Gmail&logoColor=white)](mailto:ikx7a@hotmail.com "Send an Email")

  <sup><b>Copyright © 2025 <a href="https://telegram.me/Shineii86">Shinei Nouzen</a> All Rights Reserved</b></sup>

</div>
