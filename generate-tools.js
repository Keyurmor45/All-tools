const fs = require('fs');
const path = require('path');

let globalToolId = 158;
let fileIndex = 5;

const allBatches = [];
let currentBatch = [];

function pushBatch() {
  if (currentBatch.length > 0) {
    allBatches.push([...currentBatch]);
    currentBatch = [];
  }
}

// -----------------------------------------------------------------------------
// TEMPLATES
// -----------------------------------------------------------------------------

function generateTextTools() {
  const cases = [
    { name: 'Uppercase', id: 'upper', func: 'return t.toUpperCase();' },
    { name: 'Lowercase', id: 'lower', func: 'return t.toLowerCase();' },
    { name: 'Capitalize Words', id: 'capitalize', func: 'return t.replace(/\\\\b\\\\w/g, c => c.toUpperCase());' },
    { name: 'Reverse Text', id: 'reverse', func: 'return t.split("").reverse().join("");' },
    { name: 'Reverse Words', id: 'reverse-words', func: 'return t.split(" ").reverse().join(" ");' },
    { name: 'Remove Spaces', id: 'no-spaces', func: 'return t.replace(/\\\\s/g, "");' },
    { name: 'Remove Vowels', id: 'no-vowels', func: 'return t.replace(/[aeiouAEIOU]/g, "");' },
    { name: 'Remove Consonants', id: 'no-consonants', func: 'return t.replace(/[^aeiouAEIOU\\\\s]/g, "");' },
    { name: 'Snake Case', id: 'snake', func: 'return t.trim().toLowerCase().replace(/\\\\s+/g, "_");' },
    { name: 'Kebab Case', id: 'kebab', func: 'return t.trim().toLowerCase().replace(/\\\\s+/g, "-");' },
    { name: 'Camel Case', id: 'camel', func: 'return t.replace(/(?:^\\\\w|[A-Z]|\\\\b\\\\w)/g, (w, i) => i === 0 ? w.toLowerCase() : w.toUpperCase()).replace(/\\\\s+/g, "");' },
    { name: 'Pascal Case', id: 'pascal', func: 'return t.replace(/(?:^\\\\w|[A-Z]|\\\\b\\\\w)/g, w => w.toUpperCase()).replace(/\\\\s+/g, "");' },
    { name: 'Trim Whitespace', id: 'trim', func: 'return t.trim();' },
    { name: 'Extract Emails', id: 'emails', func: 'const m = t.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\\\.[a-zA-Z]{2,}/g); return m ? m.join("\\\\n") : "No emails found";' },
    { name: 'Extract URLs', id: 'urls', func: 'const m = t.match(new RegExp("https?://[^\\\\s]+", "g")); return m ? m.join("\\\\n") : "No URLs found";' },
    { name: 'Count Vowels', id: 'count-vowels', func: 'return (t.match(/[aeiouAEIOU]/g)||[]).length.toString();' },
    { name: 'Count Consonants', id: 'count-consonants', func: 'return (t.match(/[^aeiouAEIOU\\\\s0-9\\\\W]/gi)||[]).length.toString();' },
    { name: 'String Length', id: 'length', func: 'return t.length.toString();' },
    { name: 'Count Lines', id: 'lines', func: 'return t.split("\\\\n").length.toString();' },
    { name: 'To Base64', id: 'b64-encode', func: 'return btoa(unescape(encodeURIComponent(t)));' },
    { name: 'From Base64', id: 'b64-decode', func: 'try { return decodeURIComponent(escape(atob(t))); } catch(e) { return "Invalid Base64"; }' },
    { name: 'URL Encode', id: 'url-encode', func: 'return encodeURIComponent(t);' },
    { name: 'URL Decode', id: 'url-decode', func: 'try { return decodeURIComponent(t); } catch(e) { return "Invalid URL Encoding"; }' },
    { name: 'To ASCII', id: 'to-ascii', func: 'return t.split("").map(c => c.charCodeAt(0)).join(" ");' },
    { name: 'Remove Punctuation', id: 'no-punctuation', func: 'return t.replace(new RegExp("[.,\\\\\\\\/#!$%\\\\\\\\^&\\\\\\\\*;:{}=\\\\\\\\-_`~()]", "g"), "");' },
    { name: 'Double Spaced', id: 'double-space', func: 'return t.split("").join(" ");' },
    { name: 'Remove Numbers', id: 'no-numbers', func: 'return t.replace(/[0-9]/g, "");' },
    { name: 'Remove Letters', id: 'no-letters', func: 'return t.replace(/[a-zA-Z]/g, "");' },
    { name: 'Sort Lines Alphabetically', id: 'sort-lines', func: 'return t.split("\\\\n").sort().join("\\\\n");' },
    { name: 'Sort Lines Reverse', id: 'sort-lines-rev', func: 'return t.split("\\\\n").sort().reverse().join("\\\\n");' },
    { name: 'Remove Duplicate Lines', id: 'unique-lines', func: 'return [...new Set(t.split("\\\\n"))].join("\\\\n");' },
    { name: 'Shuffle Lines', id: 'shuffle-lines', func: 'const a = t.split("\\\\n"); for(let i=a.length-1; i>0; i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a.join("\\\\n");' }
  ];

  cases.forEach(c => {
    let str = [
      "{",
      "  id: 'text-" + c.id + "',",
      "  name: '" + c.name + "',",
      "  desc: 'Quickly " + c.name.toLowerCase() + " for any text input.',",
      "  icon: '📝',",
      "  category: 'text',",
      "  setup(el) {",
      "    el.innerHTML = `",
      "      <div class=\"tool-io\">",
      "        <div class=\"io-box\">",
      "          <label class=\"io-label\">Input Text</label>",
      "          <textarea class=\"io-textarea\" id=\"in-val\" autofocus></textarea>",
      "        </div>",
      "        <div class=\"io-box io-output\">",
      "          <label class=\"io-label\">Result</label>",
      "          <textarea class=\"io-textarea\" id=\"out-val\" readonly></textarea>",
      "          <div class=\"action-row\"><button class=\"btn btn-primary\" id=\"copy-btn\">Copy</button></div>",
      "        </div>",
      "      </div>",
      "    `;",
      "    const inn = el.querySelector('#in-val');",
      "    const out = el.querySelector('#out-val');",
      "    inn.addEventListener('input', () => {",
      "      const t = inn.value;",
      "      if(!t) { out.value = ''; return; }",
      "      try {",
      "        const func = () => { " + c.func + " };",
      "        out.value = func();",
      "      } catch(e) { out.value = 'Error'; }",
      "    });",
      "    el.querySelector('#copy-btn').addEventListener('click', () => navigator.clipboard.writeText(out.value));",
      "  }",
      "}"
    ].join('\n');
    currentBatch.push(str);
    globalToolId++;
  });
}

