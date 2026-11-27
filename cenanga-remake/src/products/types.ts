// One product = one config. The 12 scenes read everything product-specific from here.

export type Callout = { text: [string, string]; x: number; y: number; tip: [number, number] };
export type Coin = { label: string; img?: string; cover?: boolean; symbol?: string };

export type Product = {
  id: string;
  colors: {
    text: string;        // headline colour
    textMid: string;     // button middle stop
    btnTop: string;      // button top stop
    gold1: string; goldMid: string; gold2: string;   // gold word, coin rims, arrows
    bgIn: string; bgMid: string; bgOut: string;      // radial background
    line: string;        // faint leaf line-art
    card: string;        // shot 10 textured card
    textShadow: string;  // shot 10 text shadow
    tint: string;        // shots 7-8 duotone (multiply)
    tintLift: string;    // shots 7-8 wash on top
    darkBg: string;      // behind the shot 7-8 stand-ins
    coinMid: string; coinOut: string;
    glowMid: string; glowOut: string; sparkleAlt: string;   // shot 4 burst
    shadow: string;      // drop shadows
    coinInset: string;   // inner shade of the shot 5 coins
    btnShadow: string;   // shot 11 button shadow
  };
  img: {
    heroA: string;   // shot 1 top-left, shots 2-3 left edge, shot 7 background
    heroB: string;   // shot 1 bottom-right, shots 2-3 bottom-left, shot 8 background
    leaf: string;    // accent leaf
    floater: string; // small spinning items in shots 2-3
    drop: string;    // item that drops in shot 6
    product: string; // pack shot (shot 4)
    bottle: string;  // bottle alone (shots 6, 9, 11)
    wordmark: string;
    logo: string;    // end card
    bottleScale?: number; // size the bottle so it reads as big as the original's tube
  };
  copy: {
    s1: { small: string; big: string; line3: string };
    s2: [string, string, string];
    s3: string[];
    s4: { header: string };
    s5: { headline: [string, string]; coins: [Coin, Coin, Coin] };
    s7: [string, string];
    s8: string[];
    s9: [Callout, Callout, Callout, Callout, Callout];
    s10: [string, string, string];
    s11: { button: string };
  };
  // Real clips for the original's three live-action shots; null = code-built stand-in.
  footage: { shot06: string | null; shot07: string | null; shot08: string | null };
};
