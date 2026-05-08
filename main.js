(function($) {

  "use strict";

  var fullHeight = function() {

    $('.js-fullheight').css('height', $(window).height());
    $(window).resize(function(){
      $('.js-fullheight').css('height', $(window).height());
    });

  };
  fullHeight();

  var burgerMenu = function() {

    $('.js-ut-nav-toggle').on('click', function(event) {
      event.preventDefault();
      if( $('body').hasClass('menu-show') ) {
        $('body').removeClass('menu-show');
        $('#ut-main-nav > .js-ut-nav-toggle').removeClass('show');
      } else {
        $('body').addClass('menu-show');
        setTimeout(function(){
          $('#ut-main-nav > .js-ut-nav-toggle').addClass('show');
        }, 900);
      }
    });
  };
  burgerMenu();

})(jQuery);

window.addEventListener('load', function () {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  setTimeout(function () {
    preloader.style.transition = 'opacity 0.5s';
    preloader.style.opacity = '0';

    setTimeout(function () {
      preloader.style.display = 'none';
    }, 500);
  }, 800);
});

// JS-анімація логотипу
window.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('header .ut-navbar .logo-text');
  if (!logo) return;

  const originalHTML = logo.innerHTML;

  logo.addEventListener('mouseenter', () => {
    const text = logo.textContent;
    logo.innerHTML = text.split('').map(l => {
      if (l === ' ') return ' ';
      if (l === 'T') return `<span class="highlight">${l}</span>`;
      return `<span>${l}</span>`;
    }).join('');

    const spans = logo.querySelectorAll('span');
    spans.forEach((span, i) => {
      span.style.animation = 'wave 0.6s ease-in-out forwards';
      span.style.animationDelay = `${i * 0.08}s`;
    });
  });

  logo.addEventListener('mouseleave', () => {
    logo.innerHTML = originalHTML;
  });
});

// CONTACT MODAL
window.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('utContactModal');
  if (!modal) return;

  const openButtons = document.querySelectorAll('[data-contact-open]');
  const closeButtons = modal.querySelectorAll('[data-contact-close]');
  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('contact-modal-open');
  };

  const openModal = (event) => {
    if (event) event.preventDefault();
    document.body.classList.remove('menu-show');
    const navClose = document.querySelector('#ut-main-nav > .js-ut-nav-toggle');
    if (navClose) navClose.classList.remove('show');

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('contact-modal-open');

    const firstLink = modal.querySelector('.ut-contact-item');
    if (firstLink) setTimeout(() => firstLink.focus(), 80);
  };

  openButtons.forEach((button) => button.addEventListener('click', openModal));
  closeButtons.forEach((button) => button.addEventListener('click', closeModal));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
});

// SERVICES TABS
window.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('[data-service-tab]');
  const panels = document.querySelectorAll('[data-service-panel]');
  const content = document.getElementById('servicesContent');

  if (!tabs.length || !panels.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.serviceTab;

      tabs.forEach((item) => item.classList.toggle('active', item === tab));
      panels.forEach((panel) => {
        panel.classList.toggle('active', panel.dataset.servicePanel === target);
      });

      if (window.innerWidth < 1200 && typeof tab.scrollIntoView === 'function') {
        tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }

      if (content && window.innerWidth < 768) {
        const top = content.getBoundingClientRect().top + window.scrollY - 78;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
});

// CONTACT BUTTON — premium JS auto-animation
window.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.bttn-more[data-contact-open]');
  if (!buttons.length) return;

  buttons.forEach((button) => button.classList.add('ut-contact-premium'));

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    buttons.forEach((button) => {
      button.style.setProperty('--ut-cta-x', '50%');
      button.style.setProperty('--ut-cta-angle', '115deg');
      button.style.setProperty('--ut-cta-glow', '0.30');
      button.style.setProperty('--ut-cta-spot', '0.24');
    });
    return;
  }

  const duration = 4300;

  const animateContactButtons = (time) => {
    const t = (time % duration) / duration;
    const wave = (Math.sin(t * Math.PI * 2 - Math.PI / 2) + 1) / 2;

    const x = 18 + wave * 64;
    const angle = 92 + t * 360;
    const glow = 0.24 + wave * 0.24;
    const spot = 0.18 + wave * 0.18;

    buttons.forEach((button) => {
      button.style.setProperty('--ut-cta-x', `${x.toFixed(1)}%`);
      button.style.setProperty('--ut-cta-angle', `${angle.toFixed(1)}deg`);
      button.style.setProperty('--ut-cta-glow', glow.toFixed(3));
      button.style.setProperty('--ut-cta-spot', spot.toFixed(3));
    });

    window.requestAnimationFrame(animateContactButtons);
  };

  window.requestAnimationFrame(animateContactButtons);
});
