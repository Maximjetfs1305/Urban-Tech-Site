(function () {
  "use strict";

  const styleId = 'ut-header-contact-fixes';
  if (document.getElementById(styleId)) return;

  const utHeroBgGif = "data:image/gif;base64,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";

  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    /* FIX: animated hero background + compact header + centered contact modal */
    .hero-wrap {
      background:
        linear-gradient(180deg, rgba(3, 5, 10, 0.78) 0%, rgba(3, 5, 10, 0.91) 52%, rgba(1, 2, 5, 0.97) 100%),
        radial-gradient(circle at 50% 0%, rgba(248, 181, 0, 0.10), rgba(248, 181, 0, 0) 38%),
        url("${utHeroBgGif}") !important;
      background-size: cover !important;
      background-position: center top !important;
      background-repeat: no-repeat !important;
      background-attachment: fixed !important;
    }

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
      .hero-wrap {
        background-attachment: scroll !important;
      }

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