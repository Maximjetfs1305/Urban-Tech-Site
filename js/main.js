(function () {
  "use strict";

  const runtimeCssPath = "css/ut-runtime.css";
  const menuTestCssPath = "css/ut-menu-test.css";
  const headerScrollCssPath = "css/ut-header-scroll.css";
  const faqCssPath = "css/ut-faq.css";
  const contactsCssPath = "css/ut-contacts.css";
  const heroVideoPath = "assets/video/hero-bg.mp4";
  const heroPosterPath = "assets/img/hero-poster.jpg";

  const ensureStylesheet = (href) => {
    if (document.querySelector(`link[href="${href}"]`)) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  };

  const ensureHeroVideo = () => {
    if (document.querySelector(".hero-bg-video")) return;

    const video = document.createElement("video");
    video.className = "hero-bg-video";
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.poster = heroPosterPath;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("preload", "metadata");
    video.setAttribute("aria-hidden", "true");
    video.tabIndex = -1;

    const source = document.createElement("source");
    source.src = heroVideoPath;
    source.type = "video/mp4";
    video.appendChild(source);

    const overlay = document.createElement("div");
    overlay.className = "hero-bg-overlay";
    overlay.setAttribute("aria-hidden", "true");

    document.body.insertBefore(overlay, document.body.firstChild);
    document.body.insertBefore(video, overlay);

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    };

    if (document.readyState === "complete") {
      tryPlay();
    } else {
      window.addEventListener("load", tryPlay, { once: true });
    }
  };

  ensureStylesheet(runtimeCssPath);
  ensureStylesheet(menuTestCssPath);
  ensureStylesheet(headerScrollCssPath);

  const loadPageSpecificStyles = () => {
    if (document.body.classList.contains("faq-body")) ensureStylesheet(faqCssPath);
    if (document.body.classList.contains("contact-body")) ensureStylesheet(contactsCssPath);
  };

  if (document.body) {
    loadPageSpecificStyles();
  } else {
    document.addEventListener("DOMContentLoaded", loadPageSpecificStyles, { once: true });
  }

  ensureHeroVideo();
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
    let menuCloseTimer = null;
    const closeDelay = 420;

    const openMenu = function() {
      window.clearTimeout(menuCloseTimer);
      $('body').removeClass('menu-closing').addClass('menu-show');
      setTimeout(function(){
        $('#ut-main-nav > .js-ut-nav-toggle').addClass('show');
      }, 80);
    };

    const closeMenu = function() {
      if (!$('body').hasClass('menu-show') || $('body').hasClass('menu-closing')) return;

      window.clearTimeout(menuCloseTimer);
      $('body').addClass('menu-closing');
      $('#ut-main-nav > .js-ut-nav-toggle').removeClass('show');

      menuCloseTimer = window.setTimeout(function() {
        $('body').removeClass('menu-show menu-closing');
      }, closeDelay);
    };

    $('.js-ut-nav-toggle').on('click', function(event) {
      event.preventDefault();
      event.stopPropagation();

      if ($('body').hasClass('menu-show')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    $('#ut-main-nav').on('click', function(event) {
      const clickedPanel = $(event.target).closest('#ut-main-nav .col-md-12').length > 0;
      const clickedCloseButton = $(event.target).closest('#ut-main-nav > .js-ut-nav-toggle').length > 0;

      if (!clickedPanel && !clickedCloseButton) {
        closeMenu();
      }
    });

    $('#ut-main-nav .col-md-12').on('click', function(event) {
      event.stopPropagation();
    });

    $(document).on('keydown', function(event) {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });
  };
  burgerMenu();

})(jQuery);

function hidePreloaderWhenLoaded() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  const removePreloader = () => {
    preloader.style.display = 'none';
  };

  preloader.style.transition = 'opacity 0.18s ease';
  preloader.style.opacity = '0';
  preloader.addEventListener('transitionend', removePreloader, { once: true });
}

