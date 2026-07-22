const fs = require('fs');

// All pages with their display names and file names
const navPages = [
  { name: 'Tools',      file: 'index.html' },
  { name: 'Dashboard',  file: 'dashboard.html' },
  { name: 'Arcade',     file: 'games.html' },
  { name: 'News',       file: 'news.html' },
  { name: 'Matrix',     file: 'cheatsheets.html' },
  { name: 'Wall',       file: 'guestbook.html' },
  { name: 'Stats',      file: 'stats.html' },
  { name: 'Changelog',  file: 'changelog.html' },
  { name: 'AI Lab',     file: 'ai-lab.html' },
  { name: 'BBS Chat',   file: 'chat.html' },
  { name: 'About',      file: 'about.html' },
];

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== '404.html');

htmlFiles.forEach(currentFile => {
  let content = fs.readFileSync(currentFile, 'utf8');

  // Build the new nav-links content
  const navLinks = navPages.map(page => {
    const isActive = page.file === currentFile;
    const style = isActive
      ? 'color:var(--accent);text-shadow:2px 2px 0 var(--border);'
      : 'color:var(--text-secondary);transition:color 0.2s;';
    return `        <a href="${page.file}" style="${style}">${page.name}</a>`;
  }).join('\n');

  // Replace everything between the sidebar-close label and the closing </div> of nav-links
  const newNavLinks =
    `        <label for="mobile-menu-toggle" class="sidebar-close" aria-label="Close menu">✕</label>\n` +
    navLinks;

  // Replace the nav-links div content using regex
  const navLinksRegex = /(<div class="nav-links"[^>]*>)([\s\S]*?)(<\/div>\s*\n\s*<div class="nav-right")/;
  
  if (navLinksRegex.test(content)) {
    content = content.replace(navLinksRegex, (match, open, inner, closing) => {
      return `${open}\n${newNavLinks}\n      ${closing}`;
    });
    fs.writeFileSync(currentFile, content);
    console.log(`✅ Updated: ${currentFile}`);
  } else {
    console.log(`⚠️  Skipped (pattern not found): ${currentFile}`);
  }
});
