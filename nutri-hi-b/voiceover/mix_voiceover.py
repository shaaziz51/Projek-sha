#!/usr/bin/env python3
"""Place each voiceover line at its start time and mix it over the video's music.

Usage (from the nutri-hi-b folder):
    python3 voiceover/mix_voiceover.py

Expects one audio file per line in voiceover/clips/, named after the line id
(vo_1.mp3, vo_2.wav, ...; any format ffmpeg reads). Times and text are in
voiceover/lines.json. The music is lowered while the voice speaks
(sidechain ducking) and the result is written next to the input video.
"""
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CFG = json.loads((ROOT / "voiceover" / "lines.json").read_text())
CLIPS = ROOT / "voiceover" / "clips"


def duration(path: Path) -> float:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)],
        capture_output=True, text=True, check=True)
    return float(out.stdout.strip())


def find_clip(line_id: str) -> Path:
    hits = sorted(p for p in CLIPS.glob(f"{line_id}.*") if p.is_file())
    if not hits:
        sys.exit(f"Missing clip for {line_id}: put it at voiceover/clips/{line_id}.mp3 (or .wav)")
    return hits[0]


def main() -> None:
    video = ROOT / CFG["video"]
    lines = CFG["lines"]
    clips = [find_clip(l["id"]) for l in lines]

    # Warn when a line runs into the next one, so it can be re-generated shorter or faster.
    for i, (line, clip) in enumerate(zip(lines, clips)):
        end = line["start"] + duration(clip)
        limit = lines[i + 1]["start"] if i + 1 < len(lines) else duration(video)
        if end > limit + 0.05:
            print(f"warning: {line['id']} ends at {end:.2f}s, past {limit:.2f}s ({end - limit:.2f}s too long)")

    inputs = ["-i", str(video)]
    for clip in clips:
        inputs += ["-i", str(clip)]

    parts = []
    for i, line in enumerate(lines, start=1):
        ms = int(round(line["start"] * 1000))
        parts.append(f"[{i}:a]aresample=48000,aformat=channel_layouts=stereo,adelay={ms}|{ms}[v{i}]")
    vo_inputs = "".join(f"[v{i}]" for i in range(1, len(lines) + 1))
    gain = CFG.get("voice_gain", 1.0)
    duck = CFG.get("music_under_voice", 0.35)
    total = duration(video)
    parts.append(f"{vo_inputs}amix=inputs={len(lines)}:normalize=0,volume={gain},apad=whole_dur={total:.3f}[vo]")
    parts.append("[vo]asplit=2[vo_mix][vo_key]")
    # Ratio chosen so the music drops to roughly `duck` of its level under the voice.
    ratio = max(2.0, 1.0 / max(duck, 0.05))
    parts.append(f"[0:a]aresample=48000,aformat=channel_layouts=stereo[music]")
    parts.append(f"[music][vo_key]sidechaincompress=threshold=0.02:ratio={ratio:.1f}:attack=15:release=300[ducked]")
    parts.append("[ducked][vo_mix]amix=inputs=2:normalize=0,alimiter=limit=0.95[aout]")

    out = ROOT / CFG["output"]
    cmd = ["ffmpeg", "-v", "error", "-y", *inputs, "-filter_complex", ";".join(parts),
           "-map", "0:v", "-map", "[aout]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k",
           "-shortest", "-movflags", "+faststart", str(out)]
    subprocess.run(cmd, check=True)
    print(f"wrote {out.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
