(function($) {

	"use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	var burgerMenu = function() {

		$('.js-ut-nav-toggle').on('click', function(event) {
			event.preventDefault();
			var $this = $(this);
			if( $('body').hasClass('menu-show') ) {
				$('body').removeClass('menu-show');
				$('#ut-main-nav > .js-ut-nav-toggle').removeClass('show');
			} else {
				$('body').addClass('menu-show');
				setTimeout(function(){
					$('#ut-main-nav > .js-ut-nav-toggle').addClass('show');
				}, 900);
			}
		})
	};
	burgerMenu();


})(jQuery);
window.addEventListener('load', function () {

	const preloader = document.getElementById('preloader');

	setTimeout(function () {

	  preloader.style.transition = "opacity 0.5s";
	  preloader.style.opacity = "0";

	  setTimeout(function () {
		preloader.style.display = "none";
	  }, 500);

	}, 1000);

  });
  // JS-анімація логотипу
  window.addEventListener('DOMContentLoaded', () => {
	const logo = document.querySelector('header .ut-navbar .logo-text');
	if (!logo) return;

	const originalHTML = logo.innerHTML;

	logo.addEventListener('mouseenter', () => {
	  const text = logo.textContent;
	  logo.innerHTML = text.split('').map(l => {
		if (l === ' ') return ' ';
		if (l === 'T') return `<span class="highlight">${l}</span>`;
		return `<span>${l}</span>`;
	  }).join('');

	  const spans = logo.querySelectorAll('span');
	  spans.forEach((span, i) => {
		span.style.animation = `wave 0.6s ease-in-out forwards`;
		span.style.animationDelay = `${i * 0.08}s`;
	  });
	});

	logo.addEventListener('mouseleave', () => {
	  logo.innerHTML = originalHTML;
	});
  });
  //tabs-services
