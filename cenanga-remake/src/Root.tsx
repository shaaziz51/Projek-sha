import React from 'react';
import { Composition } from 'remotion';
import { Cenanga } from './Cenanga';
import { DURATION, FPS, H, W } from './copy';

export const Root: React.FC = () => (
  <Composition id="Cenanga" component={Cenanga} durationInFrames={DURATION} fps={FPS} width={W} height={H} />
);
