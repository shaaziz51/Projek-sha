"""Writes compositions/cards.html from design/kopi-ratu-feature-cards.svg (the layered SVG stays the source).

Run from the project folder (videos/feature-cards):  python3 scene-src/build_scene.py
"""
import re

svg = open("../../design/kopi-ratu-feature-cards.svg", encoding="utf-8").read()
svg = re.sub(r"<\?xml[^>]*>\s*", "", svg)
svg = re.sub(r"<!--.*?-->\s*", "", svg, flags=re.S)
# Fill the stage, keep the artboard's 1800x900 proportions centred in 1920x1080.
svg = svg.replace('width="1800" height="900" viewBox', 'width="1920" height="1080" preserveAspectRatio="xMidYMid meet" viewBox', 1)
svg = svg.replace("<svg ", '<svg id="cards-svg" ', 1)

scene = open("scene-src/cards.template.html", encoding="utf-8").read().replace("<!--SVG-->", svg)
open("compositions/cards.html", "w", encoding="utf-8").write(scene)
print("compositions/cards.html written")
