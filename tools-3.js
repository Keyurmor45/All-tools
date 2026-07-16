/* ================================================================
   tools-3.js — Security (12) + DateTime (12) + Converters (13) + Web (14) = 51 tools
   ================================================================ */
function q3(el,s){return el.querySelector(s);}
function qa3(el,s){return el.querySelectorAll(s);}

/* ================================================================
   SECURITY TOOLS (12)
   ================================================================ */
TOOLS.push(

/* 85 */ {
  id:'password-gen', name:'Password Generator', icon:'🔑', category:'security',
  description:'Generate strong, secure passwords with custom length and character options.',
  tags:['password','generate','secure','strong','random','credentials'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Length <span id="pg-len-val">16</span></label>
        <input type="range" class="tool-range" id="pg-len" min="4" max="128" value="16">
      </div>
      <div class="grid-2 mb-2">
        ${[['pg-upper','Uppercase (A-Z)',true],['pg-lower','Lowercase (a-z)',true],['pg-num','Numbers (0-9)',true],['pg-sym','Symbols (!@#...)',true]].map(([id,label,ch])=>`<label style="display:flex;align-items:center;gap:8px;cursor:pointer;color:var(--text-secondary)"><input type="checkbox" id="${id}" ${ch?'checked':''}> ${label}</label>`).join('')}
      </div>
      <div class="tool-section"><label class="tool-label">Count</label><input class="tool-input" id="pg-count" type="number" value="1" min="1" max="50"></div>
      <button class="cyber-btn" id="pg-gen">Generate Password</button>
      ${outputBlock('pg-out','Generated Password(s)')}
      <div id="pg-strength" class="mt-2" style="display:none">
        <div class="strength-bar"><div class="strength-fill" id="pg-str-fill"></div></div>
        <div id="pg-str-label" style="font-size:.8rem;color:var(--text-muted);margin-top:4px"></div>
      </div>`;
    const UPPER='ABCDEFGHIJKLMNOPQRSTUVWXYZ',LOWER='abcdefghijklmnopqrstuvwxyz',NUMS='0123456789',SYMS='!@#$%^&*()_+-=[]{}|;:,.<>?';
    function generate(){
      let chars='';
      if(q3(el,'#pg-upper').checked)chars+=UPPER;
      if(q3(el,'#pg-lower').checked)chars+=LOWER;
      if(q3(el,'#pg-num').checked)chars+=NUMS;
      if(q3(el,'#pg-sym').checked)chars+=SYMS;
      if(!chars)return '';
      const len=+q3(el,'#pg-len').value;
      const arr=new Uint32Array(len);crypto.getRandomValues(arr);
      return [...arr].map(v=>chars[v%chars.length]).join('');
    }
    q3(el,'#pg-len').addEventListener('input',e=>q3(el,'#pg-len-val').textContent=e.target.value);
    q3(el,'#pg-gen').addEventListener('click',()=>{
      const count=Math.min(50,+q3(el,'#pg-count').value||1);
      const passwords=Array.from({length:count},generate);
      q3(el,'#pg-out').textContent=passwords.join('\n');
      if(count===1){
        const p=passwords[0], str=calcStrength(p);
        q3(el,'#pg-strength').style.display='block';
        q3(el,'#pg-str-fill').style.width=str.pct+'%';
        q3(el,'#pg-str-fill').style.background=str.color;
        q3(el,'#pg-str-label').textContent=str.label;
      }
    });
    q3(el,'#pg-gen').click();
  }
},

/* 86 */ {
  id:'password-strength', name:'Password Strength Checker', icon:'🛡️', category:'security',
  description:'Analyze password strength with entropy calculation and improvement suggestions.',
  tags:['password','strength','check','security','entropy','analyze'],
  setup(el) {
    function calcStrength(p){
      let score=0;
      if(p.length>=8)score+=1; if(p.length>=12)score+=1; if(p.length>=16)score+=1;
      if(/[a-z]/.test(p))score+=1; if(/[A-Z]/.test(p))score+=1;
      if(/[0-9]/.test(p))score+=1; if(/[^a-zA-Z0-9]/.test(p))score+=2;
      if(score<=2)return{pct:20,color:'#ef4444',label:'Very Weak'};
      if(score<=4)return{pct:40,color:'#f97316',label:'Weak'};
      if(score<=5)return{pct:60,color:'var(--yellow)',label:'Fair'};
      if(score<=6)return{pct:80,color:'var(--cyan)',label:'Strong'};
      return{pct:100,color:'var(--emerald)',label:'Very Strong'};
    }
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Enter Password</label>
        <input class="tool-input" id="ps-in" type="password" placeholder="Type your password…">
        <button class="cyber-btn" id="ps-toggle">👁 Show</button>
      </div>
      <div id="ps-result" style="margin-top:12px">
        <div class="strength-bar"><div class="strength-fill" id="ps-fill" style="width:0"></div></div>
        <div id="ps-label" style="margin-top:6px;font-weight:600;color:var(--text-muted)">Enter a password</div>
        <div class="stats-grid mt-2" id="ps-stats"></div>
        <div id="ps-tips" class="mt-2"></div>
      </div>`;
    q3(el,'#ps-toggle').addEventListener('click',function(){const inp=q3(el,'#ps-in');inp.type=inp.type==='password'?'text':'password';this.textContent=inp.type==='password'?'👁 Show':'🔒 Hide';});
    q3(el,'#ps-in').addEventListener('input',function(){
      const p=this.value;
      const str=calcStrength(p);
      const entropy=Math.floor(p.length*Math.log2([/[a-z]/.test(p)?26:0,/[A-Z]/.test(p)?26:0,/[0-9]/.test(p)?10:0,/[^a-zA-Z0-9]/.test(p)?32:0].reduce((a,b)=>a+b,0)||1));
      q3(el,'#ps-fill').style.width=p?str.pct+'%':'0';
      q3(el,'#ps-fill').style.background=str.color;
      q3(el,'#ps-label').textContent=p?str.label:'Enter a password';
      q3(el,'#ps-label').style.color=str.color;
      q3(el,'#ps-stats').innerHTML=p?`<div class="stat-card"><div class="stat-card-num">${p.length}</div><div class="stat-card-label">Length</div></div><div class="stat-card"><div class="stat-card-num">${entropy}</div><div class="stat-card-label">Entropy (bits)</div></div><div class="stat-card"><div class="stat-card-num">${(/[A-Z]/.test(p)?'✓':'✗')}</div><div class="stat-card-label">Uppercase</div></div><div class="stat-card"><div class="stat-card-num">${(/[0-9]/.test(p)?'✓':'✗')}</div><div class="stat-card-label">Numbers</div></div><div class="stat-card"><div class="stat-card-num">${(/[^a-zA-Z0-9]/.test(p)?'✓':'✗')}</div><div class="stat-card-label">Symbols</div></div>`:'';
      const tips=[];
      if(p.length<8)tips.push('Use at least 8 characters');
      if(!/[A-Z]/.test(p))tips.push('Add uppercase letters');
      if(!/[0-9]/.test(p))tips.push('Add numbers');
      if(!/[^a-zA-Z0-9]/.test(p))tips.push('Add symbols (!@#...)');
      if(p.length<12)tips.push('Use 12+ characters for better security');
      q3(el,'#ps-tips').innerHTML=tips.length&&p?`<div class="alert alert-warning">💡 Tips: ${tips.join(' · ')}</div>`:'';
    });
  }
},

/* 87 */ {
  id:'md5-hash', name:'MD5 Hash Generator', icon:'#️⃣', category:'security',
  description:'Generate MD5 hash of any text string. Useful for checksums and data verification.',
  tags:['md5','hash','checksum','digest','security'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Input Text</label>
        <textarea class="tool-textarea" id="md5-in" placeholder="Enter text to hash…"></textarea>
      </div>
      <button class="cyber-btn" id="md5-run">Generate MD5</button>
      ${outputBlock('md5-out','MD5 Hash')}`;
    q3(el,'#md5-run').addEventListener('click',()=>q3(el,'#md5-out').textContent=md5(q3(el,'#md5-in').value));
    q3(el,'#md5-in').addEventListener('input',()=>q3(el,'#md5-out').textContent=md5(q3(el,'#md5-in').value));
  }
},

/* 88 */ {
  id:'sha256-hash', name:'SHA-256 Hash Generator', icon:'🔒', category:'security',
  description:'Generate SHA-256 cryptographic hash of text using the Web Crypto API.',
  tags:['sha256','hash','cryptographic','secure','digest'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Input Text</label>
        <textarea class="tool-textarea" id="s256-in" placeholder="Enter text to hash…"></textarea>
      </div>
      <button class="cyber-btn" id="s256-run">Generate SHA-256</button>
      ${outputBlock('s256-out','SHA-256 Hash')}`;
    async function gen(){const txt=q3(el,'#s256-in').value;q3(el,'#s256-out').textContent=await hashSHA('SHA-256',txt);}
    q3(el,'#s256-run').addEventListener('click',gen);
    q3(el,'#s256-in').addEventListener('input',gen);
  }
},

/* 89 */ {
  id:'sha1-hash', name:'SHA-1 Hash Generator', icon:'🔏', category:'security',
  description:'Generate SHA-1 hash of any text. Note: SHA-1 is deprecated for security use.',
  tags:['sha1','hash','digest','security'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Input Text</label>
        <textarea class="tool-textarea" id="s1-in" placeholder="Enter text to hash…"></textarea>
      </div>
      <button class="cyber-btn" id="s1-run">Generate SHA-1</button>
      <div class="alert alert-warning">⚠️ SHA-1 is deprecated for security use. Use SHA-256 or SHA-3 instead.</div>
      ${outputBlock('s1-out','SHA-1 Hash')}`;
    async function gen(){const txt=q3(el,'#s1-in').value;q3(el,'#s1-out').textContent=await hashSHA('SHA-1',txt);}
    q3(el,'#s1-run').addEventListener('click',gen);
    q3(el,'#s1-in').addEventListener('input',gen);
  }
},

/* 90 */ {
  id:'uuid-gen', name:'UUID Generator', icon:'🆔', category:'security',
  description:'Generate RFC 4122 compliant UUID v4 identifiers for use in your applications.',
  tags:['uuid','guid','unique','identifier','generate','v4'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Count</label>
        <input class="tool-input" id="uuid-count" type="number" value="5" min="1" max="100">
      </div>
      <div class="flex-gap mb-2">
        <label style="display:flex;align-items:center;gap:6px;cursor:pointer;color:var(--text-secondary)"><input type="checkbox" id="uuid-upper"> Uppercase</label>
        <label style="display:flex;align-items:center;gap:6px;cursor:pointer;color:var(--text-secondary)"><input type="checkbox" id="uuid-no-dash"> No hyphens</label>
      </div>
      <button class="cyber-btn" id="uuid-gen-btn">Generate UUIDs</button>
      ${outputBlock('uuid-out','UUID(s)')}`;
    function gen(){
      const count=Math.min(100,+q3(el,'#uuid-count').value||1);
      let uuids=Array.from({length:count},uuidV4);
      if(q3(el,'#uuid-upper').checked)uuids=uuids.map(u=>u.toUpperCase());
      if(q3(el,'#uuid-no-dash').checked)uuids=uuids.map(u=>u.replace(/-/g,''));
      q3(el,'#uuid-out').textContent=uuids.join('\n');
    }
    q3(el,'#uuid-gen-btn').addEventListener('click',gen);
    gen();
  }
},

/* 91 */ {
  id:'token-gen', name:'Random Token Generator', icon:'🎫', category:'security',
  description:'Generate cryptographically secure random tokens in hex, Base64 or custom alphabets.',
  tags:['token','random','secure','api key','secret','hex','generate'],
  setup(el) {
    el.innerHTML = `
      <div class="grid-2">
        <div class="tool-section"><label class="tool-label">Length (bytes)</label><input class="tool-input" id="tg-len" type="number" value="32" min="1" max="256"></div>
        <div class="tool-section"><label class="tool-label">Format</label>
          <select class="tool-select" id="tg-fmt"><option value="hex">Hexadecimal</option><option value="b64">Base64</option><option value="alpha">Alphanumeric</option></select>
        </div>
        <div class="tool-section"><label class="tool-label">Count</label><input class="tool-input" id="tg-count" type="number" value="3" min="1" max="20"></div>
      </div>
      <button class="cyber-btn" id="tg-gen">Generate Tokens</button>
      ${outputBlock('tg-out','Tokens')}`;
    q3(el,'#tg-gen').addEventListener('click',()=>{
      const bytes=Math.min(256,+q3(el,'#tg-len').value||32), fmt=q3(el,'#tg-fmt').value, count=Math.min(20,+q3(el,'#tg-count').value||1);
      const tokens=Array.from({length:count},()=>{
        const arr=new Uint8Array(bytes);crypto.getRandomValues(arr);
        if(fmt==='hex')return [...arr].map(b=>b.toString(16).padStart(2,'0')).join('');
        if(fmt==='b64')return btoa(String.fromCharCode(...arr)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,'');
        const alpha='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return [...arr].map(b=>alpha[b%alpha.length]).join('');
      });
      q3(el,'#tg-out').textContent=tokens.join('\n');
    });
    q3(el,'#tg-gen').click();
  }
},

/* 92 */ {
  id:'rot13', name:'ROT13 Encoder / Decoder', icon:'🔄', category:'security',
  description:'Apply ROT13 substitution cipher — encode or decode text by rotating letters 13 places.',
  tags:['rot13','cipher','encode','decode','caesar','substitute'],
  setup(el) {
    function rot13(str){return str.replace(/[a-zA-Z]/g,c=>{const base=c<='Z'?65:97;return String.fromCharCode((c.charCodeAt(0)-base+13)%26+base);});}
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Input Text (ROT13 is its own inverse)</label>
        <textarea class="tool-textarea" id="r13-in" placeholder="Type or paste text…">Hello, World!</textarea>
      </div>
      ${outputBlock('r13-out','ROT13 Result')}`;
    q3(el,'#r13-in').addEventListener('input',function(){q3(el,'#r13-out').textContent=rot13(this.value);});
    q3(el,'#r13-out').textContent=rot13('Hello, World!');
  }
},

/* 93 */ {
  id:'caesar-cipher', name:'Caesar Cipher', icon:'🏛️', category:'security',
  description:'Encode or decode text using the Caesar shift cipher with any shift value.',
  tags:['caesar','cipher','encrypt','decrypt','shift','rotate'],
  setup(el) {
    function caesar(str,shift,dir=1){return str.replace(/[a-zA-Z]/g,c=>{const base=c<='Z'?65:97;return String.fromCharCode((c.charCodeAt(0)-base+dir*shift+26)%26+base);});}
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Input Text</label>
        <textarea class="tool-textarea" id="cc2-in" placeholder="Enter text to encrypt/decrypt…">Hello World</textarea>
      </div>
      <div class="tool-section"><label class="tool-label">Shift Amount <span id="cc2-shift-val">3</span></label>
        <input type="range" class="tool-range" id="cc2-shift" min="1" max="25" value="3">
      </div>
      <div class="btn-group mb-2">
        <button class="cyber-btn" id="cc2-enc">Encrypt →</button>
        <button class="cyber-btn" id="cc2-dec">← Decrypt</button>
      </div>
      ${outputBlock('cc2-out','Result')}`;
    q3(el,'#cc2-shift').addEventListener('input',e=>q3(el,'#cc2-shift-val').textContent=e.target.value);
    q3(el,'#cc2-enc').addEventListener('click',()=>q3(el,'#cc2-out').textContent=caesar(q3(el,'#cc2-in').value,+q3(el,'#cc2-shift').value,1));
    q3(el,'#cc2-dec').addEventListener('click',()=>q3(el,'#cc2-out').textContent=caesar(q3(el,'#cc2-in').value,+q3(el,'#cc2-shift').value,-1));
  }
},

/* 94 */ {
  id:'checksum-calc', name:'Checksum Calculator', icon:'✅', category:'security',
  description:'Calculate Adler-32 and simple checksum values for text strings.',
  tags:['checksum','verify','adler','integrity','hash','validation'],
  setup(el) {
    function adler32(str){let a=1,b=0;for(const c of str){a=(a+c.charCodeAt(0))%65521;b=(b+a)%65521;}return((b<<16)|a)>>>0;}
    function simpleCheck(str){return [...str].reduce((a,c)=>a+c.charCodeAt(0),0);}
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Input Text</label>
        <textarea class="tool-textarea" id="ck-in" placeholder="Enter text to checksum…"></textarea>
      </div>
      <button class="cyber-btn" id="ck-run">Calculate</button>
      <div id="ck-result"></div>`;
    q3(el,'#ck-run').addEventListener('click',()=>{
      const t=q3(el,'#ck-in').value;
      const a32=adler32(t), sc=simpleCheck(t);
      q3(el,'#ck-result').innerHTML=`<div class="conv-grid">
        <div class="conv-item"><div class="conv-item-label">Adler-32 (Dec)</div><div class="conv-item-value">${a32}</div></div>
        <div class="conv-item"><div class="conv-item-label">Adler-32 (Hex)</div><div class="conv-item-value">${a32.toString(16).toUpperCase()}</div></div>
        <div class="conv-item"><div class="conv-item-label">Simple Sum</div><div class="conv-item-value">${sc}</div></div>
        <div class="conv-item"><div class="conv-item-label">Char Count</div><div class="conv-item-value">${t.length}</div></div>
      </div>`;
    });
  }
},

/* 95 */ {
  id:'api-key-gen', name:'API Key Generator', icon:'🗝️', category:'security',
  description:'Generate API keys in various formats: prefixed, segmented, or plain random keys.',
  tags:['api key','generate','secret','token','key'],
  setup(el) {
    el.innerHTML = `
      <div class="grid-2">
        <div class="tool-section"><label class="tool-label">Prefix</label><input class="tool-input" id="ak-prefix" value="sk" placeholder="sk, pk, api…"></div>
        <div class="tool-section"><label class="tool-label">Format</label>
          <select class="tool-select" id="ak-fmt">
            <option value="prefixed">Prefixed (sk-xxxxx)</option>
            <option value="segments">Segmented (xxxx-xxxx-xxxx)</option>
            <option value="plain">Plain Random</option>
          </select>
        </div>
        <div class="tool-section"><label class="tool-label">Count</label><input class="tool-input" id="ak-count" type="number" value="3" min="1" max="20"></div>
      </div>
      <button class="cyber-btn" id="ak-gen">Generate API Keys</button>
      ${outputBlock('ak-out','API Keys')}`;
    function randHex(n){const a=new Uint8Array(n);crypto.getRandomValues(a);return [...a].map(b=>b.toString(16).padStart(2,'0')).join('');}
    q3(el,'#ak-gen').addEventListener('click',()=>{
      const prefix=q3(el,'#ak-prefix').value, fmt=q3(el,'#ak-fmt').value, count=Math.min(20,+q3(el,'#ak-count').value||1);
      const keys=Array.from({length:count},()=>{
        if(fmt==='prefixed')return `${prefix}-${randHex(20)}`;
        if(fmt==='segments')return [randHex(4),randHex(4),randHex(4),randHex(4)].join('-');
        return randHex(32);
      });
      q3(el,'#ak-out').textContent=keys.join('\n');
    });
    q3(el,'#ak-gen').click();
  }
},

/* 96 */ {
  id:'privacy-policy-gen', name:'Privacy Policy Generator', icon:'📋', category:'security',
  description:'Generate a basic privacy policy template for your website or app.',
  tags:['privacy','policy','gdpr','legal','website','generator'],
  setup(el) {
    el.innerHTML = `
      <div class="grid-2">
        <div class="tool-section"><label class="tool-label">Company/App Name</label><input class="tool-input" id="pp-name" value="AllTools"></div>
        <div class="tool-section"><label class="tool-label">Website URL</label><input class="tool-input" id="pp-url" value="https://alltools.app"></div>
        <div class="tool-section"><label class="tool-label">Contact Email</label><input class="tool-input" id="pp-email" value="contact@alltools.app"></div>
        <div class="tool-section"><label class="tool-label">Country/Jurisdiction</label><input class="tool-input" id="pp-country" value="India"></div>
      </div>
      <button class="cyber-btn" id="pp-gen">Generate Policy</button>
      ${outputBlock('pp-out','Privacy Policy')}`;
    q3(el,'#pp-out').style.maxHeight='320px';
    q3(el,'#pp-gen').addEventListener('click',()=>{
      const name=q3(el,'#pp-name').value, url=q3(el,'#pp-url').value, email=q3(el,'#pp-email').value, country=q3(el,'#pp-country').value;
      const today=new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
      q3(el,'#pp-out').textContent=`PRIVACY POLICY
Last updated: ${today}

1. INTRODUCTION
${name} ("we", "our", or "us") operates ${url}. This page informs you of our policies regarding collection, use, and disclosure of personal data.

2. DATA WE COLLECT
We may collect personally identifiable information including but not limited to: name, email address, usage data, and cookies.

3. HOW WE USE YOUR DATA
We use collected data to provide and improve our service, notify you of changes, provide customer support, and monitor usage.

4. COOKIES
We use cookies to track activity and store preferences. You may instruct your browser to refuse all cookies.

5. DATA SECURITY
We strive to use commercially acceptable means to protect your personal data, but no method of transmission over the Internet is 100% secure.

6. THIRD-PARTY SERVICES
We may employ third-party companies (analytics, payment processors) who may access your data only to perform tasks on our behalf.

7. CHILDREN'S PRIVACY
Our service does not address anyone under 13. We do not knowingly collect data from children.

8. YOUR RIGHTS
Depending on your location (${country}), you may have rights to access, correct, or delete your personal data.

9. CONTACT US
If you have questions about this Privacy Policy, contact us at: ${email}`;
    });
  }
}

); // end SECURITY TOOLS push

/* ================================================================
   TIME & DATE TOOLS (12)
   ================================================================ */
TOOLS.push(

/* 97 */ {
  id:'world-clock', name:'World Clock', icon:'🌍', category:'datetime',
  description:'View current time in multiple cities and time zones around the world.',
  tags:['world clock','time zones','international','cities','time'],
  setup(el) {
    const zones=[
      ['🇺🇸 New York','America/New_York'],['🇺🇸 Los Angeles','America/Los_Angeles'],
      ['🇬🇧 London','Europe/London'],['🇫🇷 Paris','Europe/Paris'],
      ['🇩🇪 Berlin','Europe/Berlin'],['🇮🇳 Mumbai','Asia/Kolkata'],
      ['🇨🇳 Shanghai','Asia/Shanghai'],['🇯🇵 Tokyo','Asia/Tokyo'],
      ['🇦🇺 Sydney','Australia/Sydney'],['🇧🇷 São Paulo','America/Sao_Paulo'],
      ['🇸🇬 Singapore','Asia/Singapore'],['🇦🇪 Dubai','Asia/Dubai'],
    ];
    el.innerHTML = `
      <div id="wc-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px"></div>`;
    function update(){
      const now=Date.now();
      q3(el,'#wc-grid').innerHTML=zones.map(([name,tz])=>{
        const t=new Date(now).toLocaleTimeString('en-US',{timeZone:tz,hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:true});
        const d=new Date(now).toLocaleDateString('en-US',{timeZone:tz,month:'short',day:'numeric'});
        return `<div style="background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:var(--r-md);padding:14px;text-align:center">
          <div style="font-size:.85rem;color:var(--text-secondary);margin-bottom:4px">${name}</div>
          <div style="font-family:var(--font-head);font-size:1.3rem;font-weight:700;color:var(--text-primary)">${t}</div>
          <div style="font-size:.75rem;color:var(--text-muted)">${d}</div>
        </div>`;
      }).join('');
    }
    update();const timer=setInterval(update,1000);
    el.addEventListener('remove',()=>clearInterval(timer));
  }
},

/* 98 */ {
  id:'stopwatch', name:'Stopwatch', icon:'⏱️', category:'datetime',
  description:'A precise stopwatch with lap tracking, millisecond accuracy.',
  tags:['stopwatch','timer','lap','measure','time'],
  setup(el) {
    el.innerHTML = `
      <div class="timer-display" id="sw-display">00:00.000</div>
      <div class="timer-controls">
        <button class="cyber-btn" id="sw-start">▶ Start</button>
        <button class="cyber-btn" id="sw-lap">◎ Lap</button>
        <button class="cyber-btn" id="sw-reset">↺ Reset</button>
      </div>
      <div id="sw-laps" style="max-height:200px;overflow-y:auto;margin-top:14px"></div>`;
    let start=0, elapsed=0, running=false, raf=null, laps=[], lapN=0;
    function fmt(ms){const m=Math.floor(ms/60000),s=Math.floor((ms%60000)/1000),ms2=ms%1000;return`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}.${String(ms2).padStart(3,'0')}`;}
    function tick(){q3(el,'#sw-display').textContent=fmt(elapsed+Date.now()-start);raf=requestAnimationFrame(tick);}
    q3(el,'#sw-start').addEventListener('click',()=>{
      if(!running){start=Date.now();running=true;q3(el,'#sw-start').textContent='⏸ Pause';raf=requestAnimationFrame(tick);}
      else{elapsed+=Date.now()-start;running=false;cancelAnimationFrame(raf);q3(el,'#sw-start').textContent='▶ Resume';}
    });
    q3(el,'#sw-lap').addEventListener('click',()=>{
      if(!running&&elapsed===0)return;
      const current=elapsed+(running?Date.now()-start:0);
      lapN++;laps.unshift({n:lapN,time:current});
      q3(el,'#sw-laps').innerHTML=laps.map(l=>`<div style="display:flex;justify-content:space-between;padding:6px 8px;border-bottom:1px solid var(--border);font-family:var(--font-mono);font-size:.85rem"><span style="color:var(--text-muted)">Lap ${l.n}</span><span>${fmt(l.time)}</span></div>`).join('');
    });
    q3(el,'#sw-reset').addEventListener('click',()=>{cancelAnimationFrame(raf);start=elapsed=lapN=0;running=false;laps=[];q3(el,'#sw-display').textContent='00:00.000';q3(el,'#sw-start').textContent='▶ Start';q3(el,'#sw-laps').innerHTML='';});
    el.addEventListener('remove',()=>cancelAnimationFrame(raf));
  }
},

/* 99 */ {
  id:'countdown-timer', name:'Countdown Timer', icon:'⏰', category:'datetime',
  description:'Set a countdown to any future date and see days, hours, minutes, and seconds remaining.',
  tags:['countdown','timer','event','date','deadline'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Target Date & Time</label>
        <input class="tool-input" id="cd-target" type="datetime-local">
      </div>
      <div class="tool-section"><label class="tool-label">Event Name</label><input class="tool-input" id="cd-name" value="New Year 2026" placeholder="Event name…"></div>
      <button class="cyber-btn" id="cd-start">Start Countdown</button>
      <div id="cd-display" style="display:none">
        <div id="cd-label" style="text-align:center;color:var(--text-secondary);font-size:.9rem;margin-bottom:10px"></div>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap" id="cd-grid"></div>
      </div>
      <div id="cd-done" class="alert alert-success" style="display:none">🎉 The event has arrived!</div>`;
    const next=new Date(); next.setDate(next.getDate()+30);
    q3(el,'#cd-target').value=next.toISOString().slice(0,16);
    let timer=null;
    q3(el,'#cd-start').addEventListener('click',()=>{
      clearInterval(timer);
      const target=new Date(q3(el,'#cd-target').value);
      const name=q3(el,'#cd-name').value;
      q3(el,'#cd-label').textContent=`Countdown to: ${name}`;
      q3(el,'#cd-display').style.display='block'; q3(el,'#cd-done').style.display='none';
      function update(){
        const diff=target-Date.now();
        if(diff<=0){clearInterval(timer);q3(el,'#cd-display').style.display='none';q3(el,'#cd-done').style.display='block';return;}
        const d=Math.floor(diff/86400000),h=Math.floor((diff%86400000)/3600000),m=Math.floor((diff%3600000)/60000),s=Math.floor((diff%60000)/1000);
        q3(el,'#cd-grid').innerHTML=[['Days',d],['Hours',h],['Minutes',m],['Seconds',s]].map(([l,v])=>`<div style="text-align:center;background:rgba(255,255,255,.05);border:1px solid var(--border);border-radius:var(--r-md);padding:16px 22px"><div style="font-family:var(--font-head);font-size:2.2rem;font-weight:900;color:var(--purple-light)">${String(v).padStart(2,'0')}</div><div style="font-size:.75rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em">${l}</div></div>`).join('');
      }
      update(); timer=setInterval(update,1000);
    });
    el.addEventListener('remove',()=>clearInterval(timer));
    q3(el,'#cd-start').click();
  }
},

