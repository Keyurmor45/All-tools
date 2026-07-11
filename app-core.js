/* ================================================================
   app-core.js — AllTools Framework: Utilities, Categories, Renderer
   ================================================================ */

'use strict';

/* -------- Global TOOLS registry (filled by tools-*.js) -------- */
window.TOOLS = [];

/* -------- App State -------- */
const state = { category: 'all', query: '' };

/* -------- Categories -------- */
const CATEGORIES = [
  { id: 'all',       label: 'All Tools',       icon: '🛠️' },
  { id: 'text',      label: 'Text Tools',       icon: '📝' },
  { id: 'developer', label: 'Developer',         icon: '💻' },
  { id: 'math',      label: 'Math & Calc',       icon: '🔢' },
  { id: 'image',     label: 'Image Tools',       icon: '🖼️' },
  { id: 'color',     label: 'Color & Design',    icon: '🎨' },
  { id: 'security',  label: 'Security',          icon: '🔐' },
  { id: 'datetime',  label: 'Time & Date',       icon: '⏱️' },
  { id: 'converter', label: 'Converters',        icon: '🔄' },
  { id: 'web',       label: 'Web & Network',     icon: '🌐' },
];

/* ================================================================
   UTILITY FUNCTIONS
   ================================================================ */

/** Show a toast message */
function showToast(msg, dur = 2200) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), dur);
}

/** Copy text to clipboard */
async function copyText(text, btn) {
  try {
    await navigator.clipboard.writeText(text);
    if (btn) {
      const orig = btn.textContent;
      btn.textContent = '✓ Copied!';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 1800);
    }
    showToast('✓ Copied to clipboard');
  } catch {
    showToast('Failed to copy');
  }
}

/** Create an output block with a copy button */
function outputBlock(id = 'result', label = 'Result') {
  return `
    <div class="tool-section">
      <label class="tool-label">${label}</label>
      <div class="output-wrapper">
        <div class="tool-output" id="${id}" aria-live="polite"></div>
        <button class="copy-btn" id="${id}-copy" onclick="doCopy('${id}','${id}-copy')">Copy</button>
      </div>
    </div>`;
}

/** Used by inline onclick in outputBlock */
window.doCopy = function(outputId, btnId) {
  const text = document.getElementById(outputId)?.textContent || '';
  copyText(text, document.getElementById(btnId));
};

