window.TOOLS.push(
  // 12. Retro Car Racing
  {
    id: 'game-carracing',
    name: 'Retro Car Racing',
    desc: 'Dodge traffic and survive as long as you can! Use Arrow Keys or tap sides.',
    icon: '🏎️',
    category: 'fun',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io" style="align-items:center;">
          <div style="display:flex; justify-content:space-between; width:100%; max-width:400px; margin-bottom:10px; font-weight:bold;">
            <div>Score: <span id="cr-score" style="color:var(--accent-warm);">0</span></div>
            <div>Hi-Score: <span id="cr-hi">0</span></div>
          </div>
          <div style="position:relative; width:100%; max-width:400px; height:500px; background:#333; border-radius:8px; overflow:hidden;">
            <canvas id="cr-canvas" style="display:block; width:100%; height:100%;"></canvas>
            <div id="cr-overlay" style="position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7); display:flex; flex-direction:column; align-items:center; justify-content:center; color:#fff;">
              <h2 style="margin-bottom:20px; font-size:2rem;">Retro Racer</h2>
              <button class="cyber-btn" id="cr-start">Start Engine</button>
            </div>
          </div>
          <p style="margin-top:10px; font-size:0.9rem; color:var(--text-secondary);">Controls: Arrow Keys or Tap Left/Right side of screen</p>
        </div>
      `;
      
      const canvas = el.querySelector('#cr-canvas');
      const ctx = canvas.getContext('2d');
      const overlay = el.querySelector('#cr-overlay');
      const startBtn = el.querySelector('#cr-start');
      const scoreEl = el.querySelector('#cr-score');
      const hiEl = el.querySelector('#cr-hi');
      
      // Responsive canvas
      const resize = () => {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      };
      window.addEventListener('resize', resize);
      resize();

      let score = 0, hiScore = 0;
      let state = 'menu'; // menu, playing, gameover
      let car = { x: 0, y: 0, w: 40, h: 70, speed: 0, lane: 1 };
      let enemies = [];
      let lines = [];
      let speedMultiplier = 1;
      let frameId;
      let lastTime = 0;

      // Audio Engine
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const playTone = (freq, type, duration, vol=0.1) => {
        if(audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(vol, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
      };
      const sndCrash = () => playTone(100, 'sawtooth', 0.5, 0.2);
      const sndScore = () => playTone(800, 'square', 0.1, 0.05);

      const initGame = () => {
        score = 0;
        speedMultiplier = 1;
        state = 'playing';
        overlay.style.display = 'none';
        car = { x: canvas.width/2 - 20, y: canvas.height - 100, w: 40, h: 70, dx: 0 };
        enemies = [];
        lines = [0, 100, 200, 300, 400, 500];
        lastTime = performance.now();
        if(audioCtx.state === 'suspended') audioCtx.resume();
        loop(performance.now());
      };

      const drawCar = (x, y, w, h, color) => {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h); // Body
        ctx.fillStyle = '#111';
        ctx.fillRect(x-5, y+10, 5, 15); // Tires
        ctx.fillRect(x+w, y+10, 5, 15);
        ctx.fillRect(x-5, y+h-25, 5, 15);
        ctx.fillRect(x+w, y+h-25, 5, 15);
        ctx.fillStyle = '#88ccff';
        ctx.fillRect(x+5, y+15, w-10, 15); // Window
      };

      const loop = (timestamp) => {
        if(!document.body.contains(canvas)) return;
        if(state !== 'playing') return;
        const dt = (timestamp - lastTime) / 1000;
        lastTime = timestamp;
        
        ctx.fillStyle = '#444';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Road Lines
        ctx.fillStyle = '#fff';
        const baseSpeed = 300 * speedMultiplier * dt;
        for(let i=0; i<lines.length; i++) {
          lines[i] += baseSpeed;
          if(lines[i] > canvas.height) lines[i] -= 600;
          ctx.fillRect(canvas.width/3 - 5, lines[i], 10, 50);
          ctx.fillRect((canvas.width/3)*2 - 5, lines[i], 10, 50);
        }

        // Move Car
        car.x += car.dx * dt;
        if(car.x < 10) car.x = 10;
        if(car.x > canvas.width - car.w - 10) car.x = canvas.width - car.w - 10;
        
        drawCar(car.x, car.y, car.w, car.h, 'var(--accent-red)');

        // Enemies
        if(Math.random() < 0.02 * speedMultiplier) {
           const lane = Math.floor(Math.random()*3);
           const ex = (canvas.width/3) * lane + (canvas.width/6) - 20;
           let overlaps = false;
           for(let e of enemies) if(e.lane === lane && e.y < 150) overlaps = true;
           if(!overlaps) {
             const colors = ['#55ff55', '#5555ff', '#ffff55', '#ff55ff'];
             enemies.push({ x: ex, y: -80, w: 40, h: 70, speed: (150 + Math.random()*100) * speedMultiplier, lane, color: colors[Math.floor(Math.random()*colors.length)] });
           }
        }

        for(let i=enemies.length-1; i>=0; i--) {
          let e = enemies[i];
          e.y += (baseSpeed/dt + e.speed/2) * dt;
          drawCar(e.x, e.y, e.w, e.h, e.color);
          
          // Collision
          if(car.x < e.x + e.w && car.x + car.w > e.x && car.y < e.y + e.h && car.y + car.h > e.y) {
            state = 'gameover';
            sndCrash();
            overlay.style.display = 'flex';
            overlay.innerHTML = `<h2 style="margin-bottom:10px;color:var(--accent-red);">CRASHED!</h2><p style="margin-bottom:20px;">Score: ${Math.floor(score)}</p><button class="cyber-btn" id="cr-start2">Try Again</button>`;
            overlay.querySelector('#cr-start2').addEventListener('click', initGame);
            if(Math.floor(score) > hiScore) hiScore = Math.floor(score);
            hiEl.textContent = hiScore;
            return;
          }
          
          if(e.y > canvas.height) {
            enemies.splice(i, 1);
          }
        }

        score += 5 * dt;
        speedMultiplier += 0.01 * dt;
        scoreEl.textContent = Math.floor(score);
        if(Math.floor(score) % 100 === 0 && Math.floor(score)>0) sndScore();

        frameId = requestAnimationFrame(loop);
      };

      // Controls
      const setMove = (dir) => { if(state==='playing') car.dx = dir * 400; };
      const hd = (e) => {
        if(!document.body.contains(canvas)) { window.removeEventListener("keydown", hd); return; }

        if(e.key === 'ArrowLeft') setMove(-1);
        if(e.key === 'ArrowRight') setMove(1);
      };
      const hu = (e) => {
        if(!document.body.contains(canvas)) { window.removeEventListener("keyup", hu); return; }

        if(e.key === 'ArrowLeft' || e.key === 'ArrowRight') car.dx = 0;
      };
      window.addEventListener("keydown", hd);
      window.addEventListener("keyup", hu);
      canvas.addEventListener("touchstart", (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        setMove(x < canvas.width/2 ? -1 : 1);
        e.preventDefault();
      });
      canvas.addEventListener('touchend', () => car.dx = 0);
      canvas.addEventListener('mousedown', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        setMove(x < canvas.width/2 ? -1 : 1);
      });
      canvas.addEventListener('mouseup', () => car.dx = 0);

      startBtn.addEventListener('click', initGame);
    }
  },

  // 13. Flappy Clone
  {
    id: 'game-flappy',
    name: 'Flappy Bird Clone',
    desc: 'Tap or Spacebar to flap. Dodge the pipes!',
    icon: '🐦',
    category: 'fun',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io" style="align-items:center;">
          <div style="position:relative; width:100%; max-width:400px; height:500px; background:#70c5ce; border-radius:8px; overflow:hidden;">
            <canvas id="fb-canvas" style="display:block; width:100%; height:100%; cursor:pointer;"></canvas>
            <div id="fb-score" style="position:absolute; top:20px; width:100%; text-align:center; font-size:3rem; font-weight:bold; color:white; text-shadow:2px 2px 0 #000; pointer-events:none;">0</div>
            <div id="fb-overlay" style="position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); display:flex; flex-direction:column; align-items:center; justify-content:center; color:#fff;">
              <h2 style="margin-bottom:20px; font-size:2rem;">Flappy Clone</h2>
              <button class="cyber-btn" id="fb-start">Play</button>
            </div>
          </div>
        </div>
      `;
      
      const canvas = el.querySelector('#fb-canvas');
      const ctx = canvas.getContext('2d');
      const overlay = el.querySelector('#fb-overlay');
      const startBtn = el.querySelector('#fb-start');
      const scoreEl = el.querySelector('#fb-score');
      
      const resize = () => {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      };
      window.addEventListener('resize', resize);
      resize();

      let state = 'menu';
      let score = 0;
      let bird = { x: 50, y: 200, v: 0, r: 15 };
      let pipes = [];
      let frame;
      const g = 0.6;
      const jump = -8;
      const pipeW = 60;
      const gap = 150;

      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const playTone = (freq, type, dur, vol=0.1) => {
        if(audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(vol, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + dur);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + dur);
      };
      const sndFlap = () => playTone(300, 'sine', 0.1, 0.1);
      const sndScore = () => playTone(1200, 'square', 0.1, 0.1);
      const sndHit = () => playTone(100, 'sawtooth', 0.3, 0.2);

      const init = () => {
        state = 'playing';
        score = 0;
        scoreEl.textContent = score;
        overlay.style.display = 'none';
        bird = { x: 50, y: canvas.height/2, v: 0, r: 15 };
        pipes = [];
        if(audioCtx.state === 'suspended') audioCtx.resume();
        loop();
      };

      const flap = () => {
        if(state !== 'playing') return;
        bird.v = jump;
        sndFlap();
      };

      const loop = () => {
        if(!document.body.contains(canvas)) return;
        if(state !== 'playing') return;
        
        ctx.fillStyle = '#70c5ce';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Bird Physics
        bird.v += g;
        bird.y += bird.v;
        
        // Draw Bird
        ctx.fillStyle = '#f4d03f';
        ctx.beginPath();
        ctx.arc(bird.x, bird.y, bird.r, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(bird.x+5, bird.y-5, 5, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(bird.x+7, bird.y-5, 2, 0, Math.PI*2);
        ctx.fill();

        // Pipes
        if(pipes.length === 0 || pipes[pipes.length-1].x < canvas.width - 200) {
          const minH = 50;
          const maxH = canvas.height - gap - minH;
          const h = Math.floor(Math.random()*(maxH - minH + 1) + minH);
          pipes.push({ x: canvas.width, topH: h, passed: false });
        }

        ctx.fillStyle = '#73bf2e';
        for(let i=pipes.length-1; i>=0; i--) {
          let p = pipes[i];
          p.x -= 3;
          
          // Draw Top Pipe
          ctx.fillRect(p.x, 0, pipeW, p.topH);
          ctx.fillRect(p.x-5, p.topH-20, pipeW+10, 20);
          
          // Draw Bottom Pipe
          const botY = p.topH + gap;
          const botH = canvas.height - botY;
          ctx.fillRect(p.x, botY, pipeW, botH);
          ctx.fillRect(p.x-5, botY, pipeW+10, 20);

          // Collision
          const hitTop = bird.x+bird.r > p.x && bird.x-bird.r < p.x+pipeW && bird.y-bird.r < p.topH;
          const hitBot = bird.x+bird.r > p.x && bird.x-bird.r < p.x+pipeW && bird.y+bird.r > botY;
          if(hitTop || hitBot || bird.y+bird.r > canvas.height || bird.y-bird.r < 0) {
            state = 'gameover';
            sndHit();
            overlay.style.display = 'flex';
            overlay.innerHTML = `<h2 style="margin-bottom:10px;">Game Over</h2><p style="margin-bottom:20px;">Score: ${score}</p><button class="cyber-btn" id="fb-start2">Try Again</button>`;
            overlay.querySelector('#fb-start2').addEventListener('click', init);
            return;
          }

          // Score
          if(p.x + pipeW < bird.x && !p.passed) {
            p.passed = true;
            score++;
            scoreEl.textContent = score;
            sndScore();
          }

          if(p.x + pipeW < 0) pipes.splice(i, 1);
        }

        frame = requestAnimationFrame(loop);
      };

      canvas.addEventListener('mousedown', flap);
      canvas.addEventListener('touchstart', (e) => { flap(); e.preventDefault(); });
      const hd = (e) => {
        if(!document.body.contains(canvas)) { window.removeEventListener("keydown", hd); return; }
        if(e.key === ' ' || e.key === 'ArrowUp') flap(); 
      };
      window.addEventListener("keydown", hd);
      startBtn.addEventListener('click', init);
    }
  },

  // 14. Asteroids Survival
  {
    id: 'game-asteroids',
    name: 'Asteroids Survival',
    desc: 'Fly your ship and shoot asteroids! Arrow keys to move, Space to shoot.',
    icon: '🚀',
    category: 'fun',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io" style="align-items:center;">
          <div style="display:flex; justify-content:space-between; width:100%; max-width:500px; margin-bottom:10px; font-weight:bold;">
            <div>Score: <span id="ast-score" style="color:var(--accent-warm);">0</span></div>
            <div>Level: <span id="ast-lvl">1</span></div>
          </div>
          <div style="position:relative; width:100%; max-width:500px; height:500px; background:#000; border-radius:8px; overflow:hidden; border:1px solid var(--border);">
            <canvas id="ast-canvas" style="display:block; width:100%; height:100%;"></canvas>
            <div id="ast-overlay" style="position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); display:flex; flex-direction:column; align-items:center; justify-content:center; color:#fff;">
              <h2 style="margin-bottom:20px; font-size:2rem; color:var(--accent-warm);">ASTEROIDS</h2>
              <button class="cyber-btn" id="ast-start">Launch Ship</button>
              <p style="margin-top:20px; font-size:0.9rem; color:#aaa;">Mobile: Tap left/right screen to rotate, top to thrust, center to shoot.</p>
            </div>
          </div>
        </div>
      `;
      
      const canvas = el.querySelector('#ast-canvas');
      const ctx = canvas.getContext('2d');
      const overlay = el.querySelector('#ast-overlay');
      const startBtn = el.querySelector('#ast-start');
      const scoreEl = el.querySelector('#ast-score');
      const lvlEl = el.querySelector('#ast-lvl');
      
      const resize = () => {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      };
      window.addEventListener('resize', resize);
      resize();

      let state = 'menu';
      let score = 0, level = 1;
      let ship = {}, bullets = [], asts = [], keys = {};

      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const playTone = (freq, type, dur, vol=0.1) => {
        if(audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(vol, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + dur);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + dur);
      };
      const sndShoot = () => playTone(600, 'square', 0.05, 0.05);
      const sndBoom = () => playTone(100, 'sawtooth', 0.2, 0.2);
      const sndThrust = () => playTone(50, 'square', 0.1, 0.05);

      const spawnAst = (count) => {
        for(let i=0; i<count; i++) {
          let x, y;
          do {
            x = Math.random() * canvas.width;
            y = Math.random() * canvas.height;
          } while(Math.hypot(x-ship.x, y-ship.y) < 100); // away from ship
          
          let a = Math.random() * Math.PI * 2;
          let s = 1 + Math.random()*2;
          asts.push({x, y, vx: Math.cos(a)*s, vy: Math.sin(a)*s, r: 30, edges: 7+Math.random()*5, rot: 0, rots: (Math.random()-0.5)*0.1 });
        }
      };

      const init = () => {
        state = 'playing';
        score = 0; level = 1;
        scoreEl.textContent = score; lvlEl.textContent = level;
        overlay.style.display = 'none';
        
        ship = { x: canvas.width/2, y: canvas.height/2, a: -Math.PI/2, vx: 0, vy: 0, r: 10 };
        bullets = [];
        asts = [];
        keys = {};
        
        spawnAst(4);
        if(audioCtx.state === 'suspended') audioCtx.resume();
        loop();
      };

      const shoot = () => {
        if(state !== 'playing' || bullets.length > 5) return;
        bullets.push({
          x: ship.x + Math.cos(ship.a)*ship.r,
          y: ship.y + Math.sin(ship.a)*ship.r,
          vx: Math.cos(ship.a)*8,
          vy: Math.sin(ship.a)*8,
          life: 60
        });
        sndShoot();
      };

      const wrap = (o) => {
        if(o.x < 0) o.x += canvas.width;
        if(o.x > canvas.width) o.x -= canvas.width;
        if(o.y < 0) o.y += canvas.height;
        if(o.y > canvas.height) o.y -= canvas.height;
      };

      const loop = () => {
        if(!document.body.contains(canvas)) return;
        if(state !== 'playing') return;
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'; // Trail effect
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Ship physics
        if(keys['ArrowLeft'] || keys['a']) ship.a -= 0.1;
        if(keys['ArrowRight'] || keys['d']) ship.a += 0.1;
        if(keys['ArrowUp'] || keys['w']) {
          ship.vx += Math.cos(ship.a) * 0.1;
          ship.vy += Math.sin(ship.a) * 0.1;
          if(Math.random()<0.3) sndThrust();
          // Engine flame
          ctx.fillStyle = '#fa0';
          ctx.beginPath();
          ctx.arc(ship.x - Math.cos(ship.a)*15 + (Math.random()-0.5)*5, ship.y - Math.sin(ship.a)*15 + (Math.random()-0.5)*5, 3, 0, Math.PI*2);
          ctx.fill();
        }
        
        ship.vx *= 0.99; // Friction
        ship.vy *= 0.99;
        ship.x += ship.vx;
        ship.y += ship.vy;
        wrap(ship);

        // Draw Ship
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(ship.x + Math.cos(ship.a)*15, ship.y + Math.sin(ship.a)*15);
        ctx.lineTo(ship.x + Math.cos(ship.a + 2.5)*10, ship.y + Math.sin(ship.a + 2.5)*10);
        ctx.lineTo(ship.x + Math.cos(ship.a - 2.5)*10, ship.y + Math.sin(ship.a - 2.5)*10);
        ctx.closePath();
        ctx.stroke();

        // Bullets
        ctx.fillStyle = 'var(--accent-warm)';
        for(let i=bullets.length-1; i>=0; i--) {
          let b = bullets[i];
          b.x += b.vx; b.y += b.vy; b.life--;
          wrap(b);
          ctx.beginPath(); ctx.arc(b.x, b.y, 2, 0, Math.PI*2); ctx.fill();
          if(b.life <= 0) bullets.splice(i, 1);
        }

        // Asteroids
        ctx.strokeStyle = '#aaa';
        for(let i=asts.length-1; i>=0; i--) {
          let a = asts[i];
          a.x += a.vx; a.y += a.vy; a.rot += a.rots;
          wrap(a);
          
          ctx.beginPath();
          for(let j=0; j<a.edges; j++) {
             let angle = a.rot + (j/a.edges)*Math.PI*2;
             let r = a.r * (0.8 + Math.sin(j*324)*0.2);
             let hx = a.x + Math.cos(angle)*r;
             let hy = a.y + Math.sin(angle)*r;
             if(j===0) ctx.moveTo(hx, hy); else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.stroke();

          // Ship Hit
          if(Math.hypot(ship.x-a.x, ship.y-a.y) < a.r + ship.r) {
             state = 'gameover';
             sndBoom();
             overlay.style.display = 'flex';
             overlay.innerHTML = `<h2 style="margin-bottom:10px; color:var(--accent-red);">SHIP DESTROYED</h2><p style="margin-bottom:20px;">Score: ${score}</p><button class="cyber-btn" id="ast-start2">Try Again</button>`;
             overlay.querySelector('#ast-start2').addEventListener('click', init);
             return;
          }

          // Bullet Hit
          for(let j=bullets.length-1; j>=0; j--) {
            let b = bullets[j];
            if(Math.hypot(b.x-a.x, b.y-a.y) < a.r) {
              sndBoom();
              score += (a.r > 20 ? 10 : 20);
              scoreEl.textContent = score;
              
              if(a.r > 15) {
                asts.push({x: a.x, y: a.y, vx: a.vx + Math.random()-0.5, vy: a.vy + Math.random()-0.5, r: a.r/2, edges: 6, rot:0, rots: 0.1});
                asts.push({x: a.x, y: a.y, vx: a.vx + Math.random()-0.5, vy: a.vy + Math.random()-0.5, r: a.r/2, edges: 6, rot:0, rots: -0.1});
              }
              asts.splice(i, 1);
              bullets.splice(j, 1);
              break;
            }
          }
        }

        if(asts.length === 0) {
          level++;
          lvlEl.textContent = level;
          spawnAst(4 + level);
        }

        requestAnimationFrame(loop);
      };

      const hk = (e) => { if(!document.body.contains(canvas)) { window.removeEventListener("keydown", hk); return; } keys[e.key] = true; if(e.key===" ") shoot(); }; window.addEventListener("keydown", hk);
      const hku = (e) => { if(!document.body.contains(canvas)) { window.removeEventListener("keyup", hku); return; } keys[e.key] = false; }; window.addEventListener("keyup", hku);
      
      // Mobile touch layout
      canvas.addEventListener('touchstart', e => {
         const rect = canvas.getBoundingClientRect();
         for(let t of e.touches) {
            const tx = t.clientX - rect.left;
            const ty = t.clientY - rect.top;
            if(ty > canvas.height - 100) {
               if(tx < 100) keys['ArrowLeft'] = true;
               else if(tx > canvas.width - 100) keys['ArrowRight'] = true;
            } else if(ty < 100) {
               keys['ArrowUp'] = true;
            } else {
               shoot();
            }
         }
         e.preventDefault();
      });
      canvas.addEventListener('touchend', e => {
         keys['ArrowLeft'] = false; keys['ArrowRight'] = false; keys['ArrowUp'] = false;
      });

      startBtn.addEventListener('click', init);
    }
  }
);