/* 100 */ {
  id:'pomodoro', name:'Pomodoro Timer', icon:'🍅', category:'datetime',
  description:'Focus timer using the Pomodoro technique: 25 minutes work, 5 minutes break.',
  tags:['pomodoro','focus','productivity','timer','work','break'],
  setup(el) {
    el.innerHTML = `
      <div style="text-align:center">
        <div id="pt-mode" style="font-size:.9rem;color:var(--text-muted);margin-bottom:6px">Work Session</div>
        <div class="timer-display" id="pt-display">25:00</div>
        <div style="margin-top:4px;font-size:.8rem;color:var(--text-muted)" id="pt-count">Pomodoro #1</div>
        <div class="timer-controls">
          <button class="cyber-btn" id="pt-start">▶ Start</button>
          <button class="cyber-btn" id="pt-skip">⏭ Skip</button>
          <button class="cyber-btn" id="pt-reset">↺ Reset</button>
        </div>
        <div class="grid-3 mt-2">
          <div class="tool-section"><label class="tool-label">Work (min)</label><input class="tool-input" id="pt-work" type="number" value="25" min="1"></div>
          <div class="tool-section"><label class="tool-label">Break (min)</label><input class="tool-input" id="pt-break" type="number" value="5" min="1"></div>
          <div class="tool-section"><label class="tool-label">Long Break</label><input class="tool-input" id="pt-long" type="number" value="15" min="1"></div>
        </div>
      </div>`;
    let remaining=25*60, running=false, interval=null, isWork=true, pCount=1;
    function fmt(s){return`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;}
    function updateDisp(){q3(el,'#pt-display').textContent=fmt(remaining);}
    function next(){
      isWork=!isWork;
      if(isWork)pCount++;
      const mins=isWork?+q3(el,'#pt-work').value:pCount%4===0?+q3(el,'#pt-long').value:+q3(el,'#pt-break').value;
      remaining=mins*60;
      q3(el,'#pt-mode').textContent=isWork?'Work Session':pCount%4===0?'Long Break':'Short Break';
      q3(el,'#pt-count').textContent=`Pomodoro #${pCount}`;
      updateDisp();try{new Audio('data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QAAAkAC0hAAAHjBgCBuFkEoEEEdkkEMhJFgBIU4F2EKSVAABIkAAAAAAAAQAAAAAAAANhQIAAAAAA').play();}catch(e){}
    }
    q3(el,'#pt-start').addEventListener('click',()=>{
      if(!running){running=true;q3(el,'#pt-start').textContent='⏸ Pause';interval=setInterval(()=>{remaining--;updateDisp();if(remaining<=0){clearInterval(interval);running=false;q3(el,'#pt-start').textContent='▶ Start';next();}},1000);}
      else{running=false;clearInterval(interval);q3(el,'#pt-start').textContent='▶ Start';}
    });
    q3(el,'#pt-skip').addEventListener('click',()=>{clearInterval(interval);running=false;q3(el,'#pt-start').textContent='▶ Start';next();});
    q3(el,'#pt-reset').addEventListener('click',()=>{clearInterval(interval);running=false;isWork=true;pCount=1;remaining=+q3(el,'#pt-work').value*60;q3(el,'#pt-mode').textContent='Work Session';q3(el,'#pt-count').textContent='Pomodoro #1';q3(el,'#pt-start').textContent='▶ Start';updateDisp();});
    el.addEventListener('remove',()=>clearInterval(interval));
  }
},

