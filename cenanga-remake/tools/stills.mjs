// Render selected frames as PNGs for layout checks: [COMP=Putik] node tools/stills.mjs out/stills 20 60 ...
import { bundle } from '@remotion/bundler';
import { renderStill, selectComposition } from '@remotion/renderer';
import path from 'node:path';
import fs from 'node:fs';
const BROWSER = '/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const [outDir, ...frames] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });
const serveUrl = await bundle({ entryPoint: path.resolve('src/index.ts') });
const composition = await selectComposition({ serveUrl, id: process.env.COMP ?? 'Cenanga', browserExecutable: BROWSER });
for (const f of frames) {
  await renderStill({ serveUrl, composition, frame: Number(f), output: `${outDir}/f${String(f).padStart(3, '0')}.png`,
    browserExecutable: BROWSER, scale: 0.5 });
}
console.log('done', frames.length);
