// Hero starfield: sparse twinkle layer on a <canvas class="stars">. No globals.
const hero = document.getElementById('home');
const cv = hero && hero.querySelector('canvas.stars');

if (cv) {
  const ctx = cv.getContext('2d');
  const text = hero.querySelector('.hero-col-content');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const TAU = Math.PI * 2;
  const rgb = getComputedStyle(hero).getPropertyValue('--color-star-rgb').trim() || '186,230,253';

  // One pre-rendered soft star sprite, stamped with drawImage.
  const sprite = document.createElement('canvas');
  sprite.width = sprite.height = 8;
  const sg = sprite.getContext('2d');
  const grad = sg.createRadialGradient(4, 4, 0, 4, 4, 4);
  grad.addColorStop(0, '#fff');
  grad.addColorStop(0.4, `rgba(${rgb},.6)`);
  grad.addColorStop(1, `rgba(${rgb},0)`);
  sg.fillStyle = grad;
  sg.fillRect(0, 0, 8, 8);

  let stars = [], w = 0, h = 0, raf = 0, last = 0, onScreen = true, timer;

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      const tw = 0.5 + 0.5 * Math.sin(t / 1000 * s.v + s.p);
      ctx.globalAlpha = (0.3 + 0.7 * tw) * s.k;
      ctx.drawImage(sprite, s.x, s.y, s.z, s.z);
    }
  }

  function init() {
    const b = hero.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    w = Math.round(b.width);
    h = Math.round(b.height);
    cv.width = w * dpr;
    cv.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // Dim stars that fall behind the headline/paragraph column.
    const q = text ? text.getBoundingClientRect() : { left: 0, right: 0, top: 0, bottom: 0 };
    const [l, r, tp, bt] = [q.left - b.left - 16, q.right - b.left + 16, q.top - b.top - 16, q.bottom - b.top + 16];
    stars = Array.from({ length: Math.min(140, Math.floor(w / 10)) }, () => {
      const x = Math.floor(Math.random() * w);
      const y = Math.floor(Math.random() * h);
      return {
        x, y,
        z: 3 + Math.floor(Math.random() * 3),
        p: Math.random() * TAU,
        v: 0.6 + Math.random() * 1.6,
        k: x > l && x < r && y > tp && y < bt ? 0.25 : 1
      };
    });
    draw(0);
  }

  function loop(now) {
    raf = requestAnimationFrame(loop);
    if (now - last < 33) return; // ~30 fps cap
    last = now;
    draw(now);
  }

  function sync() {
    cancelAnimationFrame(raf);
    raf = 0;
    if (motion.matches) draw(0); // static frame, loop never starts
    else if (onScreen && !document.hidden) raf = requestAnimationFrame(loop);
  }

  new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; sync(); }).observe(hero);
  document.addEventListener('visibilitychange', sync);
  motion.addEventListener('change', sync);
  addEventListener('resize', () => {
    clearTimeout(timer);
    timer = setTimeout(() => { init(); sync(); }, 200);
  });

  init();
  sync();
}
