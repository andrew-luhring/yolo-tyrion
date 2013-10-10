var rand = Math.random(),
    rand_b= Math.random(),
    num;
    rand = rand * 10;
    rand_b = (rand_b * 10);
    num = rand * rand_b * 1500;
console.log(num);
jQuery(document).ready(function(){
	var width = $("footer > div").width(),
	distance = width - 80;
    $("footer p").delay(num).addClass("animating").css({
        "float": "none",
        "position":"relative",
        "left": "-1000px"
    }).transition({
        rotate: '1080deg',
        "left":  distance+"px",
        delay: 500,
        duration: 2000
    }).removeClass("animating");

});