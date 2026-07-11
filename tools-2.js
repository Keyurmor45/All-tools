/* ================================================================
   tools-2.js — Math/Calc (20) + Image (10) + Color/Design (10) = 40 tools
   ================================================================ */
function q2(el,s){return el.querySelector(s);}
function qa2(el,s){return el.querySelectorAll(s);}

/* ================================================================
   MATH & CALCULATORS (20)
   ================================================================ */
TOOLS.push(

/* 45 */ {
  id:'scientific-calc', name:'Scientific Calculator', icon:'🔢', category:'math',
  description:'Full-featured scientific calculator with trig, log, factorial, and memory functions.',
  tags:['calculator','scientific','math','trig','sin','cos','log'],
  setup(el) {
    el.innerHTML = `
      <div id="sc-display" style="background:rgba(0,0,0,.4);border:1px solid var(--border);border-radius:var(--r-md);padding:14px 18px;text-align:right;margin-bottom:10px">
        <div id="sc-expr" style="font-size:.8rem;color:var(--text-muted);min-height:18px"></div>
        <div id="sc-val" style="font-family:var(--font-mono);font-size:2rem;font-weight:700;color:var(--text-primary);word-break:break-all">0</div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px">
        ${[
          ['sin','sin(','fn'],['cos','cos(','fn'],['tan','tan(','fn'],['π','Math.PI','const'],['e','Math.E','const'],
          ['sin⁻¹','Math.asin(','fn'],['cos⁻¹','Math.acos(','fn'],['tan⁻¹','Math.atan(','fn'],['x²','**2)','op'],['√','Math.sqrt(','fn'],
          ['log','Math.log10(','fn'],['ln','Math.log(','fn'],['(','(','sym'],[')',')','sym'],['%','%','op'],
          ['7','7','num'],['8','8','num'],['9','9','num'],['÷','/','op'],['DEL','DEL','action'],
          ['4','4','num'],['5','5','num'],['6','6','num'],['×','*','op'],['C','C','action'],
          ['1','1','num'],['2','2','num'],['3','3','num'],['−','-','op'],['±','±','action'],
          ['0','0','num'],['.','.','.'],['EXP','e+','sym'],['＋','+','op'],['=','=','action'],
        ].map(([label,val,type])=>`<button class="btn ${type==='action'?(label==='='?'btn-primary':'btn-danger btn-sm'):(type==='op'?'btn-secondary':'btn-secondary')} sc-btn" data-val="${val}" data-label="${label}" style="padding:10px;font-size:${type==='fn'?'.75rem':'.9rem'};font-family:var(--font-mono)">${label}</button>`).join('')}
      </div>`;
    let expr='',result='0';
    const disp=()=>{q2(el,'#sc-expr').textContent=expr;};
    q2(el,'.btn-group')?.remove();
    el.querySelectorAll('.sc-btn').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const label=btn.dataset.label, val=btn.dataset.val;
        if(label==='C'){expr='';result='0';q2(el,'#sc-val').textContent='0';disp();}
        else if(label==='DEL'){expr=expr.slice(0,-1);disp();}
        else if(label==='='){
          try{
            const r=Function('"use strict";return ('+expr+')')();
            result=String(Math.round(r*1e10)/1e10);
            q2(el,'#sc-val').textContent=result;
            expr=result;disp();
          }catch{q2(el,'#sc-val').textContent='Error';}
        }
        else if(label==='±'){expr=expr?`-(${expr})`:'';disp();}
        else{expr+=val;disp();}
      });
    });
  }
},

/* 46 */ {
  id:'percentage-calc', name:'Percentage Calculator', icon:'💯', category:'math',
  description:'Calculate percentages: what is X% of Y, X is what % of Y, percentage change, and more.',
  tags:['percentage','percent','calculate','math','%'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-tabs">
        <button class="tool-tab active" data-pct="a">X% of Y</button>
        <button class="tool-tab" data-pct="b">X is ?% of Y</button>
        <button class="tool-tab" data-pct="c">% Change</button>
        <button class="tool-tab" data-pct="d">Add/Sub %</button>
      </div>
      <div id="pct-a" class="tab-pane active">
        <div class="grid-2"><div class="tool-section"><label class="tool-label">Percentage (%)</label><input class="tool-input" id="pa-pct" type="number" value="25"></div>
        <div class="tool-section"><label class="tool-label">Of Number</label><input class="tool-input" id="pa-num" type="number" value="200"></div></div>
        <div id="pa-res" class="alert alert-info mt-2">25% of 200 = 50</div>
      </div>
      <div id="pct-b" class="tab-pane">
        <div class="grid-2"><div class="tool-section"><label class="tool-label">Number (X)</label><input class="tool-input" id="pb-x" type="number" value="50"></div>
        <div class="tool-section"><label class="tool-label">Total (Y)</label><input class="tool-input" id="pb-y" type="number" value="200"></div></div>
        <div id="pb-res" class="alert alert-info mt-2">50 is 25% of 200</div>
      </div>
      <div id="pct-c" class="tab-pane">
        <div class="grid-2"><div class="tool-section"><label class="tool-label">Original Value</label><input class="tool-input" id="pc-orig" type="number" value="100"></div>
        <div class="tool-section"><label class="tool-label">New Value</label><input class="tool-input" id="pc-new" type="number" value="125"></div></div>
        <div id="pc-res" class="alert alert-info mt-2">25% increase</div>
      </div>
      <div id="pct-d" class="tab-pane">
        <div class="grid-2"><div class="tool-section"><label class="tool-label">Value</label><input class="tool-input" id="pd-val" type="number" value="100"></div>
        <div class="tool-section"><label class="tool-label">Percentage (%)</label><input class="tool-input" id="pd-pct" type="number" value="15"></div></div>
        <div id="pd-res" class="alert alert-info mt-2">100 + 15% = 115 | 100 − 15% = 85</div>
      </div>`;
    qa2(el,'.tool-tab').forEach(t=>t.addEventListener('click',()=>{
      qa2(el,'.tool-tab').forEach(x=>x.classList.remove('active'));
      qa2(el,'.tab-pane').forEach(x=>x.classList.remove('active'));
      t.classList.add('active'); q2(el,`#pct-${t.dataset.pct}`).classList.add('active');
    }));
    function upA(){const p=+q2(el,'#pa-pct').value,n=+q2(el,'#pa-num').value;q2(el,'#pa-res').textContent=`${p}% of ${n} = ${(p*n/100).toFixed(4)}`;}
    function upB(){const x=+q2(el,'#pb-x').value,y=+q2(el,'#pb-y').value;q2(el,'#pb-res').textContent=`${x} is ${y?((x/y)*100).toFixed(2):0}% of ${y}`;}
    function upC(){const o=+q2(el,'#pc-orig').value,n=+q2(el,'#pc-new').value;const ch=o?((n-o)/o*100).toFixed(2):0;q2(el,'#pc-res').textContent=`${ch>0?'+'+ch:ch}% ${+ch>0?'increase':'decrease'}`;}
    function upD(){const v=+q2(el,'#pd-val').value,p=+q2(el,'#pd-pct').value;q2(el,'#pd-res').textContent=`${v} + ${p}% = ${(v*(1+p/100)).toFixed(4)}  |  ${v} − ${p}% = ${(v*(1-p/100)).toFixed(4)}`;}
    [['#pa-pct','#pa-num',upA],['#pb-x','#pb-y',upB],['#pc-orig','#pc-new',upC],['#pd-val','#pd-pct',upD]].forEach(([a,b,fn])=>{
      q2(el,a)?.addEventListener('input',fn); q2(el,b)?.addEventListener('input',fn);
    });
    [upA,upB,upC,upD].forEach(fn=>fn());
  }
},

/* 47 */ {
  id:'number-base', name:'Number Base Converter', icon:'🔢', category:'math',
  description:'Convert numbers between binary, octal, decimal, and hexadecimal.',
  tags:['binary','octal','hex','decimal','base','convert','number'],
  setup(el) {
    el.innerHTML = `
      <div class="grid-2">
        ${[['nb-dec','Decimal (Base 10)','10'],['nb-bin','Binary (Base 2)','2'],['nb-oct','Octal (Base 8)','8'],['nb-hex','Hexadecimal (Base 16)','16']].map(([id,label,base])=>`
        <div class="tool-section"><label class="tool-label">${label}</label>
          <input class="tool-input" id="${id}" data-base="${base}" placeholder="${label.split(' ')[0]} number" style="font-family:var(--font-mono);text-transform:uppercase">
        </div>`).join('')}
      </div>`;
    const fields=[['nb-dec','10'],['nb-bin','2'],['nb-oct','8'],['nb-hex','16']];
    fields.forEach(([id,base])=>{
      q2(el,`#${id}`).addEventListener('input',function(){
        try{
          const n=parseInt(this.value,+base);
          if(isNaN(n)){fields.filter(f=>f[0]!==id).forEach(([fid])=>q2(el,`#${fid}`).value='');return;}
          fields.filter(f=>f[0]!==id).forEach(([fid,fb])=>{q2(el,`#${fid}`).value=n.toString(+fb).toUpperCase();});
        }catch{}
      });
    });
  }
},

