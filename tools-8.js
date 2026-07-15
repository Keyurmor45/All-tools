window.TOOLS.push(
{
  id: 'conv-inches-kilometers',
  name: 'Inches to Kilometers Converter',
  desc: 'Convert Length from Inches to Kilometers.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Inches</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Kilometers</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 39.3701;
      const res = base * 0.001;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-inches-centimeters',
  name: 'Inches to Centimeters Converter',
  desc: 'Convert Length from Inches to Centimeters.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Inches</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Centimeters</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 39.3701;
      const res = base * 100;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-inches-millimeters',
  name: 'Inches to Millimeters Converter',
  desc: 'Convert Length from Inches to Millimeters.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Inches</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Millimeters</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 39.3701;
      const res = base * 1000;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-inches-miles',
  name: 'Inches to Miles Converter',
  desc: 'Convert Length from Inches to Miles.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Inches</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Miles</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 39.3701;
      const res = base * 0.000621371;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-inches-yards',
  name: 'Inches to Yards Converter',
  desc: 'Convert Length from Inches to Yards.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Inches</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Yards</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 39.3701;
      const res = base * 1.09361;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-inches-feet',
  name: 'Inches to Feet Converter',
  desc: 'Convert Length from Inches to Feet.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Inches</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Feet</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 39.3701;
      const res = base * 3.28084;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-kilograms-grams',
  name: 'Kilograms to Grams Converter',
  desc: 'Convert Mass from Kilograms to Grams.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Kilograms</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Grams</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1;
      const res = base * 1000;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-kilograms-milligrams',
  name: 'Kilograms to Milligrams Converter',
  desc: 'Convert Mass from Kilograms to Milligrams.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Kilograms</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Milligrams</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1;
      const res = base * 1000000;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-kilograms-metrictons',
  name: 'Kilograms to Metric Tons Converter',
  desc: 'Convert Mass from Kilograms to Metric Tons.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Kilograms</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Metric Tons</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1;
      const res = base * 0.001;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-kilograms-pounds',
  name: 'Kilograms to Pounds Converter',
  desc: 'Convert Mass from Kilograms to Pounds.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Kilograms</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Pounds</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1;
      const res = base * 2.20462;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-kilograms-ounces',
  name: 'Kilograms to Ounces Converter',
  desc: 'Convert Mass from Kilograms to Ounces.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Kilograms</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Ounces</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1;
      const res = base * 35.274;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-grams-kilograms',
  name: 'Grams to Kilograms Converter',
  desc: 'Convert Mass from Grams to Kilograms.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Grams</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Kilograms</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1000;
      const res = base * 1;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-grams-milligrams',
  name: 'Grams to Milligrams Converter',
  desc: 'Convert Mass from Grams to Milligrams.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Grams</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Milligrams</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1000;
      const res = base * 1000000;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-grams-metrictons',
  name: 'Grams to Metric Tons Converter',
  desc: 'Convert Mass from Grams to Metric Tons.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Grams</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Metric Tons</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1000;
      const res = base * 0.001;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-grams-pounds',
  name: 'Grams to Pounds Converter',
  desc: 'Convert Mass from Grams to Pounds.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Grams</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Pounds</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1000;
      const res = base * 2.20462;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-grams-ounces',
  name: 'Grams to Ounces Converter',
  desc: 'Convert Mass from Grams to Ounces.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Grams</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Ounces</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1000;
      const res = base * 35.274;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-milligrams-kilograms',
  name: 'Milligrams to Kilograms Converter',
  desc: 'Convert Mass from Milligrams to Kilograms.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Milligrams</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Kilograms</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1000000;
      const res = base * 1;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-milligrams-grams',
  name: 'Milligrams to Grams Converter',
  desc: 'Convert Mass from Milligrams to Grams.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Milligrams</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Grams</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1000000;
      const res = base * 1000;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-milligrams-metrictons',
  name: 'Milligrams to Metric Tons Converter',
  desc: 'Convert Mass from Milligrams to Metric Tons.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Milligrams</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Metric Tons</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1000000;
      const res = base * 0.001;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-milligrams-pounds',
  name: 'Milligrams to Pounds Converter',
  desc: 'Convert Mass from Milligrams to Pounds.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Milligrams</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Pounds</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1000000;
      const res = base * 2.20462;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-milligrams-ounces',
  name: 'Milligrams to Ounces Converter',
  desc: 'Convert Mass from Milligrams to Ounces.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Milligrams</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Ounces</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1000000;
      const res = base * 35.274;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-metrictons-kilograms',
  name: 'Metric Tons to Kilograms Converter',
  desc: 'Convert Mass from Metric Tons to Kilograms.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Metric Tons</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Kilograms</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.001;
      const res = base * 1;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-metrictons-grams',
  name: 'Metric Tons to Grams Converter',
  desc: 'Convert Mass from Metric Tons to Grams.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Metric Tons</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Grams</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.001;
      const res = base * 1000;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-metrictons-milligrams',
  name: 'Metric Tons to Milligrams Converter',
  desc: 'Convert Mass from Metric Tons to Milligrams.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Metric Tons</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Milligrams</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.001;
      const res = base * 1000000;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-metrictons-pounds',
  name: 'Metric Tons to Pounds Converter',
  desc: 'Convert Mass from Metric Tons to Pounds.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Metric Tons</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Pounds</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.001;
      const res = base * 2.20462;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-metrictons-ounces',
  name: 'Metric Tons to Ounces Converter',
  desc: 'Convert Mass from Metric Tons to Ounces.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Metric Tons</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Ounces</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.001;
      const res = base * 35.274;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-pounds-kilograms',
  name: 'Pounds to Kilograms Converter',
  desc: 'Convert Mass from Pounds to Kilograms.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Pounds</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Kilograms</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 2.20462;
      const res = base * 1;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-pounds-grams',
  name: 'Pounds to Grams Converter',
  desc: 'Convert Mass from Pounds to Grams.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Pounds</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Grams</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 2.20462;
      const res = base * 1000;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-pounds-milligrams',
  name: 'Pounds to Milligrams Converter',
  desc: 'Convert Mass from Pounds to Milligrams.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Pounds</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Milligrams</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 2.20462;
      const res = base * 1000000;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-pounds-metrictons',
  name: 'Pounds to Metric Tons Converter',
  desc: 'Convert Mass from Pounds to Metric Tons.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Pounds</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Metric Tons</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 2.20462;
      const res = base * 0.001;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-pounds-ounces',
  name: 'Pounds to Ounces Converter',
  desc: 'Convert Mass from Pounds to Ounces.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Pounds</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Ounces</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 2.20462;
      const res = base * 35.274;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-ounces-kilograms',
  name: 'Ounces to Kilograms Converter',
  desc: 'Convert Mass from Ounces to Kilograms.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Ounces</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Kilograms</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 35.274;
      const res = base * 1;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-ounces-grams',
  name: 'Ounces to Grams Converter',
  desc: 'Convert Mass from Ounces to Grams.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Ounces</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Grams</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 35.274;
      const res = base * 1000;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-ounces-milligrams',
  name: 'Ounces to Milligrams Converter',
  desc: 'Convert Mass from Ounces to Milligrams.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Ounces</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Milligrams</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 35.274;
      const res = base * 1000000;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-ounces-metrictons',
  name: 'Ounces to Metric Tons Converter',
  desc: 'Convert Mass from Ounces to Metric Tons.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Ounces</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Metric Tons</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 35.274;
      const res = base * 0.001;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-ounces-pounds',
  name: 'Ounces to Pounds Converter',
  desc: 'Convert Mass from Ounces to Pounds.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Ounces</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Pounds</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 35.274;
      const res = base * 2.20462;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-seconds-milliseconds',
  name: 'Seconds to Milliseconds Converter',
  desc: 'Convert Time from Seconds to Milliseconds.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Seconds</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Milliseconds</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1;
      const res = base * 1000;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-seconds-minutes',
  name: 'Seconds to Minutes Converter',
  desc: 'Convert Time from Seconds to Minutes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Seconds</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Minutes</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1;
      const res = base * 0.016666666666666666;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-seconds-hours',
  name: 'Seconds to Hours Converter',
  desc: 'Convert Time from Seconds to Hours.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Seconds</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Hours</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1;
      const res = base * 0.0002777777777777778;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-seconds-days',
  name: 'Seconds to Days Converter',
  desc: 'Convert Time from Seconds to Days.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Seconds</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Days</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1;
      const res = base * 0.000011574074074074073;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-seconds-weeks',
  name: 'Seconds to Weeks Converter',
  desc: 'Convert Time from Seconds to Weeks.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Seconds</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Weeks</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1;
      const res = base * 0.0000016534391534391535;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-seconds-years',
  name: 'Seconds to Years Converter',
  desc: 'Convert Time from Seconds to Years.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Seconds</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Years</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1;
      const res = base * 3.1709791983764586e-8;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-milliseconds-seconds',
  name: 'Milliseconds to Seconds Converter',
  desc: 'Convert Time from Milliseconds to Seconds.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Milliseconds</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Seconds</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1000;
      const res = base * 1;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-milliseconds-minutes',
  name: 'Milliseconds to Minutes Converter',
  desc: 'Convert Time from Milliseconds to Minutes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Milliseconds</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Minutes</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1000;
      const res = base * 0.016666666666666666;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-milliseconds-hours',
  name: 'Milliseconds to Hours Converter',
  desc: 'Convert Time from Milliseconds to Hours.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Milliseconds</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Hours</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1000;
      const res = base * 0.0002777777777777778;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-milliseconds-days',
  name: 'Milliseconds to Days Converter',
  desc: 'Convert Time from Milliseconds to Days.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Milliseconds</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Days</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1000;
      const res = base * 0.000011574074074074073;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-milliseconds-weeks',
  name: 'Milliseconds to Weeks Converter',
  desc: 'Convert Time from Milliseconds to Weeks.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Milliseconds</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Weeks</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1000;
      const res = base * 0.0000016534391534391535;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-milliseconds-years',
  name: 'Milliseconds to Years Converter',
  desc: 'Convert Time from Milliseconds to Years.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Milliseconds</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Years</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1000;
      const res = base * 3.1709791983764586e-8;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-minutes-seconds',
  name: 'Minutes to Seconds Converter',
  desc: 'Convert Time from Minutes to Seconds.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Minutes</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Seconds</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.016666666666666666;
      const res = base * 1;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-minutes-milliseconds',
  name: 'Minutes to Milliseconds Converter',
  desc: 'Convert Time from Minutes to Milliseconds.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Minutes</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Milliseconds</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.016666666666666666;
      const res = base * 1000;
      out.textContent = +res.toFixed(6);
    });
  }
}
);
