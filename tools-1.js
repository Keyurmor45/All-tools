/* ================================================================
   tools-1.js — Text Tools (22) + Developer Tools (22) = 44 tools
   ================================================================ */

/* ---- helper shared inside this file ---- */
function q(el, s) { return el.querySelector(s); }
function qa(el, s) { return el.querySelectorAll(s); }
function setOut(el, id, val) { const o = el.querySelector('#'+id); if(o) o.textContent = val; }

/* ---- Morse code tables ---- */
const MORSE_ENC = {A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..',0:'-----',1:'.----',2:'..---',3:'...--',4:'....-',5:'.....',6:'-....',7:'--...',8:'---..',9:'----.'};
const MORSE_DEC = Object.fromEntries(Object.entries(MORSE_ENC).map(([k,v])=>[v,k]));

/* ================================================================
   TEXT TOOLS (22)
   ================================================================ */

TOOLS.push(

/* Character Map */ {
  id:'character-map', name:'Character Map', icon:'©️', category:'text',
  description:'Find and copy special characters, symbols, arrows, math operators, and punctuation.',
  tags:['char','map','special','symbol','arrow','math','currency','greek'],
  setup(el) {
    const chars = [
      {c:'←',n:'Left arrow'},{c:'↑',n:'Up arrow'},{c:'→',n:'Right arrow'},{c:'↓',n:'Down arrow'},{c:'↔',n:'Left right arrow'},
      {c:'↕',n:'Up down arrow'},{c:'↖',n:'North west arrow'},{c:'↗',n:'North east arrow'},{c:'↘',n:'South east arrow'},
      {c:'↙',n:'South west arrow'},{c:'↺',n:'Counter clockwise'},{c:'↻',n:'Clockwise'},
      {c:'×',n:'Multiply'},{c:'÷',n:'Divide'},{c:'±',n:'Plus minus'},{c:'−',n:'Minus'},{c:'≠',n:'Not equal'},
      {c:'≈',n:'Almost equal'},{c:'≡',n:'Identical'},{c:'≤',n:'Less than or equal'},{c:'≥',n:'Greater than or equal'},
      {c:'∞',n:'Infinity'},{c:'√',n:'Square root'},{c:'∑',n:'Sum'},{c:'∏',n:'Product'},{c:'π',n:'Pi'},
      {c:'$',n:'Dollar'},{c:'¢',n:'Cent'},{c:'£',n:'Pound'},{c:'¥',n:'Yen'},{c:'€',n:'Euro'},{c:'₹',n:'Rupee'},{c:'₽',n:'Ruble'},{c:'₿',n:'Bitcoin'},
      {c:'«',n:'Left quote'},{c:'»',n:'Right quote'},{c:'“',n:'Left double quote'},{c:'”',n:'Right double quote'},
      {c:'‘',n:'Left single quote'},{c:'’',n:'Right single quote'},{c:'•',n:'Bullet'},{c:'†',n:'Dagger'},{c:'‡',n:'Double dagger'},
      {c:'α',n:'Alpha'},{c:'β',n:'Beta'},{c:'γ',n:'Gamma'},{c:'δ',n:'Delta'},{c:'ε',n:'Epsilon'},{c:'θ',n:'Theta'},{c:'λ',n:'Lambda'},{c:'μ',n:'Mu'},{c:'σ',n:'Sigma'},{c:'ω',n:'Omega'},
      {c:'Δ',n:'Delta upper'},{c:'Σ',n:'Sigma upper'},{c:'Ω',n:'Omega upper'},
      {c:'©',n:'Copyright'},{c:'®',n:'Registered'},{c:'™',n:'Trademark'},{c:'¶',n:'Paragraph'},{c:'§',n:'Section'},{c:'°',n:'Degree'},
      {c:'⌘',n:'Command'},{c:'⌥',n:'Option'},{c:'⇧',n:'Shift'},{c:'⌃',n:'Control'},{c:'⏎',n:'Return'},{c:'⌫',n:'Delete'},
      {c:'★',n:'Star'},{c:'✓',n:'Check'},{c:'✗',n:'Cross'},{c:'♥',n:'Heart'},{c:'⚠',n:'Warning'},{c:'⚡',n:'Lightning'},{c:'✂',n:'Scissors'}
    ];
    
    el.innerHTML = `
      <div class="tool-section">
        <input type="text" class="tool-input mb-2" id="cmap-search" placeholder="Search characters (e.g. arrow, copyright)..." aria-label="Search characters">
      </div>
      <style>
        .cmap-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(48px,1fr)); gap:6px; max-height:400px; overflow-y:auto; padding:2px; }
        .cmap-char { background:var(--bg-input); border:1px solid var(--border); border-radius:var(--r-sm); height:48px; display:flex; align-items:center; justify-content:center; font-size:1.4rem; cursor:pointer; transition:var(--tr-fast); font-family:system-ui; }
        .cmap-char:hover { background:var(--bg-hover); border-color:var(--border-light); transform:scale(1.05); }
        .cmap-char:active { transform:scale(0.95); }
      </style>
      <div class="cmap-grid" id="cmap-grid"></div>
    `;
    
    const grid = el.querySelector('#cmap-grid');
    const input = el.querySelector('#cmap-search');
    
    function render(filter = '') {
      const q = filter.toLowerCase();
      const filtered = chars.filter(c => c.n.toLowerCase().includes(q) || c.c.includes(q));
      if (!filtered.length) {
        grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:20px">No characters found</div>';
        return;
      }
      grid.innerHTML = filtered.map(c => `<div class="cmap-char" title="${c.n}">${c.c}</div>`).join('');

      
      grid.querySelectorAll('.cmap-char').forEach(btn => {
        btn.addEventListener('click', () => {
          const char = btn.textContent;
          window.copyText(char);
          window.showToast('Copied: ' + char);
        });
      });
    }
    
    render();
    input.addEventListener('input', e => render(e.target.value));
  }
},

/* 1 */ {
  id:'word-counter', name:'Word Counter', icon:'📊', category:'text',
  description:'Count words, characters, sentences, paragraphs and more in real time.',
  tags:['word','count','character','text','stats','letters'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section">
        <label class="tool-label">Enter or paste your text</label>
        <textarea class="tool-textarea" id="wc-in" style="min-height:160px" placeholder="Start typing here…" aria-label="Text input"></textarea>
      </div>
      <div class="stats-grid" id="wc-stats">
        <div class="stat-card"><div class="stat-card-num" id="wc-words">0</div><div class="stat-card-label">Words</div></div>
        <div class="stat-card"><div class="stat-card-num" id="wc-chars">0</div><div class="stat-card-label">Characters</div></div>
        <div class="stat-card"><div class="stat-card-num" id="wc-chars-ns">0</div><div class="stat-card-label">No Spaces</div></div>
        <div class="stat-card"><div class="stat-card-num" id="wc-sents">0</div><div class="stat-card-label">Sentences</div></div>
        <div class="stat-card"><div class="stat-card-num" id="wc-paras">0</div><div class="stat-card-label">Paragraphs</div></div>
        <div class="stat-card"><div class="stat-card-num" id="wc-lines">0</div><div class="stat-card-label">Lines</div></div>
        <div class="stat-card"><div class="stat-card-num" id="wc-read">0</div><div class="stat-card-label">Read (min)</div></div>
        <div class="stat-card"><div class="stat-card-num" id="wc-uniq">0</div><div class="stat-card-label">Unique Words</div></div>
      </div>`;
    q(el,'#wc-in').addEventListener('input', function() {
      const t = this.value;
      const words = t.trim() ? t.trim().split(/\s+/).filter(Boolean) : [];
      q(el,'#wc-words').textContent = words.length;
      q(el,'#wc-chars').textContent = t.length;
      q(el,'#wc-chars-ns').textContent = t.replace(/\s/g,'').length;
      q(el,'#wc-sents').textContent = (t.match(/[.!?]+/g)||[]).length;
      q(el,'#wc-paras').textContent = t.trim() ? t.split(/\n\s*\n/).filter(p=>p.trim()).length : 0;
      q(el,'#wc-lines').textContent = t ? t.split('\n').length : 0;
      q(el,'#wc-read').textContent = Math.ceil(words.length / 200);
      q(el,'#wc-uniq').textContent = new Set(words.map(w=>w.toLowerCase().replace(/[^a-z]/g,''))).size;
    });
  }
},

/* 2 */ {
  id:'case-converter', name:'Case Converter', icon:'🔡', category:'text',
  description:'Convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case and more.',
  tags:['case','upper','lower','title','camel','snake','kebab','pascal'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section">
        <label class="tool-label">Input Text</label>
        <textarea class="tool-textarea" id="cc-in" placeholder="Enter text here…"></textarea>
      </div>
      <div class="btn-group mb-2">
        ${['UPPER','lower','Title','Sentence','camelCase','PascalCase','snake_case','kebab-case','aLtErNaTiNg','Reverse'].map(c=>
          `<button class="cyber-btn" data-case="${c}">${c}</button>`).join('')}
      </div>
      ${outputBlock('cc-out','Result')}`;
    const inp = q(el,'#cc-in'), out = q(el,'#cc-out');
    q(el,'.btn-group').addEventListener('click', e => {
      const c = e.target.dataset.case; if(!c) return;
      const t = inp.value;
      const words = t.split(/\s+/);
      const toTitle = s => s.split(' ').map(w=>w?w[0].toUpperCase()+w.slice(1).toLowerCase():'').join(' ');
      let r = t;
      if(c==='UPPER') r=t.toUpperCase();
      else if(c==='lower') r=t.toLowerCase();
      else if(c==='Title') r=toTitle(t);
      else if(c==='Sentence') r=t.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g,m=>m.toUpperCase());
      else if(c==='camelCase') r=words.map((w,i)=>i===0?w.toLowerCase():w?w[0].toUpperCase()+w.slice(1).toLowerCase():'').join('');
      else if(c==='PascalCase') r=words.map(w=>w?w[0].toUpperCase()+w.slice(1).toLowerCase():'').join('');
      else if(c==='snake_case') r=t.toLowerCase().replace(/\s+/g,'_').replace(/[^a-z0-9_]/g,'');
      else if(c==='kebab-case') r=t.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'');
      else if(c==='aLtErNaTiNg') r=[...t].map((ch,i)=>i%2===0?ch.toLowerCase():ch.toUpperCase()).join('');
      else if(c==='Reverse') r=t.split('').reverse().join('');
      out.textContent = r;
    });
  }
},

/* 3 */ {
  id:'lorem-ipsum', name:'Lorem Ipsum Generator', icon:'📄', category:'text',
  description:'Generate placeholder Lorem Ipsum text by paragraphs, sentences, or words.',
  tags:['lorem','ipsum','placeholder','dummy','text','generate'],
  setup(el) {
    const lorem = 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum';
    const words = lorem.split(' ');
    function sentence() { const n=Math.floor(Math.random()*10+6); return words.sort(()=>Math.random()-.5).slice(0,n).join(' ').replace(/^\w/,c=>c.toUpperCase())+'.'; }
    function paragraph(sn=5) { return Array.from({length:sn},()=>sentence()).join(' '); }
    el.innerHTML = `
      <div class="flex-gap mb-2">
        <div class="tool-section" style="flex:0 0 auto">
          <label class="tool-label">Type</label>
          <select class="tool-select" id="li-type" style="width:140px">
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </div>
        <div class="tool-section">
          <label class="tool-label">Count</label>
          <input class="tool-input" id="li-count" type="number" value="3" min="1" max="100">
        </div>
        <div class="tool-section" style="align-self:flex-end">
          <button class="cyber-btn" id="li-gen">Generate</button>
        </div>
      </div>
      ${outputBlock('li-out','Generated Text')}`;
    q(el,'#li-out').style.minHeight='160px';
    q(el,'#li-gen').addEventListener('click', () => {
      const type = q(el,'#li-type').value;
      const count = Math.max(1,Math.min(100,parseInt(q(el,'#li-count').value)||3));
      let result = '';
      if(type==='paragraphs') result=Array.from({length:count},()=>paragraph()).join('\n\n');
      else if(type==='sentences') result=Array.from({length:count},()=>sentence()).join(' ');
      else result=words.sort(()=>Math.random()-.5).slice(0,count).join(' ');
      q(el,'#li-out').textContent=result;
    });
    q(el,'#li-gen').click();
  }
},