/* 48 */ {
  id:'roman-numerals', name:'Roman Numeral Converter', icon:'🏛️', category:'math',
  description:'Convert between Roman numerals and Arabic numbers (1–3999).',
  tags:['roman','numeral','convert','roman numerals','ancient'],
  setup(el) {
    const vals=[[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
    function toRoman(n){let r='';vals.forEach(([v,s])=>{while(n>=v){r+=s;n-=v;}});return r;}
    function fromRoman(s){const map={I:1,V:5,X:10,L:50,C:100,D:500,M:1000};let r=0;for(let i=0;i<s.length;i++){const c=map[s[i]],n=map[s[i+1]];r+=c&&n&&c<n?-c:c||0;}return r;}
    el.innerHTML = `
      <div class="grid-2">
        <div class="tool-section"><label class="tool-label">Arabic → Roman</label>
          <input class="tool-input" id="rn-arab" type="number" placeholder="e.g. 2024" min="1" max="3999">
          <div id="rn-arab-out" class="tool-output mt-2" style="min-height:40px;font-size:1.4rem;text-align:center;font-family:var(--font-head)"></div>
        </div>
        <div class="tool-section"><label class="tool-label">Roman → Arabic</label>
          <input class="tool-input" id="rn-rom" placeholder="e.g. MMXXIV" style="text-transform:uppercase">
          <div id="rn-rom-out" class="tool-output mt-2" style="min-height:40px;font-size:1.4rem;text-align:center;font-family:var(--font-head)"></div>
        </div>
      </div>`;
    q2(el,'#rn-arab').addEventListener('input',function(){const n=parseInt(this.value);q2(el,'#rn-arab-out').textContent=n>=1&&n<=3999?toRoman(n):'Range: 1–3999';});
    q2(el,'#rn-rom').addEventListener('input',function(){const r=fromRoman(this.value.toUpperCase());q2(el,'#rn-rom-out').textContent=r||'?';});
    q2(el,'#rn-arab').value='2024'; q2(el,'#rn-arab').dispatchEvent(new Event('input'));
  }
},

/* 49 */ {
  id:'prime-checker', name:'Prime Number Checker', icon:'🔵', category:'math',
  description:'Check if a number is prime, find prime factors, and generate a list of primes.',
  tags:['prime','number','factor','divisor','math'],
  setup(el) {
    function isPrime(n){if(n<2)return false;if(n<4)return true;if(n%2===0||n%3===0)return false;for(let i=5;i*i<=n;i+=6)if(n%i===0||n%(i+2)===0)return false;return true;}
    function factors(n){const f=[];for(let i=2;i*i<=n;i++)while(n%i===0){f.push(i);n/=i;}if(n>1)f.push(n);return f;}
    function primesUpTo(n){const r=[];for(let i=2;i<=n;i++)if(isPrime(i))r.push(i);return r;}
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Enter a number</label>
        <input class="tool-input" id="pc-num" type="number" value="97" min="2">
      </div>
      <div id="pc-result"></div>
      <hr class="divider">
      <div class="tool-section"><label class="tool-label">Generate primes up to</label>
        <div class="flex-gap">
          <input class="tool-input" id="pc-upto" type="number" value="100" min="2" max="10000">
          <button class="btn btn-secondary w-auto" id="pc-gen-btn">Generate</button>
        </div>
      </div>
      ${outputBlock('pc-primes','Prime Numbers')}`;
    function check(){
      const n=parseInt(q2(el,'#pc-num').value);
      const prime=isPrime(n);
      const facs=factors(n);
      q2(el,'#pc-result').innerHTML=`<div class="alert ${prime?'alert-success':'alert-warning'}">
        ${prime?'✅ PRIME':'⚠️ NOT prime'} — <strong>${n}</strong>${!prime?` = ${facs.join(' × ')}`:' (only divisible by 1 and itself)'}</div>`;
    }
    q2(el,'#pc-num').addEventListener('input',check); check();
    q2(el,'#pc-gen-btn').addEventListener('click',()=>{
      const upto=parseInt(q2(el,'#pc-upto').value)||100;
      const primes=primesUpTo(Math.min(upto,10000));
      q2(el,'#pc-primes').textContent=`${primes.length} primes found:\n${primes.join(', ')}`;
    });
  }
},

/* 50 */ {
  id:'bmi-calc', name:'BMI Calculator', icon:'⚖️', category:'math',
  description:'Calculate Body Mass Index (BMI) with health category classification.',
  tags:['bmi','body mass index','health','weight','height','obesity'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-tabs"><button class="tool-tab active" data-bmi="metric">Metric</button><button class="tool-tab" data-bmi="imperial">Imperial</button></div>
      <div id="bmi-metric" class="tab-pane active">
        <div class="grid-2">
          <div class="tool-section"><label class="tool-label">Weight (kg)</label><input class="tool-input" id="bm-wt" type="number" value="70" min="1"></div>
          <div class="tool-section"><label class="tool-label">Height (cm)</label><input class="tool-input" id="bm-ht" type="number" value="175" min="1"></div>
        </div>
      </div>
      <div id="bmi-imperial" class="tab-pane">
        <div class="grid-2">
          <div class="tool-section"><label class="tool-label">Weight (lbs)</label><input class="tool-input" id="bi-wt" type="number" value="154" min="1"></div>
          <div class="tool-section"><label class="tool-label">Height (inches)</label><input class="tool-input" id="bi-ht" type="number" value="69" min="1"></div>
        </div>
      </div>
      <div id="bmi-result" style="margin-top:16px"></div>`;
    qa2(el,'.tool-tab').forEach(t=>t.addEventListener('click',()=>{
      qa2(el,'.tool-tab').forEach(x=>x.classList.remove('active'));qa2(el,'.tab-pane').forEach(x=>x.classList.remove('active'));
      t.classList.add('active');q2(el,`#bmi-${t.dataset.bmi}`).classList.add('active');calcBMI();
    }));
    function calcBMI(){
      const isMetric=q2(el,'#bmi-metric').classList.contains('active');
      let bmi;
      if(isMetric){const wt=+q2(el,'#bm-wt').value,ht=+q2(el,'#bm-ht').value/100;bmi=wt/(ht*ht);}
      else{const wt=+q2(el,'#bi-wt').value,ht=+q2(el,'#bi-ht').value;bmi=(wt*703)/(ht*ht);}
      if(!bmi||isNaN(bmi))return;
      const cats=[['Underweight','< 18.5','#60a5fa',bmi<18.5],['Normal','18.5–24.9','var(--emerald)',bmi>=18.5&&bmi<25],['Overweight','25–29.9','var(--yellow)',bmi>=25&&bmi<30],['Obese','≥ 30','#f87171',bmi>=30]];
      const cat=cats.find(c=>c[3]);
      q2(el,'#bmi-result').innerHTML=`
        <div style="text-align:center;margin-bottom:14px">
          <div style="font-family:var(--font-head);font-size:3rem;font-weight:900;color:${cat?.[2]||'white'}">${bmi.toFixed(1)}</div>
          <div style="font-size:1rem;color:${cat?.[2]||'white'};margin-top:4px">${cat?.[0]||'Unknown'} (BMI ${cat?.[1]||''})</div>
        </div>
        <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">${cats.map(([n,r,c])=>`<div style="padding:6px 12px;border-radius:var(--r-full);background:rgba(255,255,255,.05);border:1px solid var(--border);font-size:.78rem;color:${c}">${n}<br><span style="opacity:.6">${r}</span></div>`).join('')}</div>`;
    }
    [q2(el,'#bm-wt'),q2(el,'#bm-ht'),q2(el,'#bi-wt'),q2(el,'#bi-ht')].forEach(i=>i?.addEventListener('input',calcBMI));
    calcBMI();
  }
},

/* 51 */ {
  id:'loan-calc', name:'Loan / EMI Calculator', icon:'🏦', category:'math',
  description:'Calculate monthly EMI, total interest, and total payment for any loan.',
  tags:['loan','emi','mortgage','interest','finance','calculator'],
  setup(el) {
    el.innerHTML = `
      <div class="grid-2">
        <div class="tool-section"><label class="tool-label">Principal Amount (₹/$)</label><input class="tool-input" id="lc-p" type="number" value="500000"></div>
        <div class="tool-section"><label class="tool-label">Annual Interest Rate (%)</label><input class="tool-input" id="lc-r" type="number" value="8.5" step="0.1"></div>
        <div class="tool-section"><label class="tool-label">Loan Tenure (Months)</label><input class="tool-input" id="lc-n" type="number" value="240"></div>
        <div class="tool-section" style="align-self:flex-end"><button class="btn btn-primary" id="lc-calc">Calculate EMI</button></div>
      </div>
      <div id="lc-result" class="mt-2"></div>`;
    q2(el,'#lc-calc').addEventListener('click',()=>{
      const P=+q2(el,'#lc-p').value, r=(+q2(el,'#lc-r').value)/100/12, n=+q2(el,'#lc-n').value;
      if(!P||!n){q2(el,'#lc-result').innerHTML='<div class="alert alert-error">Enter valid values</div>';return;}
      const emi=r?P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):P/n;
      const total=emi*n, interest=total-P;
      const fmt=v=>new Intl.NumberFormat('en-IN',{maximumFractionDigits:2}).format(v);
      q2(el,'#lc-result').innerHTML=`<div class="stats-grid">
        <div class="stat-card"><div class="stat-card-num">₹${fmt(emi)}</div><div class="stat-card-label">Monthly EMI</div></div>
        <div class="stat-card"><div class="stat-card-num">₹${fmt(total)}</div><div class="stat-card-label">Total Payment</div></div>
        <div class="stat-card"><div class="stat-card-num">₹${fmt(interest)}</div><div class="stat-card-label">Total Interest</div></div>
        <div class="stat-card"><div class="stat-card-num">${((interest/P)*100).toFixed(1)}%</div><div class="stat-card-label">Interest Rate</div></div>
      </div>`;
    });
    q2(el,'#lc-calc').click();
  }
},

/* 52 */ {
  id:'tip-calc', name:'Tip Calculator', icon:'🍽️', category:'math',
  description:'Calculate tip amount and split the bill among multiple people.',
  tags:['tip','bill','split','restaurant','calculator'],
  setup(el) {
    el.innerHTML = `
      <div class="grid-2">
        <div class="tool-section"><label class="tool-label">Bill Amount</label><input class="tool-input" id="tc-bill" type="number" value="100" min="0"></div>
        <div class="tool-section"><label class="tool-label">Tip % <span id="tc-tip-val">15</span>%</label><input type="range" class="tool-range" id="tc-tip" min="0" max="50" value="15"></div>
        <div class="tool-section"><label class="tool-label">Number of People</label><input class="tool-input" id="tc-people" type="number" value="2" min="1"></div>
      </div>
      <div id="tc-result" class="mt-2"></div>`;
    function calc(){
      const bill=+q2(el,'#tc-bill').value, tip=+q2(el,'#tc-tip').value, people=Math.max(1,+q2(el,'#tc-people').value);
      q2(el,'#tc-tip-val').textContent=tip;
      const tipAmt=bill*tip/100, total=bill+tipAmt, perPerson=total/people;
      q2(el,'#tc-result').innerHTML=`<div class="stats-grid">
        <div class="stat-card"><div class="stat-card-num">$${tipAmt.toFixed(2)}</div><div class="stat-card-label">Tip Amount</div></div>
        <div class="stat-card"><div class="stat-card-num">$${total.toFixed(2)}</div><div class="stat-card-label">Total Bill</div></div>
        <div class="stat-card"><div class="stat-card-num">$${perPerson.toFixed(2)}</div><div class="stat-card-label">Per Person</div></div>
      </div>`;
    }
    ['#tc-bill','#tc-tip','#tc-people'].forEach(s=>q2(el,s).addEventListener('input',calc));
    calc();
  }
},

/* 53 */ {
  id:'discount-calc', name:'Discount Calculator', icon:'🏷️', category:'math',
  description:'Calculate sale price, savings amount and percentage for any discount.',
  tags:['discount','sale','price','savings','coupon','percent off'],
  setup(el) {
    el.innerHTML = `
      <div class="grid-2">
        <div class="tool-section"><label class="tool-label">Original Price</label><input class="tool-input" id="dc-price" type="number" value="200" min="0"></div>
        <div class="tool-section"><label class="tool-label">Discount % <span id="dc-pct-val">20</span>%</label><input type="range" class="tool-range" id="dc-pct" min="0" max="100" value="20"></div>
      </div>
      <div id="dc-result" class="mt-2"></div>`;
    function calc(){
      const price=+q2(el,'#dc-price').value, pct=+q2(el,'#dc-pct').value;
      q2(el,'#dc-pct-val').textContent=pct;
      const saved=price*pct/100, final=price-saved;
      q2(el,'#dc-result').innerHTML=`<div class="stats-grid">
        <div class="stat-card"><div class="stat-card-num">$${final.toFixed(2)}</div><div class="stat-card-label">Sale Price</div></div>
        <div class="stat-card"><div class="stat-card-num">$${saved.toFixed(2)}</div><div class="stat-card-label">You Save</div></div>
        <div class="stat-card"><div class="stat-card-num">${pct}%</div><div class="stat-card-label">Discount</div></div>
      </div>`;
    }
    q2(el,'#dc-price').addEventListener('input',calc); q2(el,'#dc-pct').addEventListener('input',calc); calc();
  }
},

/* 54 */ {
  id:'statistics-calc', name:'Statistics Calculator', icon:'📊', category:'math',
  description:'Calculate mean, median, mode, standard deviation, variance, min, max and more.',
  tags:['statistics','mean','median','mode','standard deviation','variance','average'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Numbers (comma or space separated)</label>
        <textarea class="tool-textarea" id="sc-nums" placeholder="5, 10, 15, 20, 25, 10, 5" style="min-height:80px">1, 2, 3, 4, 5, 6, 7, 8, 9, 10</textarea>
      </div>
      <button class="btn btn-primary mb-2" id="sc-calc">Calculate</button>
      <div id="sc-result"></div>`;
    q2(el,'#sc-calc').addEventListener('click',()=>{
      const nums=q2(el,'#sc-nums').value.split(/[\s,]+/).map(Number).filter(n=>!isNaN(n)&&n!==undefined);
      if(nums.length===0){q2(el,'#sc-result').innerHTML='<div class="alert alert-error">Enter valid numbers</div>';return;}
      const sorted=[...nums].sort((a,b)=>a-b);
      const n=nums.length, sum=nums.reduce((a,b)=>a+b,0), mean=sum/n;
      const median=n%2===0?(sorted[n/2-1]+sorted[n/2])/2:sorted[Math.floor(n/2)];
      const freq={};nums.forEach(v=>freq[v]=(freq[v]||0)+1);
      const maxFreq=Math.max(...Object.values(freq));
      const mode=Object.entries(freq).filter(([,f])=>f===maxFreq).map(([v])=>v).join(', ');
      const variance=nums.reduce((a,v)=>a+(v-mean)**2,0)/n;
      const stdDev=Math.sqrt(variance);
      const fmt=v=>Math.round(v*10000)/10000;
      q2(el,'#sc-result').innerHTML=`<div class="stats-grid">
        <div class="stat-card"><div class="stat-card-num">${fmt(mean)}</div><div class="stat-card-label">Mean</div></div>
        <div class="stat-card"><div class="stat-card-num">${fmt(median)}</div><div class="stat-card-label">Median</div></div>
        <div class="stat-card"><div class="stat-card-num">${mode}</div><div class="stat-card-label">Mode</div></div>
        <div class="stat-card"><div class="stat-card-num">${fmt(stdDev)}</div><div class="stat-card-label">Std Dev</div></div>
        <div class="stat-card"><div class="stat-card-num">${fmt(variance)}</div><div class="stat-card-label">Variance</div></div>
        <div class="stat-card"><div class="stat-card-num">${fmt(sum)}</div><div class="stat-card-label">Sum</div></div>
        <div class="stat-card"><div class="stat-card-num">${sorted[0]}</div><div class="stat-card-label">Min</div></div>
        <div class="stat-card"><div class="stat-card-num">${sorted[n-1]}</div><div class="stat-card-label">Max</div></div>
        <div class="stat-card"><div class="stat-card-num">${sorted[n-1]-sorted[0]}</div><div class="stat-card-label">Range</div></div>
        <div class="stat-card"><div class="stat-card-num">${n}</div><div class="stat-card-label">Count</div></div>
      </div>`;
    });
    q2(el,'#sc-calc').click();
  }
},

/* 55 */ {
  id:'compound-interest', name:'Compound Interest Calculator', icon:'📈', category:'math',
  description:'Calculate compound interest with principal, rate, time and compounding frequency.',
  tags:['compound interest','investment','finance','return','savings','calculator'],
  setup(el) {
    el.innerHTML = `
      <div class="grid-2">
        <div class="tool-section"><label class="tool-label">Principal ($)</label><input class="tool-input" id="ci-p" type="number" value="10000"></div>
        <div class="tool-section"><label class="tool-label">Annual Rate (%)</label><input class="tool-input" id="ci-r" type="number" value="8" step="0.1"></div>
        <div class="tool-section"><label class="tool-label">Time (Years)</label><input class="tool-input" id="ci-t" type="number" value="10"></div>
        <div class="tool-section"><label class="tool-label">Compounding</label>
          <select class="tool-select" id="ci-n">
            <option value="1">Annually</option><option value="2">Semi-annually</option>
            <option value="4">Quarterly</option><option value="12" selected>Monthly</option><option value="365">Daily</option>
          </select>
        </div>
      </div>
      <button class="btn btn-primary mt-2 mb-2" id="ci-calc">Calculate</button>
      <div id="ci-result"></div>`;
    q2(el,'#ci-calc').addEventListener('click',()=>{
      const P=+q2(el,'#ci-p').value, r=+q2(el,'#ci-r').value/100, t=+q2(el,'#ci-t').value, n=+q2(el,'#ci-n').value;
      const A=P*Math.pow(1+r/n,n*t), interest=A-P;
      const fmt=v=>'$'+new Intl.NumberFormat('en-US',{maximumFractionDigits:2}).format(v);
      q2(el,'#ci-result').innerHTML=`<div class="stats-grid">
        <div class="stat-card"><div class="stat-card-num">${fmt(A)}</div><div class="stat-card-label">Final Amount</div></div>
        <div class="stat-card"><div class="stat-card-num">${fmt(interest)}</div><div class="stat-card-label">Interest Earned</div></div>
        <div class="stat-card"><div class="stat-card-num">${((interest/P)*100).toFixed(1)}%</div><div class="stat-card-label">Total Return</div></div>
        <div class="stat-card"><div class="stat-card-num">${fmt(P)}</div><div class="stat-card-label">Principal</div></div>
      </div>
      <div class="alert alert-info mt-2">Formula: A = P(1 + r/n)^(nt) = ${fmt(P)}(1 + ${r}/${n})^(${n}×${t})</div>`;
    });
    q2(el,'#ci-calc').click();
  }
},

/* 56 */ {
  id:'gcd-lcm', name:'GCD & LCM Calculator', icon:'🔵', category:'math',
  description:'Find the Greatest Common Divisor (GCD) and Least Common Multiple (LCM) of two or more numbers.',
  tags:['gcd','lcm','hcf','common divisor','multiple','math'],
  setup(el) {
    function gcd(a,b){return b===0?a:gcd(b,a%b);}
    function lcm(a,b){return a/gcd(a,b)*b;}
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Numbers (comma-separated)</label>
        <input class="tool-input" id="gl-nums" value="12, 18, 24" placeholder="e.g. 12, 18, 24">
      </div>
      <button class="btn btn-primary mb-2" id="gl-calc">Calculate</button>
      <div id="gl-result"></div>`;
    q2(el,'#gl-calc').addEventListener('click',()=>{
      const nums=q2(el,'#gl-nums').value.split(/[\s,]+/).map(Number).filter(n=>n>0&&!isNaN(n));
      if(nums.length<2){q2(el,'#gl-result').innerHTML='<div class="alert alert-error">Enter at least 2 numbers</div>';return;}
      const g=nums.reduce(gcd), l=nums.reduce(lcm);
      q2(el,'#gl-result').innerHTML=`<div class="stats-grid">
        <div class="stat-card"><div class="stat-card-num">${g}</div><div class="stat-card-label">GCD / HCF</div></div>
        <div class="stat-card"><div class="stat-card-num">${l}</div><div class="stat-card-label">LCM</div></div>
      </div>`;
    });
    q2(el,'#gl-calc').click();
  }
},

/* 57 */ {
  id:'random-num-gen', name:'Random Number Generator', icon:'🎲', category:'math',
  description:'Generate random integers or decimals in any range, with optional uniqueness constraint.',
  tags:['random','number','generate','dice','lottery','range'],
  setup(el) {
    el.innerHTML = `
      <div class="grid-2">
        <div class="tool-section"><label class="tool-label">Min</label><input class="tool-input" id="rng-min" type="number" value="1"></div>
        <div class="tool-section"><label class="tool-label">Max</label><input class="tool-input" id="rng-max" type="number" value="100"></div>
        <div class="tool-section"><label class="tool-label">Count</label><input class="tool-input" id="rng-count" type="number" value="1" min="1" max="1000"></div>
        <div class="tool-section"><label class="tool-label">Type</label>
          <select class="tool-select" id="rng-type"><option value="int">Integer</option><option value="float">Decimal</option></select>
        </div>
      </div>
      <label style="display:flex;align-items:center;gap:6px;cursor:pointer;color:var(--text-secondary);margin-bottom:12px">
        <input type="checkbox" id="rng-unique"> Unique numbers only
      </label>
      <button class="btn btn-primary mb-2" id="rng-gen">🎲 Generate</button>
      ${outputBlock('rng-out','Random Numbers')}`;
    q2(el,'#rng-gen').addEventListener('click',()=>{
      const min=+q2(el,'#rng-min').value, max=+q2(el,'#rng-max').value;
      const count=Math.min(1000,+q2(el,'#rng-count').value)||1;
      const isFloat=q2(el,'#rng-type').value==='float';
      const unique=q2(el,'#rng-unique').checked;
      const nums=[];
      const gen=()=>isFloat?(Math.random()*(max-min)+min).toFixed(4):Math.floor(Math.random()*(max-min+1))+min;
      if(unique){const set=new Set();let tries=0;while(nums.length<count&&tries<10000){set.add(gen());tries++;}nums.push(...set);}
      else{for(let i=0;i<count;i++)nums.push(gen());}
      q2(el,'#rng-out').textContent=nums.join('\n');
    });
    q2(el,'#rng-gen').click();
  }
},

/* 58 */ {
  id:'fibonacci-gen', name:'Fibonacci Generator', icon:'🌀', category:'math',
  description:'Generate Fibonacci sequence up to N terms or up to a maximum value.',
  tags:['fibonacci','sequence','golden ratio','math','series'],
  setup(el) {
    el.innerHTML = `
      <div class="grid-2">
        <div class="tool-section"><label class="tool-label">Number of Terms</label><input class="tool-input" id="fib-n" type="number" value="20" min="1" max="80"></div>
        <div class="tool-section" style="align-self:flex-end"><button class="btn btn-primary" id="fib-gen">Generate</button></div>
      </div>
      ${outputBlock('fib-out','Fibonacci Sequence')}
      <div id="fib-info" class="alert alert-info mt-2"></div>`;
    q2(el,'#fib-gen').addEventListener('click',()=>{
      const n=Math.min(80,Math.max(1,+q2(el,'#fib-n').value));
      const seq=[0n,1n];
      for(let i=2;i<n;i++)seq.push(seq[i-1]+seq[i-2]);
      const result=seq.slice(0,n);
      q2(el,'#fib-out').textContent=result.map((v,i)=>`F(${i}) = ${v}`).join('\n');
      const last=result[result.length-1],prev=result[result.length-2];
      const ratio=prev?Number(last)/Number(prev):1;
      q2(el,'#fib-info').textContent=`Golden Ratio ≈ ${ratio.toFixed(6)} (φ ≈ 1.618034)`;
    });
    q2(el,'#fib-gen').click();
  }
},

/* 59 */ {
  id:'factorial-calc', name:'Factorial Calculator', icon:'❗', category:'math',
  description:'Calculate factorials of large numbers. Supports numbers up to 1000!.',
  tags:['factorial','math','n!','permutation','combinatorics'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">n</label><input class="tool-input" id="fc-n" type="number" value="10" min="0" max="1000"></div>
      <button class="btn btn-primary mb-2" id="fc-calc">Calculate n!</button>
      ${outputBlock('fc-out','n!')}`;
    q2(el,'#fc-calc').addEventListener('click',()=>{
      const n=parseInt(q2(el,'#fc-n').value);
      if(isNaN(n)||n<0){q2(el,'#fc-out').textContent='Enter a non-negative integer';return;}
      let r=1n;for(let i=2n;i<=BigInt(n);i++)r*=i;
      q2(el,'#fc-out').textContent=`${n}! = ${r.toString()}`;
    });
    q2(el,'#fc-calc').click();
  }
},

/* 60 */ {
  id:'quadratic-solver', name:'Quadratic Equation Solver', icon:'📐', category:'math',
  description:'Solve ax² + bx + c = 0 and find both roots using the quadratic formula.',
  tags:['quadratic','equation','solver','roots','math','algebra'],
  setup(el) {
    el.innerHTML = `
      <div style="text-align:center;margin-bottom:16px;font-size:1.1rem;color:var(--purple-light);font-family:var(--font-head)">ax² + bx + c = 0</div>
      <div class="grid-3">
        <div class="tool-section"><label class="tool-label">a</label><input class="tool-input" id="qs-a" type="number" value="1"></div>
        <div class="tool-section"><label class="tool-label">b</label><input class="tool-input" id="qs-b" type="number" value="-5"></div>
        <div class="tool-section"><label class="tool-label">c</label><input class="tool-input" id="qs-c" type="number" value="6"></div>
      </div>
      <button class="btn btn-primary mb-2" id="qs-solve">Solve</button>
      <div id="qs-result"></div>`;
    q2(el,'#qs-solve').addEventListener('click',()=>{
      const a=+q2(el,'#qs-a').value, b=+q2(el,'#qs-b').value, c=+q2(el,'#qs-c').value;
      if(a===0){q2(el,'#qs-result').innerHTML='<div class="alert alert-error">a cannot be 0 (not quadratic)</div>';return;}
      const disc=b*b-4*a*c;
      let html='';
      if(disc>0){const r1=(-b+Math.sqrt(disc))/(2*a),r2=(-b-Math.sqrt(disc))/(2*a);html=`<div class="alert alert-success">Two real roots: x₁ = ${r1.toFixed(4)}, x₂ = ${r2.toFixed(4)}</div>`;}
      else if(disc===0){html=`<div class="alert alert-info">One repeated root: x = ${(-b/(2*a)).toFixed(4)}</div>`;}
      else{const re=(-b/(2*a)).toFixed(4),im=(Math.sqrt(-disc)/(2*a)).toFixed(4);html=`<div class="alert alert-warning">Complex roots: x = ${re} ± ${im}i</div>`;}
      q2(el,'#qs-result').innerHTML=html+`<div class="alert alert-info mt-2">Discriminant (Δ) = ${disc.toFixed(4)}</div>`;
    });
  }
},

/* 61 */ {
  id:'age-calc', name:'Age Calculator', icon:'🎂', category:'math',
  description:'Calculate exact age in years, months, days, hours, minutes and seconds.',
  tags:['age','birthday','calculator','date','born','years'],
  setup(el) {
    el.innerHTML = `
      <div class="grid-2">
        <div class="tool-section"><label class="tool-label">Date of Birth</label><input class="tool-input" id="ac-dob" type="date"></div>
        <div class="tool-section"><label class="tool-label">As of Date</label><input class="tool-input" id="ac-ref" type="date"></div>
      </div>
      <button class="btn btn-primary mb-2" id="ac-calc">Calculate Age</button>
      <div id="ac-result"></div>`;
    const now=new Date();
    q2(el,'#ac-dob').value='1990-01-01';
    q2(el,'#ac-ref').value=now.toISOString().split('T')[0];
    q2(el,'#ac-calc').addEventListener('click',()=>{
      const dob=new Date(q2(el,'#ac-dob').value), ref=new Date(q2(el,'#ac-ref').value);
      if(!dob||!ref||dob>ref){q2(el,'#ac-result').innerHTML='<div class="alert alert-error">Enter valid dates (DOB before reference date)</div>';return;}
      let years=ref.getFullYear()-dob.getFullYear(), months=ref.getMonth()-dob.getMonth(), days=ref.getDate()-dob.getDate();
      if(days<0){months--;days+=new Date(ref.getFullYear(),ref.getMonth(),0).getDate();}
      if(months<0){years--;months+=12;}
      const totalDays=Math.floor((ref-dob)/86400000);
      const nextBday=new Date(ref.getFullYear(),dob.getMonth(),dob.getDate());
      if(nextBday<ref)nextBday.setFullYear(nextBday.getFullYear()+1);
      const daysToNext=Math.ceil((nextBday-ref)/86400000);
      q2(el,'#ac-result').innerHTML=`<div class="stats-grid">
        <div class="stat-card"><div class="stat-card-num">${years}</div><div class="stat-card-label">Years</div></div>
        <div class="stat-card"><div class="stat-card-num">${months}</div><div class="stat-card-label">Months</div></div>
        <div class="stat-card"><div class="stat-card-num">${days}</div><div class="stat-card-label">Days</div></div>
        <div class="stat-card"><div class="stat-card-num">${totalDays.toLocaleString()}</div><div class="stat-card-label">Total Days</div></div>
        <div class="stat-card"><div class="stat-card-num">${(totalDays*24).toLocaleString()}</div><div class="stat-card-label">Hours</div></div>
        <div class="stat-card"><div class="stat-card-num">${daysToNext}</div><div class="stat-card-label">Days to B-day</div></div>
      </div>`;
    });
    q2(el,'#ac-calc').click();
  }
},

/* 62 */ {
  id:'tax-calc', name:'GST / Tax Calculator', icon:'🧾', category:'math',
  description:'Calculate GST/VAT/Tax — add tax to a price or extract tax from inclusive price.',
  tags:['gst','tax','vat','calculate','price','inclusive','exclusive'],
  setup(el) {
    el.innerHTML = `
      <div class="grid-2">
        <div class="tool-section"><label class="tool-label">Amount</label><input class="tool-input" id="gst-amt" type="number" value="1000"></div>
        <div class="tool-section"><label class="tool-label">Tax Rate (%)</label><input class="tool-input" id="gst-rate" type="number" value="18" step="0.1"></div>
      </div>
      <div id="gst-result" class="mt-2"></div>`;
    function calc(){
      const amt=+q2(el,'#gst-amt').value, rate=+q2(el,'#gst-rate').value/100;
      const taxExcl=amt*rate, totalExcl=amt+taxExcl;
      const taxIncl=amt-(amt/(1+rate)), baseIncl=amt-taxIncl;
      q2(el,'#gst-result').innerHTML=`
        <div class="tool-section"><label class="tool-label">Tax Exclusive (add tax to amount)</label>
        <div class="stats-grid"><div class="stat-card"><div class="stat-card-num">$${amt.toFixed(2)}</div><div class="stat-card-label">Base</div></div><div class="stat-card"><div class="stat-card-num">$${taxExcl.toFixed(2)}</div><div class="stat-card-label">Tax</div></div><div class="stat-card"><div class="stat-card-num">$${totalExcl.toFixed(2)}</div><div class="stat-card-label">Total</div></div></div></div>
        <div class="tool-section mt-2"><label class="tool-label">Tax Inclusive (extract tax from amount)</label>
        <div class="stats-grid"><div class="stat-card"><div class="stat-card-num">$${baseIncl.toFixed(2)}</div><div class="stat-card-label">Base</div></div><div class="stat-card"><div class="stat-card-num">$${taxIncl.toFixed(2)}</div><div class="stat-card-label">Tax</div></div><div class="stat-card"><div class="stat-card-num">$${amt.toFixed(2)}</div><div class="stat-card-label">Total</div></div></div></div>`;
    }
    q2(el,'#gst-amt').addEventListener('input',calc); q2(el,'#gst-rate').addEventListener('input',calc); calc();
  }
},

/* 63 */ {
  id:'date-diff', name:'Date Difference Calculator', icon:'📅', category:'math',
  description:'Calculate the exact number of days, weeks, months, and years between two dates.',
  tags:['date','difference','days','weeks','months','calculator','between'],
  setup(el) {
    el.innerHTML = `
      <div class="grid-2">
        <div class="tool-section"><label class="tool-label">Start Date</label><input class="tool-input" id="dd-start" type="date"></div>
        <div class="tool-section"><label class="tool-label">End Date</label><input class="tool-input" id="dd-end" type="date"></div>
      </div>
      <button class="btn btn-primary mb-2" id="dd-calc">Calculate Difference</button>
      <div id="dd-result"></div>`;
    const now=new Date().toISOString().split('T')[0];
    q2(el,'#dd-start').value='2024-01-01'; q2(el,'#dd-end').value=now;
    q2(el,'#dd-calc').addEventListener('click',()=>{
      const a=new Date(q2(el,'#dd-start').value), b=new Date(q2(el,'#dd-end').value);
      if(!a||!b){q2(el,'#dd-result').innerHTML='<div class="alert alert-error">Select valid dates</div>';return;}
      const ms=Math.abs(b-a), days=Math.floor(ms/86400000);
      const weeks=Math.floor(days/7), months=Math.floor(days/30.44), years=Math.floor(days/365.25);
      const day1=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][a.getDay()], day2=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][b.getDay()];
      q2(el,'#dd-result').innerHTML=`<div class="stats-grid">
        <div class="stat-card"><div class="stat-card-num">${days.toLocaleString()}</div><div class="stat-card-label">Days</div></div>
        <div class="stat-card"><div class="stat-card-num">${weeks.toLocaleString()}</div><div class="stat-card-label">Weeks</div></div>
        <div class="stat-card"><div class="stat-card-num">${months.toLocaleString()}</div><div class="stat-card-label">Months</div></div>
        <div class="stat-card"><div class="stat-card-num">${years}</div><div class="stat-card-label">Years</div></div>
        <div class="stat-card"><div class="stat-card-num">${(days*24).toLocaleString()}</div><div class="stat-card-label">Hours</div></div>
        <div class="stat-card"><div class="stat-card-num">${(days*24*60).toLocaleString()}</div><div class="stat-card-label">Minutes</div></div>
      </div>
      <div class="alert alert-info mt-2">${day1} → ${day2} · ${a>b?'End is before Start':'Start is before End'}</div>`;
    });
    q2(el,'#dd-calc').click();
  }
},

/* 64 */ {
  id:'ratio-calc', name:'Ratio Calculator', icon:'⚖️', category:'math',
  description:'Simplify ratios, scale ratios, and check if two ratios are equivalent.',
  tags:['ratio','simplify','scale','proportion','equivalent'],
  setup(el) {
    function gcd(a,b){return b===0?a:gcd(b,a%b);}
    el.innerHTML = `
      <div class="tool-tabs"><button class="tool-tab active" data-rt="simp">Simplify</button><button class="tool-tab" data-rt="scale">Scale</button><button class="tool-tab" data-rt="equiv">Equivalent?</button></div>
      <div id="rc-simp" class="tab-pane active">
        <div class="flex-gap"><input class="tool-input" id="rc-s-a" type="number" value="12" placeholder="A"><span style="align-self:center;color:var(--text-muted)">:</span><input class="tool-input" id="rc-s-b" type="number" value="18" placeholder="B"></div>
        <div id="rc-simp-res" class="alert alert-info mt-2">Simplified: 2 : 3</div>
      </div>
      <div id="rc-scale" class="tab-pane">
        <div class="flex-gap"><input class="tool-input" id="rc-sc-a" type="number" value="1" placeholder="A"><span style="align-self:center;color:var(--text-muted)">:</span><input class="tool-input" id="rc-sc-b" type="number" value="2" placeholder="B"></div>
        <div class="tool-section mt-2"><label class="tool-label">Scale Factor</label><input class="tool-input" id="rc-sc-f" type="number" value="5"></div>
        <div id="rc-scale-res" class="alert alert-info mt-2">Scaled: 5 : 10</div>
      </div>
      <div id="rc-equiv" class="tab-pane">
        <div class="flex-gap"><input class="tool-input" id="rc-e-a1" type="number" value="1" placeholder="A"><span>:</span><input class="tool-input" id="rc-e-b1" type="number" value="2" placeholder="B"></div>
        <div class="flex-gap mt-2"><input class="tool-input" id="rc-e-a2" type="number" value="3" placeholder="C"><span>:</span><input class="tool-input" id="rc-e-b2" type="number" value="6" placeholder="D"></div>
        <div id="rc-equiv-res" class="alert alert-success mt-2">✅ Equivalent</div>
      </div>`;
    qa2(el,'.tool-tab').forEach(t=>t.addEventListener('click',()=>{qa2(el,'.tool-tab').forEach(x=>x.classList.remove('active'));qa2(el,'.tab-pane').forEach(x=>x.classList.remove('active'));t.classList.add('active');q2(el,`#rc-${t.dataset.rt}`).classList.add('active');}));
    function simpF(){const a=+q2(el,'#rc-s-a').value,b=+q2(el,'#rc-s-b').value;if(!a||!b)return;const g=gcd(Math.abs(a),Math.abs(b));q2(el,'#rc-simp-res').textContent=`Simplified: ${a/g} : ${b/g}`;}
    function scaleF(){const a=+q2(el,'#rc-sc-a').value,b=+q2(el,'#rc-sc-b').value,f=+q2(el,'#rc-sc-f').value;q2(el,'#rc-scale-res').textContent=`Scaled: ${a*f} : ${b*f}`;}
    function equivF(){const a1=+q2(el,'#rc-e-a1').value,b1=+q2(el,'#rc-e-b1').value,a2=+q2(el,'#rc-e-a2').value,b2=+q2(el,'#rc-e-b2').value;const eq=b1&&b2&&a1/b1===a2/b2;q2(el,'#rc-equiv-res').className=`alert ${eq?'alert-success':'alert-error'}`;q2(el,'#rc-equiv-res').textContent=eq?'✅ Equivalent':'❌ Not equivalent';}
    [q2(el,'#rc-s-a'),q2(el,'#rc-s-b')].forEach(i=>i.addEventListener('input',simpF));
    [q2(el,'#rc-sc-a'),q2(el,'#rc-sc-b'),q2(el,'#rc-sc-f')].forEach(i=>i.addEventListener('input',scaleF));
    [q2(el,'#rc-e-a1'),q2(el,'#rc-e-b1'),q2(el,'#rc-e-a2'),q2(el,'#rc-e-b2')].forEach(i=>i.addEventListener('input',equivF));
    simpF(); scaleF(); equivF();
  }
}

); // end MATH TOOLS push

