import fs from 'fs';
import type { VideoConfig } from './types';
import { TRANSITION_FRAMES } from './types';

export function loadConfig(filePath: string): VideoConfig {
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as VideoConfig;
}

export function getTotalDurationInFrames(config: VideoConfig, fps: number): number {
  const sceneFrames = config.scenes.reduce((sum, scene) => sum + scene.duration * fps, 0);
  const transitionOverlap = Math.max(0, config.scenes.length - 1) * TRANSITION_FRAMES;
  return sceneFrames - transitionOverlap;
}
