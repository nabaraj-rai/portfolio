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
  {
    title: 'Personal Blog',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
    description: 'A modern blog built with React and Node.js.',
    link: '#'
  },
  {
    title: 'Art Gallery',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    description: 'A portfolio site to showcase my digital art.',
    link: '#'
  },
  {
    title: 'Weather App',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    description: 'A simple weather app using OpenWeatherMap API.',
    link: '#'
  },
  {
    title: 'Task Manager',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    description: 'A productivity tool to manage daily tasks.',
    link: '#'
  }
];

function renderPortfolio() {
  const portfolioList = document.getElementById('portfolio-list');
  if (!portfolioList) return;
  portfolioList.innerHTML = portfolioData.map(item => `
    <div class="portfolio-item">
      <img src="${item.image}" alt="${item.title}" />
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <a href="${item.link}" target="_blank">View Project</a>
    </div>
  `).join('');
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