/* 4 */ {
  id:'text-reverser', name:'Text Reverser', icon:'🔁', category:'text',
  description:'Reverse text character by character, word by word, or line by line.',
  tags:['reverse','text','flip','backwards','mirror'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section">
        <label class="tool-label">Input</label>
        <textarea class="tool-textarea" id="tr-in" placeholder="Enter text to reverse…"></textarea>
      </div>
      <div class="btn-group mb-2">
        <button class="cyber-btn" data-mode="chars">Reverse Characters</button>
        <button class="cyber-btn" data-mode="words">Reverse Words</button>
        <button class="cyber-btn" data-mode="lines">Reverse Lines</button>
      </div>
      ${outputBlock('tr-out','Result')}`;
    q(el,'.btn-group').addEventListener('click', e => {
      const m = e.target.dataset.mode; if(!m) return;
      const t = q(el,'#tr-in').value;
      let r = '';
      if(m==='chars') r=t.split('').reverse().join('');
      else if(m==='words') r=t.split(/\s+/).reverse().join(' ');
      else r=t.split('\n').reverse().join('\n');
      q(el,'#tr-out').textContent=r;
    });
  }
},

/* 5 */ {
  id:'text-diff', name:'Text Diff Checker', icon:'↔️', category:'text',
  description:'Compare two blocks of text and highlight the differences line by line.',
  tags:['diff','compare','text','difference','compare','similarity'],
  setup(el) {
    el.innerHTML = `
      <div class="grid-2 mb-2">
        <div class="tool-section">
          <label class="tool-label">Original Text</label>
          <textarea class="tool-textarea" id="diff-a" placeholder="Original text…" style="min-height:140px"></textarea>
        </div>
        <div class="tool-section">
          <label class="tool-label">Modified Text</label>
          <textarea class="tool-textarea" id="diff-b" placeholder="Modified text…" style="min-height:140px"></textarea>
        </div>
      </div>
      <div class="btn-group mb-2"><button class="cyber-btn" id="diff-run">Compare →</button></div>
      <div class="tool-section"><label class="tool-label">Differences</label>
        <div id="diff-out" style="background:var(--bg-output);border:1px solid var(--border);border-radius:var(--r-md);padding:14px;font-family:var(--font-mono);font-size:.84rem;line-height:1.8;max-height:320px;overflow-y:auto;min-height:60px"></div>
      </div>`;
    q(el,'#diff-run').addEventListener('click', () => {
      const a = q(el,'#diff-a').value.split('\n');
      const b = q(el,'#diff-b').value.split('\n');
      const maxLen = Math.max(a.length, b.length);
      let html = '';
      for(let i=0;i<maxLen;i++){
        if(a[i]===b[i]) html+=`<div style="color:var(--text-secondary);padding:2px 0">&nbsp;&nbsp;${escapeHTML(a[i]??'')}</div>`;
        else {
          if(a[i]!==undefined) html+=`<div style="color:#f87171;background:rgba(239,68,68,.08);padding:2px 6px;border-radius:4px">- ${escapeHTML(a[i])}</div>`;
          if(b[i]!==undefined) html+=`<div style="color:#6ee7b7;background:rgba(16,185,129,.08);padding:2px 6px;border-radius:4px">+ ${escapeHTML(b[i])}</div>`;
        }
      }
      q(el,'#diff-out').innerHTML = html || '<span style="color:var(--text-muted)">No differences found — texts are identical.</span>';
    });
  }
},

/* 6 */ {
  id:'dupe-remover', name:'Duplicate Line Remover', icon:'🧹', category:'text',
  description:'Remove duplicate lines from text. Optionally sort and trim whitespace.',
  tags:['duplicate','remove','lines','unique','clean','dedupe'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Input (one item per line)</label>
        <textarea class="tool-textarea" id="dr-in" placeholder="Line 1\nLine 2\nLine 1 (duplicate)…" style="min-height:130px"></textarea>
      </div>
      <div class="flex-gap mb-2">
        <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:.9rem;color:var(--text-secondary)">
          <input type="checkbox" id="dr-sort"> Sort alphabetically
        </label>
        <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:.9rem;color:var(--text-secondary)">
          <input type="checkbox" id="dr-trim" checked> Trim whitespace
        </label>
        <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:.9rem;color:var(--text-secondary)">
          <input type="checkbox" id="dr-empty"> Remove empty lines
        </label>
      </div>
      <button class="cyber-btn" id="dr-run">Remove Duplicates</button>
      ${outputBlock('dr-out','Result')}`;
    q(el,'#dr-run').addEventListener('click', () => {
      let lines = q(el,'#dr-in').value.split('\n');
      if(q(el,'#dr-trim').checked) lines=lines.map(l=>l.trim());
      if(q(el,'#dr-empty').checked) lines=lines.filter(Boolean);
      const unique=[...new Set(lines)];
      const result=q(el,'#dr-sort').checked?[...unique].sort():unique;
      q(el,'#dr-out').textContent=result.join('\n');
    });
  }
},

/* 7 */ {
  id:'line-sorter', name:'Line Sorter', icon:'📋', category:'text',
  description:'Sort lines of text alphabetically, by length, numerically, or randomly.',
  tags:['sort','lines','alphabetical','order','text'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Input Lines</label>
        <textarea class="tool-textarea" id="ls-in" placeholder="Enter lines to sort…" style="min-height:130px"></textarea>
      </div>
      <div class="btn-group mb-2">
        ${['A→Z','Z→A','Shortest','Longest','Numeric ↑','Numeric ↓','Random'].map(m=>
          `<button class="cyber-btn" data-mode="${m}">${m}</button>`).join('')}
      </div>
      ${outputBlock('ls-out','Sorted Lines')}`;
    q(el,'.btn-group').addEventListener('click', e=>{
      const m=e.target.dataset.mode; if(!m) return;
      let lines=q(el,'#ls-in').value.split('\n');
      if(m==='A→Z') lines.sort((a,b)=>a.localeCompare(b));
      else if(m==='Z→A') lines.sort((a,b)=>b.localeCompare(a));
      else if(m==='Shortest') lines.sort((a,b)=>a.length-b.length);
      else if(m==='Longest') lines.sort((a,b)=>b.length-a.length);
      else if(m==='Numeric ↑') lines.sort((a,b)=>parseFloat(a)-parseFloat(b));
      else if(m==='Numeric ↓') lines.sort((a,b)=>parseFloat(b)-parseFloat(a));
      else lines.sort(()=>Math.random()-.5);
      q(el,'#ls-out').textContent=lines.join('\n');
    });
  }
},

/* 8 */ {
  id:'find-replace', name:'Find & Replace', icon:'🔎', category:'text',
  description:'Find and replace text with optional case-sensitivity and regex support.',
  tags:['find','replace','search','regex','text'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Text</label>
        <textarea class="tool-textarea" id="fr-text" placeholder="Paste your text here…" style="min-height:130px"></textarea>
      </div>
      <div class="grid-2">
        <div class="tool-section"><label class="tool-label">Find</label><input class="tool-input" id="fr-find" placeholder="Search term…"></div>
        <div class="tool-section"><label class="tool-label">Replace with</label><input class="tool-input" id="fr-rep" placeholder="Replacement…"></div>
      </div>
      <div class="flex-gap mb-2">
        <label style="display:flex;align-items:center;gap:6px;cursor:pointer;color:var(--text-secondary);font-size:.9rem"><input type="checkbox" id="fr-case"> Case sensitive</label>
        <label style="display:flex;align-items:center;gap:6px;cursor:pointer;color:var(--text-secondary);font-size:.9rem"><input type="checkbox" id="fr-regex"> Regex</label>
      </div>
      <button class="cyber-btn" id="fr-run">Replace All</button>
      <div id="fr-info" class="alert alert-info" style="display:none"></div>
      ${outputBlock('fr-out','Result')}`;
    q(el,'#fr-run').addEventListener('click', ()=>{
      const text=q(el,'#fr-text').value, find=q(el,'#fr-find').value, rep=q(el,'#fr-rep').value;
      if(!find){q(el,'#fr-info').textContent='Enter a search term.';q(el,'#fr-info').style.display='block';return;}
      try {
        const flags='g'+(q(el,'#fr-case').checked?'':'i');
        const rx=q(el,'#fr-regex').checked?new RegExp(find,flags):new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),flags);
        let count=0;
        const result=text.replace(rx,m=>{count++;return rep;});
        q(el,'#fr-out').textContent=result;
        q(el,'#fr-info').textContent=`Replaced ${count} occurrence(s).`;
        q(el,'#fr-info').className='alert alert-success';
        q(el,'#fr-info').style.display='block';
      } catch(e){q(el,'#fr-info').textContent='Invalid regex: '+e.message;q(el,'#fr-info').className='alert alert-error';q(el,'#fr-info').style.display='block';}
    });
  }
},

/* 9 */ {
  id:'whitespace-trimmer', name:'Whitespace Trimmer', icon:'✂️', category:'text',
  description:'Remove leading/trailing spaces, extra spaces, blank lines, and normalize whitespace.',
  tags:['whitespace','trim','spaces','clean','normalize'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Input</label>
        <textarea class="tool-textarea" id="ws-in" placeholder="Paste text with whitespace issues…" style="min-height:130px"></textarea>
      </div>
      <div class="btn-group mb-2">
        ${['Trim Lines','Remove Extra Spaces','Remove All Spaces','Remove Blank Lines','Normalize All'].map(m=>
          `<button class="cyber-btn" data-mode="${m}">${m}</button>`).join('')}
      </div>
      ${outputBlock('ws-out','Cleaned Text')}`;
    q(el,'.btn-group').addEventListener('click',e=>{
      const m=e.target.dataset.mode; if(!m) return;
      let t=q(el,'#ws-in').value;
      if(m==='Trim Lines') t=t.split('\n').map(l=>l.trim()).join('\n');
      else if(m==='Remove Extra Spaces') t=t.replace(/ {2,}/g,' ').trim();
      else if(m==='Remove All Spaces') t=t.replace(/\s/g,'');
      else if(m==='Remove Blank Lines') t=t.split('\n').filter(l=>l.trim()).join('\n');
      else t=t.split('\n').map(l=>l.trim()).filter(l=>l).join('\n').replace(/ {2,}/g,' ');
      q(el,'#ws-out').textContent=t;
    });
  }
},

/* 10 */ {
  id:'palindrome-checker', name:'Palindrome Checker', icon:'🔃', category:'text',
  description:'Check if a word or phrase is a palindrome (reads the same forwards and backwards).',
  tags:['palindrome','check','word','reverse'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Enter word or phrase</label>
        <input class="tool-input" id="pal-in" placeholder="racecar, A man a plan a canal Panama…">
      </div>
      <button class="cyber-btn" id="pal-check">Check</button>
      <div id="pal-result"></div>`;
    q(el,'#pal-check').addEventListener('click',()=>{
      const t=q(el,'#pal-in').value;
      const clean=t.toLowerCase().replace(/[^a-z0-9]/g,'');
      const rev=[...clean].reverse().join('');
      const is=clean===rev;
      q(el,'#pal-result').innerHTML=`<div class="alert ${is?'alert-success':'alert-error'}">${is?'✅ Yes!':'❌ No.'} <strong>"${escapeHTML(t)}"</strong> ${is?'IS':'is NOT'} a palindrome.<br><small>Cleaned: "${escapeHTML(clean)}" → Reversed: "${escapeHTML(rev)}"</small></div>`;
    });
    q(el,'#pal-in').addEventListener('keydown',e=>{if(e.key==='Enter')q(el,'#pal-check').click();});
  }
},

