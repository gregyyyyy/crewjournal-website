// Language: German for German-language browsers, English for everyone else. The choice is remembered.
(function () {
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem('cj-lang'); } catch (e) { /* storage blocked */ }
  var lang = saved || ((navigator.language || 'en').toLowerCase().indexOf('de') === 0 ? 'de' : 'en');
  setLang(lang);

  function setLang(l) {
    root.setAttribute('data-lang', l);
    root.setAttribute('lang', l);
    var title = document.querySelector('meta[name="title-' + l + '"]');
    if (title) document.title = title.content;
    var btns = document.querySelectorAll('.lang button');
    for (var i = 0; i < btns.length; i++) btns[i].setAttribute('aria-pressed', btns[i].getAttribute('data-l') === l ? 'true' : 'false');
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.lang button');
    if (!b) return;
    var l = b.getAttribute('data-l');
    setLang(l);
    try { localStorage.setItem('cj-lang', l); } catch (err) { /* storage blocked */ }
  });

  document.addEventListener('DOMContentLoaded', function () {
    setLang(root.getAttribute('data-lang'));
    var nav = document.querySelector('.nav');
    var onScroll = function () { if (nav) nav.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { for (var i = 0; i < els.length; i++) els[i].classList.add('in'); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    for (var j = 0; j < els.length; j++) io.observe(els[j]);
  });
})();
