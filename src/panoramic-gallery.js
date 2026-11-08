import "./panoramic-gallery.css";

// Física idêntica à do componente original (motion/react): springs sem bounce.
class Spring {
  constructor(k, c, m) { this.k = k; this.c = c; this.m = m; this.x = 0; this.v = 0; this.t = 0; }
  step(dt) {
    const n = Math.max(1, Math.ceil(dt / 0.004)), h = dt / n;
    for (let i = 0; i < n; i++) {
      this.v += ((-this.k * (this.x - this.t) - this.c * this.v) / this.m) * h;
      this.x += this.v * h;
    }
    return this.x;
  }
}
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const map = (v, a, b, c, d) => c + (d - c) * clamp((v - a) / (b - a), 0, 1);

export function initPanoramicGallery(root = document.querySelector(".pg")) {
  if (!root) return;
  const scene = root.querySelector(".pg-scene");
  const text = root.querySelector(".pg-text");
  const cards = [...root.querySelectorAll(".pg-card")];
  const total = cards.length, center = (total - 1) / 2;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const L = cards.map((_, i) => {
    const o = i - center, a = Math.abs(o);
    return {
      z: Math.round(10 - a),
      d: { st: { x: o * 2, y: o * -2, rz: o * 2.5, ry: 0 }, pa: { x: o * 18, y: a * 3, rz: o * 1.5, ry: o * -12, s: 1 - a * 0.05 }, size: ["22vw", "32vh", "-11vw", "-16vh"] },
      m: { st: { x: o * 1.5, y: o * -1.5, rz: o * 3, ry: 0 }, pa: { x: o * 16, y: a * 5, rz: o * 2, ry: o * -15, s: 1 - a * 0.04 }, size: ["46vw", "30vh", "-23vw", "-15vh"] },
    };
  });

  let mobile = false;
  const layout = () => {
    mobile = innerWidth < 768;
    cards.forEach((el, i) => {
      const s = (mobile ? L[i].m : L[i].d).size;
      el.style.width = s[0]; el.style.height = s[1];
      el.style.marginLeft = s[2]; el.style.marginTop = s[3];
      el.parentElement.style.zIndex = L[i].z;
    });
  };
  addEventListener("resize", layout);
  layout();

  const prog = new Spring(80, 25, 0.5), tx = new Spring(50, 25, 0.5), ty = new Spring(50, 25, 0.5);
  let spread = false, rawX = 0, rawY = 0;
  addEventListener("pointermove", (e) => {
    if (reduce || !spread) return;
    rawX = (e.clientY / innerHeight - 0.5) * -10;
    rawY = (e.clientX / innerWidth - 0.5) * 10;
  }, { passive: true });

  const scrollP = () => {
    const r = root.getBoundingClientRect(), max = root.offsetHeight - innerHeight;
    return max > 0 ? clamp(-r.top / max, 0, 1) : 0;
  };
  prog.x = prog.t = scrollP();

  let last = performance.now(), running = false, raf = 0;
  const frame = (now) => {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    prog.t = scrollP();
    const p = map(prog.step(dt), 0.15, 0.85, 0, 1);
    spread = p > 0.95;
    if (!spread) { rawX = 0; rawY = 0; }
    tx.t = rawX; ty.t = rawY;
    scene.style.transform = `rotateX(${tx.step(dt)}deg) rotateY(${ty.step(dt)}deg)`;
    const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    cards.forEach((el, i) => {
      const l = mobile ? L[i].m : L[i].d, s = l.st, a = l.pa;
      const x = s.x + (a.x - s.x) * e, y = s.y + (a.y - s.y) * e;
      const rz = s.rz + (a.rz - s.rz) * e, ry = s.ry + (a.ry - s.ry) * e, sc = 0.75 + (a.s - 0.75) * e;
      el.style.transform = `translate(${x}vw,${y}vh) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${sc})`;
    });
    const f = map(p, 0, 0.45, 0, 1);
    text.style.transform = `translateY(${-6 * f}vh)`;
    text.style.opacity = 1 - f;
    if (running) raf = requestAnimationFrame(frame);
  };

  // Só anima enquanto a galeria está perto da tela (poupa CPU, o site tem vídeo no topo).
  new IntersectionObserver(([en]) => {
    if (en.isIntersecting && !running) { running = true; last = performance.now(); raf = requestAnimationFrame(frame); }
    else if (!en.isIntersecting) { running = false; cancelAnimationFrame(raf); }
  }, { rootMargin: "100% 0px" }).observe(root);
}

initPanoramicGallery();