/* 11 */ {
  id:'reading-time', name:'Reading Time Estimator', icon:'⏱️', category:'text',
  description:'Estimate how long it takes to read your text based on reading speed (WPM).',
  tags:['reading','time','wpm','estimate','text'],
  setup(el) {
    el.innerHTML = `
      <div class="grid-2">
        <div class="tool-section" style="grid-column:1/-1"><label class="tool-label">Paste your article / text</label>
          <textarea class="tool-textarea" id="rt-in" placeholder="Paste your article here…" style="min-height:150px"></textarea>
        </div>
        <div class="tool-section"><label class="tool-label">Reading Speed (WPM) <span id="rt-wpm-val">200</span></label>
          <input type="range" class="tool-range" id="rt-wpm" min="100" max="600" value="200">
        </div>
        <div class="tool-section" style="display:flex;flex-direction:column;gap:8px">
          <label class="tool-label">Estimates</label>
          <div class="stat-card"><div class="stat-card-num" id="rt-time">0 sec</div><div class="stat-card-label">Reading Time</div></div>
        </div>
      </div>
      <div class="stats-grid mt-2">
        <div class="stat-card"><div class="stat-card-num" id="rt-words">0</div><div class="stat-card-label">Words</div></div>
        <div class="stat-card"><div class="stat-card-num" id="rt-chars">0</div><div class="stat-card-label">Characters</div></div>
        <div class="stat-card"><div class="stat-card-num" id="rt-sents">0</div><div class="stat-card-label">Sentences</div></div>
      </div>`;
    function update(){
      const t=q(el,'#rt-in').value, wpm=parseInt(q(el,'#rt-wpm').value);
      q(el,'#rt-wpm-val').textContent=wpm;
      const words=t.trim()?t.trim().split(/\s+/).length:0;
      const secs=Math.ceil((words/wpm)*60);
      const mins=Math.floor(secs/60), s=secs%60;
      q(el,'#rt-time').textContent=mins>0?`${mins}m ${s}s`:`${secs}s`;
      q(el,'#rt-words').textContent=words;
      q(el,'#rt-chars').textContent=t.length;
      q(el,'#rt-sents').textContent=(t.match(/[.!?]+/g)||[]).length;
    }
    q(el,'#rt-in').addEventListener('input',update);
    q(el,'#rt-wpm').addEventListener('input',update);
  }
},

/* 12 */ {
  id:'slug-generator', name:'Slug Generator', icon:'🔗', category:'text',
  description:'Generate URL-friendly slugs from any text. Handles special characters and spaces.',
  tags:['slug','url','seo','permalink','text'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Text</label>
        <input class="tool-input" id="sg-in" placeholder="My Blog Post Title Here!" id="sg-in">
      </div>
      <div class="flex-gap mb-2">
        <div class="tool-section w-auto"><label class="tool-label">Separator</label>
          <select class="tool-select" id="sg-sep" style="width:120px">
            <option value="-">Hyphen (-)</option><option value="_">Underscore (_)</option><option value=".">Dot (.)</option>
          </select>
        </div>
        <div class="tool-section" style="align-self:flex-end">
          <label style="display:flex;align-items:center;gap:6px;cursor:pointer;color:var(--text-secondary);font-size:.9rem"><input type="checkbox" id="sg-lower" checked> Lowercase</label>
        </div>
      </div>
      ${outputBlock('sg-out','Generated Slug')}`;
    function gen(){
      const t=q(el,'#sg-in').value, sep=q(el,'#sg-sep').value, lower=q(el,'#sg-lower').checked;
      let slug=t.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9\s-]/g,'').trim().replace(/\s+/g,sep).replace(/-{2,}/g,sep);
      if(lower)slug=slug.toLowerCase();
      q(el,'#sg-out').textContent=slug;
    }
    ['#sg-in','#sg-sep','#sg-lower'].forEach(s=>q(el,s)?.addEventListener('input',gen));
    ['#sg-sep','#sg-lower'].forEach(s=>q(el,s)?.addEventListener('change',gen));
  }
},

/* 13 */ {
  id:'morse-translator', name:'Morse Code Translator', icon:'📡', category:'text',
  description:'Translate text to Morse code and Morse code back to text.',
  tags:['morse','code','translate','dots','dashes','cipher'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-tabs">
        <button class="tool-tab active" data-tab="encode">Text → Morse</button>
        <button class="tool-tab" data-tab="decode">Morse → Text</button>
      </div>
      <div class="tab-pane active" id="mc-encode">
        <div class="tool-section"><label class="tool-label">Text</label>
          <textarea class="tool-textarea" id="mc-text" placeholder="Hello World"></textarea>
        </div>
        <button class="cyber-btn" id="mc-enc-btn">Encode to Morse</button>
        ${outputBlock('mc-enc-out','Morse Code')}
      </div>
      <div class="tab-pane" id="mc-decode">
        <div class="tool-section"><label class="tool-label">Morse Code (separate letters with space, words with /)</label>
          <textarea class="tool-textarea" id="mc-morse" placeholder=".... . .-.. .-.. --- / .-- --- .-. .-.. -.."></textarea>
        </div>
        <button class="cyber-btn" id="mc-dec-btn">Decode to Text</button>
        ${outputBlock('mc-dec-out','Decoded Text')}
      </div>`;
    qa(el,'.tool-tab').forEach(t=>t.addEventListener('click',()=>{
      qa(el,'.tool-tab').forEach(x=>x.classList.remove('active'));
      qa(el,'.tab-pane').forEach(x=>x.classList.remove('active'));
      t.classList.add('active');
      q(el,`#mc-${t.dataset.tab}`).classList.add('active');
    }));
    q(el,'#mc-enc-btn').addEventListener('click',()=>{
      const t=q(el,'#mc-text').value.toUpperCase();
      const morse=t.split('').map(c=>c===' '?'/':MORSE_ENC[c]||'?').join(' ');
      q(el,'#mc-enc-out').textContent=morse;
    });
    q(el,'#mc-dec-btn').addEventListener('click',()=>{
      const morse=q(el,'#mc-morse').value.trim();
      const text=morse.split(' / ').map(word=>word.split(' ').map(code=>MORSE_DEC[code]||'?').join('')).join(' ');
      q(el,'#mc-dec-out').textContent=text;
    });
  }
},

/* 14 */ {
  id:'binary-text', name:'Binary Text Converter', icon:'💾', category:'text',
  description:'Convert text to binary code and binary back to readable text.',
  tags:['binary','text','convert','bits','0','1','ascii'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-tabs">
        <button class="tool-tab active" data-tab="bt-enc">Text → Binary</button>
        <button class="tool-tab" data-tab="bt-dec">Binary → Text</button>
      </div>
      <div class="tab-pane active" id="bt-enc">
        <div class="tool-section"><textarea class="tool-textarea" id="bt-text" placeholder="Hello"></textarea></div>
        <button class="cyber-btn" id="bt-enc-btn">Convert</button>
        ${outputBlock('bt-enc-out','Binary')}
      </div>
      <div class="tab-pane" id="bt-dec">
        <div class="tool-section"><textarea class="tool-textarea" id="bt-bin" placeholder="01001000 01100101 01101100 01101100 01101111"></textarea></div>
        <button class="cyber-btn" id="bt-dec-btn">Convert</button>
        ${outputBlock('bt-dec-out','Text')}
      </div>`;
    qa(el,'.tool-tab').forEach(t=>t.addEventListener('click',()=>{
      qa(el,'.tool-tab').forEach(x=>x.classList.remove('active'));
      qa(el,'.tab-pane').forEach(x=>x.classList.remove('active'));
      t.classList.add('active');q(el,`#${t.dataset.tab}`).classList.add('active');
    }));
    q(el,'#bt-enc-btn').addEventListener('click',()=>{
      const bin=q(el,'#bt-text').value.split('').map(c=>c.charCodeAt(0).toString(2).padStart(8,'0')).join(' ');
      q(el,'#bt-enc-out').textContent=bin;
    });
    q(el,'#bt-dec-btn').addEventListener('click',()=>{
      const text=q(el,'#bt-bin').value.trim().split(/\s+/).map(b=>{const n=parseInt(b,2);return isNaN(n)?'?':String.fromCharCode(n);}).join('');
      q(el,'#bt-dec-out').textContent=text;
    });
  }
},

