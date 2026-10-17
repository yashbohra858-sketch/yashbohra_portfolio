(function () {
  'use strict';

  /* Year */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* Mobile nav */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  function setNav(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  toggle.addEventListener('click', function () { setNav(!nav.classList.contains('open')); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setNav(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) { setNav(false); toggle.focus(); }
  });

  /* Skills */
  var H = 'Hands-on practice', F = 'Foundational familiarity';
  var skills = [
    { n: 'Python', l: H, w: 'A general-purpose programming language, and the main language of data science.',
      h: 'My go-to language for data work. I use it with NumPy, Pandas, scikit-learn and Matplotlib in my coursework and machine-learning practice.' },
    { n: 'NumPy', l: H, w: 'A Python library for fast maths on arrays and matrices. Most other data libraries are built on top of it.',
      h: 'Practised through the numerical side of my data and machine-learning exercises.' },
    { n: 'Pandas', l: H, w: 'A Python library for working with tables of data: loading, cleaning, filtering, grouping and summarising.',
      h: 'Practised on data analysis work, getting messy tables into a shape that can answer a question.' },
    { n: 'scikit-learn', l: H, w: 'A Python library with ready-made tools for machine learning, such as classification, clustering and dimensionality reduction.',
      h: 'Part of my machine-learning practice, alongside my PCA, LDA, K-means and classification exercises.' },
    { n: 'Matplotlib and data visualisation', l: H, w: 'Turning numbers into charts so patterns are visible at a glance.',
      h: 'Practised as part of my data analysis, to look at data before and after modelling.' },
    { n: 'Data analysis', l: H, w: 'Asking a question of a dataset and working out what the numbers actually say.',
      h: 'Practised in coursework and exercises, and it was one of my contributions to the Adappt 3.0 team project.' },
    { n: 'Statistical analysis', l: H, w: 'Using statistics to tell real patterns from noise, and to say how sure you can be.',
      h: 'Practised alongside my data analysis work and machine-learning exercises.' },
    { n: 'Machine-learning fundamentals', l: F, w: 'The core ideas of how models learn from data: training, testing, features, and why a model can fit well and still be wrong.',
      h: 'Foundations I have built up through my degree and through the practical exercises listed in this section.' },
    { n: 'PCA and LDA', l: H, w: 'Two ways to shrink many columns of data into a few. PCA keeps the most variation; LDA keeps what best separates the groups.',
      h: 'Worked through as exercises in my data science coursework.' },
    { n: 'K-means and clustering', l: H, w: 'Letting an algorithm sort data into groups on its own, without being told what the groups are.',
      h: 'Worked through K-means clustering as an exercise in my data science coursework.' },
    { n: 'Classification', l: H, w: 'Teaching a model to put things in categories, such as spam or not spam.',
      h: 'Worked through classification exercises as part of my machine-learning practice.' },
    { n: 'Neural networks', l: H, w: 'Models made of layers of simple connected units that learn patterns from examples.',
      h: 'Worked through artificial neural-network exercises. This is practice at exercise level, not production work.' },
    { n: 'AWS AI services and cloud concepts', l: F, w: 'Amazon\'s cloud tools for AI, plus the networking basics they run on: VPCs, subnets and route tables.',
      h: 'Foundational knowledge, backed by passing the AWS Certified AI Practitioner exam. I have also covered VPCs, subnet associations and route tables.' },
    { n: 'Research and synthesis', l: H, w: 'Finding good information, sorting what matters from what doesn\'t, and turning it into a clear direction for others.',
      h: 'This is my role as Head of Research & Development at Social Conclave: research and agenda development around social and environmental issues. I also did research and problem identification on Adappt 3.0.' },
    { n: 'Team coordination', l: H, w: 'Getting a group of people moving in the same direction, on time.',
      h: 'Coordinating real-world learning opportunities and field visits with NGOs and organisations, and contributing to event planning and execution at Social Conclave.' }
  ];

  var wrap = document.querySelector('.bubbles');
  var els = {
    level: document.getElementById('sp-level'), name: document.getElementById('sp-name'),
    what: document.getElementById('sp-what'), how: document.getElementById('sp-how')
  };
  var buttons = [];
  function select(i) {
    var s = skills[i];
    buttons.forEach(function (b, j) { b.setAttribute('aria-pressed', String(i === j)); });
    els.level.textContent = s.l;
    els.level.className = 'panel-level ' + (s.l === H ? 'is-hands' : 'is-found');
    els.name.textContent = s.n;
    els.what.textContent = s.w;
    els.how.textContent = s.h;
  }
  skills.forEach(function (s, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'bubble ' + (s.l === H ? 'hands' : 'found');
    b.textContent = s.n;
    b.setAttribute('aria-pressed', 'false');
    b.setAttribute('aria-controls', 'skill-panel');
    b.addEventListener('click', function () { select(i); });
    wrap.appendChild(b);
    buttons.push(b);
  });
  select(0);

  /* Lightbox */
  var dlg = document.getElementById('lightbox');
  var img = document.getElementById('lb-img');
  var cap = document.getElementById('lb-cap');
  var lastTrigger = null;
  document.querySelectorAll('[data-lightbox]').forEach(function (t) {
    t.addEventListener('click', function () {
      lastTrigger = t;
      img.src = t.getAttribute('data-lightbox');
      img.alt = t.getAttribute('data-alt') || '';
      cap.textContent = t.getAttribute('data-caption') || '';
      if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
      document.body.classList.add('no-scroll');
    });
  });
  function closeLb() {
    if (typeof dlg.close === 'function') dlg.close(); else dlg.removeAttribute('open');
  }
  dlg.addEventListener('close', function () {
    document.body.classList.remove('no-scroll');
    if (lastTrigger) lastTrigger.focus();
  });
  dlg.querySelector('.lb-close').addEventListener('click', closeLb);
  dlg.addEventListener('click', function (e) { if (e.target === dlg) closeLb(); });
})();
