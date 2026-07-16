window.TOOLS.push(
{
  id: 'color-palette-red',
  name: 'Red Color Palette Generator',
  desc: 'Generate a beautiful 5-shade palette based on Red.',
  icon: '🎨',
  category: 'color',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
           <p>Click below to generate random <strong>Red</strong> palettes.</p>
           <button class="cyber-btn" id="gen-btn">Generate Palette</button>
        </div>
        <div class="io-box io-output">
           <div style="display:flex; height:100px; border-radius:8px; overflow:hidden;" id="pal-box"></div>
        </div>
      </div>
    `;
    const box = el.querySelector('#pal-box');
    function gen() {
      box.innerHTML = '';
      const baseHue = [0,15];
      let h = baseHue[0] + Math.random() * (baseHue[1] - baseHue[0]);
      let s = ('Red'==='Gray'||'Red'==='Silver') ? 0 : 70 + Math.random()*30;
      for(let i=1; i<=5; i++) {
         let l = 10 + (i*16);
         box.innerHTML += `<div style="flex:1; background:hsl(${h}, ${s}%, ${l}%); cursor:pointer;" title="Click to copy HSL"></div>`;
      }
    }
    el.querySelector('#gen-btn').addEventListener('click', gen);
    gen();
  }
},
{
  id: 'color-palette-green',
  name: 'Green Color Palette Generator',
  desc: 'Generate a beautiful 5-shade palette based on Green.',
  icon: '🎨',
  category: 'color',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
           <p>Click below to generate random <strong>Green</strong> palettes.</p>
           <button class="cyber-btn" id="gen-btn">Generate Palette</button>
        </div>
        <div class="io-box io-output">
           <div style="display:flex; height:100px; border-radius:8px; overflow:hidden;" id="pal-box"></div>
        </div>
      </div>
    `;
    const box = el.querySelector('#pal-box');
    function gen() {
      box.innerHTML = '';
      const baseHue = [90,140];
      let h = baseHue[0] + Math.random() * (baseHue[1] - baseHue[0]);
      let s = ('Green'==='Gray'||'Green'==='Silver') ? 0 : 70 + Math.random()*30;
      for(let i=1; i<=5; i++) {
         let l = 10 + (i*16);
         box.innerHTML += `<div style="flex:1; background:hsl(${h}, ${s}%, ${l}%); cursor:pointer;" title="Click to copy HSL"></div>`;
      }
    }
    el.querySelector('#gen-btn').addEventListener('click', gen);
    gen();
  }
},
{
  id: 'color-palette-blue',
  name: 'Blue Color Palette Generator',
  desc: 'Generate a beautiful 5-shade palette based on Blue.',
  icon: '🎨',
  category: 'color',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
           <p>Click below to generate random <strong>Blue</strong> palettes.</p>
           <button class="cyber-btn" id="gen-btn">Generate Palette</button>
        </div>
        <div class="io-box io-output">
           <div style="display:flex; height:100px; border-radius:8px; overflow:hidden;" id="pal-box"></div>
        </div>
      </div>
    `;
    const box = el.querySelector('#pal-box');
    function gen() {
      box.innerHTML = '';
      const baseHue = [200,240];
      let h = baseHue[0] + Math.random() * (baseHue[1] - baseHue[0]);
      let s = ('Blue'==='Gray'||'Blue'==='Silver') ? 0 : 70 + Math.random()*30;
      for(let i=1; i<=5; i++) {
         let l = 10 + (i*16);
         box.innerHTML += `<div style="flex:1; background:hsl(${h}, ${s}%, ${l}%); cursor:pointer;" title="Click to copy HSL"></div>`;
      }
    }
    el.querySelector('#gen-btn').addEventListener('click', gen);
    gen();
  }
},
{
  id: 'color-palette-yellow',
  name: 'Yellow Color Palette Generator',
  desc: 'Generate a beautiful 5-shade palette based on Yellow.',
  icon: '🎨',
  category: 'color',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
           <p>Click below to generate random <strong>Yellow</strong> palettes.</p>
           <button class="cyber-btn" id="gen-btn">Generate Palette</button>
        </div>
        <div class="io-box io-output">
           <div style="display:flex; height:100px; border-radius:8px; overflow:hidden;" id="pal-box"></div>
        </div>
      </div>
    `;
    const box = el.querySelector('#pal-box');
    function gen() {
      box.innerHTML = '';
      const baseHue = [45,60];
      let h = baseHue[0] + Math.random() * (baseHue[1] - baseHue[0]);
      let s = ('Yellow'==='Gray'||'Yellow'==='Silver') ? 0 : 70 + Math.random()*30;
      for(let i=1; i<=5; i++) {
         let l = 10 + (i*16);
         box.innerHTML += `<div style="flex:1; background:hsl(${h}, ${s}%, ${l}%); cursor:pointer;" title="Click to copy HSL"></div>`;
      }
    }
    el.querySelector('#gen-btn').addEventListener('click', gen);
    gen();
  }
},
{
  id: 'color-palette-purple',
  name: 'Purple Color Palette Generator',
  desc: 'Generate a beautiful 5-shade palette based on Purple.',
  icon: '🎨',
  category: 'color',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
           <p>Click below to generate random <strong>Purple</strong> palettes.</p>
           <button class="cyber-btn" id="gen-btn">Generate Palette</button>
        </div>
        <div class="io-box io-output">
           <div style="display:flex; height:100px; border-radius:8px; overflow:hidden;" id="pal-box"></div>
        </div>
      </div>
    `;
    const box = el.querySelector('#pal-box');
    function gen() {
      box.innerHTML = '';
      const baseHue = [260,290];
      let h = baseHue[0] + Math.random() * (baseHue[1] - baseHue[0]);
      let s = ('Purple'==='Gray'||'Purple'==='Silver') ? 0 : 70 + Math.random()*30;
      for(let i=1; i<=5; i++) {
         let l = 10 + (i*16);
         box.innerHTML += `<div style="flex:1; background:hsl(${h}, ${s}%, ${l}%); cursor:pointer;" title="Click to copy HSL"></div>`;
      }
    }
    el.querySelector('#gen-btn').addEventListener('click', gen);
    gen();
  }
},
{
  id: 'color-palette-orange',
  name: 'Orange Color Palette Generator',
  desc: 'Generate a beautiful 5-shade palette based on Orange.',
  icon: '🎨',
  category: 'color',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
           <p>Click below to generate random <strong>Orange</strong> palettes.</p>
           <button class="cyber-btn" id="gen-btn">Generate Palette</button>
        </div>
        <div class="io-box io-output">
           <div style="display:flex; height:100px; border-radius:8px; overflow:hidden;" id="pal-box"></div>
        </div>
      </div>
    `;
    const box = el.querySelector('#pal-box');
    function gen() {
      box.innerHTML = '';
      const baseHue = [20,40];
      let h = baseHue[0] + Math.random() * (baseHue[1] - baseHue[0]);
      let s = ('Orange'==='Gray'||'Orange'==='Silver') ? 0 : 70 + Math.random()*30;
      for(let i=1; i<=5; i++) {
         let l = 10 + (i*16);
         box.innerHTML += `<div style="flex:1; background:hsl(${h}, ${s}%, ${l}%); cursor:pointer;" title="Click to copy HSL"></div>`;
      }
    }
    el.querySelector('#gen-btn').addEventListener('click', gen);
    gen();
  }
},
{
  id: 'color-palette-pink',
  name: 'Pink Color Palette Generator',
  desc: 'Generate a beautiful 5-shade palette based on Pink.',
  icon: '🎨',
  category: 'color',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
           <p>Click below to generate random <strong>Pink</strong> palettes.</p>
           <button class="cyber-btn" id="gen-btn">Generate Palette</button>
        </div>
        <div class="io-box io-output">
           <div style="display:flex; height:100px; border-radius:8px; overflow:hidden;" id="pal-box"></div>
        </div>
      </div>
    `;
    const box = el.querySelector('#pal-box');
    function gen() {
      box.innerHTML = '';
      const baseHue = [300,340];
      let h = baseHue[0] + Math.random() * (baseHue[1] - baseHue[0]);
      let s = ('Pink'==='Gray'||'Pink'==='Silver') ? 0 : 70 + Math.random()*30;
      for(let i=1; i<=5; i++) {
         let l = 10 + (i*16);
         box.innerHTML += `<div style="flex:1; background:hsl(${h}, ${s}%, ${l}%); cursor:pointer;" title="Click to copy HSL"></div>`;
      }
    }
    el.querySelector('#gen-btn').addEventListener('click', gen);
    gen();
  }
},
{
  id: 'color-palette-brown',
  name: 'Brown Color Palette Generator',
  desc: 'Generate a beautiful 5-shade palette based on Brown.',
  icon: '🎨',
  category: 'color',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
           <p>Click below to generate random <strong>Brown</strong> palettes.</p>
           <button class="cyber-btn" id="gen-btn">Generate Palette</button>
        </div>
        <div class="io-box io-output">
           <div style="display:flex; height:100px; border-radius:8px; overflow:hidden;" id="pal-box"></div>
        </div>
      </div>
    `;
    const box = el.querySelector('#pal-box');
    function gen() {
      box.innerHTML = '';
      const baseHue = [20,40];
      let h = baseHue[0] + Math.random() * (baseHue[1] - baseHue[0]);
      let s = ('Brown'==='Gray'||'Brown'==='Silver') ? 0 : 70 + Math.random()*30;
      for(let i=1; i<=5; i++) {
         let l = 10 + (i*16);
         box.innerHTML += `<div style="flex:1; background:hsl(${h}, ${s}%, ${l}%); cursor:pointer;" title="Click to copy HSL"></div>`;
      }
    }
    el.querySelector('#gen-btn').addEventListener('click', gen);
    gen();
  }
},
{
  id: 'color-palette-gray',
  name: 'Gray Color Palette Generator',
  desc: 'Generate a beautiful 5-shade palette based on Gray.',
  icon: '🎨',
  category: 'color',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
           <p>Click below to generate random <strong>Gray</strong> palettes.</p>
           <button class="cyber-btn" id="gen-btn">Generate Palette</button>
        </div>
        <div class="io-box io-output">
           <div style="display:flex; height:100px; border-radius:8px; overflow:hidden;" id="pal-box"></div>
        </div>
      </div>
    `;
    const box = el.querySelector('#pal-box');
    function gen() {
      box.innerHTML = '';
      const baseHue = [0,360];
      let h = baseHue[0] + Math.random() * (baseHue[1] - baseHue[0]);
      let s = ('Gray'==='Gray'||'Gray'==='Silver') ? 0 : 70 + Math.random()*30;
      for(let i=1; i<=5; i++) {
         let l = 10 + (i*16);
         box.innerHTML += `<div style="flex:1; background:hsl(${h}, ${s}%, ${l}%); cursor:pointer;" title="Click to copy HSL"></div>`;
      }
    }
    el.querySelector('#gen-btn').addEventListener('click', gen);
    gen();
  }
},
{
  id: 'color-palette-cyan',
  name: 'Cyan Color Palette Generator',
  desc: 'Generate a beautiful 5-shade palette based on Cyan.',
  icon: '🎨',
  category: 'color',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
           <p>Click below to generate random <strong>Cyan</strong> palettes.</p>
           <button class="cyber-btn" id="gen-btn">Generate Palette</button>
        </div>
        <div class="io-box io-output">
           <div style="display:flex; height:100px; border-radius:8px; overflow:hidden;" id="pal-box"></div>
        </div>
      </div>
    `;
    const box = el.querySelector('#pal-box');
    function gen() {
      box.innerHTML = '';
      const baseHue = [170,190];
      let h = baseHue[0] + Math.random() * (baseHue[1] - baseHue[0]);
      let s = ('Cyan'==='Gray'||'Cyan'==='Silver') ? 0 : 70 + Math.random()*30;
      for(let i=1; i<=5; i++) {
         let l = 10 + (i*16);
         box.innerHTML += `<div style="flex:1; background:hsl(${h}, ${s}%, ${l}%); cursor:pointer;" title="Click to copy HSL"></div>`;
      }
    }
    el.querySelector('#gen-btn').addEventListener('click', gen);
    gen();
  }
},
{
  id: 'color-palette-magenta',
  name: 'Magenta Color Palette Generator',
  desc: 'Generate a beautiful 5-shade palette based on Magenta.',
  icon: '🎨',
  category: 'color',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
           <p>Click below to generate random <strong>Magenta</strong> palettes.</p>
           <button class="cyber-btn" id="gen-btn">Generate Palette</button>
        </div>
        <div class="io-box io-output">
           <div style="display:flex; height:100px; border-radius:8px; overflow:hidden;" id="pal-box"></div>
        </div>
      </div>
    `;
    const box = el.querySelector('#pal-box');
    function gen() {
      box.innerHTML = '';
      const baseHue = [300,320];
      let h = baseHue[0] + Math.random() * (baseHue[1] - baseHue[0]);
      let s = ('Magenta'==='Gray'||'Magenta'==='Silver') ? 0 : 70 + Math.random()*30;
      for(let i=1; i<=5; i++) {
         let l = 10 + (i*16);
         box.innerHTML += `<div style="flex:1; background:hsl(${h}, ${s}%, ${l}%); cursor:pointer;" title="Click to copy HSL"></div>`;
      }
    }
    el.querySelector('#gen-btn').addEventListener('click', gen);
    gen();
  }
},
{
  id: 'color-palette-teal',
  name: 'Teal Color Palette Generator',
  desc: 'Generate a beautiful 5-shade palette based on Teal.',
  icon: '🎨',
  category: 'color',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
           <p>Click below to generate random <strong>Teal</strong> palettes.</p>
           <button class="cyber-btn" id="gen-btn">Generate Palette</button>
        </div>
        <div class="io-box io-output">
           <div style="display:flex; height:100px; border-radius:8px; overflow:hidden;" id="pal-box"></div>
        </div>
      </div>
    `;
    const box = el.querySelector('#pal-box');
    function gen() {
      box.innerHTML = '';
      const baseHue = [170,190];
      let h = baseHue[0] + Math.random() * (baseHue[1] - baseHue[0]);
      let s = ('Teal'==='Gray'||'Teal'==='Silver') ? 0 : 70 + Math.random()*30;
      for(let i=1; i<=5; i++) {
         let l = 10 + (i*16);
         box.innerHTML += `<div style="flex:1; background:hsl(${h}, ${s}%, ${l}%); cursor:pointer;" title="Click to copy HSL"></div>`;
      }
    }
    el.querySelector('#gen-btn').addEventListener('click', gen);
    gen();
  }
},
{
  id: 'color-palette-lime',
  name: 'Lime Color Palette Generator',
  desc: 'Generate a beautiful 5-shade palette based on Lime.',
  icon: '🎨',
  category: 'color',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
           <p>Click below to generate random <strong>Lime</strong> palettes.</p>
           <button class="cyber-btn" id="gen-btn">Generate Palette</button>
        </div>
        <div class="io-box io-output">
           <div style="display:flex; height:100px; border-radius:8px; overflow:hidden;" id="pal-box"></div>
        </div>
      </div>
    `;
    const box = el.querySelector('#pal-box');
    function gen() {
      box.innerHTML = '';
      const baseHue = [70,90];
      let h = baseHue[0] + Math.random() * (baseHue[1] - baseHue[0]);
      let s = ('Lime'==='Gray'||'Lime'==='Silver') ? 0 : 70 + Math.random()*30;
      for(let i=1; i<=5; i++) {
         let l = 10 + (i*16);
         box.innerHTML += `<div style="flex:1; background:hsl(${h}, ${s}%, ${l}%); cursor:pointer;" title="Click to copy HSL"></div>`;
      }
    }
    el.querySelector('#gen-btn').addEventListener('click', gen);
    gen();
  }
},
{
  id: 'color-palette-indigo',
  name: 'Indigo Color Palette Generator',
  desc: 'Generate a beautiful 5-shade palette based on Indigo.',
  icon: '🎨',
  category: 'color',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
           <p>Click below to generate random <strong>Indigo</strong> palettes.</p>
           <button class="cyber-btn" id="gen-btn">Generate Palette</button>
        </div>
        <div class="io-box io-output">
           <div style="display:flex; height:100px; border-radius:8px; overflow:hidden;" id="pal-box"></div>
        </div>
      </div>
    `;
    const box = el.querySelector('#pal-box');
    function gen() {
      box.innerHTML = '';
      const baseHue = [240,260];
      let h = baseHue[0] + Math.random() * (baseHue[1] - baseHue[0]);
      let s = ('Indigo'==='Gray'||'Indigo'==='Silver') ? 0 : 70 + Math.random()*30;
      for(let i=1; i<=5; i++) {
         let l = 10 + (i*16);
         box.innerHTML += `<div style="flex:1; background:hsl(${h}, ${s}%, ${l}%); cursor:pointer;" title="Click to copy HSL"></div>`;
      }
    }
    el.querySelector('#gen-btn').addEventListener('click', gen);
    gen();
  }
},
{
  id: 'color-palette-violet',
  name: 'Violet Color Palette Generator',
  desc: 'Generate a beautiful 5-shade palette based on Violet.',
  icon: '🎨',
  category: 'color',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
           <p>Click below to generate random <strong>Violet</strong> palettes.</p>
           <button class="cyber-btn" id="gen-btn">Generate Palette</button>
        </div>
        <div class="io-box io-output">
           <div style="display:flex; height:100px; border-radius:8px; overflow:hidden;" id="pal-box"></div>
        </div>
      </div>
    `;
    const box = el.querySelector('#pal-box');
    function gen() {
      box.innerHTML = '';
      const baseHue = [270,290];
      let h = baseHue[0] + Math.random() * (baseHue[1] - baseHue[0]);
      let s = ('Violet'==='Gray'||'Violet'==='Silver') ? 0 : 70 + Math.random()*30;
      for(let i=1; i<=5; i++) {
         let l = 10 + (i*16);
         box.innerHTML += `<div style="flex:1; background:hsl(${h}, ${s}%, ${l}%); cursor:pointer;" title="Click to copy HSL"></div>`;
      }
    }
    el.querySelector('#gen-btn').addEventListener('click', gen);
    gen();
  }
},
{
  id: 'color-palette-gold',
  name: 'Gold Color Palette Generator',
  desc: 'Generate a beautiful 5-shade palette based on Gold.',
  icon: '🎨',
  category: 'color',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
           <p>Click below to generate random <strong>Gold</strong> palettes.</p>
           <button class="cyber-btn" id="gen-btn">Generate Palette</button>
        </div>
        <div class="io-box io-output">
           <div style="display:flex; height:100px; border-radius:8px; overflow:hidden;" id="pal-box"></div>
        </div>
      </div>
    `;
    const box = el.querySelector('#pal-box');
    function gen() {
      box.innerHTML = '';
      const baseHue = [40,55];
      let h = baseHue[0] + Math.random() * (baseHue[1] - baseHue[0]);
      let s = ('Gold'==='Gray'||'Gold'==='Silver') ? 0 : 70 + Math.random()*30;
      for(let i=1; i<=5; i++) {
         let l = 10 + (i*16);
         box.innerHTML += `<div style="flex:1; background:hsl(${h}, ${s}%, ${l}%); cursor:pointer;" title="Click to copy HSL"></div>`;
      }
    }
    el.querySelector('#gen-btn').addEventListener('click', gen);
    gen();
  }
},
{
  id: 'color-palette-silver',
  name: 'Silver Color Palette Generator',
  desc: 'Generate a beautiful 5-shade palette based on Silver.',
  icon: '🎨',
  category: 'color',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
           <p>Click below to generate random <strong>Silver</strong> palettes.</p>
           <button class="cyber-btn" id="gen-btn">Generate Palette</button>
        </div>
        <div class="io-box io-output">
           <div style="display:flex; height:100px; border-radius:8px; overflow:hidden;" id="pal-box"></div>
        </div>
      </div>
    `;
    const box = el.querySelector('#pal-box');
    function gen() {
      box.innerHTML = '';
      const baseHue = [0,0];
      let h = baseHue[0] + Math.random() * (baseHue[1] - baseHue[0]);
      let s = ('Silver'==='Gray'||'Silver'==='Silver') ? 0 : 70 + Math.random()*30;
      for(let i=1; i<=5; i++) {
         let l = 10 + (i*16);
         box.innerHTML += `<div style="flex:1; background:hsl(${h}, ${s}%, ${l}%); cursor:pointer;" title="Click to copy HSL"></div>`;
      }
    }
    el.querySelector('#gen-btn').addEventListener('click', gen);
    gen();
  }
},
{
  id: 'color-palette-bronze',
  name: 'Bronze Color Palette Generator',
  desc: 'Generate a beautiful 5-shade palette based on Bronze.',
  icon: '🎨',
  category: 'color',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
           <p>Click below to generate random <strong>Bronze</strong> palettes.</p>
           <button class="cyber-btn" id="gen-btn">Generate Palette</button>
        </div>
        <div class="io-box io-output">
           <div style="display:flex; height:100px; border-radius:8px; overflow:hidden;" id="pal-box"></div>
        </div>
      </div>
    `;
    const box = el.querySelector('#pal-box');
    function gen() {
      box.innerHTML = '';
      const baseHue = [20,30];
      let h = baseHue[0] + Math.random() * (baseHue[1] - baseHue[0]);
      let s = ('Bronze'==='Gray'||'Bronze'==='Silver') ? 0 : 70 + Math.random()*30;
      for(let i=1; i<=5; i++) {
         let l = 10 + (i*16);
         box.innerHTML += `<div style="flex:1; background:hsl(${h}, ${s}%, ${l}%); cursor:pointer;" title="Click to copy HSL"></div>`;
      }
    }
    el.querySelector('#gen-btn').addEventListener('click', gen);
    gen();
  }
},
{
  id: 'color-palette-coral',
  name: 'Coral Color Palette Generator',
  desc: 'Generate a beautiful 5-shade palette based on Coral.',
  icon: '🎨',
  category: 'color',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
           <p>Click below to generate random <strong>Coral</strong> palettes.</p>
           <button class="cyber-btn" id="gen-btn">Generate Palette</button>
        </div>
        <div class="io-box io-output">
           <div style="display:flex; height:100px; border-radius:8px; overflow:hidden;" id="pal-box"></div>
        </div>
      </div>
    `;
    const box = el.querySelector('#pal-box');
    function gen() {
      box.innerHTML = '';
      const baseHue = [10,25];
      let h = baseHue[0] + Math.random() * (baseHue[1] - baseHue[0]);
      let s = ('Coral'==='Gray'||'Coral'==='Silver') ? 0 : 70 + Math.random()*30;
      for(let i=1; i<=5; i++) {
         let l = 10 + (i*16);
         box.innerHTML += `<div style="flex:1; background:hsl(${h}, ${s}%, ${l}%); cursor:pointer;" title="Click to copy HSL"></div>`;
      }
    }
    el.querySelector('#gen-btn').addEventListener('click', gen);
    gen();
  }
},
{
  id: 'color-palette-navy',
  name: 'Navy Color Palette Generator',
  desc: 'Generate a beautiful 5-shade palette based on Navy.',
  icon: '🎨',
  category: 'color',
  setup(el) {
    el.innerHTML = `
      <div class="tool-io">
        <div class="io-box">
           <p>Click below to generate random <strong>Navy</strong> palettes.</p>
           <button class="cyber-btn" id="gen-btn">Generate Palette</button>
        </div>
        <div class="io-box io-output">
           <div style="display:flex; height:100px; border-radius:8px; overflow:hidden;" id="pal-box"></div>
        </div>
      </div>
    `;
    const box = el.querySelector('#pal-box');
    function gen() {
      box.innerHTML = '';
      const baseHue = [220,250];
      let h = baseHue[0] + Math.random() * (baseHue[1] - baseHue[0]);
      let s = ('Navy'==='Gray'||'Navy'==='Silver') ? 0 : 70 + Math.random()*30;
      for(let i=1; i<=5; i++) {
         let l = 10 + (i*16);
         box.innerHTML += `<div style="flex:1; background:hsl(${h}, ${s}%, ${l}%); cursor:pointer;" title="Click to copy HSL"></div>`;
      }
    }
    el.querySelector('#gen-btn').addEventListener('click', gen);
    gen();
  }
}
);