/** SHA hashing via WebCrypto */
async function hashSHA(algo, text) {
  const buf = await crypto.subtle.digest(algo, new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

/** Minimal MD5 (RFC 1321) */
function md5(str) {
  function safeAdd(x, y) { const lsw = (x & 0xffff) + (y & 0xffff); const msw = (x >> 16) + (y >> 16) + (lsw >> 16); return (msw << 16) | (lsw & 0xffff); }
  function bitRotateLeft(num, cnt) { return (num << cnt) | (num >>> (32 - cnt)); }
  function md5cmn(q, a, b, x, s, t) { return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b); }
  function md5ff(a, b, c, d, x, s, t) { return md5cmn((b & c) | (~b & d), a, b, x, s, t); }
  function md5gg(a, b, c, d, x, s, t) { return md5cmn((b & d) | (c & ~d), a, b, x, s, t); }
  function md5hh(a, b, c, d, x, s, t) { return md5cmn(b ^ c ^ d, a, b, x, s, t); }
  function md5ii(a, b, c, d, x, s, t) { return md5cmn(c ^ (b | ~d), a, b, x, s, t); }
  const T = [];
  for (let i = 0; i < 64; i++) T[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 4294967296);
  const m = str.split('').map(c => c.charCodeAt(0));
  const len = m.length;
  m.push(0x80);
  while (m.length % 64 !== 56) m.push(0);
  const bits = len * 8;
  m.push(bits & 0xff, (bits >> 8) & 0xff, (bits >> 16) & 0xff, (bits >> 24) & 0xff, 0, 0, 0, 0);
  let [a, b, c, d] = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476];
  for (let i = 0; i < m.length; i += 64) {
    const X = [];
    for (let j = 0; j < 16; j++) X[j] = m[i + j * 4] | (m[i + j * 4 + 1] << 8) | (m[i + j * 4 + 2] << 16) | (m[i + j * 4 + 3] << 24);
    let [aa, bb, cc, dd] = [a, b, c, d];
    [a,b,c,d]=[md5ff(a,b,c,d,X[0],7,T[0]),md5ff(d,a,b,c,X[1],12,T[1]),md5ff(c,d,a,b,X[2],17,T[2]),md5ff(b,c,d,a,X[3],22,T[3])];
    [a,b,c,d]=[md5ff(a,b,c,d,X[4],7,T[4]),md5ff(d,a,b,c,X[5],12,T[5]),md5ff(c,d,a,b,X[6],17,T[6]),md5ff(b,c,d,a,X[7],22,T[7])];
    [a,b,c,d]=[md5ff(a,b,c,d,X[8],7,T[8]),md5ff(d,a,b,c,X[9],12,T[9]),md5ff(c,d,a,b,X[10],17,T[10]),md5ff(b,c,d,a,X[11],22,T[11])];
    [a,b,c,d]=[md5ff(a,b,c,d,X[12],7,T[12]),md5ff(d,a,b,c,X[13],12,T[13]),md5ff(c,d,a,b,X[14],17,T[14]),md5ff(b,c,d,a,X[15],22,T[15])];
    [a,b,c,d]=[md5gg(a,b,c,d,X[1],5,T[16]),md5gg(d,a,b,c,X[6],9,T[17]),md5gg(c,d,a,b,X[11],14,T[18]),md5gg(b,c,d,a,X[0],20,T[19])];
    [a,b,c,d]=[md5gg(a,b,c,d,X[5],5,T[20]),md5gg(d,a,b,c,X[10],9,T[21]),md5gg(c,d,a,b,X[15],14,T[22]),md5gg(b,c,d,a,X[4],20,T[23])];
    [a,b,c,d]=[md5gg(a,b,c,d,X[9],5,T[24]),md5gg(d,a,b,c,X[14],9,T[25]),md5gg(c,d,a,b,X[3],14,T[26]),md5gg(b,c,d,a,X[8],20,T[27])];
    [a,b,c,d]=[md5gg(a,b,c,d,X[13],5,T[28]),md5gg(d,a,b,c,X[2],9,T[29]),md5gg(c,d,a,b,X[7],14,T[30]),md5gg(b,c,d,a,X[12],20,T[31])];
    [a,b,c,d]=[md5hh(a,b,c,d,X[5],4,T[32]),md5hh(d,a,b,c,X[8],11,T[33]),md5hh(c,d,a,b,X[11],16,T[34]),md5hh(b,c,d,a,X[14],23,T[35])];
    [a,b,c,d]=[md5hh(a,b,c,d,X[1],4,T[36]),md5hh(d,a,b,c,X[4],11,T[37]),md5hh(c,d,a,b,X[7],16,T[38]),md5hh(b,c,d,a,X[10],23,T[39])];
    [a,b,c,d]=[md5hh(a,b,c,d,X[13],4,T[40]),md5hh(d,a,b,c,X[0],11,T[41]),md5hh(c,d,a,b,X[3],16,T[42]),md5hh(b,c,d,a,X[6],23,T[43])];
    [a,b,c,d]=[md5hh(a,b,c,d,X[9],4,T[44]),md5hh(d,a,b,c,X[12],11,T[45]),md5hh(c,d,a,b,X[15],16,T[46]),md5hh(b,c,d,a,X[2],23,T[47])];
    [a,b,c,d]=[md5ii(a,b,c,d,X[0],6,T[48]),md5ii(d,a,b,c,X[7],10,T[49]),md5ii(c,d,a,b,X[14],15,T[50]),md5ii(b,c,d,a,X[5],21,T[51])];
    [a,b,c,d]=[md5ii(a,b,c,d,X[12],6,T[52]),md5ii(d,a,b,c,X[3],10,T[53]),md5ii(c,d,a,b,X[10],15,T[54]),md5ii(b,c,d,a,X[1],21,T[55])];
    [a,b,c,d]=[md5ii(a,b,c,d,X[8],6,T[56]),md5ii(d,a,b,c,X[15],10,T[57]),md5ii(c,d,a,b,X[6],15,T[58]),md5ii(b,c,d,a,X[13],21,T[59])];
    [a,b,c,d]=[md5ii(a,b,c,d,X[4],6,T[60]),md5ii(d,a,b,c,X[11],10,T[61]),md5ii(c,d,a,b,X[2],15,T[62]),md5ii(b,c,d,a,X[9],21,T[63])];
    a=safeAdd(a,aa);b=safeAdd(b,bb);c=safeAdd(c,cc);d=safeAdd(d,dd);
  }
  return [a,b,c,d].map(v=>[v&255,(v>>8)&255,(v>>16)&255,(v>>24)&255].map(x=>x.toString(16).padStart(2,'0')).join('')).join('');
}

/** Simple HTML→text (strip tags) */
function stripHTML(html) { const d = document.createElement('div'); d.innerHTML = html; return d.textContent || ''; }

