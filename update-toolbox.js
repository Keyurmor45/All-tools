const fs = require('fs');

let c = fs.readFileSync('widgets.js', 'utf8');

// 1. Hide the old sticky-notes-btn
c = c.replace(/<!-- Floating Button -->[\s\S]*?<\/button>/, '<!-- Old floating button removed, handled by toolbox -->');

// 2. Hide lofi and pomo widgets by default
c = c.replace(/lofiWidget\.className = 'cyber-widget cyber-widget-left';/, "lofiWidget.className = 'cyber-widget cyber-widget-left';\n    lofiWidget.style.display = 'none';");
c = c.replace(/pomoWidget\.className = 'cyber-widget cyber-widget-right';/, "pomoWidget.className = 'cyber-widget cyber-widget-right';\n    pomoWidget.style.display = 'none';");

// 3. Inject the Toolbox HTML and Logic at the very end of initAllWidgets
const toolboxLogic = `
  function initCyberToolbox() {
    if (document.getElementById('cyber-toolbox')) return;

    const toolbox = document.createElement('div');
    toolbox.id = 'cyber-toolbox';
    toolbox.style.cssText = 'position:fixed; bottom:20px; right:20px; z-index:9999; display:flex; flex-direction:column; align-items:flex-end; gap:10px; font-family:"JetBrains Mono", monospace;';
    
    toolbox.innerHTML = \`
      <div id="toolbox-menu" style="display:none; flex-direction:column; gap:10px; align-items:flex-end;">
        <button class="cyber-btn" id="tb-lofi" style="width:140px; justify-content:flex-start; gap:8px;">📻 LOFI RADIO</button>
        <button class="cyber-btn" id="tb-pomo" style="width:140px; justify-content:flex-start; gap:8px;">🍅 POMODORO</button>
        <button class="cyber-btn" id="tb-notes" style="width:140px; justify-content:flex-start; gap:8px;">📝 NOTES</button>
      </div>
      <button id="toolbox-main-btn" title="Cyber Toolbox" style="
        width: 50px; height: 50px; background: #000; border: 2px solid #ccff00; color: #ccff00;
        font-size: 1.5rem; cursor: pointer; display: flex; align-items: center; justify-content: center;
        box-shadow: 0 4px 15px rgba(0,0,0,0.8), 0 0 10px rgba(204,255,0,0.3); transition: all 0.2s ease;
      ">🧰</button>
    \`;

    document.body.appendChild(toolbox);

    const mainBtn = toolbox.querySelector('#toolbox-main-btn');
    const menu = toolbox.querySelector('#toolbox-menu');
    const tbLofi = toolbox.querySelector('#tb-lofi');
    const tbPomo = toolbox.querySelector('#tb-pomo');
    const tbNotes = toolbox.querySelector('#tb-notes');

    mainBtn.addEventListener('click', () => {
      const isHidden = menu.style.display === 'none';
      menu.style.display = isHidden ? 'flex' : 'none';
      mainBtn.style.background = isHidden ? '#ccff00' : '#000';
      mainBtn.style.color = isHidden ? '#000' : '#ccff00';
    });

    // Toggle logic for Lofi
    tbLofi.addEventListener('click', () => {
      const w = document.getElementById('lofi-widget');
      if(w) {
        w.style.display = w.style.display === 'none' ? 'block' : 'none';
        tbLofi.style.background = w.style.display === 'none' ? '#000' : '#ccff00';
        tbLofi.style.color = w.style.display === 'none' ? '#ccff00' : '#000';
      }
    });

    // Toggle logic for Pomodoro
    tbPomo.addEventListener('click', () => {
      const w = document.getElementById('pomo-widget');
      if(w) {
        w.style.display = w.style.display === 'none' ? 'block' : 'none';
        tbPomo.style.background = w.style.display === 'none' ? '#000' : '#ccff00';
        tbPomo.style.color = w.style.display === 'none' ? '#ccff00' : '#000';
      }
    });

    // Toggle logic for Sticky Notes
    tbNotes.addEventListener('click', () => {
      const p = document.getElementById('sticky-notes-panel');
      if(p) {
        p.style.display = p.style.display === 'none' ? 'flex' : 'none';
        tbNotes.style.background = p.style.display === 'none' ? '#000' : '#ccff00';
        tbNotes.style.color = p.style.display === 'none' ? '#ccff00' : '#000';
      }
    });
  }
`;

// Insert the new logic before initAllWidgets
c = c.replace('  /* Bootstrap widgets', toolboxLogic + '\n  /* Bootstrap widgets');

// Call it in initAllWidgets
c = c.replace('initStickyNotesWidget();', 'initStickyNotesWidget();\n    initCyberToolbox();');

// Also update the Sticky Notes CSS so that when it opens, it doesn't overlap the toolbox
c = c.replace(/bottom: 58px;/, 'bottom: 80px;'); // desktop
c = c.replace(/bottom: 55px !important;/, 'bottom: 80px !important;'); // mobile

// Remove StickyNotes logic that referenced the old button
c = c.replace(/const stickyBtn = widgetWrap\.querySelector\('#sticky-notes-btn'\);[\s\S]*?\}\);/g, '');


fs.writeFileSync('widgets.js', c);
console.log('Toolbox logic injected successfully');
