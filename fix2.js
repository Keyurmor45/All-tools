const fs = require('fs');
let c = fs.readFileSync('generate-tools.js', 'utf8');
c = c.replace(/\/https\?:\\\\\/\\\\\/\[\^\\\\s\]\+\/g/g, "new RegExp('https?://[^\\\\\\\\s]+', 'g')");
c = c.replace(/\/\[\.,\\\\\/#\!\$%\$\\\\^&\\\\\*;:\{\}=\\\\-_\\\`~\(\)\]\/g/g, "new RegExp('[.,\\\\\\\\/#!$%\\\\\\\\^&\\\\\\\\*;:{}=\\\\\\\\-_`~()]', 'g')");
fs.writeFileSync('generate-tools.js', c);
console.log('Fixed regexes');