if (document.readyState === 'complete') {
  hidePreloaderWhenLoaded();
} else {
  window.addEventListener('load', hidePreloaderWhenLoaded, { once: true });
}

// HEADER SCROLL STATE
window.addEventListener('DOMContentLoaded', () => {
  const updateHeaderState = () => {
    document.body.classList.toggle('ut-header-scrolled', window.scrollY > 12);
  };

  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });
});

// MAIN MENU — one identical menu across all pages
window.addEventListener('DOMContentLoaded', () => {
  const menuLists = document.querySelectorAll('#ut-main-nav ul');
  if (!menuLists.length) return;

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const menuItems = [
    { href: 'index.html', label: 'Головна', activeOn: ['index.html', ''] },
    { href: 'services.html', label: 'Послуги', activeOn: ['services.html'] },
    { href: 'porady-zamovnyku.html', label: 'Поради', activeOn: ['porady-zamovnyku.html'] },
    { href: 'faq.html', label: 'FAQ', activeOn: ['faq.html'] },
    { href: 'contacts.html', label: 'Контакти', activeOn: ['contacts.html'] }
  ];

  menuLists.forEach((menuList) => {
    menuList.innerHTML = menuItems.map((item) => {
      const isActive = item.activeOn.includes(currentPage);
      const ariaCurrent = isActive ? ' aria-current="page"' : '';
      return `<li class="${isActive ? 'active' : ''}"><a href="${item.href}"${ariaCurrent}><span>${item.label}</span></a></li>`;
    }).join('');

    const panel = menuList.closest('.col-md-12');
    if (panel && !panel.querySelector('.ut-menu-contacts')) {
      const contacts = document.createElement('div');
      contacts.className = 'ut-menu-contacts';
      contacts.innerHTML = `
        <a class="ut-menu-phone" href="tel:+380756337652">
          <i class="bi bi-telephone"></i>
          <span>+38 (075) 633 76 52</span>
        </a>
        <div class="ut-menu-socials" aria-label="Месенджери">
          <a href="https://t.me/" aria-label="Telegram"><i class="bi bi-telegram"></i><span>Telegram</span></a>
          <span class="ut-menu-dot" aria-hidden="true"></span>
          <a href="viber://chat?number=%2B380756337652" aria-label="Viber"><i class="bi bi-telephone"></i><span>Viber</span></a>
          <span class="ut-menu-dot" aria-hidden="true"></span>
          <a href="https://wa.me/380756337652" aria-label="WhatsApp"><i class="bi bi-whatsapp"></i><span>WhatsApp</span></a>
        </div>
      `;
      panel.appendChild(contacts);
    }
  });
});

