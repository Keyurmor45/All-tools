const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== '404.html');

// The mute button HTML to inject into nav-right
const muteBtn = `        <button id="mute-btn" aria-label="Toggle sound" title="Toggle meme sounds" onclick="
          const muted = localStorage.getItem('alltools-muted')==='1';
          localStorage.setItem('alltools-muted', muted ? '0' : '1');
          this.textContent = muted ? '🔊' : '🔇';
          this.title = muted ? 'Mute sounds' : 'Unmute sounds';
        " style="background:transparent;border:1px solid var(--border);color:var(--text-secondary);font-size:1rem;width:32px;height:32px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:border-color 0.2s,color 0.2s;" onmouseover="this.style.borderColor='var(--accent)';this.style.color='var(--accent)'" onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--text-secondary)'">🔊</button>`;

const initScript = `
<script>
  // Restore mute button state on load
  document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('mute-btn');
    if (btn && localStorage.getItem('alltools-muted') === '1') {
      btn.textContent = '🔇';
      btn.title = 'Unmute sounds';
    }
  });
</script>`;

files.forEach(file => {
  let c = fs.readFileSync(file, 'utf8');

  // Only inject if not already there
  if (c.includes('mute-btn')) {
    console.log('Already has mute btn: ' + file);
    return;
  }

  // Inject button before </div> of nav-right
  c = c.replace(/<div class="nav-right">([\s\S]*?)<\/div>\s*\n\s*<\/div>\s*\n\s*<\/nav>/, (match, inner) => {
    return `<div class="nav-right">${inner}\n${muteBtn}\n      </div>\n    </div>\n  </nav>`;
  });

  // Inject init script before </body>
  if (!c.includes('Restore mute button state')) {
    c = c.replace('</body>', initScript + '\n</body>');
  }

  fs.writeFileSync(file, c);
  console.log('✅ Injected mute btn: ' + file);
});
