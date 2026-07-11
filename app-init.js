/* ================================================================
   app-init.js — Bootstrap: runs after all tool files are loaded
   ================================================================ */

/* ---- Theme — runs instantly to prevent flash of wrong theme ---- */
(function () {
  const saved = localStorage.getItem('alltools-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  if (theme === 'light') document.documentElement.setAttribute('data-theme', 'light');
})();


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

    /* 2. Navbar scroll effect */
    setupNavbar();

    /* 3. Theme toggle */
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const html = document.documentElement;
        const isLight = html.getAttribute('data-theme') === 'light';
        if (isLight) {
          html.removeAttribute('data-theme');
          localStorage.setItem('alltools-theme', 'dark');
        } else {
          html.setAttribute('data-theme', 'light');
          localStorage.setItem('alltools-theme', 'light');
        }
        // Animate the button
        themeToggle.style.transform = 'rotate(20deg) scale(0.85)';
        setTimeout(() => { themeToggle.style.transform = ''; }, 220);
      });
    }

    /* 3. Keyboard shortcuts + modal close */
    setupKeyboard();

    /* 4. Search */
    setupSearch();

    /* 5. Render category pills */
    renderCategories();

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

    /* 9. Update tool hash on open */
    const origOpen = window.openTool;
    window.openTool = function (id) {
      history.replaceState(null, '', '#' + id);
      origOpen(id);
    };
    const origClose = window.closeTool;
    window.closeTool = function () {
      history.replaceState(null, '', location.pathname);
      origClose();
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

