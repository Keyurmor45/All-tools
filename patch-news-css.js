const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

const missingNewsCSS = `
/* ============================================================
   NEWS FEED (news.html)
   ============================================================ */
.news-feed {
  display: flex; flex-direction: column; gap: 15px;
}
.news-item {
  display: flex; align-items: stretch; gap: 20px;
  background: var(--bg-card); border: 2px solid var(--border);
  padding: 0; text-decoration: none; position: relative;
  transition: all 0.2s; overflow: hidden;
  animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) backwards;
}
@keyframes slideUp {
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
.news-item:hover {
  background: var(--accent); border-color: var(--accent);
  transform: translateX(10px);
}
.news-score {
  background: var(--bg-input); border-right: 2px solid var(--border);
  padding: 20px; display: flex; flex-direction: column; justify-content: center; align-items: center;
  min-width: 100px;
}
.news-item:hover .news-score { background: var(--bg); border-right-color: var(--bg); }
.news-score-val {
  font-family: var(--font-display); font-weight: 900; font-size: 1.8rem; color: var(--accent);
}
.news-score-label {
  font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-secondary);
}
.news-item:hover .news-score-label { color: var(--text-primary); }

.news-content {
  flex: 1; padding: 25px 0; display: flex; flex-direction: column; justify-content: center;
}
.news-title {
  font-family: var(--font-display); font-weight: 700; font-size: 1.3rem; margin: 0 0 10px 0;
  color: var(--text-primary); text-transform: uppercase; line-height: 1.3;
}
.news-item:hover .news-title { color: var(--bg); }
.news-meta {
  font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-secondary);
  display: flex; flex-wrap: wrap; gap: 10px;
}
.news-item:hover .news-meta { color: var(--bg); font-weight: bold; }
.news-arrow {
  display: flex; align-items: center; justify-content: center;
  padding: 0 30px; font-size: 2rem; color: var(--border);
  transition: all 0.2s;
}
.news-item:hover .news-arrow { color: var(--bg); transform: translate(5px, -5px); }
`;

fs.writeFileSync('style.css', css + missingNewsCSS);
console.log("News CSS patched successfully!");