/** Escape HTML */
function escapeHTML(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

/** Unescape HTML entities */
function unescapeHTML(str) {
  const d = document.createElement('textarea'); d.innerHTML = str; return d.value;
}

/** HEX ↔ RGB ↔ HSL helpers */
function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  return r ? { r: parseInt(r[1],16), g: parseInt(r[2],16), b: parseInt(r[3],16) } : null;
}
function rgbToHex(r,g,b) { return '#'+[r,g,b].map(x=>Math.round(x).toString(16).padStart(2,'0')).join(''); }
function rgbToHsl(r,g,b) {
  r/=255;g/=255;b/=255;
  const max=Math.max(r,g,b), min=Math.min(r,g,b);
  let h,s,l=(max+min)/2;
  if(max===min){h=s=0}else{const d=max-min;s=l>.5?d/(2-max-min):d/(max+min);switch(max){case r:h=((g-b)/d+(g<b?6:0))/6;break;case g:h=((b-r)/d+2)/6;break;case b:h=((r-g)/d+4)/6;break;}}
  return {h:Math.round(h*360),s:Math.round(s*100),l:Math.round(l*100)};
}
function hslToHex(h,s,l) {
  s/=100;l/=100;
  const a=s*Math.min(l,1-l);
  const f=n=>{const k=(n+h/30)%12;const c=l-a*Math.max(Math.min(k-3,9-k,1),-1);return Math.round(255*c).toString(16).padStart(2,'0');};
  return `#${f(0)}${f(8)}${f(4)}`;
}

/** UUID v4 */
function uuidV4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

/** Markdown to HTML (basic) */
function mdToHtml(md) {
  return md
    .replace(/^#{6}\s(.+)/gm,'<h6>$1</h6>')
    .replace(/^#{5}\s(.+)/gm,'<h5>$1</h5>')
    .replace(/^#{4}\s(.+)/gm,'<h4>$1</h4>')
    .replace(/^#{3}\s(.+)/gm,'<h3>$1</h3>')
    .replace(/^#{2}\s(.+)/gm,'<h2>$1</h2>')
    .replace(/^#{1}\s(.+)/gm,'<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,'<em>$1</em>')
    .replace(/`(.+?)`/g,'<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g,'<a href="$2" target="_blank">$1</a>')
    .replace(/^---$/gm,'<hr>')
    .replace(/^>\s(.+)/gm,'<blockquote>$1</blockquote>')
    .replace(/^[-*]\s(.+)/gm,'<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s,'<ul>$1</ul>')
    .replace(/\n\n/g,'</p><p>')
    .replace(/^(?!<[h1-6bpul])/gm, s => s ? `<p>${s}</p>` : s);
}

/* ================================================================
   RENDER ENGINE
   ================================================================ */

function renderCategories() {
  const wrap = document.getElementById('categories');
  if (!wrap) return;
  wrap.innerHTML = CATEGORIES.map(cat => {
    const count = cat.id === 'all' ? TOOLS.length : TOOLS.filter(t => t.category === cat.id).length;
    return `<button class="category-pill ${cat.id === state.category ? 'active' : ''}"
      data-cat="${cat.id}" role="tab" aria-selected="${cat.id === state.category}"
      aria-label="Filter by ${cat.label}">
      ${cat.icon} ${cat.label} <span class="cat-count">${count}</span>
    </button>`;
  }).join('');
  wrap.querySelectorAll('.category-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      state.category = btn.dataset.cat;
      filterAndRender();
      updateCategoryUI();
    });
  });
}

function updateCategoryUI() {
  document.querySelectorAll('.category-pill').forEach(btn => {
    const active = btn.dataset.cat === state.category;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-selected', active);
  });
}

function filterAndRender() {
  let tools = TOOLS;
  if (state.category !== 'all') tools = tools.filter(t => t.category === state.category);
  if (state.query) {
    const q = state.query.toLowerCase();
    tools = tools.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      (t.tags || []).some(tag => tag.toLowerCase().includes(q))
    );
  }
  renderToolCards(tools);
  const info = document.getElementById('results-info');
  const noRes = document.getElementById('no-results');
  if (tools.length === 0) {
    info.style.display = 'none';
    noRes.style.display = 'block';
  } else {
    noRes.style.display = 'none';
    if (state.query || state.category !== 'all') {
      info.style.display = 'flex';
      document.getElementById('results-text').textContent =
        `${tools.length} tool${tools.length !== 1 ? 's' : ''} found`;
    } else {
      info.style.display = 'none';
    }
  }
}

function renderToolCards(tools) {
  const grid = document.getElementById('tools-grid');
  if (!grid) return;
  grid.innerHTML = tools.map((tool, i) => `
    <div class="tool-card cat-${tool.category}" role="listitem"
         style="animation-delay:${Math.min(i * 0.03, 0.5)}s"
         data-tool-id="${tool.id}" tabindex="0"
         aria-label="Open ${tool.name} tool">
      <div class="tool-card-inner">
        <div class="tool-card-icon" aria-hidden="true">${tool.icon}</div>
        <div class="tool-card-meta">
          <span class="tool-card-category">${getCategoryLabel(tool.category)}</span>
        </div>
        <div class="tool-card-name">${tool.name}</div>
        <div class="tool-card-desc">${tool.description}</div>
        <div class="tool-card-footer">
          <span class="tool-card-open">Open Tool <span class="tool-card-arrow">→</span></span>
        </div>
      </div>
    </div>`).join('');
  grid.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('click', () => openTool(card.dataset.toolId));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openTool(card.dataset.toolId); });
  });
}