/* ================================================================
   IMAGE TOOLS (10)
   ================================================================ */
TOOLS.push(

/* 65 */ {
  id:'image-to-base64', name:'Image to Base64', icon:'🖼️', category:'image',
  description:'Convert any image file to a Base64 encoded string for use in CSS, HTML, or JSON.',
  tags:['image','base64','encode','convert','png','jpg','gif'],
  setup(el) {
    el.innerHTML = `
      <div class="drag-area" id="i2b-drop"><div class="drag-icon">🖼️</div><p>Drop image here or click to upload</p><input type="file" id="i2b-file" accept="image/*" style="display:none"></div>
      <div id="i2b-preview" style="display:none;margin-top:12px">
        <img id="i2b-img" style="max-width:100%;max-height:200px;border-radius:var(--r-md);border:1px solid var(--border);display:block;margin:0 auto">
      </div>
      <div id="i2b-out-wrap" style="display:none;margin-top:12px">
        <div class="stats-grid" id="i2b-stats"></div>
        ${outputBlock('i2b-out','Base64 String')}
      </div>`;
    const drop=q2(el,'#i2b-drop'), fileInp=q2(el,'#i2b-file');
    drop.addEventListener('click',()=>fileInp.click());
    drop.addEventListener('dragover',e=>{e.preventDefault();drop.classList.add('active');});
    drop.addEventListener('dragleave',()=>drop.classList.remove('active'));
    drop.addEventListener('drop',e=>{e.preventDefault();drop.classList.remove('active');handleFile(e.dataTransfer.files[0]);});
    fileInp.addEventListener('change',e=>handleFile(e.target.files[0]));
    function handleFile(file){
      if(!file||!file.type.startsWith('image/'))return;
      const reader=new FileReader();
      reader.onload=e=>{
        const b64=e.target.result;
        q2(el,'#i2b-img').src=b64;
        q2(el,'#i2b-preview').style.display='block';
        q2(el,'#i2b-out-wrap').style.display='block';
        q2(el,'#i2b-out').textContent=b64;
        q2(el,'#i2b-stats').innerHTML=`<div class="stat-card"><div class="stat-card-num">${(file.size/1024).toFixed(1)} KB</div><div class="stat-card-label">File Size</div></div><div class="stat-card"><div class="stat-card-num">${file.type.split('/')[1].toUpperCase()}</div><div class="stat-card-label">Format</div></div><div class="stat-card"><div class="stat-card-num">${(b64.length/1024).toFixed(1)} KB</div><div class="stat-card-label">Base64 Size</div></div>`;
      };
      reader.readAsDataURL(file);
    }
  }
},

/* 66 */ {
  id:'base64-to-image', name:'Base64 to Image', icon:'🎑', category:'image',
  description:'Convert a Base64 string back to a viewable image and download it.',
  tags:['base64','image','decode','preview','download'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Base64 String (data:image/... or raw)</label>
        <textarea class="tool-textarea" id="b2i-in" style="min-height:100px" placeholder="data:image/png;base64,iVBOR..."></textarea>
      </div>
      <button class="btn btn-primary mb-2" id="b2i-run">Preview Image</button>
      <div id="b2i-preview" style="text-align:center"></div>`;
    q2(el,'#b2i-run').addEventListener('click',()=>{
      let src=q2(el,'#b2i-in').value.trim();
      if(!src.startsWith('data:'))src='data:image/png;base64,'+src;
      const img=document.createElement('img');
      img.style.maxWidth='100%';img.style.borderRadius='12px';img.style.border='1px solid var(--border)';
      img.onload=()=>{
        q2(el,'#b2i-preview').innerHTML='';
        q2(el,'#b2i-preview').appendChild(img);
        const a=document.createElement('a');a.href=src;a.download='image.png';a.className='btn btn-secondary btn-sm';a.style.display='inline-flex';a.style.marginTop='10px';a.textContent='⬇ Download';
        q2(el,'#b2i-preview').appendChild(document.createElement('br'));
        q2(el,'#b2i-preview').appendChild(a);
      };
      img.onerror=()=>{q2(el,'#b2i-preview').innerHTML='<div class="alert alert-error">Invalid Base64 image string</div>';};
      img.src=src;
    });
  }
},

/* 67 */ {
  id:'image-info', name:'Image Info Viewer', icon:'ℹ️', category:'image',
  description:'View image metadata: dimensions, file size, type, aspect ratio, and more.',
  tags:['image','info','metadata','dimensions','size','resolution'],
  setup(el) {
    el.innerHTML = `
      <div class="drag-area" id="ii-drop"><div class="drag-icon">📷</div><p>Drop image to inspect</p><input type="file" id="ii-file" accept="image/*" style="display:none"></div>
      <div id="ii-result" style="margin-top:12px"></div>`;
    const drop=q2(el,'#ii-drop'), fi=q2(el,'#ii-file');
    drop.addEventListener('click',()=>fi.click());
    drop.addEventListener('dragover',e=>{e.preventDefault();drop.classList.add('active');});
    drop.addEventListener('dragleave',()=>drop.classList.remove('active'));
    drop.addEventListener('drop',e=>{e.preventDefault();drop.classList.remove('active');handleFile(e.dataTransfer.files[0]);});
    fi.addEventListener('change',e=>handleFile(e.target.files[0]));
    function handleFile(file){
      if(!file||!file.type.startsWith('image/'))return;
      const url=URL.createObjectURL(file);
      const img=new Image();
      img.onload=()=>{
        const gcd=(a,b)=>b?gcd(b,a%b):a;const g=gcd(img.width,img.height);
        q2(el,'#ii-result').innerHTML=`
          <img src="${url}" style="max-width:100%;max-height:180px;border-radius:var(--r-md);border:1px solid var(--border);display:block;margin:0 auto 12px">
          <div class="stats-grid">
            <div class="stat-card"><div class="stat-card-num">${img.width}×${img.height}</div><div class="stat-card-label">Dimensions (px)</div></div>
            <div class="stat-card"><div class="stat-card-num">${(file.size/1024).toFixed(1)} KB</div><div class="stat-card-label">File Size</div></div>
            <div class="stat-card"><div class="stat-card-num">${file.type.split('/')[1].toUpperCase()}</div><div class="stat-card-label">Format</div></div>
            <div class="stat-card"><div class="stat-card-num">${img.width/g}:${img.height/g}</div><div class="stat-card-label">Aspect Ratio</div></div>
            <div class="stat-card"><div class="stat-card-num">${(img.width*img.height/1e6).toFixed(2)} MP</div><div class="stat-card-label">Megapixels</div></div>
            <div class="stat-card"><div class="stat-card-num">${file.name.split('.').pop().toUpperCase()}</div><div class="stat-card-label">Extension</div></div>
          </div>`;
      };
      img.src=url;
    }
  }
},

/* 68 */ {
  id:'image-resize', name:'Image Resizer', icon:'📐', category:'image',
  description:'Resize images to custom dimensions using Canvas API. Download resized image.',
  tags:['image','resize','scale','dimensions','download'],
  setup(el) {
    el.innerHTML = `
      <div class="drag-area" id="ir-drop"><div class="drag-icon">📐</div><p>Drop image to resize</p><input type="file" id="ir-file" accept="image/*" style="display:none"></div>
      <div id="ir-controls" style="display:none">
        <div class="grid-2 mt-2">
          <div class="tool-section"><label class="tool-label">Width (px)</label><input class="tool-input" id="ir-w" type="number" min="1"></div>
          <div class="tool-section"><label class="tool-label">Height (px)</label><input class="tool-input" id="ir-h" type="number" min="1"></div>
        </div>
        <label style="display:flex;align-items:center;gap:6px;cursor:pointer;color:var(--text-secondary);margin-bottom:10px"><input type="checkbox" id="ir-ratio" checked> Maintain aspect ratio</label>
        <button class="btn btn-primary" id="ir-resize">Resize & Download</button>
      </div>
      <canvas id="ir-canvas" style="display:none"></canvas>`;
    let origImg=null, origW=0, origH=0;
    const drop=q2(el,'#ir-drop'),fi=q2(el,'#ir-file');
    drop.addEventListener('click',()=>fi.click());
    drop.addEventListener('dragover',e=>{e.preventDefault();drop.classList.add('active');});
    drop.addEventListener('dragleave',()=>drop.classList.remove('active'));
    drop.addEventListener('drop',e=>{e.preventDefault();drop.classList.remove('active');handleFile(e.dataTransfer.files[0]);});
    fi.addEventListener('change',e=>handleFile(e.target.files[0]));
    function handleFile(file){
      if(!file||!file.type.startsWith('image/'))return;
      const url=URL.createObjectURL(file);
      origImg=new Image();
      origImg.onload=()=>{origW=origImg.width;origH=origImg.height;q2(el,'#ir-w').value=origW;q2(el,'#ir-h').value=origH;q2(el,'#ir-controls').style.display='block';};
      origImg.src=url;
    }
    q2(el,'#ir-w').addEventListener('input',function(){if(q2(el,'#ir-ratio').checked&&origH)q2(el,'#ir-h').value=Math.round(+this.value*origH/origW);});
    q2(el,'#ir-h').addEventListener('input',function(){if(q2(el,'#ir-ratio').checked&&origW)q2(el,'#ir-w').value=Math.round(+this.value*origW/origH);});
    q2(el,'#ir-resize').addEventListener('click',()=>{
      if(!origImg)return;
      const w=+q2(el,'#ir-w').value||origW, h=+q2(el,'#ir-h').value||origH;
      const canvas=q2(el,'#ir-canvas');canvas.width=w;canvas.height=h;
      canvas.getContext('2d').drawImage(origImg,0,0,w,h);
      const a=document.createElement('a');a.href=canvas.toDataURL('image/png');a.download=`resized_${w}x${h}.png`;a.click();
      showToast('✅ Downloading resized image…');
    });
  }
},

/* 69 */ {
  id:'image-filters', name:'Image Filters', icon:'🎨', category:'image',
  description:'Apply filters to images: grayscale, sepia, blur, brightness, contrast, and more.',
  tags:['image','filter','grayscale','sepia','blur','brightness','effect'],
  setup(el) {
    el.innerHTML = `
      <div class="drag-area" id="if-drop"><div class="drag-icon">🎨</div><p>Drop image here</p><input type="file" id="if-file" accept="image/*" style="display:none"></div>
      <div id="if-controls" style="display:none">
        <div class="grid-2 mt-2">
          ${[['if-gray','Grayscale','0','100','0'],['if-blur','Blur (px)','0','20','0'],['if-bright','Brightness %','0','200','100'],['if-contrast','Contrast %','0','200','100'],['if-sat','Saturation %','0','200','100'],['if-hue','Hue Rotate (deg)','0','360','0']].map(([id,lbl,min,max,val])=>`
          <div class="tool-section"><label class="tool-label">${lbl} <span id="${id}-val">${val}</span></label>
            <input type="range" class="tool-range" id="${id}" min="${min}" max="${max}" value="${val}">
          </div>`).join('')}
        </div>
        <div class="btn-group mt-2">
          <button class="btn btn-secondary" id="if-reset">Reset</button>
          <button class="btn btn-primary" id="if-download">Download</button>
        </div>
        <canvas id="if-canvas" class="tool-canvas mt-2" style="max-width:100%;max-height:300px;display:block;margin:0 auto"></canvas>
      </div>`;
    let origImg=null;
    const drop=q2(el,'#if-drop'),fi=q2(el,'#if-file');
    drop.addEventListener('click',()=>fi.click());
    drop.addEventListener('dragover',e=>{e.preventDefault();drop.classList.add('active');});
    drop.addEventListener('dragleave',()=>drop.classList.remove('active'));
    drop.addEventListener('drop',e=>{e.preventDefault();drop.classList.remove('active');handleFile(e.dataTransfer.files[0]);});
    fi.addEventListener('change',e=>handleFile(e.target.files[0]));
    function handleFile(file){
      if(!file||!file.type.startsWith('image/'))return;
      origImg=new Image();origImg.onload=()=>{applyFilter();q2(el,'#if-controls').style.display='block';};
      origImg.src=URL.createObjectURL(file);
    }
    function applyFilter(){
      if(!origImg)return;
      const canvas=q2(el,'#if-canvas');
      canvas.width=Math.min(origImg.width,700);
      canvas.height=Math.round(canvas.width*origImg.height/origImg.width);
      const ctx=canvas.getContext('2d');
      const gray=q2(el,'#if-gray').value, blur=q2(el,'#if-blur').value, bright=q2(el,'#if-bright').value;
      const contrast=q2(el,'#if-contrast').value, sat=q2(el,'#if-sat').value, hue=q2(el,'#if-hue').value;
      ctx.filter=`grayscale(${gray}%) blur(${blur}px) brightness(${bright}%) contrast(${contrast}%) saturate(${sat}%) hue-rotate(${hue}deg)`;
      ctx.drawImage(origImg,0,0,canvas.width,canvas.height);
      [['if-gray',gray],['if-blur',blur],['if-bright',bright],['if-contrast',contrast],['if-sat',sat],['if-hue',hue]].forEach(([id,v])=>{const s=q2(el,`#${id}-val`);if(s)s.textContent=v;});
    }
    ['#if-gray','#if-blur','#if-bright','#if-contrast','#if-sat','#if-hue'].forEach(s=>q2(el,s).addEventListener('input',applyFilter));
    q2(el,'#if-reset').addEventListener('click',()=>{['if-gray','if-blur','if-bright','if-contrast','if-sat','if-hue'].forEach((id,i)=>{q2(el,`#${id}`).value=[0,0,100,100,100,0][i];});applyFilter();});
    q2(el,'#if-download').addEventListener('click',()=>{const a=document.createElement('a');a.href=q2(el,'#if-canvas').toDataURL();a.download='filtered.png';a.click();});
  }
},

