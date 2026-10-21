import json, random

def dec2(n):
    w, f = divmod(n, 100)
    s = str(w); fs = str(f).zfill(2).rstrip("0")
    return s + "." + fs if fs else s
def hu(n, d): return (2*n + d) // (2*d)

def tubing(a, s):
    ft100 = hu(a*12*100, s)
    return f"The floor of {a} sq ft with tubing at {s} inches on center takes {dec2(ft100)} ft of tubing."
def loops(t, m):
    m100 = m*100
    n = (t + m100 - 1) // m100
    last = t - (n-1)*m100
    word = "loop" if n == 1 else "loops"
    return f"The tubing of {dec2(t)} ft in loops of at most {m} ft takes {n} {word}, the last one carrying {dec2(last)} ft."
def manifold(l, p):
    n = (l + p - 1) // p
    spare = n*p - l
    lw = "loop" if l == 1 else "loops"
    pw = "port" if p == 1 else "ports"
    mw = "manifold" if n == 1 else "manifolds"
    sw = "port" if spare == 1 else "ports"
    return f"The {l} {lw} on manifolds of {p} {pw} take {n} {mw}, leaving {spare} {sw} spare."
def flow(l, f):
    gpm100 = l*f
    lw = "loop" if l == 1 else "loops"
    return f"The {l} {lw} at {dec2(f)} gpm each draw {dec2(gpm100)} gpm in all."

random.seed(746)
cases = [
  dict(fn="tubing", args=["1000","12"], expect=tubing(1000,12)),
  dict(fn="loops", args=["1000","300"], expect=loops(100000,300)),
  dict(fn="manifold", args=["4","8"], expect=manifold(4,8)),
  dict(fn="flow", args=["4","0.5"], expect=flow(4,50)),
]
for _ in range(25):
    a = random.randint(1,100000); s = random.randint(1,24)
    cases.append(dict(fn="tubing", args=[str(a),str(s)], expect=tubing(a,s)))
for _ in range(25):
    t = random.randint(1,10000000); m = random.randint(1,1000)
    cases.append(dict(fn="loops", args=[dec2(t),str(m)], expect=loops(t,m)))
for _ in range(20):
    l = random.randint(1,1000); p = random.randint(1,100)
    cases.append(dict(fn="manifold", args=[str(l),str(p)], expect=manifold(l,p)))
for _ in range(20):
    l = random.randint(1,1000); f = random.randint(1,1000)
    cases.append(dict(fn="flow", args=[str(l),dec2(f)], expect=flow(l,f)))
errcases = [
  ["tubing", ["0","12"]], ["tubing", ["1000","0"]], ["tubing", ["1000","25"]], ["tubing", ["1000","12.5"]],
  ["loops", ["0","300"]], ["loops", ["1000","0"]],
  ["manifold", ["0","8"]], ["manifold", ["4","0"]],
  ["flow", ["0","0.5"]], ["flow", ["4","0"]], ["flow", ["4","10.01"]],
  ["loops", ["100000.01","300"]],
]
json.dump(dict(cases=cases, errors=errcases), open("expected.json","w"), indent=1)
print(len(cases), "cases,", len(errcases), "errcases")