function generateMathTools() {
  const mathForms = [
    { name: 'Area of Circle', inputs: ['Radius'], formula: 'Math.PI * Math.pow(v[0], 2)' },
    { name: 'Perimeter of Circle', inputs: ['Radius'], formula: '2 * Math.PI * v[0]' },
    { name: 'Area of Square', inputs: ['Side Length'], formula: 'Math.pow(v[0], 2)' },
    { name: 'Area of Rectangle', inputs: ['Length', 'Width'], formula: 'v[0] * v[1]' },
    { name: 'Area of Triangle', inputs: ['Base', 'Height'], formula: '0.5 * v[0] * v[1]' },
    { name: 'Volume of Cube', inputs: ['Side Length'], formula: 'Math.pow(v[0], 3)' },
    { name: 'Volume of Sphere', inputs: ['Radius'], formula: '(4/3) * Math.PI * Math.pow(v[0], 3)' },
    { name: 'Volume of Cylinder', inputs: ['Radius', 'Height'], formula: 'Math.PI * Math.pow(v[0], 2) * v[1]' },
    { name: 'Volume of Cone', inputs: ['Radius', 'Height'], formula: '(1/3) * Math.PI * Math.pow(v[0], 2) * v[1]' },
    { name: 'Pythagorean Theorem (Hypotenuse)', inputs: ['Side A', 'Side B'], formula: 'Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2))' },
    { name: 'Factorial Calculator', inputs: ['Number'], formula: '(() => { let f=1; for(let i=1; i<=Math.max(1, Math.min(v[0], 170)); i++) f*=i; return f; })()' },
    { name: 'Fibonacci Sequence', inputs: ['Nth Term'], formula: '(() => { let a=0,b=1; for(let i=0;i<v[0];i++){let t=a+b;a=b;b=t;} return a; })()' },
    { name: 'Logarithm (Base 10)', inputs: ['Number'], formula: 'Math.log10(v[0])' },
    { name: 'Natural Logarithm (ln)', inputs: ['Number'], formula: 'Math.log(v[0])' },
    { name: 'Sine (Sin)', inputs: ['Angle in Radians'], formula: 'Math.sin(v[0])' },
    { name: 'Cosine (Cos)', inputs: ['Angle in Radians'], formula: 'Math.cos(v[0])' },
    { name: 'Tangent (Tan)', inputs: ['Angle in Radians'], formula: 'Math.tan(v[0])' },
    { name: 'Square Root', inputs: ['Number'], formula: 'Math.sqrt(v[0])' },
    { name: 'Cube Root', inputs: ['Number'], formula: 'Math.cbrt(v[0])' },
    { name: 'Power/Exponent', inputs: ['Base', 'Exponent'], formula: 'Math.pow(v[0], v[1])' }
  ];

  mathForms.forEach((m, idx) => {
    let inputHTML = '';
    m.inputs.forEach((inp, i) => {
      inputHTML += '<label class="io-label" style="' + (i>0?"margin-top:10px":"") + '">' + inp + '</label>';
      inputHTML += '<input type="number" class="io-input m-in" data-idx="' + i + '" placeholder="Enter ' + inp + '" autofocus>';
    });

    let str = [
      "{",
      "  id: 'math-calc-" + idx + "',",
      "  name: '" + m.name + "',",
      "  desc: 'Calculate the " + m.name.toLowerCase() + " instantly.',",
      "  icon: '🧮',",
      "  category: 'math',",
      "  setup(el) {",
      "    el.innerHTML = `",
      "      <div class=\"tool-io\">",
      "        <div class=\"io-box\">",
      "          " + inputHTML,
      "        </div>",
      "        <div class=\"io-box io-output\">",
      "          <label class=\"io-label\">Result</label>",
      "          <div class=\"output-block\" id=\"out-val\" style=\"font-size:2rem;font-weight:bold;\">0</div>",
      "        </div>",
      "      </div>",
      "    `;",
      "    const inputs = el.querySelectorAll('.m-in');",
      "    const out = el.querySelector('#out-val');",
      "    const calc = () => {",
      "      try {",
      "        const v = Array.from(inputs).map(i => parseFloat(i.value) || 0);",
      "        const res = " + m.formula + ";",
      "        out.textContent = Number.isNaN(res) ? 'Error' : +res.toFixed(6);",
      "      } catch(e) { out.textContent = 'Error'; }",
      "    };",
      "    inputs.forEach(i => i.addEventListener('input', calc));",
      "  }",
      "}"
    ].join('\n');
    currentBatch.push(str);
    globalToolId++;
  });
}

