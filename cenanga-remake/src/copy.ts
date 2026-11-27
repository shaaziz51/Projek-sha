// All on-screen copy, colours, timing and footage in one place: edit here, re-render.
// Copy follows the original ad's structure line for line, rewritten for
// JRM Cenanga Aromatherapy Oil from the product notes.

export const FPS = 30;
export const W = 1080;
export const H = 1920;

// Cut points: the original ad's cuts (30 fps frame numbers 95, 177, 263, 454,
// 533, 604, 669, 714, 866, 946, 1079, end 1153) scaled by 17 / 38.43 s.
export const CUTS = [0, 42, 78, 116, 201, 236, 267, 296, 316, 383, 418, 477, 510];
export const DURATION = CUTS[CUTS.length - 1];

export const C = {
  green: '#17602f',
  greenMid: '#2b8a4b',
  gold1: '#f6d27a',
  gold2: '#b8741a',
  bgIn: '#f6fcf2',
  bgOut: '#c9e6c0',
  line: '#7fbf79',
  olive: '#97ad2e',
  tint: '#c4cf6c',
  white: '#ffffff',
};

export const COPY = {
  s1: { small: 'Designed to', big: 'Relieve', line3: '& Refresh!' },
  s2: ['Infused with', 'Menthol &', 'Camphor'],
  s3: ['Your', 'cooling', 'dose of', 'relief', 'is here!'],
  s4: { header: 'Meet the all-new' },
  s5: {
    headline: ['Packed with soothing', 'herbal aromas'],
    coins: [
      { img: 'img/mint.png', label: 'Menthol' },
      { img: 'img/camphor.png', label: 'Camphor' },
      { img: 'img/ice.png', label: 'Cooling' },
    ],
  },
  s7: ['Cool', 'Aromatic'],
  s8: ['Instant', 'Relief'],
  // five benefits from the product notes, placed where the original's five callouts sit
  s9: [
    { text: ['Relieves', 'Headache'], x: 70, y: 330, tip: [470, 520] },
    { text: ['Eases', 'Nausea'], x: 790, y: 420, tip: [610, 600] },
    { text: ['Expels', 'Wind'], x: 60, y: 880, tip: [450, 1010] },
    { text: ['Clears', 'Breathing'], x: 780, y: 1080, tip: [620, 1170] },
    { text: ['Daily', 'Massage'], x: 70, y: 1400, tip: [460, 1330] },
  ],
  s10: ['With Ultimate', 'Freshness', 'Made For Every Day!'],
  s11: { button: 'Order Now' },
};

// Drop real clips into public/footage/ and name them here to replace the
// stand-ins for the original's three live-action shots (6, 7, 8).
// Text and colour tint stay on top. Example: shot06: 'footage/shot06.mp4'
export const FOOTAGE: Record<'shot06' | 'shot07' | 'shot08', string | null> = {
  shot06: null,
  shot07: null,
  shot08: null,
};
