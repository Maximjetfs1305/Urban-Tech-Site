(function () {
  "use strict";

  const styleId = 'ut-header-contact-fixes';
  if (document.getElementById(styleId)) return;

  const heroBgPath = "assets/gif/hero-bg.gif";

  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    /* URBAN TECH: editable animated hero background + contact modal fixes */
    .hero-wrap {
      background:
        linear-gradient(180deg, rgba(3, 5, 10, 0.78) 0%, rgba(3, 5, 10, 0.91) 52%, rgba(1, 2, 5, 0.97) 100%),
        radial-gradient(circle at 50% 0%, rgba(248, 181, 0, 0.10), rgba(248, 181, 0, 0) 38%),
        url("${heroBgPath}") !important;
      background-size: cover !important;
      background-position: center top !important;
      background-repeat: no-repeat !important;
      background-attachment: fixed !important;
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

  /* This runs after page inline styles, so the menu stays on the right, not near the logo. */
  setTimeout(() => {
    const finalHeaderStyle = document.createElement('style');
    finalHeaderStyle.id = 'ut-header-final-position-fix';
    finalHeaderStyle.textContent = `
      body.hero-wrap header {
        padding: 8px 0 !important;
        min-height: 0 !important;
      }

      body.hero-wrap main {
        padding-top: 68px !important;
      }

      body.hero-wrap header > .container {
        position: relative !important;
        height: 46px !important;
        min-height: 46px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
      }

      body.hero-wrap header .ut-navbar {
        position: absolute !important;
        left: 12px !important;
        top: 50% !important;
        transform: translateY(-50%) !important;
        display: flex !important;
        align-items: center !important;
        height: auto !important;
        margin: 0 !important;
        padding: 0 !important;
        line-height: 1 !important;
      }

      body.hero-wrap header .ut-navbar .logo-text {
        display: inline-flex !important;
        align-items: center !important;
        margin: 0 !important;
        padding: 0 !important;
        line-height: 1 !important;
        font-size: clamp(14px, 1.6vw, 17px) !important;
        letter-spacing: clamp(2px, 0.35vw, 3px) !important;
      }

      body.hero-wrap header > .container > .ut-nav-toggle {
        position: absolute !important;
        right: 12px !important;
        top: 50% !important;
        transform: translateY(-50%) !important;
        width: auto !important;
        min-width: 88px !important;
        height: 38px !important;
        flex: 0 0 auto !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: flex-end !important;
        gap: 11px !important;
        margin: 0 !important;
        padding: 0 !important;
        line-height: 1 !important;
        text-decoration: none !important;
      }

      body.hero-wrap header > .container > .ut-nav-toggle::before {
        content: "МЕНЮ";
        display: inline-block;
        color: rgba(255, 255, 255, 0.78);
        font-family: "Montserrat", Arial, sans-serif;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 2px;
        line-height: 1;
        transition: color 0.25s ease, text-shadow 0.25s ease;
      }

      body.hero-wrap header > .container > .ut-nav-toggle:hover::before {
        color: #f8b500;
        text-shadow: 0 0 8px rgba(248, 181, 0, 0.35);
      }

      body.hero-wrap header > .container > .ut-nav-toggle i {
        position: relative !important;
        width: 18px !important;
        height: 2px !important;
        display: block !important;
        margin: 0 !important;
        top: auto !important;
        left: auto !important;
        line-height: 0 !important;
        text-indent: 0 !important;
        flex: 0 0 18px !important;
      }

      body.hero-wrap header > .container > .ut-nav-toggle i::before,
      body.hero-wrap header > .container > .ut-nav-toggle i::after {
        width: 26px !important;
        height: 2px !important;
        left: -8px !important;
      }

      body.hero-wrap header > .container > .ut-nav-toggle i::before {
        top: -8px !important;
      }

      body.hero-wrap header > .container > .ut-nav-toggle i::after {
        bottom: -8px !important;
      }

      @media (max-width: 575.98px) {
        body.hero-wrap header {
          padding: 6px 0 !important;
        }

        body.hero-wrap main {
          padding-top: 62px !important;
        }

        body.hero-wrap header > .container {
          height: 42px !important;
          min-height: 42px !important;
        }

        body.hero-wrap header .ut-navbar {
          left: 10px !important;
        }

        body.hero-wrap header > .container > .ut-nav-toggle {
          right: 10px !important;
          min-width: 76px !important;
          height: 34px !important;
          gap: 9px !important;
        }

        body.hero-wrap header > .container > .ut-nav-toggle::before {
          font-size: 10px;
          letter-spacing: 1.5px;
        }
      }
    `;
    document.head.appendChild(finalHeaderStyle);
  }, 0);
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