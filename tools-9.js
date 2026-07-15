window.TOOLS.push(
{
  id: 'conv-minutes-hours',
  name: 'Minutes to Hours Converter',
  desc: 'Convert Time from Minutes to Hours.',
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
          <label class="io-label">Hours</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.016666666666666666;
      const res = base * 0.0002777777777777778;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-minutes-days',
  name: 'Minutes to Days Converter',
  desc: 'Convert Time from Minutes to Days.',
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
          <label class="io-label">Days</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.016666666666666666;
      const res = base * 0.000011574074074074073;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-minutes-weeks',
  name: 'Minutes to Weeks Converter',
  desc: 'Convert Time from Minutes to Weeks.',
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
          <label class="io-label">Weeks</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.016666666666666666;
      const res = base * 0.0000016534391534391535;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-minutes-years',
  name: 'Minutes to Years Converter',
  desc: 'Convert Time from Minutes to Years.',
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
          <label class="io-label">Years</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.016666666666666666;
      const res = base * 3.1709791983764586e-8;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-hours-seconds',
  name: 'Hours to Seconds Converter',
  desc: 'Convert Time from Hours to Seconds.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Hours</label>
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
      const base = v / 0.0002777777777777778;
      const res = base * 1;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-hours-milliseconds',
  name: 'Hours to Milliseconds Converter',
  desc: 'Convert Time from Hours to Milliseconds.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Hours</label>
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
      const base = v / 0.0002777777777777778;
      const res = base * 1000;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-hours-minutes',
  name: 'Hours to Minutes Converter',
  desc: 'Convert Time from Hours to Minutes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Hours</label>
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
      const base = v / 0.0002777777777777778;
      const res = base * 0.016666666666666666;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-hours-days',
  name: 'Hours to Days Converter',
  desc: 'Convert Time from Hours to Days.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Hours</label>
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
      const base = v / 0.0002777777777777778;
      const res = base * 0.000011574074074074073;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-hours-weeks',
  name: 'Hours to Weeks Converter',
  desc: 'Convert Time from Hours to Weeks.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Hours</label>
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
      const base = v / 0.0002777777777777778;
      const res = base * 0.0000016534391534391535;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-hours-years',
  name: 'Hours to Years Converter',
  desc: 'Convert Time from Hours to Years.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Hours</label>
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
      const base = v / 0.0002777777777777778;
      const res = base * 3.1709791983764586e-8;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-days-seconds',
  name: 'Days to Seconds Converter',
  desc: 'Convert Time from Days to Seconds.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Days</label>
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
      const base = v / 0.000011574074074074073;
      const res = base * 1;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-days-milliseconds',
  name: 'Days to Milliseconds Converter',
  desc: 'Convert Time from Days to Milliseconds.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Days</label>
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
      const base = v / 0.000011574074074074073;
      const res = base * 1000;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-days-minutes',
  name: 'Days to Minutes Converter',
  desc: 'Convert Time from Days to Minutes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Days</label>
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
      const base = v / 0.000011574074074074073;
      const res = base * 0.016666666666666666;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-days-hours',
  name: 'Days to Hours Converter',
  desc: 'Convert Time from Days to Hours.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Days</label>
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
      const base = v / 0.000011574074074074073;
      const res = base * 0.0002777777777777778;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-days-weeks',
  name: 'Days to Weeks Converter',
  desc: 'Convert Time from Days to Weeks.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Days</label>
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
      const base = v / 0.000011574074074074073;
      const res = base * 0.0000016534391534391535;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-days-years',
  name: 'Days to Years Converter',
  desc: 'Convert Time from Days to Years.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Days</label>
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
      const base = v / 0.000011574074074074073;
      const res = base * 3.1709791983764586e-8;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-weeks-seconds',
  name: 'Weeks to Seconds Converter',
  desc: 'Convert Time from Weeks to Seconds.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Weeks</label>
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
      const base = v / 0.0000016534391534391535;
      const res = base * 1;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-weeks-milliseconds',
  name: 'Weeks to Milliseconds Converter',
  desc: 'Convert Time from Weeks to Milliseconds.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Weeks</label>
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
      const base = v / 0.0000016534391534391535;
      const res = base * 1000;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-weeks-minutes',
  name: 'Weeks to Minutes Converter',
  desc: 'Convert Time from Weeks to Minutes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Weeks</label>
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
      const base = v / 0.0000016534391534391535;
      const res = base * 0.016666666666666666;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-weeks-hours',
  name: 'Weeks to Hours Converter',
  desc: 'Convert Time from Weeks to Hours.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Weeks</label>
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
      const base = v / 0.0000016534391534391535;
      const res = base * 0.0002777777777777778;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-weeks-days',
  name: 'Weeks to Days Converter',
  desc: 'Convert Time from Weeks to Days.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Weeks</label>
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
      const base = v / 0.0000016534391534391535;
      const res = base * 0.000011574074074074073;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-weeks-years',
  name: 'Weeks to Years Converter',
  desc: 'Convert Time from Weeks to Years.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Weeks</label>
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
      const base = v / 0.0000016534391534391535;
      const res = base * 3.1709791983764586e-8;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-years-seconds',
  name: 'Years to Seconds Converter',
  desc: 'Convert Time from Years to Seconds.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Years</label>
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
      const base = v / 3.1709791983764586e-8;
      const res = base * 1;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-years-milliseconds',
  name: 'Years to Milliseconds Converter',
  desc: 'Convert Time from Years to Milliseconds.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Years</label>
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
      const base = v / 3.1709791983764586e-8;
      const res = base * 1000;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-years-minutes',
  name: 'Years to Minutes Converter',
  desc: 'Convert Time from Years to Minutes.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Years</label>
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
      const base = v / 3.1709791983764586e-8;
      const res = base * 0.016666666666666666;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-years-hours',
  name: 'Years to Hours Converter',
  desc: 'Convert Time from Years to Hours.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Years</label>
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
      const base = v / 3.1709791983764586e-8;
      const res = base * 0.0002777777777777778;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-years-days',
  name: 'Years to Days Converter',
  desc: 'Convert Time from Years to Days.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Years</label>
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
      const base = v / 3.1709791983764586e-8;
      const res = base * 0.000011574074074074073;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-years-weeks',
  name: 'Years to Weeks Converter',
  desc: 'Convert Time from Years to Weeks.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Years</label>
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
      const base = v / 3.1709791983764586e-8;
      const res = base * 0.0000016534391534391535;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-liters-milliliters',
  name: 'Liters to Milliliters Converter',
  desc: 'Convert Volume from Liters to Milliliters.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Liters</label>
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
      const base = v / 1;
      const res = base * 1000;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-liters-cubicmeters',
  name: 'Liters to Cubic Meters Converter',
  desc: 'Convert Volume from Liters to Cubic Meters.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Liters</label>
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
      const base = v / 1;
      const res = base * 0.001;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-liters-gallonsus',
  name: 'Liters to Gallons (US) Converter',
  desc: 'Convert Volume from Liters to Gallons (US).',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Liters</label>
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
      const base = v / 1;
      const res = base * 0.264172;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-liters-quartsus',
  name: 'Liters to Quarts (US) Converter',
  desc: 'Convert Volume from Liters to Quarts (US).',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Liters</label>
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
      const base = v / 1;
      const res = base * 1.05669;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-liters-pintsus',
  name: 'Liters to Pints (US) Converter',
  desc: 'Convert Volume from Liters to Pints (US).',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Liters</label>
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
      const base = v / 1;
      const res = base * 2.11338;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-liters-cupsus',
  name: 'Liters to Cups (US) Converter',
  desc: 'Convert Volume from Liters to Cups (US).',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Liters</label>
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
      const base = v / 1;
      const res = base * 4.22675;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-liters-fluidouncesus',
  name: 'Liters to Fluid Ounces (US) Converter',
  desc: 'Convert Volume from Liters to Fluid Ounces (US).',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Liters</label>
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
      const base = v / 1;
      const res = base * 33.814;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-milliliters-liters',
  name: 'Milliliters to Liters Converter',
  desc: 'Convert Volume from Milliliters to Liters.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Milliliters</label>
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
      const base = v / 1000;
      const res = base * 1;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-milliliters-cubicmeters',
  name: 'Milliliters to Cubic Meters Converter',
  desc: 'Convert Volume from Milliliters to Cubic Meters.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Milliliters</label>
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
      const base = v / 1000;
      const res = base * 0.001;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-milliliters-gallonsus',
  name: 'Milliliters to Gallons (US) Converter',
  desc: 'Convert Volume from Milliliters to Gallons (US).',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Milliliters</label>
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
      const base = v / 1000;
      const res = base * 0.264172;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-milliliters-quartsus',
  name: 'Milliliters to Quarts (US) Converter',
  desc: 'Convert Volume from Milliliters to Quarts (US).',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Milliliters</label>
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
      const base = v / 1000;
      const res = base * 1.05669;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-milliliters-pintsus',
  name: 'Milliliters to Pints (US) Converter',
  desc: 'Convert Volume from Milliliters to Pints (US).',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Milliliters</label>
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
      const base = v / 1000;
      const res = base * 2.11338;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-milliliters-cupsus',
  name: 'Milliliters to Cups (US) Converter',
  desc: 'Convert Volume from Milliliters to Cups (US).',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Milliliters</label>
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
      const base = v / 1000;
      const res = base * 4.22675;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-milliliters-fluidouncesus',
  name: 'Milliliters to Fluid Ounces (US) Converter',
  desc: 'Convert Volume from Milliliters to Fluid Ounces (US).',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Milliliters</label>
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
      const base = v / 1000;
      const res = base * 33.814;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-cubicmeters-liters',
  name: 'Cubic Meters to Liters Converter',
  desc: 'Convert Volume from Cubic Meters to Liters.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Cubic Meters</label>
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
      const base = v / 0.001;
      const res = base * 1;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-cubicmeters-milliliters',
  name: 'Cubic Meters to Milliliters Converter',
  desc: 'Convert Volume from Cubic Meters to Milliliters.',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Cubic Meters</label>
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
      const base = v / 0.001;
      const res = base * 1000;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-cubicmeters-gallonsus',
  name: 'Cubic Meters to Gallons (US) Converter',
  desc: 'Convert Volume from Cubic Meters to Gallons (US).',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Cubic Meters</label>
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
      const base = v / 0.001;
      const res = base * 0.264172;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-cubicmeters-quartsus',
  name: 'Cubic Meters to Quarts (US) Converter',
  desc: 'Convert Volume from Cubic Meters to Quarts (US).',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Cubic Meters</label>
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
      const base = v / 0.001;
      const res = base * 1.05669;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-cubicmeters-pintsus',
  name: 'Cubic Meters to Pints (US) Converter',
  desc: 'Convert Volume from Cubic Meters to Pints (US).',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Cubic Meters</label>
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
      const base = v / 0.001;
      const res = base * 2.11338;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-cubicmeters-cupsus',
  name: 'Cubic Meters to Cups (US) Converter',
  desc: 'Convert Volume from Cubic Meters to Cups (US).',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Cubic Meters</label>
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
      const base = v / 0.001;
      const res = base * 4.22675;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-cubicmeters-fluidouncesus',
  name: 'Cubic Meters to Fluid Ounces (US) Converter',
  desc: 'Convert Volume from Cubic Meters to Fluid Ounces (US).',
  icon: '🔄',
  category: 'converter',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label">Cubic Meters</label>
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
      const base = v / 0.001;
      const res = base * 33.814;
      out.textContent = +res.toFixed(6);
    });
  }
},
{
  id: 'conv-gallonsus-liters',
  name: 'Gallons (US) to Liters Converter',
  desc: 'Convert Volume from Gallons (US) to Liters.',
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
          <label class="io-label">Liters</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inn = el.querySelector('#in-val');
    const out = el.querySelector('#out-val');
    inn.addEventListener('input', () => {
      const v = parseFloat(inn.value) || 0;
      const base = v / 0.264172;
      const res = base * 1;
      out.textContent = +res.toFixed(6);
    });
  }
}
);
