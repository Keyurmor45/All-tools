const fs = require('fs');
const path = require('path');

const targetDir = __dirname;
const files = fs.readdirSync(targetDir).filter(f => f.endsWith('.html') && f !== '404.html');

console.log(`Found ${files.length} HTML files to update (excluding 404.html)...`);

files.forEach(file => {
  const filePath = path.join(targetDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('src="widgets.js"') || content.includes("src='widgets.js'")) {
    console.log(`[SKIP] Already injected: ${file}`);
    return;
  }

  if (content.includes('</body>')) {
    content = content.replace('</body>', '  <script src="widgets.js"></script>\n</body>');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[INJECTED] Updated ${file}`);
  } else {
    console.warn(`[WARN] No </body> tag found in ${file}`);
  }
});

console.log('Injection complete!');
