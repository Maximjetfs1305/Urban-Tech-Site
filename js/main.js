(function () {
  "use strict";

  const runtimeCssPath = "css/ut-runtime.css";
  const menuTestCssPath = "css/ut-menu-test.css";
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