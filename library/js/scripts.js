/*
 * Bones Scripts File
 * Author: Eddie Machado
 *
 * This file should contain any js scripts you want to add to the site.
 * Instead of calling it in the header or throwing it inside wp_head()
 * this file will be called automatically in the footer so as not to
 * slow the page load.
 *
 * There are a lot of example functions and tools in here. If you don't
 * need any of it, just remove it. They are meant to be helpers and are
 * not required. It's your world baby, you can do whatever you want.
*/


/*
 * Get Viewport Dimensions
 * returns object with viewport dimensions to match css in width and height properties
 * ( source: http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript )
*/
function updateViewportDimensions() {
	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
	return { width:x,height:y };
}
// setting the viewport width
var viewport = updateViewportDimensions();


/*
 * Throttle Resize-triggered Events
 * Wrap your actions in this function to throttle the frequency of firing them off, for better performance, esp. on mobile.
 * ( source: http://stackoverflow.com/questions/2854407/javascript-jquery-window-resize-how-to-fire-after-the-resize-is-completed )
*/
var waitForFinalEvent = (function () {
	var timers = {};
	return function (callback, ms, uniqueId) {
		if (!uniqueId) { uniqueId = "Don't call this twice without a uniqueId"; }
		if (timers[uniqueId]) { clearTimeout (timers[uniqueId]); }
		timers[uniqueId] = setTimeout(callback, ms);
	};
})();

// how long to wait before deciding the resize has stopped, in ms. Around 50-100 should work ok.
var timeToWaitForLast = 100;


/*
 * Here's an example so you can see how we're using the above function
 *
 * This is commented out so it won't work, but you can copy it and
 * remove the comments.
 *
 *
 *
 * If we want to only do it on a certain page, we can setup checks so we do it
 * as efficient as possible.
 *
 * if( typeof is_home === "undefined" ) var is_home = $('body').hasClass('home');
 *
 * This once checks to see if you're on the home page based on the body class
 * We can then use that check to perform actions on the home page only
 *
 * When the window is resized, we perform this function
 * $(window).resize(function () {
 *
 *    // if we're on the home page, we wait the set amount (in function above) then fire the function
 *    if( is_home ) { waitForFinalEvent( function() {
 *
 *	// update the viewport, in case the window size has changed
 *	viewport = updateViewportDimensions();
 *
 *      // if we're above or equal to 768 fire this off
 *      if( viewport.width >= 768 ) {
 *        console.log('On home page and window sized to 768 width or more.');
 *      } else {
 *        // otherwise, let's do this instead
 *        console.log('Not on home page, or window sized to less than 768.');
 *      }
 *
 *    }, timeToWaitForLast, "your-function-identifier-string"); }
 * });
 *
 * Pretty cool huh? You can create functions like this to conditionally load
 * content and other stuff dependent on the viewport.
 * Remember that mobile devices and javascript aren't the best of friends.
 * Keep it light and always make sure the larger viewports are doing the heavy lifting.
 *
*/

/*
 * We're going to swap out the gravatars.
 * In the functions.php file, you can see we're not loading the gravatar
 * images on mobile to save bandwidth. Once we hit an acceptable viewport
 * then we can swap out those images since they are located in a data attribute.
*/
function loadGravatars() {
  // set the viewport using the function above
  viewport = updateViewportDimensions();
  // if the viewport is tablet or larger, we load in the gravatars
  if (viewport.width >= 768) {
  jQuery('.comment img[data-gravatar]').each(function(){
    jQuery(this).attr('src',jQuery(this).attr('data-gravatar'));
  });
	}
} // end function


