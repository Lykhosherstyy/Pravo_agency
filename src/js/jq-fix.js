
$(document).ready(function() {
	/*-----animated----------------------------------------*/
	$('.entry-content').addClass("hidden").viewportChecker({
		classToAdd: 'visible animated fadeInLeft',
		offset: 100
		});
	$('.post-item .fr').addClass("hidden").viewportChecker({
		classToAdd: 'visible animated fadeInRight',
		offset: 100
		});
	$('.section-reviews').addClass("hidden").viewportChecker({
		classToAdd: 'visible animated flipInX',
		offset: 100
		});
	$('.section-request').addClass("hidden").viewportChecker({
		classToAdd: 'visible animated zoomIn',
		offset: 100
		});
	$('.footer').addClass("hidden").viewportChecker({
		classToAdd: 'visible animated slideInLeft',
		offset: 100
		});

	/*-----Fixed header----------------------------------------*/
		$(window).scroll(function(){
	  var sticky = $('.mainheader'),
	      scroll = $(window).scrollTop();

	  if (scroll >= 100) sticky.addClass('fixed');
	  else sticky.removeClass('fixed');
	});

	/*-----Mobile menu----------------------------------------*/
	$(".mobile-button").click(function(e) {
        e.preventDefault();
        $(".nav ul").slideToggle(300);
    });
    $(".interest-list").click(function() {
        $(".interest-list ul").slideToggle(200);
    });
});