/* 70 */ {
  id:'image-rotate-flip', name:'Image Rotate & Flip', icon:'🔄', category:'image',
  description:'Rotate images 90°/180°/270° or flip horizontally and vertically.',
  tags:['image','rotate','flip','mirror','transform'],
  setup(el) {
    el.innerHTML = `
      <div class="drag-area" id="rf-drop"><div class="drag-icon">🔄</div><p>Drop image here</p><input type="file" id="rf-file" accept="image/*" style="display:none"></div>
      <div id="rf-controls" style="display:none">
        <div class="btn-group mt-2">
          <button class="btn btn-secondary" data-op="r90">↻ 90°</button>
          <button class="btn btn-secondary" data-op="r180">↻ 180°</button>
          <button class="btn btn-secondary" data-op="r270">↺ 270°</button>
          <button class="btn btn-secondary" data-op="fh">⇔ Flip H</button>
          <button class="btn btn-secondary" data-op="fv">⇕ Flip V</button>
          <button class="btn btn-primary" id="rf-dl">⬇ Download</button>
        </div>
        <canvas id="rf-canvas" class="tool-canvas mt-2" style="max-width:100%;display:block;margin:0 auto;max-height:320px"></canvas>
      </div>`;
    let origImg=null, angle=0, flipH=false, flipV=false;
    const drop=q2(el,'#rf-drop'),fi=q2(el,'#rf-file');
    drop.addEventListener('click',()=>fi.click());
    drop.addEventListener('dragover',e=>{e.preventDefault();drop.classList.add('active');});
    drop.addEventListener('dragleave',()=>drop.classList.remove('active'));
    drop.addEventListener('drop',e=>{e.preventDefault();drop.classList.remove('active');handleFile(e.dataTransfer.files[0]);});
    fi.addEventListener('change',e=>handleFile(e.target.files[0]));
    function handleFile(file){if(!file||!file.type.startsWith('image/'))return;origImg=new Image();origImg.onload=()=>{angle=0;flipH=false;flipV=false;draw();q2(el,'#rf-controls').style.display='block';};origImg.src=URL.createObjectURL(file);}
    function draw(){
      if(!origImg)return;
      const canvas=q2(el,'#rf-canvas'), rad=angle*Math.PI/180;
      const sin=Math.abs(Math.sin(rad)), cos=Math.abs(Math.cos(rad));
      canvas.width=Math.round(origImg.width*cos+origImg.height*sin);
      canvas.height=Math.round(origImg.width*sin+origImg.height*cos);
      const ctx=canvas.getContext('2d');
      ctx.translate(canvas.width/2,canvas.height/2);
      ctx.rotate(rad);
      ctx.scale(flipH?-1:1,flipV?-1:1);
      ctx.drawImage(origImg,-origImg.width/2,-origImg.height/2);
    }
    q2(el,'#rf-controls').addEventListener('click',e=>{
      const op=e.target.dataset.op; if(!op)return;
      if(op==='r90')angle=(angle+90)%360;
      else if(op==='r180')angle=(angle+180)%360;
      else if(op==='r270')angle=(angle+270)%360;
      else if(op==='fh')flipH=!flipH;
      else if(op==='fv')flipV=!flipV;
      draw();
    });
    q2(el,'#rf-dl').addEventListener('click',()=>{const a=document.createElement('a');a.href=q2(el,'#rf-canvas').toDataURL();a.download='transformed.png';a.click();});
  }
},

