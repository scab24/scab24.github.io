// Gives every section heading a stable address and a button that copies its link.
(function () {
  var seen = {};
  function slug(text) {
    var s = text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'section';
    var base = s, n = 2;
    while (seen[s] || document.getElementById(s)) { s = base + '-' + n++; }
    seen[s] = true;
    return s;
  }
  var style = document.createElement('style');
  style.textContent = '.anchor-link{margin-left:.45em;opacity:0;font-size:.7em;font-weight:400;text-decoration:none;' +
    'color:inherit;cursor:pointer;transition:opacity .15s;vertical-align:middle;background:none;border:0;padding:0}' +
    'h1:hover .anchor-link,h2:hover .anchor-link,h3:hover .anchor-link,.anchor-link:focus{opacity:.55}' +
    '.anchor-link:hover{opacity:1}@media (hover:none){.anchor-link{opacity:.4}}';
  document.head.appendChild(style);
  document.querySelectorAll('h2, h3').forEach(function (h) {
    var holder = h.closest('section[id]');
    var id = h.id || (holder && holder.querySelector('h2, h3') === h ? holder.id : '');
    if (!id) { id = slug(h.textContent); h.id = id; }
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'anchor-link';
    b.setAttribute('aria-label', 'Copy link to this section');
    b.textContent = '#';
    b.addEventListener('click', function (e) {
      e.preventDefault();
      var url = location.origin + location.pathname + '#' + id;
      history.replaceState(null, '', '#' + id);
      var done = function () { b.textContent = 'copied'; setTimeout(function () { b.textContent = '#'; }, 1200); };
      if (navigator.clipboard) { navigator.clipboard.writeText(url).then(done, done); } else { done(); }
    });
    h.appendChild(b);
  });
  if (location.hash.length > 1) {
    var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) { target.scrollIntoView(); }
  }
})();
