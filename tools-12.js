window.TOOLS.push(
{
  id: 'conv-squarekilometers-squarefeet',
  name: 'Square Kilometers to Square Feet Converter',
  desc: 'Convert Area from Square Kilometers to Square Feet.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Kilometers</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Square Feet</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.000001;
      const res = base * 10.7639;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squarekilometers-squareinches',
  name: 'Square Kilometers to Square Inches Converter',
  desc: 'Convert Area from Square Kilometers to Square Inches.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Kilometers</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Square Inches</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.000001;
      const res = base * 1550;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-hectares-squaremeters',
  name: 'Hectares to Square Meters Converter',
  desc: 'Convert Area from Hectares to Square Meters.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Hectares</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Square Meters</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.0001;
      const res = base * 1;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-hectares-squarekilometers',
  name: 'Hectares to Square Kilometers Converter',
  desc: 'Convert Area from Hectares to Square Kilometers.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Hectares</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Square Kilometers</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.0001;
      const res = base * 0.000001;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-hectares-acres',
  name: 'Hectares to Acres Converter',
  desc: 'Convert Area from Hectares to Acres.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Hectares</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Acres</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.0001;
      const res = base * 0.000247105;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-hectares-squaremiles',
  name: 'Hectares to Square Miles Converter',
  desc: 'Convert Area from Hectares to Square Miles.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Hectares</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Square Miles</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.0001;
      const res = base * 3.861e-7;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-hectares-squareyards',
  name: 'Hectares to Square Yards Converter',
  desc: 'Convert Area from Hectares to Square Yards.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Hectares</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Square Yards</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.0001;
      const res = base * 1.19599;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-hectares-squarefeet',
  name: 'Hectares to Square Feet Converter',
  desc: 'Convert Area from Hectares to Square Feet.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Hectares</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Square Feet</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.0001;
      const res = base * 10.7639;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-hectares-squareinches',
  name: 'Hectares to Square Inches Converter',
  desc: 'Convert Area from Hectares to Square Inches.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Hectares</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Square Inches</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.0001;
      const res = base * 1550;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-acres-squaremeters',
  name: 'Acres to Square Meters Converter',
  desc: 'Convert Area from Acres to Square Meters.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Acres</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Square Meters</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.000247105;
      const res = base * 1;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-acres-squarekilometers',
  name: 'Acres to Square Kilometers Converter',
  desc: 'Convert Area from Acres to Square Kilometers.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Acres</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Square Kilometers</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.000247105;
      const res = base * 0.000001;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-acres-hectares',
  name: 'Acres to Hectares Converter',
  desc: 'Convert Area from Acres to Hectares.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Acres</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Hectares</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.000247105;
      const res = base * 0.0001;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-acres-squaremiles',
  name: 'Acres to Square Miles Converter',
  desc: 'Convert Area from Acres to Square Miles.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Acres</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Square Miles</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.000247105;
      const res = base * 3.861e-7;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-acres-squareyards',
  name: 'Acres to Square Yards Converter',
  desc: 'Convert Area from Acres to Square Yards.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Acres</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Square Yards</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.000247105;
      const res = base * 1.19599;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-acres-squarefeet',
  name: 'Acres to Square Feet Converter',
  desc: 'Convert Area from Acres to Square Feet.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Acres</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Square Feet</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.000247105;
      const res = base * 10.7639;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-acres-squareinches',
  name: 'Acres to Square Inches Converter',
  desc: 'Convert Area from Acres to Square Inches.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Acres</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Square Inches</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.000247105;
      const res = base * 1550;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squaremiles-squaremeters',
  name: 'Square Miles to Square Meters Converter',
  desc: 'Convert Area from Square Miles to Square Meters.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Miles</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Square Meters</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 3.861e-7;
      const res = base * 1;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squaremiles-squarekilometers',
  name: 'Square Miles to Square Kilometers Converter',
  desc: 'Convert Area from Square Miles to Square Kilometers.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Miles</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Square Kilometers</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 3.861e-7;
      const res = base * 0.000001;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squaremiles-hectares',
  name: 'Square Miles to Hectares Converter',
  desc: 'Convert Area from Square Miles to Hectares.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Miles</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Hectares</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 3.861e-7;
      const res = base * 0.0001;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squaremiles-acres',
  name: 'Square Miles to Acres Converter',
  desc: 'Convert Area from Square Miles to Acres.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Miles</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Acres</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 3.861e-7;
      const res = base * 0.000247105;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squaremiles-squareyards',
  name: 'Square Miles to Square Yards Converter',
  desc: 'Convert Area from Square Miles to Square Yards.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Miles</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Square Yards</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 3.861e-7;
      const res = base * 1.19599;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squaremiles-squarefeet',
  name: 'Square Miles to Square Feet Converter',
  desc: 'Convert Area from Square Miles to Square Feet.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Miles</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Square Feet</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 3.861e-7;
      const res = base * 10.7639;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squaremiles-squareinches',
  name: 'Square Miles to Square Inches Converter',
  desc: 'Convert Area from Square Miles to Square Inches.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Miles</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Square Inches</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 3.861e-7;
      const res = base * 1550;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squareyards-squaremeters',
  name: 'Square Yards to Square Meters Converter',
  desc: 'Convert Area from Square Yards to Square Meters.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Yards</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Square Meters</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1.19599;
      const res = base * 1;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squareyards-squarekilometers',
  name: 'Square Yards to Square Kilometers Converter',
  desc: 'Convert Area from Square Yards to Square Kilometers.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Yards</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Square Kilometers</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1.19599;
      const res = base * 0.000001;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squareyards-hectares',
  name: 'Square Yards to Hectares Converter',
  desc: 'Convert Area from Square Yards to Hectares.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Yards</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Hectares</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1.19599;
      const res = base * 0.0001;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squareyards-acres',
  name: 'Square Yards to Acres Converter',
  desc: 'Convert Area from Square Yards to Acres.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Yards</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Acres</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1.19599;
      const res = base * 0.000247105;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squareyards-squaremiles',
  name: 'Square Yards to Square Miles Converter',
  desc: 'Convert Area from Square Yards to Square Miles.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Yards</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Square Miles</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1.19599;
      const res = base * 3.861e-7;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squareyards-squarefeet',
  name: 'Square Yards to Square Feet Converter',
  desc: 'Convert Area from Square Yards to Square Feet.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Yards</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Square Feet</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1.19599;
      const res = base * 10.7639;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squareyards-squareinches',
  name: 'Square Yards to Square Inches Converter',
  desc: 'Convert Area from Square Yards to Square Inches.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Yards</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Square Inches</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1.19599;
      const res = base * 1550;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squarefeet-squaremeters',
  name: 'Square Feet to Square Meters Converter',
  desc: 'Convert Area from Square Feet to Square Meters.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Feet</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Square Meters</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 10.7639;
      const res = base * 1;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squarefeet-squarekilometers',
  name: 'Square Feet to Square Kilometers Converter',
  desc: 'Convert Area from Square Feet to Square Kilometers.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Feet</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Square Kilometers</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 10.7639;
      const res = base * 0.000001;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squarefeet-hectares',
  name: 'Square Feet to Hectares Converter',
  desc: 'Convert Area from Square Feet to Hectares.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Feet</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Hectares</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 10.7639;
      const res = base * 0.0001;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squarefeet-acres',
  name: 'Square Feet to Acres Converter',
  desc: 'Convert Area from Square Feet to Acres.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Feet</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Acres</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 10.7639;
      const res = base * 0.000247105;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squarefeet-squaremiles',
  name: 'Square Feet to Square Miles Converter',
  desc: 'Convert Area from Square Feet to Square Miles.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Feet</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Square Miles</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 10.7639;
      const res = base * 3.861e-7;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squarefeet-squareyards',
  name: 'Square Feet to Square Yards Converter',
  desc: 'Convert Area from Square Feet to Square Yards.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Feet</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Square Yards</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 10.7639;
      const res = base * 1.19599;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squarefeet-squareinches',
  name: 'Square Feet to Square Inches Converter',
  desc: 'Convert Area from Square Feet to Square Inches.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Feet</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Square Inches</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 10.7639;
      const res = base * 1550;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squareinches-squaremeters',
  name: 'Square Inches to Square Meters Converter',
  desc: 'Convert Area from Square Inches to Square Meters.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Inches</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Square Meters</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1550;
      const res = base * 1;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squareinches-squarekilometers',
  name: 'Square Inches to Square Kilometers Converter',
  desc: 'Convert Area from Square Inches to Square Kilometers.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Inches</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Square Kilometers</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1550;
      const res = base * 0.000001;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squareinches-hectares',
  name: 'Square Inches to Hectares Converter',
  desc: 'Convert Area from Square Inches to Hectares.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Inches</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Hectares</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1550;
      const res = base * 0.0001;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squareinches-acres',
  name: 'Square Inches to Acres Converter',
  desc: 'Convert Area from Square Inches to Acres.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Inches</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Acres</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1550;
      const res = base * 0.000247105;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squareinches-squaremiles',
  name: 'Square Inches to Square Miles Converter',
  desc: 'Convert Area from Square Inches to Square Miles.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Inches</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Square Miles</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1550;
      const res = base * 3.861e-7;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squareinches-squareyards',
  name: 'Square Inches to Square Yards Converter',
  desc: 'Convert Area from Square Inches to Square Yards.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Inches</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Square Yards</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1550;
      const res = base * 1.19599;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squareinches-squarefeet',
  name: 'Square Inches to Square Feet Converter',
  desc: 'Convert Area from Square Inches to Square Feet.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Inches</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Square Feet</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1550;
      const res = base * 10.7639;
      out.textContent = +res.toFixed(6);
    });
  }
}
);
