// URBAN TECH — stable mobile/tablet tab scroll for services page
window.addEventListener('DOMContentLoaded', function () {
  var tabs = document.querySelectorAll('[data-service-tab]');
  var panels = document.querySelectorAll('[data-service-panel]');
  var nav = document.querySelector('.services-nav');
  var mobileToggle = document.querySelector('[data-services-mobile-toggle]');
  var mobileLabel = document.querySelector('[data-services-mobile-label]');

  if (!tabs.length || !panels.length) return;

  var addWorkflowBlock = function () {
    var cta = document.querySelector('.services-cta');
    if (!cta || document.querySelector('.services-workflow')) return;

    var section = document.createElement('section');
    section.className = 'services-workflow glass-card';
    section.innerHTML = '' +
      '<div class="services-workflow__head">' +
        '<span>Як ми працюємо</span>' +
        '<h2>Від першого огляду до підтримки системи</h2>' +
        '<p>Ми ведемо об’єкт поетапно: розбираємось із задачею, підбираємо рішення, монтуємо, налаштовуємо, передаємо систему в роботу та за потреби супроводжуємо її після запуску.</p>' +
      '</div>' +
      '<div class="services-workflow__grid">' +
        '<div class="services-workflow__item"><b>01</b><h3>Огляд об’єкта</h3><p>Вивчаємо задачу, приміщення, існуючі лінії, обладнання та можливі обмеження.</p></div>' +
        '<div class="services-workflow__item"><b>02</b><h3>Підбір рішення</h3><p>Пропонуємо логіку системи, обладнання, кабельні траси та порядок виконання робіт.</p></div>' +
        '<div class="services-workflow__item"><b>03</b><h3>Монтаж</h3><p>Прокладаємо кабелі, монтуємо обладнання, збираємо щити, шафи або вузли підключення.</p></div>' +
        '<div class="services-workflow__item"><b>04</b><h3>Налаштування</h3><p>Перевіряємо лінії, налаштовуємо режими, доступи, сценарії, запис, мережу або автоматику.</p></div>' +
        '<div class="services-workflow__item"><b>05</b><h3>Передача системи</h3><p>Тестуємо роботу, пояснюємо користування та передаємо систему в зрозумілому стані.</p></div>' +
        '<div class="services-workflow__item"><b>06</b><h3>Підтримка</h3><p>Обслуговуємо систему, допомагаємо з налаштуваннями, модернізацією та подальшим розширенням.</p></div>' +
      '</div>';

    cta.parentNode.insertBefore(section, cta);
  };

  addWorkflowBlock();

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
