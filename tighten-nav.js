const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== '404.html');

files.forEach(file => {
  let c = fs.readFileSync(file, 'utf8');

  // Tighten the nav-links inline style: smaller font, tighter gap, no wrap
  c = c.replace(
    /style="display:\s*flex;\s*gap:\s*\d+px;\s*font-family:\s*var\(--font-display\);\s*font-weight:\s*700;\s*font-size:\s*[\d.]+rem;\s*text-transform:\s*uppercase;"/g,
    'style="display:flex;align-items:center;gap:10px;font-family:var(--font-display);font-weight:700;font-size:0.7rem;text-transform:uppercase;white-space:nowrap;overflow-x:auto;"'
  );

  // Also handle variations without spaces
  c = c.replace(
    /style="display:flex;gap:20px;font-family:var\(--font-display\);font-weight:700;font-size:1\.1rem;text-transform:uppercase;"/g,
    'style="display:flex;align-items:center;gap:10px;font-family:var(--font-display);font-weight:700;font-size:0.7rem;text-transform:uppercase;white-space:nowrap;overflow-x:auto;"'
  );

  fs.writeFileSync(file, c);
  console.log('Updated: ' + file);
});
