const fs = require('fs');
let c = fs.readFileSync('tools-19.js', 'utf8');
c = c.replace(/var\(--cyan\)/g, 'var(--accent-warm)');
c = c.replace(/var\(--bg-secondary\)/g, 'var(--bg-card)');
c = c.replace(/var\(--bg-primary\)/g, 'var(--bg)');
c = c.replace(/color:#55ff55/g, 'color:var(--accent-warm)');
c = c.replace(/color:#ff5555/g, 'color:var(--accent-red)');
fs.writeFileSync('tools-19.js', c);
console.log('Fixed styles in tools-19.js');
