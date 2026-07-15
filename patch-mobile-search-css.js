const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

const missingMobileSearchCSS = `
/* ============================================================
   MOBILE SEARCH OVERLAY
   ============================================================ */
.mobile-search-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: var(--bg); z-index: 2000;
  display: flex; flex-direction: column;
  opacity: 0; visibility: hidden; transition: all 0.3s;
}
.mobile-search-overlay.open { opacity: 1; visibility: visible; }
.mobile-search-header {
  display: flex; align-items: center; padding: 20px; border-bottom: 2px solid var(--border);
}
.mobile-search-close {
  background: transparent; border: none; color: var(--white); font-size: 1.5rem; margin-right: 15px; cursor: pointer;
}
.mobile-search-input {
  background: transparent; border: none; outline: none; color: var(--white); font-size: 1.2rem;
  font-family: var(--font-mono); width: 100%; text-transform: uppercase;
}
.mobile-search-results {
  flex: 1; overflow-y: auto; padding: 20px;
}
.mobile-search-empty {
  color: var(--text-secondary); text-align: center; margin-top: 40px; font-family: var(--font-mono);
}
.mobile-search-result-item {
  display: flex; align-items: center; gap: 15px; padding: 15px;
  border-bottom: 1px solid var(--border-light); cursor: pointer;
}
.mobile-search-result-item:hover { background: var(--bg-hover); }
.mobile-search-result-icon { font-size: 1.5rem; }
.mobile-search-result-name { font-family: var(--font-display); font-weight: 700; text-transform: uppercase; }
.mobile-search-result-cat { font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent); }
`;

fs.writeFileSync('style.css', css + missingMobileSearchCSS);
console.log("Mobile Search CSS patched successfully!");
