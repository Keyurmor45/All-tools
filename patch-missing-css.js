const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// Fix Modal Title CSS
css = css.replace(
  '.modal-title { display: flex; align-items: center; gap: 15px; }\n.modal-icon { font-size: 2rem; }\n.modal-title h2 { font-family: var(--font-display); font-size: 1.5rem; font-weight: 700; text-transform: uppercase; margin: 0; }\n.modal-title p { color: var(--text-secondary); font-size: 0.9rem; margin-top: 5px; }',
  '.modal-title-group { display: flex; align-items: center; gap: 15px; }\n.modal-icon { font-size: 2rem; }\n.modal-title { font-family: var(--font-display); font-size: 1.5rem; font-weight: 700; text-transform: uppercase; margin: 0; }\n.modal-description { color: var(--text-secondary); font-size: 0.9rem; margin-top: 5px; }'
);

const missingCSS = `
/* ============================================================
   MISSING COMPONENTS (Recent, Footer, Toast)
   ============================================================ */
.recent-section { margin-bottom: 40px; }
.recent-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 2px solid var(--border); padding-bottom: 10px; }
.recent-label { font-family: var(--font-display); font-weight: 700; text-transform: uppercase; color: var(--accent); }
.recent-clear { background: transparent; border: none; color: var(--text-secondary); font-family: var(--font-mono); cursor: pointer; }
.recent-clear:hover { color: var(--accent-red); }
.recent-pills { display: flex; gap: 10px; flex-wrap: wrap; }
.recent-pill {
  background: var(--bg-input); border: 1px solid var(--border);
  color: var(--white); font-family: var(--font-mono); font-size: 0.9rem;
  padding: 8px 16px; cursor: pointer; display: flex; align-items: center; gap: 8px;
  transition: all 0.2s;
}
.recent-pill:hover { border-color: var(--accent); background: var(--bg); color: var(--accent); }

.toast {
  position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%) translateY(100px);
  background: var(--accent); color: var(--bg);
  padding: 15px 30px; font-family: var(--font-display); font-weight: 700; text-transform: uppercase;
  border: 2px solid var(--bg); box-shadow: 6px 6px 0 var(--border);
  opacity: 0; visibility: hidden; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 9999;
}
.toast.show {
  transform: translateX(-50%) translateY(0);
  opacity: 1; visibility: visible;
}

.footer {
  border-top: 2px solid var(--border); background: var(--bg-input);
  padding: 60px 40px; margin-top: 100px; text-align: center;
}
.footer-logo {
  font-family: var(--font-display); font-size: 2rem; font-weight: 700; text-transform: uppercase;
  display: flex; justify-content: center; align-items: center; gap: 10px; margin-bottom: 20px;
}
.footer-social { margin-bottom: 30px; }
.footer-social-link {
  display: inline-flex; align-items: center; gap: 8px;
  color: var(--white); font-family: var(--font-mono); border: 1px solid var(--border); padding: 10px 20px;
}
.footer-social-link:hover { border-color: var(--accent); color: var(--accent); }
.footer-tagline { font-size: 1.1rem; color: var(--text-secondary); margin-bottom: 30px; }
.footer-links { display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; margin-bottom: 40px; font-family: var(--font-mono); color: var(--mid); }
.footer-links .dot { color: var(--dim); }
.footer-credits { color: var(--dim); font-size: 0.9rem; font-family: var(--font-mono); }
`;

fs.writeFileSync('style.css', css + missingCSS);
console.log("Missing CSS patched successfully!");
