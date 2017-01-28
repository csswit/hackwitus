/*
	Directive by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {
	new WOW().init();
	skel.breakpoints({
		wide: '(max-width: 1680px)',
		normal: '(max-width: 1280px)',
		narrow: '(max-width: 980px)',
		narrower: '(max-width: 840px)',
		mobile: '(max-width: 736px)',
		mobilep: '(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');
			$(".quick-fact").hide();
			$(".typed-text").hide();

			$window.on('load', function() {
				$body.removeClass('is-loading');
				$(".typed-text").fadeIn(2000);
			});

			$window.on('scroll', () => {
					$(".quick-fact").show();
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on narrower.
			skel.on('+narrower -narrower', function() {
				$.prioritize(
					'.important\\28 narrower\\29',
					skel.breakpoint('narrower').active
				);
			});
			$("#welcome-text").typed({
            strings: ["hello.(\"World\");^2000","new WIT(\"Hackathon\");^2000","date = \"March 25-26 2017\";^2000","location = <a href=\"https://goo.gl/maps/qYL4bxWrB5x\">WIT.IraAllen</a>;^2000","hype.isJoined ? <a href=\"https://www.eventbrite.com/e/hackwitus-tickets-31398465656?aff=eac2\">\"Apply\"</a>^1000;"],
            typeSpeed: 50,
						cursorChar: "_",
						loop:false,
        });
				// Add smooth scrolling to all links
	   $("a").on('click', function(event) {

	     // Make sure this.hash has a value before overriding default behavior
	     if (this.hash !== "") {
	       // Prevent default anchor click behavior
	       event.preventDefault();

	       // Store hash
	       var hash = this.hash;

	       // Using jQuery's animate() method to add smooth page scroll
	       // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
	       $('html, body').animate({
	         scrollTop: $(hash).offset().top
	       }, 800, function(){

	         // Add hash (#) to URL when done scrolling (default click behavior)
	         window.location.hash = hash;
	       });
	     } // End if
	   });
	});

})(jQuery);
