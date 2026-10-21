// Radiant Math engine: tubing length from area and on-center spacing, whole loops and what the last one carries, manifolds and spare ports, and the total flow from per-loop flow. Exact integers (hundredths where shown), half-up on display only. Every number is the owner's own entry off the plan and the parts.
function _i(t, err, digits, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  if (!new RegExp("^[0-9]{1," + digits + "}$").test(t)) throw new Error(err);
  var v = parseInt(t, 10);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
var _AREA = "the area must be from 1 to 100000 sq ft with no decimal places";
var _SPACE = "the spacing must be a whole number from 1 to 24 inches on center";
var _TUBE = "the tubing length must be from 0.01 to 100000 ft with at most two decimal places";
var _LOOP = "the maximum loop length must be from 1 to 1000 ft with no decimal places";
var _LOOPS = "the loop count must be from 1 to 1000 with no decimal places";
var _PORTS = "the ports per manifold must be from 1 to 100 with no decimal places";
var _FLOW = "the flow per loop must be from 0.01 to 10 gpm with at most two decimal places";
function _dec(v, places) {
  if (v < 0) return "-" + _dec(-v, places);
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _hu(n, d) { return Math.floor((2 * n + d) / (2 * d)); }

function tubingTruth(area, spacing) {
  var a = _i(area, _AREA, 6, 1, 100000), s = _i(spacing, _SPACE, 2, 1, 24);
  var ft100 = _hu(a * 12 * 100, s);
  return "The floor of " + a + " sq ft with tubing at " + s + " inches on center takes " + _dec(ft100, 2) + " ft of tubing.";
}
function loopsTruth(tube, maxloop) {
  var t = _p(tube, _TUBE, 6, 2, 1, 10000000), m = _i(maxloop, _LOOP, 4, 1, 1000);
  var m100 = m * 100;
  var n = Math.floor((t + m100 - 1) / m100);
  var last = t - (n - 1) * m100;
  return "The tubing of " + _dec(t, 2) + " ft in loops of at most " + m + " ft takes " + n + (n === 1 ? " loop" : " loops") + ", the last one carrying " + _dec(last, 2) + " ft.";
}
function manifoldTruth(loops, ports) {
  var l = _i(loops, _LOOPS, 4, 1, 1000), p = _i(ports, _PORTS, 3, 1, 100);
  var n = Math.floor((l + p - 1) / p);
  var spare = n * p - l;
  return "The " + l + (l === 1 ? " loop" : " loops") + " on manifolds of " + p + (p === 1 ? " port" : " ports") + " take " + n + (n === 1 ? " manifold" : " manifolds") + ", leaving " + spare + (spare === 1 ? " port" : " ports") + " spare.";
}
function flowTruth(loops, flow) {
  var l = _i(loops, _LOOPS, 4, 1, 1000), f = _p(flow, _FLOW, 2, 2, 1, 1000);
  var gpm100 = l * f;
  return "The " + l + (l === 1 ? " loop" : " loops") + " at " + _dec(f, 2) + " gpm each draw " + _dec(gpm100, 2) + " gpm in all.";
}
