(function () {
  "use strict";

  const styleId = 'ut-header-contact-fixes';
  if (document.getElementById(styleId)) return;

  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    /* FIX: compact header + centered contact modal */
    header {
      padding: clamp(2px, 0.45vw, 6px) 0 !important;
      min-height: 0 !important;
    }

    main {
      padding-top: clamp(44px, 3.2vw, 58px) !important;
    }

    header .container {
      min-height: 32px !important;
      height: 32px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      gap: 14px !important;
    }

    header .ut-navbar {
      display: flex !important;
      align-items: center !important;
      height: 100% !important;
      line-height: 1 !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    header .ut-navbar .logo-text {
      display: inline-flex !important;
      align-items: center !important;
      margin: 0 !important;
      padding: 0 !important;
      line-height: 1 !important;
      font-size: clamp(13px, 1.45vw, 16px) !important;
      letter-spacing: clamp(2px, 0.35vw, 3px) !important;
    }

    header > .container > .ut-nav-toggle {
      width: 30px !important;
      height: 30px !important;
      flex: 0 0 30px !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      align-self: center !important;
      margin: 0 0 0 auto !important;
      padding: 0 !important;
      top: auto !important;
      right: auto !important;
      line-height: 1 !important;
    }

    header > .container > .ut-nav-toggle i {
      width: 17px !important;
      height: 2px !important;
      display: block !important;
      margin: 0 !important;
      top: auto !important;
      left: auto !important;
      line-height: 0 !important;
      text-indent: 0 !important;
    }

    header > .container > .ut-nav-toggle i::before,
    header > .container > .ut-nav-toggle i::after {
      width: 25px !important;
      height: 2px !important;
    }

    header > .container > .ut-nav-toggle i::before {
      top: -7px !important;
    }

    header > .container > .ut-nav-toggle i::after {
      bottom: -7px !important;
    }

    .ut-contact-modal {
      align-items: center !important;
      justify-content: center !important;
      padding: clamp(14px, 3vw, 22px) !important;
    }

    .ut-contact-modal__dialog {
      width: min(520px, calc(100vw - 28px)) !important;
      max-height: calc(100dvh - 44px) !important;
      padding: clamp(24px, 3.2vw, 34px) !important;
      scrollbar-width: none;
    }

    .ut-contact-modal__dialog::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    .ut-contact-modal h2,
    #utContactTitle {
      white-space: nowrap !important;
      font-size: clamp(28px, 3vw, 38px) !important;
      margin-right: 46px !important;
    }

    @media (min-width: 992px) {
      .ut-contact-modal__dialog {
        overflow: visible !important;
        max-height: none !important;
      }

      .ut-contact-list {
        margin: 20px 0 16px !important;
      }

      .ut-contact-item {
        padding: 12px 14px !important;
      }
    }

    @media (max-width: 991.98px) {
      header {
        padding: 3px 0 !important;
      }

      main {
        padding-top: 50px !important;
      }

      header .container {
        height: 32px !important;
        min-height: 32px !important;
      }

      .ut-contact-modal {
        align-items: center !important;
        padding: 14px !important;
      }

      .ut-contact-modal__dialog {
        transform: translateY(-3vh) scale(0.98) !important;
        border-radius: 22px !important;
      }

      .ut-contact-modal.is-open .ut-contact-modal__dialog {
        transform: translateY(-3vh) scale(1) !important;
      }
    }

    @media (max-width: 575.98px) {
      main {
        padding-top: 48px !important;
      }

      header .ut-navbar .logo-text {
        font-size: 13px !important;
        letter-spacing: 2px !important;
      }

      header > .container > .ut-nav-toggle {
        width: 28px !important;
        height: 28px !important;
        flex-basis: 28px !important;
      }

      .ut-contact-modal__dialog {
        width: min(100%, calc(100vw - 20px)) !important;
        padding: 24px 18px 20px !important;
      }

      .ut-contact-modal h2,
      #utContactTitle {
        font-size: clamp(24px, 7vw, 30px) !important;
        margin-right: 42px !important;
      }

      .ut-contact-list {
        gap: 8px !important;
        margin: 18px 0 14px !important;
      }

      .ut-contact-item {
        padding: 11px !important;
      }
    }

    @media (max-width: 374.98px) {
      .ut-contact-modal h2,
      #utContactTitle {
        white-space: normal !important;
      }
    }
  `;
  document.head.appendChild(style);
})();

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
  const nav = document.querySelector('.services-nav');
  const mobileToggle = document.querySelector('[data-services-mobile-toggle]');
  const mobileLabel = document.querySelector('[data-services-mobile-label]');

  if (!tabs.length || !panels.length) return;

  const setActiveService = (target, clickedTab = null, shouldScroll = true) => {
    const activeTab = clickedTab || Array.from(tabs).find((tab) => tab.dataset.serviceTab === target);
    if (!activeTab) return;

    tabs.forEach((item) => item.classList.toggle('active', item === activeTab));
    panels.forEach((panel) => {
      panel.classList.toggle('active', panel.dataset.servicePanel === target);
    });

    if (mobileLabel) {
      mobileLabel.textContent = activeTab.textContent.trim();
    }

    if (nav) nav.classList.remove('is-open');
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');

    if (window.innerWidth < 1200 && window.innerWidth >= 768 && typeof activeTab.scrollIntoView === 'function') {
      activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }

    if (shouldScroll && content && window.innerWidth < 768) {
      const top = content.getBoundingClientRect().top + window.scrollY - 78;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const activeOnLoad = document.querySelector('[data-service-tab].active');
  if (activeOnLoad && mobileLabel) {
    mobileLabel.textContent = activeOnLoad.textContent.trim();
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      setActiveService(tab.dataset.serviceTab, tab, true);
    });
  });

  if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (event) => {
      const isInsideNav = nav.contains(event.target);
      const isToggle = mobileToggle.contains(event.target);

      if (!isInsideNav && !isToggle) {
        nav.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
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