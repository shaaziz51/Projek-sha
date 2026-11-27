import React, { useEffect, useState } from 'react';
import { AbsoluteFill, Audio, Sequence, continueRender, delayRender, staticFile } from 'remotion';
import '@fontsource/nunito/700.css';
import '@fontsource/nunito/800.css';
import '@fontsource/nunito/900.css';
import { CUTS, PRODUCTS, ProductContext } from './copy';
import { S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12 } from './scenes';

const SCENES = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12];

export const Ad: React.FC<{ product: string }> = ({ product }) => {
  const P = PRODUCTS.find((p) => p.id === product) ?? PRODUCTS[0];
  // fonts must be loaded before anything renders: text fitting measures them
  const [handle] = useState(() => delayRender('fonts'));
  const [ready, setReady] = useState(false);
  useEffect(() => {
    Promise.all(['700', '800', '900'].map((w) => document.fonts.load(`${w} 80px Nunito`)))
      .catch(() => undefined)
      .then(() => setReady(true));
  }, []);
  useEffect(() => {
    if (ready) continueRender(handle);
  }, [ready, handle]);
  if (!ready) return null;
  return (
    <ProductContext.Provider value={P}>
      <AbsoluteFill style={{ background: '#000' }}>
        {SCENES.map((Scene, i) => (
          <Sequence key={i} from={CUTS[i]} durationInFrames={CUTS[i + 1] - CUTS[i]} name={`shot ${i + 1}`}>
            <Scene />
          </Sequence>
        ))}
        <Audio src={staticFile('audio/music.wav')} volume={0.8} />
        <Audio src={staticFile('audio/sfx.wav')} volume={0.9} />
      </AbsoluteFill>
    </ProductContext.Provider>
  );
};
