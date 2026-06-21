(function () {
  "use strict";

  const MAIN_CSS = "css/urban-tech.css";
  const MENU_CSS = "css/ut-global-menu-fix.css";
  const LEGACY_CSS = [
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
  ];

  const page = () => window.location.pathname.split("/").pop() || "index.html";
  const isHome = () => page() === "index.html" || page() === "";
  const ready = (fn) => document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", fn, { once: true }) : fn();
  const normalize = (href) => {
    try { return new URL(href || "", window.location.href).pathname.replace(/^\//, ""); }
    catch (e) { return (href || "").replace(/^\//, ""); }
  };

  function ensureCss(href, attr) {
    const exists = Array.from(document.querySelectorAll('link[rel~="stylesheet"]')).some((link) => normalize(link.getAttribute("href")) === normalize(href));
    if (exists) return document.querySelector(`link[href="${href}"]`);
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    if (attr) link.setAttribute(attr, "true");
    document.head.appendChild(link);
    return link;
  }

  function initCss() {
    const main = ensureCss(MAIN_CSS, "data-urban-tech-main-css");
    ensureCss(MENU_CSS, "data-urban-tech-menu-css");
    const legacy = new Set(LEGACY_CSS.map(normalize));
    const removeLegacy = () => {
      document.querySelectorAll('link[rel~="stylesheet"]').forEach((link) => {
        if (legacy.has(normalize(link.getAttribute("href")))) link.remove();
      });
    };
    try {
      if (main && main.sheet) removeLegacy();
      else if (main) main.addEventListener("load", removeLegacy, { once: true });
    } catch (error) {
      if (main) main.addEventListener("load", removeLegacy, { once: true });
    }
  }

  function initPreloader() {
    const hide = () => {
      const preloader = document.getElementById("preloader");
      if (!preloader) return;
      const remove = () => { preloader.style.display = "none"; };
      preloader.style.transition = "opacity 0.18s ease";
      preloader.style.opacity = "0";
      preloader.addEventListener("transitionend", remove, { once: true });
      window.setTimeout(remove, 350);
    };
    document.readyState === "complete" ? hide() : window.addEventListener("load", hide, { once: true });
  }

  function initHeroVideo() {
    if (!document.body || document.querySelector(".hero-bg-video")) return;
    const video = document.createElement("video");
    video.className = "hero-bg-video";
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.poster = "assets/img/hero-poster.jpg";
    video.tabIndex = -1;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("preload", "metadata");
    video.setAttribute("aria-hidden", "true");
    const source = document.createElement("source");
    source.src = "assets/video/hero-bg.mp4";
    source.type = "video/mp4";
    video.appendChild(source);
    const overlay = document.createElement("div");
    overlay.className = "hero-bg-overlay";
    overlay.setAttribute("aria-hidden", "true");
    document.body.insertBefore(overlay, document.body.firstChild);
    document.body.insertBefore(video, overlay);
    const play = () => { const p = video.play(); if (p && p.catch) p.catch(() => {}); };
    document.readyState === "complete" ? play() : window.addEventListener("load", play, { once: true });
  }

  function initFullHeight() {
    const blocks = document.querySelectorAll(".js-fullheight");
    if (!blocks.length) return;
    const set = () => blocks.forEach((block) => { block.style.height = `${window.innerHeight}px`; });
    set();
    window.addEventListener("resize", set);
  }

  function initMenu() {
    const nav = document.getElementById("ut-main-nav");
    const toggles = document.querySelectorAll(".js-ut-nav-toggle");
    if (!nav || !toggles.length) return;
    let timer = null;
    const closeButton = () => document.querySelector("#ut-main-nav > .js-ut-nav-toggle");
    const open = () => {
      clearTimeout(timer);
      document.body.classList.remove("menu-closing");
      document.body.classList.add("menu-show");
      setTimeout(() => { const button = closeButton(); if (button) button.classList.add("show"); }, 80);
    };
    const close = () => {
      if (!document.body.classList.contains("menu-show") || document.body.classList.contains("menu-closing")) return;
      clearTimeout(timer);
      document.body.classList.add("menu-closing");
      const button = closeButton();
      if (button) button.classList.remove("show");
      timer = setTimeout(() => document.body.classList.remove("menu-show", "menu-closing"), 420);
    };
    toggles.forEach((toggle) => toggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      document.body.classList.contains("menu-show") ? close() : open();
    }));
    nav.addEventListener("click", (event) => {
      const panel = event.target.closest("#ut-main-nav .col-md-12");
      const button = event.target.closest("#ut-main-nav > .js-ut-nav-toggle");
      if (!panel && !button) close();
    });
    const panel = nav.querySelector(".col-md-12");
    if (panel) panel.addEventListener("click", (event) => event.stopPropagation());
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") close(); });
  }

  function initHeader() {
    const set = () => document.body.classList.toggle("ut-header-scrolled", window.scrollY > 12);
    set();
    window.addEventListener("scroll", set, { passive: true });
  }

  function initSharedMenu() {
    if (isHome()) return;
    const items = [
      ["index.html", "Головна", ["index.html", ""]],
      ["services.html", "Послуги", ["services.html"]],
      ["porady-zamovnyku.html", "Поради", ["porady-zamovnyku.html"]],
      ["faq.html", "FAQ", ["faq.html"]],
      ["contacts.html", "Контакти", ["contacts.html"]]
    ];
    document.querySelectorAll("#ut-main-nav ul").forEach((menu) => {
      menu.innerHTML = items.map(([href, label, activeOn]) => {
        const active = activeOn.includes(page());
        return `<li class="${active ? "active" : ""}"><a href="${href}"${active ? ' aria-current="page"' : ""}><span>${label}</span></a></li>`;
      }).join("");
    });
  }

  function initBreadcrumbs() {
    const map = {
      "services.html": [["index.html", "Головна"], ["", "Послуги"]],
      "porady-zamovnyku.html": [["index.html", "Головна"], ["", "Поради замовнику"]],
      "faq.html": [["index.html", "Головна"], ["", "FAQ"]],
      "contacts.html": [["index.html", "Головна"], ["", "Контакти"]]
    };
    const items = map[page()];
    if (!items) return;
    let target = document.querySelector(".advice-breadcrumbs");
    if (!target) {
      const hero = document.querySelector(".services-intro-section .hero-info-wrap, .faq-hero-section .hero-info-wrap, .contact-hero-section .hero-info-wrap, .advice-hero-section .hero-info-wrap, .advice-article-hero .col-12");
      if (!hero) return;
      target = document.createElement("nav");
      target.className = "advice-breadcrumbs";
      target.setAttribute("aria-label", "Навігація");
      hero.insertBefore(target, hero.firstElementChild);
    }
    target.innerHTML = items.map(([href, label], index) => `${index ? "<span>/</span>" : ""}${href && index !== items.length - 1 ? `<a href="${href}">${label}</a>` : `<strong>${label}</strong>`}`).join("");
  }

  function initContactModal() {
    const modal = document.getElementById("utContactModal");
    if (!modal) return;
    const close = () => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("contact-modal-open");
    };
    const open = (event) => {
      if (event) event.preventDefault();
      document.body.classList.remove("menu-show", "menu-closing");
      const navClose = document.querySelector("#ut-main-nav > .js-ut-nav-toggle");
      if (navClose) navClose.classList.remove("show");
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("contact-modal-open");
    };
    document.querySelectorAll("[data-contact-open]").forEach((button) => button.addEventListener("click", open));
    modal.querySelectorAll("[data-contact-close]").forEach((button) => button.addEventListener("click", close));
    document.addEventListener("keydown", (event) => { if (event.key === "Escape" && modal.classList.contains("is-open")) close(); });
  }

  function initServicesTabs() {
    const tabs = document.querySelectorAll("[data-service-tab]");
    const panels = document.querySelectorAll("[data-service-panel]");
    const workflows = document.querySelectorAll("[data-workflow-panel]");
    const nav = document.querySelector(".services-nav");
    const mobileToggle = document.querySelector("[data-services-mobile-toggle]");
    const mobileLabel = document.querySelector("[data-services-mobile-label]");
    if (!tabs.length || !panels.length) return;
    const activate = (key, activeTab, shouldScroll) => {
      tabs.forEach((tab) => tab.classList.toggle("active", tab === activeTab));
      panels.forEach((panel) => panel.classList.toggle("active", panel.getAttribute("data-service-panel") === key));
      workflows.forEach((panel) => {
        const active = panel.getAttribute("data-workflow-panel") === key;
        panel.classList.toggle("active", active);
        panel.hidden = !active;
      });
      if (mobileLabel) mobileLabel.textContent = activeTab.textContent.trim();
      if (nav) nav.classList.remove("is-open");
      if (mobileToggle) mobileToggle.setAttribute("aria-expanded", "false");
      if (shouldScroll && window.innerWidth < 1200) {
        const panel = Array.from(panels).find((item) => item.getAttribute("data-service-panel") === key);
        const target = panel ? panel.querySelector(".services-premium-grid") || panel : document.getElementById("servicesContent");
        const header = document.querySelector("header");
        const offset = Math.round((header ? header.getBoundingClientRect().height : 0) + 12);
        if (target) setTimeout(() => window.scrollTo({ top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset), behavior: "smooth" }), 330);
      }
    };
    const activeOnLoad = document.querySelector("[data-service-tab].active") || tabs[0];
    if (activeOnLoad) {
      const key = activeOnLoad.getAttribute("data-service-tab");
      if (mobileLabel) mobileLabel.textContent = activeOnLoad.textContent.trim();
      workflows.forEach((panel) => {
        const active = panel.getAttribute("data-workflow-panel") === key;
        panel.classList.toggle("active", active);
        panel.hidden = !active;
      });
    }
    tabs.forEach((tab) => tab.addEventListener("click", (event) => {
      event.preventDefault();
      activate(tab.getAttribute("data-service-tab"), tab, true);
    }));
    if (mobileToggle && nav) {
      mobileToggle.addEventListener("click", (event) => {
        event.preventDefault();
        const open = nav.classList.toggle("is-open");
        mobileToggle.setAttribute("aria-expanded", String(open));
      });
      document.addEventListener("click", (event) => {
        if (!nav.contains(event.target) && !mobileToggle.contains(event.target)) {
          nav.classList.remove("is-open");
          mobileToggle.setAttribute("aria-expanded", "false");
        }
      });
    }
  }

  function initLogoAnimation() {
    const logo = document.querySelector("header .ut-navbar .logo-text");
    if (!logo) return;
    const original = logo.innerHTML;
    logo.addEventListener("mouseenter", () => {
      const text = logo.textContent || "";
      logo.innerHTML = text.split("").map((letter) => letter === " " ? " " : letter === "T" ? `<span class="highlight">${letter}</span>` : `<span>${letter}</span>`).join("");
      logo.querySelectorAll("span").forEach((span, index) => {
        span.style.animation = "wave 0.6s ease-in-out forwards";
        span.style.animationDelay = `${index * 0.08}s`;
      });
    });
    logo.addEventListener("mouseleave", () => { logo.innerHTML = original; });
  }

  function initContactButtons() {
    document.querySelectorAll(".bttn-more[data-contact-open]").forEach((button) => button.classList.add("ut-contact-premium"));
  }

  initCss();
  initPreloader();

  ready(() => {
    initHeroVideo();
    initFullHeight();
    initMenu();
    initHeader();
    initSharedMenu();
    initBreadcrumbs();
    initLogoAnimation();
    initContactModal();
    initServicesTabs();
    initContactButtons();
  });
})();
