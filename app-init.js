/* ================================================================
   app-init.js — Bootstrap: runs after all tool files are loaded
   ================================================================ */




(function () {
  'use strict';

  /* ---- Strength helper (shared by password tools) ---- */
  window.calcStrength = function (p) {
    let score = 0;
    if (p.length >= 8)  score += 1;
    if (p.length >= 12) score += 1;
    if (p.length >= 16) score += 1;
    if (/[a-z]/.test(p))          score += 1;
    if (/[A-Z]/.test(p))          score += 1;
    if (/[0-9]/.test(p))          score += 1;
    if (/[^a-zA-Z0-9]/.test(p))   score += 2;
    if (score <= 2) return { pct: 20,  color: '#ef4444',       label: 'Very Weak'   };
    if (score <= 4) return { pct: 40,  color: '#f97316',       label: 'Weak'        };
    if (score <= 5) return { pct: 60,  color: 'var(--yellow)', label: 'Fair'        };
    if (score <= 6) return { pct: 80,  color: 'var(--cyan)',   label: 'Strong'      };
    return              { pct: 100, color: 'var(--emerald)', label: 'Very Strong' };
  };

  /* ---- DOMContentLoaded bootstrap ---- */
  document.addEventListener('DOMContentLoaded', function () {

    /* 1. Particles (no-op in editorial theme) */
    initParticles();
    
    /* 1b. Render Trading Carousel */
    if(window.renderTradingCarousel) window.renderTradingCarousel();

    /* 1c. Floating Meme Stickers */
    window.spawnStickers = function() {
      if(window.innerWidth < 1400) return;
      
      const existing = document.getElementById('sticker-container');
      if(existing) existing.remove();

      const STICKERS = ['🗿', '🐸', '🐕', '💀', '🤡', '👽', '🚀', '💎', '🔥', '🧠'];
      const container = document.createElement('div');
      container.id = 'sticker-container';
      // Use FIXED so it NEVER adds to document scroll height
      container.style.position = 'fixed';
      container.style.top = '0';
      container.style.left = '0';
      container.style.width = '100%';
      container.style.height = '100%';
      container.style.pointerEvents = 'none';
      container.style.overflow = 'hidden';
      container.style.zIndex = '0';
      document.body.prepend(container);
      
      // Distribute 40 stickers across the full viewport height on each side
      for(let i=0; i<40; i++) { 
        const s = document.createElement('div');
        s.textContent = STICKERS[Math.floor(Math.random() * STICKERS.length)];
        s.className = 'meme-sticker';
        
        const isLeft = i % 2 === 0;
        const x = isLeft ? (Math.random() * 8 + 1) : (Math.random() * 8 + 86);
        // Use vh-based positioning so they spread evenly across visible viewport
        const yVh = Math.random() * 95 + 2;
        
        s.style.left = x + 'vw';
        s.style.top = yVh + 'vh';
        s.style.animationDelay = (Math.random() * 5) + 's';
        
        let rot = Math.random() * 60 - 30;
        s.style.transform = `rotate(${rot}deg)`;
        s.style.pointerEvents = 'auto';
        
        s.onclick = () => {
          if(window.playFunnySound) window.playFunnySound();
          rot += 360;
          s.style.transform = `rotate(${rot}deg) scale(1.5)`;
          setTimeout(() => s.style.transform = `rotate(${rot}deg) scale(1)`, 300);
        };
        container.appendChild(s);
      }
    };

    // Wait until everything is fully rendered before calculating height
    window.addEventListener('load', () => {
      setTimeout(window.spawnStickers, 500);
    });

    window.addEventListener('resize', () => {
      if(window.innerWidth >= 1400) {
         clearTimeout(window._resizeStickerTimer);
         window._resizeStickerTimer = setTimeout(window.spawnStickers, 300);
      } else {
         const existing = document.getElementById('sticker-container');
         if(existing) existing.remove();
      }
    });

    /* 2. Navbar scroll effect */
    setupNavbar();

    
    /* 4. Surprise Me — open a random tool */
    const surpriseBtn = document.getElementById('surprise-btn');
    surpriseBtn?.addEventListener('click', () => {
      const tools = window.TOOLS;
      const random = tools[Math.floor(Math.random() * tools.length)];
      surpriseBtn.textContent = '🎲 Surprise Me';
      surpriseBtn.style.transform = 'rotate(-8deg) scale(0.95)';
      setTimeout(() => {
        surpriseBtn.style.transform = '';
        surpriseBtn.textContent = '🎲 Surprise Me';
        openTool(random.id);
      }, 180);
    });

    /* 5. Recently Used — stored in localStorage, max 8 */
    const RECENT_KEY = 'alltools-recent';
    function getRecent() {
      try { return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]'); } catch { return []; }
    }
    function addRecent(id) {
      let list = getRecent().filter(i => i !== id);
      list.unshift(id);
      list = list.slice(0, 8);
      localStorage.setItem(RECENT_KEY, JSON.stringify(list));
      renderRecent();
    }
    function renderRecent() {
      const section = document.getElementById('recent-section');
      const container = document.getElementById('recent-pills');
      if (!section || !container) return;
      const list = getRecent();
      if (list.length === 0) { section.style.display = 'none'; return; }
      section.style.display = 'block';
      container.innerHTML = list.map(id => {
        const tool = window.TOOLS.find(t => t.id === id);
        if (!tool) return '';
        return `<button class="recent-pill" data-id="${tool.id}">${tool.icon} ${tool.name}</button>`;
      }).join('');
      container.querySelectorAll('.recent-pill').forEach(btn => {
        btn.addEventListener('click', () => openTool(btn.dataset.id));
      });
    }

    document.getElementById('recent-clear')?.addEventListener('click', () => {
      localStorage.removeItem(RECENT_KEY);
      renderRecent();
    });

    // 5.5 New Tools
    function renderNewTools() {
      const container = document.getElementById('new-pills');
      if (!container) return;
      // Get the last 15 tools added to the window.TOOLS array
      const newTools = window.TOOLS.slice(-15).reverse();
      container.innerHTML = newTools.map(tool => {
        return `<button class="recent-pill" style="border-color:var(--accent-warm); background:rgba(200,184,154,0.05);" data-id="${tool.id}">${tool.icon} ${tool.name}</button>`;
      }).join('');
      container.querySelectorAll('.recent-pill').forEach(btn => {
        btn.addEventListener('click', () => openTool(btn.dataset.id));
      });
    }

    // Hook into openTool - (merged with deep-link wrapper below)

    renderRecent(); // show on load if any exist
    renderNewTools(); // show newest tools

    /* 3. Keyboard shortcuts + modal close */
    setupKeyboard();

    /* 4. Search */
    setupSearch();

    /* 5. Render category pills */
    renderCategories();

    /* 5b. Make categories draggable on desktop */
    const catContainer = document.getElementById('categories');
    if (catContainer) {
      let isDown = false;
      let startX;
      let scrollLeft;
      let didMove = false;

      catContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        didMove = false;
        catContainer.style.cursor = 'grabbing';
        startX = e.pageX - catContainer.offsetLeft;
        scrollLeft = catContainer.scrollLeft;
      });
      catContainer.addEventListener('mouseleave', () => {
        isDown = false;
        catContainer.style.cursor = '';
      });
      catContainer.addEventListener('mouseup', () => {
        isDown = false;
        catContainer.style.cursor = '';
      });
      catContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        const x = e.pageX - catContainer.offsetLeft;
        const walk = (x - startX);
        if (Math.abs(walk) > 5) didMove = true; // threshold to distinguish click from drag
        if (didMove) {
          e.preventDefault();
          catContainer.scrollLeft = scrollLeft - walk * 1.5;
        }
      });
      // Prevent button click if the user was dragging
      catContainer.addEventListener('click', (e) => {
        if (didMove) {
          e.preventDefault();
          e.stopPropagation();
        }
      }, true);
    }

    /* 6. Render all tool cards initially */
    filterAndRender();

    /* 7. Update live tool count badges */
    const count = window.TOOLS.length;
    document.querySelectorAll('.tool-count-badge').forEach(el => {
      el.textContent = count + '+ Tools';
    });
    document.querySelectorAll('#nav-search').forEach(el => {
      el.placeholder = 'Search ' + count + '+ tools...';
    });

    /* 8. Handle URL hash deep-linking  e.g. #json-formatter */
    const hash = location.hash.replace('#', '');
    if (hash && window.TOOLS.find(t => t.id === hash)) {
      setTimeout(() => openTool(hash), 400);
    }

    /* 9. Single unified openTool wrapper: recent tracking + hash update */
    const _baseOpen = window.openTool;
    window.openTool = function (id) {
      addRecent(id);
      history.replaceState(null, '', '#' + id);
      if (_baseOpen) _baseOpen(id);
    };
    const origClose = window.closeTool;
    window.closeTool = function () {
      history.replaceState(null, '', location.pathname);
      if (origClose) origClose();
    };

    /* 10. Lazy-scroll fade-in for tool cards */
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.08 });

      // Re-observe whenever grid is updated
      const grid = document.getElementById('tools-grid');
      if (grid) {
        const mo = new MutationObserver(() => {
          grid.querySelectorAll('.tool-card:not([data-observed])').forEach(card => {
            card.dataset.observed = '1';
            io.observe(card);
          });
        });
        mo.observe(grid, { childList: true });
      }
    }

    console.log(`✅ AllTools loaded — ${count} tools across ${CATEGORIES.length - 1} categories`);

    /* ---- Mobile: Hamburger menu ---- */
    const hamburger   = document.getElementById('hamburger');
    const mobileMenu  = document.getElementById('mobile-menu');

    function closeMenu() {
      hamburger?.classList.remove('open');
      mobileMenu?.classList.remove('open');
      hamburger?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    hamburger?.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      if (isOpen) {
        closeMenu();
      } else {
        mobileMenu.classList.add('open');
        hamburger.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
      }
    });

    // Mobile menu category links
    const catMap = {
      'mm-all': 'all', 'mm-text': 'text', 'mm-dev': 'developer',
      'mm-math': 'math', 'mm-image': 'image', 'mm-color': 'color',
      'mm-security': 'security', 'mm-datetime': 'datetime',
      'mm-converter': 'converter', 'mm-web': 'web'
    };
    Object.entries(catMap).forEach(([btnId, cat]) => {
      document.getElementById(btnId)?.addEventListener('click', () => {
        window.state.category = cat;
        window.state.query = '';
        filterAndRender();
        updateCategoryUI();
        closeMenu();
        document.getElementById('main')?.scrollIntoView({ behavior: 'smooth' });
      });
    });

    /* ---- Mobile: Full-screen search overlay ---- */
    const mobileSearchBtn     = document.getElementById('mobile-search-btn');
    const mobileSearchOverlay = document.getElementById('mobile-search-overlay');
    const mobileSearchClose   = document.getElementById('mobile-search-close');
    const mobileSearchInput   = document.getElementById('mobile-search-input');
    const mobileSearchResults = document.getElementById('mobile-search-results');

    function openMobileSearch() {
      mobileSearchOverlay?.classList.add('open');
      document.body.style.overflow = 'hidden';
      setTimeout(() => mobileSearchInput?.focus(), 80);
      renderMobileResults('');
    }

    function closeMobileSearch() {
      mobileSearchOverlay?.classList.remove('open');
      document.body.style.overflow = '';
      if (mobileSearchInput) mobileSearchInput.value = '';
    }

    mobileSearchBtn?.addEventListener('click', openMobileSearch);
    mobileSearchClose?.addEventListener('click', closeMobileSearch);

    mobileSearchInput?.addEventListener('input', function () {
      renderMobileResults(this.value.trim());
    });

    function renderMobileResults(query) {
      if (!mobileSearchResults) return;
      let tools = window.TOOLS;
      if (query) {
        const q = query.toLowerCase();
        tools = tools.filter(t =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          (t.tags || []).some(tag => tag.toLowerCase().includes(q))
        );
      }
      if (!tools.length) {
        mobileSearchResults.innerHTML = `<div class="mobile-search-empty">No tools found for "<strong>${query}</strong>"</div>`;
        return;
      }
      const limit = query ? tools : tools.slice(0, 30); // show all on search, top 30 by default
      mobileSearchResults.innerHTML = limit.map(t => `
        <div class="mobile-search-result-item" data-tool-id="${t.id}">
          <div class="mobile-search-result-icon">${t.icon}</div>
          <div>
            <div class="mobile-search-result-name">${t.name}</div>
            <div class="mobile-search-result-cat">${t.category}</div>
          </div>
        </div>
      `).join('');
      mobileSearchResults.querySelectorAll('.mobile-search-result-item').forEach(el => {
        el.addEventListener('click', () => {
          closeMobileSearch();
          setTimeout(() => openTool(el.dataset.toolId), 100);
        });
      });
    }

    // Close mobile search on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeMobileSearch();
        closeMenu();
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', e => {
      if (mobileMenu?.classList.contains('open') &&
          !mobileMenu.contains(e.target) &&
          !hamburger?.contains(e.target)) {
        closeMenu();
      }
    });

  });

})();

