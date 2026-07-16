const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // The exact string we added previously
  const supportLink = '\n        <a href="https://buymeacoffee.com/" target="_blank" style="color: #ffdd00; transition: color 0.2s; text-shadow: 0 0 5px rgba(255, 221, 0, 0.5);">☕ Support</a>';
  
  // Also try catching it without the newline just in case
  const supportLink2 = '<a href="https://buymeacoffee.com/" target="_blank" style="color: #ffdd00; transition: color 0.2s; text-shadow: 0 0 5px rgba(255, 221, 0, 0.5);">☕ Support</a>';
  
  if (content.includes(supportLink)) {
    content = content.replace(supportLink, '');
    fs.writeFileSync(file, content);
    console.log('Removed from: ' + file);
  } else if (content.includes(supportLink2)) {
    content = content.replace(supportLink2, '');
    fs.writeFileSync(file, content);
    console.log('Removed (no newline) from: ' + file);
  }
});
