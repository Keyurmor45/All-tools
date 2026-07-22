/* ================================================================
   widgets.js — Sticky Notes Widget & Keyboard Shortcuts Help Modal
   Brutalist Cybercore Design: Black bg, Acid Green #ccff00, JetBrains Mono
   ================================================================ */

(function () {
  'use strict';

  /* ================================================================
     TASK 2: FLOATING STICKY NOTES WIDGET
     ================================================================ */

  function initStickyNotesWidget() {
    if (document.getElementById('sticky-notes-widget')) return;

    const widgetWrap = document.createElement('div');
    widgetWrap.id = 'sticky-notes-widget';
    widgetWrap.style.cssText = 'position:fixed; right:310px; bottom:30px; z-index:9990; font-family:"JetBrains Mono", monospace;';

    widgetWrap.innerHTML = `
      <!-- Floating Button -->
      <button id="sticky-notes-btn" title="Sticky Notes (Auto-saves)" aria-label="Open Sticky Notes" style="
        width: 46px;
        height: 46px;
        background: #000;
        border: 2px solid #ccff00;
        color: #ccff00;
        font-size: 1.3rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px rgba(0,0,0,0.8), 0 0 10px rgba(204,255,0,0.3);
        transition: all 0.2s ease;
      " onmouseover="this.style.background='#ccff00';this.style.color='#000';" onmouseout="if(document.getElementById('sticky-notes-panel').style.display==='none'){this.style.background='#000';this.style.color='#ccff00';}">
        📝
      </button>

      <!-- Sticky Notes Panel -->
      <div id="sticky-notes-panel" style="
        display: none;
        position: absolute;
        bottom: 58px;
        right: 0;
        width: 320px;
        max-width: calc(100vw - 40px);
        background: #000000;
        border: 2px solid #ccff00;
        box-shadow: 0 10px 30px rgba(0,0,0,0.9), 0 0 15px rgba(204,255,0,0.25);
        padding: 14px;
        box-sizing: border-box;
        flex-direction: column;
        gap: 10px;
      ">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #ccff00; padding-bottom:8px;">
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="font-family:'Syncopate', sans-serif; font-size:0.8rem; font-weight:700; color:#ccff00; letter-spacing:1px;">📝 STICKY NOTES</span>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <button id="sticky-notes-clear-btn" style="
              background: transparent;
              border: 1px solid #ff0055;
              color: #ff0055;
              font-family: 'JetBrains Mono', monospace;
              font-size: 0.65rem;
              font-weight: bold;
              padding: 2px 7px;
              cursor: pointer;
              transition: all 0.2s;
            " onmouseover="this.style.background='#ff0055';this.style.color='#000';" onmouseout="this.style.background='transparent';this.style.color='#ff0055';">CLEAR</button>
            <button id="sticky-notes-close-btn" style="
              background: transparent;
              border: none;
              color: #888;
              font-size: 1.1rem;
              cursor: pointer;
              line-height: 1;
              padding: 0 4px;
            " onmouseover="this.style.color='#ccff00';" onmouseout="this.style.color='#888';">✕</button>
          </div>
        </div>

        <textarea id="sticky-notes-input" maxlength="500" placeholder="Type your notes here... (Auto-saves every 500ms)" style="
          width: 100%;
          height: 140px;
          background: #111111;
          color: #ccff00;
          border: 1px solid #333;
          padding: 10px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          line-height: 1.4;
          resize: none;
          outline: none;
          box-sizing: border-box;
        "></textarea>

        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.7rem; color:#888;">
          <span id="sticky-notes-status" style="color:#ccff00; opacity:0; transition:opacity 0.3s;">Saved ✓</span>
          <span id="sticky-notes-count" style="font-family:'JetBrains Mono', monospace; color:#888;">0 / 500</span>
        </div>
      </div>
    `;

    document.body.appendChild(widgetWrap);

    const btn = document.getElementById('sticky-notes-btn');
    const panel = document.getElementById('sticky-notes-panel');
    const textarea = document.getElementById('sticky-notes-input');
    const countEl = document.getElementById('sticky-notes-count');
    const statusEl = document.getElementById('sticky-notes-status');
    const clearBtn = document.getElementById('sticky-notes-clear-btn');
    const closeBtn = document.getElementById('sticky-notes-close-btn');

    const STORAGE_KEY = 'alltools-notes';

    // Restore saved notes
    const savedNotes = localStorage.getItem(STORAGE_KEY) || '';
    textarea.value = savedNotes;
    updateCounter();

    function updateCounter() {
      const len = textarea.value.length;
      countEl.textContent = `${len} / 500`;
      countEl.style.color = len >= 480 ? '#ff0055' : '#888';
    }

    function togglePanel() {
      const isOpen = panel.style.display === 'flex';
      if (isOpen) {
        panel.style.display = 'none';
        btn.style.background = '#000';
        btn.style.color = '#ccff00';
      } else {
        panel.style.display = 'flex';
        btn.style.background = '#ccff00';
        btn.style.color = '#000';
        textarea.focus();
      }
    }

    btn.addEventListener('click', togglePanel);
    closeBtn.addEventListener('click', () => {
      panel.style.display = 'none';
      btn.style.background = '#000';
      btn.style.color = '#ccff00';
    });

    clearBtn.addEventListener('click', () => {
      textarea.value = '';
      localStorage.removeItem(STORAGE_KEY);
      updateCounter();
      showSaveIndicator();
    });

    textarea.addEventListener('input', () => {
      updateCounter();
    });

    // Auto-save every 500ms
    let lastSavedValue = savedNotes;
    setInterval(() => {
      const val = textarea.value;
      if (val !== lastSavedValue) {
        localStorage.setItem(STORAGE_KEY, val);
        lastSavedValue = val;
        showSaveIndicator();
      }
    }, 500);

    function showSaveIndicator() {
      statusEl.style.opacity = '1';
      setTimeout(() => { statusEl.style.opacity = '0'; }, 1000);
    }
  }


  /* ================================================================
     TASK 3: KEYBOARD SHORTCUTS HELP MODAL
     ================================================================ */

  function initShortcutsModal() {
    if (document.getElementById('shortcuts-modal-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'shortcuts-modal-overlay';
    overlay.style.cssText = 'display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.85); backdrop-filter:blur(6px); z-index:99999; align-items:center; justify-content:center; padding:20px; box-sizing:border-box;';

    overlay.innerHTML = `
      <div id="shortcuts-modal-card" style="
        background: #0a0a0a;
        border: 2px solid #ccff00;
        box-shadow: 0 0 35px rgba(204,255,0,0.3);
        width: 100%;
        max-width: 680px;
        padding: 24px;
        font-family: 'JetBrains Mono', monospace;
        color: #ffffff;
        position: relative;
        max-height: 90vh;
        overflow-y: auto;
        box-sizing: border-box;
      ">
        <!-- Header -->
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #ccff00; padding-bottom:12px; margin-bottom:20px;">
          <div>
            <h2 style="font-family:'Syncopate', sans-serif; font-size:1.25rem; font-weight:700; margin:0; color:#ccff00; letter-spacing:1px; text-transform:uppercase;">⌨ KEYBOARD SHORTCUTS</h2>
            <div style="font-size:0.75rem; color:#888; margin-top:2px;">GLOBAL CONTROLS & HIDDEN SECRETS</div>
          </div>
          <button id="shortcuts-modal-close-btn" aria-label="Close shortcuts panel" style="
            background: transparent;
            border: 1px solid #ccff00;
            color: #ccff00;
            font-size: 1.2rem;
            width: 34px;
            height: 34px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
          " onmouseover="this.style.background='#ccff00';this.style.color='#000';" onmouseout="this.style.background='transparent';this.style.color='#ccff00';">✕</button>
        </div>

        <!-- Brutalist Grid Layout -->
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:14px;">
          
          <div style="background:#111; border:1px solid #222; padding:12px; border-left:4px solid #ccff00;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
              <kbd style="background:#222; border:1px solid #555; color:#ccff00; padding:2px 8px; font-family:'JetBrains Mono', monospace; font-size:0.85rem; font-weight:bold;">?</kbd>
              <span style="font-size:0.8rem; color:#fff; font-weight:500;">Shortcuts Help</span>
            </div>
            <div style="font-size:0.72rem; color:#888;">Show this keyboard shortcuts panel</div>
          </div>

          <div style="background:#111; border:1px solid #222; padding:12px; border-left:4px solid #ccff00;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
              <kbd style="background:#222; border:1px solid #555; color:#ccff00; padding:2px 8px; font-family:'JetBrains Mono', monospace; font-size:0.85rem; font-weight:bold;">ESC</kbd>
              <span style="font-size:0.8rem; color:#fff; font-weight:500;">Close Modal / Tool</span>
            </div>
            <div style="font-size:0.72rem; color:#888;">Close active tool or open panel</div>
          </div>

          <div style="background:#111; border:1px solid #222; padding:12px; border-left:4px solid #ccff00;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
              <kbd style="background:#222; border:1px solid #555; color:#ccff00; padding:2px 8px; font-family:'JetBrains Mono', monospace; font-size:0.85rem; font-weight:bold;">Ctrl + K</kbd>
              <span style="font-size:0.8rem; color:#fff; font-weight:500;">Focus Search</span>
            </div>
            <div style="font-size:0.72rem; color:#888;">Jump directly to tool search bar</div>
          </div>

          <div style="background:#111; border:1px solid #222; padding:12px; border-left:4px solid #ff0055;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
              <kbd style="background:#222; border:1px solid #ff0055; color:#ff0055; padding:2px 7px; font-family:'JetBrains Mono', monospace; font-size:0.75rem; font-weight:bold;">↑↑↓↓←→←→BA</kbd>
              <span style="font-size:0.8rem; color:#ff0055; font-weight:bold;">CRT Mode (Secret!)</span>
            </div>
            <div style="font-size:0.72rem; color:#888;">Toggle retro CRT scanline terminal</div>
          </div>

          <div style="background:#111; border:1px solid #222; padding:12px; border-left:4px solid #ff0055;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
              <kbd style="background:#222; border:1px solid #ff0055; color:#ff0055; padding:2px 7px; font-family:'JetBrains Mono', monospace; font-size:0.75rem; font-weight:bold;">Click Logo 5x</kbd>
              <span style="font-size:0.8rem; color:#ff0055; font-weight:bold;">RAGE MODE (Secret!)</span>
            </div>
            <div style="font-size:0.72rem; color:#888;">Unleash maximum brutalism & effects</div>
          </div>

          <div style="background:#111; border:1px solid #222; padding:12px; border-left:4px solid #ff0055;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
              <kbd style="background:#222; border:1px solid #ff0055; color:#ff0055; padding:2px 7px; font-family:'JetBrains Mono', monospace; font-size:0.75rem; font-weight:bold;">Type 'time'</kbd>
              <span style="font-size:0.8rem; color:#ff0055; font-weight:bold;">Secret Clock</span>
            </div>
            <div style="font-size:0.72rem; color:#888;">Type 'time' anywhere for HUD clock</div>
          </div>

          <div style="background:#111; border:1px solid #222; padding:12px; border-left:4px solid #ccff00;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
              <kbd style="background:#222; border:1px solid #555; color:#ccff00; padding:2px 8px; font-family:'JetBrains Mono', monospace; font-size:0.85rem; font-weight:bold;">🔊 Button</kbd>
              <span style="font-size:0.8rem; color:#fff; font-weight:500;">Toggle Sounds</span>
            </div>
            <div style="font-size:0.72rem; color:#888;">Mute or unmute funny sound effects</div>
          </div>

        </div>

        <div style="margin-top:20px; text-align:right; border-top:1px solid #222; padding-top:12px; font-size:0.75rem; color:#666;">
          Press <span style="color:#ccff00;">ESC</span> or click outside to dismiss
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    const closeBtn = document.getElementById('shortcuts-modal-close-btn');

    function openModal() {
      overlay.style.display = 'flex';
    }

    function closeModal() {
      overlay.style.display = 'none';
    }

    closeBtn.addEventListener('click', closeModal);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    // Keydown listener for '?' and 'ESC'
    document.addEventListener('keydown', (e) => {
      const activeEl = document.activeElement;
      const isTyping = activeEl && (
        activeEl.tagName === 'INPUT' ||
        activeEl.tagName === 'TEXTAREA' ||
        activeEl.tagName === 'SELECT' ||
        activeEl.isContentEditable
      );

      if (isTyping) return;

      if (e.key === '?') {
        e.preventDefault();
        openModal();
      } else if (e.key === 'Escape') {
        if (overlay.style.display === 'flex') {
          closeModal();
        }
      }
    });

    window.openShortcutsModal = openModal;
    window.closeShortcutsModal = closeModal;
  }

  
  /* Bootstrap widgets on DOMContentLoaded or immediately if ready */
  function initAllWidgets() {
    initStickyNotesWidget();
    initShortcutsModal();

  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllWidgets);
  } else {
    initAllWidgets();
  }
})();


(function () {
  // Prevent duplicate injection if script loaded multiple times
  if (window.__CYBER_WIDGETS_LOADED__) return;
  window.__CYBER_WIDGETS_LOADED__ = true;

  // Injection of Styles
  const style = document.createElement('style');
  style.textContent = `
    /* ============================================================
       BRUTALIST CYBERCORE FLOATING WIDGETS
       ============================================================ */
    .cyber-widget {
      position: fixed;
      bottom: 30px;
      z-index: 9990;
      background-color: #000000;
      border: 2px solid #ccff00;
      color: #ffffff;
      font-family: 'JetBrains Mono', monospace, sans-serif;
      box-shadow: 4px 4px 0px #ccff00;
      width: 270px;
      box-sizing: border-box;
      user-select: none;
      transition: transform 0.2s ease, opacity 0.2s ease;
    }

    .cyber-widget-left {
      left: 20px;
    }

    .cyber-widget-right {
      right: 20px;
    }

    .cyber-widget-header {
      background: #111111;
      border-bottom: 2px solid #ccff00;
      padding: 6px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Syncopate', 'JetBrains Mono', monospace, sans-serif;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 1px;
      color: #ccff00;
      text-transform: uppercase;
    }

    .cyber-widget-title {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .cyber-widget-toggle {
      background: transparent;
      border: 1px solid #ccff00;
      color: #ccff00;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      padding: 1px 6px;
      cursor: pointer;
      line-height: 1;
      transition: all 0.15s ease;
    }

    .cyber-widget-toggle:hover {
      background: #ccff00;
      color: #000000;
    }

    .cyber-widget-body {
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .cyber-widget:has(.cyber-widget-body.collapsed) .cyber-widget-header { border-bottom: none; }
    .cyber-widget-body.collapsed {
      display: none !important;
    }

    /* Common Cyber Button */
    .cyber-btn {
      background: #000000;
      border: 1px solid #ccff00;
      color: #ccff00;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 5px 8px;
      cursor: pointer;
      transition: all 0.15s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      outline: none;
    }

    .cyber-btn:hover {
      background: #ccff00;
      color: #000000;
      box-shadow: 2px 2px 0px #ffffff;
    }

    .cyber-btn.active {
      background: #ccff00;
      color: #000000;
    }

    /* LOFI PLAYER STYLING */
    .lofi-station-box {
      background: #0a0a0a;
      border: 1px solid rgba(204, 255, 0, 0.3);
      padding: 6px 8px;
      text-align: center;
    }

    .lofi-station-num {
      font-size: 0.6rem;
      color: #888888;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    .lofi-station-name {
      font-size: 0.8rem;
      font-weight: 700;
      color: #ccff00;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 2px;
    }

    .lofi-controls-row {
      display: flex;
      gap: 6px;
      align-items: center;
    }

    .cyber-btn-play {
      flex: 1;
      font-size: 0.9rem;
      padding: 6px 0;
    }

    .lofi-status-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.65rem;
      color: #aaaaaa;
      border-top: 1px dashed rgba(255, 255, 255, 0.15);
      padding-top: 6px;
    }

    .lofi-status-text {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .lofi-indicator {
      display: inline-block;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #444444;
    }

    .lofi-indicator.playing {
      background: #ccff00;
      box-shadow: 0 0 6px #ccff00;
      animation: lofi-pulse 1.2s infinite;
    }

    @keyframes lofi-pulse {
      0% { opacity: 1; }
      50% { opacity: 0.3; }
      100% { opacity: 1; }
    }

    .lofi-vol-control {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .lofi-vol-slider {
      width: 60px;
      height: 4px;
      accent-color: #ccff00;
      cursor: pointer;
      background: #222;
    }

    /* POMODORO TIMER STYLING */
    .pomo-mode-tabs {
      display: flex;
      gap: 4px;
    }

    .pomo-tab-btn {
      flex: 1;
      font-size: 0.6rem;
      padding: 4px 2px;
      text-align: center;
    }

    .pomo-display {
      background: #050505;
      border: 1px solid rgba(204, 255, 0, 0.3);
      padding: 8px;
      text-align: center;
    }

    .pomo-time {
      font-size: 2.1rem;
      font-weight: 700;
      color: #ccff00;
      letter-spacing: 2px;
      line-height: 1;
      font-family: 'JetBrains Mono', monospace;
      text-shadow: 0 0 8px rgba(204, 255, 0, 0.3);
    }

    .pomo-controls-row {
      display: flex;
      gap: 6px;
    }

    .pomo-btn-start {
      flex: 2;
      font-size: 0.85rem;
    }

    .pomo-btn-reset {
      flex: 1;
    }

    .pomo-stats {
      font-size: 0.7rem;
      color: #cccccc;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px dashed rgba(255, 255, 255, 0.15);
      padding-top: 6px;
    }

    .pomo-tomatoes {
      color: #ccff00;
      font-weight: 700;
    }

    /* TOAST NOTIFICATION */
    .cyber-toast {
      position: fixed;
      top: 25px;
      left: 50%;
      transform: translateX(-50%) translateY(-30px);
      background: #000000;
      border: 2px solid #ccff00;
      color: #ccff00;
      padding: 10px 20px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
      font-weight: 700;
      box-shadow: 4px 4px 0px #ccff00;
      z-index: 99999;
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      pointer-events: none;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .cyber-toast.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
      pointer-events: auto;
    }

    @media (max-width: 600px) {
      .cyber-widget {
        width: 210px;
        bottom: 15px;
      }
      .cyber-widget-left { left: 10px; }
      .cyber-widget-right { right: 10px; }
      .pomo-time { font-size: 1.6rem; }
    }
  `;
  document.head.appendChild(style);

  // Helper for Web Audio sound
  function playBeep() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;

      // Beep 1
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, now);
      gain1.gain.setValueAtTime(0.2, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.15);

      // Beep 2
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1320, now + 0.18);
      gain2.gain.setValueAtTime(0.25, now + 0.18);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.18);
      osc2.stop(now + 0.4);
    } catch (e) {
      console.warn('[CyberWidgets] WebAudio beep error:', e);
    }
  }

  // Toast notification helper
  function showToast(message) {
    let toast = document.getElementById('cyber-toast-el');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'cyber-toast-el';
      toast.className = 'cyber-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>⚡</span> <span>${message}</span>`;
    toast.classList.add('show');

    clearTimeout(toast.__timer);
    toast.__timer = setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  // Station definitions
  const STATIONS = [
    { name: 'Lofi Hip Hop', url: 'https://streams.ilovemusic.de/iloveradio17.mp3' },
    { name: 'Synthwave', url: 'https://streams.ilovemusic.de/iloveradio2.mp3' },
    { name: 'Cyberpunk Jazz', url: 'https://jazz-wr04.ice.infomaniak.ch/jazz-wr04-128.mp3' },
    { name: 'Ambient', url: 'https://radio.streemlion.com:2090/stream' }
  ];

  function initWidgets() {
    /* ============================================================
       TASK 1: FLOATING LOFI MUSIC PLAYER WIDGET
       ============================================================ */
    const lofiWidget = document.createElement('div');
    lofiWidget.className = 'cyber-widget cyber-widget-left';
    lofiWidget.id = 'lofi-widget';

    // Persistent storage state
    let savedStationIdx = parseInt(localStorage.getItem('alltools_lofi_station') || '0', 10);
    if (isNaN(savedStationIdx) || savedStationIdx < 0 || savedStationIdx >= STATIONS.length) {
      savedStationIdx = 0;
    }
    let savedPlaying = localStorage.getItem('alltools_lofi_playing') === '1';
    let savedCollapsed = localStorage.getItem('alltools_lofi_collapsed') === '1';
    let savedVol = parseFloat(localStorage.getItem('alltools_lofi_vol') || '0.7');

    let currentStationIdx = savedStationIdx;
    let isPlaying = false; // actual runtime state

    // Audio Object
    const audio = new Audio();
    audio.preload = 'none';
    audio.volume = savedVol;

    lofiWidget.innerHTML = `
      <div class="cyber-widget-header">
        <div class="cyber-widget-title">
          <span>📻</span> <span>LOFI RADIO</span>
        </div>
        <button class="cyber-widget-toggle" id="lofi-toggle-btn" title="Toggle Panel">${savedCollapsed ? '▲' : '▼'}</button>
      </div>
      <div class="cyber-widget-body ${savedCollapsed ? 'collapsed' : ''}" id="lofi-body">
        <div class="lofi-station-box">
          <div class="lofi-station-num" id="lofi-station-num">STATION [1/4]</div>
          <div class="lofi-station-name" id="lofi-station-name">Lofi Hip Hop</div>
        </div>
        <div class="lofi-controls-row">
          <button class="cyber-btn" id="lofi-prev-btn" title="Previous Station">⏮</button>
          <button class="cyber-btn cyber-btn-play" id="lofi-play-btn" title="Play / Pause">▶ PLAY</button>
          <button class="cyber-btn" id="lofi-next-btn" title="Next Station">⏭</button>
        </div>
        <div class="lofi-status-row">
          <div class="lofi-status-text">
            <span class="lofi-indicator" id="lofi-indicator"></span>
            <span id="lofi-status-lbl">OFFLINE</span>
          </div>
          <div class="lofi-vol-control">
            <span>🔊</span>
            <input type="range" class="lofi-vol-slider" id="lofi-vol-slider" min="0" max="1" step="0.05" value="${savedVol}">
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(lofiWidget);

    // Elements
    const lofiToggleBtn = lofiWidget.querySelector('#lofi-toggle-btn');
    const lofiBody = lofiWidget.querySelector('#lofi-body');
    const lofiStationNum = lofiWidget.querySelector('#lofi-station-num');
    const lofiStationName = lofiWidget.querySelector('#lofi-station-name');
    const lofiPlayBtn = lofiWidget.querySelector('#lofi-play-btn');
    const lofiPrevBtn = lofiWidget.querySelector('#lofi-prev-btn');
    const lofiNextBtn = lofiWidget.querySelector('#lofi-next-btn');
    const lofiIndicator = lofiWidget.querySelector('#lofi-indicator');
    const lofiStatusLbl = lofiWidget.querySelector('#lofi-status-lbl');
    const lofiVolSlider = lofiWidget.querySelector('#lofi-vol-slider');

    function updateStationUI() {
      const st = STATIONS[currentStationIdx];
      lofiStationNum.textContent = `STATION [${currentStationIdx + 1}/${STATIONS.length}]`;
      lofiStationName.textContent = st.name;
    }

    function setStatus(text, active) {
      lofiStatusLbl.textContent = text;
      if (active) {
        lofiIndicator.classList.add('playing');
      } else {
        lofiIndicator.classList.remove('playing');
      }
    }

    function loadStation(index, shouldPlay = false) {
      currentStationIdx = index;
      localStorage.setItem('alltools_lofi_station', currentStationIdx.toString());
      updateStationUI();

      const st = STATIONS[currentStationIdx];
      audio.src = st.url;

      if (shouldPlay) {
        playAudio();
      } else {
        pauseAudio();
      }
    }

    function playAudio() {
      if (!audio.src || audio.src !== STATIONS[currentStationIdx].url) {
        audio.src = STATIONS[currentStationIdx].url;
      }
      setStatus('CONNECTING...', false);
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            isPlaying = true;
            localStorage.setItem('alltools_lofi_playing', '1');
            lofiPlayBtn.textContent = '⏸ PAUSE';
            lofiPlayBtn.classList.add('active');
            setStatus('LIVE STREAM', true);
          })
          .catch((err) => {
            console.warn('[CyberWidgets] Autoplay prevented or stream error:', err);
            isPlaying = false;
            localStorage.setItem('alltools_lofi_playing', '0');
            lofiPlayBtn.textContent = '▶ PLAY';
            lofiPlayBtn.classList.remove('active');
            setStatus('PAUSED', false);
          });
      }
    }

    function pauseAudio() {
      audio.pause();
      isPlaying = false;
      localStorage.setItem('alltools_lofi_playing', '0');
      lofiPlayBtn.textContent = '▶ PLAY';
      lofiPlayBtn.classList.remove('active');
      setStatus('PAUSED', false);
    }

    function togglePlay() {
      if (isPlaying) {
        pauseAudio();
      } else {
        playAudio();
      }
    }

    // Audio Event Handlers
    audio.addEventListener('waiting', () => {
      if (isPlaying) setStatus('BUFFERING...', true);
    });

    audio.addEventListener('playing', () => {
      isPlaying = true;
      lofiPlayBtn.textContent = '⏸ PAUSE';
      lofiPlayBtn.classList.add('active');
      setStatus('LIVE STREAM', true);
    });

    audio.addEventListener('pause', () => {
      if (!audio.ended) {
        isPlaying = false;
        lofiPlayBtn.textContent = '▶ PLAY';
        lofiPlayBtn.classList.remove('active');
        setStatus('PAUSED', false);
      }
    });

    audio.addEventListener('error', (e) => {
      console.warn('[CyberWidgets] Stream error:', e);
      setStatus('STREAM ERROR', false);
      isPlaying = false;
      lofiPlayBtn.textContent = '▶ PLAY';
      lofiPlayBtn.classList.remove('active');
    });

    // Control Listeners
    lofiPlayBtn.addEventListener('click', togglePlay);

    lofiPrevBtn.addEventListener('click', () => {
      const prevIdx = (currentStationIdx - 1 + STATIONS.length) % STATIONS.length;
      loadStation(prevIdx, isPlaying);
    });

    lofiNextBtn.addEventListener('click', () => {
      const nextIdx = (currentStationIdx + 1) % STATIONS.length;
      loadStation(nextIdx, isPlaying);
    });

    lofiVolSlider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      audio.volume = val;
      localStorage.setItem('alltools_lofi_vol', val.toString());
    });

    lofiToggleBtn.addEventListener('click', () => {
      const isCollapsed = lofiBody.classList.toggle('collapsed');
      lofiToggleBtn.textContent = isCollapsed ? '▲' : '▼';
      localStorage.setItem('alltools_lofi_collapsed', isCollapsed ? '1' : '0');
    });

    // Init Station State
    updateStationUI();
    audio.src = STATIONS[currentStationIdx].url;

    // Autoplay attempt if saved as playing
    if (savedPlaying) {
      const tryAutoPlay = () => {
        playAudio();
        window.removeEventListener('click', tryAutoPlay);
        window.removeEventListener('keydown', tryAutoPlay);
      };
      playAudio();
      window.addEventListener('click', tryAutoPlay, { once: true });
      window.addEventListener('keydown', tryAutoPlay, { once: true });
    } else {
      setStatus('PAUSED', false);
    }


    /* ============================================================
       TASK 2: FLOATING POMODORO TIMER WIDGET
       ============================================================ */
    const pomoWidget = document.createElement('div');
    pomoWidget.className = 'cyber-widget cyber-widget-right';
    pomoWidget.id = 'pomo-widget';

    const MODES = {
      work: { name: 'Work', seconds: 25 * 60 },
      short: { name: 'Short Break', seconds: 5 * 60 },
      long: { name: 'Long Break', seconds: 15 * 60 }
    };

    let currentMode = 'work';
    let timeLeft = MODES.work.seconds;
    let timerInterval = null;
    let isTimerRunning = false;
    let completedSessions = 0;

    pomoWidget.innerHTML = `
      <div class="cyber-widget-header">
        <div class="cyber-widget-title">
          <span>⏱</span> <span>POMODORO</span>
        </div>
        <button class="cyber-widget-toggle" id="pomo-toggle-btn" title="Toggle Panel">▼</button>
      </div>
      <div class="cyber-widget-body" id="pomo-body">
        <div class="pomo-mode-tabs">
          <button class="cyber-btn pomo-tab-btn active" data-mode="work">WORK (25m)</button>
          <button class="cyber-btn pomo-tab-btn" data-mode="short">SHORT (5m)</button>
          <button class="cyber-btn pomo-tab-btn" data-mode="long">LONG (15m)</button>
        </div>
        <div class="pomo-display">
          <div class="pomo-time" id="pomo-time-display">25:00</div>
        </div>
        <div class="pomo-controls-row">
          <button class="cyber-btn pomo-btn-start" id="pomo-start-btn">START ▶</button>
          <button class="cyber-btn pomo-btn-reset" id="pomo-reset-btn">↺ RESET</button>
        </div>
        <div class="pomo-stats">
          <span>COMPLETED:</span>
          <span class="pomo-tomatoes" id="pomo-session-display">🍅 x 0</span>
        </div>
      </div>
    `;

    document.body.appendChild(pomoWidget);

    // Elements
    const pomoToggleBtn = pomoWidget.querySelector('#pomo-toggle-btn');
    const pomoBody = pomoWidget.querySelector('#pomo-body');
    const pomoTimeDisplay = pomoWidget.querySelector('#pomo-time-display');
    const pomoStartBtn = pomoWidget.querySelector('#pomo-start-btn');
    const pomoResetBtn = pomoWidget.querySelector('#pomo-reset-btn');
    const pomoSessionDisplay = pomoWidget.querySelector('#pomo-session-display');
    const modeTabs = pomoWidget.querySelectorAll('.pomo-tab-btn');

    function formatTime(totalSec) {
      const m = Math.floor(totalSec / 60);
      const s = totalSec % 60;
      return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    function updateDisplay() {
      pomoTimeDisplay.textContent = formatTime(timeLeft);
    }

    function setMode(modeKey) {
      if (!MODES[modeKey]) return;
      currentMode = modeKey;
      pauseTimer();
      timeLeft = MODES[currentMode].seconds;
      updateDisplay();

      modeTabs.forEach((tab) => {
        if (tab.dataset.mode === modeKey) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      });
    }

    function startTimer() {
      if (isTimerRunning) return;
      isTimerRunning = true;
      pomoStartBtn.textContent = '⏸ PAUSE';
      pomoStartBtn.classList.add('active');

      timerInterval = setInterval(() => {
        if (timeLeft > 0) {
          timeLeft--;
          updateDisplay();
        } else {
          // Timer finished
          pauseTimer();
          playBeep();

          if (currentMode === 'work') {
            completedSessions++;
            pomoSessionDisplay.textContent = `🍅 x ${completedSessions}`;
            showToast('WORK SESSION COMPLETE! TIME FOR A BREAK! ☕');
          } else {
            showToast('BREAK ENDED! TIME TO GET BACK TO FOCUS! ⚡');
          }
        }
      }, 1000);
    }

    function pauseTimer() {
      isTimerRunning = false;
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
      pomoStartBtn.textContent = 'START ▶';
      pomoStartBtn.classList.remove('active');
    }

    function toggleTimer() {
      if (isTimerRunning) {
        pauseTimer();
      } else {
        startTimer();
      }
    }

    function resetTimer() {
      pauseTimer();
      timeLeft = MODES[currentMode].seconds;
      updateDisplay();
    }

    // Event Listeners for Pomodoro
    modeTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        setMode(tab.dataset.mode);
      });
    });

    pomoStartBtn.addEventListener('click', toggleTimer);
    pomoResetBtn.addEventListener('click', resetTimer);

    pomoToggleBtn.addEventListener('click', () => {
      const isCollapsed = pomoBody.classList.toggle('collapsed');
      pomoToggleBtn.textContent = isCollapsed ? '▲' : '▼';
    });

    updateDisplay();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidgets);
  } else {
    initWidgets();
  }
})();
