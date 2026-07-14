window.TOOLS.push(
{
  id: 'math-calc-0',
  name: 'Area of Circle',
  desc: 'Calculate the area of circle instantly.',
  icon: '🧮',
  category: 'math',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label" style="">Radius</label><input type="number" class="io-input m-in" data-idx="0" placeholder="Enter Radius" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inputs = el.querySelectorAll('.m-in');
    const out = el.querySelector('#out-val');
    const calc = () => {
      try {
        const v = Array.from(inputs).map(i => parseFloat(i.value) || 0);
        const res = Math.PI * Math.pow(v[0], 2);
        out.textContent = Number.isNaN(res) ? 'Error' : +res.toFixed(6);
      } catch(e) { out.textContent = 'Error'; }
    };
    inputs.forEach(i => i.addEventListener('input', calc));
  }
},
{
  id: 'math-calc-1',
  name: 'Perimeter of Circle',
  desc: 'Calculate the perimeter of circle instantly.',
  icon: '🧮',
  category: 'math',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label" style="">Radius</label><input type="number" class="io-input m-in" data-idx="0" placeholder="Enter Radius" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inputs = el.querySelectorAll('.m-in');
    const out = el.querySelector('#out-val');
    const calc = () => {
      try {
        const v = Array.from(inputs).map(i => parseFloat(i.value) || 0);
        const res = 2 * Math.PI * v[0];
        out.textContent = Number.isNaN(res) ? 'Error' : +res.toFixed(6);
      } catch(e) { out.textContent = 'Error'; }
    };
    inputs.forEach(i => i.addEventListener('input', calc));
  }
},
{
  id: 'math-calc-2',
  name: 'Area of Square',
  desc: 'Calculate the area of square instantly.',
  icon: '🧮',
  category: 'math',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label" style="">Side Length</label><input type="number" class="io-input m-in" data-idx="0" placeholder="Enter Side Length" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inputs = el.querySelectorAll('.m-in');
    const out = el.querySelector('#out-val');
    const calc = () => {
      try {
        const v = Array.from(inputs).map(i => parseFloat(i.value) || 0);
        const res = Math.pow(v[0], 2);
        out.textContent = Number.isNaN(res) ? 'Error' : +res.toFixed(6);
      } catch(e) { out.textContent = 'Error'; }
    };
    inputs.forEach(i => i.addEventListener('input', calc));
  }
},
{
  id: 'math-calc-3',
  name: 'Area of Rectangle',
  desc: 'Calculate the area of rectangle instantly.',
  icon: '🧮',
  category: 'math',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label" style="">Length</label><input type="number" class="io-input m-in" data-idx="0" placeholder="Enter Length" autofocus><label class="io-label" style="margin-top:10px">Width</label><input type="number" class="io-input m-in" data-idx="1" placeholder="Enter Width" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inputs = el.querySelectorAll('.m-in');
    const out = el.querySelector('#out-val');
    const calc = () => {
      try {
        const v = Array.from(inputs).map(i => parseFloat(i.value) || 0);
        const res = v[0] * v[1];
        out.textContent = Number.isNaN(res) ? 'Error' : +res.toFixed(6);
      } catch(e) { out.textContent = 'Error'; }
    };
    inputs.forEach(i => i.addEventListener('input', calc));
  }
},
{
  id: 'math-calc-4',
  name: 'Area of Triangle',
  desc: 'Calculate the area of triangle instantly.',
  icon: '🧮',
  category: 'math',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label" style="">Base</label><input type="number" class="io-input m-in" data-idx="0" placeholder="Enter Base" autofocus><label class="io-label" style="margin-top:10px">Height</label><input type="number" class="io-input m-in" data-idx="1" placeholder="Enter Height" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inputs = el.querySelectorAll('.m-in');
    const out = el.querySelector('#out-val');
    const calc = () => {
      try {
        const v = Array.from(inputs).map(i => parseFloat(i.value) || 0);
        const res = 0.5 * v[0] * v[1];
        out.textContent = Number.isNaN(res) ? 'Error' : +res.toFixed(6);
      } catch(e) { out.textContent = 'Error'; }
    };
    inputs.forEach(i => i.addEventListener('input', calc));
  }
},
{
  id: 'math-calc-5',
  name: 'Volume of Cube',
  desc: 'Calculate the volume of cube instantly.',
  icon: '🧮',
  category: 'math',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label" style="">Side Length</label><input type="number" class="io-input m-in" data-idx="0" placeholder="Enter Side Length" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inputs = el.querySelectorAll('.m-in');
    const out = el.querySelector('#out-val');
    const calc = () => {
      try {
        const v = Array.from(inputs).map(i => parseFloat(i.value) || 0);
        const res = Math.pow(v[0], 3);
        out.textContent = Number.isNaN(res) ? 'Error' : +res.toFixed(6);
      } catch(e) { out.textContent = 'Error'; }
    };
    inputs.forEach(i => i.addEventListener('input', calc));
  }
},
{
  id: 'math-calc-6',
  name: 'Volume of Sphere',
  desc: 'Calculate the volume of sphere instantly.',
  icon: '🧮',
  category: 'math',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label" style="">Radius</label><input type="number" class="io-input m-in" data-idx="0" placeholder="Enter Radius" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inputs = el.querySelectorAll('.m-in');
    const out = el.querySelector('#out-val');
    const calc = () => {
      try {
        const v = Array.from(inputs).map(i => parseFloat(i.value) || 0);
        const res = (4/3) * Math.PI * Math.pow(v[0], 3);
        out.textContent = Number.isNaN(res) ? 'Error' : +res.toFixed(6);
      } catch(e) { out.textContent = 'Error'; }
    };
    inputs.forEach(i => i.addEventListener('input', calc));
  }
},
{
  id: 'math-calc-7',
  name: 'Volume of Cylinder',
  desc: 'Calculate the volume of cylinder instantly.',
  icon: '🧮',
  category: 'math',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label" style="">Radius</label><input type="number" class="io-input m-in" data-idx="0" placeholder="Enter Radius" autofocus><label class="io-label" style="margin-top:10px">Height</label><input type="number" class="io-input m-in" data-idx="1" placeholder="Enter Height" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inputs = el.querySelectorAll('.m-in');
    const out = el.querySelector('#out-val');
    const calc = () => {
      try {
        const v = Array.from(inputs).map(i => parseFloat(i.value) || 0);
        const res = Math.PI * Math.pow(v[0], 2) * v[1];
        out.textContent = Number.isNaN(res) ? 'Error' : +res.toFixed(6);
      } catch(e) { out.textContent = 'Error'; }
    };
    inputs.forEach(i => i.addEventListener('input', calc));
  }
},
{
  id: 'math-calc-8',
  name: 'Volume of Cone',
  desc: 'Calculate the volume of cone instantly.',
  icon: '🧮',
  category: 'math',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label" style="">Radius</label><input type="number" class="io-input m-in" data-idx="0" placeholder="Enter Radius" autofocus><label class="io-label" style="margin-top:10px">Height</label><input type="number" class="io-input m-in" data-idx="1" placeholder="Enter Height" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inputs = el.querySelectorAll('.m-in');
    const out = el.querySelector('#out-val');
    const calc = () => {
      try {
        const v = Array.from(inputs).map(i => parseFloat(i.value) || 0);
        const res = (1/3) * Math.PI * Math.pow(v[0], 2) * v[1];
        out.textContent = Number.isNaN(res) ? 'Error' : +res.toFixed(6);
      } catch(e) { out.textContent = 'Error'; }
    };
    inputs.forEach(i => i.addEventListener('input', calc));
  }
},
{
  id: 'math-calc-9',
  name: 'Pythagorean Theorem (Hypotenuse)',
  desc: 'Calculate the pythagorean theorem (hypotenuse) instantly.',
  icon: '🧮',
  category: 'math',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label" style="">Side A</label><input type="number" class="io-input m-in" data-idx="0" placeholder="Enter Side A" autofocus><label class="io-label" style="margin-top:10px">Side B</label><input type="number" class="io-input m-in" data-idx="1" placeholder="Enter Side B" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inputs = el.querySelectorAll('.m-in');
    const out = el.querySelector('#out-val');
    const calc = () => {
      try {
        const v = Array.from(inputs).map(i => parseFloat(i.value) || 0);
        const res = Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2));
        out.textContent = Number.isNaN(res) ? 'Error' : +res.toFixed(6);
      } catch(e) { out.textContent = 'Error'; }
    };
    inputs.forEach(i => i.addEventListener('input', calc));
  }
},
{
  id: 'math-calc-10',
  name: 'Factorial Calculator',
  desc: 'Calculate the factorial calculator instantly.',
  icon: '🧮',
  category: 'math',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label" style="">Number</label><input type="number" class="io-input m-in" data-idx="0" placeholder="Enter Number" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inputs = el.querySelectorAll('.m-in');
    const out = el.querySelector('#out-val');
    const calc = () => {
      try {
        const v = Array.from(inputs).map(i => parseFloat(i.value) || 0);
        const res = (() => { let f=1; for(let i=1; i<=Math.max(1, Math.min(v[0], 170)); i++) f*=i; return f; })();
        out.textContent = Number.isNaN(res) ? 'Error' : +res.toFixed(6);
      } catch(e) { out.textContent = 'Error'; }
    };
    inputs.forEach(i => i.addEventListener('input', calc));
  }
},
{
  id: 'math-calc-11',
  name: 'Fibonacci Sequence',
  desc: 'Calculate the fibonacci sequence instantly.',
  icon: '🧮',
  category: 'math',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label" style="">Nth Term</label><input type="number" class="io-input m-in" data-idx="0" placeholder="Enter Nth Term" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inputs = el.querySelectorAll('.m-in');
    const out = el.querySelector('#out-val');
    const calc = () => {
      try {
        const v = Array.from(inputs).map(i => parseFloat(i.value) || 0);
        const res = (() => { let a=0,b=1; for(let i=0;i<v[0];i++){let t=a+b;a=b;b=t;} return a; })();
        out.textContent = Number.isNaN(res) ? 'Error' : +res.toFixed(6);
      } catch(e) { out.textContent = 'Error'; }
    };
    inputs.forEach(i => i.addEventListener('input', calc));
  }
},
{
  id: 'math-calc-12',
  name: 'Logarithm (Base 10)',
  desc: 'Calculate the logarithm (base 10) instantly.',
  icon: '🧮',
  category: 'math',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label" style="">Number</label><input type="number" class="io-input m-in" data-idx="0" placeholder="Enter Number" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inputs = el.querySelectorAll('.m-in');
    const out = el.querySelector('#out-val');
    const calc = () => {
      try {
        const v = Array.from(inputs).map(i => parseFloat(i.value) || 0);
        const res = Math.log10(v[0]);
        out.textContent = Number.isNaN(res) ? 'Error' : +res.toFixed(6);
      } catch(e) { out.textContent = 'Error'; }
    };
    inputs.forEach(i => i.addEventListener('input', calc));
  }
},
{
  id: 'math-calc-13',
  name: 'Natural Logarithm (ln)',
  desc: 'Calculate the natural logarithm (ln) instantly.',
  icon: '🧮',
  category: 'math',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label" style="">Number</label><input type="number" class="io-input m-in" data-idx="0" placeholder="Enter Number" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inputs = el.querySelectorAll('.m-in');
    const out = el.querySelector('#out-val');
    const calc = () => {
      try {
        const v = Array.from(inputs).map(i => parseFloat(i.value) || 0);
        const res = Math.log(v[0]);
        out.textContent = Number.isNaN(res) ? 'Error' : +res.toFixed(6);
      } catch(e) { out.textContent = 'Error'; }
    };
    inputs.forEach(i => i.addEventListener('input', calc));
  }
},
{
  id: 'math-calc-14',
  name: 'Sine (Sin)',
  desc: 'Calculate the sine (sin) instantly.',
  icon: '🧮',
  category: 'math',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label" style="">Angle in Radians</label><input type="number" class="io-input m-in" data-idx="0" placeholder="Enter Angle in Radians" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inputs = el.querySelectorAll('.m-in');
    const out = el.querySelector('#out-val');
    const calc = () => {
      try {
        const v = Array.from(inputs).map(i => parseFloat(i.value) || 0);
        const res = Math.sin(v[0]);
        out.textContent = Number.isNaN(res) ? 'Error' : +res.toFixed(6);
      } catch(e) { out.textContent = 'Error'; }
    };
    inputs.forEach(i => i.addEventListener('input', calc));
  }
},
{
  id: 'math-calc-15',
  name: 'Cosine (Cos)',
  desc: 'Calculate the cosine (cos) instantly.',
  icon: '🧮',
  category: 'math',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label" style="">Angle in Radians</label><input type="number" class="io-input m-in" data-idx="0" placeholder="Enter Angle in Radians" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inputs = el.querySelectorAll('.m-in');
    const out = el.querySelector('#out-val');
    const calc = () => {
      try {
        const v = Array.from(inputs).map(i => parseFloat(i.value) || 0);
        const res = Math.cos(v[0]);
        out.textContent = Number.isNaN(res) ? 'Error' : +res.toFixed(6);
      } catch(e) { out.textContent = 'Error'; }
    };
    inputs.forEach(i => i.addEventListener('input', calc));
  }
},
{
  id: 'math-calc-16',
  name: 'Tangent (Tan)',
  desc: 'Calculate the tangent (tan) instantly.',
  icon: '🧮',
  category: 'math',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label" style="">Angle in Radians</label><input type="number" class="io-input m-in" data-idx="0" placeholder="Enter Angle in Radians" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inputs = el.querySelectorAll('.m-in');
    const out = el.querySelector('#out-val');
    const calc = () => {
      try {
        const v = Array.from(inputs).map(i => parseFloat(i.value) || 0);
        const res = Math.tan(v[0]);
        out.textContent = Number.isNaN(res) ? 'Error' : +res.toFixed(6);
      } catch(e) { out.textContent = 'Error'; }
    };
    inputs.forEach(i => i.addEventListener('input', calc));
  }
},
{
  id: 'math-calc-17',
  name: 'Square Root',
  desc: 'Calculate the square root instantly.',
  icon: '🧮',
  category: 'math',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label" style="">Number</label><input type="number" class="io-input m-in" data-idx="0" placeholder="Enter Number" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inputs = el.querySelectorAll('.m-in');
    const out = el.querySelector('#out-val');
    const calc = () => {
      try {
        const v = Array.from(inputs).map(i => parseFloat(i.value) || 0);
        const res = Math.sqrt(v[0]);
        out.textContent = Number.isNaN(res) ? 'Error' : +res.toFixed(6);
      } catch(e) { out.textContent = 'Error'; }
    };
    inputs.forEach(i => i.addEventListener('input', calc));
  }
},
{
  id: 'math-calc-18',
  name: 'Cube Root',
  desc: 'Calculate the cube root instantly.',
  icon: '🧮',
  category: 'math',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label" style="">Number</label><input type="number" class="io-input m-in" data-idx="0" placeholder="Enter Number" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inputs = el.querySelectorAll('.m-in');
    const out = el.querySelector('#out-val');
    const calc = () => {
      try {
        const v = Array.from(inputs).map(i => parseFloat(i.value) || 0);
        const res = Math.cbrt(v[0]);
        out.textContent = Number.isNaN(res) ? 'Error' : +res.toFixed(6);
      } catch(e) { out.textContent = 'Error'; }
    };
    inputs.forEach(i => i.addEventListener('input', calc));
  }
},
{
  id: 'math-calc-19',
  name: 'Power/Exponent',
  desc: 'Calculate the power/exponent instantly.',
  icon: '🧮',
  category: 'math',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
          <label class="io-label" style="">Base</label><input type="number" class="io-input m-in" data-idx="0" placeholder="Enter Base" autofocus><label class="io-label" style="margin-top:10px">Exponent</label><input type="number" class="io-input m-in" data-idx="1" placeholder="Enter Exponent" autofocus>
        </div>
        <div class="io-box io-output">
          <label class="io-label">Result</label>
          <div class="output-block" id="out-val" style="font-size:2rem;font-weight:bold;">0</div>
        </div>
      </div>
    `;
    const inputs = el.querySelectorAll('.m-in');
    const out = el.querySelector('#out-val');
    const calc = () => {
      try {
        const v = Array.from(inputs).map(i => parseFloat(i.value) || 0);
        const res = Math.pow(v[0], v[1]);
        out.textContent = Number.isNaN(res) ? 'Error' : +res.toFixed(6);
      } catch(e) { out.textContent = 'Error'; }
    };
    inputs.forEach(i => i.addEventListener('input', calc));
  }
}
);