/* 101 */ {
  id:'unix-timestamp', name:'Unix Timestamp Converter', icon:'🕐', category:'datetime',
  description:'Convert Unix timestamps to human-readable dates and back in real time.',
  tags:['unix','timestamp','epoch','convert','time','milliseconds'],
  setup(el) {
    el.innerHTML = `
      <div class="alert alert-info" id="ut-now">Loading…</div>
      <div class="grid-2 mt-2">
        <div>
          <div class="tool-section"><label class="tool-label">Seconds since epoch</label><input class="tool-input" id="ut-sec" type="number" placeholder="1720000000"></div>
          <button class="cyber-btn" id="ut-from-sec">→ Human Date</button>
          <div class="tool-output" id="ut-sec-out" style="min-height:40px"></div>
        </div>
        <div>
          <div class="tool-section"><label class="tool-label">Date & Time</label><input class="tool-input" id="ut-dt" type="datetime-local"></div>
          <button class="cyber-btn" id="ut-from-dt">→ Unix</button>
          <div class="tool-output" id="ut-dt-out" style="min-height:40px"></div>
        </div>
      </div>`;
    function tick(){const now=Date.now();q3(el,'#ut-now').textContent=`Now: ${Math.floor(now/1000)} (seconds) · ${now} (ms) · ${new Date().toISOString()}`;}
    tick();const t=setInterval(tick,1000);el.addEventListener('remove',()=>clearInterval(t));
    const dtNow=new Date();q3(el,'#ut-dt').value=dtNow.toISOString().slice(0,16);
    q3(el,'#ut-from-sec').addEventListener('click',()=>{const s=+q3(el,'#ut-sec').value;const d=new Date(s<1e12?s*1000:s);q3(el,'#ut-sec-out').textContent=isNaN(d)?'Invalid':'UTC: '+d.toUTCString()+'\nLocal: '+d.toLocaleString()+'\nISO: '+d.toISOString();});
    q3(el,'#ut-from-dt').addEventListener('click',()=>{const ms=new Date(q3(el,'#ut-dt').value).getTime();q3(el,'#ut-dt-out').textContent=`Seconds: ${Math.floor(ms/1000)}\nMilliseconds: ${ms}`;});
  }
},

/* 102 */ {
  id:'day-of-week', name:'Day of Week Calculator', icon:'📅', category:'datetime',
  description:'Find out what day of the week any date falls on, past or future.',
  tags:['day','week','calendar','date','what day'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Select a Date</label>
        <input class="tool-input" id="dow-date" type="date">
      </div>
      <div id="dow-result" class="mt-2"></div>`;
    q3(el,'#dow-date').value=new Date().toISOString().split('T')[0];
    q3(el,'#dow-date').addEventListener('input',function(){
      const d=new Date(this.value+'T00:00:00');
      if(isNaN(d))return;
      const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
      const weekNum=Math.ceil((d.getDate()-d.getDay()+6)/7);
      const isWeekend=d.getDay()===0||d.getDay()===6;
      q3(el,'#dow-result').innerHTML=`
        <div style="text-align:center;margin-bottom:12px">
          <div style="font-family:var(--font-head);font-size:2.5rem;font-weight:900;color:var(--purple-light)">${days[d.getDay()]}</div>
          <div style="color:var(--text-secondary)">${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}</div>
        </div>
        <div class="stats-grid">
          <div class="stat-card"><div class="stat-card-num">Week ${weekNum}</div><div class="stat-card-label">of Month</div></div>
          <div class="stat-card"><div class="stat-card-num">${d.getDay()}</div><div class="stat-card-label">Day Index</div></div>
          <div class="stat-card"><div class="stat-card-num">${isWeekend?'Weekend':'Weekday'}</div><div class="stat-card-label">Type</div></div>
        </div>`;
    });
    q3(el,'#dow-date').dispatchEvent(new Event('input'));
  }
},

/* 103 */ {
  id:'time-zone-conv', name:'Time Zone Converter', icon:'🌐', category:'datetime',
  description:'Convert a date and time from one time zone to multiple other zones simultaneously.',
  tags:['timezone','convert','world time','international','meeting'],
  setup(el) {
    const zones=['America/New_York','America/Chicago','America/Denver','America/Los_Angeles','Europe/London','Europe/Paris','Europe/Berlin','Asia/Kolkata','Asia/Kolkata','Asia/Shanghai','Asia/Tokyo','Australia/Sydney','Pacific/Auckland'];
    el.innerHTML = `
      <div class="grid-2">
        <div class="tool-section"><label class="tool-label">Date & Time</label><input class="tool-input" id="tzc-dt" type="datetime-local"></div>
        <div class="tool-section"><label class="tool-label">From Timezone</label>
          <select class="tool-select" id="tzc-from">${zones.map(z=>`<option value="${z}">${z}</option>`).join('')}</select>
        </div>
      </div>
      <button class="cyber-btn" id="tzc-run">Convert to All Zones</button>
      <div id="tzc-out" class="ref-list"></div>`;
    q3(el,'#tzc-dt').value=new Date().toISOString().slice(0,16);
    q3(el,'#tzc-run').addEventListener('click',()=>{
      const dt=q3(el,'#tzc-dt').value; if(!dt) return;
      const d=new Date(dt);
      q3(el,'#tzc-out').innerHTML=zones.map(tz=>{
        const t=d.toLocaleString('en-US',{timeZone:tz,month:'short',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:true});
        return `<div class="ref-item"><span class="ref-code" style="color:var(--cyan);min-width:80px">${t}</span><span class="ref-name">${tz}</span></div>`;
      }).join('');
    });
  }
},

/* 104 */ {
  id:'date-formatter', name:'Date Formatter', icon:'📆', category:'datetime',
  description:'Format any date in dozens of formats: ISO, locale, custom patterns, and more.',
  tags:['date','format','datetime','pattern','convert'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Date & Time</label><input class="tool-input" id="df-date" type="datetime-local"></div>
      <button class="cyber-btn" id="df-run">Format</button>
      <div id="df-out" class="ref-list"></div>`;
    q3(el,'#df-date').value=new Date().toISOString().slice(0,16);
    q3(el,'#df-run').addEventListener('click',()=>{
      const d=new Date(q3(el,'#df-date').value); if(isNaN(d)) return;
      const formats=[
        ['ISO 8601',d.toISOString()],
        ['UTC String',d.toUTCString()],
        ['Locale (US)',d.toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})],
        ['Locale (UK)',d.toLocaleDateString('en-GB',{year:'numeric',month:'long',day:'numeric'})],
        ['Short',d.toLocaleDateString('en-US')],
        ['Time',d.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',second:'2-digit'})],
        ['Unix (sec)',Math.floor(d.getTime()/1000)],
        ['Unix (ms)',d.getTime()],
        ['Day of Year',Math.ceil((d-new Date(d.getFullYear(),0,1))/86400000)],
        ['Week of Year',Math.ceil(((d-new Date(d.getFullYear(),0,1))/86400000+new Date(d.getFullYear(),0,1).getDay())/7)],
      ];
      q3(el,'#df-out').innerHTML=formats.map(([k,v])=>`<div class="ref-item" onclick="copyText('${v}');showToast('Copied!')" style="cursor:pointer"><span class="ref-code" style="min-width:130px;color:var(--cyan)">${k}</span><span class="ref-name">${v}</span></div>`).join('');
    });
    q3(el,'#df-run').click();
  }
},

