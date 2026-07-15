const fs = require('fs');

// 1. Modify app-core.js
let core = fs.readFileSync('app-core.js', 'utf8');

// Add Favorites Category
core = core.replace(
  "{ id: 'all',       label: 'All Tools',       icon: '🛠️' },",
  "{ id: 'all',       label: 'All Tools',       icon: '🛠️' },\n  { id: 'favorites', label: 'Favorites',       icon: '⭐' },"
);

// Add localStorage functions
const localLogic = `
/* ================================================================
   FAVORITES & RECENTS
   ================================================================ */
window.getFavorites = function() {
  try { return JSON.parse(localStorage.getItem('alltools_favs')) || []; } catch { return []; }
}
window.toggleFavorite = function(id, e) {
  if (e) { e.preventDefault(); e.stopPropagation(); }
  let favs = getFavorites();
  if (favs.includes(id)) favs = favs.filter(x => x !== id);
  else favs.push(id);
  localStorage.setItem('alltools_favs', JSON.stringify(favs));
  
  // Re-render button if possible
  if(e && e.target) {
     e.target.textContent = favs.includes(id) ? '⭐' : '☆';
     e.target.style.transform = 'scale(1.2)';
     setTimeout(()=> e.target.style.transform = 'scale(1)', 200);
  }
  
  if(state.category === 'favorites') filterAndRender();
  renderCategories();
}
window.getRecents = function() {
  try { return JSON.parse(localStorage.getItem('alltools_recents')) || []; } catch { return []; }
}
window.addRecent = function(id) {
  let recents = getRecents();
  recents = recents.filter(x => x !== id);
  recents.unshift(id);
  if (recents.length > 5) recents.pop();
  localStorage.setItem('alltools_recents', JSON.stringify(recents));
  renderRecents();
}
window.clearRecents = function() {
  localStorage.removeItem('alltools_recents');
  renderRecents();
}
window.renderRecents = function() {
  const rs = document.getElementById('recent-section');
  const rp = document.getElementById('recent-pills');
  if(!rs || !rp) return;
  const r = getRecents();
  if (r.length === 0) {
    rs.style.display = 'none';
  } else {
    rs.style.display = 'block';
    rp.innerHTML = r.map(id => {
       const t = TOOLS.find(x => x.id === id);
       if(!t) return '';
       return \`<button class="category-pill" style="padding:6px 12px; font-size:0.9rem;" onclick="openTool('\${t.id}')">\${t.icon} \${t.name}</button>\`;
    }).join('');
  }
}
`;

core = core.replace(
  "/* ================================================================\n   UTILITY FUNCTIONS",
  localLogic + "\n/* ================================================================\n   UTILITY FUNCTIONS"
);

// Fix filterAndRender
core = core.replace(
  "if (state.category !== 'all') tools = tools.filter(t => t.category === state.category);",
  "if (state.category === 'favorites') { const favs = getFavorites(); tools = tools.filter(t => favs.includes(t.id)); } else if (state.category !== 'all') tools = tools.filter(t => t.category === state.category);"
);

// Fix category count for favorites
core = core.replace(
  "const count = cat.id === 'all' ? TOOLS.length : TOOLS.filter(t => t.category === cat.id).length;",
  "let count = 0; if(cat.id === 'all') count = TOOLS.length; else if(cat.id === 'favorites') count = getFavorites().length; else count = TOOLS.filter(t => t.category === cat.id).length;"
);

// Add Favorite Star to Card
core = core.replace(
  /<div class="tool-card-name">\$\{tool\.name\}<\/div>/,
  `<div class="tool-card-name" style="display:flex; justify-content:space-between; align-items:center;">
          <span>\${tool.name}</span>
          <button class="fav-btn" onclick="toggleFavorite('\${tool.id}', event)" aria-label="Toggle Favorite" style="background:none;border:none;cursor:pointer;font-size:1.1rem;transition:transform 0.2s;">
            \${getFavorites().includes(tool.id) ? '⭐' : '☆'}
          </button>
        </div>`
);

// Call addRecent in openTool
core = core.replace(
  "if (typeof tool.setup === 'function') tool.setup(ioContainer);",
  "if (typeof tool.setup === 'function') tool.setup(ioContainer);\n  addRecent(toolId);"
);

fs.writeFileSync('app-core.js', core);

// 2. Modify app-init.js to clear recent handler
let init = fs.readFileSync('app-init.js', 'utf8');
init = init.replace(
  "renderTools();",
  "renderTools();\n  renderRecents();\n  document.getElementById('recent-clear')?.addEventListener('click', clearRecents);"
);
fs.writeFileSync('app-init.js', init);

// 3. Modify index.html to add mobile menu favorites
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(
  '<button class="mobile-menu-link" id="mm-all">🛠️ All Tools</button>',
  '<button class="mobile-menu-link" id="mm-all">🛠️ All Tools</button>\n    <button class="mobile-menu-link" id="mm-fav">⭐ Favorites</button>'
);
html = html.replace(
  "['all','text','dev','math','image','color','security','datetime','converter','web'].forEach(cat => {",
  "['all','fav','text','dev','math','image','color','security','datetime','converter','web'].forEach(cat => {"
);
html = html.replace(
  "const map = { all:'all', text:'text', dev:'developer', math:'math', image:'image', color:'color', security:'security', datetime:'datetime', converter:'converter', web:'web' };",
  "const map = { all:'all', fav:'favorites', text:'text', dev:'developer', math:'math', image:'image', color:'color', security:'security', datetime:'datetime', converter:'converter', web:'web' };"
);
fs.writeFileSync('index.html', html);

console.log("Successfully implemented Favorites and Recents system.");
