const fs = require('fs');
let c = fs.readFileSync('tools-pdf.js', 'utf8');
c = c.replace(/\\`/g, '`');
c = c.replace(/\\\$\{/g, '${');
fs.writeFileSync('tools-pdf.js', c);