/* 71 */ {
  id:'image-crop', name:'Image Cropper', icon:'✂️', category:'image',
  description:'Crop images by specifying x, y, width and height values.',
  tags:['image','crop','trim','cut','resize'],
  setup(el) {
    el.innerHTML = `
      <div class="drag-area" id="ic-drop"><div class="drag-icon">✂️</div><p>Drop image to crop</p><input type="file" id="ic-file" accept="image/*" style="display:none"></div>
      <div id="ic-controls" style="display:none">
        <div id="ic-info" class="alert alert-info mt-2"></div>
        <div class="grid-2 mt-2">
          <div class="tool-section"><label class="tool-label">X (left)</label><input class="tool-input" id="ic-x" type="number" value="0" min="0"></div>
          <div class="tool-section"><label class="tool-label">Y (top)</label><input class="tool-input" id="ic-y" type="number" value="0" min="0"></div>
          <div class="tool-section"><label class="tool-label">Width</label><input class="tool-input" id="ic-cw" type="number" min="1"></div>
          <div class="tool-section"><label class="tool-label">Height</label><input class="tool-input" id="ic-ch" type="number" min="1"></div>
        </div>
        <button class="btn btn-primary mt-2" id="ic-run">Crop & Download</button>
      </div>`;
    let img=null;
    const drop=q2(el,'#ic-drop'),fi=q2(el,'#ic-file');
    drop.addEventListener('click',()=>fi.click());
    drop.addEventListener('dragover',e=>{e.preventDefault();drop.classList.add('active');});
    drop.addEventListener('dragleave',()=>drop.classList.remove('active'));
    drop.addEventListener('drop',e=>{e.preventDefault();drop.classList.remove('active');handleFile(e.dataTransfer.files[0]);});
    fi.addEventListener('change',e=>handleFile(e.target.files[0]));
    function handleFile(file){if(!file||!file.type.startsWith('image/'))return;img=new Image();img.onload=()=>{q2(el,'#ic-cw').value=img.width;q2(el,'#ic-ch').value=img.height;q2(el,'#ic-info').textContent=`Original: ${img.width} × ${img.height} px`;q2(el,'#ic-controls').style.display='block';};img.src=URL.createObjectURL(file);}
    q2(el,'#ic-run').addEventListener('click',()=>{
      if(!img)return;
      const x=+q2(el,'#ic-x').value,y=+q2(el,'#ic-y').value,w=+q2(el,'#ic-cw').value,h=+q2(el,'#ic-ch').value;
      const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;
      canvas.getContext('2d').drawImage(img,x,y,w,h,0,0,w,h);
      const a=document.createElement('a');a.href=canvas.toDataURL();a.download='cropped.png';a.click();
      showToast('✅ Cropped image downloaded!');
    });
  }
},

