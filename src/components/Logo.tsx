import React from 'react';
import { Img, staticFile } from 'remotion';

interface LogoProps {
  src: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ src, size = 56 }) => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 36,
        left: 40,
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: 8,
          overflow: 'hidden',
          border: '2px solid rgba(200, 255, 0, 0.4)',
          boxShadow: '0 0 16px rgba(200, 255, 0, 0.2)',
        }}
      >
        <Img
          src={staticFile(src.replace('public/', ''))}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    </div>
  );
};
