---
videomd: 1
name: tiktok-7604506104940285214
description: 'Made with (inferred): code / template render 92%, 3D render 8%'
source:
  file: tiktok_7604506104940285214.mp4
  sha256: 6da248e2406f4161e9a8e8587e74580fc932465c2dcec25f2389baded898c99b
  duration: 21.433
  size: 2048x1080
  fps: 30.0
  aspect: 2048:1080
shots: 16
lang: en
made_mix:
  code_render: 0.916
  cg_3d: 0.084
confidence: 0.862
readers:
- tools
- agent
open_questions: 3
generator:
  name: rea-video
  version: 0.1.0
---

# tiktok_7604506104940285214.mp4

**Verdict** (inferred): Mixed production: code / template render 92% + 3D render 8%; overlays: text labels (composited in code / an editor); real material used: logo / brand mark (8.7s), product photo (6.0s); audio: voice + music 141.6BPM (to confirm, leaning stock library music) + 3 sound effects
**Narrative**: #01-02 grab attention → #03 set the scene → #04-05 add information → #06 call to action → #07-08 deliver the conclusion → #09-10 set the mood → #11-12 add information → #13 call to action → #14-15 deliver the conclusion → #16 call to action
**Made with** (inferred, by duration): code / template render 92%, 3D render 8%
**Remake**: 1 3D render shot → 1 generation unit, 1 Seedance 2.0 call (plus 1 shot reusing the same clip, just cut); code render / screen capture 14 shots → 1 code project (2 parts)
**Real material to collect**: 4 shots (40% of the duration), list in `video/remake.md`

## Next steps

- Remake: `rea-video remake <this dir>` does what can be done automatically and keeps the original elsewhere; `remake/status.md` says per shot what is left. Add incoming clips to `remake/mine.json` and run it again
- Code-rendered shots are best rebuilt in an HTML video framework (such as HyperFrames) from the rhythm and key frames in `video/rhythm.md`; `rea-video code-remake <this dir>` only makes a quick draft for particles / data-visualisation pictures
- AI shots: prompts are in the generation units of `video/remake.md`; for automatic generation run `rea-video remake-plan` + `remake-run --dry-run` (paid: ask the user first)

## Open questions

- Shot #4 (3.6–5.9s): photo / image: real material or generated, to confirm
- No AI listened to the soundtrack (the review covered the picture only): real voice versus TTS is inferred from the waveform; the effects were found on the separ…
- music source to confirm: most likely stock library music (63%); how to check is under “Sound”

## Map

Read this page first; for detail, open only the file you need. Each line is `path | ~tokens | what is in it · when to read it`; paths are relative to this directory.

```videomd-map
video/timeline.md | 1419 | Timeline: one line per shot · what a stretch says, which shots need review, how a shot was made
video/moments.md | 81 | Special moments · reveals, twists, climaxes, goofs: times, key frames, clips
video/content.md | 415 | Content and structure · what it says, the narrative line, structure, the script
video/cast.md | 417 | Cast, scenes and props · reference images for characters, first-frame prompts
video/sound.md | 704 | Sound · voice, music, sound effects, beats and sources
video/rhythm.md | 729 | Rhythm and key frames · when cuts and transitions happen, shot lengths, the change curve, key frames of each shot
video/look.md | 705 | Camera, lighting and editing · for filmed shots: framing, camera, lighting, kit
video/packaging.md | 153 | Packaging · subtitles, styled text, stickers, picture-in-picture: timing and style
video/remake.md | 5634 | Remake plan · generation units, shoots, code builds, real material to collect, acting and emotion
video/shots/*.md | 508 | Per-shot detail, tokens per file on average · checking one shot: what is seen, the inference and its basis, prompts, frames
breakdown.json | 72032 | Full raw data · for programs; a model rarely needs it
shots/ | - | contact sheet, first and last frame of each shot · checking by eye
storyboard.jpg | - | storyboard of the whole video · the whole video at a glance
stems/ | - | voice, music and effects stems · listening, remaking the sound
sfx/ | - | a clip of each sound effect · finding matching effects
packaging/ | - | subtitle files, packaging timeline, sticker frames · remaking subtitles and packaging
frames/ | - | picture scenes: full-size frames, the drawn layer cut out and sampled, measurements · remaking rendered pictures
audio.png | - | waveform and beat chart · seeing the rhythm
```

## How to read

- One shot per line: `#<n> start-end (s) | key value | …`. A key ending in `~` is the tools' inference; keys without it are visible on screen or measured directly.
- `story` job in the story and the point · `seen` what is on screen · `act` acting (emotion, strength, face) · `camera` camera move · `overlay` overlays · `made~` how it was made (inferred) · `material~` where the material came from (inferred) · `remake` remake route · `flag` needs a second look
- Full detail for a shot is in `video/shots/<n>.md` (e.g. `video/shots/07.md`).
- What is “seen” can be checked against the frames; what is “inferred” is the tools' and image readers' judgement, with the basis in each shot file. When they disagree, trust the frames.