/* 72 */ {
  id:'image-border', name:'Image Border Generator', icon:'🖼️', category:'image',
  description:'Add decorative borders and frames to images with custom color, width, and radius.',
  tags:['image','border','frame','decorate','effect'],
  setup(el) {
    el.innerHTML = `
      <div class="drag-area" id="ib-drop"><div class="drag-icon">🖼️</div><p>Drop image</p><input type="file" id="ib-file" accept="image/*" style="display:none"></div>
      <div id="ib-controls" style="display:none">
        <div class="grid-2 mt-2">
          <div class="tool-section"><label class="tool-label">Border Width (px)</label><input type="range" class="tool-range" id="ib-w" min="0" max="80" value="20"><span id="ib-w-val">20</span>px</div>
          <div class="tool-section"><label class="tool-label">Border Color</label><input type="color" id="ib-color" value="#7c3aed" style="width:100%;height:40px"></div>
          <div class="tool-section"><label class="tool-label">Corner Radius (px)</label><input type="range" class="tool-range" id="ib-r" min="0" max="80" value="0"><span id="ib-r-val">0</span>px</div>
        </div>
        <button class="btn btn-primary mt-2" id="ib-dl">Download</button>
        <canvas id="ib-canvas" class="tool-canvas mt-2" style="max-width:100%;max-height:300px;display:block;margin:0 auto"></canvas>
      </div>`;
    let img=null;
    const drop=q2(el,'#ib-drop'),fi=q2(el,'#ib-file');
    drop.addEventListener('click',()=>fi.click());
    drop.addEventListener('dragover',e=>{e.preventDefault();drop.classList.add('active');});
    drop.addEventListener('dragleave',()=>drop.classList.remove('active'));
    drop.addEventListener('drop',e=>{e.preventDefault();drop.classList.remove('active');handleFile(e.dataTransfer.files[0]);});
    fi.addEventListener('change',e=>handleFile(e.target.files[0]));
    function handleFile(file){if(!file||!file.type.startsWith('image/'))return;img=new Image();img.onload=()=>{draw();q2(el,'#ib-controls').style.display='block';};img.src=URL.createObjectURL(file);}
    function draw(){
      if(!img)return;
      const bw=+q2(el,'#ib-w').value, color=q2(el,'#ib-color').value, radius=+q2(el,'#ib-r').value;
      q2(el,'#ib-w-val').textContent=bw; q2(el,'#ib-r-val').textContent=radius;
      const canvas=q2(el,'#ib-canvas');
      canvas.width=img.width+bw*2;canvas.height=img.height+bw*2;
      const ctx=canvas.getContext('2d');
      ctx.fillStyle=color;
      ctx.beginPath();ctx.roundRect(0,0,canvas.width,canvas.height,radius+bw);ctx.fill();
      ctx.save();ctx.beginPath();ctx.roundRect(bw,bw,img.width,img.height,radius);ctx.clip();
      ctx.drawImage(img,bw,bw);ctx.restore();
    }
    ['#ib-w','#ib-color','#ib-r'].forEach(s=>q2(el,s).addEventListener('input',draw));
    q2(el,'#ib-dl').addEventListener('click',()=>{const a=document.createElement('a');a.href=q2(el,'#ib-canvas').toDataURL();a.download='bordered.png';a.click();});
  }
},

