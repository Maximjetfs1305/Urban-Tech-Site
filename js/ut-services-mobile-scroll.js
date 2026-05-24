// URBAN TECH — stable mobile/tablet tab scroll for services page
window.addEventListener('DOMContentLoaded', function () {
  var tabs = document.querySelectorAll('[data-service-tab]');
  var panels = document.querySelectorAll('[data-service-panel]');
  var nav = document.querySelector('.services-nav');
  var mobileToggle = document.querySelector('[data-services-mobile-toggle]');
  var mobileLabel = document.querySelector('[data-services-mobile-label]');

  if (!tabs.length || !panels.length) return;

  var isMobileOrTablet = function () {
    return window.innerWidth < 1200;
  };

  var getHeaderOffset = function () {
    var header = document.querySelector('header');
    var headerHeight = header ? header.getBoundingClientRect().height : 0;
    return Math.round(headerHeight + 12);
  };

  var getPanelByKey = function (serviceKey) {
    for (var i = 0; i < panels.length; i += 1) {
      if (panels[i].getAttribute('data-service-panel') === serviceKey) return panels[i];
    }
    return null;
  };

  var activateService = function (serviceKey, activeTab) {
    tabs.forEach(function (item) {
      item.classList.toggle('active', item === activeTab);
    });

    panels.forEach(function (panel) {
      panel.classList.toggle('active', panel.getAttribute('data-service-panel') === serviceKey);
    });

    if (mobileLabel && activeTab) {
      mobileLabel.textContent = activeTab.textContent.trim();
    }

    if (nav) nav.classList.remove('is-open');
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
  };

  var scrollToServicePanel = function (serviceKey) {
    var panel = getPanelByKey(serviceKey);
    var content = document.getElementById('servicesContent');
    var target = panel ? (panel.querySelector('.service-hero-card') || panel) : content;
    if (!target) return;

    var top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  };

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function (event) {
      if (!isMobileOrTablet()) return;

      event.preventDefault();
      event.stopImmediatePropagation();

      var serviceKey = tab.getAttribute('data-service-tab');
      activateService(serviceKey, tab);

      window.setTimeout(function () {
        window.requestAnimationFrame(function () {
          scrollToServicePanel(serviceKey);
        });
      }, 330);
    }, true);
  });
});
