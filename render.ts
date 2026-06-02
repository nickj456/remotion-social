import path from 'path';
import fs from 'fs';
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import { loadConfig } from './src/config';
import type { Format } from './src/types';
import { FORMAT_DIMENSIONS } from './src/types';

const ALL_FORMATS: Format[] = ['tiktok', 'youtube', 'instagram'];

async function main() {
  const formatArg =
    process.argv.find((a) => a.startsWith('--format='))?.replace('--format=', '') ?? 'all';

  const config = loadConfig('video.config.json');

  const formats: Format[] =
    formatArg === 'all' ? config.formats : [formatArg as Format];

  const invalidFormats = formats.filter((f) => !ALL_FORMATS.includes(f));
  if (invalidFormats.length > 0) {
    console.error(`Invalid formats: ${invalidFormats.join(', ')}. Valid: ${ALL_FORMATS.join(', ')}`);
    process.exit(1);
  }

  fs.mkdirSync('out', { recursive: true });

  console.log('Bundling project...');
  const bundleDir = await bundle({
    entryPoint: path.resolve('./src/index.ts'),
    webpackOverride: (cfg) => cfg,
  });

  for (const format of formats) {
    const compositionId = `SocialVideo-${format}`;
    const { width, height } = FORMAT_DIMENSIONS[format];

    console.log(`\nRendering ${format} (${width}x${height})...`);

    const composition = await selectComposition({
      serveUrl: bundleDir,
      id: compositionId,
      inputProps: { config, format },
    });

    const slug = config.title.toLowerCase().replace(/\s+/g, '-');
    const outputLocation = path.join('out', `${slug}-${format}.mp4`);

    await renderMedia({
      composition,
      serveUrl: bundleDir,
      codec: 'h264',
      outputLocation,
      inputProps: { config, format },
    });

    console.log(`✓ ${format}: ${outputLocation}`);
  }

  console.log('\nAll done!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
