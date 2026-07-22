/* ================================================================
   UNIQUE FEATURES ENGINE — Performance Optimized
   1. Secret CRT Terminal Mode (Konami Code)
   2. Living Particle Background (GPU-optimised canvas)
   3. RAGE MODE
   4. Cursor Trail (canvas-based, zero DOM thrashing)
   5. Easter Egg: Secret Clock
   6. Hero Glitch Text
   ================================================================ */

(function() {
  'use strict';

  /* ============================================================
     1. LIVING PARTICLE BACKGROUND
     Optimised: 35 particles (was 80), skip connection lines
     when tab is hidden, use squared distance (no sqrt)
     ============================================================ */
  const canvas = document.createElement('canvas');
  canvas.id = 'particle-bg';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:-1;opacity:0.3;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d', { alpha: true });

  let W = window.innerWidth, H = window.innerHeight;
  let mouseX = -999, mouseY = -999;
  let rage = false;
  let hidden = false;

  canvas.width = W; canvas.height = H;

  // Throttle resize to avoid thrashing
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }, 200);
  });

  // Throttle mousemove — only update every 30ms
  let lastMouse = 0;
  document.addEventListener('mousemove', e => {
    const now = Date.now();
    if (now - lastMouse < 30) return;
    lastMouse = now;
    mouseX = e.clientX; mouseY = e.clientY;
  });

  // Pause animation when tab not visible (huge perf win)
  document.addEventListener('visibilitychange', () => { hidden = document.hidden; });

  // Reduced from 80 → 35 particles
  const PARTICLE_COUNT = 35;
  const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    size: Math.random() * 2 + 1,
    alpha: Math.random() * 0.4 + 0.15
  }));

  // Pre-cache color strings to avoid string creation per frame
  const COLORS = {
    normal: '204,255,0',
    crt:    '0,255,80',
    rage:   '255,30,30'
  };

  // Connection threshold squared (avoid sqrt in inner loop)
  const CONNECT_DIST_SQ = 90 * 90; // was 100px, now using squared
  const MOUSE_DIST_SQ   = 110 * 110;

  let frameCount = 0;
  function animateParticles() {
    if (hidden) { requestAnimationFrame(animateParticles); return; }

    frameCount++;
    ctx.clearRect(0, 0, W, H);

    const color = rage ? COLORS.rage
                : document.body.classList.contains('crt-mode') ? COLORS.crt
                : COLORS.normal;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particles[i];

      // Mouse repulsion (squared distance, no sqrt)
      const dxM = p.x - mouseX, dyM = p.y - mouseY;
      const distMSq = dxM * dxM + dyM * dyM;
      if (distMSq < MOUSE_DIST_SQ && distMSq > 0) {
        const distM = Math.sqrt(distMSq); // sqrt only when inside radius
        const force = (110 - distM) / 110;
        p.vx += (dxM / distM) * force * (rage ? 0.6 : 0.25);
        p.vy += (dyM / distM) * force * (rage ? 0.6 : 0.25);
      }

      p.vx *= 0.96; p.vy *= 0.96;
      if (rage) { p.vx += (Math.random() - 0.5) * 0.3; p.vy += (Math.random() - 0.5) * 0.3; }

      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

      // Draw dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color},${p.alpha})`;
      ctx.fill();
    }

    // Connection lines — only recalculate every 2 frames to halve cost
    if (frameCount % 2 === 0) {
      ctx.lineWidth = 0.5;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dSq = dx * dx + dy * dy;
          if (dSq < CONNECT_DIST_SQ) {
            const alpha = (1 - dSq / CONNECT_DIST_SQ) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${color},${alpha})`;
            ctx.stroke();
          }
        }
      }
    }

    requestAnimationFrame(animateParticles);
  }
  animateParticles();


  /* ============================================================
     2. CURSOR TRAIL — Canvas-based (zero DOM thrashing)
     ============================================================ */
  const trailCanvas = document.createElement('canvas');
  trailCanvas.id = 'trail-canvas';
  trailCanvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9998;';
  document.body.appendChild(trailCanvas);
  const tCtx = trailCanvas.getContext('2d');
  trailCanvas.width = W; trailCanvas.height = H;
  window.addEventListener('resize', () => {
    setTimeout(() => { trailCanvas.width = window.innerWidth; trailCanvas.height = window.innerHeight; }, 200);
  });

  const trailColors = ['#ccff00','#ff4500','#00ffff','#ff00ff','#ffff00'];
  const trail = [];
  const MAX_TRAIL = 18; // max particles in trail at once

  // Throttle trail to every 30ms
  let lastTrail = 0;
  document.addEventListener('mousemove', e => {
    const now = Date.now();
    if (now - lastTrail < 30) return;
    lastTrail = now;
    trail.push({
      x: e.clientX, y: e.clientY,
      size: Math.random() * 7 + 3,
      color: rage ? '#ff0000' : trailColors[Math.floor(Math.random() * trailColors.length)],
      life: 1.0,
      rot: Math.random() * Math.PI * 2
    });
    if (trail.length > MAX_TRAIL) trail.shift();
  });

  function animateTrail() {
    if (hidden) { requestAnimationFrame(animateTrail); return; }
    tCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
    for (let i = trail.length - 1; i >= 0; i--) {
      const t = trail[i];
      t.life -= 0.08;
      t.rot += 0.15;
      if (t.life <= 0) { trail.splice(i, 1); continue; }
      tCtx.save();
      tCtx.globalAlpha = t.life;
      tCtx.translate(t.x, t.y);
      tCtx.rotate(t.rot);
      tCtx.fillStyle = t.color;
      // Diamond shape
      const s = t.size * t.life;
      tCtx.beginPath();
      tCtx.moveTo(0, -s); tCtx.lineTo(s, 0);
      tCtx.lineTo(0, s); tCtx.lineTo(-s, 0);
      tCtx.closePath();
      tCtx.fill();
      tCtx.restore();
    }
    requestAnimationFrame(animateTrail);
  }
  animateTrail();


  /* ============================================================
     3. CRT TERMINAL MODE (Konami Code: ↑↑↓↓←→←→BA)
     ============================================================ */
  const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let konamiIdx = 0;

  document.addEventListener('keydown', e => {
    if (e.key === KONAMI[konamiIdx]) {
      konamiIdx++;
      if (konamiIdx === KONAMI.length) { konamiIdx = 0; toggleCRTMode(); }
    } else { konamiIdx = 0; }
  });

  function toggleCRTMode() {
    const body = document.body;
    if (body.classList.contains('crt-mode')) {
      body.classList.remove('crt-mode');
      document.getElementById('crt-overlay')?.remove();
      if (window.playFunnySound) window.playFunnySound();
    } else {
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
    boot.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;background:#000;color:#00ff50;font-family:'JetBrains Mono',monospace;font-size:1.1rem;z-index:99999;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;padding:60px;box-sizing:border-box;`;
    document.body.appendChild(boot);

    let lineIdx = 0;
    function typeLine() {
      if (lineIdx >= lines.length) {
        setTimeout(() => {
          boot.remove();
          const overlay = document.createElement('div');
          overlay.id = 'crt-overlay';
          overlay.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9997;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.12) 2px,rgba(0,0,0,0.12) 4px);animation:crt-flicker 0.15s infinite;`;
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
        if (charIdx < text.length) { p.textContent += text[charIdx++]; setTimeout(typeChar, 18); }
        else { lineIdx++; setTimeout(typeLine, 80); }
      };
      typeChar();
    }
    typeLine();
  }


  /* ============================================================
     4. RAGE MODE
     ============================================================ */
  window.activateRageMode = function() {
    rage = !rage;
    document.body.classList.toggle('rage-mode', rage);
    canvas.style.opacity = rage ? '0.6' : '0.3';
    if (rage) {
      if (window.playFunnySound) window.playFunnySound();
      const toast = document.createElement('div');
      toast.id = 'rage-toast';
      toast.textContent = '🔥 RAGE MODE ACTIVATED 🔥';
      toast.style.cssText = `position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#ff0000;color:#fff;font-family:var(--font-display);font-size:2rem;font-weight:900;text-transform:uppercase;padding:20px 40px;border:4px solid #fff;z-index:99999;animation:rage-toast-anim 0.6s forwards;letter-spacing:5px;text-shadow:0 0 20px #ff8800;`;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2000);
      document.querySelectorAll('.meme-sticker').forEach(s => { s.style.animation = `rage-spin ${0.2 + Math.random() * 0.3}s linear infinite`; });
    } else {
      document.querySelectorAll('.meme-sticker').forEach(s => { s.style.animation = 'float-sticker 6s ease-in-out infinite'; });
    }
  };

  let logoClicks = 0, logoTimer;
  document.querySelector('.logo')?.addEventListener('click', e => {
    logoClicks++;
    clearTimeout(logoTimer);
    logoTimer = setTimeout(() => logoClicks = 0, 1500);
    if (logoClicks >= 5) {
      e.preventDefault(); // Only block navigation when triggering rage mode
      logoClicks = 0;
      window.activateRageMode();
    }
    // Otherwise: let the link navigate normally to index.html
  });


  /* ============================================================
     5. SECRET CLOCK: Type "time" anywhere
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
      clock.style.cssText = `position:fixed;bottom:30px;right:30px;z-index:9999;background:rgba(0,0,0,0.9);border:2px solid var(--accent);padding:15px 25px;font-family:var(--font-mono);font-size:2.5rem;color:var(--accent);text-shadow:0 0 10px var(--accent);box-shadow:0 0 20px rgba(204,255,0,0.3);cursor:pointer;letter-spacing:4px;`;
      clock.title = 'Click to close';
      clock.onclick = () => clock.remove();
      document.body.appendChild(clock);
      (function tick() {
        if (!document.getElementById('secret-clock')) return;
        clock.textContent = new Date().toLocaleTimeString('en-US', { hour12: false });
        setTimeout(tick, 1000);
      })();
    }
  });


  /* ============================================================
     6. HERO GLITCH TEXT — throttled with setInterval
     ============================================================ */
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    setInterval(() => {
      if (Math.random() > 0.94) {
        heroTitle.style.cssText += `;text-shadow:${(Math.random()*6-3).toFixed(1)}px 0 #ff4500,${(Math.random()*-6+3).toFixed(1)}px 0 #00ffff;letter-spacing:${(Math.random()*3-1).toFixed(1)}px`;
        setTimeout(() => { heroTitle.style.textShadow = ''; heroTitle.style.letterSpacing = ''; }, 80);
      }
    }, 1500); // Was 1000ms, now 1500ms — less frequent
  }

})();
