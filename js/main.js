/*
  URBAN TECH — MAIN JAVASCRIPT
  Єдиний кастомний JS-файл сайту.

  Що тут зібрано:
  - підключення єдиного CSS-файлу css/urban-tech.css;
  - акуратний fallback на старі CSS, якщо urban-tech.css ще не завантажений;
  - preloader;
  - burger/fullscreen меню;
  - стан header при скролі;
  - hero-video фон;
  - breadcrumbs;
  - спільний footer і contact modal для внутрішніх сторінок;
  - вкладки сторінки "Послуги";
  - мобільна логіка сторінки "Послуги";
  - анімація логотипу;
  - анімація кнопок "Зв'язатися".
*/

(function () {
  "use strict";

  /* =========================================================
     ### ГЛОБАЛЬНІ НАЛАШТУВАННЯ ###
     ## Шляхи до CSS, відео та основні контакти ##
  ========================================================= */

  const CONFIG = {
    styles: {
      unified: "css/urban-tech.css",
      legacy: [
        "css/style.css",
        "css/home-static.css",
        "css/ut-runtime.css",
        "css/ut-menu-test.css",
        "css/ut-header-scroll.css",
        "css/ut-faq.css",
        "css/ut-contacts.css",
        "css/services-electro-cards.css",
        "css/ut-services-menu.css",
        "css/ut-services-tight.css",
        "css/ut-services-workflow.css",
        "css/ut-services-square.css",
        "css/ut-electro-six-cards.css"
      ]
    },

    heroVideo: {
      src: "assets/video/hero-bg.mp4",
      poster: "assets/img/hero-poster.jpg"
    },

    contacts: {
      phoneText: "+38 (075) 633 76 52",
      phoneHref: "tel:+380756337652",
      emailText: "urban.tech.kyiv@gmail.com",
      emailHref: "mailto:urban.tech.kyiv@gmail.com",
      telegramHref: "https://t.me/",
      whatsappHref: "https://wa.me/380756337652",
      viberHref: "viber://chat?number=%2B380756337652"
    }
  };

  const getCurrentPage = () => {
    return window.location.pathname.split("/").pop() || "index.html";
  };

  const isHomePage = () => {
    const page = getCurrentPage();
    return page === "index.html" || page === "";
  };

  const onReady = (callback) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
    } else {
      callback();
    }
  };

  const normalizeAssetPath = (href) => {
    if (!href) return "";

    try {
      const url = new URL(href, window.location.href);
      return url.pathname.replace(/^\//, "");
    } catch (error) {
      return href.replace(/^\//, "");
    }
  };

  /* =========================================================
     ### ВСІ СТОРІНКИ ###
     ## Єдиний CSS-файл сайту ##
     Підключає css/urban-tech.css.

     Важливо:
     - старі CSS-файли фізично НЕ видаляються;
     - якщо urban-tech.css ще не завантажений або його немає,
       старі стилі залишаються як fallback;
     - коли urban-tech.css успішно завантажиться,
       старі кастомні CSS-підключення прибираються зі сторінки,
       щоб не було дублювання стилів.
  ========================================================= */

  function initUnifiedStylesheet() {
    const unifiedPath = CONFIG.styles.unified;
    const legacyPaths = new Set(CONFIG.styles.legacy.map(normalizeAssetPath));

    const getStylesheetLinks = () => {
      return Array.from(document.querySelectorAll('link[rel~="stylesheet"]'));
    };

    const removeLegacyStyles = () => {
      getStylesheetLinks().forEach((link) => {
        const path = normalizeAssetPath(link.getAttribute("href"));

        if (legacyPaths.has(path)) {
          link.remove();
        }
      });
    };

    let unifiedLink = getStylesheetLinks().find((link) => {
      return normalizeAssetPath(link.getAttribute("href")) === unifiedPath;
    });

    if (!unifiedLink) {
      unifiedLink = document.createElement("link");
      unifiedLink.rel = "stylesheet";
      unifiedLink.href = unifiedPath;
      unifiedLink.setAttribute("data-urban-tech-main-css", "true");
      document.head.appendChild(unifiedLink);
    }

    const isStylesheetAlreadyLoaded = () => {
      try {
        return Boolean(unifiedLink.sheet);
      } catch (error) {
        return false;
      }
    };

    if (isStylesheetAlreadyLoaded()) {
      removeLegacyStyles();
      return;
    }

    unifiedLink.addEventListener("load", removeLegacyStyles, { once: true });

    unifiedLink.addEventListener("error", () => {
      console.warn(
        "Urban Tech: css/urban-tech.css не завантажився. Старі CSS-файли залишені як fallback."
      );
    }, { once: true });
  }

  /* =========================================================
     ### ВСІ СТОРІНКИ ###
     ## Відеофон hero ##
     Додає фонове відео та overlay на початок body,
     якщо їх ще немає на сторінці.
  ========================================================= */

  function initHeroVideoBackground() {
    if (!document.body) return;
    if (document.querySelector(".hero-bg-video")) return;

    const video = document.createElement("video");
    video.className = "hero-bg-video";
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.poster = CONFIG.heroVideo.poster;
    video.tabIndex = -1;

    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("preload", "metadata");
    video.setAttribute("aria-hidden", "true");

    const source = document.createElement("source");
    source.src = CONFIG.heroVideo.src;
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
  }

  /* =========================================================
     ### ВСІ СТОРІНКИ ###
     ## Preloader ##
     Після повного завантаження сторінки плавно ховає
     блок #preloader.
  ========================================================= */

  function initPreloader() {
    const hidePreloader = () => {
      const preloader = document.getElementById("preloader");
      if (!preloader) return;

      const removePreloader = () => {
        preloader.style.display = "none";
      };

      preloader.style.transition = "opacity 0.18s ease";
      preloader.style.opacity = "0";
      preloader.addEventListener("transitionend", removePreloader, { once: true });

      window.setTimeout(removePreloader, 350);
    };

    if (document.readyState === "complete") {
      hidePreloader();
    } else {
      window.addEventListener("load", hidePreloader, { once: true });
    }
  }

  /* =========================================================
     ### ВСІ СТОРІНКИ ###
     ## Висота fullscreen-меню ##
     Виставляє висоту .js-fullheight під висоту вікна.
     Потрібно для повноекранного мобільного/бургер-меню.
  ========================================================= */

  function initFullHeightBlocks() {
    const blocks = document.querySelectorAll(".js-fullheight");
    if (!blocks.length) return;

    const updateHeight = () => {
      const height = `${window.innerHeight}px`;

      blocks.forEach((block) => {
        block.style.height = height;
      });
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
  }

  /* =========================================================
     ### ВСІ СТОРІНКИ ###
     ## Бургер-меню / головна навігація ##
     Відкриває і закриває #ut-main-nav.
     Закриття працює по:
     - кнопці меню;
     - кліку поза панеллю;
     - клавіші Escape.
  ========================================================= */

  function initBurgerMenu() {
    const nav = document.getElementById("ut-main-nav");
    const toggles = document.querySelectorAll(".js-ut-nav-toggle");

    if (!nav || !toggles.length) return;

    let menuCloseTimer = null;
    const closeDelay = 420;

    const getCloseToggle = () => {
      return document.querySelector("#ut-main-nav > .js-ut-nav-toggle");
    };

    const openMenu = () => {
      window.clearTimeout(menuCloseTimer);

      document.body.classList.remove("menu-closing");
      document.body.classList.add("menu-show");

      window.setTimeout(() => {
        const closeToggle = getCloseToggle();
        if (closeToggle) closeToggle.classList.add("show");
      }, 80);
    };

    const closeMenu = () => {
      if (!document.body.classList.contains("menu-show")) return;
      if (document.body.classList.contains("menu-closing")) return;

      window.clearTimeout(menuCloseTimer);

      document.body.classList.add("menu-closing");

      const closeToggle = getCloseToggle();
      if (closeToggle) closeToggle.classList.remove("show");

      menuCloseTimer = window.setTimeout(() => {
        document.body.classList.remove("menu-show", "menu-closing");
      }, closeDelay);
    };

    const toggleMenu = (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (document.body.classList.contains("menu-show")) {
        closeMenu();
      } else {
        openMenu();
      }
    };

    toggles.forEach((toggle) => {
      toggle.addEventListener("click", toggleMenu);
    });

    nav.addEventListener("click", (event) => {
      const clickedPanel = event.target.closest("#ut-main-nav .col-md-12");
      const clickedCloseButton = event.target.closest("#ut-main-nav > .js-ut-nav-toggle");

      if (!clickedPanel && !clickedCloseButton) {
        closeMenu();
      }
    });

    const panel = nav.querySelector(".col-md-12");

    if (panel) {
      panel.addEventListener("click", (event) => {
        event.stopPropagation();
      });
    }

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  /* =========================================================
     ### ВСІ СТОРІНКИ ###
     ## Header при скролі ##
     Додає body-клас .ut-header-scrolled,
     коли користувач прокрутив сторінку вниз.
  ========================================================= */

  function initHeaderScrollState() {
    const updateHeaderState = () => {
      document.body.classList.toggle("ut-header-scrolled", window.scrollY > 12);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
  }

  /* =========================================================
     ### ВНУТРІШНІ СТОРІНКИ ###
     ## Спільне меню ##
     На всіх сторінках, крім головної, JS заповнює меню
     однаковими пунктами та додає контакти в меню.
     Головна сторінка залишає своє HTML-меню.
  ========================================================= */

  function initSharedMenuForInnerPages() {
    if (isHomePage()) return;

    const currentPage = getCurrentPage();
    const menuLists = document.querySelectorAll("#ut-main-nav ul");
    if (!menuLists.length) return;

    const menuItems = [
      { href: "index.html", label: "Головна", activeOn: ["index.html", ""] },
      { href: "services.html", label: "Послуги", activeOn: ["services.html"] },
      { href: "porady-zamovnyku.html", label: "Поради", activeOn: ["porady-zamovnyku.html"] },
      { href: "faq.html", label: "FAQ", activeOn: ["faq.html"] },
      { href: "contacts.html", label: "Контакти", activeOn: ["contacts.html"] }
    ];

    menuLists.forEach((menuList) => {
      menuList.innerHTML = menuItems.map((item) => {
        const isActive = item.activeOn.includes(currentPage);
        const ariaCurrent = isActive ? ' aria-current="page"' : "";

        return `
          <li class="${isActive ? "active" : ""}">
            <a href="${item.href}"${ariaCurrent}>
              <span>${item.label}</span>
            </a>
          </li>
        `;
      }).join("");

      const panel = menuList.closest(".col-md-12");

      if (panel && !panel.querySelector(".ut-menu-contacts")) {
        const contacts = document.createElement("div");
        contacts.className = "ut-menu-contacts";

        contacts.innerHTML = `
          <a class="ut-menu-phone" href="${CONFIG.contacts.phoneHref}">
            <i class="bi bi-telephone"></i>
            <span>${CONFIG.contacts.phoneText}</span>
          </a>

          <div class="ut-menu-socials" aria-label="Месенджери">
            <a href="${CONFIG.contacts.telegramHref}" aria-label="Telegram">
              <i class="bi bi-telegram"></i>
              <span>Telegram</span>
            </a>

            <span class="ut-menu-dot" aria-hidden="true"></span>

            <a href="${CONFIG.contacts.viberHref}" aria-label="Viber">
              <i class="bi bi-telephone"></i>
              <span>Viber</span>
            </a>

            <span class="ut-menu-dot" aria-hidden="true"></span>

            <a href="${CONFIG.contacts.whatsappHref}" aria-label="WhatsApp">
              <i class="bi bi-whatsapp"></i>
              <span>WhatsApp</span>
            </a>
          </div>
        `;

        panel.appendChild(contacts);
      }
    });
  }

  /* =========================================================
     ### ВНУТРІШНІ СТОРІНКИ ###
     ## Breadcrumbs / хлібні крихти ##
     Автоматично створює або заповнює .advice-breadcrumbs
     на сторінках послуг, FAQ, контактів і статей порад.
  ========================================================= */

  function initBreadcrumbs() {
    const currentPage = getCurrentPage();

    const breadcrumbsMap = {
      "services.html": [
        { href: "index.html", label: "Головна" },
        { label: "Послуги" }
      ],

      "porady-zamovnyku.html": [
        { href: "index.html", label: "Головна" },
        { label: "Поради замовнику" }
      ],

      "faq.html": [
        { href: "index.html", label: "Головна" },
        { label: "FAQ" }
      ],

      "contacts.html": [
        { href: "index.html", label: "Головна" },
        { label: "Контакти" }
      ],

      "porady-rozetky.html": [
        { href: "index.html", label: "Головна" },
        { href: "porady-zamovnyku.html", label: "Поради замовнику" },
        { label: "Планування розеток" }
      ],

      "porady-osvitlennya.html": [
        { href: "index.html", label: "Головна" },
        { href: "porady-zamovnyku.html", label: "Поради замовнику" },
        { label: "Планування освітлення" }
      ],

      "porady-pered-elektromontazhem.html": [
        { href: "index.html", label: "Головна" },
        { href: "porady-zamovnyku.html", label: "Поради замовнику" },
        { label: "Перед початком робіт" }
      ],

      "porady-yak-pryymaty-roboty.html": [
        { href: "index.html", label: "Головна" },
        { href: "porady-zamovnyku.html", label: "Поради замовнику" },
        { label: "Як приймати роботу" }
      ],

      "porady-typovi-pomylky.html": [
        { href: "index.html", label: "Головна" },
        { href: "porady-zamovnyku.html", label: "Поради замовнику" },
        { label: "Типові помилки" }
      ],

      "porady-pytannya-do-pidryadnyka.html": [
        { href: "index.html", label: "Головна" },
        { href: "porady-zamovnyku.html", label: "Поради замовнику" },
        { label: "Питання до підрядника" }
      ],

      "porady-rezervne-zhyvlennya.html": [
        { href: "index.html", label: "Головна" },
        { href: "porady-zamovnyku.html", label: "Поради замовнику" },
        { label: "Резервне живлення" }
      ]
    };

    const items = breadcrumbsMap[currentPage];
    if (!items) return;

    let target = document.querySelector(".advice-breadcrumbs");

    if (!target) {
      const heroContent = document.querySelector(
        ".advice-article-hero .col-12, " +
        ".advice-hero-section .hero-info-wrap, " +
        ".services-intro-section .hero-info-wrap, " +
        ".services-hero-section .hero-info-wrap, " +
        ".faq-hero-section .hero-info-wrap, " +
        ".contact-hero-section .hero-info-wrap"
      );

      if (!heroContent) return;

      target = document.createElement("nav");
      target.className = "advice-breadcrumbs";
      target.setAttribute("aria-label", "Навігація");
      heroContent.insertBefore(target, heroContent.firstElementChild);
    }

    target.innerHTML = items.map((item, index) => {
      const separator = index === 0 ? "" : "<span>/</span>";
      const isLast = index === items.length - 1;

      const itemHtml = item.href && !isLast
        ? `<a href="${item.href}">${item.label}</a>`
        : `<strong>${item.label}</strong>`;

      return `${separator}${itemHtml}`;
    }).join("");
  }

  /* =========================================================
     ### ВНУТРІШНІ СТОРІНКИ ###
     ## Спільний footer і контактне модальне вікно ##
     На внутрішніх сторінках JS перезаписує footer і modal
     однаковою актуальною інформацією.
     Головна сторінка залишає свій HTML без перезапису.
  ========================================================= */

  function initSharedFooterAndContactModal() {
    if (isHomePage()) return;

    const footer = document.querySelector("footer.footer-urban");

    if (footer) {
      footer.innerHTML = `
        <div class="container">
          <div class="row gy-4 align-items-start">
            <div class="col-12 col-lg-4">
              <div class="footer-brand-wrap">
                <h3 class="footer-brand mb-3">
                  <span class="brand-logo-text">URBAN <span class="highlight">T</span>ECH</span>
                </h3>

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
                <a href="${CONFIG.contacts.phoneHref}" class="footer-link">${CONFIG.contacts.phoneText}</a>
              </div>

              <div class="footer-contact-item">
                <span class="footer-label">Локація</span>
                <p class="footer-text mb-0">Київ та область</p>
              </div>

              <div class="footer-contact-item">
                <span class="footer-label">Email</span>
                <a href="${CONFIG.contacts.emailHref}" class="footer-link">${CONFIG.contacts.emailText}</a>
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

                <a href="${CONFIG.contacts.telegramHref}" class="footer-social" aria-label="Telegram">
                  <i class="bi bi-telegram"></i>
                </a>

                <a href="${CONFIG.contacts.whatsappHref}" class="footer-social" aria-label="WhatsApp">
                  <i class="bi bi-whatsapp"></i>
                </a>

                <a href="${CONFIG.contacts.viberHref}" class="footer-social footer-social--viber" aria-label="Viber">
                  <i class="bi bi-chat-dots"></i>
                </a>
              </div>

              <p class="footer-note mt-3 mb-0">
                Напишіть у зручний месенджер або зателефонуйте — підкажемо оптимальне рішення під ваш об'єкт.
              </p>
            </div>
          </div>

          <div class="footer-bottom text-center">
            <p class="mb-0">
              © 2026
              <span class="brand-logo-text brand-logo-text--inline">URBAN <span class="highlight">T</span>ECH</span>.
              Усі права захищені.
            </p>
          </div>
        </div>
      `;
    }

    const modal = document.getElementById("utContactModal");

    if (modal) {
      modal.innerHTML = `
        <div class="ut-contact-modal__backdrop" data-contact-close></div>

        <div class="ut-contact-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="utContactTitle">
          <button type="button" class="ut-contact-modal__close" data-contact-close aria-label="Закрити">×</button>

          <p class="ut-contact-modal__kicker">
            <span class="brand-logo-text">URBAN <span class="highlight">T</span>ECH</span>
          </p>

          <h2 id="utContactTitle">Зв'язатися з нами</h2>

          <p class="ut-contact-modal__lead">
            Напишіть або зателефонуйте — підкажемо оптимальне рішення під ваш об'єкт.
          </p>

          <div class="ut-contact-list">
            <a href="${CONFIG.contacts.phoneHref}" class="ut-contact-item">
              <i class="bi bi-telephone"></i>
              <span><strong>Телефон</strong>${CONFIG.contacts.phoneText}</span>
            </a>

            <a href="${CONFIG.contacts.emailHref}" class="ut-contact-item">
              <i class="bi bi-envelope"></i>
              <span><strong>Email</strong>${CONFIG.contacts.emailText}</span>
            </a>

            <a href="${CONFIG.contacts.telegramHref}" class="ut-contact-item">
              <i class="bi bi-telegram"></i>
              <span><strong>Telegram</strong>Написати в Telegram</span>
            </a>

            <a href="${CONFIG.contacts.whatsappHref}" class="ut-contact-item">
              <i class="bi bi-whatsapp"></i>
              <span><strong>WhatsApp</strong>Написати у WhatsApp</span>
            </a>

            <a href="${CONFIG.contacts.viberHref}" class="ut-contact-item">
              <i class="bi bi-chat-dots"></i>
              <span><strong>Viber</strong>Написати у Viber</span>
            </a>
          </div>

          <p class="ut-contact-modal__note">
            Київ та область · Електромонтаж · Безпека · Автоматизація
          </p>
        </div>
      `;
    }
  }

  /* =========================================================
     ### ВСІ СТОРІНКИ ###
     ## Анімація логотипу ##
     На hover розбиває текст логотипу на символи
     та запускає хвильову CSS-анімацію.
  ========================================================= */

  function initLogoAnimation() {
    const logo = document.querySelector("header .ut-navbar .logo-text");
    if (!logo) return;

    const originalHTML = logo.innerHTML;

    logo.addEventListener("mouseenter", () => {
      const text = logo.textContent || "";

      logo.innerHTML = text.split("").map((letter) => {
        if (letter === " ") return " ";
        if (letter === "T") return `<span class="highlight">${letter}</span>`;
        return `<span>${letter}</span>`;
      }).join("");

      logo.querySelectorAll("span").forEach((span, index) => {
        span.style.animation = "wave 0.6s ease-in-out forwards";
        span.style.animationDelay = `${index * 0.08}s`;
      });
    });

    logo.addEventListener("mouseleave", () => {
      logo.innerHTML = originalHTML;
    });
  }

  /* =========================================================
     ### ВСІ СТОРІНКИ ###
     ## Contact modal ##
     Відкриває модальне вікно по [data-contact-open].
     Закриває по:
     - [data-contact-close];
     - Escape.
  ========================================================= */

  function initContactModal() {
    const modal = document.getElementById("utContactModal");
    if (!modal) return;

    const openButtons = document.querySelectorAll("[data-contact-open]");
    const closeButtons = modal.querySelectorAll("[data-contact-close]");

    const closeModal = () => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("contact-modal-open");
    };

    const openModal = (event) => {
      if (event) event.preventDefault();

      document.body.classList.remove("menu-show", "menu-closing");

      const navClose = document.querySelector("#ut-main-nav > .js-ut-nav-toggle");
      if (navClose) navClose.classList.remove("show");

      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("contact-modal-open");

      const firstLink = modal.querySelector(".ut-contact-item");

      if (firstLink) {
        window.setTimeout(() => firstLink.focus(), 80);
      }
    };

    openButtons.forEach((button) => {
      button.addEventListener("click", openModal);
    });

    closeButtons.forEach((button) => {
      button.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.classList.contains("is-open")) {
        closeModal();
      }
    });
  }

  /* =========================================================
     ### СТОРІНКА ПОСЛУГ ###
     ## Вкладки послуг, мобільний dropdown і workflow ##
     Відповідає за:
     - перемикання [data-service-tab];
     - показ потрібного [data-service-panel];
     - мобільний список напрямків;
     - скрол до активного блоку на мобільних/планшетах;
     - перемикання [data-workflow-panel].
  ========================================================= */

  function initServicesPageTabs() {
    const tabs = document.querySelectorAll("[data-service-tab]");
    const panels = document.querySelectorAll("[data-service-panel]");
    const workflowPanels = document.querySelectorAll("[data-workflow-panel]");
    const nav = document.querySelector(".services-nav");
    const mobileToggle = document.querySelector("[data-services-mobile-toggle]");
    const mobileLabel = document.querySelector("[data-services-mobile-label]");

    if (!tabs.length || !panels.length) return;

    const isMobileOrTablet = () => {
      return window.innerWidth < 1200;
    };

    const getHeaderOffset = () => {
      const header = document.querySelector("header");
      const headerHeight = header ? header.getBoundingClientRect().height : 0;
      return Math.round(headerHeight + 12);
    };

    const getPanelByKey = (serviceKey) => {
      return Array.from(panels).find((panel) => {
        return panel.getAttribute("data-service-panel") === serviceKey;
      }) || null;
    };

    const activateWorkflow = (serviceKey) => {
      if (!workflowPanels.length) return;

      workflowPanels.forEach((panel) => {
        const isActive = panel.getAttribute("data-workflow-panel") === serviceKey;

        panel.classList.toggle("active", isActive);
        panel.hidden = !isActive;
      });
    };

    const scrollToServicePanel = (serviceKey) => {
      const panel = getPanelByKey(serviceKey);
      const content = document.getElementById("servicesContent");
      const target = panel ? (panel.querySelector(".services-premium-grid") || panel) : content;

      if (!target) return;

      const top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();

      window.scrollTo({
        top: Math.max(0, top),
        behavior: "smooth"
      });
    };

    const setActiveService = (serviceKey, activeTab, shouldScroll) => {
      if (!serviceKey || !activeTab) return;

      tabs.forEach((tab) => {
        tab.classList.toggle("active", tab === activeTab);
      });

      panels.forEach((panel) => {
        panel.classList.toggle(
          "active",
          panel.getAttribute("data-service-panel") === serviceKey
        );
      });

      if (mobileLabel) {
        mobileLabel.textContent = activeTab.textContent.trim();
      }

      if (nav) nav.classList.remove("is-open");

      if (mobileToggle) {
        mobileToggle.setAttribute("aria-expanded", "false");
      }

      activateWorkflow(serviceKey);

      if (
        window.innerWidth < 1200 &&
        window.innerWidth >= 768 &&
        typeof activeTab.scrollIntoView === "function"
      ) {
        activeTab.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest"
        });
      }

      if (shouldScroll && isMobileOrTablet()) {
        window.setTimeout(() => {
          window.requestAnimationFrame(() => {
            scrollToServicePanel(serviceKey);
          });
        }, 330);
      }
    };

    const activeOnLoad = document.querySelector("[data-service-tab].active") || tabs[0];

    if (activeOnLoad) {
      const activeKey = activeOnLoad.getAttribute("data-service-tab");

      if (mobileLabel) {
        mobileLabel.textContent = activeOnLoad.textContent.trim();
      }

      activateWorkflow(activeKey);
    }

    tabs.forEach((tab) => {
      tab.addEventListener("click", (event) => {
        const serviceKey = tab.getAttribute("data-service-tab");

        event.preventDefault();
        setActiveService(serviceKey, tab, isMobileOrTablet());
      });
    });

    if (mobileToggle && nav) {
      mobileToggle.addEventListener("click", (event) => {
        event.preventDefault();

        const isOpen = nav.classList.toggle("is-open");
        mobileToggle.setAttribute("aria-expanded", String(isOpen));
      });

      document.addEventListener("click", (event) => {
        const clickedInsideNav = nav.contains(event.target);
        const clickedToggle = mobileToggle.contains(event.target);

        if (!clickedInsideNav && !clickedToggle) {
          nav.classList.remove("is-open");
          mobileToggle.setAttribute("aria-expanded", "false");
        }
      });
    }
  }

  /* =========================================================
     ### ВСІ СТОРІНКИ ###
     ## Анімація кнопок "Зв'язатися" ##
     Додає клас .ut-contact-premium і керує CSS-змінними
     для живого premium-світіння CTA-кнопок.
  ========================================================= */

  function initContactButtonAnimation() {
    const buttons = document.querySelectorAll(".bttn-more[data-contact-open]");
    if (!buttons.length) return;

    buttons.forEach((button) => {
      button.classList.add("ut-contact-premium");
    });

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      buttons.forEach((button) => {
        button.style.setProperty("--ut-cta-x", "50%");
        button.style.setProperty("--ut-cta-angle", "115deg");
        button.style.setProperty("--ut-cta-glow", "0.30");
        button.style.setProperty("--ut-cta-spot", "0.24");
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
        button.style.setProperty("--ut-cta-x", `${x.toFixed(1)}%`);
        button.style.setProperty("--ut-cta-angle", `${angle.toFixed(1)}deg`);
        button.style.setProperty("--ut-cta-glow", glow.toFixed(3));
        button.style.setProperty("--ut-cta-spot", spot.toFixed(3));
      });

      window.requestAnimationFrame(animateContactButtons);
    };

    window.requestAnimationFrame(animateContactButtons);
  }

  /* =========================================================
     ### ЗАПУСК СКРИПТІВ ###
     ## Тут зібраний порядок запуску всього JS ##
  ========================================================= */

  initUnifiedStylesheet();
  initPreloader();

  onReady(() => {
    initHeroVideoBackground();

    initFullHeightBlocks();
    initBurgerMenu();
    initHeaderScrollState();

    initSharedMenuForInnerPages();
    initBreadcrumbs();
    initSharedFooterAndContactModal();

    initLogoAnimation();
    initContactModal();

    initServicesPageTabs();

    initContactButtonAnimation();
  });
})();
