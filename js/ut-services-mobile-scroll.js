// URBAN TECH — stable mobile/tablet tab scroll + workflow panel switching
window.addEventListener('DOMContentLoaded', function () {
  var tabs = document.querySelectorAll('[data-service-tab]');
  var panels = document.querySelectorAll('[data-service-panel]');
  var workflowPanels = document.querySelectorAll('[data-workflow-panel]');
  var nav = document.querySelector('.services-nav');
  var mobileToggle = document.querySelector('[data-services-mobile-toggle]');
  var mobileLabel = document.querySelector('[data-services-mobile-label]');

  if (!tabs.length || !panels.length) return;

  var applyElectroShortCopy = function () {
    var electroPanel = document.querySelector('[data-service-panel="electro"]');
    if (!electroPanel) return;

    var copyByTitle = {
      'Проєктування електромережі': 'Продумуємо електромережу ще до монтажу: навантаження, групи ліній, освітлення, розетки, щитове обладнання, автоматику захисту та резервне живлення. Це допомагає уникнути хаотичної розводки, перевантажень і дорогих переробок після ремонту.',
      'Електромонтажні роботи': 'Виконуємо електромережі 220В як цілісну систему: кабельні траси, силові й освітлювальні лінії, розетки, вимикачі, LED- та трекове освітлення, електрощити, автоматику захисту, інвертори й резервне живлення.',
      'Рішення для різних об’єктів': 'Працюємо з квартирами, приватними будинками, офісами, магазинами, закладами, складами, майстернями та технічними приміщеннями. Підхід адаптуємо під реальні навантаження, формат об’єкта й подальше розширення електромережі.',
      'Готова електросистема': 'Клієнт отримує не просто кабелі, а готову до експлуатації електромережу: логічно зібраний щит, підписані лінії, продумані групи навантаження, акуратний монтаж, захист обладнання та запас на майбутнє.'
    };

    electroPanel.querySelectorAll('.service-info-card').forEach(function (card) {
      var title = card.querySelector('h3');
      var text = card.querySelector('p');
      if (!title || !text) return;

      var value = copyByTitle[title.textContent.trim()];
      if (value) text.textContent = value;
    });
  };

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
    applyElectroShortCopy();
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
  applyElectroShortCopy();

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function (event) {
      var serviceKey = tab.getAttribute('data-service-tab');

      if (!isMobileOrTablet()) {
        window.setTimeout(function () {
          activateWorkflow(serviceKey);
          applyElectroShortCopy();
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
