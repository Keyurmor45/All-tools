const fs = require('fs');

// 1. Update cyber-core.js
let c = fs.readFileSync('cyber-core.js', 'utf8');

const newUI = `
    <!-- CRT Overlay -->
    <div id="crt-overlay" class="crt-overlay"></div>

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
        
        <div class="toggle-row" style="margin-top:20px; margin-bottom:10px;">
          <label for="crt-toggle">CRT SCANLINES</label>
          <input type="checkbox" id="crt-toggle">
        </div>
        
        <div class="toggle-row">
          <label for="meme-toggle">MEME SOUNDS</label>
          <input type="checkbox" id="meme-toggle">
        </div>
      </div>
    </div>
  `;

// Replace the old HTML injection
c = c.replace(/<!-- CRT Overlay -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*`;/, newUI + '`;');

// Update event listener to use the navbar settings btn instead of the floating one
c = c.replace(/const settingsBtn = document\.getElementById\('cyber-settings-btn'\);/, "const settingsBtn = document.getElementById('settings-btn');");

// Add Meme toggle logic next to closeBtn
const memeLogic = `
  const memeToggle = document.getElementById('meme-toggle');
  if (memeToggle) {
    memeToggle.checked = localStorage.getItem('alltools-muted') !== '1';
    memeToggle.addEventListener('change', (e) => {
      const isMuted = !e.target.checked;
      localStorage.setItem('alltools-muted', isMuted ? '1' : '0');
      if (window.MemeEngine) window.MemeEngine.setMuted(isMuted);
    });
  }
`;
c = c.replace(/(const closeBtn = document\.getElementById\('close-settings'\);)/, '$1\n' + memeLogic);

fs.writeFileSync('cyber-core.js', c);

// 2. Update style.css
let css = fs.readFileSync('style.css', 'utf8');
css = css.replace(/bottom: 80px; left: 20px;/, 'top: 60px; right: 20px;');
css = css.replace(/\.cyber-settings-btn\s*\{[\s\S]*?\}\n/, '');
css = css.replace(/\.cyber-settings-btn:hover\s*\{[\s\S]*?\}\n/, '');
fs.writeFileSync('style.css', css);

// 3. Update widgets.js to remove the redundant initSettingsModal
let w = fs.readFileSync('widgets.js', 'utf8');
w = w.replace(/\/\* ================================================================\s*TASK 4: SYSTEM SETTINGS MODAL \(Mute & Themes\)[\s\S]*?function initSettingsModal\(\) \{[\s\S]*?\}\n\s*\}/, '');
w = w.replace('initSettingsModal();', '');
fs.writeFileSync('widgets.js', w);

console.log('Successfully consolidated settings into cyber-core.js');
