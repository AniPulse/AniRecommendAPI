# AniRecommendAPI

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FShineii86%2Fanirecommendapi)

> REST API for discovering random anime recommendations

## Features ✨
- Get random anime recommendations
- Filter by genre
- Dual API versions (with/without images)
- Auto-updated anime database
- Serverless architecture
- Free to deploy

## Quick Start 🚀
```bash
# Get random anime (v2 with image)
curl https://anirecommend.vercel.app/api/v2/random

# Get action genre anime (v1)
curl https://anirecommend.vercel.app/api/v1/genre?genre=action
```

## API Endpoints 🌐
| Version | Endpoint                   | Description                |
|---------|----------------------------|----------------------------|
| v1      | `/api/v1/random`           | Random anime (no image)    |
| v1      | `/api/v1/genre?genre={name}`| Genre-specific (no image) |
| v2      | `/api/v2/random`           | Random anime (with image) |
| v2      | `/api/v2/genre?genre={name}`| Genre-specific (with image)|

## Deployment Guide 🛠️

### Step 1: Fork Repository
1. Click "Fork" at top-right of [GitHub repository](https://github.com/Shineii86/anime-recommend-api)
2. Select your account as destination

### Step 2: Deploy to Vercel
1. Click this button:  
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fshineii86%2Fanirecommendapi)
2. Sign in with GitHub account
3. Select your forked repository
4. Click "Deploy"

### Step 3: Verify Deployment
1. Visit `https://your-project-name.vercel.app/api/v2/random`
2. You should see JSON data for a random anime

### Step 4 (Optional): Configure GitHub Actions
1. In your repository, go to Settings → Actions → General
2. Under "Workflow permissions", select "Read and write permissions"
3. Click "Save"

Your API is now live! 🎉

## Customization 🔧
- Modify `scripts/fetchFromAniList.js` to change data fetching:
  - Adjust `perPage` for more results
  - Change sorting criteria
  - Modify fields selection
- Edit API handlers in `api/` directories to:
  - Change response format
  - Add new metadata
  - Modify filtering logic

## Examples 🌟
```json
{
  "title": "Demon Slayer (鬼滅の刃)",
  "type": "ANIME",
  "status": "FINISHED",
  "episodes": 26,
  "duration": "24 Per Ep.",
  "score": 85,
  "genres": ["Action", "Supernatural", "Fantasy"],
  "studios": ["ufotable"],
  "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-PEn1CTc93blC.jpg",
  "creator": "Shinei Nouzen",
  "github": "https://github.com/Shineii86",
  "telegram": "https://telegran.me/Shineii86",
  "message": "Build with ❤️ by Shinei Nouzen",
  "timestamp": "2025-07-12 14:30:45"
}
```

## Support 💬
For issues and feature requests:
- [Open GitHub Issue](https://github.com/Shineii86/anime-recommend-api/issues)
- Contact via [Telegram](https://telegran.me/Shineii86)

## License 📄
This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.
