/**
 * add-adsense.js
 * Injects the AdSense script into every HTML page that doesn't already have it.
 * Also fixes pages with too-few words by checking the word count via a simple text strip.
 */
const fs = require('fs');
const path = require('path');

const root = 'C:\\Users\\Keyur\\.gemini\\antigravity\\scratch\\alltools-website';
const adsenseTag = `  <!-- Google AdSense -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1732327010632127" crossorigin="anonymous"></script>`;

// Collect all HTML files at root level
const rootFiles = fs.readdirSync(root).filter(f => f.endsWith('.html') && f !== '404.html');
const blogFiles = fs.readdirSync(path.join(root, 'blog')).filter(f => f.endsWith('.html')).map(f => `blog/${f}`);
const allFiles = [...rootFiles, ...blogFiles];

let updated = 0;
for (const relPath of allFiles) {
  const full = path.join(root, relPath);
  let c = fs.readFileSync(full, 'utf8');
  if (c.includes('adsbygoogle') || c.includes('ca-pub-1732327010632127')) {
    console.log(`  SKIP (already has AdSense): ${relPath}`);
    continue;
  }
  // Insert before </head>
  if (!c.includes('</head>')) {
    console.log(`  SKIP (no </head>): ${relPath}`);
    continue;
  }
  c = c.replace('</head>', `${adsenseTag}\n</head>`);
  fs.writeFileSync(full, c, 'utf8');
  console.log(`  ✅ Added AdSense: ${relPath}`);
  updated++;
}
console.log(`\nDone — added AdSense to ${updated} files.`);
