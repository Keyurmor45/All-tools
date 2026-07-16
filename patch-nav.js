const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // If already added, skip
  if(content.includes('about.html')) return;
  
  // Find the BBS Chat link and insert About and Support after it
  const chatLink = '<a href="chat.html" style="color: var(--text-secondary); transition: color 0.2s;">BBS Chat</a>';
  const newLinks = `
        <a href="about.html" style="color: var(--text-secondary); transition: color 0.2s;">About</a>
        <a href="https://buymeacoffee.com/" target="_blank" style="color: #ffdd00; transition: color 0.2s; text-shadow: 0 0 5px rgba(255, 221, 0, 0.5);">☕ Support</a>`;
  
  content = content.replace(chatLink, chatLink + newLinks);
  
  fs.writeFileSync(file, content);
  console.log('Updated navbar in: ' + file);
});
