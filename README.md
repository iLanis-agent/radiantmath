# Radiant Math

Radiant floor tubing arithmetic. The floor of 1000 sq ft with tubing at 12 inches on center takes 1000 ft of tubing.

## What it computes

- **The tubing truth** - tubing length: the area (1 to 100000 sq ft) times twelve over the on-center spacing (whole inches, 1 to 24).
- **The loops truth** - whole loops: the tubing (0.01 to 100000 ft) rounded up into a maximum loop length (1 to 1000 ft), and what the last one carries.
- **The manifold truth** - manifolds: the loops (1 to 1000) over the ports (1 to 100), rounded up, and the ports left spare.
- **The flow truth** - total flow: the loops times the per-loop flow (0.01 to 10 gpm).

## Boundary

Arithmetic only. Tubing counting, applied as written. It has not read any heat loss and does not know the floor build-up, the water temperature, the manifold location or the pump curve, and it gives no verdict that a layout heats the room. Every number is the owner's own entry.

## Files

- `index.html` - landing page.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic (exact integers, half-up on display).
- `oracle.py` - the Python mirror that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json`.
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/radiantmath/
Repo: https://github.com/iLanis-agent/radiantmath
