window.TOOLS.push(
  // ========================================================================
  // SOCIAL & MARKETING (TRENDING)
  // ========================================================================
  {
    id: 'utm-builder',
    name: 'UTM Link Builder',
    desc: 'Generate trackable URLs with custom UTM parameters for campaigns.',
    icon: '🔗',
    category: 'web',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io">
          <div class="io-box">
            <label class="io-label">Base URL *</label>
            <input type="url" id="utm-url" class="io-input" placeholder="https://example.com" autofocus>
            <label class="io-label" style="margin-top:12px;">Campaign Source * (e.g. google, newsletter)</label>
            <input type="text" id="utm-src" class="io-input" placeholder="google">
            <label class="io-label" style="margin-top:12px;">Campaign Medium (e.g. cpc, email)</label>
            <input type="text" id="utm-med" class="io-input" placeholder="cpc">
            <label class="io-label" style="margin-top:12px;">Campaign Name</label>
            <input type="text" id="utm-name" class="io-input" placeholder="summer_sale">
            <label class="io-label" style="margin-top:12px;">Campaign Term (keywords)</label>
            <input type="text" id="utm-term" class="io-input" placeholder="running+shoes">
            <label class="io-label" style="margin-top:12px;">Campaign Content (ad variation)</label>
            <input type="text" id="utm-content" class="io-input" placeholder="logolink">
          </div>
          <div class="io-box io-output" id="utm-out-box">
            <label class="io-label">Generated URL</label>
            <textarea id="utm-out" class="io-textarea" style="height:100px" readonly placeholder="Your trackable link will appear here..."></textarea>
            <div class="action-row">
              <button class="cyber-btn" id="utm-copy">Copy URL</button>
            </div>
          </div>
        </div>
      `;
      const out = el.querySelector('#utm-out');
      function buildUTM() {
        const url = el.querySelector('#utm-url').value.trim();
        const src = el.querySelector('#utm-src').value.trim();
        const med = el.querySelector('#utm-med').value.trim();
        const name = el.querySelector('#utm-name').value.trim();
        const term = el.querySelector('#utm-term').value.trim();
        const content = el.querySelector('#utm-content').value.trim();
        
        if (!url || !src) {
          out.value = '';
          return;
        }
        try {
          const u = new URL(url.startsWith('http') ? url : 'https://' + url);
          if (src) u.searchParams.set('utm_source', src);
          if (med) u.searchParams.set('utm_medium', med);
          if (name) u.searchParams.set('utm_campaign', name);
          if (term) u.searchParams.set('utm_term', term);
          if (content) u.searchParams.set('utm_content', content);
          out.value = u.toString();
        } catch(e) {
          out.value = 'Invalid URL';
        }
      }
      el.querySelectorAll('.io-input').forEach(i => i.addEventListener('input', buildUTM));
      el.querySelector('#utm-copy').addEventListener('click', () => {
        navigator.clipboard.writeText(out.value);
      });
    }
  },
  {
    id: 'wa-link-gen',
    name: 'WhatsApp Link Generator',
    desc: 'Create direct WhatsApp chat links with pre-filled messages.',
    icon: '💬',
    category: 'web',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io">
          <div class="io-box">
            <label class="io-label">Phone Number (with country code, no +)</label>
            <input type="number" id="wa-phone" class="io-input" placeholder="1234567890" autofocus>
            <label class="io-label" style="margin-top:12px;">Pre-filled Message</label>
            <textarea id="wa-msg" class="io-textarea" style="height:80px" placeholder="Hello! I am interested in..."></textarea>
          </div>
          <div class="io-box io-output" id="wa-out-box">
            <label class="io-label">Generated Link</label>
            <input type="text" id="wa-out" class="io-input" readonly placeholder="https://wa.me/...">
            <div class="action-row mt-2">
              <button class="cyber-btn" id="wa-copy">Copy Link</button>
              <a id="wa-test" href="#" target="_blank" class="cyber-btn">Test Link ↗</a>
            </div>
          </div>
        </div>
      `;
      function genWa() {
        const phone = el.querySelector('#wa-phone').value.replace(/\\D/g, '');
        const msg = encodeURIComponent(el.querySelector('#wa-msg').value);
        let link = 'https://wa.me/';
        if (phone) link += phone;
        if (msg) link += '?text=' + msg;
        
        el.querySelector('#wa-out').value = (phone || msg) ? link : '';
        el.querySelector('#wa-test').href = link;
      }
      el.querySelector('#wa-phone').addEventListener('input', genWa);
      el.querySelector('#wa-msg').addEventListener('input', genWa);
      el.querySelector('#wa-copy').addEventListener('click', () => {
        navigator.clipboard.writeText(el.querySelector('#wa-out').value);
      });
    }
  },
  {
    id: 'tweet-link-gen',
    name: 'Tweet Link Generator',
    desc: 'Create click-to-tweet URLs for social sharing.',
    icon: '🐦',
    category: 'web',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io">
          <div class="io-box">
            <label class="io-label">Tweet Text</label>
            <textarea id="tw-text" class="io-textarea" style="height:80px" placeholder="Check out this awesome tool!" autofocus></textarea>
            <label class="io-label" style="margin-top:12px;">URL to share (optional)</label>
            <input type="url" id="tw-url" class="io-input" placeholder="https://example.com">
            <label class="io-label" style="margin-top:12px;">Hashtags (comma separated)</label>
            <input type="text" id="tw-tags" class="io-input" placeholder="tools,coding,tech">
          </div>
          <div class="io-box io-output" id="tw-out-box">
            <label class="io-label">Generated Link</label>
            <textarea id="tw-out" class="io-textarea" style="height:60px" readonly placeholder="https://twitter.com/intent/tweet?..."></textarea>
            <div class="action-row">
              <button class="cyber-btn" id="tw-copy">Copy Link</button>
              <a id="tw-test" href="#" target="_blank" class="cyber-btn">Test Link ↗</a>
            </div>
          </div>
        </div>
      `;
      function genTw() {
        const text = encodeURIComponent(el.querySelector('#tw-text').value);
        const url = encodeURIComponent(el.querySelector('#tw-url').value);
        const tags = el.querySelector('#tw-tags').value.replace(/\\s/g, '').replace(/#/g, '');
        
        let link = 'https://twitter.com/intent/tweet?';
        const params = [];
        if (text) params.push('text=' + text);
        if (url) params.push('url=' + url);
        if (tags) params.push('hashtags=' + tags);
        
        link += params.join('&');
        el.querySelector('#tw-out').value = params.length ? link : '';
        el.querySelector('#tw-test').href = link;
      }
      el.querySelectorAll('input, textarea').forEach(i => i.addEventListener('input', genTw));
      el.querySelector('#tw-copy').addEventListener('click', () => {
        navigator.clipboard.writeText(el.querySelector('#tw-out').value);
      });
    }
  },
  {
    id: 'ig-caption-spacer',
    name: 'Instagram Caption Spacer',
    desc: 'Format Instagram captions cleanly without losing line breaks.',
    icon: '📸',
    category: 'text',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io">
          <div class="io-box">
            <label class="io-label">Caption with Line Breaks</label>
            <textarea id="ig-in" class="io-textarea" autofocus placeholder="Write your caption here...\\n\\nIt will keep these empty lines intact on Instagram!"></textarea>
          </div>
          <div class="io-box io-output" id="ig-out-box">
            <label class="io-label">Formatted Caption</label>
            <textarea id="ig-out" class="io-textarea" readonly></textarea>
            <div class="action-row">
              <button class="cyber-btn" id="ig-copy">Copy Caption</button>
            </div>
          </div>
        </div>
      `;
      el.querySelector('#ig-in').addEventListener('input', e => {
        const formatted = e.target.value.replace(/\\n\\s*\\n/g, '\\n\\u2800\\n');
        el.querySelector('#ig-out').value = formatted;
      });
      el.querySelector('#ig-copy').addEventListener('click', () => {
        navigator.clipboard.writeText(el.querySelector('#ig-out').value);
      });
    }
  },
  {
    id: 'hashtag-extractor',
    name: 'Hashtag Extractor',
    desc: 'Extract all hashtags from a block of text.',
    icon: '#️⃣',
    category: 'text',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io">
          <div class="io-box">
            <label class="io-label">Input Text</label>
            <textarea id="ht-in" class="io-textarea" autofocus placeholder="I love #coding and building #web tools!"></textarea>
          </div>
          <div class="io-box io-output" id="ht-out-box">
            <label class="io-label">Extracted Hashtags</label>
            <textarea id="ht-out" class="io-textarea" readonly></textarea>
            <div class="action-row">
              <span class="char-count" id="ht-count">0 tags</span>
              <button class="cyber-btn" id="ht-copy">Copy Tags</button>
            </div>
          </div>
        </div>
      `;
      el.querySelector('#ht-in').addEventListener('input', e => {
        const matches = e.target.value.match(/#[a-zA-Z0-9_]+/g) || [];
        const unique = [...new Set(matches)];
        el.querySelector('#ht-out').value = unique.join(' ');
        el.querySelector('#ht-count').textContent = unique.length + ' tags';
      });
      el.querySelector('#ht-copy').addEventListener('click', () => {
        navigator.clipboard.writeText(el.querySelector('#ht-out').value);
      });
    }
  },
  {
    id: 'reading-time',
    name: 'Reading Time Calculator',
    desc: 'Estimate how long it takes to read a piece of text.',
    icon: '⏱️',
    category: 'text',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io">
          <div class="io-box">
            <label class="io-label">Input Text</label>
            <textarea id="rt-in" class="io-textarea" autofocus placeholder="Paste your article or blog post here..."></textarea>
            <label class="io-label" style="margin-top:12px;">Words per minute (Average is 238)</label>
            <input type="number" id="rt-wpm" class="io-input" value="238">
          </div>
          <div class="io-box io-output" id="rt-out-box">
            <label class="io-label">Estimated Time</label>
            <div class="output-block" id="rt-out" style="font-size: 2rem; font-family: var(--font-display); font-weight: 700;">0 min 0 sec</div>
            <div class="action-row mt-2">
              <span class="char-count" id="rt-words">0 words</span>
            </div>
          </div>
        </div>
      `;
      function calcRt() {
        const text = el.querySelector('#rt-in').value.trim();
        const wpm = parseInt(el.querySelector('#rt-wpm').value) || 238;
        const words = text ? text.split(/\\s+/).length : 0;
        
        const minutes = words / wpm;
        const m = Math.floor(minutes);
        const s = Math.round((minutes - m) * 60);
        
        el.querySelector('#rt-words').textContent = words + ' words';
        el.querySelector('#rt-out').textContent = m + ' min ' + s + ' sec';
      }
      el.querySelector('#rt-in').addEventListener('input', calcRt);
      el.querySelector('#rt-wpm').addEventListener('input', calcRt);
    }
  },
  {
    id: 'zalgo-text',
    name: 'Zalgo Text Generator',
    desc: 'Generate cursed, glitchy Zalgo text.',
    icon: '👹',
    category: 'text',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io">
          <div class="io-box">
            <label class="io-label">Normal Text</label>
            <textarea id="zg-in" class="io-textarea" autofocus placeholder="Hello World"></textarea>
            <label class="io-label" style="margin-top:12px;">Crazy Level (1-10)</label>
            <input type="range" id="zg-level" min="1" max="10" value="5" style="width:100%">
          </div>
          <div class="io-box io-output" id="zg-out-box">
            <label class="io-label">Zalgo Text</label>
            <textarea id="zg-out" class="io-textarea" readonly style="font-size: 1.2rem; line-height: 1.8;"></textarea>
            <div class="action-row">
              <button class="cyber-btn" id="zg-copy">Copy</button>
            </div>
          </div>
        </div>
      `;
      const zalgoUp = ['\\u030d', '\\u030e', '\\u0304', '\\u0305', '\\u033f', '\\u0311', '\\u0306', '\\u0310', '\\u0352', '\\u0351', '\\u0300', '\\u0301', '\\u030a', '\\u0357', '\\u035d', '\\u030c', '\\u031a', '\\u0358', '\\u0314', '\\u0315', '\\u0316', '\\u0317', '\\u0318', '\\u0319', '\\u031c', '\\u031d', '\\u031e', '\\u031f', '\\u0320', '\\u0321', '\\u0322', '\\u0323'];
      const zalgoDown = ['\\u0316', '\\u0317', '\\u0318', '\\u0319', '\\u031c', '\\u031d', '\\u031e', '\\u031f', '\\u0320', '\\u0321', '\\u0322', '\\u0323', '\\u0324', '\\u0325', '\\u0326', '\\u0327', '\\u0328', '\\u0329', '\\u032a', '\\u032b', '\\u032c', '\\u032d', '\\u032e', '\\u032f', '\\u0330', '\\u0331', '\\u0332', '\\u0333', '\\u033a', '\\u033b', '\\u033c'];
      const zalgoMid = ['\\u0315', '\\u031b', '\\u0340', '\\u0341', '\\u0358', '\\u0321', '\\u0322', '\\u0327', '\\u0328', '\\u0334', '\\u0335', '\\u0336', '\\u034f', '\\u035c', '\\u035d', '\\u035e', '\\u035f'];

      function randChar(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

      function makeZalgo() {
        const text = el.querySelector('#zg-in').value;
        const level = parseInt(el.querySelector('#zg-level').value);
        let res = '';
        for (let i = 0; i < text.length; i++) {
          res += text[i];
          const numUp = Math.floor(Math.random() * level) + 1;
          const numDown = Math.floor(Math.random() * level) + 1;
          const numMid = Math.floor(Math.random() * (level/2)) + 1;
          
          for(let j=0; j<numUp; j++) res += randChar(zalgoUp);
          for(let j=0; j<numMid; j++) res += randChar(zalgoMid);
          for(let j=0; j<numDown; j++) res += randChar(zalgoDown);
        }
        el.querySelector('#zg-out').value = res;
      }
      el.querySelector('#zg-in').addEventListener('input', makeZalgo);
      el.querySelector('#zg-level').addEventListener('input', makeZalgo);
      el.querySelector('#zg-copy').addEventListener('click', () => { navigator.clipboard.writeText(el.querySelector('#zg-out').value); });
    }
  },
  {
    id: 'vaporwave-text',
    name: 'Vaporwave Text Generator',
    desc: 'Convert normal text into fullwidth A E S T H E T I C text.',
    icon: '🌴',
    category: 'text',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io">
          <div class="io-box">
            <label class="io-label">Input Text</label>
            <textarea id="vw-in" class="io-textarea" autofocus placeholder="aesthetic"></textarea>
          </div>
          <div class="io-box io-output" id="vw-out-box">
            <label class="io-label">Vaporwave Text</label>
            <textarea id="vw-out" class="io-textarea" readonly></textarea>
            <div class="action-row">
              <button class="cyber-btn" id="vw-copy">Copy</button>
            </div>
          </div>
        </div>
      `;
      el.querySelector('#vw-in').addEventListener('input', e => {
        const res = e.target.value.split('').map(char => {
          const code = char.charCodeAt(0);
          if (code >= 33 && code <= 126) return String.fromCharCode(code + 65248);
          else if (code === 32) return String.fromCharCode(12288);
          return char;
        }).join('');
        el.querySelector('#vw-out').value = res;
      });
      el.querySelector('#vw-copy').addEventListener('click', () => navigator.clipboard.writeText(el.querySelector('#vw-out').value));
    }
  },
  {
    id: 'morse-code',
    name: 'Morse Code Translator',
    desc: 'Translate text to Morse code and vice versa.',
    icon: '📡',
    category: 'converter',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io">
          <div class="io-box">
            <label class="io-label">Input</label>
            <textarea id="mc-in" class="io-textarea" autofocus placeholder="Type text or morse code (- . - .)..."></textarea>
          </div>
          <div class="io-box io-output" id="mc-out-box">
            <label class="io-label">Output</label>
            <textarea id="mc-out" class="io-textarea" readonly></textarea>
            <div class="action-row">
              <button class="cyber-btn" id="mc-copy">Copy</button>
            </div>
          </div>
        </div>
      `;
      const dict = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
        'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
        'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
        'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
        'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
        '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
        '8': '---..', '9': '----.', ' ': '/'
      };
      const revDict = Object.fromEntries(Object.entries(dict).map(([k, v]) => [v, k]));

      el.querySelector('#mc-in').addEventListener('input', e => {
        const input = e.target.value.trim().toUpperCase();
        if (!input) { el.querySelector('#mc-out').value = ''; return; }
        
        const isMorse = /^[\\.\\-\\s/]+$/.test(input);
        
        if (isMorse) {
          const words = input.split('/');
          const text = words.map(w => w.trim().split(' ').map(c => revDict[c] || '').join('')).join(' ');
          el.querySelector('#mc-out').value = text;
        } else {
          const morse = input.split('').map(c => dict[c] || c).join(' ');
          el.querySelector('#mc-out').value = morse;
        }
      });
      el.querySelector('#mc-copy').addEventListener('click', () => navigator.clipboard.writeText(el.querySelector('#mc-out').value));
    }
  },
  {
    id: 'csv-to-json',
    name: 'CSV to JSON',
    desc: 'Convert CSV data into an array of JSON objects.',
    icon: '📊',
    category: 'developer',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io">
          <div class="io-box">
            <label class="io-label">CSV Input</label>
            <textarea id="cj-in" class="io-textarea font-mono" autofocus placeholder="id,name,age\\n1,John,30\\n2,Jane,25"></textarea>
          </div>
          <div class="io-box io-output" id="cj-out-box">
            <label class="io-label">JSON Output</label>
            <textarea id="cj-out" class="io-textarea font-mono" readonly></textarea>
            <div class="action-row">
              <button class="cyber-btn" id="cj-copy">Copy JSON</button>
            </div>
          </div>
        </div>
      `;
      el.querySelector('#cj-in').addEventListener('input', e => {
        const val = e.target.value.trim();
        if (!val) { el.querySelector('#cj-out').value = ''; return; }
        try {
          const lines = val.split('\\n');
          const headers = lines[0].split(',').map(h => h.trim());
          const result = [];
          for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;
            const currentline = lines[i].split(',');
            const obj = {};
            for (let j = 0; j < headers.length; j++) {
              obj[headers[j]] = currentline[j] ? currentline[j].trim() : '';
            }
            result.push(obj);
          }
          el.querySelector('#cj-out').value = JSON.stringify(result, null, 2);
        } catch(err) {
          el.querySelector('#cj-out').value = 'Invalid CSV format';
        }
      });
      el.querySelector('#cj-copy').addEventListener('click', () => navigator.clipboard.writeText(el.querySelector('#cj-out').value));
    }
  },
  {
    id: 'json-to-csv',
    name: 'JSON to CSV',
    desc: 'Convert an array of JSON objects into CSV format.',
    icon: '📑',
    category: 'developer',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io">
          <div class="io-box">
            <label class="io-label">JSON Input (Array of Objects)</label>
            <textarea id="jc-in" class="io-textarea font-mono" autofocus placeholder='[\\n  {"id": 1, "name": "John"},\\n  {"id": 2, "name": "Jane"}\\n]'></textarea>
          </div>
          <div class="io-box io-output" id="jc-out-box">
            <label class="io-label">CSV Output</label>
            <textarea id="jc-out" class="io-textarea font-mono" readonly></textarea>
            <div class="action-row">
              <button class="cyber-btn" id="jc-copy">Copy CSV</button>
            </div>
          </div>
        </div>
      `;
      el.querySelector('#jc-in').addEventListener('input', e => {
        const val = e.target.value.trim();
        if (!val) { el.querySelector('#jc-out').value = ''; return; }
        try {
          const arr = JSON.parse(val);
          if (!Array.isArray(arr) || !arr.length) throw new Error();
          const keys = Object.keys(arr[0]);
          const replacer = (key, value) => value === null ? '' : value;
          const csv = [
            keys.join(','),
            ...arr.map(row => keys.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
          ].join('\\r\\n');
          el.querySelector('#jc-out').value = csv.replace(/"/g, '');
        } catch(err) {
          el.querySelector('#jc-out').value = 'Invalid JSON array of objects';
        }
      });
      el.querySelector('#jc-copy').addEventListener('click', () => navigator.clipboard.writeText(el.querySelector('#jc-out').value));
    }
  },
  {
    id: 'base32-encode',
    name: 'Base32 Encoder',
    desc: 'Encode plain text into Base32 format.',
    icon: '🔠',
    category: 'developer',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io">
          <div class="io-box">
            <label class="io-label">Text Input</label>
            <textarea id="b32e-in" class="io-textarea" autofocus></textarea>
          </div>
          <div class="io-box io-output" id="b32e-out-box">
            <label class="io-label">Base32 Output</label>
            <textarea id="b32e-out" class="io-textarea font-mono" readonly></textarea>
            <div class="action-row">
              <button class="cyber-btn" id="b32e-copy">Copy</button>
            </div>
          </div>
        </div>
      `;
      const b32Alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
      el.querySelector('#b32e-in').addEventListener('input', e => {
        const str = e.target.value;
        let bytes = new TextEncoder().encode(str);
        let base32 = '';
        let bits = 0;
        let value = 0;
        for (let i = 0; i < bytes.length; i++) {
          value = (value << 8) | bytes[i];
          bits += 8;
          while (bits >= 5) {
            base32 += b32Alphabet[(value >>> (bits - 5)) & 31];
            bits -= 5;
          }
        }
        if (bits > 0) {
          base32 += b32Alphabet[(value << (5 - bits)) & 31];
        }
        while (base32.length % 8 !== 0) base32 += '=';
        el.querySelector('#b32e-out').value = str ? base32 : '';
      });
      el.querySelector('#b32e-copy').addEventListener('click', () => navigator.clipboard.writeText(el.querySelector('#b32e-out').value));
    }
  },
  {
    id: 'base32-decode',
    name: 'Base32 Decoder',
    desc: 'Decode Base32 string back to plain text.',
    icon: '🔡',
    category: 'developer',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io">
          <div class="io-box">
            <label class="io-label">Base32 Input</label>
            <textarea id="b32d-in" class="io-textarea font-mono" autofocus></textarea>
          </div>
          <div class="io-box io-output" id="b32d-out-box">
            <label class="io-label">Text Output</label>
            <textarea id="b32d-out" class="io-textarea" readonly></textarea>
            <div class="action-row">
              <button class="cyber-btn" id="b32d-copy">Copy</button>
            </div>
          </div>
        </div>
      `;
      const b32Map = {};
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'.split('').forEach((c, i) => b32Map[c] = i);
      el.querySelector('#b32d-in').addEventListener('input', e => {
        try {
          const str = e.target.value.replace(/=+$/, '').toUpperCase();
          let bits = 0;
          let value = 0;
          let bytes = [];
          for (let i = 0; i < str.length; i++) {
            if(!b32Map.hasOwnProperty(str[i])) continue;
            value = (value << 5) | b32Map[str[i]];
            bits += 5;
            if (bits >= 8) {
              bytes.push((value >>> (bits - 8)) & 255);
              bits -= 8;
            }
          }
          el.querySelector('#b32d-out').value = str ? new TextDecoder().decode(new Uint8Array(bytes)) : '';
        } catch(err) {
          el.querySelector('#b32d-out').value = 'Invalid Base32 string';
        }
      });
      el.querySelector('#b32d-copy').addEventListener('click', () => navigator.clipboard.writeText(el.querySelector('#b32d-out').value));
    }
  },
  {
    id: 'rot13',
    name: 'ROT13 Encoder/Decoder',
    desc: 'Apply ROT13 cipher to text (encrypts and decrypts).',
    icon: '🔄',
    category: 'security',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io">
          <div class="io-box">
            <label class="io-label">Input Text</label>
            <textarea id="rot-in" class="io-textarea" autofocus placeholder="Hello World"></textarea>
          </div>
          <div class="io-box io-output" id="rot-out-box">
            <label class="io-label">ROT13 Output</label>
            <textarea id="rot-out" class="io-textarea" readonly></textarea>
            <div class="action-row">
              <button class="cyber-btn" id="rot-copy">Copy</button>
            </div>
          </div>
        </div>
      `;
      el.querySelector('#rot-in').addEventListener('input', e => {
        const res = e.target.value.replace(/[a-zA-Z]/g, function(c){
          return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
        });
        el.querySelector('#rot-out').value = res;
      });
      el.querySelector('#rot-copy').addEventListener('click', () => navigator.clipboard.writeText(el.querySelector('#rot-out').value));
    }
  },
  {
    id: 'text-to-binary',
    name: 'Text to Binary',
    desc: 'Convert plain text into binary code (0s and 1s).',
    icon: '0️⃣',
    category: 'converter',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io">
          <div class="io-box">
            <label class="io-label">Text Input</label>
            <textarea id="t2b-in" class="io-textarea" autofocus placeholder="Hello"></textarea>
          </div>
          <div class="io-box io-output" id="t2b-out-box">
            <label class="io-label">Binary Output</label>
            <textarea id="t2b-out" class="io-textarea font-mono" readonly></textarea>
            <div class="action-row">
              <button class="cyber-btn" id="t2b-copy">Copy</button>
            </div>
          </div>
        </div>
      `;
      el.querySelector('#t2b-in').addEventListener('input', e => {
        el.querySelector('#t2b-out').value = e.target.value.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
      });
      el.querySelector('#t2b-copy').addEventListener('click', () => navigator.clipboard.writeText(el.querySelector('#t2b-out').value));
    }
  },
  {
    id: 'binary-to-text',
    name: 'Binary to Text',
    desc: 'Convert binary code back into readable text.',
    icon: '🅰️',
    category: 'converter',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io">
          <div class="io-box">
            <label class="io-label">Binary Input</label>
            <textarea id="b2t-in" class="io-textarea font-mono" autofocus placeholder="01001000 01100101 01101100 01101100 01101111"></textarea>
          </div>
          <div class="io-box io-output" id="b2t-out-box">
            <label class="io-label">Text Output</label>
            <textarea id="b2t-out" class="io-textarea" readonly></textarea>
            <div class="action-row">
              <button class="cyber-btn" id="b2t-copy">Copy</button>
            </div>
          </div>
        </div>
      `;
      el.querySelector('#b2t-in').addEventListener('input', e => {
        try {
          const bin = e.target.value.replace(/[^01]/g, '');
          if(bin.length === 0) { el.querySelector('#b2t-out').value = ''; return; }
          let str = '';
          for(let i=0; i<bin.length; i+=8) {
            const byte = bin.slice(i, i+8);
            if(byte.length === 8) str += String.fromCharCode(parseInt(byte, 2));
          }
          el.querySelector('#b2t-out').value = str;
        } catch(err) {
           el.querySelector('#b2t-out').value = 'Invalid binary';
        }
      });
      el.querySelector('#b2t-copy').addEventListener('click', () => navigator.clipboard.writeText(el.querySelector('#b2t-out').value));
    }
  },
  {
    id: 'text-to-hex',
    name: 'Text to Hex',
    desc: 'Convert plain text into hexadecimal values.',
    icon: '#️⃣',
    category: 'converter',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io">
          <div class="io-box">
            <label class="io-label">Text Input</label>
            <textarea id="t2h-in" class="io-textarea" autofocus placeholder="Hello"></textarea>
          </div>
          <div class="io-box io-output" id="t2h-out-box">
            <label class="io-label">Hex Output</label>
            <textarea id="t2h-out" class="io-textarea font-mono" readonly></textarea>
            <div class="action-row">
              <button class="cyber-btn" id="t2h-copy">Copy</button>
            </div>
          </div>
        </div>
      `;
      el.querySelector('#t2h-in').addEventListener('input', e => {
        el.querySelector('#t2h-out').value = e.target.value.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
      });
      el.querySelector('#t2h-copy').addEventListener('click', () => navigator.clipboard.writeText(el.querySelector('#t2h-out').value));
    }
  },
  {
    id: 'hex-to-text',
    name: 'Hex to Text',
    desc: 'Convert hexadecimal string back into readable text.',
    icon: '🆎',
    category: 'converter',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io">
          <div class="io-box">
            <label class="io-label">Hex Input</label>
            <textarea id="h2t-in" class="io-textarea font-mono" autofocus placeholder="48 65 6c 6c 6f"></textarea>
          </div>
          <div class="io-box io-output" id="h2t-out-box">
            <label class="io-label">Text Output</label>
            <textarea id="h2t-out" class="io-textarea" readonly></textarea>
            <div class="action-row">
              <button class="cyber-btn" id="h2t-copy">Copy</button>
            </div>
          </div>
        </div>
      `;
      el.querySelector('#h2t-in').addEventListener('input', e => {
        try {
          const hex = e.target.value.replace(/[^0-9a-fA-F]/g, '');
          if(hex.length === 0) { el.querySelector('#h2t-out').value = ''; return; }
          let str = '';
          for (let i = 0; i < hex.length; i += 2) {
            const byte = hex.slice(i, i+2);
            if(byte.length === 2) str += String.fromCharCode(parseInt(byte, 16));
          }
          el.querySelector('#h2t-out').value = str;
        } catch(err) {
          el.querySelector('#h2t-out').value = 'Invalid hex';
        }
      });
      el.querySelector('#h2t-copy').addEventListener('click', () => navigator.clipboard.writeText(el.querySelector('#h2t-out').value));
    }
  },
  {
    id: 'glassmorphism-gen',
    name: 'Glassmorphism Generator',
    desc: 'Generate CSS for the trendy frosted glass effect.',
    icon: '🧊',
    category: 'color',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io" style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; align-items: start;">
          <div class="io-box">
            <label class="io-label">Blur (<span id="gl-b-val">10</span>px)</label>
            <input type="range" id="gl-b" min="0" max="40" value="10" style="width:100%">
            
            <label class="io-label" style="margin-top:12px;">Transparency (<span id="gl-t-val">0.2</span>)</label>
            <input type="range" id="gl-t" min="0" max="1" step="0.05" value="0.2" style="width:100%">
            
            <label class="io-label" style="margin-top:12px;">Color</label>
            <input type="color" id="gl-c" value="#ffffff" class="io-input" style="height:40px; padding:2px;">
          </div>
          
          <div class="io-box" style="background: linear-gradient(135deg, #1f005c, #5b0060, #870160, #ac255e, #ca485c, #e16b5c, #f39060, #ffb56b); position:relative; height: 200px; display:flex; align-items:center; justify-content:center; border-radius: 8px;">
             <div id="gl-preview" style="width: 70%; height: 60%; border-radius: 10px; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:bold; font-family:sans-serif;">Preview</div>
          </div>
        </div>
        <div class="io-box mt-3" style="width:100%">
          <label class="io-label">CSS Code</label>
          <textarea id="gl-css" class="io-textarea font-mono" style="height:100px" readonly></textarea>
          <div class="action-row">
            <button class="cyber-btn" id="gl-copy">Copy CSS</button>
          </div>
        </div>
      `;
      function hexToRgb(hex) {
        var result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
        return result ? parseInt(result[1], 16) + ', ' + parseInt(result[2], 16) + ', ' + parseInt(result[3], 16) : null;
      }
      function updateGlass() {
        const b = el.querySelector('#gl-b').value;
        const t = el.querySelector('#gl-t').value;
        const c = el.querySelector('#gl-c').value;
        
        el.querySelector('#gl-b-val').textContent = b;
        el.querySelector('#gl-t-val').textContent = t;
        
        const rgb = hexToRgb(c);
        const css = `background: rgba(${rgb}, ${t});\\nbackdrop-filter: blur(${b}px);\\n-webkit-backdrop-filter: blur(${b}px);\\nborder: 1px solid rgba(255, 255, 255, 0.3);`;
        
        el.querySelector('#gl-preview').style = css + '; width: 70%; height: 60%; border-radius: 10px; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:bold; font-family:sans-serif; text-shadow: 0 1px 2px rgba(0,0,0,0.2);';
        el.querySelector('#gl-css').value = css;
      }
      el.querySelectorAll('#gl-b, #gl-t, #gl-c').forEach(i => i.addEventListener('input', updateGlass));
      el.querySelector('#gl-copy').addEventListener('click', () => navigator.clipboard.writeText(el.querySelector('#gl-css').value));
      updateGlass();
    }
  },
  {
    id: 'box-shadow-gen',
    name: 'CSS Box Shadow Generator',
    desc: 'Visually generate CSS box shadows.',
    icon: '🔲',
    category: 'web',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io" style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; align-items: start;">
          <div class="io-box">
            <label class="io-label">H-Offset (<span id="bs-h-val">0</span>px)</label>
            <input type="range" id="bs-h" min="-50" max="50" value="0" style="width:100%">
            
            <label class="io-label" style="margin-top:12px;">V-Offset (<span id="bs-v-val">10</span>px)</label>
            <input type="range" id="bs-v" min="-50" max="50" value="10" style="width:100%">
            
            <label class="io-label" style="margin-top:12px;">Blur (<span id="bs-b-val">20</span>px)</label>
            <input type="range" id="bs-b" min="0" max="100" value="20" style="width:100%">
            
            <label class="io-label" style="margin-top:12px;">Spread (<span id="bs-s-val">0</span>px)</label>
            <input type="range" id="bs-s" min="-50" max="50" value="0" style="width:100%">
            
            <label class="io-label" style="margin-top:12px;">Color & Opacity</label>
            <div style="display:flex; gap:10px;">
              <input type="color" id="bs-c" value="#000000" class="io-input" style="height:40px; padding:2px; flex:1">
              <input type="range" id="bs-o" min="0" max="1" step="0.05" value="0.2" style="flex:2">
            </div>
          </div>
          
          <div class="io-box" style="background: var(--bg-card); position:relative; height: 320px; display:flex; align-items:center; justify-content:center; border-radius: 8px;">
             <div id="bs-preview" style="width: 150px; height: 150px; background: var(--bg); border-radius: 10px;"></div>
          </div>
        </div>
        <div class="io-box mt-3" style="width:100%">
          <label class="io-label">CSS Code</label>
          <textarea id="bs-css" class="io-textarea font-mono" style="height:60px" readonly></textarea>
          <div class="action-row">
            <button class="cyber-btn" id="bs-copy">Copy CSS</button>
          </div>
        </div>
      `;
      function hexToRgb(hex) {
        var result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
        return result ? parseInt(result[1], 16) + ', ' + parseInt(result[2], 16) + ', ' + parseInt(result[3], 16) : null;
      }
      function updateShadow() {
        const h = el.querySelector('#bs-h').value;
        const v = el.querySelector('#bs-v').value;
        const b = el.querySelector('#bs-b').value;
        const s = el.querySelector('#bs-s').value;
        const c = el.querySelector('#bs-c').value;
        const o = el.querySelector('#bs-o').value;
        
        el.querySelector('#bs-h-val').textContent = h;
        el.querySelector('#bs-v-val').textContent = v;
        el.querySelector('#bs-b-val').textContent = b;
        el.querySelector('#bs-s-val').textContent = s;
        
        const rgb = hexToRgb(c);
        const css = `box-shadow: ${h}px ${v}px ${b}px ${s}px rgba(${rgb}, ${o});`;
        
        el.querySelector('#bs-preview').style.boxShadow = `${h}px ${v}px ${b}px ${s}px rgba(${rgb}, ${o})`;
        el.querySelector('#bs-css').value = css + '\\n-webkit-' + css + '\\n-moz-' + css;
      }
      el.querySelectorAll('input').forEach(i => i.addEventListener('input', updateShadow));
      el.querySelector('#bs-copy').addEventListener('click', () => navigator.clipboard.writeText(el.querySelector('#bs-css').value));
      updateShadow();
    }
  },
  {
    id: 'meta-tags-gen',
    name: 'Meta Tags Generator',
    desc: 'Generate standard SEO HTML meta tags.',
    icon: '🔍',
    category: 'web',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io">
          <div class="io-box">
            <label class="io-label">Site Title</label>
            <input type="text" id="mt-t" class="io-input" placeholder="My Awesome Site">
            <label class="io-label" style="margin-top:12px;">Description</label>
            <textarea id="mt-d" class="io-textarea" style="height:60px" placeholder="The best site on the internet..."></textarea>
            <label class="io-label" style="margin-top:12px;">Keywords (comma separated)</label>
            <input type="text" id="mt-k" class="io-input" placeholder="tools, web, free">
            <label class="io-label" style="margin-top:12px;">Author</label>
            <input type="text" id="mt-a" class="io-input" placeholder="John Doe">
          </div>
          <div class="io-box io-output" id="mt-out-box">
            <label class="io-label">HTML Head Tags</label>
            <textarea id="mt-out" class="io-textarea font-mono" style="height:200px" readonly></textarea>
            <div class="action-row">
              <button class="cyber-btn" id="mt-copy">Copy HTML</button>
            </div>
          </div>
        </div>
      `;
      function genMeta() {
        const t = el.querySelector('#mt-t').value.trim();
        const d = el.querySelector('#mt-d').value.trim();
        const k = el.querySelector('#mt-k').value.trim();
        const a = el.querySelector('#mt-a').value.trim();
        
        let html = '';
        if(t) html += `<title>${t}</title>\\n`;
        if(t) html += `<meta name="title" content="${t}">\\n`;
        if(d) html += `<meta name="description" content="${d}">\\n`;
        if(k) html += `<meta name="keywords" content="${k}">\\n`;
        if(a) html += `<meta name="author" content="${a}">\\n`;
        html += '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
        
        el.querySelector('#mt-out').value = html;
      }
      el.querySelectorAll('input, textarea').forEach(i => i.addEventListener('input', genMeta));
      el.querySelector('#mt-copy').addEventListener('click', () => navigator.clipboard.writeText(el.querySelector('#mt-out').value));
      genMeta();
    }
  },
  {
    id: 'open-graph-gen',
    name: 'Open Graph Generator',
    desc: 'Generate Facebook & LinkedIn Open Graph meta tags.',
    icon: '🌐',
    category: 'web',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io">
          <div class="io-box">
            <label class="io-label">OG Title</label>
            <input type="text" id="og-t" class="io-input" placeholder="Article Title">
            <label class="io-label" style="margin-top:12px;">OG Description</label>
            <textarea id="og-d" class="io-textarea" style="height:60px" placeholder="Summary of page..."></textarea>
            <label class="io-label" style="margin-top:12px;">OG Image URL</label>
            <input type="url" id="og-i" class="io-input" placeholder="https://example.com/image.jpg">
            <label class="io-label" style="margin-top:12px;">OG URL</label>
            <input type="url" id="og-u" class="io-input" placeholder="https://example.com/page">
            <label class="io-label" style="margin-top:12px;">OG Type</label>
            <select id="og-ty" class="io-input">
              <option value="website">website</option>
              <option value="article">article</option>
            </select>
          </div>
          <div class="io-box io-output" id="og-out-box">
            <label class="io-label">HTML Head Tags</label>
            <textarea id="og-out" class="io-textarea font-mono" style="height:200px" readonly></textarea>
            <div class="action-row">
              <button class="cyber-btn" id="og-copy">Copy HTML</button>
            </div>
          </div>
        </div>
      `;
      function genOg() {
        const t = el.querySelector('#og-t').value.trim();
        const d = el.querySelector('#og-d').value.trim();
        const i = el.querySelector('#og-i').value.trim();
        const u = el.querySelector('#og-u').value.trim();
        const ty = el.querySelector('#og-ty').value;
        
        let html = `<!-- Open Graph / Facebook -->\\n<meta property="og:type" content="${ty}">\\n`;
        if(u) html += `<meta property="og:url" content="${u}">\\n`;
        if(t) html += `<meta property="og:title" content="${t}">\\n`;
        if(d) html += `<meta property="og:description" content="${d}">\\n`;
        if(i) html += `<meta property="og:image" content="${i}">\\n`;
        
        el.querySelector('#og-out').value = html;
      }
      el.querySelectorAll('input, textarea, select').forEach(i => i.addEventListener('input', genOg));
      el.querySelector('#og-copy').addEventListener('click', () => navigator.clipboard.writeText(el.querySelector('#og-out').value));
      genOg();
    }
  },
  {
    id: 'twitter-card-gen',
    name: 'Twitter Card Generator',
    desc: 'Generate Twitter Card meta tags for rich tweets.',
    icon: '🟦',
    category: 'web',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io">
          <div class="io-box">
            <label class="io-label">Card Type</label>
            <select id="tc-ty" class="io-input">
              <option value="summary_large_image">Summary Large Image</option>
              <option value="summary">Summary (Small Image)</option>
              <option value="app">App</option>
            </select>
            <label class="io-label" style="margin-top:12px;">Title</label>
            <input type="text" id="tc-t" class="io-input" placeholder="Page Title">
            <label class="io-label" style="margin-top:12px;">Description</label>
            <textarea id="tc-d" class="io-textarea" style="height:60px" placeholder="Page summary..."></textarea>
            <label class="io-label" style="margin-top:12px;">Image URL</label>
            <input type="url" id="tc-i" class="io-input" placeholder="https://example.com/image.jpg">
            <label class="io-label" style="margin-top:12px;">Twitter Handle (e.g. @username)</label>
            <input type="text" id="tc-u" class="io-input" placeholder="@yourhandle">
          </div>
          <div class="io-box io-output" id="tc-out-box">
            <label class="io-label">HTML Head Tags</label>
            <textarea id="tc-out" class="io-textarea font-mono" style="height:200px" readonly></textarea>
            <div class="action-row">
              <button class="cyber-btn" id="tc-copy">Copy HTML</button>
            </div>
          </div>
        </div>
      `;
      function genTc() {
        const t = el.querySelector('#tc-t').value.trim();
        const d = el.querySelector('#tc-d').value.trim();
        const i = el.querySelector('#tc-i').value.trim();
        const u = el.querySelector('#tc-u').value.trim();
        const ty = el.querySelector('#tc-ty').value;
        
        let html = `<!-- Twitter -->\\n<meta property="twitter:card" content="${ty}">\\n`;
        if(u) html += `<meta property="twitter:site" content="${u}">\\n`;
        if(t) html += `<meta property="twitter:title" content="${t}">\\n`;
        if(d) html += `<meta property="twitter:description" content="${d}">\\n`;
        if(i) html += `<meta property="twitter:image" content="${i}">\\n`;
        
        el.querySelector('#tc-out').value = html;
      }
      el.querySelectorAll('input, textarea, select').forEach(i => i.addEventListener('input', genTc));
      el.querySelector('#tc-copy').addEventListener('click', () => navigator.clipboard.writeText(el.querySelector('#tc-out').value));
      genTc();
    }
  },
  {
    id: 'keyword-density',
    name: 'Keyword Density Checker',
    desc: 'Analyze text to find the most frequently used words.',
    icon: '📈',
    category: 'text',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io">
          <div class="io-box">
            <label class="io-label">Input Text</label>
            <textarea id="kd-in" class="io-textarea" style="height:200px" autofocus placeholder="Paste article text here..."></textarea>
          </div>
          <div class="io-box io-output" id="kd-out-box">
            <label class="io-label">Top Keywords</label>
            <div id="kd-out" class="io-textarea" style="height:200px; overflow-y:auto; background:var(--bg-card); padding:12px;"></div>
          </div>
        </div>
      `;
      const stopWords = new Set(["a","about","above","after","again","against","all","am","an","and","any","are","arent","as","at","be","because","been","before","being","below","between","both","but","by","cant","cannot","could","couldnt","did","didnt","do","does","doesnt","doing","dont","down","during","each","few","for","from","further","had","hadnt","has","hasnt","have","havent","having","he","hed","hell","hes","her","here","heres","hers","herself","him","himself","his","how","hows","i","id","ill","im","ive","if","in","into","is","isnt","it","its","itself","lets","me","more","most","mustnt","my","myself","no","nor","not","of","off","on","once","only","or","other","ought","our","ours","ourselves","out","over","own","same","shant","she","shed","shell","shes","should","shouldnt","so","some","such","than","that","thats","the","their","theirs","them","themselves","then","there","theres","these","they","theyd","theyll","theyre","theyve","this","those","through","to","too","under","until","up","very","was","wasnt","we","wed","well","were","weve","were","werent","what","whats","when","whens","where","wheres","which","while","who","whos","whom","why","whys","with","wont","would","wouldnt","you","youd","youll","youre","youve","your","yours","yourself","yourselves"]);
      
      el.querySelector('#kd-in').addEventListener('input', e => {
        const text = e.target.value.toLowerCase().replace(/[^a-z0-9\\s]/g, ' ');
        const words = text.split(/\\s+/).filter(w => w.length > 1 && !stopWords.has(w));
        const total = words.length;
        
        const counts = {};
        words.forEach(w => counts[w] = (counts[w] || 0) + 1);
        
        const sorted = Object.entries(counts).sort((a,b) => b[1] - a[1]).slice(0, 20);
        
        let html = '<table style="width:100%; text-align:left; border-collapse:collapse;"><tr><th style="padding-bottom:8px; border-bottom:1px solid var(--border)">Word</th><th style="padding-bottom:8px; border-bottom:1px solid var(--border)">Count</th><th style="padding-bottom:8px; border-bottom:1px solid var(--border)">Density</th></tr>';
        
        if(total === 0) {
           el.querySelector('#kd-out').innerHTML = '';
           return;
        }
        
        sorted.forEach(([word, count]) => {
          const density = ((count / total) * 100).toFixed(1) + '%';
          html += `<tr><td style="padding:6px 0">${word}</td><td style="padding:6px 0">${count}</td><td style="padding:6px 0">${density}</td></tr>`;
        });
        html += '</table>';
        el.querySelector('#kd-out').innerHTML = html;
      });
    }
  },
  {
    id: 'text-to-emoji',
    name: 'Text to Emoji',
    desc: 'Replace words with matching emojis.',
    icon: '😀',
    category: 'text',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io">
          <div class="io-box">
            <label class="io-label">Input Text</label>
            <textarea id="te-in" class="io-textarea" autofocus placeholder="I love pizza and cats"></textarea>
          </div>
          <div class="io-box io-output" id="te-out-box">
            <label class="io-label">Emojified Output</label>
            <textarea id="te-out" class="io-textarea" readonly></textarea>
            <div class="action-row">
              <button class="cyber-btn" id="te-copy">Copy Emojis</button>
            </div>
          </div>
        </div>
      `;
      const emojiMap = {
        'love': '❤️', 'heart': '❤️', 'pizza': '🍕', 'cat': '🐱', 'cats': '🐱', 'dog': '🐶', 'dogs': '🐶',
        'happy': '😊', 'sad': '😢', 'fire': '🔥', 'hot': '🔥', 'cool': '😎', 'sun': '☀️', 'moon': '🌙',
        'star': '⭐', 'money': '💰', 'car': '🚗', 'world': '🌍', 'earth': '🌍', 'time': '⏰',
        'book': '📖', 'music': '🎵', 'food': '🍔', 'drink': '🥤', 'coffee': '☕', 'beer': '🍺',
        'computer': '💻', 'phone': '📱', 'camera': '📷', 'game': '🎮', 'laugh': '😂', 'lol': '😂',
        'crying': '😭', 'angry': '😡', 'sleep': '😴', 'check': '✅', 'cross': '❌', 'idea': '💡'
      };
      el.querySelector('#te-in').addEventListener('input', e => {
        const text = e.target.value;
        const emojified = text.split(/\\b/).map(word => {
          const cleanWord = word.toLowerCase();
          return emojiMap[cleanWord] ? emojiMap[cleanWord] : word;
        }).join('');
        el.querySelector('#te-out').value = emojified;
      });
      el.querySelector('#te-copy').addEventListener('click', () => navigator.clipboard.writeText(el.querySelector('#te-out').value));
    }
  }
);
