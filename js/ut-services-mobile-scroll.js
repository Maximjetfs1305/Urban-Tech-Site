// URBAN TECH — stable mobile/tablet tab scroll + workflow panel switching
window.addEventListener('DOMContentLoaded', function () {
  var tabs = document.querySelectorAll('[data-service-tab]');
  var panels = document.querySelectorAll('[data-service-panel]');
  var workflowPanels = document.querySelectorAll('[data-workflow-panel]');
  var nav = document.querySelector('.services-nav');
  var mobileToggle = document.querySelector('[data-services-mobile-toggle]');
  var mobileLabel = document.querySelector('[data-services-mobile-label]');

  if (!tabs.length || !panels.length) return;

  var ensureMissingWorkflowPanels = function () {
    var workflowMount = document.querySelector('.services-cta');
    var workflowTemplates = {
      security: '<div class="services-workflow__head"><span>Як ми працюємо</span><h2>Як ми працюємо з охоронними системами</h2><p>Система безпеки має бути не просто змонтована, а правильно продумана: зони контролю, логіка тривоги, живлення, сценарії спрацювання та зручне користування.</p></div><div class="services-workflow__grid"><div class="services-workflow__item"><b>01</b><h3>Оцінка ризиків</h3><p>Оцінюємо входи, вікна, проходи, технічні зони, можливі шляхи проникнення та критичні точки об’єкта.</p></div><div class="services-workflow__item"><b>02</b><h3>Підбір обладнання</h3><p>Підбираємо датчики, сирени, клавіатури, контрольну панель, резервне живлення та логіку зон.</p></div><div class="services-workflow__item"><b>03</b><h3>Монтаж системи</h3><p>Монтуємо датчики, прокладаємо нові або використовуємо існуючі лінії, підключаємо обладнання та живлення.</p></div><div class="services-workflow__item"><b>04</b><h3>Налаштування зон</h3><p>Програмуємо зони, затримки, тривоги, користувачів, сценарії постановки та зняття з охорони.</p></div><div class="services-workflow__item"><b>05</b><h3>Тестування</h3><p>Перевіряємо кожен датчик, сирену, індикацію, тривожні сценарії та пояснюємо клієнту користування системою.</p></div><div class="services-workflow__item"><b>06</b><h3>Обслуговування</h3><p>Обслуговуємо та підтримуємо систему: додаємо датчики, оновлюємо налаштування, перевіряємо живлення й стабільність роботи.</p></div></div>',
      video: '<div class="services-workflow__head"><span>Як ми працюємо</span><h2>Як ми працюємо з відеоспостереженням</h2><p>Відеонагляд має давати корисну картинку, а не просто “камери на стіні”: важливі зони огляду, якість запису, архів, доступи та стабільна мережа.</p></div><div class="services-workflow__grid"><div class="services-workflow__item"><b>01</b><h3>Огляд зон</h3><p>Визначаємо, які зони потрібно контролювати: входи, периметр, каси, склад, двір, паркування або технічні приміщення.</p></div><div class="services-workflow__item"><b>02</b><h3>Підбір камер</h3><p>Підбираємо тип камер, кути огляду, роздільну здатність, нічне бачення, реєстратор і потрібний обсяг архіву.</p></div><div class="services-workflow__item"><b>03</b><h3>Прокладка ліній</h3><p>Прокладаємо кабель, підводимо лінії до шафи або реєстратора, герметизуємо зовнішні з’єднання.</p></div><div class="services-workflow__item"><b>04</b><h3>Монтаж і ракурс</h3><p>Монтуємо камери, виставляємо напрямки огляду, прибираємо сліпі зони та перевіряємо якість зображення.</p></div><div class="services-workflow__item"><b>05</b><h3>Запис і доступ</h3><p>Налаштовуємо NVR/DVR, архів, час, користувачів, мобільний перегляд і рівні доступу.</p></div><div class="services-workflow__item"><b>06</b><h3>Сервіс відео</h3><p>Обслуговуємо та підтримуємо систему: допомагаємо з доступом, заміною камер, очищенням об’єктивів і розширенням архіву.</p></div></div>',
      access: '<div class="services-workflow__head"><span>Як ми працюємо</span><h2>Як ми працюємо із СКУД</h2><p>Контроль доступу має бути зручним для людей і зрозумілим для адміністратора: замки, зчитувачі, права доступу, графіки та база користувачів працюють як одна система.</p></div><div class="services-workflow__grid"><div class="services-workflow__item"><b>01</b><h3>Аналіз проходів</h3><p>Визначаємо двері, турнікети, хвіртки, службові зони та сценарії входу й виходу.</p></div><div class="services-workflow__item"><b>02</b><h3>Підбір обладнання</h3><p>Підбираємо контролери, зчитувачі, замки, кнопки виходу, доводчики, блоки живлення та резервування.</p></div><div class="services-workflow__item"><b>03</b><h3>Монтаж вузлів</h3><p>Монтуємо замки, зчитувачі, кнопки, контролери, прокладаємо кабелі та підключаємо живлення.</p></div><div class="services-workflow__item"><b>04</b><h3>Програмування</h3><p>Створюємо користувачів, групи, карти, брелоки, графіки доступу та права для різних зон.</p></div><div class="services-workflow__item"><b>05</b><h3>Перевірка доступу</h3><p>Тестуємо відкриття, аварійні сценарії, живлення, права користувачів і передаємо систему в роботу.</p></div><div class="services-workflow__item"><b>06</b><h3>Підтримка СКУД</h3><p>Обслуговуємо та підтримуємо систему: додаємо користувачів, змінюємо права, відновлюємо доступи та розширюємо точки проходу.</p></div></div>',
      smart: '<div class="services-workflow__head"><span>Як ми працюємо</span><h2>Як ми працюємо зі Smart Home</h2><p>Smart Home має бути не набором окремих пристроїв, а логічною системою, де освітлення, клімат, безпека, датчики та сценарії працюють зручно для власника.</p></div><div class="services-workflow__grid"><div class="services-workflow__item"><b>01</b><h3>Сценарії клієнта</h3><p>Обговорюємо, що саме потрібно автоматизувати: світло, клімат, штори, безпеку, датчики або нічні режими.</p></div><div class="services-workflow__item"><b>02</b><h3>Архітектура системи</h3><p>Підбираємо платформу, модулі, датчики, виконавчі пристрої, живлення та логіку взаємодії систем.</p></div><div class="services-workflow__item"><b>03</b><h3>Підготовка ліній</h3><p>Прокладаємо потрібні кабелі, готуємо місця під модулі, щити, датчики та кнопки керування.</p></div><div class="services-workflow__item"><b>04</b><h3>Монтаж пристроїв</h3><p>Встановлюємо модулі, сенсори, реле, контролери та інтегруємо їх з електрикою й іншими системами.</p></div><div class="services-workflow__item"><b>05</b><h3>Налаштування сценаріїв</h3><p>Створюємо режими, автоматичні дії, групи керування, доступи та перевіряємо роботу сценаріїв.</p></div><div class="services-workflow__item"><b>06</b><h3>Підтримка Smart Home</h3><p>Обслуговуємо та підтримуємо систему: додаємо сценарії, оновлюємо налаштування та розширюємо автоматизацію.</p></div></div>',
      network: '<div class="services-workflow__head"><span>Як ми працюємо</span><h2>Як ми працюємо з мережами та Wi‑Fi</h2><p>Стабільна мережа — це основа для інтернету, камер, СКУД, Smart Home і робочих місць. Ми продумуємо не тільки кабель, а всю мережеву інфраструктуру.</p></div><div class="services-workflow__grid"><div class="services-workflow__item"><b>01</b><h3>Аналіз покриття</h3><p>Вивчаємо площу, стіни, технічні зони, робочі місця, камери, точки доступу та обладнання.</p></div><div class="services-workflow__item"><b>02</b><h3>План мережі</h3><p>Плануємо кабельні лінії, Wi‑Fi точки, комутаційну шафу, патч-панелі, живлення та резерв.</p></div><div class="services-workflow__item"><b>03</b><h3>Прокладка кабелю</h3><p>Прокладаємо виту пару, маркуємо лінії, готуємо розетки RJ‑45, патч-панелі та місця під обладнання.</p></div><div class="services-workflow__item"><b>04</b><h3>Монтаж обладнання</h3><p>Встановлюємо комутатори, точки доступу, роутери, шафи, організовуємо патчинг і живлення.</p></div><div class="services-workflow__item"><b>05</b><h3>Налаштування мережі</h3><p>Налаштовуємо Wi‑Fi, гостьові мережі, доступи, адресацію, перевіряємо швидкість і стабільність.</p></div><div class="services-workflow__item"><b>06</b><h3>Підтримка мережі</h3><p>Обслуговуємо та підтримуємо мережу: додаємо точки доступу, замінюємо обладнання та розширюємо інфраструктуру.</p></div></div>',
      service: '<div class="services-workflow__head"><span>Як ми працюємо</span><h2>Як ми працюємо з сервісом і модернізацією</h2><p>Коли система вже встановлена, важливо швидко знайти причину проблеми, відновити стабільну роботу й залишити об’єкт зрозумілим для подальшого обслуговування.</p></div><div class="services-workflow__grid"><div class="services-workflow__item"><b>01</b><h3>Збір інформації</h3><p>Уточнюємо симптоми, історію системи, які вузли працюють некоректно, які зміни були на об’єкті та хто має доступ.</p></div><div class="services-workflow__item"><b>02</b><h3>Діагностика</h3><p>Перевіряємо живлення, кабелі, обладнання, налаштування, мережу, доступи та фізичний стан системи.</p></div><div class="services-workflow__item"><b>03</b><h3>Пошук рішення</h3><p>Визначаємо, що потрібно: ремонт, заміна, перепідключення, переналаштування або модернізація.</p></div><div class="services-workflow__item"><b>04</b><h3>Відновлення роботи</h3><p>Виконуємо ремонт, заміну блоків, відновлення доступів, перепідключення або налаштування обладнання.</p></div><div class="services-workflow__item"><b>05</b><h3>Перевірка результату</h3><p>Тестуємо роботу системи, перевіряємо стабільність і пояснюємо клієнту, що було зроблено.</p></div><div class="services-workflow__item"><b>06</b><h3>Подальша підтримка</h3><p>Обслуговуємо та підтримуємо систему: допомагаємо з оновленнями, модернізацією, розширенням і профілактикою.</p></div></div>'
    };

    Object.keys(workflowTemplates).forEach(function (key) {
      if (document.querySelector('[data-workflow-panel="' + key + '"]')) return;

      var section = document.createElement('section');
      section.className = 'services-workflow glass-card';
      section.setAttribute('data-workflow-panel', key);
      section.hidden = true;
      section.innerHTML = workflowTemplates[key];

      if (workflowMount && workflowMount.parentNode) {
        workflowMount.parentNode.insertBefore(section, workflowMount);
      }
    });

    workflowPanels = document.querySelectorAll('[data-workflow-panel]');
  };

  ensureMissingWorkflowPanels();

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
