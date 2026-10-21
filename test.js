const fs = require("fs");
eval(fs.readFileSync("engine.js", "utf8"));
const exp = JSON.parse(fs.readFileSync("expected.json", "utf8"));
const fns = { tubing: tubingTruth, loops: loopsTruth, manifold: manifoldTruth, flow: flowTruth };
let fail = 0;
for (const c of exp.cases) {
  const got = fns[c.fn](...c.args);
  if (got !== c.expect) { fail++; console.log("MISMATCH", c.fn, c.args, "\n got:", got, "\n exp:", c.expect); }
}
const ERRS = ["the area must be from 1 to 100000 sq ft with no decimal places",
  "the spacing must be a whole number from 1 to 24 inches on center",
  "the tubing length must be from 0.01 to 100000 ft with at most two decimal places",
  "the maximum loop length must be from 1 to 1000 ft with no decimal places",
  "the loop count must be from 1 to 1000 with no decimal places",
  "the ports per manifold must be from 1 to 100 with no decimal places",
  "the flow per loop must be from 0.01 to 10 gpm with at most two decimal places"];
for (const [fn, args] of exp.errors) {
  let threw = null;
  try { fns[fn](...args); } catch (e) { threw = e.message; }
  if (!threw || !ERRS.includes(threw)) { fail++; console.log("ERRCASE FAIL", fn, args, "->", threw); }
}
console.log(fail ? `${fail} FAILURES` : "all green");
process.exit(fail ? 1 : 0);
