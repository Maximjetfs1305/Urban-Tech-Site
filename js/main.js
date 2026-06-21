(function () {
  "use strict";

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

  function initContactButtons() {
    document.querySelectorAll(".bttn-more[data-contact-open]").forEach(function (button) {
      button.classList.add("ut-contact-premium");
    });
  }

  initPreloader();

  onReady(function () {
    initHeader();
    initMenu();
    initContactModal();
    initServicesTabs();
    initContactButtons();
  });
})();