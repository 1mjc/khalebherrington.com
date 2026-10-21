/* ==========================================================================
   Khaleb Herrington — portfolio behaviour
   Reads SITE and WORKS from works.js. No build step, no dependencies.
   ========================================================================== */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const KIND = { tattoo: 'Tattoo', art: 'Original artwork' };
  const RING_ICON = '<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1"><circle cx="8" cy="8" r="6.5"/><circle cx="8" cy="8" r="2.2" fill="currentColor"/></svg>';

  /* ------------------------------------------------------------------
     Generated ink plates (placeholders for pieces with no photo yet)
     ------------------------------------------------------------------ */
  function hashStr(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) { return () => { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

  const plateCache = new Map();
  function plate(key, ratio = 1.25, w = 640) {
    const id = key + '@' + ratio;
    if (plateCache.has(id)) return plateCache.get(id);

    const h = Math.round(w * ratio);
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const g = c.getContext('2d');
    const r = rng(hashStr(key));
    const variant = Math.floor(r() * 3);
    const cx = w / 2, cy = h * (variant === 1 ? 0.3 : 0.48);
    const gauss = () => (r() + r() + r()) / 3 - 0.5;

    // paper
    g.fillStyle = '#c6c2b6'; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 26; i++) {
      const x = r() * w, y = r() * h, rad = 90 + r() * 220;
      const gr = g.createRadialGradient(x, y, 0, x, y, rad);
      gr.addColorStop(0, `rgba(255,255,255,${0.04 + r() * 0.06})`); gr.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = gr; g.fillRect(x - rad, y - rad, rad * 2, rad * 2);
    }
    for (let i = 0; i < 2600; i++) { g.fillStyle = `rgba(40,35,30,${r() * 0.1})`; g.fillRect(r() * w, r() * h, 1, 1); }

    const ink = 'rgba(6,6,8,';
    const blot = (x, y, rad, a) => {
      const gr = g.createRadialGradient(x, y, 0, x, y, rad);
      gr.addColorStop(0, ink + a + ')'); gr.addColorStop(0.68, ink + (a * 0.93) + ')'); gr.addColorStop(1, ink + '0)');
      g.fillStyle = gr; g.beginPath(); g.arc(x, y, rad, 0, 6.2832); g.fill();
    };
    const dot = (x, y, s, a) => { g.fillStyle = ink + a + ')'; g.beginPath(); g.arc(x, y, s, 0, 6.2832); g.fill(); };

    const stipple = (n, spreadX, spreadY, ox = cx, oy = cy) => {
      for (let i = 0; i < n; i++) dot(ox + gauss() * spreadX, oy + gauss() * spreadY, 0.5 + r() * 0.8, 0.35 + r() * 0.5);
    };

    const rings = (rad) => {
      g.save(); g.translate(cx, cy); g.strokeStyle = ink + '0.85)'; g.lineWidth = 0.7;
      [rad, rad * 1.1, rad * 1.18].forEach((R, i) => {
        g.setLineDash(i === 1 ? [2, 6] : []); g.beginPath(); g.arc(0, 0, R, 0, 6.2832); g.stroke();
      });
      g.setLineDash([]);
      const R = rad * 1.18;
      for (let i = 0; i < 96; i++) {
        const a = (i / 96) * 6.2832, long = i % 8 === 0, len = long ? 14 : 6;
        g.beginPath(); g.moveTo(Math.cos(a) * R, Math.sin(a) * R); g.lineTo(Math.cos(a) * (R + len), Math.sin(a) * (R + len)); g.stroke();
      }
      // inscribed triangle
      g.beginPath();
      for (let i = 0; i < 3; i++) { const a = -1.5708 + i * 2.0944; const px = Math.cos(a) * rad, py = Math.sin(a) * rad; i ? g.lineTo(px, py) : g.moveTo(px, py); }
      g.closePath(); g.stroke();
      g.restore();
    };

    if (variant === 0) {
      // mirrored bloom, like a folded-paper blot
      for (let i = 0; i < 80; i++) {
        const y = cy + gauss() * h * 0.5, dx = Math.abs(gauss()) * w * 0.36 + 4;
        const rad = 12 + r() * 46 * (1 - Math.abs(y - cy) / h);
        const a = 0.55 + r() * 0.4;
        blot(cx + dx, y, rad, a); blot(cx - dx, y, rad, a);
      }
      blot(cx, cy, 70, 0.95);
      for (let i = 0; i < 110; i++) {
        const ang = r() * 6.2832, d = 70 + r() * w * 0.34, s = 1 + r() * 5;
        blot(cx + Math.cos(ang) * d, cy + Math.sin(ang) * d, s, 0.9);
      }
      stipple(1800, w * 0.55, h * 0.45);
      rings(w * 0.33);
    } else if (variant === 1) {
      // pooled head with long drips and a measuring scale
      for (let i = 0; i < 60; i++) blot(cx + gauss() * w * 0.55, cy + gauss() * h * 0.12, 18 + r() * 40, 0.8);
      const cols = 5 + Math.floor(r() * 4);
      for (let k = 0; k < cols; k++) {
        const x = w * (0.18 + (0.64 * k) / (cols - 1)) + (r() - 0.5) * 12;
        const len = h * (0.22 + r() * 0.5);
        let rad = 6 + r() * 6;
        for (let y = cy; y < cy + len; y += 3) { blot(x + (r() - 0.5) * 1.2, y, rad, 0.9); rad = Math.max(1.4, rad - 0.035); }
        blot(x, cy + len, rad + 3.5, 0.95);
        g.strokeStyle = ink + '0.5)'; g.lineWidth = 0.6; g.beginPath(); g.moveTo(x, cy + len + 12); g.lineTo(x, h - 28); g.stroke();
      }
      g.strokeStyle = ink + '0.85)'; g.lineWidth = 0.7;
      for (let y = 28; y < h - 28; y += 10) { const long = ((y - 28) / 10) % 5 === 0; g.beginPath(); g.moveTo(28, y); g.lineTo(28 + (long ? 16 : 8), y); g.stroke(); }
      stipple(1400, w * 0.7, h * 0.25, cx, cy + h * 0.1);
    } else {
      // black sun with a crescent lifted from it
      const R = w * 0.24;
      for (let i = 0; i < 30; i++) { const a = r() * 6.2832; blot(cx + Math.cos(a) * R * 0.85, cy + Math.sin(a) * R * 0.85, 14 + r() * 22, 0.9); }
      blot(cx, cy, R, 1);
      g.fillStyle = '#c9c5b9'; g.beginPath(); g.arc(cx + R * 0.42, cy - R * 0.1, R * 0.82, 0, 6.2832); g.fill();
      stipple(1900, R * 2.4, R * 2.4);
      for (let i = 0; i < 70; i++) { const a = r() * 6.2832, d = R * (1.1 + r() * 1.4); blot(cx + Math.cos(a) * d, cy + Math.sin(a) * d, 1 + r() * 3, 0.9); }
      rings(w * 0.34);
    }

    // vertical axis hairline and plate border
    g.strokeStyle = ink + '0.4)'; g.lineWidth = 0.6;
    g.beginPath(); g.moveTo(cx, 18); g.lineTo(cx, h - 18); g.stroke();
    g.strokeStyle = ink + '0.55)'; g.strokeRect(14.5, 14.5, w - 29, h - 29);

    // vignette
    const v = g.createRadialGradient(cx, h / 2, Math.min(w, h) * 0.3, cx, h / 2, Math.max(w, h) * 0.8);
    v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.35)');
    g.fillStyle = v; g.fillRect(0, 0, w, h);

    const url = c.toDataURL('image/jpeg', 0.88);
    plateCache.set(id, url);
    return url;
  }

  const imgFor = (w) => w.image || plate(w.id, w.ratio || 1.25);

  /* ------------------------------------------------------------------
     State & helpers
     ------------------------------------------------------------------ */
  const hasSale = (w) => w.mint && w.mint.status === 'available';
  const hasMint = (w) => Boolean(w.mint);
  let filter = 'all';
  let visible = WORKS.slice();

  const filters = {
    all: () => true,
    tattoo: (w) => w.kind === 'tattoo',
    art: (w) => w.kind === 'art',
    sale: hasSale
  };

  function badge(w) {
    if (!hasMint(w)) return '';
    const s = w.mint.status;
    const label = s === 'available' ? 'For sale on Manifold' : s === 'soon' ? 'Mint coming' : 'Collected';
    return `<span class="badge" data-status="${esc(s)}">${RING_ICON}${label}</span>`;
  }

  /* ------------------------------------------------------------------
     Grid
     ------------------------------------------------------------------ */
  const grid = $('#grid'), count = $('#count');

  function renderGrid() {
    visible = WORKS.filter(filters[filter]);
    if (!visible.length) {
      grid.innerHTML = '';
      count.textContent = filter === 'sale' ? 'Nothing is for sale right now. New mints are announced here first.' : 'No pieces in this view yet.';
      return;
    }
    count.textContent = `${visible.length} ${visible.length === 1 ? 'piece' : 'pieces'}`;
    grid.innerHTML = visible.map((w) => `
      <article class="card">
        <button type="button" data-id="${esc(w.id)}" aria-label="Open ${esc(w.title)}">
          <span class="thumb" style="aspect-ratio: 1 / ${w.ratio || 1.25}">
            <img src="${imgFor(w)}" alt="${esc(w.alt || w.title)}" loading="lazy" decoding="async">
            ${badge(w)}
          </span>
          <span class="card-meta">
            <span class="card-title">${esc(w.title)}</span>
            <span class="card-sub">${esc(KIND[w.kind] || '')}, ${esc(w.year)}</span>
          </span>
        </button>
      </article>`).join('');
  }

  $('.filters').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-filter]');
    if (!b) return;
    filter = b.dataset.filter;
    document.querySelectorAll('.filters button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    renderGrid();
  });

  grid.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-id]');
    if (b) openPiece(b.dataset.id);
  });

  /* ------------------------------------------------------------------
     Available-to-collect strip
     ------------------------------------------------------------------ */
  function renderMints() {
    const list = WORKS.filter((w) => hasMint(w) && w.mint.status !== 'sold');
    const sec = $('#mints');
    sec.hidden = !list.length;
    $('#navMints').hidden = !list.length;
    $('#mintList').innerHTML = list.map((w) => {
      const m = w.mint;
      const cta = m.status === 'available' && m.url
        ? `<a class="btn mint" href="${esc(m.url)}" target="_blank" rel="noopener noreferrer">Collect on Manifold</a>`
        : `<span class="mint-line"><strong>Mint opens ${esc(m.when || 'soon')}</strong></span>`;
      return `
      <article class="mint-item">
        <button type="button" class="thumb" data-id="${esc(w.id)}" aria-label="Open ${esc(w.title)}" style="border:0;padding:0;cursor:pointer">
          <img src="${imgFor(w)}" alt="${esc(w.alt || w.title)}" loading="lazy" decoding="async">
        </button>
        <h3><button type="button" data-id="${esc(w.id)}">${esc(w.title)}</button></h3>
        <p class="mint-line"><span><strong>${esc(m.price)}</strong></span><span>${esc(m.edition)}</span><span>${esc(m.chain)}</span></p>
        ${cta}
      </article>`;
    }).join('');
  }
  $('#mintList').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-id]');
    if (b) openPiece(b.dataset.id);
  });

  /* ------------------------------------------------------------------
     Piece detail
     ------------------------------------------------------------------ */
  const dlg = $('#piece');
  let current = null;
  let opener = null;

  function mintBox(w) {
    if (!w.mint) return '';
    const m = w.mint;
    const rows = `<dl>
        ${m.edition ? `<div><dt>Edition</dt><dd>${esc(m.edition)}</dd></div>` : ''}
        ${m.price ? `<div><dt>Price</dt><dd>${esc(m.price)}</dd></div>` : ''}
        ${m.chain ? `<div><dt>Chain</dt><dd>${esc(m.chain)}</dd></div>` : ''}
      </dl>`;
    if (m.status === 'available') {
      return `<aside class="mintbox" data-status="available">
        <h4>For sale on Manifold</h4>${rows}
        ${m.url ? `<a class="btn mint" href="${esc(m.url)}" target="_blank" rel="noopener noreferrer">Collect on Manifold</a>` : ''}
        <p>You will need a crypto wallet. The sale happens on Manifold, not on this site.</p>
      </aside>`;
    }
    if (m.status === 'soon') {
      return `<aside class="mintbox" data-status="soon">
        <h4>Mint opens ${esc(m.when || 'soon')}</h4>${rows}
        ${m.url ? `<a class="btn mint" href="${esc(m.url)}" target="_blank" rel="noopener noreferrer">View on Manifold</a>` : '<p>The link will appear here when the mint opens.</p>'}
      </aside>`;
    }
    return `<aside class="mintbox" data-status="sold">
      <h4>Collected</h4>${rows}
      <p>This edition has been collected. You can still find it on the secondary market through Manifold.</p>
      ${m.url ? `<a class="textlink" href="${esc(m.url)}" target="_blank" rel="noopener noreferrer">View on Manifold</a>` : ''}
    </aside>`;
  }

  function fillPiece(w) {
    current = w;
    $('#pImg').src = imgFor(w);
    $('#pImg').alt = w.alt || w.title;
    $('#pKind').textContent = `${KIND[w.kind] || ''}, ${w.year}`;
    $('#pTitle').textContent = w.title;
    $('#pFacts').innerHTML = (w.details || []).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('');
    $('#pMint').innerHTML = mintBox(w);

    const th = (w.thoughts || []);
    $('#pThoughtsWrap').hidden = !th.length;
    $('#pThoughts').innerHTML = th.map((p) => `<p>${esc(p)}</p>`).join('');

    const pr = (w.process || []);
    $('#pProcessWrap').hidden = !pr.length;
    $('#pProcess').innerHTML = pr.map((s, i) => {
      const src = s.image === 'sample' ? plate(w.id + '-step-' + i, 0.75, 420) : s.image;
      return `<li><h5>${esc(s.title)}</h5><p>${esc(s.text)}</p>${src ? `<img src="${src}" alt="${esc(s.title)}" loading="lazy">` : ''}</li>`;
    }).join('');

    $('#pEnquire').innerHTML = w.kind === 'tattoo'
      ? `<a class="btn" href="mailto:${esc(SITE.email)}?subject=${encodeURIComponent('Tattoo enquiry: something like ' + w.title)}">Enquire about something like this</a>`
      : '';

    $('.text', dlg).scrollTop = 0;
    dlg.scrollTop = 0;
  }

  function openPiece(id, replace) {
    const w = WORKS.find((x) => x.id === id);
    if (!w) return;
    if (!dlg.open) { opener = document.activeElement; dlg.showModal(); document.documentElement.classList.add('lock'); }
    fillPiece(w);
    const hash = '#' + encodeURIComponent(id);
    if (location.hash !== hash) history[replace ? 'replaceState' : 'pushState'](null, '', hash);
  }

  function step(dir) {
    const list = visible.some((w) => current && w.id === current.id) ? visible : WORKS;
    const i = list.findIndex((w) => w.id === current.id);
    openPiece(list[(i + dir + list.length) % list.length].id, true);
  }

  dlg.addEventListener('close', () => {
    document.documentElement.classList.remove('lock');
    if (location.hash) history.replaceState(null, '', location.pathname + location.search);
    if (opener && opener.isConnected) opener.focus();
    opener = null;
  });
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  $('#pClose').addEventListener('click', () => dlg.close());
  $('#pPrev').addEventListener('click', () => step(-1));
  $('#pNext').addEventListener('click', () => step(1));
  dlg.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  });

  function fromHash() {
    const id = decodeURIComponent(location.hash.slice(1));
    if (id && WORKS.some((w) => w.id === id)) openPiece(id, true);
    else if (dlg.open) dlg.close();
  }
  window.addEventListener('hashchange', fromHash);

  /* ------------------------------------------------------------------
     Site chrome
     ------------------------------------------------------------------ */
  function fillSite() {
    $('#year').textContent = new Date().getFullYear();
    $('#booking').textContent = SITE.booking || '';
    $('#email').href = 'mailto:' + SITE.email;
    $('#email').textContent = SITE.email;
    $('#instagram').href = SITE.instagram;
    $('#manifoldProfile').href = SITE.manifoldProfile;
    $('#manifold2').href = SITE.manifoldProfile;
  }

  const bar = $('#bar');
  const onScroll = () => bar.classList.toggle('solid', scrollY > 40);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ------------------------------------------------------------------
     Hero: smoke-ink drops that follow the pointer and slowly dissolve
     ------------------------------------------------------------------ */
  function inkHero() {
    const hero = $('.hero'), cv = $('#ink'), g = cv.getContext('2d');
    let W = 0, H = 0, dpr = 1, drops = [], raf = 0, idle = 0, lx = -999, ly = -999;

    function size() {
      dpr = Math.min(devicePixelRatio || 1, 1.5);
      W = hero.clientWidth; H = hero.clientHeight;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function drop(x, y, big) {
      drops.push({ x, y, r: big ? 26 : 9, grow: big ? 0.8 : 0.35, life: big ? 320 : 170, age: 0, a: big ? 0.2 : 0.1 });
      if (drops.length > 170) drops.shift();
    }
    function paint() {
      g.clearRect(0, 0, W, H);
      g.globalCompositeOperation = 'lighter';
      for (const d of drops) {
        const k = 1 - d.age / d.life; if (k <= 0) continue;
        const rad = d.r, a = d.a * k * k;
        const gr = g.createRadialGradient(d.x, d.y, 0, d.x, d.y, rad);
        gr.addColorStop(0, `rgba(190,186,225,${a})`); gr.addColorStop(1, 'rgba(190,186,225,0)');
        g.fillStyle = gr; g.beginPath(); g.arc(d.x, d.y, rad, 0, 6.2832); g.fill();
      }
    }
    function tick() {
      for (const d of drops) { d.age++; d.r += d.grow * (1 - (d.age / d.life) * 0.7); d.y -= 0.06; }
      drops = drops.filter((d) => d.age < d.life);
      paint();
      raf = requestAnimationFrame(tick);
    }
    function start() { if (!raf && !reduceMotion) { raf = requestAnimationFrame(tick); idle = setInterval(() => drop(Math.random() * W, H * (0.2 + Math.random() * 0.7), true), 1800); } }
    function stop() { cancelAnimationFrame(raf); raf = 0; clearInterval(idle); }

    size();
    addEventListener('resize', () => { size(); if (reduceMotion) seedStatic(); });
    hero.addEventListener('pointermove', (e) => {
      const b = hero.getBoundingClientRect(), x = e.clientX - b.left, y = e.clientY - b.top;
      if (Math.hypot(x - lx, y - ly) > 16) { lx = x; ly = y; drop(x, y, false); }
    });
    hero.addEventListener('pointerdown', (e) => { const b = hero.getBoundingClientRect(); drop(e.clientX - b.left, e.clientY - b.top, true); });

    function seedStatic() { drops = []; for (let i = 0; i < 6; i++) { drop(W * (0.1 + Math.random() * 0.8), H * (0.15 + Math.random() * 0.6), true); drops[i].age = 40; drops[i].r = 120 + Math.random() * 120; } paint(); }
    if (reduceMotion) seedStatic();

    new IntersectionObserver(([en]) => (en.isIntersecting ? start() : stop()), { threshold: 0 }).observe(hero);
  }

  /* ------------------------------------------------------------------
     Init
     ------------------------------------------------------------------ */
  fillSite();
  renderGrid();
  renderMints();
  inkHero();
  fromHash();
})();