function generateUnitConverters() {
  const units = {
    'Length': [
      { name: 'Meters', val: 1 },
      { name: 'Kilometers', val: 0.001 },
      { name: 'Centimeters', val: 100 },
      { name: 'Millimeters', val: 1000 },
      { name: 'Miles', val: 0.000621371 },
      { name: 'Yards', val: 1.09361 },
      { name: 'Feet', val: 3.28084 },
      { name: 'Inches', val: 39.3701 }
    ],
    'Mass': [
      { name: 'Kilograms', val: 1 },
      { name: 'Grams', val: 1000 },
      { name: 'Milligrams', val: 1000000 },
      { name: 'Metric Tons', val: 0.001 },
      { name: 'Pounds', val: 2.20462 },
      { name: 'Ounces', val: 35.274 }
    ],
    'Time': [
      { name: 'Seconds', val: 1 },
      { name: 'Milliseconds', val: 1000 },
      { name: 'Minutes', val: 1/60 },
      { name: 'Hours', val: 1/3600 },
      { name: 'Days', val: 1/86400 },
      { name: 'Weeks', val: 1/604800 },
      { name: 'Years', val: 1/31536000 }
    ],
    'Volume': [
      { name: 'Liters', val: 1 },
      { name: 'Milliliters', val: 1000 },
      { name: 'Cubic Meters', val: 0.001 },
      { name: 'Gallons (US)', val: 0.264172 },
      { name: 'Quarts (US)', val: 1.05669 },
      { name: 'Pints (US)', val: 2.11338 },
      { name: 'Cups (US)', val: 4.22675 },
      { name: 'Fluid Ounces (US)', val: 33.814 }
    ],
    'Digital Storage': [
      { name: 'Bytes', val: 1 },
      { name: 'Kilobytes', val: 1/1024 },
      { name: 'Megabytes', val: 1/(1024**2) },
      { name: 'Gigabytes', val: 1/(1024**3) },
      { name: 'Terabytes', val: 1/(1024**4) },
      { name: 'Petabytes', val: 1/(1024**5) },
      { name: 'Bits', val: 8 }
    ],
    'Speed': [
      { name: 'Meters/second', val: 1 },
      { name: 'Kilometers/hour', val: 3.6 },
      { name: 'Miles/hour', val: 2.23694 },
      { name: 'Knots', val: 1.94384 }
    ],
    'Area': [
      { name: 'Square Meters', val: 1 },
      { name: 'Square Kilometers', val: 0.000001 },
      { name: 'Hectares', val: 0.0001 },
      { name: 'Acres', val: 0.000247105 },
      { name: 'Square Miles', val: 3.861e-7 },
      { name: 'Square Yards', val: 1.19599 },
      { name: 'Square Feet', val: 10.7639 },
      { name: 'Square Inches', val: 1550 }
    ]
  };

  Object.keys(units).forEach(cat => {
    const arr = units[cat];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (i === j) continue;
        const u1 = arr[i];
        const u2 = arr[j];
        
        let idStr = 'conv-' + u1.name.replace(/[^a-zA-Z]/g,'').toLowerCase() + '-' + u2.name.replace(/[^a-zA-Z]/g,'').toLowerCase();
        let str = [
          "{",
          "  id: '" + idStr + "',",
          "  name: '" + u1.name + " to " + u2.name + " Converter',",
          "  desc: 'Convert " + cat + " from " + u1.name + " to " + u2.name + ".',",
          "  icon: '🔄',",
          "  category: 'converter',",
          "  setup(el) {",
          "    el.innerHTML = `",
          "      <div class=\"tool-io\">",
          "        <div class=\"io-box\">",
          "          <label class=\"io-label\">" + u1.name + "</label>",
          "          <input type=\"number\" id=\"in-val\" class=\"io-input\" placeholder=\"0\" autofocus>",
          "        </div>",
          "        <div class=\"io-box io-output\">",
          "          <label class=\"io-label\">" + u2.name + "</label>",
          "          <div class=\"output-block\" id=\"out-val\" style=\"font-size:2rem;font-weight:bold;\">0</div>",
          "        </div>",
          "      </div>",
          "    `;",
          "    const inn = el.querySelector('#in-val');",
          "    const out = el.querySelector('#out-val');",
          "    inn.addEventListener('input', () => {",
          "      const v = parseFloat(inn.value) || 0;",
          "      const base = v / " + u1.val + ";",
          "      const res = base * " + u2.val + ";",
          "      out.textContent = +res.toFixed(6);",
          "    });",
          "  }",
          "}"
        ].join('\n');
        currentBatch.push(str);
        globalToolId++;
      }
    }
  });
}

