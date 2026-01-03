function fitElementToParent(el, padding) {
    var timeout = null;
    function resize() {
      if (timeout) clearTimeout(timeout);
      anime.set(el, {scale: 1});
      var pad = padding || 0;
      var parentEl = el.parentNode;
      var elOffsetWidth = el.offsetWidth - pad;
      var parentOffsetWidth = parentEl.offsetWidth;
      var ratio = parentOffsetWidth / elOffsetWidth;
      timeout = setTimeout(anime.set(el, {scale: ratio}), 10);
    }
    resize();
    window.addEventListener('resize', resize);
  }
  
  var sphereAnimation = (function() {
  
    var sphereEl = document.querySelector('.sphere-animation');
    var spherePathEls = sphereEl.querySelectorAll('.sphere path');
    var pathLength = spherePathEls.length;
    var hasStarted = false;
    var aimations = [];
  
    fitElementToParent(sphereEl);
  
    var breathAnimation = anime({
      begin: function() {
        for (var i = 0; i < pathLength; i++) {
          aimations.push(anime({
            targets: spherePathEls[i],
            stroke: {value: ['rgba(143,64,255,1)', 'rgba(80,80,80,.35)'], duration: 500},
            translateX: [2, -4],
            translateY: [2, -4],
            easing: 'easeOutQuad',
            autoplay: false
          }));
        }
      },
      update: function(ins) {
        aimations.forEach(function(animation, i) {
          var percent = (1 - Math.sin((i * .35) + (.0022 * ins.currentTime))) / 2;
          animation.seek(animation.duration * percent);
        });
      },
      duration: Infinity,
      autoplay: false
    });
  
    var introAnimation = anime.timeline({
      autoplay: false
    })
    .add({
      targets: spherePathEls,
      strokeDashoffset: {
        value: [anime.setDashoffset, 0],
        duration: 3900,
        easing: 'easeInOutCirc',
        delay: anime.stagger(190, {direction: 'reverse'})
      },

    });

    // Play animations on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', function() {
      introAnimation.play();
      breathAnimation.play();
    });

})();

// --- Portfolio Section ---
const portfolioData = [
  { image: '/assets/portfolio/fogpriestess.png', alt: 'Fog Priestess' },
  { image: '/assets/portfolio/landscape1.png', alt: 'Landscape 1' },
  { image: '/assets/portfolio/landscape2.png', alt: 'Landscape 2' },
  { image: '/assets/portfolio/landscape3.png', alt: 'Landscape 3' }
];

function renderPortfolio() {
  const portfolioGrid = document.getElementById('portfolio-grid');
  if (!portfolioGrid) return;
  
  portfolioGrid.innerHTML = portfolioData.map((item, index) => 
    `<div class="portfolio-item">
      <img src="${item.image}" alt="${item.alt}" />
    </div>`
  ).join('');
}

document.addEventListener('DOMContentLoaded', function() {
  renderPortfolio();
  
  // Contact form event
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for reaching out!');
    });
  }
});