// PAGE BREADCRUMBS — consistent path across pages
window.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const breadcrumbsMap = {
    'services.html': [
      { href: 'index.html', label: 'Головна' },
      { label: 'Послуги' }
    ],
    'porady-zamovnyku.html': [
      { href: 'index.html', label: 'Головна' },
      { label: 'Поради замовнику' }
    ],
    'faq.html': [
      { href: 'index.html', label: 'Головна' },
      { label: 'FAQ' }
    ],
    'contacts.html': [
      { href: 'index.html', label: 'Головна' },
      { label: 'Контакти' }
    ],
    'porady-rozetky.html': [
      { href: 'index.html', label: 'Головна' },
      { href: 'porady-zamovnyku.html', label: 'Поради замовнику' },
      { label: 'Планування розеток' }
    ],
    'porady-osvitlennya.html': [
      { href: 'index.html', label: 'Головна' },
      { href: 'porady-zamovnyku.html', label: 'Поради замовнику' },
      { label: 'Планування освітлення' }
    ],
    'porady-pered-elektromontazhem.html': [
      { href: 'index.html', label: 'Головна' },
      { href: 'porady-zamovnyku.html', label: 'Поради замовнику' },
      { label: 'Перед початком робіт' }
    ],
    'porady-yak-pryymaty-roboty.html': [
      { href: 'index.html', label: 'Головна' },
      { href: 'porady-zamovnyku.html', label: 'Поради замовнику' },
      { label: 'Як приймати роботу' }
    ],
    'porady-typovi-pomylky.html': [
      { href: 'index.html', label: 'Головна' },
      { href: 'porady-zamovnyku.html', label: 'Поради замовнику' },
      { label: 'Типові помилки' }
    ],
    'porady-pytannya-do-pidryadnyka.html': [
      { href: 'index.html', label: 'Головна' },
      { href: 'porady-zamovnyku.html', label: 'Поради замовнику' },
      { label: 'Питання до підрядника' }
    ],
    'porady-rezervne-zhyvlennya.html': [
      { href: 'index.html', label: 'Головна' },
      { href: 'porady-zamovnyku.html', label: 'Поради замовнику' },
      { label: 'Резервне живлення' }
    ]
  };

  const items = breadcrumbsMap[currentPage];
  if (!items) return;

  let target = document.querySelector('.advice-breadcrumbs');

  if (!target) {
    const heroContent = document.querySelector(
      '.advice-article-hero .col-12, .advice-hero-section .hero-info-wrap, .services-intro-section .hero-info-wrap, .services-hero-section .hero-info-wrap, .faq-hero-section .hero-info-wrap, .contact-hero-section .hero-info-wrap'
    );

    if (!heroContent) return;

    target = document.createElement('nav');
    target.className = 'advice-breadcrumbs';
    target.setAttribute('aria-label', 'Навігація');
    heroContent.insertBefore(target, heroContent.firstElementChild);
  }

  target.innerHTML = items.map((item, index) => {
    const separator = index === 0 ? '' : '<span>/</span>';
    const isLast = index === items.length - 1;
    const itemHtml = item.href && !isLast
      ? `<a href="${item.href}">${item.label}</a>`
      : `<strong>${item.label}</strong>`;

    return `${separator}${itemHtml}`;
  }).join('');
});

