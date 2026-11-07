(function () {
  var root = document.documentElement;
  var still = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Header gets a solid, blurred background after scrolling */
  var hd = document.querySelector('header');
  if (hd) {
    var onScroll = function () { hd.classList.toggle('scrolled', window.scrollY > 12); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  /* Fade-up on scroll for sections and cards */
  if ('IntersectionObserver' in window) {
    root.classList.add('js');
    var sel = '.sec-head, .division, .svc, .facts li, .about .text p, .steps li, .feat > div, .shots figure, .faq details, .contact > *, .marquee';
    var els = Array.prototype.slice.call(document.querySelectorAll(sel)).filter(function (el) { return !el.closest('.hero'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target, sibs = Array.prototype.filter.call(el.parentNode.children, function (s) { return s.classList.contains('reveal'); });
        el.style.transitionDelay = Math.min(sibs.indexOf(el), 5) * 90 + 'ms';
        el.classList.add('in'); io.unobserve(el);
        setTimeout(function () { el.style.transitionDelay = ''; }, 1400);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
  }

  /* Hero slider: rotating lines with progress dots */
  var rot = document.querySelector('.rotator');
  if (rot) {
    var items = rot.children, dots = document.querySelectorAll('.slide-dots button'), i = 0, ms = 3600, timer;
    root.style.setProperty('--slide-ms', ms + 'ms');
    var show = function (n) {
      items[i].classList.remove('on'); items[i].classList.add('out');
      var old = items[i]; setTimeout(function () { old.classList.remove('out'); }, 650);
      if (dots[i]) dots[i].classList.remove('on');
      i = n % items.length;
      items[i].classList.add('on');
      if (dots[i]) { dots[i].classList.remove('on'); void dots[i].offsetWidth; dots[i].classList.add('on'); }
    };
    var start = function () { clearInterval(timer); if (!still) timer = setInterval(function () { show(i + 1); }, ms); };
    Array.prototype.forEach.call(dots, function (d, n) { d.addEventListener('click', function () { if (n !== i) show(n); start(); }); });
    document.addEventListener('visibilitychange', function () { if (document.hidden) clearInterval(timer); else start(); });
    start();
  }
})();
