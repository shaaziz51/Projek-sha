# Nutri Hi B — 15 s ad

A flat-2D rebuild of a 15 s vertical product ad, re-made for Nutri Hi B (The Pual BONDA by JRM Malaya).

| Folder | What's in it |
|---|---|
| `video-project/` | The editable HyperFrames project (`index.html` + `assets/` + local fonts and GSAP in `vendor/`) |
| `renders/nutrihib_rebuild_v2.mp4` | The rendered ad, 960×1696, 30 fps, 15 s |
| `renders/side_by_side_v2.mp4` | Original ad (left) next to the rebuild (right) |
| `voiceover/script.md` | Malay voiceover script, timed to the shots |
| `voiceover/lines.json` | Each voiceover line with its start time |
| `voiceover/mix_voiceover.py` | Places the voice clips on the timeline and lowers the music under them |

## Re-render the video

```bash
cd video-project && npx --yes hyperframes@0.9.80 render -o ../renders/nutrihib_rebuild_v2.mp4
```

Needs Node.js 22+ and FFmpeg.

## Add the voiceover

1. Generate one clip per line in `voiceover/lines.json` (with the ElevenLabs MCP server in `../.mcp.json`, or the ElevenLabs website) and save them as `voiceover/clips/vo_1.mp3` … `vo_6.mp3`.
2. Mix them in:

```bash
python3 voiceover/mix_voiceover.py
```

This writes `renders/nutrihib_with_voiceover.mp4` and warns if a line runs into the next one.

## Notes

- `video-project/assets/music.m4a` is the soundtrack of the original reference ad; check you have the rights to use it before publishing.
- "Formula diperbaharui." and "Kini dalam new packaging. 370 ml" are product claims; confirm they are accurate.
