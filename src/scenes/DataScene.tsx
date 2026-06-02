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
import type { Brand, DataSceneConfig } from '../types';
import { AnimatedNumber } from '../components/AnimatedNumber';
import { Logo } from '../components/Logo';

interface DataSceneProps {
  scene: DataSceneConfig;
  brand: Brand;
}

export const DataScene: React.FC<DataSceneProps> = ({ scene, brand }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Icon: scale in from 0
  const iconScale = spring({
    frame,
    fps,
    config: { damping: 90, stiffness: 280 },
    durationInFrames: Math.round(fps * 0.5),
  });

  // Label: slides up after the number starts
  const labelDelay = Math.round(fps * 2.2);
  const labelProgress = spring({
    frame: Math.max(0, frame - labelDelay),
    fps,
    config: { damping: 120, stiffness: 200 },
    durationInFrames: Math.round(fps * 0.4),
  });
  const labelY = interpolate(labelProgress, [0, 1], [20, 0]);
  const labelOpacity = labelProgress;

  // Subtle background grid lines for depth (decorative)
  const bgOpacity = interpolate(frame, [0, Math.round(fps * 0.6)], [0, 0.06], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#080808',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 0,
        overflow: 'hidden',
      }}
    >
      {/* Decorative radial glow behind number */}
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,255,0,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Icon (optional) */}
      {scene.icon && (
        <div
          style={{
            marginBottom: 24,
            transform: `scale(${iconScale})`,
            opacity: iconScale,
          }}
        >
          <Img
            src={staticFile(scene.icon.replace('public/', ''))}
            style={{
              width: 100,
              height: 100,
              objectFit: 'contain',
              filter: 'brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(35deg)',
            }}
          />
        </div>
      )}

      {/* Animated stat number */}
      <AnimatedNumber
        value={scene.stat}
        color="#C8FF00"
        fontSize={160}
        showPrefix={true}
      />

      {/* Label */}
      <div
        style={{
          marginTop: 28,
          opacity: labelOpacity,
          transform: `translateY(${labelY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontFamily: 'IBM Plex Mono, monospace',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}
        >
          {scene.label}
        </div>
      </div>

      <Logo src={brand.logo} />
    </AbsoluteFill>
  );
};
