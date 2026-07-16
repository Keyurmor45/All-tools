/**
 * Y2K Cybercore Global Logic
 * Features: Settings UI, Custom Themes, CRT Mode, Ctrl+K Search, Winamp Easter Egg
 */

document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // 1. INJECT SETTINGS & CRT UI
  // ==========================================
  const cyberUI = `
    <!-- CRT Overlay -->
    <div id="crt-overlay" class="crt-overlay"></div>

    <!-- Settings Gear -->
    <button id="cyber-settings-btn" class="cyber-settings-btn" aria-label="Settings">⚙</button>

    <!-- Settings Panel -->
    <div id="cyber-settings-panel" class="cyber-settings-panel">
      <div class="panel-header">
        <h3>SYSTEM SETTINGS</h3>
        <button id="close-settings">✕</button>
      </div>
      <div class="panel-body">
        <label>THEME COLOR</label>
        <div class="theme-colors">
          <button class="color-swatch" data-color="#ccff00" style="background:#ccff00;" title="Acid Green"></button>
          <button class="color-swatch" data-color="#ff00ff" style="background:#ff00ff;" title="Cyber Pink"></button>
          <button class="color-swatch" data-color="#00ffff" style="background:#00ffff;" title="Neon Blue"></button>
          <button class="color-swatch" data-color="#ff5500" style="background:#ff5500;" title="Terminal Orange"></button>
          <button class="color-swatch" data-color="#ffffff" style="background:#ffffff;" title="Monochrome"></button>
        </div>
        <div class="toggle-row">
          <label for="crt-toggle">CRT SCANLINES</label>
          <input type="checkbox" id="crt-toggle">
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', cyberUI);

  // ==========================================
  // 2. STATE MANAGEMENT (LocalStorage)
  // ==========================================
  const root = document.documentElement;
  
  // Load Theme (with validation for legacy non-hex values)
  let savedColor = localStorage.getItem('alltools-theme');
  if (!savedColor || !savedColor.startsWith('#')) {
    savedColor = '#ccff00';
  }
  root.style.setProperty('--accent', savedColor);

  // Load CRT Mode
  const crtOverlay = document.getElementById('crt-overlay');
  const crtToggle = document.getElementById('crt-toggle');
  const savedCrt = localStorage.getItem('alltools-crt');
  
  if (savedCrt === 'true') {
    crtOverlay.classList.add('active');
    crtToggle.checked = true;
    document.body.classList.add('crt-active');
  }

  // ==========================================
  // 3. EVENT LISTENERS
  // ==========================================
  const settingsBtn = document.getElementById('cyber-settings-btn');
  const settingsPanel = document.getElementById('cyber-settings-panel');
  const closeBtn = document.getElementById('close-settings');
  const swatches = document.querySelectorAll('.color-swatch');

  settingsBtn.addEventListener('click', () => {
    settingsPanel.classList.toggle('open');
  });

  closeBtn.addEventListener('click', () => {
    settingsPanel.classList.remove('open');
  });

  swatches.forEach(swatch => {
    swatch.addEventListener('click', (e) => {
      const color = e.target.getAttribute('data-color');
      root.style.setProperty('--accent', color);
      localStorage.setItem('alltools-theme', color);
    });
  });

  crtToggle.addEventListener('change', (e) => {
    if (e.target.checked) {
      crtOverlay.classList.add('active');
      document.body.classList.add('crt-active');
      localStorage.setItem('alltools-crt', 'true');
    } else {
      crtOverlay.classList.remove('active');
      document.body.classList.remove('crt-active');
      localStorage.setItem('alltools-crt', 'false');
    }
  });

  // ==========================================
  // 4. CTRL + K GLOBAL SEARCH
  // ==========================================
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      
      // If on index.html, focus the main hero search
      const heroSearch = document.getElementById('hero-search');
      if (heroSearch) {
        heroSearch.focus();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // If on another page, redirect to index with a focus flag (or just go to index)
        window.location.href = '/';
      }
    }
  });

  // ==========================================
  // 5. WINAMP EASTER EGG
  // ==========================================
  let keySequence = '';
  const secretCode = 'winamp';

  document.addEventListener('keydown', (e) => {
    // Only track alphanumeric keys to prevent huge strings
    if (e.key.length === 1 && e.key.match(/[a-z0-9]/i)) {
      keySequence += e.key.toLowerCase();
      // Keep string short
      if (keySequence.length > secretCode.length) {
        keySequence = keySequence.substring(1);
      }
      
      if (keySequence === secretCode) {
        launchWinamp();
        keySequence = ''; // Reset
      }
    }
  });

  function launchWinamp() {
    if (document.getElementById('webamp-script')) return; // already loaded

    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:var(--accent);color:#000;padding:10px 20px;z-index:9999;font-family:var(--font-display);font-weight:bold;text-transform:uppercase;';
    toast.innerText = 'INITIALIZING WINAMP...';
    document.body.appendChild(toast);

    const script = document.createElement('script');
    script.id = 'webamp-script';
    script.src = 'https://unpkg.com/webamp@1.5.0/built/webamp.bundle.min.js';
    script.onload = () => {
      document.body.removeChild(toast);
      const webamp = new Webamp();
      webamp.renderWhenReady(document.body);
    };
    document.head.appendChild(script);
  }

});
