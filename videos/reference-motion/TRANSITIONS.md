# How each card changes into the next: motion only

From `source.mp4` (the Apple-style UI reference, 12.6 s, 720×1280). Positions, sizes and tilts were tracked on
every frame, with each card measured separately. Only the movement is described here, not the look.

`index.html` replays exactly this motion with plain grey shapes, labelling each transition on screen.
`side_by_side.mp4` shows the reference and the motion-only copy together. `compare_pairs.png` shows both at each
transition.

Positions are in pixels on a 720×1280 frame; y is measured from the top.

| # | Seconds | Transition | How it moves |
|---|---|---|---|
| T1 | 0.00–0.20 | **Logo drops in** | Falls 490 px in 0.20 s, speeding up. Grows from 28 % to 72 % size while falling. Stretched 1.5× tall at the start, back to normal at landing (a speed smear) |
| T2 | 0.20–0.60 | **Bounce and settle** | Damped spring: overshoots 44 px past its rest point, rebounds 24 px above it, then 8 px below, still by 0.80 s. Size reaches 100 % at 0.40 s with no overshoot |
| — | 0.60–1.17 | Hold | Nothing moves |
| T3 | 1.17–2.00 | **Logo opens into a card** | The card grows out sideways from behind the logo, from the logo's width to 530 px in 0.33 s at a steady speed. Its width then springs: overshoots 13 %, dips, makes a small second overshoot, and settles at 1.83–2.00 s. It tilts to −10.5° at 1.27 s, swings through flat to +6° at 1.47 s, and is flat by 1.73 s. It lifts 22 px at 1.23 s and drops back. Meanwhile the logo spins about 1½ turns in 3D (1.20–2.25 s), slowing down |
| T4 | 2.03–2.80 | **Logo slides left, details reveal** | Logo slides 197 px to the card's left end in 0.20 s, fast then braking. When it hits the end, the card stretches 15 % and recoils by 2.37 s, shifting 48 px left and tilting +1.8°. Then, one after another: the title wipes out from under the logo (2.10–2.30), the second line wipes (2.35–2.55), five dots pop in 0.06 s apart (2.50–2.86), and the button grows from a dot with a small overshoot (2.55–2.80) |
| — | 2.80–3.83 | Hold | Nothing moves |
| T5 | 3.83–5.60 | **Header rises, card 1 enters** | The header rises 453 px: barely moving until 4.00, fastest at 4.10–4.20 (about 930 px/s), then a long slow-down to 5.60. Card 1 appears at 3.97 at 18 % size, 490 px below its slot. It grows steadily to 102 % in 0.26 s while rising 247 px, then rides up under the header into its slot |
| T6 | 4.30–5.60 | **Card 2 enters** | Appears at 30 % size and grows to 108 % in 0.23 s while rising 158 px. Its size wobbles (108 → 101 → 106 → 100 %). It tilts to a 6° peak about 0.35 s in, then rests at 4.4° |
| T7 | 4.67–5.60 | **Card 3 enters** | The same move: 35 % → 108 % in 0.27 s, rising 95 px, size wobble 108 → 95 → 100 %, tilt peak 3.7°, resting at 2.6° |
| T8 | 5.00–5.60 | **Card 4 enters** | The same move: 36 % → 108 % in 0.27 s, rising 70 px, tilt peak 4.3°, resting at 3° |
| — | 5.60–6.67 | Hold | The cards rest at slightly different tilts, fanned out |
| T9 | 6.67–7.20 | **Stack floats** | The whole stack drifts down 10–13 px and the header tilts 1° more, slow and smooth, so the hold never looks frozen |
| T10 | 7.30–7.67 | **Card 1 into the header** | Card 1 slides up under the header, speeding up, and shrinks to 55 %. On arrival the header **pops** (+6 % size), **kicks** to −8° tilt, and settles in 0.3 s. The arrival is marked by a flash |
| T11 | 7.60–8.07 | **Card 2 into the header** | Starts moving at 7.60, before card 1 has landed, so the moves overlap. Rises 370 px, speeding up, shrinking to 55 %. Arrival: pop, kick +6° (the opposite way), flash |
| T12 | 7.70–8.40 | **Card 3 into the header** | Creeps up slowly from 7.70, then speeds up hard from 8.13 (300 px in the last 0.27 s). Arrival: pop, kick −5°, flash |
| T13 | 7.70–8.67 | **Card 4 into the header** | Rises slowly, then fast. The header comes down to meet it (197 → 520 px between 8.33 and 8.67), so they meet halfway. Arrival: pop, kick +8°, flash |
| — | | *Rhythm of T10–T13* | Arrivals at 7.67, 8.07, 8.40 and 8.67: gaps of 0.40, 0.33 and 0.27 s, so **each comes sooner than the last**. The kicks alternate left and right |
| T14 | 8.67–9.17 | **Header settles at the centre** | It keeps falling to the centre (650 px), slowing down. The tilt fades 7.7° → 0 in 0.3 s with no overshoot |
| T15 | 9.43–9.93 | **Details hide, logo slides right** | The details wipe away in 0.12 s and the card narrows 6 %. The logo slides 376 px to the right end (9.47–9.80, smooth start and stop). When it hits, the card stretches 16 % and recoils: the mirror of T4 |
| T16 | 9.93–10.27 | **Card folds into the logo** | The logo slides back to the centre while the card shrinks around it, from 543 px to the logo's size in 0.34 s, at a steady speed and with no wobble. This is the reverse of T3 |
| — | 10.30–11.33 | Hold | Logo alone, still |
| T17 | 11.33–11.60 | **Logo shrinks out** | Shrinks on the spot, 100 % → 35 % → 0, speeding up; it doesn't move |
| — | 11.60–12.60 | Empty | Then it loops back to T1 |

## The motion rules underneath

1. **Every change grows out of the object before it.** The logo becomes a card, the card grows a list, the list folds
   back into the card, and the card folds back into the logo. There are no cuts or fades between states.
2. **Things arrive with a spring and leave with an ease-in.** Entries overshoot (13–15 % for widths, 8 % for cards)
   and settle within 0.3–0.6 s. Exits speed up and shrink to about 55 % into the object that takes them.
3. **Hitting something causes a reaction.** When the logo reaches the card's end, the card stretches and recoils.
   When a card lands in the header, the header pops and tilts.
4. **Overlap.** Each card starts before the previous one has finished: 0.34 s apart on the way in, with the gap
   shrinking from 0.40 to 0.27 s on the way out.
5. **The second half plays the first half in reverse.** T15 mirrors T4, T16 mirrors T3, and T17 mirrors T1.
6. **Rhythm.** Fast moves of 0.2–0.35 s, each followed by a still hold of 0.5–1 s. The busiest moment (T10–T13)
   comes about two-thirds of the way through.
