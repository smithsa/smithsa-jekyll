jQuery(document).ready(function($){
	var $lateral_menu_trigger = $('.nav-trigger'),
		$content_wrapper = $('.main');

	//open-close lateral menu clicking on the menu icon
	$lateral_menu_trigger.on('click', function(event){
		event.preventDefault();

		$lateral_menu_trigger.toggleClass('is-active');
		$content_wrapper.toggleClass('is-active').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			// firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
			$('body').toggleClass('overflow-hidden');
		});
		$('.menu').toggleClass('is-active');

		if($('.menu').hasClass('is-active')){
			$("#nav-trigger").attr({'aria-expanded': true, "aria-pressed": true});
			$(".menu a").attr({'tabindex': 0});
		}else{
            $("#nav-trigger").attr({'aria-expanded': false, "aria-pressed": false});
            $(".menu a").attr({'tabindex': -1});
		}

		//check if transitions are not supported - i.e. in IE9
		if($('html').hasClass('no-csstransitions')) {
			$('body').toggleClass('overflow-hidden');
		}
	});

	//close lateral menu clicking outside the menu itself
	$content_wrapper.on('mouseover', function(event){
		if( !$(event.target).is('.nav-trigger, .nav-trigger span') ) {
			$lateral_menu_trigger.removeClass('is-active');
			$content_wrapper.removeClass('is-active').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').removeClass('overflow-hidden');
			});
			$('.menu').removeClass('is-active');
			//check if transitions are not supported
			if($('html').hasClass('no-csstransitions')) {
				$('body').removeClass('overflow-hidden');
			}

		}
	});
});
