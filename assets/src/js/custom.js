var ss_loc = window.location.href;
var ss_cur_dir = ss_loc.substring(0, ss_loc.lastIndexOf('/'));
var ss_path = window.location.pathname;
var ss_dir = ss_path.split("/");
ss_dir = ss_dir[ss_dir.length-2];
jQuery(function($) {
    // "use strict";



/*----- Preloader ----- */

    $(window).load(function() {
    		setTimeout(function() {
            $('#loading').fadeOut('slow', function() {
            });
        }, 300);
    });


/* --------- Wow Init -------*/

new WOW().init();


/*----------------------------
------- Isotope Init -------
-----------------------------*/

$( window ).load(function() {



var $container = $('.portfolio-container');
    $container.isotope({
        filter: '*'
    });

    $('.portfolio-filter a').on('click', function () {
        $('.portfolio-filter .active').removeClass('active');
        $(this).addClass('active');
        var selector = $(this).attr('data-filter');
        $container.isotope({
                filter: selector,
                animationOptions: {
                        duration: 500,
                        animationEngine: "jquery"
                },
        });
        return false;
    });

    $("#accept-cookies").on('click', function(){
        window.localStorage.setItem('cookie-consent', true);
    });
    if(window.localStorage.getItem('cookie-consent') === null){
        $("#cookie-content").fadeIn();
    }else{
        if(window.localStorage.getItem('cookie-consent') === false){
            $("#cookie-content").fadeIn();
        }
    }


});


});

$("a.internal").on('click', function(){
	if($(".nav-trigger").hasClass('is-active')){
        $(".nav-trigger").trigger('click');
	}
});

// Select all links with hashes
$('a[href*="#"]')
.not('[href="#"]')
.not('[href="#0"]')
.click(function(event) {
	// On-page links
	if (
		location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
		&&
		location.hostname == this.hostname
	) {
		// Figure out element to scroll to
		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		// Does a scroll target exist?
		if (target.length) {
			// Only prevent default if animation is actually gonna happen
			event.preventDefault();
			$('html, body').animate({
				scrollTop: target.offset().top
			}, 1000, function() {
				// Callback after animation
				// Must change focus!
				var $target = $(target);
				$target.focus();
				if ($target.is(":focus")) { // Checking if the target was focused
					return false;
				} else {
					$target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
					$target.focus(); // Set focus again
				};
			});
		}
	}
    });
function slugify(text){
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

function getQueryVariable(variable){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

//nav-trigger remove is-active
if($('.sshare').length){
    $('.sshare').socialshare();
}

function addCategoryHandler(current_elem){
    var category_name = $(current_elem).text().trim();
    if(ss_dir === 'blog'){
        window.location = ss_cur_dir+"/../blog-category.html?category="+slugify(category_name);
    }else{
        window.location = ss_cur_dir+"/blog-category.html?category="+slugify(category_name);
    }
}


function toggleDesktopTabindex(mq) {
    if (mq.matches) { // If media query matches
		$("#desktop-home").attr('tabindex', -1);
    } else {
        $("#desktop-home").attr('tabindex', 0);
    }
}

var desktop_mq = window.matchMedia("(max-width: 800px)");
toggleDesktopTabindex(desktop_mq);
desktop_mq.addListener(toggleDesktopTabindex) ;


function toggleMobileTabindex(mq) {
    if (mq.matches) { // If media query matches
        $("#mobile-home").attr('tabindex', 0);
    } else {
        $("#mobile-home").attr('tabindex', -1);
    }
}

var mobile_mq = window.matchMedia("(max-width: 800px)");
toggleMobileTabindex(mobile_mq);
mobile_mq.addListener(toggleMobileTabindex) ;

// Listen to tab events to enable outlines (accessibility improvement)
document.body.addEventListener('keyup', function(e) {
    if (e.which === 9) /* tab */ {
        document.documentElement.classList.remove('no-focus-outline');
    }
});


