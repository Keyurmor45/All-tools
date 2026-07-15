const fs = require('fs');
let core = fs.readFileSync('app-core.js', 'utf8');

// 1. Update hash on openTool
core = core.replace(
  "currentTool = tool;",
  "currentTool = tool;\n  window.history.pushState(null, null, '#' + toolId);"
);

// 2. Clear hash on closeTool
core = core.replace(
  "document.body.style.overflow = '';",
  "document.body.style.overflow = '';\n  if(window.location.hash) window.history.pushState(null, null, window.location.pathname);"
);

// 3. Add "Share" button to modal header
core = core.replace(
  /<button class="modal-close" id="modal-close" aria-label="Close tool">✕<\/button>/,
  `<button class="modal-share" id="modal-share" aria-label="Share tool" style="background:none; border:none; color:var(--text-primary); cursor:pointer; font-size:1.2rem; margin-right:15px;" title="Copy Link to Tool">🔗</button>
      <button class="modal-close" id="modal-close" aria-label="Close tool">✕</button>`
);

// Add event listener for the share button inside openTool
core = core.replace(
  "document.getElementById('modal-close')?.addEventListener('click', closeTool);",
  "document.getElementById('modal-close')?.addEventListener('click', closeTool);\n  document.getElementById('modal-share')?.addEventListener('click', () => copyText(window.location.href, document.getElementById('modal-share')));"
);

fs.writeFileSync('app-core.js', core);

// 4. Add DOMContentLoaded hash checker to app-init.js
let init = fs.readFileSync('app-init.js', 'utf8');
init = init.replace(
  "document.getElementById('recent-clear')?.addEventListener('click', clearRecents);",
  "document.getElementById('recent-clear')?.addEventListener('click', clearRecents);\n\n    // Deep linking check\n    if (window.location.hash) {\n      const toolId = window.location.hash.substring(1);\n      const tool = TOOLS.find(t => t.id === toolId);\n      if (tool) setTimeout(() => openTool(toolId), 300);\n    }"
);
fs.writeFileSync('app-init.js', init);

console.log("Deep Linking and Share logic successfully patched.");
