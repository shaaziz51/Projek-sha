# Talking head 1 (Mega Ratu): edit log

Source: `talking_head.mp4`, 576×1152, 19 fps, 60.0 s
Output: `talking_head_clean.mp4`, 576×1152, 19 fps, 56.95 s (H.264 CRF 18, AAC 192 kbps)

## Cuts (source timecodes)

| Cut | Removed | Reason |
|---|---|---|
| 19.16–19.68 s | "lep…, orang ni" | False start: kept the retake "…peranakan kita **lepas habis pantang** boleh konsum" |
| 29.89–31.47 s | "kita punya" + 0.8 s silence | False start before "jarum emas", plus the only silence over 0.5 s |
| 33.47–33.68 s | "apa ni" | Filler: "ada kita punya, ~~apa ni,~~ … kristal" |
| 55.89–56.63 s | "dia tutup dengan rasa" | Repeated take: kept "dia tutup rasa herba tu dengan kandungan beri" |

All cuts are snapped to frame boundaries (lip-sync preserved) with 12 ms audio fades to prevent clicks.

## Checked but left in

- **40.2–43.5 s:** "masalah lelehan putih dikeluarkan, masalah lelehan putih dari kawasan itu juga". This could be a
  restart or a deliberate repeat. Cutting either half loses meaning ("dikeluarkan"), so it was kept. If it should go,
  remove ~40.2–41.7 s of the source.
- **No "um/uh/erm/ah" sounds:** the transcription and an acoustic scan for drawn-out vowels didn't find any.
  The only verbal filler was "apa ni".
- **Silences:** no other pause in the source was longer than 0.5 s.

## Audio chain

high-pass 80 Hz → RNNoise speech denoiser (`sh.rnnn`, 90 % mix) → FFT denoise (12 dB) → +22 dB gain →
compressor 3:1 @ −18 dB → downward expander (gentle, 14 dB max) → limiter → two-pass loudnorm (linear)

Result: **−14.0 LUFS integrated, −1.5 dBFS true peak.** Breaths are kept for natural pacing.
