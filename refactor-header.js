const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== '404.html');

const settingsBtn = `<button id="settings-btn" aria-label="System Settings" title="System Settings" style="background:transparent;border:1px solid var(--border);color:var(--text-secondary);font-size:1.2rem;width:32px;height:32px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:border-color 0.2s,color 0.2s;" onmouseover="this.style.borderColor='var(--accent)';this.style.color='var(--accent)'" onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--text-secondary)'">⚙</button>`;

files.forEach(file => {
  let c = fs.readFileSync(file, 'utf8');

  // 1. Remove tool-count-badge
  c = c.replace(/<span class="tool-count-badge"[\s\S]*?<\/span>/g, '');

  // 2. Remove mute-btn and replace with settings-btn
  c = c.replace(/<button id="mute-btn"[\s\S]*?<\/button>/g, settingsBtn);

  // 3. If index.html or stats.html, remove theme switcher widget and its script
  if (file === 'index.html' || file === 'stats.html') {
    c = c.replace(/<div id="theme-switcher-widget"[\s\S]*?<\/div>\s*<script>\s*\(function initThemeSwitcher\(\) \{[\s\S]*?\}\)\(\);\s*<\/script>/g, '');
  }

  fs.writeFileSync(file, c);
  console.log(`Updated ${file}`);
});
