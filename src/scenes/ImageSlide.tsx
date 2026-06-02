import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import type { Brand, ImageSlideScene } from '../types';
import { Logo } from '../components/Logo';

interface ImageSlideProps {
  scene: ImageSlideScene;
  brand: Brand;
}

export const ImageSlide: React.FC<ImageSlideProps> = ({ scene, brand }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Image: fade in + subtle scale from 1.04 to 1.0 (Ken Burns feel)
  const imageOpacity = interpolate(frame, [0, Math.round(fps * 0.4)], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const imageScale = interpolate(frame, [0, Math.round(fps * 3)], [1.04, 1.0], {
    extrapolateRight: 'clamp',
  });

  // Accent bar: slides in from left
  const accentBarWidth = spring({
    frame: Math.max(0, frame - Math.round(fps * 0.3)),
    fps,
    config: { damping: 120, stiffness: 200 },
    durationInFrames: Math.round(fps * 0.5),
  });
  const accentBarPercent = interpolate(accentBarWidth, [0, 1], [0, 100]);

  // Headline: slides up + scales in
  const headlineDelay = Math.round(fps * 0.5);
  const headlineProgress = spring({
    frame: Math.max(0, frame - headlineDelay),
    fps,
    config: { damping: 100, stiffness: 180 },
    durationInFrames: Math.round(fps * 0.5),
  });
  const headlineY = interpolate(headlineProgress, [0, 1], [32, 0]);
  const headlineOpacity = headlineProgress;
  const headlineScale = interpolate(headlineProgress, [0, 1], [0.94, 1.0]);

  // Subtext: fades in after headline
  const subtextOpacity = interpolate(
    frame,
    [Math.round(fps * 0.9), Math.round(fps * 1.3)],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const imageSrc = staticFile(scene.image.replace('public/', ''));

  return (
    <AbsoluteFill style={{ backgroundColor: '#080808', overflow: 'hidden' }}>
      {/* Background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${imageScale})`,
          transformOrigin: 'center center',
        }}
      >
        <Img
          src={imageSrc}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: imageOpacity,
          }}
        />
      </div>

      {/* Deep vignette overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(8,8,8,0.96) 0%, rgba(8,8,8,0.5) 45%, rgba(8,8,8,0.15) 100%)',
        }}
      />

      {/* Bottom text block */}
      <div
        style={{
          position: 'absolute',
          bottom: 110,
          left: 48,
          right: 48,
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            width: `${accentBarPercent}%`,
            height: 4,
            backgroundColor: '#C8FF00',
            borderRadius: 2,
            marginBottom: 20,
            boxShadow: '0 0 12px rgba(200, 255, 0, 0.6)',
          }}
        />

        {/* Headline */}
        <div
          style={{
            fontSize: 88,
            fontFamily: 'Bebas Neue, sans-serif',
            fontWeight: 400,
            color: '#FFFFFF',
            lineHeight: 0.92,
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px) scale(${headlineScale})`,
            transformOrigin: 'left bottom',
          }}
        >
          {scene.headline}
        </div>

        {/* Subtext */}
        <div
          style={{
            fontSize: 28,
            fontFamily: 'IBM Plex Mono, monospace',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.65)',
            marginTop: 18,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            opacity: subtextOpacity,
          }}
        >
          {scene.subtext}
        </div>
      </div>

      <Logo src={brand.logo} />
    </AbsoluteFill>
  );
};
