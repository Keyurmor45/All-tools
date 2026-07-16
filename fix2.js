const fs = require('fs');
['app-core.js', 'tools-trading.js'].forEach(file => {
  let c = fs.readFileSync(file, 'utf8');
  c = c.replace(/\\`/g, '`');
  c = c.replace(/\\\$\{/g, '${');
  fs.writeFileSync(file, c);
  console.log('Fixed ' + file);
});