/* 15 */ {
  id:'text-statistics', name:'Text Statistics', icon:'📈', category:'text',
  description:'Deep analysis: letter frequency, most common words, average sentence length, and more.',
  tags:['statistics','analysis','frequency','words','text','analytics'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><textarea class="tool-textarea" id="ts-in" placeholder="Paste your text for analysis…" style="min-height:140px"></textarea></div>
      <button class="cyber-btn" id="ts-run">Analyze</button>
      <div id="ts-out"></div>`;
    q(el,'#ts-run').addEventListener('click',()=>{
      const t=q(el,'#ts-in').value;
      if(!t.trim()){q(el,'#ts-out').innerHTML='<div class="alert alert-info">Please enter some text.</div>';return;}
      const words=t.trim().split(/\s+/).filter(Boolean);
      const sentences=(t.match(/[.!?]+/g)||[]).length;
      const chars=t.length, charsNS=t.replace(/\s/g,'').length;
      const freq={};words.forEach(w=>{const k=w.toLowerCase().replace(/[^a-z]/g,'');if(k)freq[k]=(freq[k]||0)+1;});
      const topWords=Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,10);
      const letterFreq={};[...t.toLowerCase()].forEach(c=>{if(c>='a'&&c<='z')letterFreq[c]=(letterFreq[c]||0)+1;});
      const topLetters=Object.entries(letterFreq).sort((a,b)=>b[1]-a[1]).slice(0,10);
      q(el,'#ts-out').innerHTML=`
        <div class="stats-grid">
          <div class="stat-card"><div class="stat-card-num">${words.length}</div><div class="stat-card-label">Words</div></div>
          <div class="stat-card"><div class="stat-card-num">${chars}</div><div class="stat-card-label">Characters</div></div>
          <div class="stat-card"><div class="stat-card-num">${charsNS}</div><div class="stat-card-label">No Spaces</div></div>
          <div class="stat-card"><div class="stat-card-num">${sentences}</div><div class="stat-card-label">Sentences</div></div>
          <div class="stat-card"><div class="stat-card-num">${sentences>0?(words.length/sentences).toFixed(1):0}</div><div class="stat-card-label">Words/Sentence</div></div>
          <div class="stat-card"><div class="stat-card-num">${words.length>0?(charsNS/words.length).toFixed(1):0}</div><div class="stat-card-label">Avg Word Len</div></div>
          <div class="stat-card"><div class="stat-card-num">${Object.keys(freq).length}</div><div class="stat-card-label">Unique Words</div></div>
          <div class="stat-card"><div class="stat-card-num">${Math.ceil(words.length/200)}</div><div class="stat-card-label">Read Min</div></div>
        </div>
        <div class="grid-2 mt-2">
          <div class="tool-section"><label class="tool-label">Top 10 Words</label>
            ${topWords.map(([w,c])=>`<div style="display:flex;justify-content:space-between;padding:5px 8px;border-radius:4px;font-size:.85rem"><span style="color:var(--text-primary)">${escapeHTML(w)}</span><span style="color:var(--purple-light)">${c}</span></div>`).join('')}
          </div>
          <div class="tool-section"><label class="tool-label">Top 10 Letters</label>
            ${topLetters.map(([l,c])=>`<div style="display:flex;justify-content:space-between;padding:5px 8px;border-radius:4px;font-size:.85rem"><span style="color:var(--text-primary)">${l}</span><span style="color:var(--cyan)">${c}</span></div>`).join('')}
          </div>
        </div>`;
    });
  }
},

/* 16 */ {
  id:'markdown-preview', name:'Markdown Preview', icon:'📝', category:'text',
  description:'Write Markdown and see a live rendered preview side by side.',
  tags:['markdown','preview','render','html','md','writing'],
  setup(el) {
    el.innerHTML = `
      <div class="grid-2" style="gap:12px;height:360px">
        <div style="display:flex;flex-direction:column;gap:6px;height:100%">
          <label class="tool-label">Markdown</label>
          <textarea class="tool-textarea" id="md-in" style="flex:1;resize:none;height:100%" placeholder="# Hello World\n\nType **markdown** here…"></textarea>
        </div>
        <div style="display:flex;flex-direction:column;gap:6px;height:100%">
          <label class="tool-label">Preview</label>
          <div id="md-out" style="flex:1;background:var(--bg-output);border:1px solid var(--border);border-radius:var(--r-md);padding:14px;overflow-y:auto;font-size:.9rem;line-height:1.7;color:var(--text-primary)"></div>
        </div>
      </div>`;
    const style=document.createElement('style');
    style.textContent='#md-out h1,#md-out h2,#md-out h3{font-family:var(--font-head);margin:.6em 0 .3em;color:var(--text-primary)}#md-out h1{font-size:1.6em}#md-out h2{font-size:1.3em}#md-out h3{font-size:1.1em}#md-out p{margin:.4em 0}#md-out code{background:rgba(124,58,237,.15);padding:2px 6px;border-radius:4px;font-family:var(--font-mono);font-size:.85em}#md-out a{color:var(--cyan)}#md-out blockquote{border-left:3px solid var(--purple);padding-left:12px;color:var(--text-secondary)}#md-out hr{border:none;border-top:1px solid var(--border);margin:.8em 0}#md-out ul,#md-out ol{padding-left:1.5em}#md-out strong{color:var(--text-primary)}';
    el.appendChild(style);
    function render(){ q(el,'#md-out').innerHTML=mdToHtml(q(el,'#md-in').value); }
    q(el,'#md-in').addEventListener('input',render);
    q(el,'#md-in').value='# Welcome to Markdown Preview\n\nType **bold**, *italic*, `code`, and more!\n\n## Features\n- Live preview\n- Syntax support\n- Copy output\n\n> This is a blockquote\n\n---\n\n[Visit Google](https://google.com)';
    render();
  }
},

/* 17 */ {
  id:'anagram-checker', name:'Anagram Checker', icon:'🔤', category:'text',
  description:'Check if two words or phrases are anagrams of each other.',
  tags:['anagram','letters','words','scramble','rearrange'],
  setup(el) {
    el.innerHTML = `
      <div class="grid-2">
        <div class="tool-section"><label class="tool-label">Word / Phrase 1</label><input class="tool-input" id="ag-a" placeholder="listen"></div>
        <div class="tool-section"><label class="tool-label">Word / Phrase 2</label><input class="tool-input" id="ag-b" placeholder="silent"></div>
      </div>
      <button class="cyber-btn" id="ag-check">Check Anagram</button>
      <div id="ag-result"></div>`;
    q(el,'#ag-check').addEventListener('click',()=>{
      const a=q(el,'#ag-a').value.toLowerCase().replace(/[^a-z]/g,'').split('').sort().join('');
      const b=q(el,'#ag-b').value.toLowerCase().replace(/[^a-z]/g,'').split('').sort().join('');
      const is=a&&b&&a===b;
      q(el,'#ag-result').innerHTML=`<div class="alert ${is?'alert-success':'alert-error'}">${is?'✅ YES — they ARE anagrams!':'❌ NO — they are NOT anagrams.'}</div>`;
    });
    [q(el,'#ag-a'),q(el,'#ag-b')].forEach(i=>i.addEventListener('keydown',e=>{if(e.key==='Enter')q(el,'#ag-check').click();}));
  }
},

/* 18 */ {
  id:'text-truncator', name:'Text Truncator', icon:'✂️', category:'text',
  description:'Truncate text at a specific character or word count and add a custom suffix.',
  tags:['truncate','shorten','cut','text','limit','chars','words'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Input Text</label>
        <textarea class="tool-textarea" id="tt-in" placeholder="Enter long text here…" style="min-height:120px"></textarea>
      </div>
      <div class="grid-2">
        <div class="tool-section"><label class="tool-label">Limit</label><input class="tool-input" type="number" id="tt-lim" value="100" min="1"></div>
        <div class="tool-section"><label class="tool-label">Unit</label>
          <select class="tool-select" id="tt-unit"><option value="chars">Characters</option><option value="words">Words</option></select>
        </div>
      </div>
      <div class="tool-section"><label class="tool-label">Suffix</label><input class="tool-input" id="tt-suffix" value="…"></div>
      <button class="cyber-btn" id="tt-run">Truncate</button>
      ${outputBlock('tt-out','Truncated Text')}`;
    q(el,'#tt-run').addEventListener('click',()=>{
      const t=q(el,'#tt-in').value, lim=parseInt(q(el,'#tt-lim').value)||100, unit=q(el,'#tt-unit').value, sfx=q(el,'#tt-suffix').value;
      let result='';
      if(unit==='chars'){result=t.length<=lim?t:t.slice(0,lim)+sfx;}
      else{const words=t.split(/\s+/);result=words.length<=lim?t:words.slice(0,lim).join(' ')+sfx;}
      q(el,'#tt-out').textContent=result;
    });
  }
},

/* 19 */ {
  id:'text-to-speech', name:'Text to Speech', icon:'🔊', category:'text',
  description:'Convert text to speech using your browser\'s built-in TTS engine.',
  tags:['text','speech','tts','voice','speak','audio','read'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Text to Speak</label>
        <textarea class="tool-textarea" id="tts-in" placeholder="Enter text to be spoken…" style="min-height:130px">Hello! Welcome to AllTools, your ultimate online toolbox.</textarea>
      </div>
      <div class="grid-3">
        <div class="tool-section"><label class="tool-label">Voice</label>
          <select class="tool-select" id="tts-voice"></select>
        </div>
        <div class="tool-section"><label class="tool-label">Speed <span id="tts-rate-val">1.0</span>x</label>
          <input type="range" class="tool-range" id="tts-rate" min="0.5" max="2" step="0.1" value="1">
        </div>
        <div class="tool-section"><label class="tool-label">Pitch <span id="tts-pitch-val">1.0</span></label>
          <input type="range" class="tool-range" id="tts-pitch" min="0" max="2" step="0.1" value="1">
        </div>
      </div>
      <div class="btn-group">
        <button class="cyber-btn" id="tts-play">▶ Speak</button>
        <button class="cyber-btn" id="tts-stop">■ Stop</button>
        <button class="cyber-btn" id="tts-pause">⏸ Pause</button>
      </div>`;
    if(!window.speechSynthesis){el.innerHTML='<div class="alert alert-error">Speech Synthesis is not supported in your browser.</div>';return;}
    const syn=window.speechSynthesis;
    function loadVoices(){const voices=syn.getVoices();const sel=q(el,'#tts-voice');sel.innerHTML=voices.map((v,i)=>`<option value="${i}">${v.name} (${v.lang})</option>`).join('');}
    loadVoices(); syn.onvoiceschanged=loadVoices;
    q(el,'#tts-rate').addEventListener('input',e=>q(el,'#tts-rate-val').textContent=parseFloat(e.target.value).toFixed(1));
    q(el,'#tts-pitch').addEventListener('input',e=>q(el,'#tts-pitch-val').textContent=parseFloat(e.target.value).toFixed(1));
    q(el,'#tts-play').addEventListener('click',()=>{
      syn.cancel();
      const utt=new SpeechSynthesisUtterance(q(el,'#tts-in').value);
      const voices=syn.getVoices();
      utt.voice=voices[parseInt(q(el,'#tts-voice').value)||0];
      utt.rate=parseFloat(q(el,'#tts-rate').value);
      utt.pitch=parseFloat(q(el,'#tts-pitch').value);
      syn.speak(utt);
    });
    q(el,'#tts-stop').addEventListener('click',()=>syn.cancel());
    q(el,'#tts-pause').addEventListener('click',()=>syn.speaking&&!syn.paused?syn.pause():syn.resume());
  }
},

/* 20 */ {
  id:'url-encode-decode', name:'URL Encode / Decode', icon:'🔗', category:'text',
  description:'Encode or decode URL components. Handle special characters for safe URL usage.',
  tags:['url','encode','decode','percent','escape','uri'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Input</label>
        <textarea class="tool-textarea" id="ued-in" placeholder="https://example.com/search?q=hello world&lang=en"></textarea>
      </div>
      <div class="btn-group mb-2">
        <button class="cyber-btn" id="ued-enc">Encode</button>
        <button class="cyber-btn" id="ued-dec">Decode</button>
        <button class="cyber-btn" id="ued-full">Full Encode (encodeURI)</button>
      </div>
      ${outputBlock('ued-out','Result')}`;
    q(el,'#ued-enc').addEventListener('click',()=>{ try{q(el,'#ued-out').textContent=encodeURIComponent(q(el,'#ued-in').value);}catch(e){q(el,'#ued-out').textContent='Error: '+e.message;} });
    q(el,'#ued-dec').addEventListener('click',()=>{ try{q(el,'#ued-out').textContent=decodeURIComponent(q(el,'#ued-in').value);}catch(e){q(el,'#ued-out').textContent='Error: '+e.message;} });
    q(el,'#ued-full').addEventListener('click',()=>{ try{q(el,'#ued-out').textContent=encodeURI(q(el,'#ued-in').value);}catch(e){q(el,'#ued-out').textContent='Error: '+e.message;} });
  }
},

/* 21 */ {
  id:'random-word-gen', name:'Random Word Generator', icon:'🎲', category:'text',
  description:'Generate random words for brainstorming, creativity, games and writing prompts.',
  tags:['random','word','generate','brainstorm','creative'],
  setup(el) {
    const WORDS=['apple','brave','cosmic','dream','eagle','forest','galaxy','honor','island','jungle','karma','lunar','mystic','noble','ocean','prism','quest','river','solar','thunder','ultra','vivid','wonder','xenon','yellow','zenith','arctic','blazing','crystal','dazzle','eclipse','flame','gravity','horizon','infinite','journey','kinetic','legend','mirror','nebula','orbit','phoenix','quantum','radiant','spectrum','twilight','unity','vortex','wisdom','xray','yarn','zero'];
    el.innerHTML = `
      <div class="flex-gap mb-2">
        <div class="tool-section"><label class="tool-label">Count</label><input class="tool-input" type="number" id="rw-count" value="10" min="1" max="100"></div>
        <div class="tool-section" style="align-self:flex-end"><button class="cyber-btn" id="rw-gen">Generate Words</button></div>
      </div>
      ${outputBlock('rw-out','Random Words')}`;
    q(el,'#rw-gen').addEventListener('click',()=>{
      const n=Math.min(100,parseInt(q(el,'#rw-count').value)||10);
      const result=Array.from({length:n},()=>WORDS[Math.floor(Math.random()*WORDS.length)]);
      q(el,'#rw-out').textContent=result.join(', ');
    });
    q(el,'#rw-gen').click();
  }
},

