const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\Keyur\\.gemini\\antigravity\\scratch\\alltools-website';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const blogLink = '<a href="blog/index.html" style="color:var(--text-secondary);transition:color 0.2s;">Blog</a>\n        ';
const aboutAnchor = '<a href="about.html"';

let count = 0;
for (const file of files) {
  const full = path.join(dir, file);
  let c = fs.readFileSync(full, 'utf8');
  if (c.includes('blog/index.html')) continue; // already has it
  if (!c.includes(aboutAnchor)) continue;
  c = c.replace(aboutAnchor, blogLink + aboutAnchor);
  fs.writeFileSync(full, c, 'utf8');
  count++;
  console.log('Updated: ' + file);
}
console.log(`Done — updated ${count} files`);
