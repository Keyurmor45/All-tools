const fs = require('fs');
let c = fs.readFileSync('widgets.js', 'utf8');

const settingsCode = `
  /* ================================================================
     TASK 4: SYSTEM SETTINGS MODAL (Mute & Themes)
     ================================================================ */
  function initSettingsModal() {
    if (document.getElementById('settings-modal-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'settings-modal-overlay';
    overlay.style.cssText = 'display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:99999; align-items:center; justify-content:center; backdrop-filter:blur(4px);';

    const modal = document.createElement('div');
    modal.style.cssText = 'background:#000; border:2px solid #ccff00; width:400px; max-width:90%; padding:30px; box-shadow:0 0 30px rgba(204,255,0,0.2); font-family:var(--font-mono, "JetBrains Mono"); position:relative;';

    // Mute state
    const isMuted = localStorage.getItem('alltools-muted') === '1';

    modal.innerHTML = \`
      <button id="close-settings-btn" style="position:absolute; top:15px; right:20px; background:transparent; border:none; color:#ccff00; font-size:1.5rem; cursor:pointer;" aria-label="Close settings">✕</button>
      <h2 style="font-family:var(--font-display, Syncopate); color:#ccff00; margin-top:0; border-bottom:1px solid #333; padding-bottom:10px; text-transform:uppercase; font-weight:700;">System Settings</h2>
      
      <div style="margin: 25px 0; display:flex; justify-content:space-between; align-items:center;">
        <span style="font-weight:700; color:#fff;">MEME SOUNDS</span>
        <button id="modal-mute-btn" style="background:transparent; border:2px solid var(--border, #333); color:var(--text-secondary, #888); font-size:1.5rem; width:50px; height:50px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;" onmouseover="this.style.borderColor='var(--accent,#ccff00)';this.style.color='var(--accent,#ccff00)'" onmouseout="this.style.borderColor='var(--border,#333)';this.style.color='var(--text-secondary,#888)'">
          \${isMuted ? '🔇' : '🔊'}
        </button>
      </div>

      <div style="margin: 25px 0;">
        <span style="font-weight:700; color:#fff; display:block; margin-bottom:15px;">THEME PREFERENCE</span>
        <div id="modal-theme-switcher" style="display:flex; gap:12px;">
          <button class="theme-dot active" data-theme="default" style="background:#ccff00; width:30px; height:30px; border-radius:50%; border:2px solid #000; cursor:pointer; box-shadow:0 0 0 2px transparent;" title="Acid Green"></button>
          <button class="theme-dot" data-theme="theme-red" style="background:#ff2244; width:30px; height:30px; border-radius:50%; border:2px solid #000; cursor:pointer; box-shadow:0 0 0 2px transparent;" title="Blood Red"></button>
          <button class="theme-dot" data-theme="theme-ocean" style="background:#00d4ff; width:30px; height:30px; border-radius:50%; border:2px solid #000; cursor:pointer; box-shadow:0 0 0 2px transparent;" title="Ocean"></button>
          <button class="theme-dot" data-theme="theme-matrix" style="background:#00ff41; width:30px; height:30px; border-radius:50%; border:2px solid #000; cursor:pointer; box-shadow:0 0 0 2px transparent;" title="Matrix"></button>
          <button class="theme-dot" data-theme="theme-purple" style="background:#cc44ff; width:30px; height:30px; border-radius:50%; border:2px solid #000; cursor:pointer; box-shadow:0 0 0 2px transparent;" title="Purple"></button>
        </div>
      </div>
    \`;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const closeBtn = modal.querySelector('#close-settings-btn');
    closeBtn.addEventListener('click', () => overlay.style.display = 'none');
    overlay.addEventListener('click', (e) => { if(e.target === overlay) overlay.style.display = 'none'; });

    // Sound toggle
    const muteBtn = modal.querySelector('#modal-mute-btn');
    muteBtn.addEventListener('click', () => {
      const currentlyMuted = localStorage.getItem('alltools-muted') === '1';
      const newMuted = !currentlyMuted;
      localStorage.setItem('alltools-muted', newMuted ? '1' : '0');
      muteBtn.textContent = newMuted ? '🔇' : '🔊';
      if (window.MemeEngine) window.MemeEngine.setMuted(newMuted);
    });

    // Theme switching logic
    const themeClasses = ['theme-red', 'theme-ocean', 'theme-matrix', 'theme-purple'];
    const dots = modal.querySelectorAll('.theme-dot');
    
    function applyTheme(themeName) {
      document.body.classList.remove(...themeClasses);
      document.documentElement.style.removeProperty('--accent');
      document.documentElement.style.removeProperty('--accent-warm');

      if (themeClasses.includes(themeName)) {
        document.body.classList.add(themeName);
      } else if (themeName && themeName.startsWith('#')) {
        document.documentElement.style.setProperty('--accent', themeName);
      }

      dots.forEach(dot => {
        const t = dot.getAttribute('data-theme');
        if (t === themeName || (!t && (!themeName || themeName === 'default' || themeName === '#ccff00'))) {
          dot.style.boxShadow = '0 0 0 2px #fff';
        } else {
          dot.style.boxShadow = '0 0 0 2px transparent';
        }
      });
      localStorage.setItem('alltools-theme', themeName);
    }

    dots.forEach(dot => {
      dot.addEventListener('click', (e) => applyTheme(e.target.getAttribute('data-theme')));
    });

    // Restore active theme
    const savedTheme = localStorage.getItem('alltools-theme') || 'default';
    applyTheme(savedTheme);

    // Bind settings button in navbar
    const navSettingsBtn = document.getElementById('settings-btn');
    if (navSettingsBtn) {
      navSettingsBtn.addEventListener('click', () => {
        overlay.style.display = 'flex';
      });
    }
  }
`;

if (!c.includes('initSettingsModal')) {
  c = c.replace('/* Bootstrap widgets on DOMContentLoaded or immediately if ready */', settingsCode + '\n  /* Bootstrap widgets on DOMContentLoaded or immediately if ready */');
  c = c.replace('initShortcutsModal();', 'initShortcutsModal();\n    initSettingsModal();');
  fs.writeFileSync('widgets.js', c);
  console.log('Injected System Settings into widgets.js');
} else {
  console.log('Already injected.');
}
