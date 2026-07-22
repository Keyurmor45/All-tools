const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir);

const htmlFiles = files.filter(f => f.endsWith('.html'));

console.log(`Found ${htmlFiles.length} HTML files to update.`);

let updatedCount = 0;

htmlFiles.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. Theme-Color Meta
  if (/<meta\s+name=["']theme-color["']/i.test(content)) {
    // Replace existing content attribute with #ccff00
    content = content.replace(/<meta\s+name=["']theme-color["']\s+content=["'][^"']*["']\s*\/?>/i, '<meta name="theme-color" content="#ccff00">');
  } else {
    // Add theme-color meta tag into head
    if (content.includes('</head>')) {
      content = content.replace('</head>', '  <meta name="theme-color" content="#ccff00">\n</head>');
    } else if (content.includes('<head>')) {
      content = content.replace('<head>', '<head>\n  <meta name="theme-color" content="#ccff00">');
    }
  }

  // 2. Manifest Link
  if (!/rel=["']manifest["']/i.test(content)) {
    if (content.includes('</head>')) {
      content = content.replace('</head>', '  <link rel="manifest" href="manifest.json">\n</head>');
    } else if (content.includes('<head>')) {
      content = content.replace('<head>', '<head>\n  <link rel="manifest" href="manifest.json">');
    }
  }

  // 3. Service Worker registration script before </body>
  if (!content.includes('navigator.serviceWorker.register')) {
    const swScript = `\n<script>\n  if ('serviceWorker' in navigator) {\n    navigator.serviceWorker.register('/sw.js').catch(()=>{});\n  }\n</script>\n`;
    if (content.includes('</body>')) {
      content = content.replace('</body>', `${swScript}</body>`);
    } else if (content.includes('</html>')) {
      content = content.replace('</html>', `${swScript}</html>`);
    } else {
      content += swScript;
    }
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${file}`);
    updatedCount++;
  } else {
    console.log(`No changes needed: ${file}`);
  }
});

console.log(`Finished! Updated ${updatedCount} HTML files.`);
