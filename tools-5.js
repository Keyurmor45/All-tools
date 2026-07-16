window.TOOLS.push(
{
  id: 'text-upper',
  name: 'Uppercase',
  desc: 'Quickly uppercase for any text input.',
  icon: '📝',
  category: 'text',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Input Text</label>
          <textarea class="io-textarea" id="in-val" autofocus></textarea>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <textarea class="io-textarea" id="out-val" readonly></textarea>
          <div class="action-row"><button class="cyber-btn" id="copy-btn">Copy</button></div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const t = inn.value;
      if(!t) { out.value = ''; return; }
      try {
        const func = () => { return t.toUpperCase(); };
        out.value = func();
      } catch(e) { out.value = 'Error'; }
    });
    el.querySelector('#copy-btn').addEventListener('click', () => navigator.clipboard.writeText(out.value));
  }
},
{
  id: 'text-lower',
  name: 'Lowercase',
  desc: 'Quickly lowercase for any text input.',
  icon: '📝',
  category: 'text',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Input Text</label>
          <textarea class="io-textarea" id="in-val" autofocus></textarea>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <textarea class="io-textarea" id="out-val" readonly></textarea>
          <div class="action-row"><button class="cyber-btn" id="copy-btn">Copy</button></div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const t = inn.value;
      if(!t) { out.value = ''; return; }
      try {
        const func = () => { return t.toLowerCase(); };
        out.value = func();
      } catch(e) { out.value = 'Error'; }
    });
    el.querySelector('#copy-btn').addEventListener('click', () => navigator.clipboard.writeText(out.value));
  }
},
{
  id: 'text-capitalize',
  name: 'Capitalize Words',
  desc: 'Quickly capitalize words for any text input.',
  icon: '📝',
  category: 'text',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Input Text</label>
          <textarea class="io-textarea" id="in-val" autofocus></textarea>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <textarea class="io-textarea" id="out-val" readonly></textarea>
          <div class="action-row"><button class="cyber-btn" id="copy-btn">Copy</button></div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const t = inn.value;
      if(!t) { out.value = ''; return; }
      try {
        const func = () => { return t.replace(/\\b\\w/g, c => c.toUpperCase()); };
        out.value = func();
      } catch(e) { out.value = 'Error'; }
    });
    el.querySelector('#copy-btn').addEventListener('click', () => navigator.clipboard.writeText(out.value));
  }
},
{
  id: 'text-reverse',
  name: 'Reverse Text',
  desc: 'Quickly reverse text for any text input.',
  icon: '📝',
  category: 'text',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Input Text</label>
          <textarea class="io-textarea" id="in-val" autofocus></textarea>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <textarea class="io-textarea" id="out-val" readonly></textarea>
          <div class="action-row"><button class="cyber-btn" id="copy-btn">Copy</button></div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const t = inn.value;
      if(!t) { out.value = ''; return; }
      try {
        const func = () => { return t.split("").reverse().join(""); };
        out.value = func();
      } catch(e) { out.value = 'Error'; }
    });
    el.querySelector('#copy-btn').addEventListener('click', () => navigator.clipboard.writeText(out.value));
  }
},
{
  id: 'text-reverse-words',
  name: 'Reverse Words',
  desc: 'Quickly reverse words for any text input.',
  icon: '📝',
  category: 'text',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Input Text</label>
          <textarea class="io-textarea" id="in-val" autofocus></textarea>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <textarea class="io-textarea" id="out-val" readonly></textarea>
          <div class="action-row"><button class="cyber-btn" id="copy-btn">Copy</button></div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const t = inn.value;
      if(!t) { out.value = ''; return; }
      try {
        const func = () => { return t.split(" ").reverse().join(" "); };
        out.value = func();
      } catch(e) { out.value = 'Error'; }
    });
    el.querySelector('#copy-btn').addEventListener('click', () => navigator.clipboard.writeText(out.value));
  }
},
{
  id: 'text-no-spaces',
  name: 'Remove Spaces',
  desc: 'Quickly remove spaces for any text input.',
  icon: '📝',
  category: 'text',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Input Text</label>
          <textarea class="io-textarea" id="in-val" autofocus></textarea>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <textarea class="io-textarea" id="out-val" readonly></textarea>
          <div class="action-row"><button class="cyber-btn" id="copy-btn">Copy</button></div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const t = inn.value;
      if(!t) { out.value = ''; return; }
      try {
        const func = () => { return t.replace(/\\s/g, ""); };
        out.value = func();
      } catch(e) { out.value = 'Error'; }
    });
    el.querySelector('#copy-btn').addEventListener('click', () => navigator.clipboard.writeText(out.value));
  }
},
{
  id: 'text-no-vowels',
  name: 'Remove Vowels',
  desc: 'Quickly remove vowels for any text input.',
  icon: '📝',
  category: 'text',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Input Text</label>
          <textarea class="io-textarea" id="in-val" autofocus></textarea>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <textarea class="io-textarea" id="out-val" readonly></textarea>
          <div class="action-row"><button class="cyber-btn" id="copy-btn">Copy</button></div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const t = inn.value;
      if(!t) { out.value = ''; return; }
      try {
        const func = () => { return t.replace(/[aeiouAEIOU]/g, ""); };
        out.value = func();
      } catch(e) { out.value = 'Error'; }
    });
    el.querySelector('#copy-btn').addEventListener('click', () => navigator.clipboard.writeText(out.value));
  }
},
{
  id: 'text-no-consonants',
  name: 'Remove Consonants',
  desc: 'Quickly remove consonants for any text input.',
  icon: '📝',
  category: 'text',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Input Text</label>
          <textarea class="io-textarea" id="in-val" autofocus></textarea>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <textarea class="io-textarea" id="out-val" readonly></textarea>
          <div class="action-row"><button class="cyber-btn" id="copy-btn">Copy</button></div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const t = inn.value;
      if(!t) { out.value = ''; return; }
      try {
        const func = () => { return t.replace(/[^aeiouAEIOU\\s]/g, ""); };
        out.value = func();
      } catch(e) { out.value = 'Error'; }
    });
    el.querySelector('#copy-btn').addEventListener('click', () => navigator.clipboard.writeText(out.value));
  }
},
{
  id: 'text-snake',
  name: 'Snake Case',
  desc: 'Quickly snake case for any text input.',
  icon: '📝',
  category: 'text',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Input Text</label>
          <textarea class="io-textarea" id="in-val" autofocus></textarea>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <textarea class="io-textarea" id="out-val" readonly></textarea>
          <div class="action-row"><button class="cyber-btn" id="copy-btn">Copy</button></div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const t = inn.value;
      if(!t) { out.value = ''; return; }
      try {
        const func = () => { return t.trim().toLowerCase().replace(/\\s+/g, "_"); };
        out.value = func();
      } catch(e) { out.value = 'Error'; }
    });
    el.querySelector('#copy-btn').addEventListener('click', () => navigator.clipboard.writeText(out.value));
  }
},
{
  id: 'text-kebab',
  name: 'Kebab Case',
  desc: 'Quickly kebab case for any text input.',
  icon: '📝',
  category: 'text',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Input Text</label>
          <textarea class="io-textarea" id="in-val" autofocus></textarea>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <textarea class="io-textarea" id="out-val" readonly></textarea>
          <div class="action-row"><button class="cyber-btn" id="copy-btn">Copy</button></div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const t = inn.value;
      if(!t) { out.value = ''; return; }
      try {
        const func = () => { return t.trim().toLowerCase().replace(/\\s+/g, "-"); };
        out.value = func();
      } catch(e) { out.value = 'Error'; }
    });
    el.querySelector('#copy-btn').addEventListener('click', () => navigator.clipboard.writeText(out.value));
  }
},
{
  id: 'text-camel',
  name: 'Camel Case',
  desc: 'Quickly camel case for any text input.',
  icon: '📝',
  category: 'text',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Input Text</label>
          <textarea class="io-textarea" id="in-val" autofocus></textarea>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <textarea class="io-textarea" id="out-val" readonly></textarea>
          <div class="action-row"><button class="cyber-btn" id="copy-btn">Copy</button></div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const t = inn.value;
      if(!t) { out.value = ''; return; }
      try {
        const func = () => { return t.replace(/(?:^\\w|[A-Z]|\\b\\w)/g, (w, i) => i === 0 ? w.toLowerCase() : w.toUpperCase()).replace(/\\s+/g, ""); };
        out.value = func();
      } catch(e) { out.value = 'Error'; }
    });
    el.querySelector('#copy-btn').addEventListener('click', () => navigator.clipboard.writeText(out.value));
  }
},
{
  id: 'text-pascal',
  name: 'Pascal Case',
  desc: 'Quickly pascal case for any text input.',
  icon: '📝',
  category: 'text',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Input Text</label>
          <textarea class="io-textarea" id="in-val" autofocus></textarea>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <textarea class="io-textarea" id="out-val" readonly></textarea>
          <div class="action-row"><button class="cyber-btn" id="copy-btn">Copy</button></div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const t = inn.value;
      if(!t) { out.value = ''; return; }
      try {
        const func = () => { return t.replace(/(?:^\\w|[A-Z]|\\b\\w)/g, w => w.toUpperCase()).replace(/\\s+/g, ""); };
        out.value = func();
      } catch(e) { out.value = 'Error'; }
    });
    el.querySelector('#copy-btn').addEventListener('click', () => navigator.clipboard.writeText(out.value));
  }
},
{
  id: 'text-trim',
  name: 'Trim Whitespace',
  desc: 'Quickly trim whitespace for any text input.',
  icon: '📝',
  category: 'text',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Input Text</label>
          <textarea class="io-textarea" id="in-val" autofocus></textarea>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <textarea class="io-textarea" id="out-val" readonly></textarea>
          <div class="action-row"><button class="cyber-btn" id="copy-btn">Copy</button></div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const t = inn.value;
      if(!t) { out.value = ''; return; }
      try {
        const func = () => { return t.trim(); };
        out.value = func();
      } catch(e) { out.value = 'Error'; }
    });
    el.querySelector('#copy-btn').addEventListener('click', () => navigator.clipboard.writeText(out.value));
  }
},
{
  id: 'text-emails',
  name: 'Extract Emails',
  desc: 'Quickly extract emails for any text input.',
  icon: '📝',
  category: 'text',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Input Text</label>
          <textarea class="io-textarea" id="in-val" autofocus></textarea>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <textarea class="io-textarea" id="out-val" readonly></textarea>
          <div class="action-row"><button class="cyber-btn" id="copy-btn">Copy</button></div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const t = inn.value;
      if(!t) { out.value = ''; return; }
      try {
        const func = () => { const m = t.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}/g); return m ? m.join("\\n") : "No emails found"; };
        out.value = func();
      } catch(e) { out.value = 'Error'; }
    });
    el.querySelector('#copy-btn').addEventListener('click', () => navigator.clipboard.writeText(out.value));
  }
},
{
  id: 'text-urls',
  name: 'Extract URLs',
  desc: 'Quickly extract urls for any text input.',
  icon: '📝',
  category: 'text',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Input Text</label>
          <textarea class="io-textarea" id="in-val" autofocus></textarea>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <textarea class="io-textarea" id="out-val" readonly></textarea>
          <div class="action-row"><button class="cyber-btn" id="copy-btn">Copy</button></div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const t = inn.value;
      if(!t) { out.value = ''; return; }
      try {
        const func = () => { const m = t.match(new RegExp("https?://[^\\s]+", "g")); return m ? m.join("\\n") : "No URLs found"; };
        out.value = func();
      } catch(e) { out.value = 'Error'; }
    });
    el.querySelector('#copy-btn').addEventListener('click', () => navigator.clipboard.writeText(out.value));
  }
},
{
  id: 'text-count-vowels',
  name: 'Count Vowels',
  desc: 'Quickly count vowels for any text input.',
  icon: '📝',
  category: 'text',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Input Text</label>
          <textarea class="io-textarea" id="in-val" autofocus></textarea>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <textarea class="io-textarea" id="out-val" readonly></textarea>
          <div class="action-row"><button class="cyber-btn" id="copy-btn">Copy</button></div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const t = inn.value;
      if(!t) { out.value = ''; return; }
      try {
        const func = () => { return (t.match(/[aeiouAEIOU]/g)||[]).length.toString(); };
        out.value = func();
      } catch(e) { out.value = 'Error'; }
    });
    el.querySelector('#copy-btn').addEventListener('click', () => navigator.clipboard.writeText(out.value));
  }
},
{
  id: 'text-count-consonants',
  name: 'Count Consonants',
  desc: 'Quickly count consonants for any text input.',
  icon: '📝',
  category: 'text',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Input Text</label>
          <textarea class="io-textarea" id="in-val" autofocus></textarea>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <textarea class="io-textarea" id="out-val" readonly></textarea>
          <div class="action-row"><button class="cyber-btn" id="copy-btn">Copy</button></div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const t = inn.value;
      if(!t) { out.value = ''; return; }
      try {
        const func = () => { return (t.match(/[^aeiouAEIOU\\s0-9\\W]/gi)||[]).length.toString(); };
        out.value = func();
      } catch(e) { out.value = 'Error'; }
    });
    el.querySelector('#copy-btn').addEventListener('click', () => navigator.clipboard.writeText(out.value));
  }
},
{
  id: 'text-length',
  name: 'String Length',
  desc: 'Quickly string length for any text input.',
  icon: '📝',
  category: 'text',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Input Text</label>
          <textarea class="io-textarea" id="in-val" autofocus></textarea>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <textarea class="io-textarea" id="out-val" readonly></textarea>
          <div class="action-row"><button class="cyber-btn" id="copy-btn">Copy</button></div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const t = inn.value;
      if(!t) { out.value = ''; return; }
      try {
        const func = () => { return t.length.toString(); };
        out.value = func();
      } catch(e) { out.value = 'Error'; }
    });
    el.querySelector('#copy-btn').addEventListener('click', () => navigator.clipboard.writeText(out.value));
  }
},
{
  id: 'text-lines',
  name: 'Count Lines',
  desc: 'Quickly count lines for any text input.',
  icon: '📝',
  category: 'text',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Input Text</label>
          <textarea class="io-textarea" id="in-val" autofocus></textarea>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <textarea class="io-textarea" id="out-val" readonly></textarea>
          <div class="action-row"><button class="cyber-btn" id="copy-btn">Copy</button></div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const t = inn.value;
      if(!t) { out.value = ''; return; }
      try {
        const func = () => { return t.split("\\n").length.toString(); };
        out.value = func();
      } catch(e) { out.value = 'Error'; }
    });
    el.querySelector('#copy-btn').addEventListener('click', () => navigator.clipboard.writeText(out.value));
  }
},
{
  id: 'text-b64-encode',
  name: 'To Base64',
  desc: 'Quickly to base64 for any text input.',
  icon: '📝',
  category: 'text',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Input Text</label>
          <textarea class="io-textarea" id="in-val" autofocus></textarea>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <textarea class="io-textarea" id="out-val" readonly></textarea>
          <div class="action-row"><button class="cyber-btn" id="copy-btn">Copy</button></div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const t = inn.value;
      if(!t) { out.value = ''; return; }
      try {
        const func = () => { return btoa(unescape(encodeURIComponent(t))); };
        out.value = func();
      } catch(e) { out.value = 'Error'; }
    });
    el.querySelector('#copy-btn').addEventListener('click', () => navigator.clipboard.writeText(out.value));
  }
},
{
  id: 'text-b64-decode',
  name: 'From Base64',
  desc: 'Quickly from base64 for any text input.',
  icon: '📝',
  category: 'text',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Input Text</label>
          <textarea class="io-textarea" id="in-val" autofocus></textarea>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <textarea class="io-textarea" id="out-val" readonly></textarea>
          <div class="action-row"><button class="cyber-btn" id="copy-btn">Copy</button></div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const t = inn.value;
      if(!t) { out.value = ''; return; }
      try {
        const func = () => { try { return decodeURIComponent(escape(atob(t))); } catch(e) { return "Invalid Base64"; } };
        out.value = func();
      } catch(e) { out.value = 'Error'; }
    });
    el.querySelector('#copy-btn').addEventListener('click', () => navigator.clipboard.writeText(out.value));
  }
},
{
  id: 'text-url-encode',
  name: 'URL Encode',
  desc: 'Quickly url encode for any text input.',
  icon: '📝',
  category: 'text',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Input Text</label>
          <textarea class="io-textarea" id="in-val" autofocus></textarea>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <textarea class="io-textarea" id="out-val" readonly></textarea>
          <div class="action-row"><button class="cyber-btn" id="copy-btn">Copy</button></div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const t = inn.value;
      if(!t) { out.value = ''; return; }
      try {
        const func = () => { return encodeURIComponent(t); };
        out.value = func();
      } catch(e) { out.value = 'Error'; }
    });
    el.querySelector('#copy-btn').addEventListener('click', () => navigator.clipboard.writeText(out.value));
  }
},
{
  id: 'text-url-decode',
  name: 'URL Decode',
  desc: 'Quickly url decode for any text input.',
  icon: '📝',
  category: 'text',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Input Text</label>
          <textarea class="io-textarea" id="in-val" autofocus></textarea>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <textarea class="io-textarea" id="out-val" readonly></textarea>
          <div class="action-row"><button class="cyber-btn" id="copy-btn">Copy</button></div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const t = inn.value;
      if(!t) { out.value = ''; return; }
      try {
        const func = () => { try { return decodeURIComponent(t); } catch(e) { return "Invalid URL Encoding"; } };
        out.value = func();
      } catch(e) { out.value = 'Error'; }
    });
    el.querySelector('#copy-btn').addEventListener('click', () => navigator.clipboard.writeText(out.value));
  }
},
{
  id: 'text-to-ascii',
  name: 'To ASCII',
  desc: 'Quickly to ascii for any text input.',
  icon: '📝',
  category: 'text',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Input Text</label>
          <textarea class="io-textarea" id="in-val" autofocus></textarea>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <textarea class="io-textarea" id="out-val" readonly></textarea>
          <div class="action-row"><button class="cyber-btn" id="copy-btn">Copy</button></div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const t = inn.value;
      if(!t) { out.value = ''; return; }
      try {
        const func = () => { return t.split("").map(c => c.charCodeAt(0)).join(" "); };
        out.value = func();
      } catch(e) { out.value = 'Error'; }
    });
    el.querySelector('#copy-btn').addEventListener('click', () => navigator.clipboard.writeText(out.value));
  }
},
{
  id: 'text-no-punctuation',
  name: 'Remove Punctuation',
  desc: 'Quickly remove punctuation for any text input.',
  icon: '📝',
  category: 'text',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Input Text</label>
          <textarea class="io-textarea" id="in-val" autofocus></textarea>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <textarea class="io-textarea" id="out-val" readonly></textarea>
          <div class="action-row"><button class="cyber-btn" id="copy-btn">Copy</button></div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const t = inn.value;
      if(!t) { out.value = ''; return; }
      try {
        const func = () => { return t.replace(new RegExp("[.,\\\\/#!$%\\\\^&\\\\*;:{}=\\\\-_`~()]", "g"), ""); };
        out.value = func();
      } catch(e) { out.value = 'Error'; }
    });
    el.querySelector('#copy-btn').addEventListener('click', () => navigator.clipboard.writeText(out.value));
  }
},
{
  id: 'text-double-space',
  name: 'Double Spaced',
  desc: 'Quickly double spaced for any text input.',
  icon: '📝',
  category: 'text',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Input Text</label>
          <textarea class="io-textarea" id="in-val" autofocus></textarea>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <textarea class="io-textarea" id="out-val" readonly></textarea>
          <div class="action-row"><button class="cyber-btn" id="copy-btn">Copy</button></div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const t = inn.value;
      if(!t) { out.value = ''; return; }
      try {
        const func = () => { return t.split("").join(" "); };
        out.value = func();
      } catch(e) { out.value = 'Error'; }
    });
    el.querySelector('#copy-btn').addEventListener('click', () => navigator.clipboard.writeText(out.value));
  }
},
{
  id: 'text-no-numbers',
  name: 'Remove Numbers',
  desc: 'Quickly remove numbers for any text input.',
  icon: '📝',
  category: 'text',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Input Text</label>
          <textarea class="io-textarea" id="in-val" autofocus></textarea>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <textarea class="io-textarea" id="out-val" readonly></textarea>
          <div class="action-row"><button class="cyber-btn" id="copy-btn">Copy</button></div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const t = inn.value;
      if(!t) { out.value = ''; return; }
      try {
        const func = () => { return t.replace(/[0-9]/g, ""); };
        out.value = func();
      } catch(e) { out.value = 'Error'; }
    });
    el.querySelector('#copy-btn').addEventListener('click', () => navigator.clipboard.writeText(out.value));
  }
},
{
  id: 'text-no-letters',
  name: 'Remove Letters',
  desc: 'Quickly remove letters for any text input.',
  icon: '📝',
  category: 'text',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Input Text</label>
          <textarea class="io-textarea" id="in-val" autofocus></textarea>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <textarea class="io-textarea" id="out-val" readonly></textarea>
          <div class="action-row"><button class="cyber-btn" id="copy-btn">Copy</button></div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const t = inn.value;
      if(!t) { out.value = ''; return; }
      try {
        const func = () => { return t.replace(/[a-zA-Z]/g, ""); };
        out.value = func();
      } catch(e) { out.value = 'Error'; }
    });
    el.querySelector('#copy-btn').addEventListener('click', () => navigator.clipboard.writeText(out.value));
  }
},
{
  id: 'text-sort-lines',
  name: 'Sort Lines Alphabetically',
  desc: 'Quickly sort lines alphabetically for any text input.',
  icon: '📝',
  category: 'text',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Input Text</label>
          <textarea class="io-textarea" id="in-val" autofocus></textarea>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <textarea class="io-textarea" id="out-val" readonly></textarea>
          <div class="action-row"><button class="cyber-btn" id="copy-btn">Copy</button></div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const t = inn.value;
      if(!t) { out.value = ''; return; }
      try {
        const func = () => { return t.split("\\n").sort().join("\\n"); };
        out.value = func();
      } catch(e) { out.value = 'Error'; }
    });
    el.querySelector('#copy-btn').addEventListener('click', () => navigator.clipboard.writeText(out.value));
  }
},
{
  id: 'text-sort-lines-rev',
  name: 'Sort Lines Reverse',
  desc: 'Quickly sort lines reverse for any text input.',
  icon: '📝',
  category: 'text',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Input Text</label>
          <textarea class="io-textarea" id="in-val" autofocus></textarea>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <textarea class="io-textarea" id="out-val" readonly></textarea>
          <div class="action-row"><button class="cyber-btn" id="copy-btn">Copy</button></div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const t = inn.value;
      if(!t) { out.value = ''; return; }
      try {
        const func = () => { return t.split("\\n").sort().reverse().join("\\n"); };
        out.value = func();
      } catch(e) { out.value = 'Error'; }
    });
    el.querySelector('#copy-btn').addEventListener('click', () => navigator.clipboard.writeText(out.value));
  }
},
{
  id: 'text-unique-lines',
  name: 'Remove Duplicate Lines',
  desc: 'Quickly remove duplicate lines for any text input.',
  icon: '📝',
  category: 'text',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Input Text</label>
          <textarea class="io-textarea" id="in-val" autofocus></textarea>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <textarea class="io-textarea" id="out-val" readonly></textarea>
          <div class="action-row"><button class="cyber-btn" id="copy-btn">Copy</button></div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const t = inn.value;
      if(!t) { out.value = ''; return; }
      try {
        const func = () => { return [...new Set(t.split("\\n"))].join("\\n"); };
        out.value = func();
      } catch(e) { out.value = 'Error'; }
    });
    el.querySelector('#copy-btn').addEventListener('click', () => navigator.clipboard.writeText(out.value));
  }
},
{
  id: 'text-shuffle-lines',
  name: 'Shuffle Lines',
  desc: 'Quickly shuffle lines for any text input.',
  icon: '📝',
  category: 'text',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Input Text</label>
          <textarea class="io-textarea" id="in-val" autofocus></textarea>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <textarea class="io-textarea" id="out-val" readonly></textarea>
          <div class="action-row"><button class="cyber-btn" id="copy-btn">Copy</button></div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const t = inn.value;
      if(!t) { out.value = ''; return; }
      try {
        const func = () => { const a = t.split("\\n"); for(let i=a.length-1; i>0; i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a.join("\\n"); };
        out.value = func();
      } catch(e) { out.value = 'Error'; }
    });
    el.querySelector('#copy-btn').addEventListener('click', () => navigator.clipboard.writeText(out.value));
  }
}
);
