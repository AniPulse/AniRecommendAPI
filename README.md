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

### Version 1 (Basic, No Image)

| Endpoint                     | Description                            |
| ---------------------------- | -------------------------------------- |
| `/api/v1/random`             | Get a random anime                     |
| `/api/v1/genre?genre=Action` | Get a random anime from specific genre |
| `/api/v1/id`                 | Get random anime (with ID)             |
| `/api/v1/id?id=27`           | Get anime by ID                        |

### Version 2 (With Image)

| Endpoint                    | Description                   |
| --------------------------- | ----------------------------- |
| `/api/v2/random`            | Random anime with cover image |
| `/api/v2/genre?genre=Drama` | Genre filter with image       |

### Version 3 (By Format)

| Endpoint                    | Description                                |
| --------------------------- | ------------------------------------------ |
| `/api/v3/format?type=movie` | Get anime by format (Movie, TV, OVA, etc.) |

### <s>Version 4 (Advanced Filters)

The `/api/v4` endpoints support advanced filtering by season, year, score, format, adult content, source, and genre.

#### `/api/v4/filter`

**Returns a random anime matching all query parameters.**

#### Supported Query Parameters:
| Parameter   | Type     | Example           | Description                              |
|-------------|----------|-------------------|------------------------------------------|
| `season`    | String   | `SPRING`          | Anime season (SPRING, SUMMER, FALL, WINTER) |
| `year`      | Integer  | `2020`            | Year the anime aired                     |
| `score`     | Integer  | `80`              | Minimum average score                    |
| `adult`     | Boolean  | `true` / `false`  | Include adult (hentai) anime             |
| `source`    | String   | `MANGA`           | Source material (e.g., MANGA, LIGHT_NOVEL) |
| `format`    | String   | `MOVIE`           | Format (TV, MOVIE, ONA, OVA, SPECIAL)    |
| `genre`     | String   | `Action`          | Genre name (case-insensitive)            |


```bash
GET /api/v4/filter?season=SPRING&year=2020&score=75&adult=false
```
```bash
GET /api/v4/filter?genre=Action&source=MANGA&format=TV
```
</s>

---

### Universal

| Endpoint                               | Description                 |
| -------------------------------------- | --------------------------- |
| `/api/anime?genre=Action&format=Movie` | Get anime with both filters |

---

### 🔥 Anime API Endpoints

| Endpoint | Description | Parameters |
|----------|-------------|------------|
| `GET /api/anime?genre={genre}` | Filters anime by specific genre | `genre`: Action, Adventure, Comedy, etc. |
| `GET /api/anime?format={type}` | Filters anime by media type | `format`: TV, Movie, OVA, ONA, Special |
| `GET /api/anime?genre={genre}&format={type}` | Filters by both genre and media type | Combination of above parameters |

> [!TIP]
> All query values are case-insensitive (e.g., `action`, `Action`, `ACTION` work the same).

---

### Statistics

| Endpoint           | Description                    |
| ------------------ | ------------------------------ |
| `/api/stats`       | Show genre & format counts     |
| `/api/stats/badge` | JSON badge showing total anime |

#### 📊 Sample Stats (`/api/stats`)

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

## 📦 Sample Response

```json
{
  "id": 102,
  "title": "Jujutsu Kaisen (呪術廻戦)",
  "description": "A boy fights cursed spirits after eating a special finger...",
  "type": "ANIME",
  "format": "TV",
  "status": "FINISHED",
  "episodes": 24,
  "duration": "23 Per Ep.",
  "score": 88,
  "genres": ["Action", "Supernatural", "Shounen"],
  "studios": ["MAPPA"],
  "season": "FALL",
  "seasonYear": 2020,
  "isAdult": false,
  "source": "MANGA",
  "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx116588-xyz.jpg",
  "creator": "Shinei Nouzen",
  "github": "https://github.com/Shineii86",
  "telegram": "https://telegran.me/Shineii86",
  "message": "Build with ❤️ by Shinei Nouzen",
  "timestamp": "23/03/2023, 01:04:03 pm"
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