/* 22 */ {
  id:'html-stripper', name:'HTML Tag Remover', icon:'🧽', category:'text',
  description:'Remove all HTML tags from text and extract only the plain text content.',
  tags:['html','strip','remove','tags','clean','plain text'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">HTML Input</label>
        <textarea class="tool-textarea" id="hs-in" placeholder="<p>Hello <strong>World</strong>!</p>" style="min-height:120px"></textarea>
      </div>
      <button class="cyber-btn" id="hs-run">Strip HTML Tags</button>
      ${outputBlock('hs-out','Plain Text')}`;
    q(el,'#hs-run').addEventListener('click',()=>{ q(el,'#hs-out').textContent=stripHTML(q(el,'#hs-in').value); });
  }
}

); // end TEXT TOOLS push

/* ================================================================
   DEVELOPER TOOLS (22)
   ================================================================ */

TOOLS.push(

/* 23 */ {
  id:'json-formatter', name:'JSON Formatter', icon:'{ }', category:'developer',
  description:'Format, beautify and validate JSON with syntax highlighting and error reporting.',
  tags:['json','format','beautify','validate','pretty print'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">JSON Input</label>
        <textarea class="tool-textarea" id="jf-in" style="min-height:150px" placeholder='{"name":"AllTools","tools":135}'></textarea>
      </div>
      <div class="btn-group mb-2">
        <button class="cyber-btn" id="jf-fmt">Format</button>
        <button class="cyber-btn" id="jf-min">Minify</button>
        <button class="cyber-btn" id="jf-val">Validate</button>
        <select class="tool-select w-auto" id="jf-ind" style="width:120px">
          <option value="2">2 spaces</option><option value="4">4 spaces</option><option value="1">1 space</option>
        </select>
      </div>
      <div id="jf-msg"></div>
      ${outputBlock('jf-out','Formatted JSON')}`;
    function parse(){
      try{return{ok:true,data:JSON.parse(q(el,'#jf-in').value)};}
      catch(e){return{ok:false,err:e.message};}
    }
    q(el,'#jf-fmt').addEventListener('click',()=>{
      const r=parse();
      if(!r.ok){q(el,'#jf-msg').innerHTML=`<div class="alert alert-error">❌ ${escapeHTML(r.err)}</div>`;q(el,'#jf-out').textContent='';return;}
      q(el,'#jf-msg').innerHTML='<div class="alert alert-success">✅ Valid JSON</div>';
      q(el,'#jf-out').textContent=JSON.stringify(r.data,null,parseInt(q(el,'#jf-ind').value));
    });
    q(el,'#jf-min').addEventListener('click',()=>{
      const r=parse();
      if(!r.ok){q(el,'#jf-msg').innerHTML=`<div class="alert alert-error">❌ ${escapeHTML(r.err)}</div>`;return;}
      q(el,'#jf-msg').innerHTML='';q(el,'#jf-out').textContent=JSON.stringify(r.data);
    });
    q(el,'#jf-val').addEventListener('click',()=>{
      const r=parse();
      q(el,'#jf-msg').innerHTML=r.ok?'<div class="alert alert-success">✅ Valid JSON!</div>':`<div class="alert alert-error">❌ Invalid JSON: ${escapeHTML(r.err)}</div>`;
    });
  }
},

/* 24 */ {
  id:'base64-tool', name:'Base64 Encoder / Decoder', icon:'🔐', category:'developer',
  description:'Encode text or files to Base64 and decode Base64 strings back to text.',
  tags:['base64','encode','decode','convert'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Input</label>
        <textarea class="tool-textarea" id="b64-in" placeholder="Enter text or Base64 string…"></textarea>
      </div>
      <div class="btn-group mb-2">
        <button class="cyber-btn" id="b64-enc">Encode to Base64</button>
        <button class="cyber-btn" id="b64-dec">Decode from Base64</button>
      </div>
      <div id="b64-msg"></div>
      ${outputBlock('b64-out','Result')}`;
    q(el,'#b64-enc').addEventListener('click',()=>{
      try{q(el,'#b64-out').textContent=btoa(unescape(encodeURIComponent(q(el,'#b64-in').value)));q(el,'#b64-msg').innerHTML='';}
      catch(e){q(el,'#b64-msg').innerHTML=`<div class="alert alert-error">Error: ${e.message}</div>`;}
    });
    q(el,'#b64-dec').addEventListener('click',()=>{
      try{q(el,'#b64-out').textContent=decodeURIComponent(escape(atob(q(el,'#b64-in').value)));q(el,'#b64-msg').innerHTML='';}
      catch(e){q(el,'#b64-msg').innerHTML=`<div class="alert alert-error">Error: ${e.message}</div>`;}
    });
  }
},

/* 25 */ {
  id:'html-encode-decode', name:'HTML Encoder / Decoder', icon:'🌐', category:'developer',
  description:'Encode special characters to HTML entities and decode HTML entities back to text.',
  tags:['html','encode','decode','entities','escape','unescape'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Input</label>
        <textarea class="tool-textarea" id="he-in" placeholder="<p>Hello & Goodbye!</p> or &lt;p&gt;Hello&lt;/p&gt;"></textarea>
      </div>
      <div class="btn-group mb-2">
        <button class="cyber-btn" id="he-enc">Encode → &amp;entities;</button>
        <button class="cyber-btn" id="he-dec">Decode ← &amp;entities;</button>
      </div>
      ${outputBlock('he-out','Result')}`;
    q(el,'#he-enc').addEventListener('click',()=>q(el,'#he-out').textContent=escapeHTML(q(el,'#he-in').value));
    q(el,'#he-dec').addEventListener('click',()=>q(el,'#he-out').textContent=unescapeHTML(q(el,'#he-in').value));
  }
},

/* 26 */ {
  id:'regex-tester', name:'Regex Tester', icon:'⚡', category:'developer',
  description:'Test regular expressions against text with real-time match highlighting and group capture.',
  tags:['regex','regexp','pattern','match','test','expression'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Pattern</label>
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-family:var(--font-mono);color:var(--purple-light);font-size:1.2rem">/</span>
          <input class="tool-input" id="rx-pat" placeholder="(\\w+)" style="flex:1">
          <span style="font-family:var(--font-mono);color:var(--purple-light);font-size:1.2rem">/</span>
          <input class="tool-input" id="rx-flags" placeholder="gi" style="width:60px">
        </div>
      </div>
      <div class="tool-section"><label class="tool-label">Test String</label>
        <textarea class="tool-textarea" id="rx-text" style="min-height:100px" placeholder="Enter test string here…">Hello World! The quick brown fox jumps over the lazy dog.</textarea>
      </div>
      <div id="rx-info" class="alert alert-info" style="display:none"></div>
      <div class="tool-section"><label class="tool-label">Matches</label>
        <div id="rx-matches" style="background:var(--bg-output);border:1px solid var(--border);border-radius:var(--r-md);padding:14px;min-height:60px;font-family:var(--font-mono);font-size:.85rem;max-height:250px;overflow-y:auto"></div>
      </div>`;
    function test(){
      const pat=q(el,'#rx-pat').value, flags=q(el,'#rx-flags').value||'g', text=q(el,'#rx-text').value;
      if(!pat){q(el,'#rx-info').style.display='none';q(el,'#rx-matches').textContent='';return;}
      try{
        const rx=new RegExp(pat,flags.includes('g')?flags:flags+'g');
        const matches=[...text.matchAll(rx)];
        q(el,'#rx-info').className='alert alert-success';
        q(el,'#rx-info').textContent=`✅ ${matches.length} match(es) found`;
        q(el,'#rx-info').style.display='block';
        if(matches.length===0){q(el,'#rx-matches').innerHTML='<span style="color:var(--text-muted)">No matches</span>';return;}
        q(el,'#rx-matches').innerHTML=matches.map((m,i)=>`<div style="margin-bottom:6px"><span style="color:var(--cyan)">[${i+1}]</span> <span style="color:var(--emerald)">"${escapeHTML(m[0])}"</span> at index ${m.index}${m.length>1?' — Groups: '+m.slice(1).map((g,j)=>`<span style="color:var(--yellow)">${j+1}:"${escapeHTML(g||'')}"</span>`).join(', '):''}</div>`).join('');
      }catch(e){q(el,'#rx-info').className='alert alert-error';q(el,'#rx-info').textContent='❌ Invalid regex: '+e.message;q(el,'#rx-info').style.display='block';q(el,'#rx-matches').innerHTML='';}
    }
    ['#rx-pat','#rx-flags','#rx-text'].forEach(s=>q(el,s).addEventListener('input',test));
    test();
  }
},

/* 27 */ {
  id:'json-to-csv', name:'JSON to CSV Converter', icon:'📊', category:'developer',
  description:'Convert a JSON array of objects to CSV format, ready to open in Excel or Google Sheets.',
  tags:['json','csv','convert','excel','table','data'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">JSON Array</label>
        <textarea class="tool-textarea" id="j2c-in" style="min-height:140px" placeholder='[{"name":"Alice","age":30},{"name":"Bob","age":25}]'></textarea>
      </div>
      <button class="cyber-btn" id="j2c-run">Convert to CSV</button>
      <div id="j2c-msg"></div>
      ${outputBlock('j2c-out','CSV Output')}`;
    q(el,'#j2c-run').addEventListener('click',()=>{
      try{
        const data=JSON.parse(q(el,'#j2c-in').value);
        if(!Array.isArray(data))throw new Error('Input must be a JSON array');
        if(data.length===0){q(el,'#j2c-out').textContent='';return;}
        const keys=Object.keys(data[0]);
        const csv=[keys.join(','),...data.map(row=>keys.map(k=>{const v=row[k]===null||row[k]===undefined?'':String(row[k]);return v.includes(',')||v.includes('"')?`"${v.replace(/"/g,'""')}"`:`${v}`;}).join(','))].join('\n');
        q(el,'#j2c-out').textContent=csv;q(el,'#j2c-msg').innerHTML='<div class="alert alert-success">✅ Converted successfully</div>';
      }catch(e){q(el,'#j2c-msg').innerHTML=`<div class="alert alert-error">❌ ${escapeHTML(e.message)}</div>`;}
    });
  }
},

/* 28 */ {
  id:'css-minifier', name:'CSS Minifier', icon:'💅', category:'developer',
  description:'Minify CSS by removing comments, whitespace, and unnecessary characters.',
  tags:['css','minify','compress','optimize','stylesheet'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">CSS Input</label>
        <textarea class="tool-textarea" id="cm-in" style="min-height:150px" placeholder="/* Comment */\nbody {\n  margin: 0;\n  padding: 0;\n}"></textarea>
      </div>
      <button class="cyber-btn" id="cm-run">Minify CSS</button>
      <div id="cm-info"></div>
      ${outputBlock('cm-out','Minified CSS')}`;
    q(el,'#cm-run').addEventListener('click',()=>{
      const inp=q(el,'#cm-in').value;
      const min=inp.replace(/\/\*[\s\S]*?\*\//g,'').replace(/\s{2,}/g,' ').replace(/\s*([:;,{}>~+])\s*/g,'$1').replace(/;\}/g,'}').trim();
      q(el,'#cm-out').textContent=min;
      const saved=inp.length-min.length, pct=inp.length?((saved/inp.length)*100).toFixed(1):0;
      q(el,'#cm-info').innerHTML=`<div class="alert alert-success">✅ Reduced by ${saved} chars (${pct}% savings)</div>`;
    });
  }
},

/* 29 */ {
  id:'html-minifier', name:'HTML Minifier', icon:'📄', category:'developer',
  description:'Minify HTML by removing whitespace, comments, and unnecessary characters.',
  tags:['html','minify','compress','optimize'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">HTML Input</label>
        <textarea class="tool-textarea" id="hm-in" style="min-height:150px" placeholder="<!-- comment -->\n<div class='box'>\n  <p>  Hello  </p>\n</div>"></textarea>
      </div>
      <button class="cyber-btn" id="hm-run">Minify HTML</button>
      <div id="hm-info"></div>
      ${outputBlock('hm-out','Minified HTML')}`;
    q(el,'#hm-run').addEventListener('click',()=>{
      const inp=q(el,'#hm-in').value;
      const min=inp.replace(/<!--[\s\S]*?-->/g,'').replace(/\s+/g,' ').replace(/>\s+</g,'><').trim();
      q(el,'#hm-out').textContent=min;
      const saved=inp.length-min.length,pct=inp.length?((saved/inp.length)*100).toFixed(1):0;
      q(el,'#hm-info').innerHTML=`<div class="alert alert-success">✅ Reduced by ${saved} chars (${pct}% savings)</div>`;
    });
  }
},

