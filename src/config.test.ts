import { describe, it, expect } from 'vitest';
import { getTotalDurationInFrames } from './config';
import type { VideoConfig } from './types';

const twoSceneConfig: VideoConfig = {
  title: 'Test',
  brand: { logo: 'public/logo.png', primaryColor: '#C8FF00', fontFamily: 'Bebas Neue' },
  scenes: [
    { type: 'image-slide', image: 'public/img.jpg', headline: 'Hi', subtext: 'Sub', duration: 3 },
    { type: 'data-scene', stat: 1000, label: 'Views', duration: 4 },
  ],
  formats: ['tiktok'],
};

describe('getTotalDurationInFrames', () => {
  it('subtracts transition overlap between scenes', () => {
    // 3s + 4s = 210 frames, minus 1 transition (15 frames) = 195
    expect(getTotalDurationInFrames(twoSceneConfig, 30)).toBe(195);
  });

  it('returns full frames for a single scene (no transitions)', () => {
    const single: VideoConfig = { ...twoSceneConfig, scenes: [twoSceneConfig.scenes[0]] };
    expect(getTotalDurationInFrames(single, 30)).toBe(90);
  });

  it('handles three scenes with two transitions', () => {
    const three: VideoConfig = {
      ...twoSceneConfig,
      scenes: [
        { type: 'image-slide', image: 'public/a.jpg', headline: 'A', subtext: '', duration: 2 },
        { type: 'data-scene', stat: 500, label: 'Stat', duration: 3 },
        { type: 'image-slide', image: 'public/b.jpg', headline: 'B', subtext: '', duration: 2 },
      ],
    };
    // (2+3+2)*30 = 210, minus 2*15 = 180
    expect(getTotalDurationInFrames(three, 30)).toBe(180);
  });
});
