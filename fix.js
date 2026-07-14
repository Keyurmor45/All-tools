const fs = require('fs');
let c = fs.readFileSync('generate-tools.js', 'utf8');
c = c.replace(/\.join\("\\\\n"\)/g, ".join('\\n')");
fs.writeFileSync('generate-tools.js', c);
console.log('Fixed newlines');
