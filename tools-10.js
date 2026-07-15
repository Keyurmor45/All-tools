window.TOOLS.push(
{
  id: 'conv-gallonsus-milliliters',
  name: 'Gallons (US) to Milliliters Converter',
  desc: 'Convert Volume from Gallons (US) to Milliliters.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Gallons (US)</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Milliliters</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.264172;
      const res = base * 1000;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-gallonsus-cubicmeters',
  name: 'Gallons (US) to Cubic Meters Converter',
  desc: 'Convert Volume from Gallons (US) to Cubic Meters.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Gallons (US)</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Cubic Meters</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.264172;
      const res = base * 0.001;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-gallonsus-quartsus',
  name: 'Gallons (US) to Quarts (US) Converter',
  desc: 'Convert Volume from Gallons (US) to Quarts (US).',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Gallons (US)</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Quarts (US)</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.264172;
      const res = base * 1.05669;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-gallonsus-pintsus',
  name: 'Gallons (US) to Pints (US) Converter',
  desc: 'Convert Volume from Gallons (US) to Pints (US).',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Gallons (US)</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Pints (US)</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.264172;
      const res = base * 2.11338;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-gallonsus-cupsus',
  name: 'Gallons (US) to Cups (US) Converter',
  desc: 'Convert Volume from Gallons (US) to Cups (US).',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Gallons (US)</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Cups (US)</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.264172;
      const res = base * 4.22675;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-gallonsus-fluidouncesus',
  name: 'Gallons (US) to Fluid Ounces (US) Converter',
  desc: 'Convert Volume from Gallons (US) to Fluid Ounces (US).',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Gallons (US)</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Fluid Ounces (US)</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.264172;
      const res = base * 33.814;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-quartsus-liters',
  name: 'Quarts (US) to Liters Converter',
  desc: 'Convert Volume from Quarts (US) to Liters.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Quarts (US)</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Liters</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1.05669;
      const res = base * 1;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-quartsus-milliliters',
  name: 'Quarts (US) to Milliliters Converter',
  desc: 'Convert Volume from Quarts (US) to Milliliters.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Quarts (US)</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Milliliters</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1.05669;
      const res = base * 1000;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-quartsus-cubicmeters',
  name: 'Quarts (US) to Cubic Meters Converter',
  desc: 'Convert Volume from Quarts (US) to Cubic Meters.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Quarts (US)</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Cubic Meters</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1.05669;
      const res = base * 0.001;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-quartsus-gallonsus',
  name: 'Quarts (US) to Gallons (US) Converter',
  desc: 'Convert Volume from Quarts (US) to Gallons (US).',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Quarts (US)</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Gallons (US)</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1.05669;
      const res = base * 0.264172;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-quartsus-pintsus',
  name: 'Quarts (US) to Pints (US) Converter',
  desc: 'Convert Volume from Quarts (US) to Pints (US).',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Quarts (US)</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Pints (US)</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1.05669;
      const res = base * 2.11338;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-quartsus-cupsus',
  name: 'Quarts (US) to Cups (US) Converter',
  desc: 'Convert Volume from Quarts (US) to Cups (US).',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Quarts (US)</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Cups (US)</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1.05669;
      const res = base * 4.22675;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-quartsus-fluidouncesus',
  name: 'Quarts (US) to Fluid Ounces (US) Converter',
  desc: 'Convert Volume from Quarts (US) to Fluid Ounces (US).',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Quarts (US)</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Fluid Ounces (US)</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1.05669;
      const res = base * 33.814;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-pintsus-liters',
  name: 'Pints (US) to Liters Converter',
  desc: 'Convert Volume from Pints (US) to Liters.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Pints (US)</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Liters</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 2.11338;
      const res = base * 1;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-pintsus-milliliters',
  name: 'Pints (US) to Milliliters Converter',
  desc: 'Convert Volume from Pints (US) to Milliliters.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Pints (US)</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Milliliters</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 2.11338;
      const res = base * 1000;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-pintsus-cubicmeters',
  name: 'Pints (US) to Cubic Meters Converter',
  desc: 'Convert Volume from Pints (US) to Cubic Meters.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Pints (US)</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Cubic Meters</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 2.11338;
      const res = base * 0.001;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-pintsus-gallonsus',
  name: 'Pints (US) to Gallons (US) Converter',
  desc: 'Convert Volume from Pints (US) to Gallons (US).',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Pints (US)</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Gallons (US)</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 2.11338;
      const res = base * 0.264172;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-pintsus-quartsus',
  name: 'Pints (US) to Quarts (US) Converter',
  desc: 'Convert Volume from Pints (US) to Quarts (US).',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Pints (US)</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Quarts (US)</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 2.11338;
      const res = base * 1.05669;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-pintsus-cupsus',
  name: 'Pints (US) to Cups (US) Converter',
  desc: 'Convert Volume from Pints (US) to Cups (US).',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Pints (US)</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Cups (US)</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 2.11338;
      const res = base * 4.22675;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-pintsus-fluidouncesus',
  name: 'Pints (US) to Fluid Ounces (US) Converter',
  desc: 'Convert Volume from Pints (US) to Fluid Ounces (US).',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Pints (US)</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Fluid Ounces (US)</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 2.11338;
      const res = base * 33.814;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-cupsus-liters',
  name: 'Cups (US) to Liters Converter',
  desc: 'Convert Volume from Cups (US) to Liters.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Cups (US)</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Liters</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 4.22675;
      const res = base * 1;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-cupsus-milliliters',
  name: 'Cups (US) to Milliliters Converter',
  desc: 'Convert Volume from Cups (US) to Milliliters.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Cups (US)</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Milliliters</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 4.22675;
      const res = base * 1000;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-cupsus-cubicmeters',
  name: 'Cups (US) to Cubic Meters Converter',
  desc: 'Convert Volume from Cups (US) to Cubic Meters.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Cups (US)</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Cubic Meters</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 4.22675;
      const res = base * 0.001;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-cupsus-gallonsus',
  name: 'Cups (US) to Gallons (US) Converter',
  desc: 'Convert Volume from Cups (US) to Gallons (US).',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Cups (US)</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Gallons (US)</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 4.22675;
      const res = base * 0.264172;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-cupsus-quartsus',
  name: 'Cups (US) to Quarts (US) Converter',
  desc: 'Convert Volume from Cups (US) to Quarts (US).',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Cups (US)</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Quarts (US)</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 4.22675;
      const res = base * 1.05669;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-cupsus-pintsus',
  name: 'Cups (US) to Pints (US) Converter',
  desc: 'Convert Volume from Cups (US) to Pints (US).',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Cups (US)</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Pints (US)</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 4.22675;
      const res = base * 2.11338;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-cupsus-fluidouncesus',
  name: 'Cups (US) to Fluid Ounces (US) Converter',
  desc: 'Convert Volume from Cups (US) to Fluid Ounces (US).',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Cups (US)</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Fluid Ounces (US)</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 4.22675;
      const res = base * 33.814;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-fluidouncesus-liters',
  name: 'Fluid Ounces (US) to Liters Converter',
  desc: 'Convert Volume from Fluid Ounces (US) to Liters.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Fluid Ounces (US)</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Liters</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 33.814;
      const res = base * 1;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-fluidouncesus-milliliters',
  name: 'Fluid Ounces (US) to Milliliters Converter',
  desc: 'Convert Volume from Fluid Ounces (US) to Milliliters.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Fluid Ounces (US)</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Milliliters</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 33.814;
      const res = base * 1000;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-fluidouncesus-cubicmeters',
  name: 'Fluid Ounces (US) to Cubic Meters Converter',
  desc: 'Convert Volume from Fluid Ounces (US) to Cubic Meters.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Fluid Ounces (US)</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Cubic Meters</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 33.814;
      const res = base * 0.001;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-fluidouncesus-gallonsus',
  name: 'Fluid Ounces (US) to Gallons (US) Converter',
  desc: 'Convert Volume from Fluid Ounces (US) to Gallons (US).',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Fluid Ounces (US)</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Gallons (US)</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 33.814;
      const res = base * 0.264172;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-fluidouncesus-quartsus',
  name: 'Fluid Ounces (US) to Quarts (US) Converter',
  desc: 'Convert Volume from Fluid Ounces (US) to Quarts (US).',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Fluid Ounces (US)</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Quarts (US)</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 33.814;
      const res = base * 1.05669;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-fluidouncesus-pintsus',
  name: 'Fluid Ounces (US) to Pints (US) Converter',
  desc: 'Convert Volume from Fluid Ounces (US) to Pints (US).',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Fluid Ounces (US)</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Pints (US)</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 33.814;
      const res = base * 2.11338;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-fluidouncesus-cupsus',
  name: 'Fluid Ounces (US) to Cups (US) Converter',
  desc: 'Convert Volume from Fluid Ounces (US) to Cups (US).',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Fluid Ounces (US)</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Cups (US)</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 33.814;
      const res = base * 4.22675;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-bytes-kilobytes',
  name: 'Bytes to Kilobytes Converter',
  desc: 'Convert Digital Storage from Bytes to Kilobytes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Bytes</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Kilobytes</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1;
      const res = base * 0.0009765625;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-bytes-megabytes',
  name: 'Bytes to Megabytes Converter',
  desc: 'Convert Digital Storage from Bytes to Megabytes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Bytes</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Megabytes</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1;
      const res = base * 9.5367431640625e-7;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-bytes-gigabytes',
  name: 'Bytes to Gigabytes Converter',
  desc: 'Convert Digital Storage from Bytes to Gigabytes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Bytes</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Gigabytes</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1;
      const res = base * 9.313225746154785e-10;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-bytes-terabytes',
  name: 'Bytes to Terabytes Converter',
  desc: 'Convert Digital Storage from Bytes to Terabytes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Bytes</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Terabytes</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1;
      const res = base * 9.094947017729282e-13;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-bytes-petabytes',
  name: 'Bytes to Petabytes Converter',
  desc: 'Convert Digital Storage from Bytes to Petabytes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Bytes</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Petabytes</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1;
      const res = base * 8.881784197001252e-16;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-bytes-bits',
  name: 'Bytes to Bits Converter',
  desc: 'Convert Digital Storage from Bytes to Bits.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Bytes</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Bits</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1;
      const res = base * 8;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-kilobytes-bytes',
  name: 'Kilobytes to Bytes Converter',
  desc: 'Convert Digital Storage from Kilobytes to Bytes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Kilobytes</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Bytes</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.0009765625;
      const res = base * 1;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-kilobytes-megabytes',
  name: 'Kilobytes to Megabytes Converter',
  desc: 'Convert Digital Storage from Kilobytes to Megabytes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Kilobytes</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Megabytes</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.0009765625;
      const res = base * 9.5367431640625e-7;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-kilobytes-gigabytes',
  name: 'Kilobytes to Gigabytes Converter',
  desc: 'Convert Digital Storage from Kilobytes to Gigabytes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Kilobytes</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Gigabytes</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.0009765625;
      const res = base * 9.313225746154785e-10;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-kilobytes-terabytes',
  name: 'Kilobytes to Terabytes Converter',
  desc: 'Convert Digital Storage from Kilobytes to Terabytes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Kilobytes</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Terabytes</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.0009765625;
      const res = base * 9.094947017729282e-13;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-kilobytes-petabytes',
  name: 'Kilobytes to Petabytes Converter',
  desc: 'Convert Digital Storage from Kilobytes to Petabytes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Kilobytes</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Petabytes</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.0009765625;
      const res = base * 8.881784197001252e-16;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-kilobytes-bits',
  name: 'Kilobytes to Bits Converter',
  desc: 'Convert Digital Storage from Kilobytes to Bits.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Kilobytes</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Bits</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.0009765625;
      const res = base * 8;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-megabytes-bytes',
  name: 'Megabytes to Bytes Converter',
  desc: 'Convert Digital Storage from Megabytes to Bytes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Megabytes</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Bytes</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 9.5367431640625e-7;
      const res = base * 1;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-megabytes-kilobytes',
  name: 'Megabytes to Kilobytes Converter',
  desc: 'Convert Digital Storage from Megabytes to Kilobytes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Megabytes</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Kilobytes</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 9.5367431640625e-7;
      const res = base * 0.0009765625;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-megabytes-gigabytes',
  name: 'Megabytes to Gigabytes Converter',
  desc: 'Convert Digital Storage from Megabytes to Gigabytes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Megabytes</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Gigabytes</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 9.5367431640625e-7;
      const res = base * 9.313225746154785e-10;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-megabytes-terabytes',
  name: 'Megabytes to Terabytes Converter',
  desc: 'Convert Digital Storage from Megabytes to Terabytes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Megabytes</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Terabytes</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 9.5367431640625e-7;
      const res = base * 9.094947017729282e-13;
      out.textContent = +res.toFixed(6);
    });
  }
}
);
