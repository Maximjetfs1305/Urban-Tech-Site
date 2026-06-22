(function () {
  "use strict";

  var CONTACTS = {
    phoneDisplay: "+38 (075) 663 76 52",
    phoneHref: "tel:+380756637652",
    email: "urban.tech.kyiv@gmail.com",
    instagram: "https://www.instagram.com/urban.tech.kyiv/",
    tiktok: "https://www.tiktok.com/@urban.tech.kyiv",
    telegram: "http://t.me/urban_tech_kyiv",
    viber: "viber://chat?number=%2B380756637652",
    whatsapp: "https://wa.me/380756637652"
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

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }
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

    if (media.play) {
      media.play().catch(function () {});
    }
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
      ".ut-contact-modal__brand{display:block;margin:0 0 14px;color:#fff;font-size:13px;font-weight:800;letter-spacing:2px;text-transform:uppercase;}",
      ".ut-contact-modal__dialog h2{margin:0 0 14px!important;font-size:clamp(34px,4.2vw,44px)!important;line-height:.98!important;letter-spacing:-1.2px!important;}",
      ".ut-contact-modal__dialog>p{max-width:430px;margin:0 0 22px!important;color:rgba(255,255,255,.76)!important;font-size:15px!important;line-height:1.55!important;}",
      ".ut-contact-list{display:grid!important;gap:10px!important;}",
      ".ut-contact-item{display:flex!important;align-items:center!important;gap:14px!important;padding:13px 14px!important;text-decoration:none!important;background:rgba(255,255,255,.035)!important;border:1px solid rgba(255,255,255,.10)!important;}",
      ".ut-contact-item i{flex:0 0 42px!important;width:42px!important;height:42px!important;display:grid!important;place-items:center!important;color:#f4be1b!important;background:rgba(244,190,27,.10)!important;font-size:19px!important;}",
      ".ut-contact-item span{display:flex!important;flex-direction:column!important;align-items:flex-start!important;gap:3px!important;min-width:0!important;}",
      ".ut-contact-item b{display:block!important;color:#fff!important;font-size:13px!important;line-height:1.1!important;font-weight:800!important;letter-spacing:1.5px!important;text-transform:uppercase!important;}",
      ".ut-contact-item small{display:block!important;color:rgba(255,255,255,.78)!important;font-size:15px!important;line-height:1.25!important;}",
      ".ut-contact-modal__footer-note{margin:18px 0 0!important;color:rgba(255,255,255,.64)!important;font-size:13px!important;line-height:1.45!important;}",
      "@media(max-width:575.98px){.ut-contact-modal__dialog{width:min(92vw,540px)!important;padding:30px 22px 26px!important}.ut-contact-modal__dialog h2{font-size:34px!important}.ut-contact-item{padding:12px!important}.ut-contact-item small{font-size:14px!important}}"
    ].join("\n");
    document.head.appendChild(style);
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
      '<a class="ut-contact-item" href="' + CONTACTS.phoneHref + '"><i class="bi bi-telephone"></i><span><b>Телефон</b><small>' + CONTACTS.phoneDisplay + '</small></span></a>',
      '<a class="ut-contact-item" href="mailto:' + CONTACTS.email + '"><i class="bi bi-envelope"></i><span><b>Email</b><small>' + CONTACTS.email + '</small></span></a>',
      '<a class="ut-contact-item" href="' + CONTACTS.telegram + '" target="_blank" rel="noopener"><i class="bi bi-telegram"></i><span><b>Telegram</b><small>Написати в Telegram</small></span></a>',
      '<a class="ut-contact-item" href="' + CONTACTS.viber + '"><i class="bi bi-chat-dots"></i><span><b>Viber</b><small>Написати у Viber</small></span></a>',
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
      if (link.textContent.replace(/\s+/g, " ").trim().match(/^\+?\d|^\+38|^\+ 380/)) {
        link.textContent = CONTACTS.phoneDisplay;
      }
    });

    document.querySelectorAll('a[href^="mailto:"]').forEach(function (link) {
      link.href = "mailto:" + CONTACTS.email;
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

  function initGlobalFooterSocials() {
    document.querySelectorAll(".footer-urban .footer-socials").forEach(function (footer) {
      var instagram = footer.querySelector('a[aria-label="Instagram"]');
      var facebook = footer.querySelector('a[aria-label="Facebook"]');
      var telegram = footer.querySelector('a[aria-label="Telegram"]');
      var whatsapp = footer.querySelector('a[aria-label="WhatsApp"]');
      var tiktok = footer.querySelector('a[aria-label="TikTok"]');

      if (facebook) facebook.remove();
      setExternalLink(instagram, CONTACTS.instagram);
      setExternalLink(telegram, CONTACTS.telegram);
      if (whatsapp) whatsapp.href = CONTACTS.whatsapp;

      if (!tiktok) {
        tiktok = document.createElement("a");
        tiktok.className = "footer-social";
        tiktok.setAttribute("aria-label", "TikTok");
        tiktok.innerHTML = '<i class="bi bi-tiktok"></i>';

        if (instagram && instagram.nextSibling) {
          footer.insertBefore(tiktok, instagram.nextSibling);
        } else {
          footer.insertBefore(tiktok, footer.firstChild);
        }
      }
      setExternalLink(tiktok, CONTACTS.tiktok);
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
    initGlobalContacts();
    initGlobalFooterSocials();
    initContactButtons();
  });
})();
