const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const tag = '  <script src="unique-features.js"></script>\n</body>';
files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  if (!c.includes('unique-features.js')) {
    c = c.replace('</body>', tag);
    fs.writeFileSync(f, c);
    console.log('Injected: ' + f);
  } else {
    console.log('Already OK: ' + f);
  }
});
