jQuery(document).ready(function(){
	var width = $("footer > div").width() ,
	distance = width - 80;
	$('tr').each(function(index) {
		//$(this).addClass('hide');
		$('.main').prepend("<div class='stripe'>derp</div>");
		$('.stripe').addClass("hide");
	});
		$("footer p").delay(5000).addClass("animating").css({
			"float": "none",
			"position":"relative",
			"left": "0"
		}).transition({
			rotate: '1080deg',
			"left":  distance+"px",
			delay: 500,
			duration: 2000
		}).removeClass("animating");

	setTimeout(function(){
	}, 5000);
});