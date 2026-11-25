(() => {
  'use strict';

  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const metaTheme = document.querySelector('meta[name="theme-color"]');

  const readTheme = () => {
    try { return localStorage.getItem('theme'); } catch { return null; }
  };
  const applyTheme = (theme, persist = false) => {
    const isDark = theme === 'dark';
    root.dataset.theme = isDark ? 'dark' : 'light';
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', String(isDark));
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      themeToggle.innerHTML = `<i class="fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}" aria-hidden="true"></i>`;
    }
    if (metaTheme) metaTheme.content = isDark ? '#000000' : '#ffffff';
    if (persist) {
      try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch { /* Storage can be unavailable in private contexts. */ }
    }
  };
  const savedTheme = readTheme();
  applyTheme(savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  themeToggle?.addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true));

  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const closeMenu = () => {
    navLinks?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open navigation');
    if (menuToggle) menuToggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
  };
  menuToggle?.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menuToggle.innerHTML = `<i class="fa-solid ${open ? 'fa-xmark' : 'fa-bars'}" aria-hidden="true"></i>`;
    navLinks?.classList.toggle('open', open);
  });
  navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

  const navAnchors = [...document.querySelectorAll('.nav-links a')];
  const sections = [...document.querySelectorAll('main section[id]')];
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navAnchors.forEach(link => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-25% 0px -65% 0px', threshold: 0 });
    sections.forEach(section => sectionObserver.observe(section));
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    }), { threshold: 0.1, rootMargin: '0px 0px -25px 0px' });
    revealItems.forEach(item => revealObserver.observe(item));
  } else revealItems.forEach(item => item.classList.add('visible'));

  const filters = document.querySelectorAll('.filter-button');
  const projectCards = document.querySelectorAll('.project-card');
  filters.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filters.forEach(option => {
      const selected = option === button;
      option.classList.toggle('active', selected);
      option.setAttribute('aria-pressed', String(selected));
    });
    projectCards.forEach(card => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  }));

  const focusWords = ['Backend Engineering', 'Full Stack Development', 'Frontend Development'];
  const typedText = document.querySelector('.typed-text');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (typedText && !reduceMotion) {
    let wordIndex = 0;
    let position = focusWords[0].length;
    let deleting = true;
    const typeNext = () => {
      const word = focusWords[wordIndex];
      position += deleting ? -1 : 1;
      typedText.textContent = word.slice(0, position);
      let delay = deleting ? 42 : 76;
      if (position <= 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % focusWords.length;
        delay = 280;
      } else if (position >= focusWords[wordIndex].length) {
        deleting = true;
        delay = 1500;
      }
      window.setTimeout(typeNext, delay);
    };
    window.setTimeout(typeNext, 1500);
  }

  document.getElementById('year').textContent = String(new Date().getFullYear());

  const contactForm = document.getElementById('whatsapp-form');
  contactForm?.addEventListener('submit', event => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const subject = document.getElementById('form-subject').value.trim();
    const message = document.getElementById('form-message').value.trim();
    const body = [`Hello Ilyas, my name is ${name}.`, `Email: ${email}`, `Subject: ${subject}`, '', message].join('\n');
    const url = `https://wa.me/2348137250625?text=${encodeURIComponent(body)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    contactForm.reset();
  });
})();
