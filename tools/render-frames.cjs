// Saves every frame of the Mega Ratu turn as a PNG, then joins them into an MP4.
//
//   node tools/render-frames.cjs
//
// Needs Playwright with Chromium (npm i -D playwright && npx playwright install chromium)
// and ffmpeg on the PATH. Output: renders/mega-ratu-frames/frame_0000.png ... and
// renders/mega-ratu-turn.mp4.
//
//   node tools/render-frames.cjs --only 0,40,75   saves just those frames, no MP4 (for a quick look)
const fs = require("fs");
const path = require("path");
const { execSync, execFileSync } = require("child_process");

function loadPlaywright() {
  try {
    return require("playwright");
  } catch {
    const globalRoot = execSync("npm root -g").toString().trim();
    return require(path.join(globalRoot, "playwright"));
  }
}

(async () => {
  const root = path.resolve(__dirname, "..");
  const onlyArg = process.argv.indexOf("--only");
  const only = onlyArg > -1 ? process.argv[onlyArg + 1].split(",").map(Number) : null;
  const framesDir = path.join(root, "renders", "mega-ratu-frames");
  const mp4 = path.join(root, "renders", "mega-ratu-turn.mp4");
  fs.rmSync(framesDir, { recursive: true, force: true });
  fs.mkdirSync(framesDir, { recursive: true });

  const { createServer } = await import("vite");
  const server = await createServer({ root, server: { port: 5199, strictPort: true }, logLevel: "error" });
  await server.listen();

  const { chromium } = loadPlaywright();
  const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

  await page.goto("http://localhost:5199/?capture", { waitUntil: "networkidle" });
  await page.waitForFunction(() => window.mega);
  await page.evaluate(() => window.mega.ready);
  const { frames, fps } = await page.evaluate(() => ({ frames: window.mega.frames, fps: window.mega.fps }));

  const list = only || Array.from({ length: frames }, (_, i) => i);
  for (const n of list) {
    const url = await page.evaluate((i) => window.mega.frame(i), n);
    const file = path.join(framesDir, `frame_${String(n).padStart(4, "0")}.png`);
    fs.writeFileSync(file, Buffer.from(url.split(",")[1], "base64"));
    if (n % 30 === 0) console.log(`frame ${n}/${frames}`);
  }

  await browser.close();
  await server.close();
  if (errors.length) console.log("page errors:", errors);
  if (only) return console.log(`saved frames ${only.join(", ")} to ${path.relative(root, framesDir)}`);

  execFileSync("ffmpeg", [
    "-y", "-loglevel", "error",
    "-framerate", String(fps),
    "-i", path.join(framesDir, "frame_%04d.png"),
    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "16", "-movflags", "+faststart",
    mp4,
  ]);
  console.log(`saved ${frames} frames to ${path.relative(root, framesDir)} and ${path.relative(root, mp4)}`);
})();
