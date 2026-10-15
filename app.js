(() => {
  const html = document.documentElement;
  const header = document.querySelector('.header');
  const nav = document.getElementById('nav');
  const menuBtn = document.querySelector('.menu-btn');

  const closeMenu = () => {
    nav.classList.remove('open');
    header.classList.remove('menu-open');
    menuBtn.setAttribute('aria-expanded', 'false');
  };

  // Language: ?lang=ar or #ar opens in Arabic; button toggles.
  const setLang = (l) => {
    html.lang = l;
    html.dir = l === 'ar' ? 'rtl' : 'ltr';
    document.title = l === 'ar'
      ? 'خليج هيوستن للمقاولات والنقل | الدوحة، قطر'
      : 'Houstan Gulf Contracting & Transportation Co. | Doha, Qatar';
  };
  const q = new URLSearchParams(location.search).get('lang');
  if (q === 'ar' || location.hash === '#ar') setLang('ar');
  document.getElementById('langBtn').addEventListener('click', () => {
    setLang(html.lang === 'ar' ? 'en' : 'ar');
    closeMenu();
  });

  // Header state
  const onScroll = () => header.classList.toggle('scrolled', scrollY > 40);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    header.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
  addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  // Project filters
  const chips = document.querySelectorAll('.chip');
  const projects = document.querySelectorAll('.proj');
  chips.forEach((c) => c.addEventListener('click', () => {
    chips.forEach((x) => { x.classList.toggle('on', x === c); x.setAttribute('aria-pressed', String(x === c)); });
    const f = c.dataset.filter;
    projects.forEach((p) => {
      const show = f === 'all' || p.dataset.cat === f;
      p.hidden = !show;
      if (show) p.classList.add('in');
    });
  }));

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('in'), (i % 4) * 70);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  document.getElementById('yr').textContent = new Date().getFullYear();
})();