/* 30 */ {
  id:'jwt-decoder', name:'JWT Decoder', icon:'🎫', category:'developer',
  description:'Decode a JSON Web Token (JWT) and inspect the header, payload and signature.',
  tags:['jwt','token','decode','auth','json web token','bearer'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">JWT Token</label>
        <textarea class="tool-textarea" id="jwt-in" style="min-height:80px" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"></textarea>
      </div>
      <button class="cyber-btn" id="jwt-dec">Decode JWT</button>
      <div id="jwt-out"></div>`;
    q(el,'#jwt-dec').addEventListener('click',()=>{
      const token=q(el,'#jwt-in').value.trim();
      const parts=token.split('.');
      if(parts.length!==3){q(el,'#jwt-out').innerHTML='<div class="alert alert-error">❌ Invalid JWT — must have 3 parts separated by dots.</div>';return;}
      try{
        const b64Decode=b64=>JSON.parse(decodeURIComponent(escape(atob(b64.replace(/-/g,'+').replace(/_/g,'/')))));
        const header=b64Decode(parts[0]),payload=b64Decode(parts[1]);
        const exp=payload.exp?new Date(payload.exp*1000).toLocaleString():'N/A';
        const iat=payload.iat?new Date(payload.iat*1000).toLocaleString():'N/A';
        q(el,'#jwt-out').innerHTML=`
          <div class="tool-section"><label class="tool-label">Header</label><div class="tool-output" style="max-height:150px">${escapeHTML(JSON.stringify(header,null,2))}</div></div>
          <div class="tool-section"><label class="tool-label">Payload</label><div class="tool-output" style="max-height:200px">${escapeHTML(JSON.stringify(payload,null,2))}</div></div>
          <div class="alert alert-info">Issued: ${iat} · Expires: ${exp} · Algorithm: ${header.alg||'N/A'}</div>`;
      }catch(e){q(el,'#jwt-out').innerHTML=`<div class="alert alert-error">❌ ${escapeHTML(e.message)}</div>`;}
    });
  }
},

/* 31 */ {
  id:'timestamp-converter', name:'Timestamp Converter', icon:'🕐', category:'developer',
  description:'Convert between Unix timestamps (epoch seconds/ms) and human-readable dates.',
  tags:['timestamp','unix','epoch','date','convert','time'],
  setup(el) {
    el.innerHTML = `
      <div class="grid-2">
        <div>
          <div class="tool-section"><label class="tool-label">Unix Timestamp (seconds)</label><input class="tool-input" id="ts-unix" placeholder="e.g. 1720000000"></div>
          <button class="cyber-btn" id="ts-from-unix">→ Convert to Date</button>
          <div class="tool-output mt-2" id="ts-from-unix-out" style="min-height:40px"></div>
        </div>
        <div>
          <div class="tool-section"><label class="tool-label">Date &amp; Time</label><input class="tool-input" id="ts-date" type="datetime-local"></div>
          <button class="cyber-btn" id="ts-from-date">→ Convert to Unix</button>
          <div class="tool-output mt-2" id="ts-from-date-out" style="min-height:40px"></div>
        </div>
      </div>
      <hr class="divider">
      <div class="alert alert-info" id="ts-now">Current: Loading…</div>`;
    function updateNow(){
      const now=Date.now();
      q(el,'#ts-now').textContent=`Now: ${Math.floor(now/1000)} (seconds) · ${now} (ms) · ${new Date(now).toISOString()}`;
    }
    updateNow();const timer=setInterval(updateNow,1000);
    el.addEventListener('remove',()=>clearInterval(timer));
    q(el,'#ts-from-unix').addEventListener('click',()=>{
      const ts=parseInt(q(el,'#ts-unix').value);
      if(isNaN(ts)){q(el,'#ts-from-unix-out').textContent='Enter a valid timestamp';return;}
      const ms=ts<1e12?ts*1000:ts;
      const d=new Date(ms);
      q(el,'#ts-from-unix-out').textContent=`UTC: ${d.toUTCString()}\nLocal: ${d.toLocaleString()}\nISO: ${d.toISOString()}`;
    });
    q(el,'#ts-from-date').addEventListener('click',()=>{
      const val=q(el,'#ts-date').value;
      if(!val){q(el,'#ts-from-date-out').textContent='Select a date';return;}
      const ms=new Date(val).getTime();
      q(el,'#ts-from-date-out').textContent=`Seconds: ${Math.floor(ms/1000)}\nMilliseconds: ${ms}`;
    });
    const now=new Date();
    q(el,'#ts-date').value=now.toISOString().slice(0,16);
  }
},

/* 32 */ {
  id:'css-gradient-gen', name:'CSS Gradient Generator', icon:'🌈', category:'developer',
  description:'Build beautiful CSS gradients visually with color stops, angle, and type controls.',
  tags:['css','gradient','linear','radial','color','background'],
  setup(el) {
    el.innerHTML = `
      <div class="grid-2">
        <div>
          <div class="tool-section"><label class="tool-label">Type</label>
            <select class="tool-select" id="gg-type"><option value="linear">Linear</option><option value="radial">Radial</option><option value="conic">Conic</option></select>
          </div>
          <div class="tool-section" id="gg-angle-wrap"><label class="tool-label">Angle <span id="gg-ang-val">135</span>°</label>
            <input type="range" class="tool-range" id="gg-angle" min="0" max="360" value="135">
          </div>
          <div class="tool-section"><label class="tool-label">Color 1</label><input type="color" class="color-input" id="gg-c1" value="#7c3aed" style="width:100%;height:44px"></div>
          <div class="tool-section"><label class="tool-label">Color 2</label><input type="color" class="color-input" id="gg-c2" value="#06b6d4" style="width:100%;height:44px"></div>
          <div class="tool-section"><label class="tool-label">Color 3 (optional)</label><input type="color" class="color-input" id="gg-c3" value="#10b981" style="width:100%;height:44px"></div>
        </div>
        <div>
          <div id="gg-preview" style="height:200px;border-radius:var(--r-lg);border:1px solid var(--border);margin-bottom:10px;transition:.3s"></div>
          <div class="output-wrapper">
            <div class="tool-output" id="gg-out" style="font-size:.8rem"></div>
            <button class="copy-btn" onclick="doCopy('gg-out','gg-copy')" id="gg-copy">Copy</button>
          </div>
        </div>
      </div>`;
    function update(){
      const type=q(el,'#gg-type').value, angle=q(el,'#gg-angle').value;
      const c1=q(el,'#gg-c1').value, c2=q(el,'#gg-c2').value, c3=q(el,'#gg-c3').value;
      q(el,'#gg-ang-val').textContent=angle;
      let grad='';
      if(type==='linear')grad=`linear-gradient(${angle}deg, ${c1}, ${c2}, ${c3})`;
      else if(type==='radial')grad=`radial-gradient(circle, ${c1}, ${c2}, ${c3})`;
      else grad=`conic-gradient(from ${angle}deg, ${c1}, ${c2}, ${c3})`;
      q(el,'#gg-preview').style.background=grad;
      q(el,'#gg-out').textContent=`background: ${grad};`;
      q(el,'#gg-angle-wrap').style.display=type==='radial'?'none':'block';
    }
    ['#gg-type','#gg-angle','#gg-c1','#gg-c2','#gg-c3'].forEach(s=>q(el,s).addEventListener('input',update));
    update();
  }
},

/* 33 */ {
  id:'box-shadow-gen', name:'Box Shadow Generator', icon:'🌑', category:'developer',
  description:'Generate CSS box shadows with live preview. Control offset, blur, spread and color.',
  tags:['box shadow','css','shadow','generator'],
  setup(el) {
    el.innerHTML = `
      <div class="grid-2">
        <div>
          ${[['bs-x','X Offset','-50','50','0'],['bs-y','Y Offset','-50','50','10'],['bs-blur','Blur','0','100','20'],['bs-spread','Spread','-30','50','0']].map(([id,lbl,min,max,val])=>`
          <div class="tool-section"><label class="tool-label">${lbl} <span id="${id}-val">${val}</span>px</label>
            <input type="range" class="tool-range" id="${id}" min="${min}" max="${max}" value="${val}">
          </div>`).join('')}
          <div class="tool-section"><label class="tool-label">Color</label><input type="color" id="bs-color" value="#7c3aed" style="width:100%;height:44px"></div>
          <div class="tool-section"><label class="tool-label">Opacity <span id="bs-op-val">0.5</span></label><input type="range" class="tool-range" id="bs-op" min="0" max="1" step="0.05" value="0.5"></div>
          <label style="display:flex;align-items:center;gap:6px;cursor:pointer;color:var(--text-secondary)"><input type="checkbox" id="bs-inset"> Inset</label>
        </div>
        <div>
          <div id="bs-preview" style="height:180px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.04);border-radius:var(--r-lg);margin-bottom:10px">
            <div id="bs-box" style="width:100px;height:100px;background:rgba(124,58,237,.3);border-radius:12px;transition:.3s"></div>
          </div>
          <div class="output-wrapper">
            <div class="tool-output" id="bs-out" style="font-size:.82rem"></div>
            <button class="copy-btn" onclick="doCopy('bs-out','bs-copy')" id="bs-copy">Copy</button>
          </div>
        </div>
      </div>`;
    function update(){
      const x=q(el,'#bs-x').value, y=q(el,'#bs-y').value, blur=q(el,'#bs-blur').value;
      const spread=q(el,'#bs-spread').value, color=q(el,'#bs-color').value, op=q(el,'#bs-op').value;
      const inset=q(el,'#bs-inset').checked;
      [['bs-x',x],['bs-y',y],['bs-blur',blur],['bs-spread',spread],['bs-op-val',op]].forEach(([id,v])=>{const el2=q(el,`#${id}-val`);if(el2)el2.textContent=v;});
      const rgb=hexToRgb(color);
      const rgba=rgb?`rgba(${rgb.r},${rgb.g},${rgb.b},${op})`:color;
      const shadow=`${inset?'inset ':''}${x}px ${y}px ${blur}px ${spread}px ${rgba}`;
      q(el,'#bs-box').style.boxShadow=shadow;
      q(el,'#bs-out').textContent=`box-shadow: ${shadow};`;
    }
    ['#bs-x','#bs-y','#bs-blur','#bs-spread','#bs-color','#bs-op','#bs-inset'].forEach(s=>{
      const el2=q(el,s); if(el2) el2.addEventListener('input',update);
    });
    update();
  }
},