/*
 * Put all your regular jQuery in here.
*/
jQuery(document).ready(function($) {
	var win = $(window);
	var scrolling = false;
	var initialScroll = true;
	
	console.log(window.GoogleAnalyticsObject)
	
	$('#contact .contact > a, #contact .ratesheet > a').click(function() {
		var downloadType = $(this).parent().hasClass('contact') ? 'vCard' : 'Rate Sheet';
		console.log(downloadType);
		ga('send', 'event', 'link', 'download', downloadType);
	});

    if (typeof isHomePage === "undefined") { isHomePage = $('body').hasClass('home') };
    /*
    * Let's fire off the gravatar function
    * You can remove this if you don't need it
    */
    loadGravatars();
	
	$('.TRIGGER_NAV_OV').click(function(e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$('body').toggleClass('lock');
		var ov = $('.NAV_OV');
		ov.toggleClass('open');
	});
	$('.NAV_OV a').click(function(e) {
		e.preventDefault();
		scrollToSection($($(this).attr('href')));
		$('.TRIGGER_NAV_OV').click();
	});
	
	win.resize(function () {
		if (isHomePage) {
			studioImageMobileAdjustment();
		}
		waitForFinalEvent( function() {
			adminBarMove = $('#wpadminbar').outerHeight()-1;
			mobileDeviceBodyClass();
		}, timeToWaitForLast, 'resizeWindow');
	});
    win.scroll(function(e) {
        if (isHomePage) { 
			homePageScrollBehavior();
			var homeWaitForFinalDelay = 50;
			
			// this gets the section that was active when scrolling began
			if (initialScroll == true) {
				origActiveSection = getActiveSection();
				initialScroll = false;
			}
			waitForFinalEvent( function() {
				initialScroll = true;
			}, homeWaitForFinalDelay + 1, 'endScrollWindow');
			
			if (mobileDeviceType() != 'mobile' && mobileDeviceType() != 'tablet' && !scrolling) {
				waitForFinalEvent( function() {
					// auto scroll to next or previious section if user starts to scroll there
					var activeSection = getActiveSection();
					var activePosPct = sectionPositionPct(origActiveSection);
					if (activePosPct > .5 || activePosPct < -.5) {
						scrollToSection(activeSection);
					} else if (activePosPct < 0) {
						if (activePosPct > -.05) {
							scrollToSection(activeSection);
						} else {
							scrollToSection(getPrevSection());
						}
					} else {
						if (activePosPct < .05) {
							scrollToSection(activeSection);
						} else {
							scrollToSection(getNextSection());
						}
					}
				}, homeWaitForFinalDelay, 'scrollWindow');
			}
		}
    });
	
	function mobileDeviceType() {
		if (win.width() > 1024) {
			return false;
		} else if (win.width() < 768) {
			return 'mobile';
		} else {
			return 'tablet';
		}
	}
	function mobileDeviceBodyClass() {
		if (mobileDeviceType() == 'mobile') {
			$('body').addClass('mobile').removeClass('tablet');
		} else if (mobileDeviceType() == 'tablet') {
			$('body').addClass('tablet').removeClass('mobile');
		} else {
			$('body').removeClass('mobile tablet');
		}
	}
	mobileDeviceBodyClass();

	// gets the vertical distance of the current element (el, a jQuery object) from the top of the viewport
	function eTop(el) {
		return el.offset().top - win.scrollTop();
	}
	
	// gets a jQuery object containing the section currently most visible on the page
	function getActiveSection() {
		var activeSection;
		var winH = win.height();
		$('#main > section').each(function() {
			if (eTop($(this)) > -0.5 * winH && eTop($(this)) <= 0.5 * winH) {
				activeSection = $(this);
				return false;
			}
		});
		return activeSection;
	}
	function getNextSection() {
		return getActiveSection().next('#main > section')
	}
	function getPrevSection() {
		return getActiveSection().prev('#main > section')
	}
	
	// gets a decimal showing how far from the top of the viewport the given section is based on the height of the viewport
	function sectionPositionPct(section) {
		return eTop(section) / win.height() * -1;
	}

	// scrolls window to section
	function scrollToSection(section) {
		scrolling = true;
		$('html,body').stop().animate({scrollTop: win.scrollTop() + eTop(section)}, 400, function() {
			scrolling = false;
		});
	}
	
	// messes with layout of studio image depending on size of browser
	function studioImageMobileAdjustment() {
		var studioShell = $('#studio .bg-shell');
		var shellRatio = mobileDeviceType() == 'mobile' ? 41 / 36 : 11 / 7;
		if (mobileDeviceType() == 'mobile' || mobileDeviceType() == 'tablet') {
			if (studioShell.width() / studioShell.height() > shellRatio) {
				studioShell.addClass('landscape');
			} else {
				studioShell.removeClass('landscape');
			}
		} else {
			studioShell.removeClass('landscape');
		}
	}

	// hides or shows the site title, depending on which section is visible, and how far from being even with the top of the page it is
	function homePageScrollBehavior() {
		var activeSection = getActiveSection();
		var activePosPct;
		var winH = win.height();
		if (activeSection.hasClass('light')) {
			$('#logo').addClass('light');
		} else {
			$('#logo').removeClass('light');
		}
		activePosPct = sectionPositionPct(activeSection) ;
		// -.6 to .12 is the range for activePosPct (active section position percentage) where the title will be visible, with opacity at 1 when activePosPct is 0
		var opacity;
		if (activeSection.hasClass('studio') || activeSection.hasClass('location')) {
			if (activePosPct >= 0) {
				opacity = -25 / 3 * activePosPct + 1;
			} else {
				opacity = 50 / 3 * activePosPct + 1;
			}
		} else {
			opacity = 0;
		}
		$('#logo').css('opacity', opacity);
	}

	if (isHomePage) {
		homePageScrollBehavior();
		scrollToSection(getActiveSection());
		studioImageMobileAdjustment();
	}
	
	// Hide wp admin bar
	var adminBarMove = $('#wpadminbar').outerHeight()-1
	$('#wpadminbar').animate({
		'top':'-='+adminBarMove
	}, 2000,function() {
	}).hover(
		function(){
			$('#wpadminbar').stop().css('top','0').toggleClass('wpadminbar-shown');
		},
		function(){
			$('#wpadminbar').animate({
				'top':'-='+adminBarMove
			}, 2000).toggleClass('wpadminbar-shown');
		}
	).append('<div class="wpadminbar-activator"></div>');


}); /* end of as page load scripts */
