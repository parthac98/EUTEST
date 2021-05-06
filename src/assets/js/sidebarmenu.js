(function($) {
    
	"use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	//$('#sidebarCollapse').on('click', function () {alert('Hi');
    //	$('#sidebar').toggleClass('active');
    //});

})(jQuery);