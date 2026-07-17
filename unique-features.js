/* ================================================================
   UNIQUE FEATURES ENGINE
   1. Secret CRT Terminal Mode (Konami Code)
   2. Living Particle Background
   3. RAGE MODE
   4. Cursor Trail Glitch Pixels
   5. Easter Egg: Secret Clock
   ================================================================ */

(function() {
  'use strict';

  /* ============================================================
     1. LIVING PARTICLE BACKGROUND (Canvas)
     ============================================================ */
  const canvas = document.createElement('canvas');
  canvas.id = 'particle-bg';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:-1;opacity:0.35;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let W = window.innerWidth, H = window.innerHeight;
  let mouseX = W / 2, mouseY = H / 2;
  let rage = false;

  canvas.width = W; canvas.height = H;
  window.addEventListener('resize', () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });
  document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

  const PARTICLE_COUNT = 80;
  const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    size: Math.random() * 2 + 1,
    alpha: Math.random() * 0.5 + 0.2
  }));

  function animateParticles() {
    ctx.clearRect(0, 0, W, H);
    const color = rage ? '255,30,30' : (document.body.classList.contains('crt-mode') ? '0,255,80' : '204,255,0');

    particles.forEach(p => {
      // Mouse repulsion
      const dx = p.x - mouseX, dy = p.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        p.vx += (dx / dist) * force * (rage ? 0.8 : 0.3);
        p.vy += (dy / dist) * force * (rage ? 0.8 : 0.3);
      }

      // Velocity dampening
      p.vx *= rage ? 0.98 : 0.96;
      p.vy *= rage ? 0.98 : 0.96;

      // Add slight random drift
      if (rage) {
        p.vx += (Math.random() - 0.5) * 0.4;
        p.vy += (Math.random() - 0.5) * 0.4;
      }

      p.x += p.vx; p.y += p.vy;

      // Wrap around edges
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${p.alpha})`;
      ctx.fill();
    });

    // Draw connecting lines between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${color}, ${(1 - d / 100) * 0.15})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();


  /* ============================================================
     2. CURSOR TRAIL (Glitch Pixels)
     ============================================================ */
  const trailColors = ['#ccff00', '#ff4500', '#00ffff', '#ff00ff', '#ffff00'];
  document.addEventListener('mousemove', e => {
    if (document.body.classList.contains('crt-mode')) return; // disable in CRT mode
    const dot = document.createElement('div');
    const size = Math.random() * 8 + 3;
    dot.style.cssText = `
      position:fixed; pointer-events:none; z-index:9999;
      width:${size}px; height:${size}px;
      background:${rage ? '#ff0000' : trailColors[Math.floor(Math.random() * trailColors.length)]};
      left:${e.clientX - size/2}px; top:${e.clientY - size/2}px;
      clip-path:polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
      transform:rotate(${Math.random()*360}deg);
      opacity:1; transition:opacity 0.4s, transform 0.4s;
    `;
    document.body.appendChild(dot);
    requestAnimationFrame(() => {
      dot.style.opacity = '0';
      dot.style.transform = `rotate(${Math.random()*720}deg) scale(0)`;
    });
    setTimeout(() => dot.remove(), 450);
  });


  /* ============================================================
     3. CRT TERMINAL MODE (Konami Code: ↑↑↓↓←→←→BA)
     ============================================================ */
  const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let konamiIdx = 0;

  document.addEventListener('keydown', e => {
    if (e.key === KONAMI[konamiIdx]) {
      konamiIdx++;
      if (konamiIdx === KONAMI.length) {
        konamiIdx = 0;
        toggleCRTMode();
      }
    } else {
      konamiIdx = 0;
    }
  });

  function toggleCRTMode() {
    const body = document.body;
    if (body.classList.contains('crt-mode')) {
      // EXIT
      body.classList.remove('crt-mode');
      const overlay = document.getElementById('crt-overlay');
      if (overlay) overlay.remove();
      if (window.playFunnySound) window.playFunnySound();
    } else {
      // ENTER — show boot sequence first
      showCRTBoot(() => body.classList.add('crt-mode'));
    }
  }

  function showCRTBoot(callback) {
    const boot = document.createElement('div');
    boot.id = 'crt-boot';
    const lines = [
      'ALLTOOLS OS v1.0 — SYSTEM BOOT...',
      'Loading kernel modules... [OK]',
      'Mounting filesystem... [OK]',
      'Starting tool registry... 512 tools indexed',
      'Initializing quantum crypto engine... [OK]',
      'Connecting to cyberspace... [OK]',
      'WARNING: UNAUTHORIZED TERMINAL ACCESS DETECTED',
      'Overriding security protocols...',
      '> ACCESS GRANTED. WELCOME TO THE MATRIX.',
      '',
      '[ PRESS KONAMI CODE AGAIN TO EXIT ]'
    ];
    boot.style.cssText = `
      position:fixed; top:0; left:0; width:100%; height:100%;
      background:#000; color:#00ff50; font-family:'JetBrains Mono',monospace;
      font-size:1.1rem; z-index:99999; display:flex; flex-direction:column;
      justify-content:center; align-items:flex-start; padding:60px;
      box-sizing:border-box;
    `;
    document.body.appendChild(boot);

    let lineIdx = 0;
    function typeLine() {
      if (lineIdx >= lines.length) {
        setTimeout(() => {
          boot.remove();
          // Inject CRT scanline overlay
          const overlay = document.createElement('div');
          overlay.id = 'crt-overlay';
          overlay.style.cssText = `
            position:fixed; top:0; left:0; width:100%; height:100%;
            pointer-events:none; z-index:9998;
            background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px);
            animation: crt-flicker 0.15s infinite;
          `;
          document.body.appendChild(overlay);
          callback();
        }, 800);
        return;
      }
      const p = document.createElement('p');
      p.style.margin = '3px 0';
      p.textContent = '';
      boot.appendChild(p);

      const text = lines[lineIdx];
      let charIdx = 0;
      const typeChar = () => {
        if (charIdx < text.length) {
          p.textContent += text[charIdx++];
          setTimeout(typeChar, 18);
        } else {
          lineIdx++;
          setTimeout(typeLine, 80);
        }
      };
      typeChar();
    }
    typeLine();
  }


  /* ============================================================
     4. RAGE MODE
     ============================================================ */
  window.activateRageMode = function() {
    if (rage) {
      // Exit rage mode
      rage = false;
      document.body.classList.remove('rage-mode');
      document.getElementById('rage-toast')?.remove();
      canvas.style.opacity = '0.35';
      // Settle stickers
      document.querySelectorAll('.meme-sticker').forEach(s => {
        s.style.animation = 'float-sticker 6s ease-in-out infinite';
      });
      return;
    }

    rage = true;
    document.body.classList.add('rage-mode');
    canvas.style.opacity = '0.6';

    // Play meme sound
    if (window.playFunnySound) window.playFunnySound();

    // Toast notification
    const toast = document.createElement('div');
    toast.id = 'rage-toast';
    toast.textContent = '🔥 RAGE MODE ACTIVATED 🔥';
    toast.style.cssText = `
      position:fixed; top:50%; left:50%; transform:translate(-50%,-50%);
      background:#ff0000; color:#fff; font-family:var(--font-display);
      font-size:2rem; font-weight:900; text-transform:uppercase;
      padding:20px 40px; border:4px solid #fff; z-index:99999;
      animation: rage-toast-anim 0.6s forwards;
      letter-spacing:5px; text-shadow:0 0 20px #ff8800;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);

    // Make all stickers go crazy
    document.querySelectorAll('.meme-sticker').forEach((s, i) => {
      s.style.animation = `rage-spin ${0.2 + Math.random() * 0.3}s linear infinite`;
    });
  };

  // Secret: Click logo 5 times fast to activate rage mode
  let logoClicks = 0, logoTimer;
  document.querySelector('.logo')?.addEventListener('click', e => {
    e.preventDefault();
    logoClicks++;
    clearTimeout(logoTimer);
    logoTimer = setTimeout(() => logoClicks = 0, 1500);
    if (logoClicks >= 5) {
      logoClicks = 0;
      window.activateRageMode();
    }
  });


  /* ============================================================
     5. SECRET CLOCK: Type "time" anywhere to show a floating neon clock
     ============================================================ */
  let typedBuffer = '';
  document.addEventListener('keypress', e => {
    typedBuffer += e.key.toLowerCase();
    if (typedBuffer.length > 6) typedBuffer = typedBuffer.slice(-6);
    if (typedBuffer.endsWith('time')) {
      typedBuffer = '';
      const existing = document.getElementById('secret-clock');
      if (existing) { existing.remove(); return; }
      const clock = document.createElement('div');
      clock.id = 'secret-clock';
      clock.style.cssText = `
        position:fixed; bottom:30px; right:30px; z-index:9999;
        background:rgba(0,0,0,0.9); border:2px solid var(--accent);
        padding:15px 25px; font-family:var(--font-mono); font-size:2.5rem;
        color:var(--accent); text-shadow:0 0 10px var(--accent);
        box-shadow:0 0 20px rgba(204,255,0,0.3);
        cursor:pointer; letter-spacing:4px;
      `;
      clock.title = 'Click to close';
      clock.onclick = () => clock.remove();
      document.body.appendChild(clock);
      (function tick() {
        if (!document.getElementById('secret-clock')) return;
        const now = new Date();
        clock.textContent = now.toLocaleTimeString('en-US', { hour12: false });
        setTimeout(tick, 1000);
      })();
    }
  });


  /* ============================================================
     6. GLITCH TEXT on hero title (random glitch frames)
     ============================================================ */
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    setInterval(() => {
      if (Math.random() > 0.95) { // 5% chance every interval
        heroTitle.style.textShadow = `${Math.random()*6-3}px 0 #ff4500, ${Math.random()*-6+3}px 0 #00ffff`;
        heroTitle.style.letterSpacing = (Math.random() * 3 - 1) + 'px';
        setTimeout(() => {
          heroTitle.style.textShadow = '';
          heroTitle.style.letterSpacing = '';
        }, 80);
      }
    }, 1000);
  }

})();
