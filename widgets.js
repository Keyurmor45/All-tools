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
    widgetWrap.style.cssText = 'position:fixed; right:80px; bottom:30px; z-index:9990; font-family:"JetBrains Mono", monospace;';

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