function generateColorGenerators() {
    const colors = [
        'Red', 'Green', 'Blue', 'Yellow', 'Purple', 'Orange', 'Pink', 'Brown', 'Gray', 'Cyan', 'Magenta', 'Teal', 'Lime', 'Indigo', 'Violet', 'Gold', 'Silver', 'Bronze', 'Coral', 'Navy'
    ];
    
    colors.forEach(c => {
       const hueMap = {
           'Red':[0,15], 'Green':[90,140], 'Blue':[200,240], 'Yellow':[45,60], 
           'Purple':[260,290], 'Orange':[20,40], 'Pink':[300,340], 'Brown':[20,40], 
           'Gray':[0,360], 'Cyan':[170,190], 'Magenta':[300,320], 'Teal':[170,190], 
           'Lime':[70,90], 'Indigo':[240,260], 'Violet':[270,290], 'Gold':[40,55], 
           'Silver':[0,0], 'Bronze':[20,30], 'Coral':[10,25], 'Navy':[220,250]
       };
       let arrHue = JSON.stringify(hueMap[c]);
       
       let str = [
          "{",
          "  id: 'color-palette-" + c.toLowerCase() + "',",
          "  name: '" + c + " Color Palette Generator',",
          "  desc: 'Generate a beautiful 5-shade palette based on " + c + ".',",
          "  icon: '🎨',",
          "  category: 'color',",
          "  setup(el) {",
          "    el.innerHTML = `",
          "      <div class=\"tool-io\">",
          "        <div class=\"io-box\">",
          "           <p>Click below to generate random <strong>" + c + "</strong> palettes.</p>",
          "           <button class=\"btn btn-primary\" id=\"gen-btn\">Generate Palette</button>",
          "        </div>",
          "        <div class=\"io-box io-output\">",
          "           <div style=\"display:flex; height:100px; border-radius:8px; overflow:hidden;\" id=\"pal-box\"></div>",
          "        </div>",
          "      </div>",
          "    `;",
          "    const box = el.querySelector('#pal-box');",
          "    function gen() {",
          "      box.innerHTML = '';",
          "      const baseHue = " + arrHue + ";",
          "      let h = baseHue[0] + Math.random() * (baseHue[1] - baseHue[0]);",
          "      let s = ('" + c + "'==='Gray'||'" + c + "'==='Silver') ? 0 : 70 + Math.random()*30;",
          "      for(let i=1; i<=5; i++) {",
          "         let l = 10 + (i*16);",
          "         box.innerHTML += `<div style=\"flex:1; background:hsl(${h}, ${s}%, ${l}%); cursor:pointer;\" title=\"Click to copy HSL\"></div>`;",
          "      }",
          "    }",
          "    el.querySelector('#gen-btn').addEventListener('click', gen);",
          "    gen();",
          "  }",
          "}"
       ].join('\n');
       currentBatch.push(str);
       globalToolId++;
    });
}

function build() {
  generateTextTools();
  pushBatch();
  
  generateMathTools();
  pushBatch();
  
  generateUnitConverters();
  
  let converters = [...currentBatch];
  currentBatch = [];
  while(converters.length > 0) {
      currentBatch = converters.splice(0, 50);
      pushBatch();
  }
  
  generateColorGenerators();
  pushBatch();

  // Removed spammy random animal name generators

  pushBatch();

  let fileCount = fileIndex;
  let fileList = [];
  allBatches.forEach(batch => {
     let content = "window.TOOLS.push(\n";
     content += batch.join(',\n');
     content += "\n);\n";
     let fn = "tools-" + fileCount + ".js";
     fs.writeFileSync(path.join(__dirname, fn), content);
     fileList.push(fn);
     console.log("Generated " + fn + " with " + batch.length + " tools.");
     fileCount++;
  });
  
  console.log("Total tools generated in this run: " + (globalToolId - 158));
  console.log("Total files: " + (fileCount - fileIndex));
  console.log("FILE_LIST:" + fileList.join(','));
}

build();
