function toggleMenu() {
  var menu = document.getElementById('nav-menu');
  var icon = document.querySelector('.hamburger-icon');
  var overlay = document.getElementById('overlay');
  
  menu.classList.toggle('active');
  icon.classList.toggle('active');
  overlay.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', function () {
  // Add overlay to the page
  var overlay = document.createElement('div');
  overlay.id = 'overlay';
  overlay.className = 'overlay';
  overlay.onclick = toggleMenu;
  document.body.appendChild(overlay);

  // Handle i18n links in the menu
  document.querySelectorAll('.nav-menu .i18n-link').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      var page = el.dataset.page || 'privacy';
      var currentLang = document.documentElement.lang || 'ar';
      var lang = (currentLang === 'en') ? 'en' : 'ar';
      
      var target = '/pages/' + page + '-' + lang + '.html';
      
      if (page === 'about' && lang === 'ar') {
        target = '/pages/about-ar.html'; 
      } else if (page === 'about' && lang === 'en') {
        target = '/pages/about-en.html';
      }
      
      window.location.href = target;
    });
  });
});