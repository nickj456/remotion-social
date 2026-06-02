import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

interface AnimatedNumberProps {
  value: number;
  color?: string;
  fontSize?: number;
  showPrefix?: boolean;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  color = '#C8FF00',
  fontSize = 160,
  showPrefix = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Prefix "+" appears at frame 0 with a quick scale-in
  const prefixScale = spring({
    frame,
    fps,
    config: { damping: 80, stiffness: 300 },
    durationInFrames: Math.round(fps * 0.3),
  });

  // Number counts up over 2 seconds
  const progress = spring({
    frame: Math.max(0, frame - Math.round(fps * 0.2)),
    fps,
    config: { damping: 200, stiffness: 60 },
    durationInFrames: Math.round(fps * 2),
  });

  // Progress bar fill — follows the number progress
  const barWidth = interpolate(progress, [0, 1], [0, 100]);

  const displayValue = Math.round(interpolate(progress, [0, 1], [0, value]));
  const formatted = displayValue.toLocaleString();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      {/* Number row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 4 }}>
        {showPrefix && (
          <span
            style={{
              fontSize: fontSize * 0.45,
              fontWeight: 700,
              color,
              fontFamily: 'Bebas Neue, sans-serif',
              transform: `scale(${prefixScale})`,
              transformOrigin: 'bottom left',
              marginTop: fontSize * 0.08,
              letterSpacing: '0.02em',
              opacity: prefixScale,
            }}
          >
            +
          </span>
        )}
        <span
          style={{
            fontSize,
            fontWeight: 400,
            color,
            fontFamily: 'Bebas Neue, sans-serif',
            lineHeight: 0.9,
            letterSpacing: '-0.01em',
          }}
        >
          {formatted}
        </span>
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: 240,
          height: 3,
          backgroundColor: 'rgba(200, 255, 0, 0.15)',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${barWidth}%`,
            height: '100%',
            backgroundColor: color,
            borderRadius: 2,
            boxShadow: `0 0 8px ${color}`,
          }}
        />
      </div>
    </div>
  );
};
