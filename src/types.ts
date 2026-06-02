export type Format = 'tiktok' | 'youtube' | 'instagram';

export interface Brand {
  logo: string;
  primaryColor: string;
  fontFamily: string;
}

export interface ImageSlideScene {
  type: 'image-slide';
  image: string;
  headline: string;
  subtext: string;
  duration: number;
}

export interface DataSceneConfig {
  type: 'data-scene';
  stat: number;
  label: string;
  icon?: string;
  duration: number;
}

export type Scene = ImageSlideScene | DataSceneConfig;

export interface VideoConfig {
  title: string;
  brand: Brand;
  scenes: Scene[];
  formats: Format[];
}

export const TRANSITION_FRAMES = 15;
export const FPS = 30;

export const FORMAT_DIMENSIONS: Record<Format, { width: number; height: number }> = {
  tiktok:    { width: 1080, height: 1920 },
  youtube:   { width: 1920, height: 1080 },
  instagram: { width: 1080, height: 1080 },
};
