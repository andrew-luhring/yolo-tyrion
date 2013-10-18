function getWindowDimensions() {
    var win = {};
    var winWidth = window.innerWidth / 10,
        winHeight = window.innerHeight / 10;
    win.winWidth = winWidth + "rem";
    win.winHeight = winHeight + "rem";
    return win;
}
function fullWindowResize(obj) {
    var win = getWindowDimensions();
    var sec = $(obj);
    var sections = $.makeArray(sec);
    for (var i = 0; i < sections.length; i++) {
        var x = sections[i],
            s = i + 2 * 30;
        $(x).animate({
            "min-height": win.winHeight,
            "top": win.winHeight * i
        }, 1500);
    }
};


jQuery(document).ready(function ($) {
    var win = getWindowDimensions();
    fullWindowResize('.post');
    $('#site-head').addClass("animating").css({
        "min-height": win.winHeight
    }).removeClass("animating");
    $('a').click(function(e){
        e.preventDefault();
    })
});

function generateRandomDelay() {
    var time = {},
        rand = Math.random(),
        rand_b = Math.random(),
        num;
    time.rand = rand * 10;
    time.randB = (rand_b * 10);
    time.finalNum = rand * rand_b * 1500;
    return time;
}
function swagFooterRoll() {
    var width = $("footer > div").width(),
        num = generateRandomDelay();
    distance = width - 80;
    $("footer p").delay(num.finalNum).addClass("animating").css({
        "float": "none",
        "position": "relative",
        "left": "-1000px"
    }).transition({
            rotate: '1080deg',
            "left": distance + "px",
            delay: 500,
            duration: 2000
        }).removeClass("animating");
}
jQuery(document).ready(function () {
    var didScroll,
        didResize;

    $("body,html").bind("scroll mousedown DOMMouseScroll mousewheel keyup", function (e) {
        if (e.which > 0 || e.type === "mousedown" || e.type === "mousewheel") {
            $("html,body").stop(true, false);
        }
    });
    $(window).scroll(function () {
        didScroll = true;
    }).resize(function(){
        didResize = true;
    });
    setInterval(function () {
        if (didScroll) {
            didScroll = false;
            console.log("chillin");
            var pos = $(window).scrollTop();
            console.log(pos);
        }
        if (didResize){
            didResize = false;
            console.log("sall cool b");
            fullWindowResize('.post, #site-head');
        }
    }, 550);
});