/* 105 */ {
  id:'week-number', name:'Week Number Calculator', icon:'📅', category:'datetime',
  description:'Find the ISO week number for any date and list all weeks in the year.',
  tags:['week number','iso','calendar','year','date'],
  setup(el) {
    function getWeek(d){const t=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));const day=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-day);const yr=new Date(Date.UTC(t.getUTCFullYear(),0,1));return Math.ceil(((t-yr)/86400000+1)/7);}
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Select Date</label><input class="tool-input" id="wn-date" type="date"></div>
      <div id="wn-result" class="mt-2"></div>`;
    q3(el,'#wn-date').value=new Date().toISOString().split('T')[0];
    q3(el,'#wn-date').addEventListener('input',function(){
      const d=new Date(this.value);if(isNaN(d))return;
      const wk=getWeek(d),yr=d.getFullYear(),maxWk=getWeek(new Date(yr,11,28));
      q3(el,'#wn-result').innerHTML=`<div class="stats-grid">
        <div class="stat-card"><div class="stat-card-num">Week ${wk}</div><div class="stat-card-label">ISO Week Number</div></div>
        <div class="stat-card"><div class="stat-card-num">${maxWk}</div><div class="stat-card-label">Total Weeks in ${yr}</div></div>
        <div class="stat-card"><div class="stat-card-num">${maxWk-wk}</div><div class="stat-card-label">Weeks Remaining</div></div>
      </div>`;
    });
    q3(el,'#wn-date').dispatchEvent(new Event('input'));
  }
},

/* 106 */ {
  id:'working-days', name:'Working Days Calculator', icon:'💼', category:'datetime',
  description:'Count business days between two dates, excluding weekends and optional holidays.',
  tags:['working days','business days','weekdays','calculator','calendar'],
  setup(el) {
    el.innerHTML = `
      <div class="grid-2">
        <div class="tool-section"><label class="tool-label">Start Date</label><input class="tool-input" id="wd-start" type="date"></div>
        <div class="tool-section"><label class="tool-label">End Date</label><input class="tool-input" id="wd-end" type="date"></div>
      </div>
      <label style="display:flex;align-items:center;gap:6px;cursor:pointer;color:var(--text-secondary);margin-bottom:12px"><input type="checkbox" id="wd-sat"> Include Saturdays</label>
      <button class="cyber-btn" id="wd-calc">Calculate</button>
      <div id="wd-result"></div>`;
    const now=new Date().toISOString().split('T')[0];
    const future=new Date();future.setDate(future.getDate()+30);
    q3(el,'#wd-start').value=now; q3(el,'#wd-end').value=future.toISOString().split('T')[0];
    q3(el,'#wd-calc').addEventListener('click',()=>{
      const start=new Date(q3(el,'#wd-start').value),end=new Date(q3(el,'#wd-end').value),inclSat=q3(el,'#wd-sat').checked;
      let working=0,total=0,cur=new Date(start);
      while(cur<=end){const d=cur.getDay();if(d!==0&&(inclSat||d!==6))working++;total++;cur.setDate(cur.getDate()+1);}
      q3(el,'#wd-result').innerHTML=`<div class="stats-grid">
        <div class="stat-card"><div class="stat-card-num">${working}</div><div class="stat-card-label">Working Days</div></div>
        <div class="stat-card"><div class="stat-card-num">${total-working}</div><div class="stat-card-label">Weekend Days</div></div>
        <div class="stat-card"><div class="stat-card-num">${total}</div><div class="stat-card-label">Total Days</div></div>
      </div>`;
    });
    q3(el,'#wd-calc').click();
  }
},

/* 107 */ {
  id:'time-duration', name:'Time Duration Calculator', icon:'⏳', category:'datetime',
  description:'Add or subtract time durations and calculate the result in various units.',
  tags:['time','duration','add','subtract','hours','minutes','seconds'],
  setup(el) {
    el.innerHTML = `
      <div class="grid-2">
        <div class="tool-section"><label class="tool-label">Start Time</label><input class="tool-input" id="td-start" type="time" value="09:00"></div>
        <div class="tool-section"><label class="tool-label">End Time</label><input class="tool-input" id="td-end" type="time" value="17:30"></div>
      </div>
      <button class="cyber-btn" id="td-calc">Calculate Duration</button>
      <div id="td-result"></div>`;
    q3(el,'#td-calc').addEventListener('click',()=>{
      const [sh,sm]=q3(el,'#td-start').value.split(':').map(Number);
      const [eh,em]=q3(el,'#td-end').value.split(':').map(Number);
      let totalMin=(eh*60+em)-(sh*60+sm);
      if(totalMin<0)totalMin+=24*60;
      const h=Math.floor(totalMin/60), m=totalMin%60;
      q3(el,'#td-result').innerHTML=`<div class="stats-grid">
        <div class="stat-card"><div class="stat-card-num">${h}h ${m}m</div><div class="stat-card-label">Duration</div></div>
        <div class="stat-card"><div class="stat-card-num">${totalMin}</div><div class="stat-card-label">Total Minutes</div></div>
        <div class="stat-card"><div class="stat-card-num">${(totalMin/60).toFixed(2)}</div><div class="stat-card-label">Decimal Hours</div></div>
        <div class="stat-card"><div class="stat-card-num">${totalMin*60}</div><div class="stat-card-label">Seconds</div></div>
      </div>`;
    });
    q3(el,'#td-calc').click();
  }
},

/* 108 */ {
  id:'clock-alarm', name:'Alarm Clock', icon:'🔔', category:'datetime',
  description:'Set a browser alarm with a custom message — the page will alert you at the set time.',
  tags:['alarm','clock','reminder','notification','timer'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Alarm Time</label><input class="tool-input" id="al-time" type="time"></div>
      <div class="tool-section"><label class="tool-label">Alarm Label</label><input class="tool-input" id="al-label" value="Time's up! ⏰" placeholder="Alarm message…"></div>
      <div class="btn-group mb-2">
        <button class="cyber-btn" id="al-set">🔔 Set Alarm</button>
        <button class="cyber-btn" id="al-cancel">Cancel</button>
      </div>
      <div id="al-status" class="alert alert-info" style="display:none"></div>`;
    let alarmInt=null;
    const now=new Date();now.setMinutes(now.getMinutes()+1);
    q3(el,'#al-time').value=`${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    q3(el,'#al-set').addEventListener('click',()=>{
      clearInterval(alarmInt);
      const [h,m]=q3(el,'#al-time').value.split(':').map(Number);
      const label=q3(el,'#al-label').value;
      q3(el,'#al-status').style.display='block';q3(el,'#al-status').textContent=`Alarm set for ${q3(el,'#al-time').value}`;
      alarmInt=setInterval(()=>{const now2=new Date();if(now2.getHours()===h&&now2.getMinutes()===m&&now2.getSeconds()===0){clearInterval(alarmInt);alert('⏰ '+label);q3(el,'#al-status').textContent='Alarm triggered!';try{new Notification(label);}catch(e){}}},1000);
    });
    q3(el,'#al-cancel').addEventListener('click',()=>{clearInterval(alarmInt);q3(el,'#al-status').textContent='Alarm cancelled';});
    el.addEventListener('remove',()=>clearInterval(alarmInt));
  }
}

); // end DATETIME TOOLS push

/* ================================================================
   UNIT CONVERTERS (13)
   ================================================================ */
TOOLS.push(

/* 109 */ {
  id:'length-conv', name:'Length Converter', icon:'📏', category:'converter',
  description:'Convert between meters, feet, inches, miles, kilometers, yards, centimeters, and more.',
  tags:['length','convert','meter','feet','inch','mile','kilometer','cm'],
  setup(el) {
    const units=[['m','Meter',1],['km','Kilometer',1000],['cm','Centimeter',0.01],['mm','Millimeter',0.001],['mi','Mile',1609.344],['yd','Yard',0.9144],['ft','Foot',0.3048],['in','Inch',0.0254],['nm','Nautical Mile',1852]];
    el.innerHTML = `
      <div class="flex-gap mb-2">
        <div class="tool-section"><label class="tool-label">Value</label><input class="tool-input" id="lc-val" type="number" value="1"></div>
        <div class="tool-section"><label class="tool-label">From</label><select class="tool-select" id="lc-from">${units.map(([k,n])=>`<option value="${k}">${n}</option>`).join('')}</select></div>
      </div>
      <div class="conv-grid" id="lc-out"></div>`;
    function convert(){const val=+q3(el,'#lc-val').value, from=q3(el,'#lc-from').value;const base=val*(units.find(u=>u[0]===from)?.[2]||1);q3(el,'#lc-out').innerHTML=units.map(([k,n,f])=>`<div class="conv-item"><div class="conv-item-label">${n} (${k})</div><div class="conv-item-value">${(base/f).toPrecision(6)}</div></div>`).join('');}
    q3(el,'#lc-val').addEventListener('input',convert); q3(el,'#lc-from').addEventListener('change',convert); convert();
  }
},

/* 110 */ {
  id:'weight-conv', name:'Weight & Mass Converter', icon:'⚖️', category:'converter',
  description:'Convert between kilograms, pounds, ounces, grams, stones, and more.',
  tags:['weight','mass','kg','lb','ounce','gram','converter'],
  setup(el) {
    const units=[['kg','Kilogram',1],['g','Gram',0.001],['mg','Milligram',0.000001],['lb','Pound',0.453592],['oz','Ounce',0.0283495],['st','Stone',6.35029],['t','Metric Ton',1000],['ton','US Ton',907.185]];
    el.innerHTML = `
      <div class="flex-gap mb-2">
        <div class="tool-section"><label class="tool-label">Value</label><input class="tool-input" id="wc2-val" type="number" value="1"></div>
        <div class="tool-section"><label class="tool-label">From</label><select class="tool-select" id="wc2-from">${units.map(([k,n])=>`<option value="${k}">${n}</option>`).join('')}</select></div>
      </div>
      <div class="conv-grid" id="wc2-out"></div>`;
    function convert(){const val=+q3(el,'#wc2-val').value,from=q3(el,'#wc2-from').value;const base=val*(units.find(u=>u[0]===from)?.[2]||1);q3(el,'#wc2-out').innerHTML=units.map(([k,n,f])=>`<div class="conv-item"><div class="conv-item-label">${n} (${k})</div><div class="conv-item-value">${(base/f).toPrecision(6)}</div></div>`).join('');}
    q3(el,'#wc2-val').addEventListener('input',convert); q3(el,'#wc2-from').addEventListener('change',convert); convert();
  }
},

/* 111 */ {
  id:'temp-conv', name:'Temperature Converter', icon:'🌡️', category:'converter',
  description:'Convert between Celsius, Fahrenheit, and Kelvin with live results.',
  tags:['temperature','celsius','fahrenheit','kelvin','convert'],
  setup(el) {
    el.innerHTML = `
      <div class="grid-3">
        <div class="tool-section"><label class="tool-label">°Celsius</label><input class="tool-input" id="tc2-c" type="number" value="100"></div>
        <div class="tool-section"><label class="tool-label">°Fahrenheit</label><input class="tool-input" id="tc2-f" type="number"></div>
        <div class="tool-section"><label class="tool-label">Kelvin</label><input class="tool-input" id="tc2-k" type="number"></div>
      </div>`;
    const c=q3(el,'#tc2-c'), f=q3(el,'#tc2-f'), k=q3(el,'#tc2-k');
    c.addEventListener('input',()=>{const v=+c.value;f.value=(v*9/5+32).toFixed(4);k.value=(v+273.15).toFixed(4);});
    f.addEventListener('input',()=>{const v=+f.value;c.value=((v-32)*5/9).toFixed(4);k.value=((v-32)*5/9+273.15).toFixed(4);});
    k.addEventListener('input',()=>{const v=+k.value;c.value=(v-273.15).toFixed(4);f.value=((v-273.15)*9/5+32).toFixed(4);});
    c.dispatchEvent(new Event('input'));
  }
},

/* 112 */ {
  id:'area-conv', name:'Area Converter', icon:'📐', category:'converter',
  description:'Convert between square meters, acres, hectares, square feet, and more area units.',
  tags:['area','convert','m2','acres','hectares','sq ft'],
  setup(el) {
    const units=[['m2','Sq Meter',1],['km2','Sq Kilometer',1e6],['cm2','Sq Centimeter',0.0001],['ft2','Sq Foot',0.092903],['in2','Sq Inch',0.000645],['yd2','Sq Yard',0.836127],['ac','Acre',4046.86],['ha','Hectare',10000],['mi2','Sq Mile',2.59e6]];
    el.innerHTML = `<div class="flex-gap mb-2"><div class="tool-section"><label class="tool-label">Value</label><input class="tool-input" id="ac2-val" type="number" value="1"></div><div class="tool-section"><label class="tool-label">From</label><select class="tool-select" id="ac2-from">${units.map(([k,n])=>`<option value="${k}">${n}</option>`).join('')}</select></div></div><div class="conv-grid" id="ac2-out"></div>`;
    function convert(){const val=+q3(el,'#ac2-val').value,from=q3(el,'#ac2-from').value;const base=val*(units.find(u=>u[0]===from)?.[2]||1);q3(el,'#ac2-out').innerHTML=units.map(([k,n,f])=>`<div class="conv-item"><div class="conv-item-label">${n}</div><div class="conv-item-value">${(base/f).toPrecision(6)}</div></div>`).join('');}
    q3(el,'#ac2-val').addEventListener('input',convert); q3(el,'#ac2-from').addEventListener('change',convert); convert();
  }
},

/* 113 */ {
  id:'volume-conv', name:'Volume Converter', icon:'🧪', category:'converter',
  description:'Convert between liters, gallons, fluid ounces, cubic meters, milliliters, and more.',
  tags:['volume','convert','liter','gallon','fluid ounce','ml','cubic'],
  setup(el) {
    const units=[['l','Liter',1],['ml','Milliliter',0.001],['m3','Cubic Meter',1000],['cm3','Cubic Cm',0.001],['gal','US Gallon',3.78541],['qt','US Quart',0.946353],['pt','US Pint',0.473176],['fl_oz','Fluid Oz',0.0295735],['tbsp','Tablespoon',0.0147868],['tsp','Teaspoon',0.00492892]];
    el.innerHTML = `<div class="flex-gap mb-2"><div class="tool-section"><label class="tool-label">Value</label><input class="tool-input" id="vc2-val" type="number" value="1"></div><div class="tool-section"><label class="tool-label">From</label><select class="tool-select" id="vc2-from">${units.map(([k,n])=>`<option value="${k}">${n}</option>`).join('')}</select></div></div><div class="conv-grid" id="vc2-out"></div>`;
    function convert(){const val=+q3(el,'#vc2-val').value,from=q3(el,'#vc2-from').value;const base=val*(units.find(u=>u[0]===from)?.[2]||1);q3(el,'#vc2-out').innerHTML=units.map(([k,n,f])=>`<div class="conv-item"><div class="conv-item-label">${n}</div><div class="conv-item-value">${(base/f).toPrecision(6)}</div></div>`).join('');}
    q3(el,'#vc2-val').addEventListener('input',convert); q3(el,'#vc2-from').addEventListener('change',convert); convert();
  }
},

/* 114 */ {
  id:'speed-conv', name:'Speed Converter', icon:'🏎️', category:'converter',
  description:'Convert between km/h, mph, m/s, knots, and other speed units.',
  tags:['speed','convert','km/h','mph','m/s','knots','velocity'],
  setup(el) {
    const units=[['ms','m/s',1],['kmh','km/h',0.277778],['mph','mph',0.44704],['kn','Knots',0.514444],['fts','ft/s',0.3048],['mach','Mach',340.29]];
    el.innerHTML = `<div class="flex-gap mb-2"><div class="tool-section"><label class="tool-label">Value</label><input class="tool-input" id="sc2-val" type="number" value="100"></div><div class="tool-section"><label class="tool-label">From</label><select class="tool-select" id="sc2-from">${units.map(([k,n])=>`<option value="${k}">${n}</option>`).join('')}</select></div></div><div class="conv-grid" id="sc2-out"></div>`;
    function convert(){const val=+q3(el,'#sc2-val').value,from=q3(el,'#sc2-from').value;const base=val*(units.find(u=>u[0]===from)?.[2]||1);q3(el,'#sc2-out').innerHTML=units.map(([k,n,f])=>`<div class="conv-item"><div class="conv-item-label">${n}</div><div class="conv-item-value">${(base/f).toPrecision(6)}</div></div>`).join('');}
    q3(el,'#sc2-val').addEventListener('input',convert); q3(el,'#sc2-from').addEventListener('change',convert); convert();
  }
},

/* 115 */ {
  id:'data-storage-conv', name:'Data Storage Converter', icon:'💾', category:'converter',
  description:'Convert between bytes, kilobytes, megabytes, gigabytes, terabytes, and beyond.',
  tags:['bytes','kb','mb','gb','tb','data','storage','convert'],
  setup(el) {
    const units=[['b','Bit',0.125],['B','Byte',1],['KB','Kilobyte',1024],['MB','Megabyte',1048576],['GB','Gigabyte',1073741824],['TB','Terabyte',1099511627776],['PB','Petabyte',1.126e15]];
    el.innerHTML = `<div class="flex-gap mb-2"><div class="tool-section"><label class="tool-label">Value</label><input class="tool-input" id="ds-val" type="number" value="1"></div><div class="tool-section"><label class="tool-label">From</label><select class="tool-select" id="ds-from">${units.map(([k,n])=>`<option value="${k}">${n}</option>`).join('')}</select></div></div><div class="conv-grid" id="ds-out"></div>`;
    function convert(){const val=+q3(el,'#ds-val').value,from=q3(el,'#ds-from').value;const base=val*(units.find(u=>u[0]===from)?.[2]||1);q3(el,'#ds-out').innerHTML=units.map(([k,n,f])=>`<div class="conv-item"><div class="conv-item-label">${n} (${k})</div><div class="conv-item-value">${(base/f).toPrecision(6)}</div></div>`).join('');}
    q3(el,'#ds-val').addEventListener('input',convert); q3(el,'#ds-from').addEventListener('change',convert); convert();
  }
},

/* 116 */ {
  id:'energy-conv', name:'Energy Converter', icon:'⚡', category:'converter',
  description:'Convert between joules, calories, kilowatt-hours, BTU, and other energy units.',
  tags:['energy','joule','calorie','kWh','BTU','convert'],
  setup(el) {
    const units=[['J','Joule',1],['kJ','Kilojoule',1000],['cal','Calorie',4.18400],['kcal','Kilocalorie',4184],['Wh','Watt-hour',3600],['kWh','Kilowatt-hour',3600000],['BTU','BTU',1055.06],['eV','Electron Volt',1.602e-19]];
    el.innerHTML = `<div class="flex-gap mb-2"><div class="tool-section"><label class="tool-label">Value</label><input class="tool-input" id="ec-val" type="number" value="1"></div><div class="tool-section"><label class="tool-label">From</label><select class="tool-select" id="ec-from">${units.map(([k,n])=>`<option value="${k}">${n}</option>`).join('')}</select></div></div><div class="conv-grid" id="ec-out"></div>`;
    function convert(){const val=+q3(el,'#ec-val').value,from=q3(el,'#ec-from').value;const base=val*(units.find(u=>u[0]===from)?.[2]||1);q3(el,'#ec-out').innerHTML=units.map(([k,n,f])=>`<div class="conv-item"><div class="conv-item-label">${n}</div><div class="conv-item-value">${(base/f).toPrecision(6)}</div></div>`).join('');}
    q3(el,'#ec-val').addEventListener('input',convert); q3(el,'#ec-from').addEventListener('change',convert); convert();
  }
},

/* 117 */ {
  id:'angle-conv', name:'Angle Converter', icon:'📐', category:'converter',
  description:'Convert between degrees, radians, gradians, and turns.',
  tags:['angle','degree','radian','gradian','convert','geometry'],
  setup(el) {
    const units=[['deg','Degrees',1],['rad','Radians',180/Math.PI],['grad','Gradians',0.9],['turn','Turns',360],['arcmin','Arcminutes',1/60],['arcsec','Arcseconds',1/3600]];
    el.innerHTML = `<div class="flex-gap mb-2"><div class="tool-section"><label class="tool-label">Value</label><input class="tool-input" id="anc-val" type="number" value="180"></div><div class="tool-section"><label class="tool-label">From</label><select class="tool-select" id="anc-from">${units.map(([k,n])=>`<option value="${k}">${n}</option>`).join('')}</select></div></div><div class="conv-grid" id="anc-out"></div>`;
    function convert(){const val=+q3(el,'#anc-val').value,from=q3(el,'#anc-from').value;const base=val*(units.find(u=>u[0]===from)?.[2]||1);q3(el,'#anc-out').innerHTML=units.map(([k,n,f])=>`<div class="conv-item"><div class="conv-item-label">${n}</div><div class="conv-item-value">${(base/f).toPrecision(6)}</div></div>`).join('');}
    q3(el,'#anc-val').addEventListener('input',convert); q3(el,'#anc-from').addEventListener('change',convert); convert();
  }
},

/* 118 */ {
  id:'power-conv', name:'Power Converter', icon:'⚡', category:'converter',
  description:'Convert between watts, kilowatts, horsepower, BTU/hour, and other power units.',
  tags:['power','watt','kilowatt','horsepower','convert'],
  setup(el) {
    const units=[['W','Watt',1],['kW','Kilowatt',1000],['MW','Megawatt',1e6],['hp','Horsepower (metric)',735.499],['hp_uk','Horsepower (UK)',745.7],['BTU_h','BTU/hour',0.293071],['cal_s','Calorie/sec',4.184],['ft_lb_s','ft·lbf/s',1.35582]];
    el.innerHTML = `<div class="flex-gap mb-2"><div class="tool-section"><label class="tool-label">Value</label><input class="tool-input" id="pw-val" type="number" value="1"></div><div class="tool-section"><label class="tool-label">From</label><select class="tool-select" id="pw-from">${units.map(([k,n])=>`<option value="${k}">${n}</option>`).join('')}</select></div></div><div class="conv-grid" id="pw-out"></div>`;
    function convert(){const val=+q3(el,'#pw-val').value,from=q3(el,'#pw-from').value;const base=val*(units.find(u=>u[0]===from)?.[2]||1);q3(el,'#pw-out').innerHTML=units.map(([k,n,f])=>`<div class="conv-item"><div class="conv-item-label">${n}</div><div class="conv-item-value">${(base/f).toPrecision(6)}</div></div>`).join('');}
    q3(el,'#pw-val').addEventListener('input',convert); q3(el,'#pw-from').addEventListener('change',convert); convert();
  }
},

/* 119 */ {
  id:'pressure-conv', name:'Pressure Converter', icon:'🔵', category:'converter',
  description:'Convert between pascals, bar, psi, atm, mmHg and other pressure units.',
  tags:['pressure','pascal','bar','psi','atm','mmhg','convert'],
  setup(el) {
    const units=[['Pa','Pascal',1],['kPa','Kilopascal',1000],['MPa','Megapascal',1e6],['bar','Bar',100000],['atm','Atmosphere',101325],['psi','PSI',6894.76],['mmHg','mmHg (Torr)',133.322],['inHg','inHg',3386.39]];
    el.innerHTML = `<div class="flex-gap mb-2"><div class="tool-section"><label class="tool-label">Value</label><input class="tool-input" id="prc-val" type="number" value="1"></div><div class="tool-section"><label class="tool-label">From</label><select class="tool-select" id="prc-from">${units.map(([k,n])=>`<option value="${k}">${n}</option>`).join('')}</select></div></div><div class="conv-grid" id="prc-out"></div>`;
    function convert(){const val=+q3(el,'#prc-val').value,from=q3(el,'#prc-from').value;const base=val*(units.find(u=>u[0]===from)?.[2]||1);q3(el,'#prc-out').innerHTML=units.map(([k,n,f])=>`<div class="conv-item"><div class="conv-item-label">${n}</div><div class="conv-item-value">${(base/f).toPrecision(6)}</div></div>`).join('');}
    q3(el,'#prc-val').addEventListener('input',convert); q3(el,'#prc-from').addEventListener('change',convert); convert();
  }
},

/* 120 */ {
  id:'number-words', name:'Number to Words', icon:'💬', category:'converter',
  description:'Convert any number into words in English (e.g. 1234 → "one thousand two hundred thirty-four").',
  tags:['number','words','english','convert','spell','text'],
  setup(el) {
    function numToWords(n){
      const ones=['','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
      const tens=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
      if(n===0)return'zero';
      if(n<0)return'negative '+numToWords(-n);
      if(n<20)return ones[n];
      if(n<100)return tens[Math.floor(n/10)]+(n%10?' '+ones[n%10]:'');
      if(n<1000)return ones[Math.floor(n/100)]+' hundred'+(n%100?' '+numToWords(n%100):'');
      if(n<1e6)return numToWords(Math.floor(n/1000))+' thousand'+(n%1000?' '+numToWords(n%1000):'');
      if(n<1e9)return numToWords(Math.floor(n/1e6))+' million'+(n%1e6?' '+numToWords(n%1e6):'');
      return numToWords(Math.floor(n/1e9))+' billion'+(n%1e9?' '+numToWords(n%1e9):'');
    }
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Number</label><input class="tool-input" id="n2w-in" type="number" value="1234567" placeholder="Enter any number…"></div>
      ${outputBlock('n2w-out','In Words')}`;
    q3(el,'#n2w-in').addEventListener('input',function(){q3(el,'#n2w-out').textContent=numToWords(Math.abs(parseInt(this.value))||0);});
    q3(el,'#n2w-in').dispatchEvent(new Event('input'));
  }
},