/* 34 */ {
  id:'border-radius-gen', name:'Border Radius Generator', icon:'⬜', category:'developer',
  description:'Visually create CSS border-radius values with a live preview.',
  tags:['border','radius','css','rounded','corners','generator'],
  setup(el) {
    el.innerHTML = `
      <div class="grid-2">
        <div>
          ${[['br-tl','Top Left','16'],['br-tr','Top Right','16'],['br-bl','Bottom Left','16'],['br-br','Bottom Right','16']].map(([id,lbl,val])=>`
          <div class="tool-section"><label class="tool-label">${lbl} <span id="${id}-val">${val}</span>px</label>
            <input type="range" class="tool-range" id="${id}" min="0" max="100" value="${val}">
          </div>`).join('')}
          <button class="cyber-btn" id="br-all">Set All Equal</button>
        </div>
        <div>
          <div style="height:180px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.04);border-radius:var(--r-lg);margin-bottom:10px">
            <div id="br-box" style="width:120px;height:120px;background:var(--grad-primary);transition:.2s"></div>
          </div>
          <div class="output-wrapper">
            <div class="tool-output" id="br-out" style="font-size:.82rem"></div>
            <button class="copy-btn" onclick="doCopy('br-out','br-copy')" id="br-copy">Copy</button>
          </div>
        </div>
      </div>`;
    function update(){
      const tl=q(el,'#br-tl').value, tr=q(el,'#br-tr').value, bl=q(el,'#br-bl').value, br=q(el,'#br-br').value;
      [['br-tl',tl],['br-tr',tr],['br-bl',bl],['br-br',br]].forEach(([id,v])=>{const el2=q(el,`#${id}-val`);if(el2)el2.textContent=v;});
      const val=`${tl}px ${tr}px ${br}px ${bl}px`;
      q(el,'#br-box').style.borderRadius=val;
      q(el,'#br-out').textContent=`border-radius: ${val};`;
    }
    ['#br-tl','#br-tr','#br-bl','#br-br'].forEach(s=>q(el,s).addEventListener('input',update));
    q(el,'#br-all').addEventListener('click',()=>{
      const v=q(el,'#br-tl').value;
      ['#br-tr','#br-bl','#br-br'].forEach(s=>{q(el,s).value=v;});update();
    });
    update();
  }
},

/* 35 */ {
  id:'meta-tag-gen', name:'Meta Tag Generator', icon:'🏷️', category:'developer',
  description:'Generate complete meta tags for SEO and Open Graph from a simple form.',
  tags:['meta','seo','open graph','twitter card','html','head'],
  setup(el) {
    el.innerHTML = `
      <div class="grid-2">
        <div class="tool-section"><label class="tool-label">Title</label><input class="tool-input" id="mt-title" value="My Amazing Page" maxlength="60"></div>
        <div class="tool-section"><label class="tool-label">URL</label><input class="tool-input" id="mt-url" placeholder="https://example.com"></div>
        <div class="tool-section" style="grid-column:1/-1"><label class="tool-label">Description (max 160 chars)</label><input class="tool-input" id="mt-desc" value="A page about something amazing." maxlength="160"></div>
        <div class="tool-section"><label class="tool-label">Keywords (comma-separated)</label><input class="tool-input" id="mt-kw" placeholder="tool, online, free"></div>
        <div class="tool-section"><label class="tool-label">Author</label><input class="tool-input" id="mt-author" placeholder="Your Name"></div>
        <div class="tool-section"><label class="tool-label">OG Image URL</label><input class="tool-input" id="mt-img" placeholder="https://example.com/og.jpg"></div>
        <div class="tool-section"><label class="tool-label">Theme Color</label><input type="color" id="mt-color" value="#7c3aed" style="width:100%;height:40px"></div>
      </div>
      <button class="cyber-btn" id="mt-gen">Generate Meta Tags</button>
      ${outputBlock('mt-out','Generated HTML')}`;
    q(el,'#mt-out').style.maxHeight='280px';
    q(el,'#mt-gen').addEventListener('click',()=>{
      const t=q(el,'#mt-title').value, d=q(el,'#mt-desc').value, u=q(el,'#mt-url').value;
      const k=q(el,'#mt-kw').value, a=q(el,'#mt-author').value, img=q(el,'#mt-img').value, c=q(el,'#mt-color').value;
      q(el,'#mt-out').textContent=`<!-- SEO Meta Tags -->
<title>${t}</title>
<meta name="description" content="${d}">
<meta name="keywords" content="${k}">
<meta name="author" content="${a}">
<meta name="theme-color" content="${c}">
<link rel="canonical" href="${u}">

<!-- Open Graph -->
<meta property="og:title" content="${t}">
<meta property="og:description" content="${d}">
<meta property="og:url" content="${u}">
<meta property="og:image" content="${img}">
<meta property="og:type" content="website">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${t}">
<meta name="twitter:description" content="${d}">
<meta name="twitter:image" content="${img}">`;
    });
  }
},

/* 36 */ {
  id:'cron-builder', name:'Cron Expression Builder', icon:'⏰', category:'developer',
  description:'Build and understand cron expressions with a visual builder and natural language description.',
  tags:['cron','schedule','expression','job','task','automation'],
  setup(el) {
    const presets=[['Every minute','* * * * *'],['Every 5 min','*/5 * * * *'],['Every hour','0 * * * *'],['Every day at midnight','0 0 * * *'],['Every Monday','0 0 * * 1'],['Every weekday','0 0 * * 1-5'],['Every month 1st','0 0 1 * *']];
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Cron Expression</label>
        <input class="tool-input" id="cr-expr" value="* * * * *" style="font-family:var(--font-mono)">
      </div>
      <div id="cr-desc" class="alert alert-info" style="margin-top:8px">Every minute</div>
      <div class="tool-section mt-2"><label class="tool-label">Presets</label>
        <div class="btn-group">${presets.map(([n,e])=>`<button class="cyber-btn" data-expr="${e}">${n}</button>`).join('')}</div>
      </div>
      <div class="tool-section mt-2"><label class="tool-label">Field Reference</label>
        <div class="tool-output" style="font-size:.8rem;line-height:2">┌── Minute (0-59)\n│ ┌── Hour (0-23)\n│ │ ┌── Day of Month (1-31)\n│ │ │ ┌── Month (1-12)\n│ │ │ │ ┌── Day of Week (0-6, Sun=0)\n│ │ │ │ │\n* * * * *\n\n* = any, */n = every n, n-m = range, n,m = list</div>
      </div>`;
    function describe(expr){
      const [min,hr,dom,mo,dow]=expr.trim().split(' ');
      if(expr==='* * * * *') return 'Every minute';
      let parts=[];
      if(min==='*') parts.push('every minute');
      else if(min.startsWith('*/')) parts.push(`every ${min.slice(2)} minutes`);
      else parts.push(`at minute ${min}`);
      if(hr!=='*') parts.push(hr.startsWith('*/')?`every ${hr.slice(2)} hours`:`at ${hr}:00`);
      if(dom!=='*') parts.push(`on day ${dom} of the month`);
      if(mo!=='*') parts.push(`in month ${mo}`);
      if(dow!=='*') parts.push(`on ${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][parseInt(dow)]||dow}`);
      return parts.join(', ');
    }
    q(el,'#cr-expr').addEventListener('input',function(){
      try{const d=describe(this.value);q(el,'#cr-desc').textContent=d;}catch{}
    });
    q(el,'.btn-group').addEventListener('click',e=>{
      const expr=e.target.dataset.expr; if(!expr) return;
      q(el,'#cr-expr').value=expr;
      q(el,'#cr-desc').textContent=describe(expr);
    });
  }
},

/* 37 */ {
  id:'color-converter', name:'Color Code Converter', icon:'🎨', category:'developer',
  description:'Convert between HEX, RGB, HSL, and RGBA color formats instantly.',
  tags:['color','hex','rgb','hsl','rgba','convert'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Enter any color format</label>
        <div style="display:flex;gap:10px;align-items:center">
          <input type="color" id="cc-picker" value="#7c3aed" style="width:56px;height:48px;border:1px solid var(--border);border-radius:var(--r-md);background:none;cursor:pointer">
          <input class="tool-input" id="cc-in" value="#7c3aed" placeholder="#HEX or rgb(r,g,b) or hsl(h,s%,l%)">
        </div>
      </div>
      <div class="conv-grid mt-2">
        ${['HEX','RGB','RGBA','HSL','HSL CSS'].map(f=>`<div class="conv-item"><div class="conv-item-label">${f}</div><div class="conv-item-value" id="cc-${f.replace(' ','_')}">&mdash;</div></div>`).join('')}
      </div>
      <div id="cc-preview" class="color-preview mt-2">Preview</div>`;
    function parse(val){
      val=val.trim();
      if(val.startsWith('#'))return hexToRgb(val);
      const rm=val.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
      if(rm)return{r:+rm[1],g:+rm[2],b:+rm[3]};
      const hm=val.match(/hsl\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?\s*\)/);
      if(hm)return hexToRgb(hslToHex(+hm[1],+hm[2],+hm[3]));
      return null;
    }
    function update(val){
      const rgb=parse(val); if(!rgb) return;
      const hex=rgbToHex(rgb.r,rgb.g,rgb.b);
      const hsl=rgbToHsl(rgb.r,rgb.g,rgb.b);
      q(el,'#cc-HEX').textContent=hex;
      q(el,'#cc-RGB').textContent=`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      q(el,'#cc-RGBA').textContent=`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;
      q(el,'#cc-HSL').textContent=`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
      q(el,'#cc-HSL_CSS').textContent=`hsl(${hsl.h}deg ${hsl.s}% ${hsl.l}%)`;
      q(el,'#cc-preview').style.background=hex;
      q(el,'#cc-picker').value=hex;
    }
    q(el,'#cc-in').addEventListener('input',e=>update(e.target.value));
    q(el,'#cc-picker').addEventListener('input',e=>{q(el,'#cc-in').value=e.target.value;update(e.target.value);});
    update('#7c3aed');
  }
},

/* 38 */ {
  id:'diff-checker', name:'Diff Checker', icon:'🔄', category:'developer',
  description:'Compare two code or text blocks and see exactly what changed, added, or removed.',
  tags:['diff','compare','code','changes','added','removed','files'],
  setup(el) {
    el.innerHTML = `
      <div class="grid-2 mb-2">
        <div class="tool-section"><label class="tool-label">Original</label><textarea class="tool-textarea" id="dc-a" style="min-height:140px" placeholder="Original content…"></textarea></div>
        <div class="tool-section"><label class="tool-label">Modified</label><textarea class="tool-textarea" id="dc-b" style="min-height:140px" placeholder="Modified content…"></textarea></div>
      </div>
      <button class="cyber-btn" id="dc-run">Show Diff</button>
      <div class="tool-section"><label class="tool-label">Diff Output</label>
        <div id="dc-out" style="background:var(--bg-output);border:1px solid var(--border);border-radius:var(--r-md);padding:14px;font-family:var(--font-mono);font-size:.83rem;line-height:1.8;max-height:360px;overflow-y:auto;min-height:60px"></div>
      </div>`;
    q(el,'#dc-run').addEventListener('click',()=>{
      const a=q(el,'#dc-a').value.split('\n'),b=q(el,'#dc-b').value.split('\n');
      let html='',adds=0,rems=0;
      const maxLen=Math.max(a.length,b.length);
      for(let i=0;i<maxLen;i++){
        if(a[i]===b[i]) html+=`<div style="color:var(--text-muted);padding:1px 0"> ${escapeHTML(a[i]??'')}</div>`;
        else{
          if(a[i]!==undefined){rems++;html+=`<div style="color:#f87171;background:rgba(239,68,68,.07);padding:1px 6px;border-radius:3px">−&nbsp;${escapeHTML(a[i])}</div>`;}
          if(b[i]!==undefined){adds++;html+=`<div style="color:#6ee7b7;background:rgba(16,185,129,.07);padding:1px 6px;border-radius:3px">+&nbsp;${escapeHTML(b[i])}</div>`;}
        }
      }
      q(el,'#dc-out').innerHTML=html+`<div style="margin-top:10px;color:var(--text-muted);font-size:.78rem">+${adds} additions, -${rems} removals</div>`;
    });
  }
},

/* 39 */ {
  id:'csv-to-json', name:'CSV to JSON', icon:'📊', category:'developer',
  description:'Convert CSV data to JSON format with automatic header detection.',
  tags:['csv','json','convert','table','data'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">CSV Input (first row = headers)</label>
        <textarea class="tool-textarea" id="c2j-in" style="min-height:130px" placeholder="name,age,city\nAlice,30,NYC\nBob,25,LA"></textarea>
      </div>
      <button class="cyber-btn" id="c2j-run">Convert to JSON</button>
      <div id="c2j-msg"></div>
      ${outputBlock('c2j-out','JSON Output')}`;
    q(el,'#c2j-run').addEventListener('click',()=>{
      try{
        const lines=q(el,'#c2j-in').value.trim().split('\n');
        const headers=lines[0].split(',').map(h=>h.trim());
        const data=lines.slice(1).map(line=>{
          const vals=line.split(',');
          return Object.fromEntries(headers.map((h,i)=>[h,vals[i]?.trim()||'']));
        });
        q(el,'#c2j-out').textContent=JSON.stringify(data,null,2);
        q(el,'#c2j-msg').innerHTML=`<div class="alert alert-success">✅ Converted ${data.length} rows</div>`;
      }catch(e){q(el,'#c2j-msg').innerHTML=`<div class="alert alert-error">❌ ${escapeHTML(e.message)}</div>`;}
    });
  }
},

