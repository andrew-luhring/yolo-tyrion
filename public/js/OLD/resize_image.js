var winWidth = window.innerWidth;
var winHeight = window.innerHeight;
var x, z, bw, bh, m, md; 
jQuery(document).ready(function($) {

	var sec = $("section");
	var sections = $.makeArray(sec);

	for(var i = 0; i < sections.length; i++) {
		var calColor = 30 * i;
		 x = sections[i];
		var s = i+2 * 30;
		var even = (i+1) % 2;
		if(i !== 0){
			if(even === 1){
				
			} else {
				
			}

		}
		
		$(x).animate({
			"width": winWidth,
			"height": winHeight,
			"font-size":s,
			"left" : winWidth*i
			
		}, 2500);
}		

/*
	$('body').click(function() {

		jQuery('#parallax .parallax-layer').parallax({
			mouseport : $('body'),
			xorigin : 'middle',
			yorigin : 'middle',
			xparallax : 1.3,
			yparallax : 1.5
		});
	});*/

});

/*

 var height = window.innerHeight;
 var width = window.innerWidth;
 var imgArray = [];
 var imgs = document.getElementsByTagName("img");
 var section;

 jQuery(document).ready(function($) {

 for(var i = 0; i < imgs.length; i++) {
 imgArray.push(imgs[i]);
 }

 $(window).resize(function() {
 width = window.innerWidth;
 for(var i = 0; i < imgArray.length; i++) {
 var sec = imgArray[i].width = width / 4.2;
 section = (sec * 4) + 20;
 }
 $('section').css("border", "10px solid #000").css("width", section);
 });
 });
 */
