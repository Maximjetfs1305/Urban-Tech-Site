(function () {
  "use strict";

  var CONTACTS = {
    phoneDisplay: "+38 (075) 633 76 52",
    phoneHref: "tel:+380756337652",
    email: "urban.tech.kyiv@gmail.com",
    instagram: "https://www.instagram.com/urban.tech.kyiv/",
    tiktok: "https://www.tiktok.com/@urban.tech.kyiv",
    telegram: "http://t.me/urban_tech_kyiv",
    viber: "viber://chat?number=%2B380756337652",
    whatsapp: "https://wa.me/380756337652"
  };

  function onReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
    } else {
      callback();
    }
  }

  function initPreloader() {
    var finish = function () {
      var preloader = document.getElementById("preloader");
      if (!preloader) return;
      preloader.classList.add("is-loaded");
      preloader.style.opacity = "0";
      window.setTimeout(function () {
        preloader.style.display = "none";
      }, 350);
    };

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
  }

  function initMotionBackdrop() {
    if (document.querySelector(".hero-bg-video")) return;

    var media = document.createElement("video");
    media.className = "hero-bg-video";
    media.src = "assets/video/hero-bg.mp4";
    media.autoplay = true;
    media.muted = true;
    media.loop = true;
    media.playsInline = true;
    media.preload = "metadata";
    media.setAttribute("aria-hidden", "true");
    media.setAttribute("tabindex", "-1");

    var shade = document.createElement("div");
    shade.className = "hero-bg-overlay";
    shade.setAttribute("aria-hidden", "true");

    var preloader = document.getElementById("preloader");
    if (preloader && preloader.parentNode) {
      preloader.parentNode.insertBefore(media, preloader.nextSibling);
      preloader.parentNode.insertBefore(shade, media.nextSibling);
    } else {
      document.body.insertBefore(shade, document.body.firstChild);
      document.body.insertBefore(media, shade);
    }

    if (media.play) media.play().catch(function () {});
  }

  function initHeader() {
    var update = function () {
      document.body.classList.toggle("ut-header-scrolled", window.scrollY > 12);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function initMenu() {
    var nav = document.getElementById("ut-main-nav");
    var toggles = document.querySelectorAll(".js-ut-nav-toggle");
    if (!nav || !toggles.length) return;

    var timer = null;
    var getCloseButton = function () {
      return document.querySelector("#ut-main-nav > .js-ut-nav-toggle");
    };

    var openMenu = function () {
      window.clearTimeout(timer);
      document.body.classList.remove("menu-closing");
      document.body.classList.add("menu-show");
      window.setTimeout(function () {
        var button = getCloseButton();
        if (button) button.classList.add("show");
      }, 80);
    };

    var closeMenu = function () {
      if (!document.body.classList.contains("menu-show") || document.body.classList.contains("menu-closing")) return;
      window.clearTimeout(timer);
      document.body.classList.add("menu-closing");
      var button = getCloseButton();
      if (button) button.classList.remove("show");
      timer = window.setTimeout(function () {
        document.body.classList.remove("menu-show", "menu-closing");
      }, 420);
    };

    toggles.forEach(function (toggle) {
      toggle.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (document.body.classList.contains("menu-show")) closeMenu();
        else openMenu();
      });
    });

    nav.addEventListener("click", function (event) {
      var panel = event.target.closest("#ut-main-nav .col-md-12");
      var button = event.target.closest("#ut-main-nav > .js-ut-nav-toggle");
      if (!panel && !button) closeMenu();
    });

    var panel = nav.querySelector(".col-md-12");
    if (panel) {
      panel.addEventListener("click", function (event) {
        event.stopPropagation();
      });
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });
  }

  function initContactModalStyle() {
    if (document.getElementById("ut-global-contact-style")) return;

    var style = document.createElement("style");
    style.id = "ut-global-contact-style";
    style.textContent = [
      ".ut-contact-modal__dialog{max-width:540px!important;padding:38px 34px 34px!important;border:1px solid rgba(244,190,27,.48)!important;background:linear-gradient(135deg,rgba(16,18,22,.96),rgba(20,18,12,.94))!important;}",
      ".ut-contact-modal__brand{display:block!important;margin:0 0 14px!important;color:#fff!important;font-size:13px!important;font-weight:800!important;letter-spacing:2px!important;text-transform:uppercase!important;}",
      ".ut-contact-modal__dialog h2{margin:0 0 14px!important;font-size:clamp(34px,4.2vw,44px)!important;line-height:.98!important;letter-spacing:-1.2px!important;}",
      ".ut-contact-modal__dialog>p{max-width:430px!important;margin:0 0 22px!important;color:rgba(255,255,255,.76)!important;font-size:15px!important;line-height:1.55!important;}",
      ".ut-contact-list{display:grid!important;gap:10px!important;}",
      ".ut-contact-item{display:flex!important;align-items:center!important;gap:14px!important;width:100%!important;padding:13px 14px!important;text-decoration:none!important;background:rgba(255,255,255,.035)!important;border:1px solid rgba(255,255,255,.10)!important;color:#fff!important;}",
      ".ut-contact-item__icon{flex:0 0 42px!important;width:42px!important;height:42px!important;display:grid!important;place-items:center!important;color:#f4be1b!important;background:rgba(244,190,27,.10)!important;font-size:19px!important;}",
      ".ut-contact-item__icon i{display:block!important;color:inherit!important;font-size:19px!important;line-height:1!important;}",
      ".ut-contact-item__content{display:flex!important;flex-direction:column!important;align-items:flex-start!important;justify-content:center!important;gap:3px!important;min-width:0!important;}",
      ".ut-contact-item b{display:block!important;color:#fff!important;font-size:13px!important;line-height:1.1!important;font-weight:800!important;letter-spacing:1.5px!important;text-transform:uppercase!important;}",
      ".ut-contact-item small{display:block!important;color:rgba(255,255,255,.78)!important;font-size:15px!important;line-height:1.25!important;word-break:break-word!important;}",
      ".ut-contact-modal__footer-note{margin:18px 0 0!important;color:rgba(255,255,255,.64)!important;font-size:13px!important;line-height:1.45!important;}",
      "@media(max-width:575.98px){.ut-contact-modal__dialog{width:min(92vw,540px)!important;padding:30px 22px 26px!important}.ut-contact-modal__dialog h2{font-size:34px!important}.ut-contact-item{padding:12px!important}.ut-contact-item small{font-size:14px!important}}"
    ].join("\n");
    document.head.appendChild(style);
  }

  function contactItem(href, iconClass, title, text, external) {
    return [
      '<a class="ut-contact-item" href="' + href + '"' + (external ? ' target="_blank" rel="noopener"' : '') + '>',
      '<span class="ut-contact-item__icon"><i class="bi ' + iconClass + '"></i></span>',
      '<span class="ut-contact-item__content"><b>' + title + '</b><small>' + text + '</small></span>',
      '</a>'
    ].join("");
  }

  function initContactModalTemplate() {
    var modal = document.getElementById("utContactModal");
    if (!modal) return;

    var dialog = modal.querySelector(".ut-contact-modal__dialog");
    if (!dialog) return;

    dialog.innerHTML = [
      '<button class="ut-contact-modal__close" type="button" data-contact-close aria-label="Закрити">×</button>',
      '<span class="ut-contact-modal__brand"><span class="brand-logo-text brand-logo-text--inline">URBAN <span class="highlight">T</span>ECH</span></span>',
      '<h2 id="ut-contact-title">Зв\'язатися з нами</h2>',
      '<p>Напишіть або зателефонуйте — підкажемо оптимальне рішення під ваш об’єкт.</p>',
      '<div class="ut-contact-list">',
      contactItem(CONTACTS.phoneHref, "bi-telephone", "Телефон", CONTACTS.phoneDisplay, false),
      contactItem("mailto:" + CONTACTS.email, "bi-envelope", "Email", CONTACTS.email, false),
      contactItem(CONTACTS.telegram, "bi-telegram", "Telegram", "Написати в Telegram", true),
      contactItem(CONTACTS.viber, "bi-chat-dots", "Viber", "Написати у Viber", false),
      '</div>',
      '<p class="ut-contact-modal__footer-note">Київ та область · Електромонтаж · Безпека · Автоматизація</p>'
    ].join("");
  }

  function initContactModal() {
    var modal = document.getElementById("utContactModal");
    if (!modal) return;

    var closeModal = function () {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("contact-modal-open");
    };

    var openModal = function (event) {
      if (event) event.preventDefault();
      document.body.classList.remove("menu-show", "menu-closing");
      var navClose = document.querySelector("#ut-main-nav > .js-ut-nav-toggle");
      if (navClose) navClose.classList.remove("show");
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("contact-modal-open");
    };

    document.querySelectorAll("[data-contact-open]").forEach(function (button) {
      button.addEventListener("click", openModal);
    });

    modal.querySelectorAll("[data-contact-close]").forEach(function (button) {
      button.addEventListener("click", closeModal);
    });
  }

  function initServicesTabs() {
    var tabs = document.querySelectorAll("[data-service-tab]");
    var panels = document.querySelectorAll("[data-service-panel]");
    var workflows = document.querySelectorAll("[data-workflow-panel]");
    var nav = document.querySelector(".services-nav");
    var mobileToggle = document.querySelector("[data-services-mobile-toggle]");
    var mobileLabel = document.querySelector("[data-services-mobile-label]");
    if (!tabs.length || !panels.length) return;

    var activate = function (key, activeTab) {
      tabs.forEach(function (tab) {
        tab.classList.toggle("active", tab === activeTab);
      });
      panels.forEach(function (panel) {
        panel.classList.toggle("active", panel.getAttribute("data-service-panel") === key);
      });
      workflows.forEach(function (panel) {
        var active = panel.getAttribute("data-workflow-panel") === key;
        panel.classList.toggle("active", active);
        panel.hidden = !active;
      });
      if (mobileLabel) mobileLabel.textContent = activeTab.textContent.trim();
      if (nav) nav.classList.remove("is-open");
      if (mobileToggle) mobileToggle.setAttribute("aria-expanded", "false");
    };

    var activeOnLoad = document.querySelector("[data-service-tab].active") || tabs[0];
    if (activeOnLoad) activate(activeOnLoad.getAttribute("data-service-tab"), activeOnLoad);

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function (event) {
        event.preventDefault();
        activate(tab.getAttribute("data-service-tab"), tab);
      });
    });

    if (mobileToggle && nav) {
      mobileToggle.addEventListener("click", function (event) {
        event.preventDefault();
        var isOpen = nav.classList.toggle("is-open");
        mobileToggle.setAttribute("aria-expanded", String(isOpen));
      });
    }
  }

  function setExternalLink(link, href) {
    if (!link) return;
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener";
  }

  function initGlobalContacts() {
    document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {
      link.href = CONTACTS.phoneHref;
      if (!link.classList.contains("ut-contact-item") && link.textContent.replace(/\s+/g, " ").trim().match(/^\+?\d|^\+38|^\+ 380/)) {
        link.textContent = CONTACTS.phoneDisplay;
      }
      if (link.classList.contains("ut-contact-item")) {
        var phoneSmall = link.querySelector(".ut-contact-item__content small");
        if (phoneSmall) phoneSmall.textContent = CONTACTS.phoneDisplay;
      }
    });

    document.querySelectorAll('a[href^="mailto:"]').forEach(function (link) {
      link.href = "mailto:" + CONTACTS.email;
      if (link.classList.contains("ut-contact-item")) {
        var emailSmall = link.querySelector(".ut-contact-item__content small");
        if (emailSmall) emailSmall.textContent = CONTACTS.email;
        return;
      }
      if (link.textContent.indexOf("@") !== -1) link.textContent = CONTACTS.email;
    });

    document.querySelectorAll('a[href="https://t.me/"], a[href="http://t.me/"], a[href^="https://t.me/"]').forEach(function (link) {
      setExternalLink(link, CONTACTS.telegram);
    });

    document.querySelectorAll('a[href^="viber://chat"]').forEach(function (link) {
      link.href = CONTACTS.viber;
    });

    document.querySelectorAll('a[href^="https://wa.me/"]').forEach(function (link) {
      link.href = CONTACTS.whatsapp;
    });
  }

  function footerSocial(href, label, iconClass) {
    return '<a href="' + href + '" class="footer-social" aria-label="' + label + '" target="_blank" rel="noopener"><i class="bi ' + iconClass + '"></i></a>';
  }

  function initGlobalFooterTemplate() {
    document.querySelectorAll(".footer-urban").forEach(function (footer) {
      footer.classList.add("text-white");
      footer.innerHTML = [
        '<div class="container">',
        '<div class="row gy-4 align-items-start">',
        '<div class="col-12 col-lg-4">',
        '<div class="footer-brand-wrap">',
        '<h3 class="footer-brand mb-3"><span class="brand-logo-text">URBAN <span class="highlight">T</span>ECH</span></h3>',
        '<p class="footer-text mb-0">Сучасні інженерні рішення для житлових, комерційних та промислових об\'єктів. Електромонтаж, системи безпеки, відеоспостереження, СКУД, мережі та автоматизація.</p>',
        '</div>',
        '</div>',
        '<div class="col-12 col-md-6 col-lg-4">',
        '<h5 class="footer-title">Контакти</h5>',
        '<div class="footer-contact-item"><span class="footer-label">Телефон</span><a href="' + CONTACTS.phoneHref + '" class="footer-link">' + CONTACTS.phoneDisplay + '</a></div>',
        '<div class="footer-contact-item"><span class="footer-label">Локація</span><p class="footer-text mb-0">Київ та область</p></div>',
        '<div class="footer-contact-item"><span class="footer-label">Email</span><a href="mailto:' + CONTACTS.email + '" class="footer-link">' + CONTACTS.email + '</a></div>',
        '</div>',
        '<div class="col-12 col-md-6 col-lg-4">',
        '<h5 class="footer-title">Зв\'язок</h5>',
        '<div class="footer-socials">',
        footerSocial(CONTACTS.instagram, "Instagram", "bi-instagram"),
        footerSocial(CONTACTS.tiktok, "TikTok", "bi-tiktok"),
        footerSocial(CONTACTS.telegram, "Telegram", "bi-telegram"),
        footerSocial(CONTACTS.whatsapp, "WhatsApp", "bi-whatsapp"),
        footerSocial(CONTACTS.viber, "Viber", "bi-chat-dots"),
        '</div>',
        '<p class="footer-note mt-3 mb-0">Напишіть у зручний месенджер або зателефонуйте — підкажемо оптимальне рішення під ваш об\'єкт.</p>',
        '</div>',
        '</div>',
        '<div class="footer-bottom text-center">',
        '<p class="mb-0">© 2026 <span class="brand-logo-text brand-logo-text--inline">URBAN <span class="highlight">T</span>ECH</span>. Усі права захищені.</p>',
        '</div>',
        '</div>'
      ].join("");
    });
  }

  function initGlobalFooterSocials() {
    document.querySelectorAll(".footer-urban .footer-socials").forEach(function (footer) {
      var facebook = footer.querySelector('a[aria-label="Facebook"]');
      var instagram = footer.querySelector('a[aria-label="Instagram"]');
      var telegram = footer.querySelector('a[aria-label="Telegram"]');
      var whatsapp = footer.querySelector('a[aria-label="WhatsApp"]');
      var tiktok = footer.querySelector('a[aria-label="TikTok"]');
      var viber = footer.querySelector('a[aria-label="Viber"]');

      if (facebook) facebook.remove();
      setExternalLink(instagram, CONTACTS.instagram);
      setExternalLink(telegram, CONTACTS.telegram);
      setExternalLink(tiktok, CONTACTS.tiktok);
      setExternalLink(whatsapp, CONTACTS.whatsapp);
      setExternalLink(viber, CONTACTS.viber);
    });
  }

  function initContactButtons() {
    document.querySelectorAll(".bttn-more[data-contact-open]").forEach(function (button) {
      button.classList.add("ut-contact-premium");
    });
  }

  initPreloader();

  onReady(function () {
    initMotionBackdrop();
    initHeader();
    initMenu();
    initContactModalStyle();
    initContactModalTemplate();
    initContactModal();
    initServicesTabs();
    initGlobalFooterTemplate();
    initGlobalContacts();
    initGlobalFooterSocials();
    initContactButtons();
  });
})();
