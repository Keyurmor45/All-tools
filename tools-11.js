window.TOOLS.push(
{
  id: 'conv-megabytes-petabytes',
  name: 'Megabytes to Petabytes Converter',
  desc: 'Convert Digital Storage from Megabytes to Petabytes.',
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
          <label class="io-label">Petabytes</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 9.5367431640625e-7;
      const res = base * 8.881784197001252e-16;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-megabytes-bits',
  name: 'Megabytes to Bits Converter',
  desc: 'Convert Digital Storage from Megabytes to Bits.',
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
          <label class="io-label">Bits</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 9.5367431640625e-7;
      const res = base * 8;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-gigabytes-bytes',
  name: 'Gigabytes to Bytes Converter',
  desc: 'Convert Digital Storage from Gigabytes to Bytes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Gigabytes</label>
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
      const base = v / 9.313225746154785e-10;
      const res = base * 1;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-gigabytes-kilobytes',
  name: 'Gigabytes to Kilobytes Converter',
  desc: 'Convert Digital Storage from Gigabytes to Kilobytes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Gigabytes</label>
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
      const base = v / 9.313225746154785e-10;
      const res = base * 0.0009765625;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-gigabytes-megabytes',
  name: 'Gigabytes to Megabytes Converter',
  desc: 'Convert Digital Storage from Gigabytes to Megabytes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Gigabytes</label>
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
      const base = v / 9.313225746154785e-10;
      const res = base * 9.5367431640625e-7;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-gigabytes-terabytes',
  name: 'Gigabytes to Terabytes Converter',
  desc: 'Convert Digital Storage from Gigabytes to Terabytes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Gigabytes</label>
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
      const base = v / 9.313225746154785e-10;
      const res = base * 9.094947017729282e-13;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-gigabytes-petabytes',
  name: 'Gigabytes to Petabytes Converter',
  desc: 'Convert Digital Storage from Gigabytes to Petabytes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Gigabytes</label>
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
      const base = v / 9.313225746154785e-10;
      const res = base * 8.881784197001252e-16;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-gigabytes-bits',
  name: 'Gigabytes to Bits Converter',
  desc: 'Convert Digital Storage from Gigabytes to Bits.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Gigabytes</label>
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
      const base = v / 9.313225746154785e-10;
      const res = base * 8;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-terabytes-bytes',
  name: 'Terabytes to Bytes Converter',
  desc: 'Convert Digital Storage from Terabytes to Bytes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Terabytes</label>
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
      const base = v / 9.094947017729282e-13;
      const res = base * 1;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-terabytes-kilobytes',
  name: 'Terabytes to Kilobytes Converter',
  desc: 'Convert Digital Storage from Terabytes to Kilobytes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Terabytes</label>
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
      const base = v / 9.094947017729282e-13;
      const res = base * 0.0009765625;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-terabytes-megabytes',
  name: 'Terabytes to Megabytes Converter',
  desc: 'Convert Digital Storage from Terabytes to Megabytes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Terabytes</label>
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
      const base = v / 9.094947017729282e-13;
      const res = base * 9.5367431640625e-7;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-terabytes-gigabytes',
  name: 'Terabytes to Gigabytes Converter',
  desc: 'Convert Digital Storage from Terabytes to Gigabytes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Terabytes</label>
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
      const base = v / 9.094947017729282e-13;
      const res = base * 9.313225746154785e-10;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-terabytes-petabytes',
  name: 'Terabytes to Petabytes Converter',
  desc: 'Convert Digital Storage from Terabytes to Petabytes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Terabytes</label>
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
      const base = v / 9.094947017729282e-13;
      const res = base * 8.881784197001252e-16;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-terabytes-bits',
  name: 'Terabytes to Bits Converter',
  desc: 'Convert Digital Storage from Terabytes to Bits.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Terabytes</label>
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
      const base = v / 9.094947017729282e-13;
      const res = base * 8;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-petabytes-bytes',
  name: 'Petabytes to Bytes Converter',
  desc: 'Convert Digital Storage from Petabytes to Bytes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Petabytes</label>
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
      const base = v / 8.881784197001252e-16;
      const res = base * 1;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-petabytes-kilobytes',
  name: 'Petabytes to Kilobytes Converter',
  desc: 'Convert Digital Storage from Petabytes to Kilobytes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Petabytes</label>
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
      const base = v / 8.881784197001252e-16;
      const res = base * 0.0009765625;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-petabytes-megabytes',
  name: 'Petabytes to Megabytes Converter',
  desc: 'Convert Digital Storage from Petabytes to Megabytes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Petabytes</label>
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
      const base = v / 8.881784197001252e-16;
      const res = base * 9.5367431640625e-7;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-petabytes-gigabytes',
  name: 'Petabytes to Gigabytes Converter',
  desc: 'Convert Digital Storage from Petabytes to Gigabytes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Petabytes</label>
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
      const base = v / 8.881784197001252e-16;
      const res = base * 9.313225746154785e-10;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-petabytes-terabytes',
  name: 'Petabytes to Terabytes Converter',
  desc: 'Convert Digital Storage from Petabytes to Terabytes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Petabytes</label>
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
      const base = v / 8.881784197001252e-16;
      const res = base * 9.094947017729282e-13;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-petabytes-bits',
  name: 'Petabytes to Bits Converter',
  desc: 'Convert Digital Storage from Petabytes to Bits.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Petabytes</label>
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
      const base = v / 8.881784197001252e-16;
      const res = base * 8;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-bits-bytes',
  name: 'Bits to Bytes Converter',
  desc: 'Convert Digital Storage from Bits to Bytes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Bits</label>
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
      const base = v / 8;
      const res = base * 1;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-bits-kilobytes',
  name: 'Bits to Kilobytes Converter',
  desc: 'Convert Digital Storage from Bits to Kilobytes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Bits</label>
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
      const base = v / 8;
      const res = base * 0.0009765625;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-bits-megabytes',
  name: 'Bits to Megabytes Converter',
  desc: 'Convert Digital Storage from Bits to Megabytes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Bits</label>
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
      const base = v / 8;
      const res = base * 9.5367431640625e-7;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-bits-gigabytes',
  name: 'Bits to Gigabytes Converter',
  desc: 'Convert Digital Storage from Bits to Gigabytes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Bits</label>
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
      const base = v / 8;
      const res = base * 9.313225746154785e-10;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-bits-terabytes',
  name: 'Bits to Terabytes Converter',
  desc: 'Convert Digital Storage from Bits to Terabytes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Bits</label>
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
      const base = v / 8;
      const res = base * 9.094947017729282e-13;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-bits-petabytes',
  name: 'Bits to Petabytes Converter',
  desc: 'Convert Digital Storage from Bits to Petabytes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Bits</label>
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
      const base = v / 8;
      const res = base * 8.881784197001252e-16;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-meterssecond-kilometershour',
  name: 'Meters/second to Kilometers/hour Converter',
  desc: 'Convert Speed from Meters/second to Kilometers/hour.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Meters/second</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Kilometers/hour</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1;
      const res = base * 3.6;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-meterssecond-mileshour',
  name: 'Meters/second to Miles/hour Converter',
  desc: 'Convert Speed from Meters/second to Miles/hour.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Meters/second</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Miles/hour</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1;
      const res = base * 2.23694;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-meterssecond-knots',
  name: 'Meters/second to Knots Converter',
  desc: 'Convert Speed from Meters/second to Knots.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Meters/second</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Knots</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1;
      const res = base * 1.94384;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-kilometershour-meterssecond',
  name: 'Kilometers/hour to Meters/second Converter',
  desc: 'Convert Speed from Kilometers/hour to Meters/second.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Kilometers/hour</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Meters/second</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 3.6;
      const res = base * 1;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-kilometershour-mileshour',
  name: 'Kilometers/hour to Miles/hour Converter',
  desc: 'Convert Speed from Kilometers/hour to Miles/hour.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Kilometers/hour</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Miles/hour</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 3.6;
      const res = base * 2.23694;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-kilometershour-knots',
  name: 'Kilometers/hour to Knots Converter',
  desc: 'Convert Speed from Kilometers/hour to Knots.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Kilometers/hour</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Knots</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 3.6;
      const res = base * 1.94384;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-mileshour-meterssecond',
  name: 'Miles/hour to Meters/second Converter',
  desc: 'Convert Speed from Miles/hour to Meters/second.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Miles/hour</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Meters/second</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 2.23694;
      const res = base * 1;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-mileshour-kilometershour',
  name: 'Miles/hour to Kilometers/hour Converter',
  desc: 'Convert Speed from Miles/hour to Kilometers/hour.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Miles/hour</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Kilometers/hour</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 2.23694;
      const res = base * 3.6;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-mileshour-knots',
  name: 'Miles/hour to Knots Converter',
  desc: 'Convert Speed from Miles/hour to Knots.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Miles/hour</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Knots</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 2.23694;
      const res = base * 1.94384;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-knots-meterssecond',
  name: 'Knots to Meters/second Converter',
  desc: 'Convert Speed from Knots to Meters/second.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Knots</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Meters/second</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1.94384;
      const res = base * 1;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-knots-kilometershour',
  name: 'Knots to Kilometers/hour Converter',
  desc: 'Convert Speed from Knots to Kilometers/hour.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Knots</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Kilometers/hour</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1.94384;
      const res = base * 3.6;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-knots-mileshour',
  name: 'Knots to Miles/hour Converter',
  desc: 'Convert Speed from Knots to Miles/hour.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Knots</label>
          <input type="number" id="in-val" class="io-input" placeholder="0" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Miles/hour</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 1.94384;
      const res = base * 2.23694;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squaremeters-squarekilometers',
  name: 'Square Meters to Square Kilometers Converter',
  desc: 'Convert Area from Square Meters to Square Kilometers.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Meters</label>
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
      const base = v / 1;
      const res = base * 0.000001;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squaremeters-hectares',
  name: 'Square Meters to Hectares Converter',
  desc: 'Convert Area from Square Meters to Hectares.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Meters</label>
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
      const base = v / 1;
      const res = base * 0.0001;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squaremeters-acres',
  name: 'Square Meters to Acres Converter',
  desc: 'Convert Area from Square Meters to Acres.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Meters</label>
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
      const base = v / 1;
      const res = base * 0.000247105;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squaremeters-squaremiles',
  name: 'Square Meters to Square Miles Converter',
  desc: 'Convert Area from Square Meters to Square Miles.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Meters</label>
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
      const base = v / 1;
      const res = base * 3.861e-7;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squaremeters-squareyards',
  name: 'Square Meters to Square Yards Converter',
  desc: 'Convert Area from Square Meters to Square Yards.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Meters</label>
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
      const base = v / 1;
      const res = base * 1.19599;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squaremeters-squarefeet',
  name: 'Square Meters to Square Feet Converter',
  desc: 'Convert Area from Square Meters to Square Feet.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Meters</label>
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
      const base = v / 1;
      const res = base * 10.7639;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squaremeters-squareinches',
  name: 'Square Meters to Square Inches Converter',
  desc: 'Convert Area from Square Meters to Square Inches.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Square Meters</label>
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
      const base = v / 1;
      const res = base * 1550;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squarekilometers-squaremeters',
  name: 'Square Kilometers to Square Meters Converter',
  desc: 'Convert Area from Square Kilometers to Square Meters.',
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
          <label class="io-label">Square Meters</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.000001;
      const res = base * 1;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squarekilometers-hectares',
  name: 'Square Kilometers to Hectares Converter',
  desc: 'Convert Area from Square Kilometers to Hectares.',
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
          <label class="io-label">Hectares</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.000001;
      const res = base * 0.0001;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squarekilometers-acres',
  name: 'Square Kilometers to Acres Converter',
  desc: 'Convert Area from Square Kilometers to Acres.',
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
          <label class="io-label">Acres</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.000001;
      const res = base * 0.000247105;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squarekilometers-squaremiles',
  name: 'Square Kilometers to Square Miles Converter',
  desc: 'Convert Area from Square Kilometers to Square Miles.',
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
          <label class="io-label">Square Miles</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.000001;
      const res = base * 3.861e-7;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-squarekilometers-squareyards',
  name: 'Square Kilometers to Square Yards Converter',
  desc: 'Convert Area from Square Kilometers to Square Yards.',
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
          <label class="io-label">Square Yards</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.000001;
      const res = base * 1.19599;
      out.textContent = +res.toFixed(6);
    });
  }
}
);