/* 121 */ {
  id:'currency-conv', name:'Currency Reference', icon:'💱', category:'converter',
  description:'Quick currency reference with approximate exchange rates relative to USD.',
  tags:['currency','exchange','rate','usd','eur','inr','convert','money'],
  setup(el) {
    const rates={USD:1,EUR:0.92,GBP:0.79,INR:83.5,JPY:157.2,CNY:7.24,CAD:1.36,AUD:1.53,SGD:1.34,AED:3.67,CHF:0.9,MXN:17.2,BRL:5.02,KRW:1380,SEK:10.65,NOK:10.53};
    el.innerHTML = `
      <div class="flex-gap mb-2">
        <div class="tool-section"><label class="tool-label">Amount</label><input class="tool-input" id="curr-amt" type="number" value="100"></div>
        <div class="tool-section"><label class="tool-label">From</label><select class="tool-select" id="curr-from">${Object.keys(rates).map(k=>`<option value="${k}">${k}</option>`).join('')}</select></div>
      </div>
      <div class="alert alert-warning mb-2">⚠️ These are approximate reference rates. For live rates, use a dedicated financial service.</div>
      <div class="conv-grid" id="curr-out"></div>`;
    function convert(){
      const amt=+q3(el,'#curr-amt').value, from=q3(el,'#curr-from').value;
      const base=amt/rates[from];
      q3(el,'#curr-out').innerHTML=Object.entries(rates).map(([k,r])=>`<div class="conv-item"><div class="conv-item-label">${k}</div><div class="conv-item-value">${(base*r).toFixed(4)}</div></div>`).join('');
    }
    q3(el,'#curr-amt').addEventListener('input',convert); q3(el,'#curr-from').addEventListener('change',convert); convert();
  }
}

); // end CONVERTER TOOLS push

