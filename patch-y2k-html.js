const fs = require('fs');

// 1. UPDATE index.html
let html = fs.readFileSync('index.html', 'utf8');

// Replace fonts
html = html.replace(
  '<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">',
  '<link href="https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Inter:wght@400;700;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">'
);

// Add marquee right after <body>
if (!html.includes('<div class="marquee">')) {
  html = html.replace(
    '<body>',
    '<body>\n\n  <div class="marquee">\n    <span>512+ FREE TOOLS * NO SIGNUPS * LOCAL AI * PDF STUDIO * BROWSER-BASED * SECURE * 512+ FREE TOOLS * NO SIGNUPS * LOCAL AI * PDF STUDIO * BROWSER-BASED * SECURE *</span>\n  </div>'
  );
}

// Remove Theme Selector from Navbar
html = html.replace(
  /<select class="theme-select" id="theme-select" aria-label="Select Theme">[\s\S]*?<\/select>/,
  ''
);

// Overhaul Hero Section
const newHero = `  <section class="hero" id="home" aria-labelledby="hero-heading">
    <div class="hero-content">
      <div class="sticker">100%<br>FREE</div>
      <h1 class="hero-title" id="hero-heading">
        Stop <span>Googling.</span><br>
        Just <span class="highlight chrome">Open This.</span>
      </h1>
      <p class="hero-subtitle">512 hand-picked tools for modern developers, creators, and doers. No account, no ads, completely local. Everything runs perfectly in your browser.</p>
      <div class="hero-actions">
        <div class="hero-search-wrapper">
          <div class="hero-search" role="search">
            <input type="text" id="hero-search" placeholder="Try: JSON, password, color picker, BMI…" autocomplete="off" aria-label="Search for tools">
            <span class="search-icon-hero" aria-hidden="true">↗</span>
            <button class="search-clear" id="search-clear" style="display:none" aria-label="Clear search">✕</button>
          </div>
        </div>
        <button class="btn-surprise" id="surprise-btn" aria-label="Open a random tool">
          🎲 SURPRISE ME
        </button>
      </div>
      <div class="hero-stats" role="list" aria-label="Website statistics">
        <div class="stat" role="listitem">
          <span class="stat-num" aria-label="512 plus tools">512+</span>
          <span class="stat-label">Tools</span>
        </div>
        <div class="stat-divider" aria-hidden="true"></div>
        <div class="stat" role="listitem">
          <span class="stat-num">11</span>
          <span class="stat-label">Categories</span>
        </div>
        <div class="stat-divider" aria-hidden="true"></div>
        <div class="stat" role="listitem">
          <span class="stat-num">100%</span>
          <span class="stat-label">Free Forever</span>
        </div>
        <div class="stat-divider" aria-hidden="true"></div>
        <div class="stat" role="listitem">
          <span class="stat-num">0</span>
          <span class="stat-label">Signups</span>
        </div>
      </div>
    </div>
  </section>`;

html = html.replace(/<section class="hero" id="home" aria-labelledby="hero-heading">[\s\S]*?<\/section>/, newHero);
fs.writeFileSync('index.html', html);


// 2. UPDATE app-core.js (Tool Cards)
let core = fs.readFileSync('app-core.js', 'utf8');

const oldCardHTML = `      <div class="tool-card-inner">
        <div class="tool-card-icon" aria-hidden="true">\${tool.icon}</div>
        <div class="tool-card-meta">
          <span class="tool-card-category">\${getCategoryLabel(tool.category)}</span>
        </div>
        <div class="tool-card-name" style="display:flex; justify-content:space-between; align-items:center;">
          <span>\${tool.name}</span>
          <button class="fav-btn" onclick="toggleFavorite('\${tool.id}', event)" aria-label="Toggle Favorite" style="background:none;border:none;cursor:pointer;font-size:1.1rem;transition:transform 0.2s;">
            \${getFavorites().includes(tool.id) ? '⭐' : '☆'}
          </button>
        </div>
        <div class="tool-card-desc">\${tool.description}</div>
        <div class="tool-card-footer">
          <span class="tool-card-open">Open Tool <span class="tool-card-arrow">→</span></span>
        </div>
      </div>`;

const newCardHTML = `      <div class="card-bg"></div>
      <div class="tool-card-inner">
        <div class="tool-card-meta">
          <span class="tool-card-category">\${getCategoryLabel(tool.category)}</span>
          <button class="fav-btn" onclick="toggleFavorite('\${tool.id}', event)" aria-label="Toggle Favorite" style="background:none;border:none;cursor:pointer;font-size:1.2rem;transition:transform 0.2s;">
            \${getFavorites().includes(tool.id) ? '⭐' : '☆'}
          </button>
        </div>
        <div class="tool-card-icon" aria-hidden="true">\${tool.icon}</div>
        <div class="tool-card-name">
          <span>\${tool.name}</span>
        </div>
        <div class="tool-card-desc">\${tool.description}</div>
      </div>`;

core = core.replace(oldCardHTML, newCardHTML);
fs.writeFileSync('app-core.js', core);


// 3. UPDATE app-init.js
let init = fs.readFileSync('app-init.js', 'utf8');

// Remove instant theme loader
init = init.replace(/\/\* ---- Theme — runs instantly[\s\S]*?\)\(\);/g, '');
// Remove Theme Selector logic
init = init.replace(/\/\* 3\. Theme Selector \*\/[\s\S]*?\}\n/g, '');

fs.writeFileSync('app-init.js', init);

console.log("Y2K Javascript and HTML structure patched!");
