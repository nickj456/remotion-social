import fs from 'fs';
import type { VideoConfig } from './types';

export function loadConfig(filePath: string): VideoConfig {
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as VideoConfig;
}
