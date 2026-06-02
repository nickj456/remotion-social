import React from 'react';
import { Composition } from 'remotion';
import { SocialVideo } from './compositions/SocialVideo';
import { getTotalDurationInFrames } from './config';
import { FORMAT_DIMENSIONS, FPS } from './types';
import type { Format, VideoConfig } from './types';

const DEFAULT_CONFIG: VideoConfig = {
  title: 'My Brand Video',
  brand: { logo: 'public/logo.png', primaryColor: '#C8FF00', fontFamily: 'Bebas Neue' },
  scenes: [
    { type: 'image-slide', image: 'public/logo.png', headline: 'YOUR BRAND', subtext: 'Edit video.config.json', duration: 3 },
    { type: 'data-scene', stat: 1000000, label: 'Views', duration: 4 },
  ],
  formats: ['tiktok', 'youtube', 'instagram'],
};

const config = DEFAULT_CONFIG;
const durationInFrames = getTotalDurationInFrames(config, FPS);

const FORMATS: Format[] = ['tiktok', 'youtube', 'instagram'];

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {FORMATS.map((format) => {
        const { width, height } = FORMAT_DIMENSIONS[format];
        return (
          <Composition
            key={format}
            id={`SocialVideo-${format}`}
            component={SocialVideo}
            width={width}
            height={height}
            fps={FPS}
            durationInFrames={durationInFrames}
            defaultProps={{ config, format }}
          />
        );
      })}
    </>
  );
};
