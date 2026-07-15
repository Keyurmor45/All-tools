const fs = require('fs');
let c = fs.readFileSync('tools-20.js', 'utf8');

// 1. Fix Car Racing loop and keys
c = c.replace(/const loop = \(timestamp\) => \{/, 'const loop = (timestamp) => {\n        if(!document.body.contains(canvas)) return;');
c = c.replace(/window\.addEventListener\('keydown', \(e\) => \{/g, 'const hd = (e) => {\n        if(!document.body.contains(canvas)) { window.removeEventListener("keydown", hd); return; }\n');
c = c.replace(/window\.addEventListener\('keyup', \(e\) => \{/g, 'const hu = (e) => {\n        if(!document.body.contains(canvas)) { window.removeEventListener("keyup", hu); return; }\n');
c = c.replace(/\}\);\n      canvas\.addEventListener\('touchstart'/g, '};\n      window.addEventListener("keydown", hd);\n      window.addEventListener("keyup", hu);\n      canvas.addEventListener("touchstart"');

// 2. Fix Flappy loop and keys
c = c.replace(/const loop = \(\) => \{/g, 'const loop = () => {\n        if(!document.body.contains(canvas)) return;');
c = c.replace(/window\.addEventListener\('keydown', \(e\) => \{ if\(e\.key === ' ' \|\| e\.key === 'ArrowUp'\) flap\(\); \}\);/g, 
  'const hk = (e) => { if(!document.body.contains(canvas)) { window.removeEventListener("keydown", hk); return; } if(e.key === " " || e.key === "ArrowUp") flap(); }; window.addEventListener("keydown", hk);');

// 3. Fix Asteroids keys
c = c.replace(/window\.addEventListener\('keydown', e => \{ keys\[e\.key\] = true; if\(e\.key===' '\) shoot\(\); \}\);/g,
  'const hk = (e) => { if(!document.body.contains(canvas)) { window.removeEventListener("keydown", hk); return; } keys[e.key] = true; if(e.key===" ") shoot(); }; window.addEventListener("keydown", hk);');
c = c.replace(/window\.addEventListener\('keyup', e => keys\[e\.key\] = false\);/g,
  'const hku = (e) => { if(!document.body.contains(canvas)) { window.removeEventListener("keyup", hku); return; } keys[e.key] = false; }; window.addEventListener("keyup", hku);');

fs.writeFileSync('tools-20.js', c);
console.log('Fixed memory leaks in tools-20.js');
