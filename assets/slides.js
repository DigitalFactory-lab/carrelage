/* Navigation des pages "plein écran" (body.plein-ecran + #slides) :
   flèches, points, clavier. Partagé par les demi-journées qui utilisent
   ce format d'écrans défilables horizontalement. */
(function(){
  var slides = document.getElementById('slides');
  if (!slides) return;
  var items = Array.prototype.slice.call(slides.children);
  var pointsWrap = document.getElementById('slidePoints');
  var prevBtn = document.getElementById('slidePrev');
  var nextBtn = document.getElementById('slideNext');
  var current = 0;

  items.forEach(function(_, i){
    var b = document.createElement('button');
    b.className = 'pt';
    b.setAttribute('aria-label', i === 0 ? 'Introduction' : 'Section ' + i);
    b.addEventListener('click', function(){ va(i); });
    pointsWrap.appendChild(b);
  });
  var dots = Array.prototype.slice.call(pointsWrap.children);

  function maj(){
    dots.forEach(function(d, i){ d.classList.toggle('on', i === current); });
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
    var modal = document.getElementById('modalPoint');
    if (modal && modal.classList.contains('on')) return;
    if (e.key === 'ArrowRight') va(current + 1);
    if (e.key === 'ArrowLeft') va(current - 1);
  });
  window.addEventListener('resize', function(){ slides.scrollTo({ left: current * slides.clientWidth }); });
  maj();
})();
