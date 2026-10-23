# remotion-social

Turn one JSON file into branded social videos for TikTok, YouTube and Instagram.

Built with [Remotion](https://www.remotion.dev/) and TypeScript. You describe the video in `video.config.json` (logo, brand colour, font, scenes) and it renders an MP4 in every format you need.

## Formats

| Format | Size |
|---|---|
| TikTok | 1080 x 1920 (vertical) |
| YouTube | 1920 x 1080 (landscape) |
| Instagram | 1080 x 1080 (square) |

## Scene types

- **image-slide**: an image with a headline and subtext.
- **data-scene**: a big animated number counting up, with a label. Good for stats.

Scenes play in order with transitions between them. Each scene sets its own duration in seconds.

## Getting started

Requires Node.js 18+.

```bash
npm install
npm run studio     # preview and edit in Remotion Studio
npm run render     # render every format in video.config.json
```

Render one format only:

```bash
npm run render -- --format=tiktok
```

Videos are saved to the `out/` folder.

## Example config

```json
{
  "title": "My Brand Video",
  "brand": {
    "logo": "public/logo.png",
    "primaryColor": "#C8FF00",
    "fontFamily": "Bebas Neue"
  },
  "scenes": [
    { "type": "image-slide", "image": "public/logo.png", "headline": "BUILD YOUR EMPIRE", "subtext": "// the grind starts here", "duration": 3 },
    { "type": "data-scene", "stat": 1200000, "label": "Monthly Views", "duration": 4 }
  ],
  "formats": ["tiktok", "youtube", "instagram"]
}
```

## Tests

```bash
npm test
```

## Project structure

```
src/
  compositions/   The main video, one per format
  scenes/         ImageSlide and DataScene
  components/     Logo and AnimatedNumber
  config.ts       Loads and validates video.config.json
render.ts         Renders the videos from the command line
```

## Author

Built by [Nick Johnson](https://github.com/nickj456).