/* 73 */ {
  id:'color-from-image', name:'Color Picker from Image', icon:'💉', category:'image',
  description:'Click on any area of an image to pick its color. Get HEX, RGB, and HSL values.',
  tags:['color picker','image','dropper','eyedropper','sample','hex'],
  setup(el) {
    el.innerHTML = `
      <div class="drag-area" id="cp-drop"><div class="drag-icon">💉</div><p>Drop image then click to pick color</p><input type="file" id="cp-file" accept="image/*" style="display:none"></div>
      <canvas id="cp-canvas" class="tool-canvas mt-2" style="display:none;max-width:100%;cursor:crosshair"></canvas>
      <div id="cp-result" style="display:none;margin-top:12px">
        <div style="display:flex;align-items:center;gap:14px">
          <div id="cp-swatch" style="width:60px;height:60px;border-radius:var(--r-md);border:2px solid var(--border)"></div>
          <div><div id="cp-hex" style="font-family:var(--font-mono);font-size:1.2rem;font-weight:700"></div><div id="cp-rgb" style="color:var(--text-secondary);font-size:.88rem;margin-top:4px"></div><div id="cp-hsl" style="color:var(--text-muted);font-size:.88rem;margin-top:2px"></div></div>
          <button class="btn btn-secondary btn-sm" id="cp-copy-hex">Copy HEX</button>
        </div>
      </div>`;
    const drop=q2(el,'#cp-drop'),fi=q2(el,'#cp-file'),canvas=q2(el,'#cp-canvas');
    drop.addEventListener('click',()=>fi.click());
    drop.addEventListener('dragover',e=>{e.preventDefault();drop.classList.add('active');});
    drop.addEventListener('dragleave',()=>drop.classList.remove('active'));
    drop.addEventListener('drop',e=>{e.preventDefault();drop.classList.remove('active');handleFile(e.dataTransfer.files[0]);});
    fi.addEventListener('change',e=>handleFile(e.target.files[0]));
    function handleFile(file){
      if(!file||!file.type.startsWith('image/'))return;
      const img=new Image();
      img.onload=()=>{
        canvas.width=Math.min(img.width,700);canvas.height=Math.round(canvas.width*img.height/img.width);
        canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);
        canvas.style.display='block';drop.style.display='none';
      };
      img.src=URL.createObjectURL(file);
    }
    canvas.addEventListener('click',e=>{
      const rect=canvas.getBoundingClientRect();
      const scaleX=canvas.width/rect.width, scaleY=canvas.height/rect.height;
      const x=Math.floor((e.clientX-rect.left)*scaleX), y=Math.floor((e.clientY-rect.top)*scaleY);
      const d=canvas.getContext('2d').getImageData(x,y,1,1).data;
      const hex=rgbToHex(d[0],d[1],d[2]);
      const hsl=rgbToHsl(d[0],d[1],d[2]);
      q2(el,'#cp-swatch').style.background=hex;
      q2(el,'#cp-hex').textContent=hex;
      q2(el,'#cp-rgb').textContent=`rgb(${d[0]}, ${d[1]}, ${d[2]})`;
      q2(el,'#cp-hsl').textContent=`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
      q2(el,'#cp-result').style.display='block';
      q2(el,'#cp-copy-hex').onclick=()=>copyText(hex);
    });
  }
},

/* 74 */ {
  id:'image-to-pixels', name:'Image Color Analyzer', icon:'🔬', category:'image',
  description:'Analyze the dominant colors in an image and show a color palette.',
  tags:['image','color','palette','dominant','analysis','pixels'],
  setup(el) {
    el.innerHTML = `
      <div class="drag-area" id="ia-drop"><div class="drag-icon">🔬</div><p>Drop image to analyze colors</p><input type="file" id="ia-file" accept="image/*" style="display:none"></div>
      <div id="ia-result" style="margin-top:12px"></div>`;
    const drop=q2(el,'#ia-drop'),fi=q2(el,'#ia-file');
    drop.addEventListener('click',()=>fi.click());
    drop.addEventListener('dragover',e=>{e.preventDefault();drop.classList.add('active');});
    drop.addEventListener('dragleave',()=>drop.classList.remove('active'));
    drop.addEventListener('drop',e=>{e.preventDefault();drop.classList.remove('active');handleFile(e.dataTransfer.files[0]);});
    fi.addEventListener('change',e=>handleFile(e.target.files[0]));
    function handleFile(file){
      if(!file||!file.type.startsWith('image/'))return;
      const img=new Image();img.onload=()=>{
        const canvas=document.createElement('canvas');
        const maxSize=100;const scale=Math.min(1,maxSize/Math.max(img.width,img.height));
        canvas.width=Math.floor(img.width*scale);canvas.height=Math.floor(img.height*scale);
        const ctx=canvas.getContext('2d');ctx.drawImage(img,0,0,canvas.width,canvas.height);
        const data=ctx.getImageData(0,0,canvas.width,canvas.height).data;
        const buckets={};
        for(let i=0;i<data.length;i+=4){
          const r=Math.round(data[i]/32)*32, g=Math.round(data[i+1]/32)*32, b=Math.round(data[i+2]/32)*32;
          const key=`${r},${g},${b}`;buckets[key]=(buckets[key]||0)+1;
        }
        const sorted=Object.entries(buckets).sort((a,b)=>b[1]-a[1]).slice(0,12);
        q2(el,'#ia-result').innerHTML=`
          <label class="tool-label">Dominant Colors</label>
          <div style="display:flex;flex-wrap:wrap;gap:10px">
            ${sorted.map(([rgb])=>{const [r,g,b]=rgb.split(',').map(Number);const hex=rgbToHex(r,g,b);return `<div style="text-align:center;cursor:pointer" onclick="copyText('${hex}');showToast('Copied ${hex}')"><div style="width:52px;height:52px;background:${hex};border-radius:var(--r-sm);border:2px solid var(--border);margin-bottom:4px"></div><div style="font-size:.65rem;font-family:var(--font-mono);color:var(--text-muted)">${hex}</div></div>`;}).join('')}
          </div>`;
      };img.src=URL.createObjectURL(file);
    }
  }
}

); // end IMAGE TOOLS push

/* ================================================================
   COLOR & DESIGN TOOLS (10)
   ================================================================ */
TOOLS.push(

/* 75 */ {
  id:'color-palette-gen', name:'Color Palette Generator', icon:'🎨', category:'color',
  description:'Generate beautiful, harmonious color palettes: monochromatic, analogous, complementary, triadic.',
  tags:['color','palette','generate','harmonious','scheme','design'],
  setup(el) {
    el.innerHTML = `
      <div class="flex-gap mb-2">
        <div class="tool-section"><label class="tool-label">Base Color</label>
          <div style="display:flex;gap:8px"><input type="color" id="pal-base" value="#7c3aed" style="width:56px;height:40px"><input class="tool-input" id="pal-hex" value="#7c3aed" style="font-family:var(--font-mono)"></div>
        </div>
        <div class="tool-section"><label class="tool-label">Scheme</label>
          <select class="tool-select" id="pal-scheme">
            <option value="mono">Monochromatic</option><option value="comp">Complementary</option>
            <option value="anal">Analogous</option><option value="tri">Triadic</option><option value="split">Split-Complementary</option>
          </select>
        </div>
      </div>
      <div id="pal-out" style="display:flex;gap:10px;flex-wrap:wrap;margin-top:8px"></div>`;
    function gen(){
      const hex=q2(el,'#pal-hex').value.trim(), scheme=q2(el,'#pal-scheme').value;
      const rgb=hexToRgb(hex); if(!rgb) return;
      const hsl=rgbToHsl(rgb.r,rgb.g,rgb.b);
      let hues=[];
      if(scheme==='mono') hues=[hsl.h,hsl.h,hsl.h,hsl.h,hsl.h];
      else if(scheme==='comp') hues=[hsl.h,(hsl.h+180)%360];
      else if(scheme==='anal') hues=[hsl.h,(hsl.h+30)%360,(hsl.h+60)%360,(hsl.h-30+360)%360,(hsl.h-60+360)%360];
      else if(scheme==='tri') hues=[hsl.h,(hsl.h+120)%360,(hsl.h+240)%360];
      else hues=[hsl.h,(hsl.h+150)%360,(hsl.h+210)%360];
      const satV=scheme==='mono'?[20,40,60,75,90]:[hsl.s];
      const lightV=scheme==='mono'?[25,40,55,70,85]:[hsl.l];
      const colors=scheme==='mono'?hues.map((_,i)=>hslToHex(hsl.h,satV[i],lightV[i])):hues.map((h,i)=>hslToHex(h,satV[i%satV.length]||hsl.s,lightV[i%lightV.length]||hsl.l));
      q2(el,'#pal-out').innerHTML=colors.map(c=>`<div style="cursor:pointer;text-align:center;flex:1;min-width:70px" onclick="copyText('${c}');showToast('Copied ${c}')">
        <div style="height:80px;background:${c};border-radius:var(--r-md);border:1px solid var(--border);margin-bottom:6px"></div>
        <div style="font-size:.72rem;font-family:var(--font-mono);color:var(--text-muted)">${c}</div>
      </div>`).join('');
    }
    q2(el,'#pal-base').addEventListener('input',e=>{q2(el,'#pal-hex').value=e.target.value;gen();});
    q2(el,'#pal-hex').addEventListener('input',e=>{if(/^#[0-9a-f]{6}$/i.test(e.target.value)){q2(el,'#pal-base').value=e.target.value;gen();}});
    q2(el,'#pal-scheme').addEventListener('change',gen);
    gen();
  }
},

/* 76 */ {
  id:'color-contrast', name:'Color Contrast Checker', icon:'👁️', category:'color',
  description:'Check WCAG accessibility contrast ratio between foreground and background colors.',
  tags:['color','contrast','wcag','accessibility','a11y','readability'],
  setup(el) {
    el.innerHTML = `
      <div class="grid-2">
        <div class="tool-section"><label class="tool-label">Foreground (Text)</label><input type="color" id="cc-fg" value="#ffffff" style="width:100%;height:44px"></div>
        <div class="tool-section"><label class="tool-label">Background</label><input type="color" id="cc-bg" value="#7c3aed" style="width:100%;height:44px"></div>
      </div>
      <div id="cc-preview" style="padding:24px;border-radius:var(--r-md);border:1px solid var(--border);margin-top:12px;text-align:center;font-size:1.1rem;font-weight:500;transition:.2s">Sample Text — The quick brown fox</div>
      <div id="cc-result" class="mt-2"></div>`;
    function calc(){
      const fg=q2(el,'#cc-fg').value, bg=q2(el,'#cc-bg').value;
      q2(el,'#cc-preview').style.color=fg; q2(el,'#cc-preview').style.background=bg;
      function lum(hex){const rgb=hexToRgb(hex);if(!rgb)return 0;return Object.values(rgb).reduce((a,c,i)=>{const v=c/255;return a+(v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4))*[.2126,.7152,.0722][i];},0);}
      const L1=lum(fg), L2=lum(bg);
      const ratio=(Math.max(L1,L2)+.05)/(Math.min(L1,L2)+.05);
      const aa=ratio>=4.5, aaa=ratio>=7, aaLg=ratio>=3;
      q2(el,'#cc-result').innerHTML=`
        <div style="text-align:center;margin-bottom:12px;font-family:var(--font-head);font-size:2.5rem;font-weight:900;color:${ratio>=4.5?'var(--emerald)':ratio>=3?'var(--yellow)':'#f87171'}">${ratio.toFixed(2)}:1</div>
        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
          ${[['AA Normal',aa],['AA Large',aaLg],['AAA Normal',aaa],['AAA Large',ratio>=4.5]].map(([l,p])=>`<div style="padding:8px 14px;border-radius:var(--r-full);border:1px solid var(--border);font-size:.85rem;color:${p?'var(--emerald)':'#f87171'}">${p?'✅':'❌'} ${l}</div>`).join('')}
        </div>`;
    }
    q2(el,'#cc-fg').addEventListener('input',calc); q2(el,'#cc-bg').addEventListener('input',calc); calc();
  }
},

/* 77 */ {
  id:'tint-shade-gen', name:'Tint & Shade Generator', icon:'🌈', category:'color',
  description:'Generate lighter tints and darker shades from any base color.',
  tags:['tint','shade','color','lighter','darker','palette'],
  setup(el) {
    el.innerHTML = `
      <div class="flex-gap mb-2">
        <div class="tool-section"><label class="tool-label">Base Color</label><input type="color" id="ts-base" value="#7c3aed" style="width:56px;height:40px"></div>
        <div class="tool-section"><label class="tool-label">Hex</label><input class="tool-input" id="ts-hex" value="#7c3aed" style="font-family:var(--font-mono)"></div>
      </div>
      <label class="tool-label">Tints (lighter →)</label>
      <div id="ts-tints" style="display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap"></div>
      <label class="tool-label">Shades (darker →)</label>
      <div id="ts-shades" style="display:flex;gap:6px;flex-wrap:wrap"></div>`;
    function gen(){
      const hex=q2(el,'#ts-hex').value; const rgb=hexToRgb(hex); if(!rgb)return;
      const tints=[90,75,60,45,30,15].map(p=>{const r=Math.round(rgb.r+(255-rgb.r)*p/100),g=Math.round(rgb.g+(255-rgb.g)*p/100),b=Math.round(rgb.b+(255-rgb.b)*p/100);return rgbToHex(r,g,b);});
      const shades=[85,70,55,40,25,10].map(p=>{const r=Math.round(rgb.r*p/100),g=Math.round(rgb.g*p/100),b=Math.round(rgb.b*p/100);return rgbToHex(r,g,b);});
      const swatch=(c,size)=>`<div style="cursor:pointer;text-align:center" onclick="copyText('${c}');showToast('Copied ${c}')"><div style="width:${size}px;height:${size}px;background:${c};border-radius:6px;border:1px solid rgba(255,255,255,.1)"></div><div style="font-size:.62rem;color:var(--text-muted);margin-top:3px;font-family:var(--font-mono)">${c}</div></div>`;
      q2(el,'#ts-tints').innerHTML=tints.map((c,i)=>swatch(c,[30,36,42,48,54,60][i])).join('');
      q2(el,'#ts-shades').innerHTML=shades.map((c,i)=>swatch(c,[60,54,48,42,36,30][i])).join('');
    }
    q2(el,'#ts-base').addEventListener('input',e=>{q2(el,'#ts-hex').value=e.target.value;gen();});
    q2(el,'#ts-hex').addEventListener('input',e=>{if(/^#[0-9a-f]{6}$/i.test(e.target.value)){q2(el,'#ts-base').value=e.target.value;gen();}});
    gen();
  }
},

/* 78 */ {
  id:'css-button-gen', name:'CSS Button Generator', icon:'🔘', category:'color',
  description:'Visually design and generate CSS for beautiful buttons.',
  tags:['css','button','generator','design','style'],
  setup(el) {
    el.innerHTML = `
      <div class="grid-2">
        <div>
          <div class="tool-section"><label class="tool-label">Label</label><input class="tool-input" id="bg-label" value="Click Me"></div>
          <div class="tool-section"><label class="tool-label">BG Color</label><input type="color" id="bg-bg" value="#7c3aed" style="width:100%;height:40px"></div>
          <div class="tool-section"><label class="tool-label">Text Color</label><input type="color" id="bg-color" value="#ffffff" style="width:100%;height:40px"></div>
          <div class="tool-section"><label class="tool-label">Padding <span id="bg-p-val">12</span>px <span id="bg-p2-val">24</span>px</label>
            <input type="range" class="tool-range" id="bg-p" min="4" max="32" value="12">
            <input type="range" class="tool-range mt-1" id="bg-p2" min="8" max="60" value="24">
          </div>
          <div class="tool-section"><label class="tool-label">Border Radius <span id="bg-r-val">8</span>px</label><input type="range" class="tool-range" id="bg-r" min="0" max="50" value="8"></div>
          <div class="tool-section"><label class="tool-label">Font Size <span id="bg-fs-val">16</span>px</label><input type="range" class="tool-range" id="bg-fs" min="10" max="32" value="16"></div>
        </div>
        <div>
          <div id="bg-preview-wrap" style="display:flex;align-items:center;justify-content:center;height:120px;background:rgba(0,0,0,.2);border-radius:var(--r-md);border:1px solid var(--border);margin-bottom:10px">
            <button id="bg-preview-btn" style="transition:.2s">Click Me</button>
          </div>
          <div class="output-wrapper">
            <div class="tool-output" id="bg-out" style="font-size:.78rem;max-height:200px"></div>
            <button class="copy-btn" onclick="doCopy('bg-out','bg-copy')" id="bg-copy">Copy</button>
          </div>
        </div>
      </div>`;
    function update(){
      const label=q2(el,'#bg-label').value, bg=q2(el,'#bg-bg').value, color=q2(el,'#bg-color').value;
      const p=q2(el,'#bg-p').value, p2=q2(el,'#bg-p2').value, r=q2(el,'#bg-r').value, fs=q2(el,'#bg-fs').value;
      [['bg-p-val',p],['bg-p2-val',p2],['bg-r-val',r],['bg-fs-val',fs]].forEach(([id,v])=>{const e2=q2(el,`#${id}`);if(e2)e2.textContent=v;});
      const btn=q2(el,'#bg-preview-btn');
      btn.textContent=label;
      btn.style.cssText=`background:${bg};color:${color};padding:${p}px ${p2}px;border-radius:${r}px;font-size:${fs}px;border:none;cursor:pointer;font-weight:600;font-family:inherit`;
      q2(el,'#bg-out').textContent=`.button {\n  background: ${bg};\n  color: ${color};\n  padding: ${p}px ${p2}px;\n  border-radius: ${r}px;\n  font-size: ${fs}px;\n  border: none;\n  cursor: pointer;\n  font-weight: 600;\n  transition: opacity 0.2s;\n}\n.button:hover { opacity: 0.85; }`;
    }
    ['#bg-label','#bg-bg','#bg-color','#bg-p','#bg-p2','#bg-r','#bg-fs'].forEach(s=>q2(el,s).addEventListener('input',update));
    update();
  }
},

/* 79 */ {
  id:'emoji-picker', name:'Emoji Picker', icon:'😊', category:'color',
  description:'Browse and copy emojis by category. Search for any emoji by name.',
  tags:['emoji','icon','copy','unicode','smiley','symbols'],
  setup(el) {
    const emojis={
      'Smileys':['😀','😃','😄','😁','😆','😅','🤣','😂','🙂','😊','😇','🥰','😍','😘','😗','😙','😚','😋','😛','😝','😜','🤪','🤨','🧐','🤓','😎','🥸','🤩','🥳','😏','😒','😞','😔','😟','😕','🙁','☹️','😣','😖','😫','😩','🥺','😢','😭','😤','😠','😡','🤬','🤯','😳','🥵','🥶','😱','😨','😰','😥','😓','🤗','🤔','🤭','🤫','🤥','😶','😐','😑','😬','🙄','😯','😦','😧','😮','😲','🥱','😴','🤤','😪','😵','🤐','🥴','🤢','🤮','🤧','😷','🤒','🤕'],
      'Animals':['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🙈','🙉','🙊','🐔','🐧','🐦','🦆','🦅','🦉','🦇','🐺','🐗','🐴','🦄','🐝','🐛','🦋','🐌','🐞','🐜','🦟','🦗','🕷️','🦂','🐢','🦎','🐍','🦖','🦕','🐙','🦑','🦐','🦞','🦀','🐡','🐠','🐟','🐬','🐳','🦈','🐊','🦁'],
      'Food':['🍎','🍊','🍋','🍇','🍓','🍒','🍑','🥭','🍍','🥥','🍆','🥑','🥦','🥕','🌽','🌶️','🥒','🥬','🧄','🧅','🍄','🥜','🌰','🍞','🥐','🥖','🫓','🥨','🧀','🥚','🍳','🧈','🥞','🧇','🥓','🥩','🍗','🍖','🍤','🍣','🍱','🍛','🍜','🍝','🍞','🌮','🌯','🥙','🧆','🥚','🍕','🍔','🍟','🥗'],
      'Objects':['💡','🔦','🕯️','🪔','📱','💻','⌨️','🖥️','🖨️','🖱️','🖲️','💾','💿','📀','📷','📸','📹','🎥','📽️','🎞️','📞','☎️','📟','📠','📺','📻','🧭','⏱️','⏰','🕰️','⌚','⏳','🔋','🔌','💰','💳','💎','🔧','🔨','⚒️','🛠️','⛏️','🔩','🔪','🗡️','⚔️','🛡️','🚀','🛸','🛶','✈️'],
      'Symbols':['❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❣️','💕','💞','💓','💗','💖','💘','💝','💟','☮️','✝️','☪️','🕉️','✡️','🔯','🪬','🕎','☯️','☦️','🛐','⛎','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','🆔','⚜️','🔰','♻️','✅','❎','🌐','💲','♾️','⚕️'],
    };
    el.innerHTML = `
      <div class="tool-section"><input class="tool-input" id="ep-search" placeholder="Search emojis…"></div>
      <div style="display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap">${Object.keys(emojis).map(cat=>`<button class="btn btn-secondary btn-xs ep-cat-btn" data-cat="${cat}">${cat}</button>`).join('')}</div>
      <div id="ep-grid" style="display:flex;flex-wrap:wrap;gap:4px;max-height:320px;overflow-y:auto"></div>
      <div id="ep-picked" class="alert alert-info mt-2" style="display:none"></div>`;
    function showCat(cat){
      const list=emojis[cat]||Object.values(emojis).flat();
      q2(el,'#ep-grid').innerHTML=list.map(e=>`<button style="font-size:1.5rem;padding:6px;background:none;border:1px solid transparent;border-radius:8px;cursor:pointer;transition:.15s" onmouseover="this.style.background='rgba(255,255,255,.08)'" onmouseout="this.style.background='none'" onclick="navigator.clipboard.writeText('${e}');document.getElementById('ep-picked').style.display='block';document.getElementById('ep-picked').textContent='Copied: ${e}';">${e}</button>`).join('');
    }
    showCat('Smileys');
    q2(el,'.ep-cat-btn')?.click();
    qa2(el,'.ep-cat-btn').forEach(b=>b.addEventListener('click',()=>showCat(b.dataset.cat)));
    q2(el,'#ep-search').addEventListener('input',function(){
      const q3=this.value.toLowerCase();
      if(!q3){showCat('Smileys');return;}
      const all=Object.values(emojis).flat();
      q2(el,'#ep-grid').innerHTML=all.map(e=>`<button style="font-size:1.5rem;padding:6px;background:none;border:1px solid transparent;border-radius:8px;cursor:pointer" onclick="navigator.clipboard.writeText('${e}')">${e}</button>`).join('');
    });
  }
},

