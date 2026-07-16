const fs = require('fs');
let c = fs.readFileSync('app-core.js', 'utf8');

// 1. Remove trading from CATEGORIES
c = c.replace(/\{\s*id:\s*'trading'[^\}]+\},\s*\n/, '');

// 2. Modify filterAndRender
c = c.replace(
  /function filterAndRender\(\) \{\n\s*let tools = TOOLS;/,
  `function filterAndRender() {\n  let tools = TOOLS.filter(t => t.category !== 'trading');`
);

// 3. Append renderTradingCarousel & shuffle logic at the bottom
const carouselLogic = `
/* ================================================================
   TRADING CAROUSEL LOGIC
   ================================================================ */
function seededRandom(seed) {
  var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function shuffleTradingTools(tools) {
  const today = new Date();
  let seed = today.getFullYear() * 1000 + Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
  let shuffled = [...tools];
  for(let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(seed++) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

window.renderTradingCarousel = function() {
  const grid = document.getElementById('trading-carousel');
  if (!grid) return;
  
  let tradingTools = TOOLS.filter(t => t.category === 'trading');
  tradingTools = shuffleTradingTools(tradingTools);
  
  grid.innerHTML = tradingTools.map((tool, i) => {
    return \\\`
    <div class="tool-card cat-trading featured-tool-card" role="listitem"
         style="animation-delay:\\\${Math.min(i * 0.03, 0.5)}s; border-color: var(--accent); box-shadow: 0 0 10px rgba(204, 255, 0, 0.2);"
         data-tool-id="\\\${tool.id}" tabindex="0"
         aria-label="Open \\\${tool.name} tool">
      <div class="card-bg"></div>
      <div class="tool-card-inner">
        <div class="tool-card-meta">
          <span class="tool-card-category">Trading Tools</span>
        </div>
        <div class="tool-card-icon" aria-hidden="true">\\\${tool.icon}</div>
        <div class="tool-card-name">
          <span>\\\${tool.name}</span>
        </div>
        <div class="tool-card-desc">\\\${tool.description}</div>
      </div>
    </div>\\\`;
  }).join('');
  
  grid.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('click', () => openTool(card.dataset.toolId));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openTool(card.dataset.toolId); });
  });
}

window.scrollTrading = function(dir) {
  const c = document.getElementById('trading-carousel');
  if(c) c.scrollBy({ left: dir * 320, behavior: 'smooth' });
}
`;

if (!c.includes('renderTradingCarousel')) {
  c += carouselLogic;
}

fs.writeFileSync('app-core.js', c);