// SHARED FOOTER AND CONTACT MODAL — one source of truth across pages
window.addEventListener('DOMContentLoaded', () => {
  const footer = document.querySelector('footer.footer-urban');

  if (footer) {
    footer.innerHTML = `
      <div class="container">
        <div class="row gy-4 align-items-start">

          <div class="col-12 col-lg-4">
            <div class="footer-brand-wrap">
              <h3 class="footer-brand mb-3"><span class="brand-logo-text">URBAN <span class="highlight">T</span>ECH</span></h3>
              <p class="footer-text mb-0">
                Сучасні інженерні рішення для житлових, комерційних та промислових об'єктів.
                Електромонтаж, системи безпеки, відеоспостереження, СКУД, мережі та автоматизація.
              </p>
            </div>
          </div>

          <div class="col-12 col-md-6 col-lg-4">
            <h5 class="footer-title">Контакти</h5>

            <div class="footer-contact-item">
              <span class="footer-label">Телефон</span>
              <a href="tel:+380756337652" class="footer-link">+38 (075) 633 76 52</a>
            </div>

            <div class="footer-contact-item">
              <span class="footer-label">Локація</span>
              <p class="footer-text mb-0">Київ та область</p>
            </div>

            <div class="footer-contact-item">
              <span class="footer-label">Email</span>
              <a href="mailto:urban.tech.kyiv@gmail.com" class="footer-link">urban.tech.kyiv@gmail.com</a>
            </div>
          </div>

          <div class="col-12 col-md-6 col-lg-4">
            <h5 class="footer-title">Зв'язок</h5>

            <div class="footer-socials">
              <a href="#" class="footer-social" aria-label="Instagram">
                <i class="bi bi-instagram"></i>
              </a>

              <a href="#" class="footer-social" aria-label="Facebook">
                <i class="bi bi-facebook"></i>
              </a>

              <a href="https://t.me/" class="footer-social" aria-label="Telegram">
                <i class="bi bi-telegram"></i>
              </a>

              <a href="https://wa.me/380756337652" class="footer-social" aria-label="WhatsApp">
                <i class="bi bi-whatsapp"></i>
              </a>

              <a href="viber://chat?number=%2B380756337652" class="footer-social footer-social--viber" aria-label="Viber">
                <svg class="viber-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M12 3.2c-4.1 0-7.4 2.8-7.4 6.3 0 1.8.9 3.4 2.3 4.5l-.5 2.6 2.8-1.4c.9.3 1.8.5 2.8.5 4.1 0 7.4-2.8 7.4-6.3S16.1 3.2 12 3.2Zm3.8 9.1c-.2.5-.9 1.1-1.5 1.2-.4.1-.9.1-2.5-.6-2.1-.9-3.5-3.1-3.6-3.2-.1-.1-.9-1.2-.9-2.3s.6-1.6.8-1.8c.2-.2.4-.3.6-.3h.5c.2 0 .4 0 .6.5.2.5.7 1.7.8 1.8.1.2.1.3 0 .5-.1.2-.2.3-.4.5-.2.2-.3.3-.2.5.1.2.6 1 1.2 1.5.8.7 1.5.9 1.8 1 .2.1.4.1.6-.1.2-.2.6-.7.8-1 .2-.2.4-.2.6-.1.2.1 1.5.7 1.7.8.3.2.3.3.3.4 0 .1 0 .4-.2.8Z" />
                </svg>
              </a>
            </div>

            <p class="footer-note mt-3 mb-0">
              Напишіть у зручний месенджер або зателефонуйте — підкажемо оптимальне рішення під ваш об'єкт.
            </p>
          </div>

        </div>

        <div class="footer-bottom text-center">
          <p class="mb-0">
            © 2026 <span class="brand-logo-text brand-logo-text--inline">URBAN <span class="highlight">T</span>ECH</span>. Усі права захищені.
          </p>
        </div>
      </div>
    `;
  }

  const modal = document.getElementById('utContactModal');
  if (modal) {
    modal.innerHTML = `
      <div class="ut-contact-modal__backdrop" data-contact-close></div>
      <div class="ut-contact-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="utContactTitle">
        <button type="button" class="ut-contact-modal__close" data-contact-close aria-label="Закрити">×</button>
        <p class="ut-contact-modal__kicker"><span class="brand-logo-text">URBAN <span class="highlight">T</span>ECH</span></p>
        <h2 id="utContactTitle">Зв'язатися з нами</h2>
        <p class="ut-contact-modal__lead">
          Напишіть або зателефонуйте — підкажемо оптимальне рішення під ваш об'єкт.
        </p>

        <div class="ut-contact-list">
          <a href="tel:+380756337652" class="ut-contact-item">
            <i class="bi bi-telephone"></i>
            <span><strong>Телефон</strong>+38 (075) 633 76 52</span>
          </a>
          <a href="mailto:urban.tech.kyiv@gmail.com" class="ut-contact-item">
            <i class="bi bi-envelope"></i>
            <span><strong>Email</strong>urban.tech.kyiv@gmail.com</span>
          </a>
          <a href="https://t.me/" class="ut-contact-item">
            <i class="bi bi-telegram"></i>
            <span><strong>Telegram</strong>Написати в Telegram</span>
          </a>
          <a href="https://wa.me/380756337652" class="ut-contact-item">
            <i class="bi bi-whatsapp"></i>
            <span><strong>WhatsApp</strong>Написати у WhatsApp</span>
          </a>
          <a href="viber://chat?number=%2B380756337652" class="ut-contact-item">
            <i class="bi bi-chat-dots"></i>
            <span><strong>Viber</strong>Написати у Viber</span>
          </a>
        </div>

        <p class="ut-contact-modal__note">Київ та область · Електромонтаж · Безпека · Автоматизація</p>
      </div>
    `;
  }
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
    document.body.classList.remove('menu-show', 'menu-closing');
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