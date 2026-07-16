const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.startsWith('tools-') && f.endsWith('.js'));
let updatedCount = 0;

files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  let original = c;
  
  // Replace old bootstrap-style buttons
  c = c.replace(/class="btn btn-(?:primary|secondary|success|danger|warning)[^"]*"/g, 'class="cyber-btn"');
  
  // Replace custom action buttons
  c = c.replace(/class="action-btn[^"]*"/g, 'class="cyber-btn"');
  
  if (c !== original) {
    fs.writeFileSync(f, c);
    updatedCount++;
    console.log('Updated buttons in: ' + f);
  }
});

console.log('Total files updated: ' + updatedCount);
