import React from 'react';
import { AbsoluteFill, Easing, Img, OffthreadVideo, interpolate, random, staticFile, useCurrentFrame } from 'remotion';
import { C, COPY, FOOTAGE } from './copy';
import { Background, EchoText, FONT, Line, Pic, Text, Tint, clamp, pop, ramp } from './lib';

// Each scene gets its local frame (0 = its first frame) from <Sequence>.
// Durations (frames): 42 36 38 85 35 31 29 20 67 35 59 33.

const GoldWord: React.FC<{ children: string; size: number }> = ({ children, size }) => (
  <span
    style={{
      fontFamily: FONT,
      fontWeight: 900,
      fontSize: size,
      lineHeight: 1,
      background: `linear-gradient(180deg, ${C.gold1} 0%, #e3a83e 45%, ${C.gold2} 100%)`,
      WebkitBackgroundClip: 'text',
      color: 'transparent',
      WebkitTextStroke: `3px ${C.green}`,
      letterSpacing: -2,
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </span>
);

/* 1 · 0.0–1.4 s · hook: two hero items fly in, headline pops, then shrinks and blurs out */
export const S1: React.FC = () => {
  const f = useCurrentFrame();
  const settle = ramp(f, 0, 7);
  const inT = pop(f, 2, 9);
  const out = ramp(f, 35, 42, Easing.in(Easing.cubic));
  const textStyle: React.CSSProperties = {
    transform: `scale(${(0.6 + 0.4 * inT) * (1 - 0.65 * out)})`,
    filter: `blur(${out * 14}px)`,
    opacity: Math.min(1, inT * 1.5) * (1 - out),
  };
  return (
    <Background>
      <Pic src="img/mint.png" x={interpolate(settle, [0, 1], [260, 150])} y={interpolate(settle, [0, 1], [300, 190])} w={520} rot={-25 + 8 * settle} scale={1.7 - 0.7 * settle} />
      <Pic src="img/camphor.png" x={110} y={1330} w={300} rot={30} scale={0.6 + 0.4 * settle} opacity={settle} />
      <Pic src="img/ice.png" x={interpolate(settle, [0, 1], [760, 900])} y={interpolate(settle, [0, 1], [1420, 1560])} w={480} rot={18 - 10 * settle} scale={1.6 - 0.6 * settle} />
      <AbsoluteFill style={textStyle}>
        <Line y={735} size={118} weight={800}>{COPY.s1.small}</Line>
        <div style={{ position: 'absolute', left: 540, top: 960, transform: 'translate(-50%, -50%)' }}>
          <GoldWord size={228}>{COPY.s1.big}</GoldWord>
        </div>
        <Line y={1180} size={168}>{COPY.s1.line3}</Line>
      </AbsoluteFill>
    </Background>
  );
};

const Candies: React.FC<{ f: number; clear?: number }> = ({ f, clear = 0 }) => (
  <>
    {[0, 1, 2, 3, 4, 5].map((i) => {
      const x = 120 + random(`cx${i}`) * 860;
      const y = 150 + random(`cy${i}`) * 400 - f * 1.2;
      return <Pic key={i} src="img/candy.png" x={x} y={y} w={62 + random(`cs${i}`) * 34} rot={f * 3 + i * 40} opacity={0.9 * (1 - clear)} scale={1 + clear} />;
    })}
  </>
);

/* 2 · 1.4–2.6 s · ingredient: three lines slide in, hold, slide apart */
export const S2: React.FC = () => {
  const f = useCurrentFrame();
  const zoom = 1.03 - 0.03 * (f / 36);
  const lines = COPY.s2;
  return (
    <Background pattern>
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        <Candies f={f} />
        <Pic src="img/mint.png" x={30} y={930} w={300} rot={70} />
        <Pic src="img/ice.png" x={140} y={1720} w={560} rot={-12} />
        <Pic src="img/camphor.png" x={1000} y={1640} w={300} rot={-40} />
        {lines.map((l, i) => {
          const dir = i % 2 === 0 ? -1 : 1;
          const inn = ramp(f, i * 2, i * 2 + 7, Easing.out(Easing.exp));
          const out = ramp(f, 30, 36, Easing.in(Easing.cubic));
          const dx = dir * (1 - inn) * 900 + -dir * out * 1100;
          const size = [140, 168, 205][i];
          return (
            <Line key={l} y={[760, 965, 1170][i]} size={size} style={{ marginLeft: dx }}>
              {l}
            </Line>
          );
        })}
      </AbsoluteFill>
    </Background>
  );
};

/* 3 · 2.6–3.9 s · kinetic words, one at a time, last one zooms out */
export const S3: React.FC = () => {
  const f = useCurrentFrame();
  const words = COPY.s3;
  const idx = Math.min(words.length - 1, Math.floor(f / 7));
  const local = f - idx * 7;
  const p = pop(local, 0, 4);
  const zoomOut = ramp(f, 33, 38, Easing.in(Easing.quad));
  const clear = ramp(f, 30, 38);
  return (
    <Background pattern>
      <Candies f={f + 36} clear={clear} />
      <Pic src="img/mint.png" x={30 - clear * 300} y={930} w={300} rot={70} />
      <Pic src="img/ice.png" x={140 - clear * 400} y={1720 + clear * 300} w={560} rot={-12} />
      <Pic src="img/camphor.png" x={1000 + clear * 300} y={1640} w={300} rot={-40} />
      <Line
        y={960}
        size={210}
        style={{ transform: `translate(-50%, -50%) scale(${(0.75 + 0.25 * p) * (1 + zoomOut * 2.5)})`, opacity: 1 - zoomOut }}
      >
        {words[idx]}
      </Line>
    </Background>
  );
};

/* 4 · 3.9–6.7 s · product reveal: items burst in, product pops with a frost burst, header + wordmark */
const FLOAT: { src: string; x: number; y: number; w: number; r: number }[] = [
  { src: 'img/ice.png', x: 170, y: 560, w: 210, r: -15 },
  { src: 'img/mint.png', x: 900, y: 600, w: 260, r: 30 },
  { src: 'img/candy.png', x: 920, y: 1010, w: 150, r: 0 },
  { src: 'img/camphor.png', x: 140, y: 1180, w: 280, r: 50 },
  { src: 'img/ice.png', x: 930, y: 1320, w: 180, r: 20 },
  { src: 'img/mint.png', x: 120, y: 820, w: 180, r: -40 },
  { src: 'img/candy.png', x: 210, y: 1430, w: 110, r: 0 },
  { src: 'img/camphor.png', x: 960, y: 430, w: 190, r: -20 },
];
export const S4: React.FC = () => {
  const f = useCurrentFrame();
  const push = 1 + 0.04 * (f / 85);
  const prod = pop(f, 10, 19);
  const burst = ramp(f, 10, 24);
  const head = ramp(f, 12, 19, Easing.out(Easing.exp));
  const mark = pop(f, 20, 28);
  return (
    <Background>
      <AbsoluteFill style={{ transform: `scale(${push})` }}>
        {/* frost glow + ring of sparkles behind the pack (the original's juice splash) */}
        <div
          style={{
            position: 'absolute', left: 540, top: 930, width: 1000, height: 1000, borderRadius: '50%',
            transform: `translate(-50%, -50%) scale(${0.3 + 0.7 * burst})`, opacity: 0.9 * Math.min(1, burst * 2),
            background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(220,245,255,0.75) 35%, rgba(200,235,210,0) 70%)',
          }}
        />
        {Array.from({ length: 26 }).map((_, i) => {
          const a = (i / 26) * Math.PI * 2 + random(`a${i}`) * 0.3;
          const d = (220 + random(`d${i}`) * 260) * burst;
          return (
            <div key={i} style={{
              position: 'absolute', left: 540 + Math.cos(a) * d, top: 930 + Math.sin(a) * d * 1.3,
              width: 14 + random(`s${i}`) * 16, height: 14 + random(`s${i}`) * 16, borderRadius: '50%',
              background: i % 3 ? 'rgba(255,255,255,0.95)' : '#bfe8f2', opacity: 1 - ramp(f, 30, 60) * 0.7,
              boxShadow: '0 0 12px rgba(255,255,255,0.9)',
            }} />
          );
        })}
        {FLOAT.map((it, i) => {
          const fly = ramp(f, i * 0.8, 9 + i * 0.8, Easing.out(Easing.cubic));
          const fromX = it.x < 540 ? -300 : 1380;
          const bob = Math.sin((f + i * 11) / 9) * 10;
          return (
            <Pic key={i} src={it.src} x={interpolate(fly, [0, 1], [fromX, it.x])} y={it.y + bob + (1 - fly) * 200}
              w={it.w} rot={it.r + (1 - fly) * 120 + Math.sin((f + i * 7) / 14) * 4} />
          );
        })}
        <Pic src="img/product.png" x={540} y={935} w={540} scale={0.35 + 0.65 * prod} opacity={Math.min(1, prod * 2)}
          style={{ filter: 'drop-shadow(0 30px 40px rgba(30,80,40,0.25))' }} />
        <Line y={280} size={92} style={{ opacity: head, marginTop: (1 - head) * -80 }}>
          {COPY.s4.header}
        </Line>
        <Pic src="img/wordmark.png" x={540} y={1640} w={500} scale={0.5 + 0.5 * mark} opacity={Math.min(1, mark * 2)} />
      </AbsoluteFill>
    </Background>
  );
};

/* 5 · 6.7–7.9 s · three ingredient coins bounce up into a row under the headline */
export const S5: React.FC = () => {
  const f = useCurrentFrame();
  const coins = COPY.s5.coins;
  const starts = [[200, 1500], [560, 1700], [930, 1450]];
  return (
    <Background pattern>
      <Line y={750} size={96}>{COPY.s5.headline[0]}</Line>
      <Line y={865} size={96}>{COPY.s5.headline[1]}</Line>
      {coins.map((c, i) => {
        const t = pop(f, 2 + i * 2, 13 + i * 2);
        const x = interpolate(t, [0, 1], [starts[i][0], 270 + i * 270]);
        const y = interpolate(t, [0, 1], [starts[i][1], 1110]);
        const lab = ramp(f, 12 + i * 2, 17 + i * 2);
        return (
          <React.Fragment key={c.label}>
            <div style={{
              position: 'absolute', left: x, top: y, width: 210, height: 210, transform: 'translate(-50%, -50%)',
              borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, #ffffff 0%, #eef9ea 45%, #cde9c4 100%)',
              border: `8px solid ${C.gold2}`, boxShadow: '0 14px 28px rgba(30,80,40,0.25), inset 0 -8px 18px rgba(80,140,80,0.25)',
              overflow: 'hidden',
            }}>
              <Img src={staticFile(c.img)} style={{ position: 'absolute', left: '50%', top: '50%', width: 150, transform: 'translate(-50%, -50%)' }} />
            </div>
            <Line x={270 + i * 270} y={1262} size={50} weight={800} style={{ opacity: lab }}>{c.label}</Line>
          </React.Fragment>
        );
      })}
    </Background>
  );
};

/* 6 · 7.9–8.9 s · demo (live macro in the original): stand-in = macro push-in on the bottle,
   an ice cube drops in front and bursts into cold sparkles */
export const S6: React.FC = () => {
  const f = useCurrentFrame();
  if (FOOTAGE.shot06) {
    return <AbsoluteFill><OffthreadVideo src={staticFile(FOOTAGE.shot06)} muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></AbsoluteFill>;
  }
  const push = 1 + 0.12 * (f / 31);
  const drop = ramp(f, 2, 11, Easing.in(Easing.quad));
  const hit = ramp(f, 11, 26);
  return (
    <AbsoluteFill style={{ background: 'radial-gradient(circle at 50% 40%, #ffffff 0%, #f1f5f4 60%, #dfe7e4 100%)' }}>
      <AbsoluteFill style={{ transform: `scale(${push})` }}>
        <Pic src="img/bottle.png" x={640} y={880} w={470} rot={-4}
          style={{ filter: 'drop-shadow(0 40px 50px rgba(40,60,60,0.25))' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 1580, height: 340, background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, #e8eeec 100%)' }} />
        {Array.from({ length: 40 }).map((_, i) => {
          const a = random(`b${i}`) * Math.PI * 2;
          const d = (120 + random(`bd${i}`) * 520) * hit;
          return (
            <div key={i} style={{
              position: 'absolute', left: 300 + Math.cos(a) * d, top: 1600 + Math.sin(a) * d * 0.7 - hit * 160 * random(`up${i}`),
              width: 10 + random(`bs${i}`) * 22, height: 10 + random(`bs${i}`) * 22, borderRadius: '50%',
              background: 'rgba(255,255,255,0.95)', border: '2px solid rgba(170,215,230,0.8)',
              opacity: hit > 0 ? 1 - hit * 0.6 : 0,
            }} />
          );
        })}
        <Pic src="img/ice.png" x={300} y={interpolate(drop, [0, 1], [-250, 1600])} w={360} rot={20 + drop * 25 + hit * 8} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* 7 · 8.9–9.9 s · lifestyle (live gym clip in the original): stand-in = tinted mint close-up, "Cool" > "Aromatic" */
export const S7: React.FC = () => {
  const f = useCurrentFrame();
  const word = f < 14 ? 0 : 1;
  const local = word === 0 ? f : f - 14;
  return (
    <AbsoluteFill>
      <Tint>
        {FOOTAGE.shot07 ? (
          <OffthreadVideo src={staticFile(FOOTAGE.shot07)} muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <AbsoluteFill style={{ background: '#2e3d22' }}>
            <Pic src="img/mint.png" x={600} y={900} w={1900} rot={-20 + f * 0.4} scale={1 + 0.06 * (f / 29)} />
            <Pic src="img/camphor.png" x={200} y={1650} w={900} rot={40} />
          </AbsoluteFill>
        )}
      </Tint>
      <EchoText f={local} y={960} size={190} lines={[COPY.s7[word]]} />
    </AbsoluteFill>
  );
};

/* 8 · 9.9–10.5 s · lifestyle 2 (live action in the original): stand-in = tinted ice close-up, "Instant Relief" */
export const S8: React.FC = () => {
  const f = useCurrentFrame();
  const shake = f < 6 ? Math.sin(f * 2.4) * 10 : 0;
  return (
    <AbsoluteFill>
      <Tint>
        {FOOTAGE.shot08 ? (
          <OffthreadVideo src={staticFile(FOOTAGE.shot08)} muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <AbsoluteFill style={{ background: '#3a4a2a' }}>
            <Pic src="img/camphor.png" x={760} y={420} w={1100} rot={-30} />
            <Pic src="img/ice.png" x={540 + shake} y={1000} w={1250} rot={12 - f * 0.3} scale={1 + 0.08 * (f / 20)} />
          </AbsoluteFill>
        )}
      </Tint>
      <EchoText f={f} y={830} size={190} lines={COPY.s8} />
    </AbsoluteFill>
  );
};

/* 9 · 10.5–12.8 s · benefits: bottle centre, five callouts with curved arrows */
const Arrow: React.FC<{ from: [number, number]; to: [number, number]; p: number }> = ({ from, to, p }) => {
  const [x1, y1] = from; const [x2, y2] = to;
  const cx = (x1 + x2) / 2 + (y2 - y1) * 0.35; const cy = (y1 + y2) / 2 - (x2 - x1) * 0.35;
  const len = 600;
  const ang = Math.atan2(y2 - cy, x2 - cx);
  const head = (s: number) => `${x2 - 26 * Math.cos(ang + s)},${y2 - 26 * Math.sin(ang + s)}`;
  return (
    <g stroke={C.gold2} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`} strokeDasharray={len} strokeDashoffset={len * (1 - p)} />
      <polyline points={`${head(0.5)} ${x2},${y2} ${head(-0.5)}`} opacity={p > 0.95 ? 1 : 0} />
    </g>
  );
};
export const S9: React.FC = () => {
  const f = useCurrentFrame();
  const enter = pop(f, 0, 8);
  const wob = Math.sin(f / 7) * 3;
  return (
    <Background pattern>
      <Pic src="img/bottle.png" x={540} y={1000} w={290} rot={wob} scale={0.7 + 0.3 * enter}
        style={{ filter: 'drop-shadow(0 24px 30px rgba(30,80,40,0.25))' }} />
      <svg width={1080} height={1920} style={{ position: 'absolute' }}>
        {COPY.s9.map((c, i) => {
          const p = ramp(f, 3 + i * 3, 10 + i * 3);
          const left = c.x < 540;
          const from: [number, number] = [left ? c.x + 200 : c.x + 30, c.y + 30];
          return <Arrow key={i} from={from} to={c.tip as [number, number]} p={p} />;
        })}
      </svg>
      {COPY.s9.map((c, i) => {
        const t = pop(f, 2 + i * 3, 8 + i * 3);
        return (
          <div key={i} style={{ position: 'absolute', left: c.x, top: c.y - 40, transform: `scale(${t})`, transformOrigin: 'left center', opacity: Math.min(1, t * 2) }}>
            <Text size={58} weight={900}>{c.text[0]}</Text>
            <Text size={58} weight={900} style={{ marginTop: 4 }}>{c.text[1]}</Text>
          </div>
        );
      })}
    </Background>
  );
};

/* 10 · 12.8–13.9 s · tagline typed on a textured brand-olive card, big outlined echo behind */
export const S10: React.FC = () => {
  const f = useCurrentFrame();
  const lines = COPY.s10;
  const total = lines.join('').length;
  const shown = Math.floor(interpolate(f, [1, 21], [0, total], clamp));
  const out = ramp(f, 30, 35, Easing.in(Easing.cubic));
  let used = 0;
  return (
    <AbsoluteFill style={{ background: C.olive }}>
      <svg width={1080} height={1920} style={{ position: 'absolute', mixBlendMode: 'multiply', opacity: 0.55 }}>
        <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={3} /><feColorMatrix type="saturate" values="0" /></filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
      {lines.map((l, i) => (
        <Line key={'bg' + i} y={460 + i * 470} size={230} color="transparent"
          style={{ WebkitTextStroke: '3px rgba(255,255,255,0.28)', marginLeft: (i - 1) * 60 } as React.CSSProperties}>
          {l}
        </Line>
      ))}
      <AbsoluteFill style={{ opacity: 1 - out, filter: `blur(${out * 10}px)` }}>
        {lines.map((l, i) => {
          const vis = Math.max(0, Math.min(l.length, shown - used));
          used += l.length;
          return (
            <Line key={i} y={[715, 965, 1215][i]} size={[104, 138, 92][i]} color={C.white}
              style={{ textShadow: '0 4px 0 rgba(23,96,47,0.55)' } as React.CSSProperties}>
              <span>{l.slice(0, vis)}</span>
              <span style={{ opacity: 0 }}>{l.slice(vis)}</span>
            </Line>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* 11 · 13.9–15.9 s · CTA: two tilted bottles slide in around an "Order Now" pill, then a bottle wipes across */
export const S11: React.FC = () => {
  const f = useCurrentFrame();
  const inn = ramp(f, 0, 8, Easing.out(Easing.exp));
  const btn = pop(f, 4, 11);
  const pulse = 1 + 0.03 * Math.sin(f / 4);
  const wipe = ramp(f, 51, 59, Easing.in(Easing.quad));
  return (
    <Background pattern>
      <Pic src="img/bottle.png" x={interpolate(inn, [0, 1], [1300, 900])} y={interpolate(inn, [0, 1], [-300, 230])} w={430} rot={-38} />
      <Pic src="img/bottle.png" x={interpolate(inn, [0, 1], [-250, 170])} y={interpolate(inn, [0, 1], [2200, 1680])} w={430} rot={-38} />
      <div style={{
        position: 'absolute', left: 540, top: 960, transform: `translate(-50%, -50%) scale(${btn * pulse})`,
        padding: '34px 78px', borderRadius: 999, background: `linear-gradient(180deg, #3faa5d 0%, ${C.greenMid} 55%, ${C.green} 100%)`,
        boxShadow: '0 16px 30px rgba(23,96,47,0.35), inset 0 3px 0 rgba(255,255,255,0.35)',
      }}>
        <Text size={66} weight={800} color={C.white} style={{ letterSpacing: 0 }}>{COPY.s11.button}</Text>
      </div>
      <Pic src="img/bottle.png" x={interpolate(wipe, [0, 1], [-900, 1900])} y={interpolate(wipe, [0, 1], [2900, -900])} w={1500} rot={-38} />
    </Background>
  );
};

/* 12 · 15.9–17.0 s · end card: brand logo assembles and holds */
export const S12: React.FC = () => {
  const f = useCurrentFrame();
  const t = ramp(f, 0, 10, Easing.out(Easing.exp));
  const reveal = (1 - t) * 50;
  return (
    <Background>
      <Pic src="img/logo.png" x={540} y={960} w={560} scale={1.25 - 0.25 * t}
        style={{ filter: `blur(${(1 - t) * 8}px)`, clipPath: `inset(${reveal}% ${reveal}% ${reveal}% ${reveal}%)` }} />
    </Background>
  );
};
