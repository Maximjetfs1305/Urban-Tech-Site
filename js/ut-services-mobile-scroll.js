// URBAN TECH — stable mobile/tablet tab scroll + workflow panel switching
window.addEventListener('DOMContentLoaded', function () {
  var tabs = document.querySelectorAll('[data-service-tab]');
  var panels = document.querySelectorAll('[data-service-panel]');
  var workflowPanels = document.querySelectorAll('[data-workflow-panel]');
  var nav = document.querySelector('.services-nav');
  var mobileToggle = document.querySelector('[data-services-mobile-toggle]');
  var mobileLabel = document.querySelector('[data-services-mobile-label]');

  if (!tabs.length || !panels.length) return;

  var electroPanel = document.querySelector('[data-service-panel="electro"]');
  var electroGrid = electroPanel ? electroPanel.querySelector('.service-card-grid') : null;

  if (electroGrid) {
    electroGrid.classList.add('service-card-grid--six');
    electroGrid.innerHTML = [
      '<div class="service-step-card" data-step="01"><div class="service-step-card__meta">01 | Проєктування</div><div class="service-step-card__icon"><img class="service-step-card__icon-img" src="assets/icons/electro-planning-icon.png" alt=""></div><h3>Проєктування та планування</h3><p>Продумуємо майбутню систему ще до монтажу: логіку розеток, освітлення, кабельних трас, електрощита, навантажень і резерву під майбутнє розширення.</p><div class="service-step-card__line"></div></div>',
      '<div class="service-step-card" data-step="02"><div class="service-step-card__meta">02 | Монтаж</div><div class="service-step-card__icon"><i class="bi bi-diagram-3"></i></div><h3>Монтаж кабельних трас</h3><p>Прокладаємо силові та слаботочні лінії в гофрі, трубі, кабель-каналі, лотках або штробах. Робимо траси акуратно, логічно та з урахуванням подальшого обслуговування.</p><div class="service-step-card__line"></div></div>',
      '<div class="service-step-card" data-step="03"><div class="service-step-card__meta">03 | Монтаж</div><div class="service-step-card__icon"><i class="bi bi-outlet"></i></div><h3>Монтаж електрофурнітури</h3><p>Встановлюємо розетки, вимикачі, підрозетники, автоматику захисту, електрощити та інші елементи електромережі з правильною логікою підключення.</p><div class="service-step-card__line"></div></div>',
      '<div class="service-step-card" data-step="04"><div class="service-step-card__meta">04 | Монтаж</div><div class="service-step-card__icon"><i class="bi bi-lightbulb"></i></div><h3>Монтаж освітлення</h3><p>Реалізуємо основне, декоративне, технічне, LED- та трекове освітлення. Підключаємо блоки живлення, димери, керування та сценарії світла.</p><div class="service-step-card__line"></div></div>',
      '<div class="service-step-card" data-step="05"><div class="service-step-card__meta">05 | Модернізація</div><div class="service-step-card__icon"><i class="bi bi-graph-up-arrow"></i></div><h3>Модернізація систем</h3><p>Оновлюємо існуючу електрику та слаботочні системи: додаємо нові лінії, переносимо точки, модернізуємо щити, обладнання й готуємо систему до нових задач.</p><div class="service-step-card__line"></div></div>',
      '<div class="service-step-card" data-step="06"><div class="service-step-card__meta">06 | Сервіс</div><div class="service-step-card__icon"><i class="bi bi-activity"></i></div><h3>Діагностика та сервіс</h3><p>Знаходимо несправності, перевіряємо кабелі, живлення, автоматику, з’єднання та обладнання. Допомагаємо привести систему до стабільної роботи.</p><div class="service-step-card__line"></div></div>'
    ].join('');
  }

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

  var activateWorkflow = function (serviceKey) {
    if (!workflowPanels.length) return;

    workflowPanels.forEach(function (panel) {
      var isActive = panel.getAttribute('data-workflow-panel') === serviceKey;
      panel.classList.toggle('active', isActive);
      panel.hidden = !isActive;
    });
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

    activateWorkflow(serviceKey);
  };

  var scrollToServicePanel = function (serviceKey) {
    var panel = getPanelByKey(serviceKey);
    var content = document.getElementById('servicesContent');
    var target = panel ? (panel.querySelector('.service-hero-card') || panel) : content;
    if (!target) return;

    var top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  };

  activateWorkflow('electro');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function (event) {
      var serviceKey = tab.getAttribute('data-service-tab');

      if (!isMobileOrTablet()) {
        window.setTimeout(function () {
          activateWorkflow(serviceKey);
        }, 60);
        return;
      }

      event.preventDefault();
      event.stopImmediatePropagation();

      activateService(serviceKey, tab);

      window.setTimeout(function () {
        window.requestAnimationFrame(function () {
          scrollToServicePanel(serviceKey);
        });
      }, 330);
    }, true);
  });
});