function getCategoryLabel(id) {
  return (CATEGORIES.find(c => c.id === id) || {}).label || id;
}

/* ================================================================
   MODAL
   ================================================================ */

let currentTool = null;

function openTool(id) {
  const tool = TOOLS.find(t => t.id === id);
  if (!tool) return;
  currentTool = tool;
  document.getElementById('modal-icon').textContent = tool.icon;
  document.getElementById('modal-title-el').textContent = tool.name;
  document.getElementById('modal-description-el').textContent = tool.description;
  const body = document.getElementById('modal-body');
  body.innerHTML = '<div class="pulse" style="text-align:center;padding:40px;color:var(--text-muted)">Loading…</div>';
  const overlay = document.getElementById('modal-overlay');
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  // Give browser a tick to paint modal, then setup tool
  requestAnimationFrame(() => {
    body.innerHTML = '';
    try { tool.setup(body); } catch(e) { body.innerHTML = `<div class="alert alert-error">Error loading tool: ${e.message}</div>`; }
  });
}

function closeTool() {
  const overlay = document.getElementById('modal-overlay');
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  currentTool = null;
}

/* ================================================================
   SEARCH
   ================================================================ */

function setupSearch() {
  const inputs = ['hero-search', 'nav-search'];
  inputs.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', e => {
      state.query = e.target.value.trim();
      syncSearchInputs(state.query);
      filterAndRender();
      const clr = document.getElementById('search-clear');
      if (clr) clr.style.display = state.query ? 'flex' : 'none';
      if (state.query && id === 'hero-search') {
        document.getElementById('main')?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  document.getElementById('search-clear')?.addEventListener('click', clearSearch);
  document.getElementById('clear-search-btn')?.addEventListener('click', clearSearch);
  document.getElementById('show-all-btn')?.addEventListener('click', clearSearch);
}

function syncSearchInputs(val) {
  ['hero-search','nav-search'].forEach(id => {
    const el = document.getElementById(id);
    if (el && el.value !== val) el.value = val;
  });
}

function clearSearch() {
  state.query = '';
  state.category = 'all';
  syncSearchInputs('');
  const clr = document.getElementById('search-clear');
  if (clr) clr.style.display = 'none';
  updateCategoryUI();
  filterAndRender();
}

/* ================================================================
   PARTICLES / STARFIELD
   ================================================================ */

function initParticles() {
  // Editorial theme — no particle canvas needed
  const canvas = document.getElementById('starfield');
  if (canvas) canvas.style.display = 'none';

}

/* ================================================================
   KEYBOARD SHORTCUTS & MISC
   ================================================================ */

function setupKeyboard() {
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const search = document.getElementById('hero-search') || document.getElementById('nav-search');
      search?.focus();
    }
    if (e.key === 'Escape') closeTool();
  });
  document.getElementById('modal-close')?.addEventListener('click', closeTool);
  document.getElementById('modal-overlay')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeTool();
  });
}

function setupNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 60);
  });
  document.getElementById('logo-link')?.addEventListener('click', e => {
    e.preventDefault();
    clearSearch();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* expose helpers globally for tool use */
window.showToast = showToast;
window.copyText = copyText;
window.outputBlock = outputBlock;
window.hashSHA = hashSHA;
window.md5 = md5;
window.escapeHTML = escapeHTML;
window.unescapeHTML = unescapeHTML;
window.hexToRgb = hexToRgb;
window.rgbToHex = rgbToHex;
window.rgbToHsl = rgbToHsl;
window.hslToHex = hslToHex;
window.uuidV4 = uuidV4;
window.mdToHtml = mdToHtml;
window.openTool = openTool;
window.closeTool = closeTool;
window.filterAndRender = filterAndRender;
window.clearSearch = clearSearch;
window.state = state;
window.CATEGORIES = CATEGORIES;
window.renderCategories = renderCategories;
window.updateCategoryUI = updateCategoryUI;
window.setupSearch = setupSearch;
window.setupKeyboard = setupKeyboard;
window.setupNavbar = setupNavbar;
window.initParticles = initParticles;
