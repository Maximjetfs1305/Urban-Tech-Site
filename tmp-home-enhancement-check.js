/* test home replacement */
(function () {
  "use strict";
  function run() {
    var block = document.querySelector("#why-us .ut-consult-card");
    if (block) {
      block.className = "services-cta glass-card";
      block.innerHTML = '<div><span>Технічна консультація</span><h2>Отримайте рішення під ваш об’єкт</h2><p>Опишіть задачу.</p></div><a href="#" class="bttn-more bttn-more--gold" data-contact-open>Отримати консультацію</a>';
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run, { once: true });
  else run();
})();
