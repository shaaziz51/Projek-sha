import React from 'react';
import { Composition } from 'remotion';
import { Ad } from './Ad';
import { DURATION, FPS, H, PRODUCTS, W } from './copy';

// One composition per product: "Cenanga", "Putik".
export const Root: React.FC = () => (
  <>
    {PRODUCTS.map((p) => (
      <Composition key={p.id} id={p.id} component={Ad} defaultProps={{ product: p.id }}
        durationInFrames={DURATION} fps={FPS} width={W} height={H} />
    ))}
  </>
);