/* ================================================================
   WEB & NETWORK TOOLS (14)
   ================================================================ */
TOOLS.push(

/* 122 */ {
  id:'url-parser', name:'URL Parser', icon:'🔗', category:'web',
  description:'Parse and decompose any URL into its components: protocol, host, path, query, and fragment.',
  tags:['url','parse','uri','query','domain','path','components'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">URL</label>
        <input class="tool-input" id="up-url" value="https://example.com:8080/path/to/page?name=John&age=30#section">
      </div>
      <button class="cyber-btn" id="up-parse">Parse URL</button>
      <div id="up-out" class="ref-list"></div>`;
    q3(el,'#up-parse').addEventListener('click',()=>{
      try{
        const url=new URL(q3(el,'#up-url').value);
        const params=Object.fromEntries(url.searchParams.entries());
        const parts=[
          ['Protocol',url.protocol],['Hostname',url.hostname],['Port',url.port||'(default)'],
          ['Host',url.host],['Origin',url.origin],['Pathname',url.pathname],
          ['Search',url.search],['Hash',url.hash],['Query Params',JSON.stringify(params,null,2)],
        ];
        q3(el,'#up-out').innerHTML=parts.map(([k,v])=>`<div class="ref-item"><span class="ref-code" style="min-width:130px">${k}</span><span class="ref-name" style="word-break:break-all">${escapeHTML(String(v))}</span></div>`).join('');
      }catch(e){q3(el,'#up-out').innerHTML=`<div class="alert alert-error">❌ ${escapeHTML(e.message)}</div>`;}
    });
    q3(el,'#up-parse').click();
  }
},

/* 123 */ {
  id:'user-agent', name:'User Agent Parser', icon:'🌐', category:'web',
  description:'Detect and parse your browser\'s User Agent string to identify OS, browser, and device.',
  tags:['user agent','browser','detect','os','device','parse'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">User Agent String</label>
        <textarea class="tool-textarea" id="ua-str" style="min-height:70px">${navigator.userAgent}</textarea>
      </div>
      <button class="cyber-btn" id="ua-parse">Parse</button>
      <div id="ua-out" class="ref-list"></div>`;
    q3(el,'#ua-parse').addEventListener('click',()=>{
      const ua=q3(el,'#ua-str').value;
      const browser=ua.match(/(Chrome|Firefox|Safari|Edge|Opera|MSIE|Trident)\/?([\d.]+)?/)?.[0]||'Unknown';
      const os=ua.includes('Windows')?'Windows':ua.includes('Mac')?'macOS':ua.includes('Linux')?'Linux':ua.includes('Android')?'Android':ua.includes('iOS')?'iOS':'Unknown';
      const mobile=/Mobile|Android|iPhone|iPad/.test(ua)?'Yes':'No';
      const parts=[['Full UA',ua],['Browser',browser],['OS',os],['Mobile',mobile],['Language',navigator.language],['Cookies Enabled',navigator.cookieEnabled?'Yes':'No'],['Platform',navigator.platform]];
      q3(el,'#ua-out').innerHTML=parts.map(([k,v])=>`<div class="ref-item"><span class="ref-code" style="min-width:160px">${k}</span><span class="ref-name" style="word-break:break-all">${escapeHTML(String(v))}</span></div>`).join('');
    });
    q3(el,'#ua-parse').click();
  }
},

/* 124 */ {
  id:'port-reference', name:'Port Numbers Reference', icon:'🔌', category:'web',
  description:'Quick reference for common TCP/UDP port numbers and their associated services.',
  tags:['port','tcp','udp','network','service','reference'],
  setup(el) {
    const ports=[[20,'FTP Data'],[21,'FTP Control'],[22,'SSH'],[23,'Telnet'],[25,'SMTP'],[53,'DNS'],[67,'DHCP Server'],[68,'DHCP Client'],[80,'HTTP'],[110,'POP3'],[143,'IMAP'],[443,'HTTPS'],[465,'SMTPS'],[587,'SMTP Submission'],[993,'IMAPS'],[995,'POP3S'],[3000,'Node.js Dev'],[3306,'MySQL'],[5432,'PostgreSQL'],[5672,'RabbitMQ'],[6379,'Redis'],[8080,'HTTP Alt'],[8443,'HTTPS Alt'],[27017,'MongoDB'],[9200,'Elasticsearch'],[9300,'Elasticsearch Cluster'],[2181,'Apache Zookeeper'],[4369,'Erlang Port'],[11211,'Memcached']];
    el.innerHTML = `
      <div class="tool-section"><input class="tool-input" id="pr-search" placeholder="Search ports or services…"></div>
      <div class="ref-list" id="pr-list">${ports.map(([p,s])=>`<div class="ref-item" data-port="${p} ${s.toLowerCase()}"><span class="ref-code" style="color:var(--cyan)">${p}</span><div><span class="ref-name">${s}</span></div></div>`).join('')}</div>`;
    q3(el,'#pr-search').addEventListener('input',function(){const q4=this.value.toLowerCase();qa3(el,'.ref-item').forEach(i=>i.style.display=i.dataset.port.includes(q4)?'':'none');});
  }
},

/* 125 */ {
  id:'mime-reference', name:'MIME Types Reference', icon:'📄', category:'web',
  description:'Quick reference for common MIME types used in HTTP and web development.',
  tags:['mime','type','content type','http','file type','reference'],
  setup(el) {
    const mimes=[['text/html','HTML','html, htm'],['text/css','CSS Stylesheet','css'],['text/javascript','JavaScript','js'],['application/json','JSON','json'],['application/xml','XML','xml'],['application/pdf','PDF','pdf'],['image/png','PNG Image','png'],['image/jpeg','JPEG Image','jpg, jpeg'],['image/gif','GIF Image','gif'],['image/svg+xml','SVG Image','svg'],['image/webp','WebP Image','webp'],['audio/mpeg','MP3 Audio','mp3'],['audio/wav','WAV Audio','wav'],['video/mp4','MP4 Video','mp4'],['video/webm','WebM Video','webm'],['font/woff2','WOFF2 Font','woff2'],['application/zip','ZIP Archive','zip'],['application/gzip','GZIP Archive','gz'],['application/x-tar','TAR Archive','tar'],['multipart/form-data','Form Data (upload)','—'],['application/octet-stream','Binary/Unknown','—']];
    el.innerHTML = `
      <div class="tool-section"><input class="tool-input" id="mt-search" placeholder="Search MIME types…"></div>
      <div class="ref-list" id="mt-list">${mimes.map(([m,n,ext])=>`<div class="ref-item" data-mime="${m.toLowerCase()} ${n.toLowerCase()} ${ext.toLowerCase()}" style="cursor:pointer" onclick="copyText('${m}');showToast('Copied: ${m}')"><span class="ref-code" style="min-width:50px;color:var(--cyan)">${ext}</span><div><div class="ref-name">${m}</div><div class="ref-desc">${n}</div></div></div>`).join('')}</div>`;
    q3(el,'#mt-search').addEventListener('input',function(){const q4=this.value.toLowerCase();qa3(el,'.ref-item').forEach(i=>i.style.display=i.dataset.mime.includes(q4)?'':'none');});
  }
},

/* 126 */ {
  id:'ip-info', name:'IP Address Info', icon:'🌐', category:'web',
  description:'Get information about your current public IP address and browser network details.',
  tags:['ip','address','network','lookup','geolocation','browser'],
  setup(el) {
    el.innerHTML = `
      <div id="ip-result" class="mt-2"><div class="pulse" style="text-align:center;padding:40px;color:var(--text-muted)">Detecting your IP…</div></div>`;
    const info=[
      ['Connection Type',navigator.connection?.effectiveType||'Unknown'],
      ['Languages',navigator.languages?.join(', ')||navigator.language],
      ['Cookies Enabled',navigator.cookieEnabled?'Yes':'No'],
      ['Java Enabled',navigator.javaEnabled?.()?'Yes':'No'],
      ['Platform',navigator.platform],
      ['Vendor',navigator.vendor||'Unknown'],
    ];
    fetch('https://api.ipify.org?format=json').then(r=>r.json()).then(data=>{
      q3(el,'#ip-result').innerHTML=`<div class="stats-grid">
        <div class="stat-card" style="grid-column:1/-1"><div class="stat-card-num" style="font-size:1.4rem">${data.ip}</div><div class="stat-card-label">Your Public IP Address</div></div>
      </div>
      <div class="ref-list mt-2">${info.map(([k,v])=>`<div class="ref-item"><span class="ref-code" style="min-width:160px">${k}</span><span class="ref-name">${v}</span></div>`).join('')}</div>`;
    }).catch(()=>{
      q3(el,'#ip-result').innerHTML=`<div class="alert alert-warning">Could not fetch public IP (network blocked)</div>
      <div class="ref-list mt-2">${info.map(([k,v])=>`<div class="ref-item"><span class="ref-code" style="min-width:160px">${k}</span><span class="ref-name">${v}</span></div>`).join('')}</div>`;
    });
  }
},

/* 127 */ {
  id:'sitemap-gen', name:'Sitemap Generator', icon:'🗺️', category:'web',
  description:'Generate a basic XML sitemap for your website from a list of URLs.',
  tags:['sitemap','xml','seo','website','urls','crawler'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Website URLs (one per line)</label>
        <textarea class="tool-textarea" id="sg2-urls" style="min-height:120px">https://example.com/\nhttps://example.com/about\nhttps://example.com/contact\nhttps://example.com/blog</textarea>
      </div>
      <div class="grid-2">
        <div class="tool-section"><label class="tool-label">Change Frequency</label>
          <select class="tool-select" id="sg2-freq"><option>always</option><option>hourly</option><option selected>weekly</option><option>monthly</option><option>yearly</option><option>never</option></select>
        </div>
        <div class="tool-section"><label class="tool-label">Priority</label>
          <select class="tool-select" id="sg2-pri"><option>1.0</option><option>0.9</option><option selected>0.8</option><option>0.7</option><option>0.5</option><option>0.3</option></select>
        </div>
      </div>
      <button class="cyber-btn" id="sg2-gen">Generate Sitemap</button>
      ${outputBlock('sg2-out','sitemap.xml')}`;
    q3(el,'#sg2-out').style.maxHeight='260px';
    q3(el,'#sg2-gen').addEventListener('click',()=>{
      const urls=q3(el,'#sg2-urls').value.trim().split('\n').filter(Boolean);
      const freq=q3(el,'#sg2-freq').value, pri=q3(el,'#sg2-pri').value;
      const today=new Date().toISOString().split('T')[0];
      const xml=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u=>`  <url>\n    <loc>${u.trim()}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${pri}</priority>\n  </url>`).join('\n')}\n</urlset>`;
      q3(el,'#sg2-out').textContent=xml;
    });
    q3(el,'#sg2-gen').click();
  }
},