/* 40 */ {
  id:'json-to-xml', name:'JSON to XML', icon:'📋', category:'developer',
  description:'Convert JSON data to XML format with configurable root element name.',
  tags:['json','xml','convert','data','transform'],
  setup(el) {
    function jsonToXml(obj,indent=0){
      const pad='  '.repeat(indent);
      if(typeof obj!=='object'||obj===null)return String(obj);
      if(Array.isArray(obj))return obj.map(item=>`${pad}<item>\n${pad}  ${jsonToXml(item,indent+1)}\n${pad}</item>`).join('\n');
      return Object.entries(obj).map(([k,v])=>{
        const safe=k.replace(/[^a-zA-Z0-9_]/g,'_');
        if(typeof v==='object'&&v!==null)return `${pad}<${safe}>\n${jsonToXml(v,indent+1)}\n${pad}</${safe}>`;
        return `${pad}<${safe}>${escapeHTML(String(v))}</${safe}>`;
      }).join('\n');
    }
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">JSON Input</label>
        <textarea class="tool-textarea" id="j2x-in" style="min-height:130px" placeholder='{"name":"Alice","age":30}'></textarea>
      </div>
      <div class="flex-gap mb-2">
        <div class="tool-section"><label class="tool-label">Root Element</label><input class="tool-input" id="j2x-root" value="root"></div>
        <div class="tool-section" style="align-self:flex-end"><button class="cyber-btn" id="j2x-run">Convert to XML</button></div>
      </div>
      <div id="j2x-msg"></div>
      ${outputBlock('j2x-out','XML Output')}`;
    q(el,'#j2x-run').addEventListener('click',()=>{
      try{
        const data=JSON.parse(q(el,'#j2x-in').value);
        const root=q(el,'#j2x-root').value||'root';
        const xml=`<?xml version="1.0" encoding="UTF-8"?>\n<${root}>\n${jsonToXml(data,1)}\n</${root}>`;
        q(el,'#j2x-out').textContent=xml;q(el,'#j2x-msg').innerHTML='<div class="alert alert-success">✅ Converted</div>';
      }catch(e){q(el,'#j2x-msg').innerHTML=`<div class="alert alert-error">❌ ${escapeHTML(e.message)}</div>`;}
    });
  }
},

/* 41 */ {
  id:'json-to-table', name:'JSON to Table', icon:'📋', category:'developer',
  description:'Render a JSON array as a nicely formatted HTML table for easy reading.',
  tags:['json','table','render','html','data','visualize'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">JSON Array</label>
        <textarea class="tool-textarea" id="jt-in" style="min-height:110px" placeholder='[{"name":"Alice","age":30},{"name":"Bob","age":25}]'></textarea>
      </div>
      <button class="cyber-btn" id="jt-run">Render Table</button>
      <div id="jt-msg"></div>
      <div id="jt-out" style="overflow-x:auto"></div>`;
    q(el,'#jt-run').addEventListener('click',()=>{
      try{
        const data=JSON.parse(q(el,'#jt-in').value);
        if(!Array.isArray(data)||data.length===0)throw new Error('Input must be a non-empty JSON array');
        const keys=Object.keys(data[0]);
        const html=`<table class="tool-table"><thead><tr>${keys.map(k=>`<th>${escapeHTML(k)}</th>`).join('')}</tr></thead><tbody>${data.map(row=>`<tr>${keys.map(k=>`<td>${escapeHTML(String(row[k]??''))}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
        q(el,'#jt-out').innerHTML=html;q(el,'#jt-msg').innerHTML='<div class="alert alert-success">✅ '+data.length+' rows rendered</div>';
      }catch(e){q(el,'#jt-msg').innerHTML=`<div class="alert alert-error">❌ ${escapeHTML(e.message)}</div>`;}
    });
  }
},

/* 42 */ {
  id:'http-status', name:'HTTP Status Codes Reference', icon:'📡', category:'developer',
  description:'Quick reference for all HTTP status codes with descriptions and use cases.',
  tags:['http','status','codes','reference','404','200','301'],
  setup(el) {
    const codes=[
      [100,'Continue','Request received, continue process'],
      [101,'Switching Protocols','Protocol upgrade requested'],
      [200,'OK','Request succeeded'],
      [201,'Created','Resource created successfully'],
      [204,'No Content','Success but no body to return'],
      [301,'Moved Permanently','Permanent redirect'],
      [302,'Found','Temporary redirect'],
      [304,'Not Modified','Use cached version'],
      [400,'Bad Request','Malformed syntax or invalid request'],
      [401,'Unauthorized','Authentication required'],
      [403,'Forbidden','Access denied'],
      [404,'Not Found','Resource not found'],
      [405,'Method Not Allowed','HTTP method not supported'],
      [408,'Request Timeout','Request took too long'],
      [409,'Conflict','State conflict'],
      [410,'Gone','Resource permanently deleted'],
      [422,'Unprocessable Entity','Validation failed'],
      [429,'Too Many Requests','Rate limited'],
      [500,'Internal Server Error','Generic server error'],
      [502,'Bad Gateway','Invalid upstream response'],
      [503,'Service Unavailable','Server overloaded or down'],
      [504,'Gateway Timeout','Upstream timeout'],
    ];
    el.innerHTML = `
      <div class="tool-section"><input class="tool-input" id="hsc-search" placeholder="Search status code or description…"></div>
      <div class="ref-list" id="hsc-list">${codes.map(([c,n,d])=>`<div class="ref-item" data-code="${c} ${n.toLowerCase()}">
        <span class="ref-code" style="color:${c<300?'var(--emerald)':c<400?'var(--cyan)':c<500?'var(--yellow)':'#f87171'}">${c}</span>
        <div><div class="ref-name">${n}</div><div class="ref-desc">${d}</div></div>
      </div>`).join('')}</div>`;
    q(el,'#hsc-search').addEventListener('input',function(){
      const q2=this.value.toLowerCase();
      qa(el,'.ref-item').forEach(item=>{item.style.display=item.dataset.code.includes(q2)?'':'none';});
    });
  }
},

/* 43 */ {
  id:'robots-gen', name:'Robots.txt Generator', icon:'🤖', category:'developer',
  description:'Generate a robots.txt file for your website with common configurations.',
  tags:['robots','txt','seo','crawl','spider','search engine'],
  setup(el) {
    el.innerHTML = `
      <div class="grid-2">
        <div class="tool-section"><label class="tool-label">User Agent</label><input class="tool-input" id="rg-ua" value="*" placeholder="* or Googlebot"></div>
        <div class="tool-section"><label class="tool-label">Sitemap URL</label><input class="tool-input" id="rg-sitemap" placeholder="https://example.com/sitemap.xml"></div>
        <div class="tool-section" style="grid-column:1/-1"><label class="tool-label">Disallowed Paths (one per line)</label>
          <textarea class="tool-textarea" id="rg-disallow" placeholder="/admin/\n/private/\n/tmp/">/admin/\n/private/</textarea>
        </div>
        <div class="tool-section" style="grid-column:1/-1"><label class="tool-label">Allowed Paths (one per line)</label>
          <textarea class="tool-textarea" id="rg-allow" placeholder="/public/\n/api/v1/"></textarea>
        </div>
      </div>
      <button class="cyber-btn" id="rg-gen">Generate</button>
      ${outputBlock('rg-out','robots.txt')}`;
    q(el,'#rg-gen').addEventListener('click',()=>{
      const ua=q(el,'#rg-ua').value||'*';
      const disallows=q(el,'#rg-disallow').value.trim().split('\n').filter(Boolean);
      const allows=q(el,'#rg-allow').value.trim().split('\n').filter(Boolean);
      const sitemap=q(el,'#rg-sitemap').value;
      let txt=`User-agent: ${ua}\n`;
      disallows.forEach(p=>txt+=`Disallow: ${p}\n`);
      allows.forEach(p=>txt+=`Allow: ${p}\n`);
      if(sitemap)txt+=`\nSitemap: ${sitemap}`;
      q(el,'#rg-out').textContent=txt;
    });
    q(el,'#rg-gen').click();
  }
},

/* 44 */ {
  id:'html-to-md', name:'HTML to Markdown', icon:'✍️', category:'developer',
  description:'Convert HTML markup to clean Markdown syntax.',
  tags:['html','markdown','convert','md','transform'],
  setup(el) {
    function htmlToMd(html){
      return html
        .replace(/<h([1-6])[^>]*>(.*?)<\/h\1>/gi,(_,n,c)=>'\n'+'#'.repeat(+n)+' '+c.trim()+'\n')
        .replace(/<strong[^>]*>(.*?)<\/strong>/gi,'**$1**')
        .replace(/<b[^>]*>(.*?)<\/b>/gi,'**$1**')
        .replace(/<em[^>]*>(.*?)<\/em>/gi,'*$1*')
        .replace(/<i[^>]*>(.*?)<\/i>/gi,'*$1*')
        .replace(/<code[^>]*>(.*?)<\/code>/gi,'`$1`')
        .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi,'[$2]($1)')
        .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/gi,'![$2]($1)')
        .replace(/<br\s*\/?>/gi,'\n')
        .replace(/<p[^>]*>(.*?)<\/p>/gi,'$1\n\n')
        .replace(/<li[^>]*>(.*?)<\/li>/gi,'- $1\n')
        .replace(/<[^>]+>/g,'')
        .replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>')
        .replace(/&quot;/g,'"').replace(/&#39;/g,"'")
        .replace(/\n{3,}/g,'\n\n').trim();
    }
    el.innerHTML = `
      <div class="grid-2" style="gap:12px;height:320px">
        <div style="display:flex;flex-direction:column;gap:6px;height:100%">
          <label class="tool-label">HTML</label>
          <textarea class="tool-textarea" id="h2m-in" style="flex:1;resize:none" placeholder="<h1>Title</h1><p>Hello <strong>World</strong></p>"></textarea>
        </div>
        <div style="display:flex;flex-direction:column;gap:6px;height:100%">
          <label class="tool-label">Markdown</label>
          <div class="tool-output" id="h2m-out" style="flex:1;max-height:none;overflow-y:auto"></div>
        </div>
      </div>
      <button class="cyber-btn" id="h2m-run">Convert</button>`;
    q(el,'#h2m-run').addEventListener('click',()=>q(el,'#h2m-out').textContent=htmlToMd(q(el,'#h2m-in').value));
    q(el,'#h2m-in').addEventListener('input',()=>q(el,'#h2m-out').textContent=htmlToMd(q(el,'#h2m-in').value));
  }
}

); // end DEVELOPER TOOLS push
