import React from 'react';
import { AbsoluteFill } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import type { Format, VideoConfig } from '../types';
import { TRANSITION_FRAMES, FPS } from '../types';
import { ImageSlide } from '../scenes/ImageSlide';
import { DataScene } from '../scenes/DataScene';

interface SocialVideoProps {
  config: VideoConfig;
  format: Format;
}

export const SocialVideo: React.FC<SocialVideoProps> = ({ config }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#080808', fontFamily: config.brand.fontFamily }}>
      <TransitionSeries>
        {config.scenes.map((scene, index) => (
          <React.Fragment key={index}>
            <TransitionSeries.Sequence durationInFrames={scene.duration * FPS}>
              {scene.type === 'image-slide' ? (
                <ImageSlide scene={scene} brand={config.brand} />
              ) : (
                <DataScene scene={scene} brand={config.brand} />
              )}
            </TransitionSeries.Sequence>

            {index < config.scenes.length - 1 && (
              <TransitionSeries.Transition
                timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
                presentation={fade()}
              />
            )}
          </React.Fragment>
        ))}
      </TransitionSeries>
    </AbsoluteFill>
  );
};