/* 128 */ {
  id:'xml-to-json', name:'XML to JSON Converter', icon:'🔄', category:'web',
  description:'Convert XML data to JSON format using the browser\'s DOMParser.',
  tags:['xml','json','convert','data','transform','parse'],
  setup(el) {
    function xmlToJson(xml){
      const obj={};
      if(xml.nodeType===1){if(xml.attributes.length>0)obj['@']=Object.fromEntries([...xml.attributes].map(a=>[a.nodeName,a.nodeValue]));}
      if(xml.hasChildNodes()){[...xml.childNodes].forEach(c=>{const cn=c.nodeName;if(c.nodeType===3){if(c.nodeValue.trim())obj['#text']=c.nodeValue.trim();}else{const cj=xmlToJson(c);if(obj[cn])obj[cn]=Array.isArray(obj[cn])?[...obj[cn],cj]:[obj[cn],cj];else obj[cn]=cj;}});}
      return obj;
    }
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">XML Input</label>
        <textarea class="tool-textarea" id="x2j-in" style="min-height:130px" placeholder="<root><item>Hello</item></root>"><root><person><name>Alice</name><age>30</age></person></root></textarea>
      </div>
      <button class="cyber-btn" id="x2j-run">Convert to JSON</button>
      <div id="x2j-msg"></div>
      ${outputBlock('x2j-out','JSON')}`;
    q3(el,'#x2j-run').addEventListener('click',()=>{
      try{
        const parser=new DOMParser();
        const doc=parser.parseFromString(q3(el,'#x2j-in').value,'text/xml');
        if(doc.querySelector('parsererror'))throw new Error(doc.querySelector('parsererror').textContent);
        const json=jsonToJson(doc.documentElement);
        q3(el,'#x2j-out').textContent=JSON.stringify({[doc.documentElement.nodeName]:xmlToJson(doc.documentElement)},null,2);
        q3(el,'#x2j-msg').innerHTML='<div class="alert alert-success">✅ Converted</div>';
      }catch(e){q3(el,'#x2j-msg').innerHTML=`<div class="alert alert-error">❌ ${escapeHTML(e.message)}</div>`;}
      function jsonToJson(node){const o={};if(node.attributes?.length)Object.assign(o,Object.fromEntries([...node.attributes].map(a=>[a.name,a.value])));[...node.childNodes].forEach(c=>{if(c.nodeType===3&&c.nodeValue.trim())o['_text']=c.nodeValue.trim();else if(c.nodeType===1){const v=jsonToJson(c);o[c.nodeName]=o[c.nodeName]?[].concat(o[c.nodeName],v):v;}});return o;}
    });
  }
},

/* 129 */ {
  id:'lorem-picsum', name:'Placeholder Image Generator', icon:'🖼️', category:'web',
  description:'Generate placeholder images at any size for mockups and prototypes.',
  tags:['placeholder','image','lorem picsum','mockup','design','prototype'],
  setup(el) {
    el.innerHTML = `
      <div class="grid-2">
        <div class="tool-section"><label class="tool-label">Width</label><input class="tool-input" id="pi-w" type="number" value="400" min="10"></div>
        <div class="tool-section"><label class="tool-label">Height</label><input class="tool-input" id="pi-h" type="number" value="300" min="10"></div>
        <div class="tool-section"><label class="tool-label">Type</label>
          <select class="tool-select" id="pi-type">
            <option value="picsum">Photo (picsum)</option>
            <option value="solid">Solid Color</option>
            <option value="svg">SVG Placeholder</option>
          </select>
        </div>
        <div class="tool-section"><label class="tool-label">BG Color</label><input type="color" id="pi-bg" value="#7c3aed" style="width:100%;height:40px"></div>
      </div>
      <button class="cyber-btn" id="pi-gen">Generate</button>
      <div id="pi-out"></div>
      ${outputBlock('pi-url-out','URL')}`;
    q3(el,'#pi-gen').addEventListener('click',()=>{
      const w=+q3(el,'#pi-w').value, h=+q3(el,'#pi-h').value, type=q3(el,'#pi-type').value, bg=q3(el,'#pi-bg').value.replace('#','');
      let url='';
      if(type==='picsum')url=`https://picsum.photos/${w}/${h}`;
      else if(type==='solid'){const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;const ctx=canvas.getContext('2d');ctx.fillStyle='#'+bg;ctx.fillRect(0,0,w,h);ctx.fillStyle='#fff';ctx.font='bold 20px Arial';ctx.textAlign='center';ctx.fillText(`${w} × ${h}`,w/2,h/2+8);url=canvas.toDataURL();}
      else{url=`data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><rect fill='%23${bg}' width='${w}' height='${h}'/><text fill='%23fff' font-size='18' font-family='Arial' x='${w/2}' y='${h/2+7}' text-anchor='middle'>${w}×${h}</text></svg>`;}
      q3(el,'#pi-out').innerHTML=`<img src="${url}" style="max-width:100%;max-height:220px;display:block;margin:0 auto;border-radius:var(--r-md);border:1px solid var(--border)">`;
      q3(el,'#pi-url-out').textContent=url;
    });
    q3(el,'#pi-gen').click();
  }
},

/* 130 */ {
  id:'html-validator', name:'HTML Structure Checker', icon:'✅', category:'web',
  description:'Check your HTML for common errors: unclosed tags, duplicate IDs, missing alts, and more.',
  tags:['html','validate','check','errors','structure','accessibility'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">HTML to Check</label>
        <textarea class="tool-textarea" id="hv-in" style="min-height:140px" placeholder="<html><body><p>Hello</p></body></html>"></textarea>
      </div>
      <button class="cyber-btn" id="hv-run">Check HTML</button>
      <div id="hv-out"></div>`;
    q3(el,'#hv-run').addEventListener('click',()=>{
      const html=q3(el,'#hv-in').value;
      const issues=[];
      const parser=new DOMParser();
      const doc=parser.parseFromString(html,'text/html');
      const pErr=doc.querySelector('parseerror');
      if(pErr)issues.push({type:'error',msg:'Parse error: '+pErr.textContent.slice(0,100)});
      const imgs=doc.querySelectorAll('img:not([alt])');
      if(imgs.length)issues.push({type:'warn',msg:`${imgs.length} <img> element(s) missing alt attribute`});
      const dupIds={};doc.querySelectorAll('[id]').forEach(e=>{const id=e.id;dupIds[id]=(dupIds[id]||0)+1;});
      Object.entries(dupIds).filter(([,c])=>c>1).forEach(([id,c])=>issues.push({type:'error',msg:`Duplicate id="${id}" found ${c} times`}));
      if(!doc.querySelector('html'))issues.push({type:'warn',msg:'No <html> element found'});
      if(!doc.querySelector('head'))issues.push({type:'warn',msg:'No <head> element found'});
      if(!doc.querySelector('title'))issues.push({type:'info',msg:'No <title> element found'});
      if(!doc.querySelector('meta[name="description"]'))issues.push({type:'info',msg:'No meta description found'});
      const links=doc.querySelectorAll('a:not([href])');
      if(links.length)issues.push({type:'warn',msg:`${links.length} <a> element(s) missing href`});
      if(issues.length===0)issues.push({type:'success',msg:'No common issues found!'});
      q3(el,'#hv-out').innerHTML=issues.map(i=>{const cls=i.type==='error'?'alert-error':i.type==='warn'?'alert-warning':i.type==='success'?'alert-success':'alert-info';return `<div class="alert ${cls} mb-1">${i.msg}</div>`;}).join('');
    });
  }
},

/* 131 */ {
  id:'json-validator', name:'JSON Schema Linter', icon:'🔍', category:'web',
  description:'Validate and lint JSON with detailed error messages and line numbers.',
  tags:['json','validate','lint','check','error','parse'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">JSON to Validate</label>
        <textarea class="tool-textarea" id="jl-in" style="min-height:160px" placeholder='{"key": "value"}'></textarea>
      </div>
      <div id="jl-out"></div>`;
    q3(el,'#jl-in').addEventListener('input',function(){
      const t=this.value.trim();
      if(!t){q3(el,'#jl-out').innerHTML='';return;}
      try{
        const obj=JSON.parse(t);
        const keys=typeof obj==='object'&&obj?Object.keys(Array.isArray(obj)?obj[0]||{}:obj).length:0;
        const size=(new Blob([t]).size);
        q3(el,'#jl-out').innerHTML=`<div class="alert alert-success">✅ Valid JSON</div>
        <div class="stats-grid mt-2">
          <div class="stat-card"><div class="stat-card-num">${Array.isArray(obj)?obj.length:keys}</div><div class="stat-card-label">${Array.isArray(obj)?'Items':'Keys'}</div></div>
          <div class="stat-card"><div class="stat-card-num">${(size/1024).toFixed(2)} KB</div><div class="stat-card-label">Size</div></div>
          <div class="stat-card"><div class="stat-card-num">${typeof obj}</div><div class="stat-card-label">Type</div></div>
        </div>`;
      }catch(e){
        const match=e.message.match(/position (\d+)/);
        const pos=match?parseInt(match[1]):0;
        const before=t.substring(Math.max(0,pos-20),pos);
        const after=t.substring(pos,Math.min(t.length,pos+20));
        q3(el,'#jl-out').innerHTML=`<div class="alert alert-error">❌ ${escapeHTML(e.message)}</div>${pos?`<div class="tool-output mt-2" style="font-size:.82rem">…${escapeHTML(before)}<mark style="background:rgba(239,68,68,.3);border-radius:2px">${escapeHTML(t[pos]||'[end]')}</mark>${escapeHTML(after)}…</div>`:''}`;
      }
    });
    q3(el,'#jl-in').value='{\n  "name": "AllTools",\n  "version": "1.0",\n  "tools": 135,\n  "free": true\n}';
    q3(el,'#jl-in').dispatchEvent(new Event('input'));
  }
},

