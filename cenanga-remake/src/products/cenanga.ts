import { Product } from './types';

// JRM Cenanga Aromatherapy Oil: copy follows the original ad line for line,
// rewritten from the product notes.
export const cenanga: Product = {
  id: 'Cenanga',
  colors: {
    text: '#17602f', textMid: '#2b8a4b', btnTop: '#3faa5d',
    gold1: '#f6d27a', goldMid: '#e3a83e', gold2: '#b8741a',
    bgIn: '#f6fcf2', bgMid: '#e7f5e1', bgOut: '#c9e6c0',
    line: '#7fbf79',
    card: '#97ad2e', textShadow: 'rgba(23,96,47,0.55)',
    tint: '#c4cf6c', tintLift: 'rgba(226, 232, 160, 0.42)',
    darkBg: '#2e3d22',
    coinMid: '#eef9ea', coinOut: '#cde9c4',
    glowMid: 'rgba(220,245,255,0.75)', glowOut: 'rgba(200,235,210,0)', sparkleAlt: '#bfe8f2',
    shadow: 'rgba(30,80,40,0.25)', coinInset: 'rgba(80,140,80,0.25)', btnShadow: 'rgba(23,96,47,0.35)',
  },
  img: {
    heroA: 'img/mint.png', heroB: 'img/ice.png', leaf: 'img/camphor.png', floater: 'img/candy.png',
    drop: 'img/ice.png', product: 'img/product.png', bottle: 'img/bottle.png',
    wordmark: 'img/wordmark.png', logo: 'img/logo.png',
  },
  copy: {
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
    s9: [
      { text: ['Relieves', 'Headache'], x: 70, y: 330, tip: [470, 520] },
      { text: ['Eases', 'Nausea'], x: 790, y: 420, tip: [610, 600] },
      { text: ['Expels', 'Wind'], x: 60, y: 880, tip: [450, 1010] },
      { text: ['Clears', 'Breathing'], x: 780, y: 1080, tip: [620, 1170] },
      { text: ['Daily', 'Massage'], x: 70, y: 1400, tip: [460, 1330] },
    ],
    // "Made For All!" softened: menthol + camphor, use on children/babies only with care
    s10: ['With Ultimate', 'Freshness', 'Made For Every Day!'],
    s11: { button: 'Order Now' },
  },
  cta: { line: 'Swipe to our profile and buy it on the showcase.', handle: '@Kak_sha_jrm' },
  footage: { shot06: null, shot07: null, shot08: null },
};
