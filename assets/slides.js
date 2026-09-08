/* Navigation des pages "plein écran" (body.plein-ecran + #slides) :
   flèches, points, chemin de sections cliquable, clavier. Partagé par
   les demi-journées qui utilisent ce format d'écrans défilables
   horizontalement. */
(function(){
  var slides = document.getElementById('slides');
  if (!slides) return;
  var items = Array.prototype.slice.call(slides.children);
  var pointsWrap = document.getElementById('slidePoints');
  var crumbsWrap = document.getElementById('slideCrumbs');
  var prevBtn = document.getElementById('slidePrev');
  var nextBtn = document.getElementById('slideNext');
  var current = 0;

  function labelFor(item, i){
    var h2 = item.querySelector('h2');
    if (!h2) return i === 0 ? 'Intro' : 'Section ' + i;
    var m = h2.textContent.match(/^Section\s+\d+/i);
    if (m) return m[0];
    return i === 0 ? 'Intro' : h2.textContent.trim();
  }

  items.forEach(function(item, i){
    var b = document.createElement('button');
    b.className = 'pt';
    b.setAttribute('aria-label', i === 0 ? 'Introduction' : 'Section ' + i);
    b.addEventListener('click', function(){ va(i); });
    pointsWrap.appendChild(b);

    if (crumbsWrap){
      if (i > 0){
        var sep = document.createElement('span');
        sep.className = 'sep';
        sep.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 6 15 12 9 18"/></svg>';
        crumbsWrap.appendChild(sep);
      }
      var c = document.createElement('button');
      c.className = 'crumb';
      c.textContent = labelFor(item, i);
      c.addEventListener('click', function(){ va(i); });
      crumbsWrap.appendChild(c);
    }
  });
  var dots = Array.prototype.slice.call(pointsWrap.children);
  var crumbs = crumbsWrap ? Array.prototype.slice.call(crumbsWrap.querySelectorAll('.crumb')) : [];

  function maj(){
    dots.forEach(function(d, i){ d.classList.toggle('on', i === current); });
    crumbs.forEach(function(c, i){ c.classList.toggle('on', i === current); });
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === items.length - 1;
  }
  function va(i){
    current = Math.max(0, Math.min(items.length - 1, i));
    slides.scrollTo({ left: current * slides.clientWidth, behavior: 'smooth' });
    maj();
  }
  var scrollTimer;
  slides.addEventListener('scroll', function(){
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function(){
      current = Math.round(slides.scrollLeft / slides.clientWidth);
      maj();
    }, 80);
  });
  prevBtn.addEventListener('click', function(){ va(current - 1); });
  nextBtn.addEventListener('click', function(){ va(current + 1); });
  document.addEventListener('keydown', function(e){
    // une modale ou une image agrandie est ouverte : elle prend les touches
    if (document.querySelector('.modal.on, .lightbox.on')) return;
    if (e.key === 'ArrowRight') va(current + 1);
    if (e.key === 'ArrowLeft') va(current - 1);
  });
  window.addEventListener('resize', function(){ slides.scrollTo({ left: current * slides.clientWidth }); });
  maj();
})();