/* 132 */ {
  id:'text-to-html', name:'Text to HTML Converter', icon:'📄', category:'web',
  description:'Convert plain text to HTML — auto-detect paragraphs, line breaks, and hyperlinks.',
  tags:['text','html','convert','paragraphs','links','auto'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Plain Text</label>
        <textarea class="tool-textarea" id="t2h-in" style="min-height:120px" placeholder="Paste plain text here…">Hello World!\n\nThis is a paragraph.\n\nVisit https://example.com for more.</textarea>
      </div>
      <div class="flex-gap mb-2">
        <label style="display:flex;align-items:center;gap:6px;cursor:pointer;color:var(--text-secondary)"><input type="checkbox" id="t2h-links" checked> Auto-link URLs</label>
        <label style="display:flex;align-items:center;gap:6px;cursor:pointer;color:var(--text-secondary)"><input type="checkbox" id="t2h-paras" checked> Wrap in paragraphs</label>
      </div>
      <button class="cyber-btn" id="t2h-run">Convert</button>
      ${outputBlock('t2h-out','HTML')}`;
    q3(el,'#t2h-run').addEventListener('click',()=>{
      let t=q3(el,'#t2h-in').value;
      t=escapeHTML(t);
      if(q3(el,'#t2h-links').checked)t=t.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1">$1</a>');
      if(q3(el,'#t2h-paras').checked)t=t.split(/\n\n+/).map(p=>`<p>${p.replace(/\n/g,'<br>')}</p>`).join('\n');
      else t=t.replace(/\n/g,'<br>');
      q3(el,'#t2h-out').textContent=t;
    });
  }
},

/* 133 */ {
  id:'word-frequency', name:'Word Frequency Counter', icon:'📊', category:'web',
  description:'Count how often each word appears in text and show ranked frequency chart.',
  tags:['word','frequency','count','analytics','text','stats'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><textarea class="tool-textarea" id="wf-in" style="min-height:120px" placeholder="Paste text here…">To be or not to be that is the question whether tis nobler in the mind to suffer the slings and arrows of outrageous fortune or to take arms against a sea of troubles</textarea></div>
      <div class="flex-gap mb-2">
        <div class="tool-section w-auto"><label class="tool-label">Top N words</label><input class="tool-input" id="wf-top" type="number" value="20" min="1" max="100" style="width:80px"></div>
        <div class="tool-section" style="align-self:flex-end"><button class="cyber-btn" id="wf-run">Count</button></div>
        <label style="display:flex;align-items:center;gap:6px;cursor:pointer;color:var(--text-secondary);align-self:flex-end"><input type="checkbox" id="wf-stop" checked> Skip common words</label>
      </div>
      <div id="wf-out"></div>`;
    const stopwords=new Set(['the','a','an','and','or','but','in','on','at','to','for','of','with','by','from','is','was','are','were','be','been','have','has','had','do','does','did','will','would','could','should','may','might','shall','can','that','this','these','those','it','its','i','you','he','she','we','they','what','which','who','not']);
    q3(el,'#wf-run').addEventListener('click',()=>{
      const text=q3(el,'#wf-in').value.toLowerCase().replace(/[^a-z\s]/g,' ');
      const words=text.split(/\s+/).filter(Boolean);
      const skipStop=q3(el,'#wf-stop').checked;
      const freq={};
      words.forEach(w=>{if(!skipStop||!stopwords.has(w))freq[w]=(freq[w]||0)+1;});
      const sorted=Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,+q3(el,'#wf-top').value||20);
      const max=sorted[0]?.[1]||1;
      q3(el,'#wf-out').innerHTML=sorted.map(([w,c])=>`<div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
        <span style="min-width:80px;font-family:var(--font-mono);font-size:.85rem;color:var(--text-primary)">${w}</span>
        <div style="flex:1;background:rgba(255,255,255,.06);border-radius:3px;height:14px;overflow:hidden">
          <div style="width:${(c/max*100).toFixed(1)}%;height:100%;background:var(--grad-primary);border-radius:3px"></div>
        </div>
        <span style="min-width:30px;text-align:right;font-size:.82rem;color:var(--text-muted)">${c}</span>
      </div>`).join('');
    });
    q3(el,'#wf-run').click();
  }
},

/* 134 */ {
  id:'text-compare-adv', name:'Line by Line Comparator', icon:'📊', category:'web',
  description:'Compare two texts and get statistics: similarity score, matching lines, unique lines.',
  tags:['compare','similarity','text','lines','jaccard','diff'],
  setup(el) {
    el.innerHTML = `
      <div class="grid-2 mb-2">
        <div class="tool-section"><label class="tool-label">Text A</label><textarea class="tool-textarea" id="tca-a" style="min-height:140px" placeholder="First text…"></textarea></div>
        <div class="tool-section"><label class="tool-label">Text B</label><textarea class="tool-textarea" id="tca-b" style="min-height:140px" placeholder="Second text…"></textarea></div>
      </div>
      <button class="cyber-btn" id="tca-run">Compare Texts</button>
      <div id="tca-out"></div>`;
    q3(el,'#tca-run').addEventListener('click',()=>{
      const a=new Set(q3(el,'#tca-a').value.split('\n').filter(Boolean));
      const b=new Set(q3(el,'#tca-b').value.split('\n').filter(Boolean));
      const intersection=[...a].filter(x=>b.has(x));
      const union=new Set([...a,...b]);
      const similarity=union.size?(intersection.length/union.size*100).toFixed(1):0;
      const onlyA=[...a].filter(x=>!b.has(x));
      const onlyB=[...b].filter(x=>!a.has(x));
      q3(el,'#tca-out').innerHTML=`<div class="stats-grid">
        <div class="stat-card"><div class="stat-card-num">${similarity}%</div><div class="stat-card-label">Similarity</div></div>
        <div class="stat-card"><div class="stat-card-num">${intersection.length}</div><div class="stat-card-label">Matching Lines</div></div>
        <div class="stat-card"><div class="stat-card-num">${onlyA.length}</div><div class="stat-card-label">Only in A</div></div>
        <div class="stat-card"><div class="stat-card-num">${onlyB.length}</div><div class="stat-card-label">Only in B</div></div>
      </div>
      ${onlyA.length?`<div class="tool-section mt-2"><label class="tool-label" style="color:#f87171">Only in A</label><div class="tool-output" style="max-height:100px;color:#f87171">${onlyA.map(escapeHTML).join('\n')}</div></div>`:''}
      ${onlyB.length?`<div class="tool-section"><label class="tool-label" style="color:var(--emerald)">Only in B</label><div class="tool-output" style="max-height:100px;color:var(--emerald)">${onlyB.map(escapeHTML).join('\n')}</div></div>`:''}`;
    });
  }
},

/* 135 */ {
  id:'html-color-codes', name:'HTML Color Names Reference', icon:'🎨', category:'web',
  description:'Browse all 140+ named HTML/CSS colors with HEX and RGB values.',
  tags:['color','html','css','named colors','reference','hex'],
  setup(el) {
    const colors=[['AliceBlue','#F0F8FF'],['AntiqueWhite','#FAEBD7'],['Aqua','#00FFFF'],['Aquamarine','#7FFFD4'],['Azure','#F0FFFF'],['Beige','#F5F5DC'],['Bisque','#FFE4C4'],['Black','#000000'],['BlanchedAlmond','#FFEBCD'],['Blue','#0000FF'],['BlueViolet','#8A2BE2'],['Brown','#A52A2A'],['BurlyWood','#DEB887'],['CadetBlue','#5F9EA0'],['Chartreuse','#7FFF00'],['Chocolate','#D2691E'],['Coral','#FF7F50'],['CornflowerBlue','#6495ED'],['Cornsilk','#FFF8DC'],['Crimson','#DC143C'],['Cyan','#00FFFF'],['DarkBlue','#00008B'],['DarkCyan','#008B8B'],['DarkGoldenRod','#B8860B'],['DarkGray','#A9A9A9'],['DarkGreen','#006400'],['DarkKhaki','#BDB76B'],['DarkMagenta','#8B008B'],['DarkOliveGreen','#556B2F'],['DarkOrange','#FF8C00'],['DarkOrchid','#9932CC'],['DarkRed','#8B0000'],['DarkSalmon','#E9967A'],['DarkSeaGreen','#8FBC8F'],['DarkSlateBlue','#483D8B'],['DarkSlateGray','#2F4F4F'],['DarkTurquoise','#00CED1'],['DarkViolet','#9400D3'],['DeepPink','#FF1493'],['DeepSkyBlue','#00BFFF'],['DimGray','#696969'],['DodgerBlue','#1E90FF'],['FireBrick','#B22222'],['FloralWhite','#FFFAF0'],['ForestGreen','#228B22'],['Fuchsia','#FF00FF'],['Gainsboro','#DCDCDC'],['GhostWhite','#F8F8FF'],['Gold','#FFD700'],['GoldenRod','#DAA520'],['Gray','#808080'],['Green','#008000'],['GreenYellow','#ADFF2F'],['HoneyDew','#F0FFF0'],['HotPink','#FF69B4'],['IndianRed','#CD5C5C'],['Indigo','#4B0082'],['Ivory','#FFFFF0'],['Khaki','#F0E68C'],['Lavender','#E6E6FA'],['LavenderBlush','#FFF0F5'],['LawnGreen','#7CFC00'],['LemonChiffon','#FFFACD'],['LightBlue','#ADD8E6'],['LightCoral','#F08080'],['LightCyan','#E0FFFF'],['LightGoldenRodYellow','#FAFAD2'],['LightGray','#D3D3D3'],['LightGreen','#90EE90'],['LightPink','#FFB6C1'],['LightSalmon','#FFA07A'],['LightSeaGreen','#20B2AA'],['LightSkyBlue','#87CEFA'],['LightSlateGray','#778899'],['LightSteelBlue','#B0C4DE'],['LightYellow','#FFFFE0'],['Lime','#00FF00'],['LimeGreen','#32CD32'],['Linen','#FAF0E6'],['Magenta','#FF00FF'],['Maroon','#800000'],['MediumAquaMarine','#66CDAA'],['MediumBlue','#0000CD'],['MediumOrchid','#BA55D3'],['MediumPurple','#9370DB'],['MediumSeaGreen','#3CB371'],['MediumSlateBlue','#7B68EE'],['MediumSpringGreen','#00FA9A'],['MediumTurquoise','#48D1CC'],['MediumVioletRed','#C71585'],['MidnightBlue','#191970'],['MintCream','#F5FFFA'],['MistyRose','#FFE4E1'],['Moccasin','#FFE4B5'],['Navy','#000080'],['OldLace','#FDF5E6'],['Olive','#808000'],['OliveDrab','#6B8E23'],['Orange','#FFA500'],['OrangeRed','#FF4500'],['Orchid','#DA70D6'],['PaleGoldenRod','#EEE8AA'],['PaleGreen','#98FB98'],['PaleTurquoise','#AFEEEE'],['PaleVioletRed','#DB7093'],['PapayaWhip','#FFEFD5'],['PeachPuff','#FFDAB9'],['Peru','#CD853F'],['Pink','#FFC0CB'],['Plum','#DDA0DD'],['PowderBlue','#B0E0E6'],['Purple','#800080'],['Red','#FF0000'],['RosyBrown','#BC8F8F'],['RoyalBlue','#4169E1'],['SaddleBrown','#8B4513'],['Salmon','#FA8072'],['SandyBrown','#F4A460'],['SeaGreen','#2E8B57'],['SeaShell','#FFF5EE'],['Sienna','#A0522D'],['Silver','#C0C0C0'],['SkyBlue','#87CEEB'],['SlateBlue','#6A5ACD'],['SlateGray','#708090'],['Snow','#FFFAFA'],['SpringGreen','#00FF7F'],['SteelBlue','#4682B4'],['Tan','#D2B48C'],['Teal','#008080'],['Thistle','#D8BFD8'],['Tomato','#FF6347'],['Turquoise','#40E0D0'],['Violet','#EE82EE'],['Wheat','#F5DEB3'],['White','#FFFFFF'],['WhiteSmoke','#F5F5F5'],['Yellow','#FFFF00'],['YellowGreen','#9ACD32']];
    el.innerHTML = `
      <div class="tool-section"><input class="tool-input" id="hcc-search" placeholder="Search color name or hex…"></div>
      <div id="hcc-grid" style="display:flex;flex-wrap:wrap;gap:8px;max-height:380px;overflow-y:auto;margin-top:8px"></div>`;
    function render(list){
      q3(el,'#hcc-grid').innerHTML=list.map(([name,hex])=>{
        const rgb=hexToRgb(hex);
        const lum=rgb?(0.2126*rgb.r+0.7152*rgb.g+0.0722*rgb.b)/255:0.5;
        const textColor=lum>0.5?'#000':'#fff';
        return `<div onclick="copyText('${hex}');showToast('Copied ${hex}')" style="cursor:pointer;background:${hex};padding:8px 10px;border-radius:var(--r-sm);border:1px solid rgba(0,0,0,.15);min-width:140px;text-align:center" data-name="${name.toLowerCase()} ${hex.toLowerCase()}"><div style="font-size:.75rem;font-weight:600;color:${textColor}">${name}</div><div style="font-size:.68rem;color:${textColor};opacity:.8">${hex}</div></div>`;
      }).join('');
    }
    render(colors);
    q3(el,'#hcc-search').addEventListener('input',function(){const q4=this.value.toLowerCase();render(colors.filter(([n,h])=>n.toLowerCase().includes(q4)||h.toLowerCase().includes(q4)));});
  }
}

); // end WEB TOOLS push
