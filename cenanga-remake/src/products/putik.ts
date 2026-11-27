import { Product } from './types';

// JRM Putik Telaga Dara Feminine Wash: copy follows the original ad line for line,
// rewritten from the product notes and the pack ("Improved formulation with guava
// leaf extract, magnesium salt", "pH balance") and the tagline
// "Cooling sensation that lasts longer and refreshing".
// Palette: cream box, olive bottle, gold foil.
export const putik: Product = {
  id: 'Putik',
  colors: {
    text: '#4b5715', textMid: '#6b7a22', btnTop: '#8c9c35',
    gold1: '#f3d98e', goldMid: '#d6a640', gold2: '#a5741c',
    bgIn: '#fffcf3', bgMid: '#f7f0dc', bgOut: '#e6d9ae',
    line: '#bcae70',
    card: '#6f7d22', textShadow: 'rgba(60,66,14,0.6)',
    tint: '#cfc47e', tintLift: 'rgba(238, 230, 178, 0.42)',
    darkBg: '#3b3a22',
    coinMid: '#fbf5e3', coinOut: '#eadfb9',
    glowMid: 'rgba(255,246,222,0.8)', glowOut: 'rgba(240,230,190,0)', sparkleAlt: '#f1e2a6',
    shadow: 'rgba(70,70,20,0.25)', coinInset: 'rgba(150,130,60,0.25)', btnShadow: 'rgba(60,66,14,0.35)',
  },
  img: {
    heroA: 'putik/img/betel.png', heroB: 'putik/img/guava.png', leaf: 'putik/img/tealeaf.png',
    floater: 'putik/img/tealeaf.png', drop: 'img/ice.png',
    product: 'putik/img/product.png', bottle: 'putik/img/bottle.png',
    wordmark: 'putik/img/wordmark.png', logo: 'img/logo.png', bottleScale: 1.25,
  },
  copy: {
    s1: { small: 'Designed to', big: 'Freshen', line3: '& Protect!' },
    s2: ['Infused with', 'Guava Leaf', 'Extract'],
    s3: ['Your', 'gentle', 'dose of', 'freshness', 'is here!'],
    s4: { header: 'Meet the improved' },
    s5: {
      headline: ['Packed with natural', 'herbal goodness'],
      coins: [
        { img: 'putik/img/guava.png', label: 'Guava Leaf' },
        { symbol: 'Mg', label: 'Magnesium' },
        { img: 'putik/img/flower_coin.png', cover: true, label: 'Herbal Blend' },
      ],
    },
    s7: ['Cooling', 'Refreshing'],
    s8: ['Long-Lasting', 'Freshness'],
    s9: [
      { text: ['Reduces', 'Itching'], x: 70, y: 330, tip: [470, 520] },
      { text: ['Controls', 'Discharge'], x: 740, y: 420, tip: [620, 600] },
      { text: ['Odour', 'Control'], x: 60, y: 880, tip: [430, 1010] },
      { text: ['pH', 'Balanced'], x: 790, y: 1080, tip: [640, 1170] },
      { text: ['Post-Natal', 'Care'], x: 60, y: 1400, tip: [440, 1330] },
    ],
    s10: ['Cooling Sensation', 'That Lasts Longer', '& Refreshing!'],
    s11: { button: 'Order Now' },
  },
  footage: { shot06: null, shot07: null, shot08: null },
};