/* 80 */ {
  id:'font-preview', name:'Font Preview', icon:'🔤', category:'color',
  description:'Preview Google Fonts and system fonts with custom text and size.',
  tags:['font','typography','preview','google fonts','text','typeface'],
  setup(el) {
    const fonts=['Inter','Roboto','Outfit','Poppins','Montserrat','Playfair Display','Merriweather','Source Code Pro','Space Mono','DM Sans','Nunito','Raleway','Lato','Open Sans','Ubuntu','Josefin Sans','Pacifico','Lobster','Dancing Script','Caveat'];
    el.innerHTML = `
      <div class="grid-2">
        <div class="tool-section"><label class="tool-label">Sample Text</label><input class="tool-input" id="fp-text" value="The quick brown fox jumps over the lazy dog 0123456789"></div>
        <div class="tool-section"><label class="tool-label">Font Size <span id="fp-size-val">28</span>px</label><input type="range" class="tool-range" id="fp-size" min="12" max="72" value="28"></div>
      </div>
      <div id="fp-list" style="max-height:420px;overflow-y:auto;margin-top:8px"></div>`;
    function render(){
      const text=q2(el,'#fp-text').value, size=q2(el,'#fp-size').value;
      q2(el,'#fp-size-val').textContent=size;
      q2(el,'#fp-list').innerHTML=fonts.map(f=>{
        const link=document.createElement('link');link.href=`https://fonts.googleapis.com/css2?family=${f.replace(/ /g,'+')}:wght@400;700&display=swap`;link.rel='stylesheet';document.head.appendChild(link);
        return `<div style="padding:14px;border-bottom:1px solid var(--border);cursor:pointer" onclick="copyText('font-family: \\'${f}\\', sans-serif;')">
          <div style="font-size:.75rem;color:var(--text-muted);margin-bottom:6px;font-family:var(--font-body)">${f}</div>
          <div style="font-family:'${f}',sans-serif;font-size:${size}px;color:var(--text-primary);line-height:1.3">${text}</div>
        </div>`;}).join('');
    }
    q2(el,'#fp-text').addEventListener('input',render);
    q2(el,'#fp-size').addEventListener('input',render);
    render();
  }
},

/* 81 */ {
  id:'color-mixer', name:'Color Mixer', icon:'🧪', category:'color',
  description:'Mix two colors together and see the blended result at different ratios.',
  tags:['color','mix','blend','combine','palette'],
  setup(el) {
    el.innerHTML = `
      <div class="grid-2">
        <div class="tool-section"><label class="tool-label">Color A</label><input type="color" id="cmx-a" value="#7c3aed" style="width:100%;height:60px"></div>
        <div class="tool-section"><label class="tool-label">Color B</label><input type="color" id="cmx-b" value="#06b6d4" style="width:100%;height:60px"></div>
      </div>
      <div id="cmx-steps" style="display:flex;gap:4px;margin-top:10px"></div>
      <div id="cmx-result" class="alert alert-info mt-2"></div>`;
    function mix(){
      const a=hexToRgb(q2(el,'#cmx-a').value), b=hexToRgb(q2(el,'#cmx-b').value);
      if(!a||!b)return;
      const steps=11;
      q2(el,'#cmx-steps').innerHTML=Array.from({length:steps},(_,i)=>{
        const t=i/(steps-1);
        const r=Math.round(a.r+(b.r-a.r)*t), g=Math.round(a.g+(b.g-a.g)*t), bv=Math.round(a.b+(b.b-a.b)*t);
        const hex=rgbToHex(r,g,bv);
        return `<div style="flex:1;height:60px;background:${hex};border-radius:4px;cursor:pointer;title:'${hex}'" onclick="copyText('${hex}');showToast('Copied ${hex}')"></div>`;
      }).join('');
      const mid=hexToRgb(rgbToHex(Math.round((a.r+b.r)/2),Math.round((a.g+b.g)/2),Math.round((a.b+b.b)/2)));
      const mHex=rgbToHex(mid.r,mid.g,mid.b);
      q2(el,'#cmx-result').textContent=`50% mix: ${mHex}`;
    }
    q2(el,'#cmx-a').addEventListener('input',mix); q2(el,'#cmx-b').addEventListener('input',mix); mix();
  }
},

/* 82 */ {
  id:'text-shadow-gen', name:'Text Shadow Generator', icon:'💬', category:'color',
  description:'Generate CSS text-shadow effects with live preview. Multiple shadow layers.',
  tags:['text shadow','css','typography','effect','generator'],
  setup(el) {
    el.innerHTML = `
      <div class="grid-2">
        <div>
          <div class="tool-section"><label class="tool-label">Sample Text</label><input class="tool-input" id="tsg-text" value="AllTools"></div>
          <div class="tool-section"><label class="tool-label">Font Size <span id="tsg-fs-val">48</span>px</label><input type="range" class="tool-range" id="tsg-fs" min="20" max="120" value="48"></div>
          <div class="tool-section"><label class="tool-label">X Offset <span id="tsg-x-val">2</span>px</label><input type="range" class="tool-range" id="tsg-x" min="-20" max="20" value="2"></div>
          <div class="tool-section"><label class="tool-label">Y Offset <span id="tsg-y-val">2</span>px</label><input type="range" class="tool-range" id="tsg-y" min="-20" max="20" value="2"></div>
          <div class="tool-section"><label class="tool-label">Blur <span id="tsg-blur-val">4</span>px</label><input type="range" class="tool-range" id="tsg-blur" min="0" max="40" value="4"></div>
          <div class="tool-section"><label class="tool-label">Color</label><input type="color" id="tsg-color" value="#a855f7" style="width:100%;height:40px"></div>
          <div class="tool-section"><label class="tool-label">Text Color</label><input type="color" id="tsg-tc" value="#ffffff" style="width:100%;height:40px"></div>
        </div>
        <div>
          <div id="tsg-preview" style="display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.3);border-radius:var(--r-md);height:160px;margin-bottom:10px;overflow:hidden">
            <span id="tsg-word" style="font-family:var(--font-head);font-weight:900;transition:.2s">AllTools</span>
          </div>
          <div class="output-wrapper">
            <div class="tool-output" id="tsg-out" style="font-size:.78rem"></div>
            <button class="copy-btn" onclick="doCopy('tsg-out','tsg-copy')" id="tsg-copy">Copy</button>
          </div>
        </div>
      </div>`;
    function update(){
      const text=q2(el,'#tsg-text').value, fs=q2(el,'#tsg-fs').value, x=q2(el,'#tsg-x').value;
      const y=q2(el,'#tsg-y').value, blur=q2(el,'#tsg-blur').value, color=q2(el,'#tsg-color').value, tc=q2(el,'#tsg-tc').value;
      [['tsg-fs-val',fs],['tsg-x-val',x],['tsg-y-val',y],['tsg-blur-val',blur]].forEach(([id,v])=>{const e=q2(el,`#${id}`);if(e)e.textContent=v;});
      const shadow=`${x}px ${y}px ${blur}px ${color}`;
      const word=q2(el,'#tsg-word');
      word.textContent=text;word.style.fontSize=fs+'px';word.style.textShadow=shadow;word.style.color=tc;
      q2(el,'#tsg-out').textContent=`text-shadow: ${shadow};`;
    }
    ['#tsg-text','#tsg-fs','#tsg-x','#tsg-y','#tsg-blur','#tsg-color','#tsg-tc'].forEach(s=>q2(el,s).addEventListener('input',update));
    update();
  }
},

/* 83 */ {
  id:'icon-reference', name:'Unicode Icon Reference', icon:'⭐', category:'color',
  description:'Browse and copy Unicode symbols, arrows, math operators, and special characters.',
  tags:['unicode','symbols','icons','special characters','arrows','copy'],
  setup(el) {
    const groups={
      'Arrows':['←','→','↑','↓','↔','↕','↗','↘','↙','↖','⇐','⇒','⇑','⇓','⟵','⟶','↩','↪','↺','↻','➡','⬅','⬆','⬇','↱','↴'],
      'Math':['±','×','÷','√','∛','∜','∞','∝','∫','∬','∮','Σ','Π','∂','∆','∇','∈','∉','∩','∪','⊂','⊃','⊆','⊇','≈','≠','≡','≤','≥','∀','∃','∄'],
      'Shapes':['■','□','▪','▫','◾','◽','◆','◇','●','○','◎','◉','★','☆','✦','✧','▲','△','▼','▽','◀','▶','◈','⬡','⬟','⬠','◐','◑'],
      'Currency':['$','€','£','¥','₹','₿','¢','₣','₤','₦','₩','₪','₫','₭','₮','₯','₱','₲','₴','₵','₶','₷','₸','₹','₺','₻','₼','₽'],
      'Misc':['©','®','™','℠','℃','℉','°','‰','‱','§','¶','†','‡','•','‣','·','⁂','❧','☞','☛','✌','✔','✗','✘','⚠','❗','❓','❕','❔','ℹ','⭐'],
    };
    el.innerHTML = `
      <div class="tool-section"><input class="tool-input" id="ir2-search" placeholder="Search symbols…"></div>
      <div style="display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap">${Object.keys(groups).map(g=>`<button class="btn btn-secondary btn-xs" data-grp="${g}">${g}</button>`).join('')}</div>
      <div id="ir2-grid" style="display:flex;flex-wrap:wrap;gap:6px;max-height:300px;overflow-y:auto"></div>`;
    function show(cat){
      const list=groups[cat]||Object.values(groups).flat();
      q2(el,'#ir2-grid').innerHTML=list.map(s=>`<div onclick="copyText('${s}');showToast('Copied: ${s}')" style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;background:rgba(255,255,255,.05);border:1px solid var(--border);border-radius:8px;cursor:pointer;transition:.15s" onmouseover="this.style.background='rgba(124,58,237,.2)'" onmouseout="this.style.background='rgba(255,255,255,.05)'">${s}</div>`).join('');
    }
    show('Arrows');
    qa2(el,'button[data-grp]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.grp)));
    q2(el,'#ir2-search').addEventListener('input',function(){if(!this.value){show('Arrows');return;}const all=Object.values(groups).flat();q2(el,'#ir2-grid').innerHTML=all.filter(s=>s.includes(this.value)).map(s=>`<div onclick="copyText('${s}')" style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;background:rgba(255,255,255,.05);border:1px solid var(--border);border-radius:8px;cursor:pointer">${s}</div>`).join('');});
  }
},

/* 84 */ {
  id:'qr-code-gen', name:'QR Code Generator', icon:'📱', category:'color',
  description:'Generate QR codes for any URL, text, or data. Download as PNG.',
  tags:['qr','qr code','generate','barcode','scan','url'],
  setup(el) {
    el.innerHTML = `
      <div class="tool-section"><label class="tool-label">Content (URL, Text, etc.)</label><input class="tool-input" id="qr-in" value="https://all-tools.app"></div>
      <div class="grid-2 mt-2">
        <div class="tool-section"><label class="tool-label">Size (px)</label><input type="range" class="tool-range" id="qr-size" min="100" max="400" value="200"><span id="qr-size-val">200</span>px</div>
        <div class="tool-section"><label class="tool-label">Color</label><input type="color" id="qr-color" value="#000000" style="width:100%;height:40px"></div>
      </div>
      <button class="btn btn-primary mt-2 mb-2" id="qr-gen">Generate QR Code</button>
      <div id="qr-out" style="display:flex;flex-direction:column;align-items:center;gap:10px"></div>`;
    q2(el,'#qr-size').addEventListener('input',e=>q2(el,'#qr-size-val').textContent=e.target.value);
    q2(el,'#qr-gen').addEventListener('click',()=>{
      const text=q2(el,'#qr-in').value.trim(); if(!text) return;
      const size=+q2(el,'#qr-size').value;
      const container=q2(el,'#qr-out'); container.innerHTML='';
      const div=document.createElement('div'); container.appendChild(div);
      if(window.QRCode){
        new QRCode(div,{text,width:size,height:size,colorDark:q2(el,'#qr-color').value,colorLight:'#ffffff',correctLevel:QRCode.CorrectLevel.H});
        setTimeout(()=>{
          const img=div.querySelector('img')||div.querySelector('canvas');
          if(img){
            const btn=document.createElement('button');btn.className='btn btn-secondary btn-sm';btn.textContent='⬇ Download QR';
            btn.addEventListener('click',()=>{
              const canvas=div.querySelector('canvas');
              if(canvas){const a=document.createElement('a');a.href=canvas.toDataURL();a.download='qrcode.png';a.click();}
            });
            container.appendChild(btn);
          }
        },300);
      } else {
        container.innerHTML='<div class="alert alert-error">QR library not loaded. Please refresh the page.</div>';
      }
    });
    q2(el,'#qr-gen').click();
  }
}

); // end COLOR/DESIGN TOOLS push
