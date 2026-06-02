import type { VideoConfig } from './types';
import { TRANSITION_FRAMES } from './types';

export function getTotalDurationInFrames(config: VideoConfig, fps: number): number {
  const sceneFrames = config.scenes.reduce((sum, scene) => sum + scene.duration * fps, 0);
  const transitionOverlap = Math.max(0, config.scenes.length - 1) * TRANSITION_FRAMES;
  return sceneFrames - transitionOverlap;
}
