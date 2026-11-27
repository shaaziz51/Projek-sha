import React from 'react';
import { AbsoluteFill, Easing, Img, interpolate, staticFile } from 'remotion';
import { fitText } from '@remotion/layout-utils';
import { useProduct } from './copy';

export const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
export const WHITE = '#ffffff';

/** 0 → 1 between frames a and b with an ease */
export const ramp = (f: number, a: number, b: number, ease = Easing.out(Easing.cubic)) =>
  interpolate(f, [a, b], [0, 1], { ...clamp, easing: ease });

/** overshooting pop: 0 → 1 with a little bounce */
export const pop = (f: number, a: number, b: number) => ramp(f, a, b, Easing.out(Easing.back(1.8)));

export const FONT = 'Nunito, sans-serif';

/** largest size ≤ size at which text fits in maxWidth (fonts are loaded before frames render) */
export const fit = (text: string, size: number, weight = 900, maxWidth = 1000) =>
  Math.min(size, fitText({ text, withinWidth: maxWidth, fontFamily: 'Nunito', fontWeight: String(weight), letterSpacing: '-1px' }).fontSize);

export const Text: React.FC<{
  children: React.ReactNode;
  size: number;
  weight?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({ children, size, weight = 900, color, style }) => {
  const P = useProduct();
  return (
    <div
      style={{
        fontFamily: FONT,
        fontWeight: weight,
        fontSize: size,
        lineHeight: 1,
        color: color ?? P.colors.text,
        whiteSpace: 'nowrap',
        letterSpacing: -1,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** centred line of text at a given y (centre); a string line shrinks to fit the frame unless noFit */
export const Line: React.FC<{
  y: number;
  size: number;
  children: React.ReactNode;
  x?: number;
  weight?: number;
  color?: string;
  noFit?: boolean;
  maxWidth?: number;
  style?: React.CSSProperties;
}> = ({ y, size, children, x = 540, weight = 900, color, noFit, maxWidth = 1000, style }) => {
  const s = !noFit && typeof children === 'string' ? fit(children, size, weight, maxWidth) : size;
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: 'translate(-50%, -50%)', ...style }}>
      <Text size={s} weight={weight} color={color}>
        {children}
      </Text>
    </div>
  );
};

export const Pic: React.FC<{
  src: string;
  x: number;
  y: number;
  w: number;
  rot?: number;
  scale?: number;
  opacity?: number;
  style?: React.CSSProperties;
}> = ({ src, x, y, w, rot = 0, scale = 1, opacity = 1, style }) => (
  <Img
    src={staticFile(src)}
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: w,
      transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${scale})`,
      opacity,
      ...style,
    }}
  />
);

/** faint leaf line art, the counterpart of the original's orange line art */
const LeafOutline: React.FC<{ x: number; y: number; s: number; r: number; color: string }> = ({ x, y, s, r, color }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} fill="none" stroke={color} strokeWidth={3}>
    <path d="M0 -100 C 55 -60 60 40 0 100 C -60 40 -55 -60 0 -100 Z" />
    <path d="M0 -95 L0 95" />
    {[-60, -30, 0, 30, 60].map((yy) => (
      <g key={yy}>
        <path d={`M0 ${yy} Q 22 ${yy - 14} 36 ${yy - 30}`} />
        <path d={`M0 ${yy} Q -22 ${yy - 14} -36 ${yy - 30}`} />
      </g>
    ))}
  </g>
);

const LEAVES: [number, number, number, number][] = [
  [140, 260, 1.3, -30], [900, 180, 1.1, 40], [980, 760, 1.4, 15], [120, 1000, 1.2, 60],
  [860, 1320, 1.5, -50], [260, 1650, 1.1, 20], [620, 1820, 1.0, -15], [560, 520, 0.9, 75],
];

export const Background: React.FC<{ pattern?: boolean; children?: React.ReactNode }> = ({ pattern, children }) => {
  const { colors: c } = useProduct();
  return (
    <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 45%, ${c.bgIn} 0%, ${c.bgMid} 45%, ${c.bgOut} 100%)` }}>
      {pattern ? (
        <svg width={1080} height={1920} style={{ position: 'absolute', opacity: 0.32 }}>
          {LEAVES.map(([x, y, s, r], i) => (
            <LeafOutline key={i} x={x} y={y} s={s} r={r} color={c.line} />
          ))}
        </svg>
      ) : null}
      {children}
    </AbsoluteFill>
  );
};

/** duotone tint used on the original's live-action gym shots (mustard there, brand colour here) */
export const Tint: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { colors: c } = useProduct();
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ filter: 'grayscale(1) contrast(0.9) brightness(1.45)' }}>{children}</AbsoluteFill>
      <AbsoluteFill style={{ background: c.tint, mixBlendMode: 'multiply' }} />
      <AbsoluteFill style={{ background: c.tintLift }} />
    </AbsoluteFill>
  );
};

/** text with a stuttering offset echo, like the original's "Tasty / Instant Energy" */
export const EchoText: React.FC<{ f: number; y: number; size: number; lines: string[] }> = ({ f, y, size, lines }) => {
  const jitter = f < 6 ? [18, -10, 12, -6, 8, 0][f] : 0;
  const echo = f < 6 ? 1 : interpolate(f, [6, 9], [1, 0.0], clamp);
  const s = Math.min(...lines.map((l) => fit(l, size)));
  return (
    <>
      {lines.map((l, i) => (
        <React.Fragment key={l + i}>
          <Line y={y + i * s * 0.95} size={s} color={WHITE} style={{ opacity: echo, marginLeft: jitter + 6, marginTop: 6 }}>
            {l}
          </Line>
          <Line y={y + i * s * 0.95} size={s} style={{ marginLeft: -jitter / 3 }}>
            {l}
          </Line>
        </React.Fragment>
      ))}
    </>
  );
};
