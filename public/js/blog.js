//TODO style menu, have ajax request return and store categories until button click. button click insert and resize images.
//console.log(Backbone.Router);
//var AppRouter = Backbone.Router.extend({
    //routes: {

        //"worktypes/:category" : "worktype"
    //},
    //worktype: function(category){
      //  var selector = "'#" + category + "'";



      //  $(selector).css({
      //     "border": "2px solid blue"
        //});
    //}
//});
//var app = new AppRouter();





(function ($) {
var obj = {},
    workTypes = [],
    ref = [],
    pos,
    initialWinDim = (function() {
        var initialWinDim = getWindowDimensions();
                    console.log("1.) height " + initialWinDim.height + " top " + initialWinDim.top);
        return initialWinDim;
    })();


function getWindowDimensions(){
    var win = {
        widthRem: (window.innerWidth / 10) + "rem",
        heightRem: (window.innerHeight / 10) + "rem",
        width: window.innerWidth,
        height: window.innerHeight,
        top: window.pageYOffset
    };
    return win;
}


function calcDifferential(top, difference, obj){
    var differential = difference - top;
    console.log("calcDifferential = " + differential);
    $(obj).animate({
        top: differential
    });
};

function fullWindowResize(obj, currentWindowObj, animateTime) {
    var current = currentWindowObj,
    sec = $(obj),
    sections = $.makeArray(sec),
    currentHeight = current.height,
    currentTop = current.top;
    for (var i = 0; i < sections.length; i++) {
        var offsetTop = current.heightRem * i;
        $(sections).eq(i).addClass("animating").animate({
            "min-height": current.heightRem,
            "top": offsetTop
        }, animateTime, function(){
            var difference = initialWinDim.height - currentHeight;
            console.log("2rs); difference = initial - current");
            console.log(difference + " = " + initialWinDim.height + " - " + currentHeight);
            calcDifferential(currentTop, difference, 'html, body');
        }).removeClass("animating");
    }
}


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
        didResize,
        win = getWindowDimensions(),
        current = win;
    //Backbone.history.start();


    fullWindowResize("#site-head, .post", win, 1000);
    swagFooterRoll();

    $("body,html").bind("scroll mousedown DOMMouseScroll mousewheel keyup", function (e) {
        if (e.which > 0 || e.type === "mousedown" || e.type === "mousewheel") {
            $("html,body").stop(true, false);
        }
    });
    $('a').click(function (e) {
        e.preventDefault();
    })
    $(window).scroll(function () {
            didScroll = true;
    }).resize(function () {
            didResize = true;
    });
    setInterval(function () {
        if (didScroll) {
            didScroll = false,
            current.top = $(window).scrollTop(),
            current.height = $(window).height(),
            current.heightRem = (current.height / 10) + "rem";
            console.log("       scrolled     ");
            console.log("1s); current.height: " + current.height + " current.top: " + current.top );
            console.log("1s); initial.height: " + initialWinDim.height + " initial.top: " + initialWinDim.top)
        }
        if (didResize) {
            didResize = false;
            current.top = $(window).scrollTop(),
            current.height = $(window).height(),
            current.heightRem = (current.height/10) + "rem";
            console.log("\n       resized     ");
            console.log("1r.); current.height: " + current.height + " current.top: " + current.top);
            console.log("1r.); initial.height: " + initialWinDim.height + " initial.top: " + initialWinDim.top);
            fullWindowResize('.post, #site-head', current, 1500);

        }
    }, 700);
});




$.getJSON("/assets/js/websites.JSON", function (data) {
    obj = data;
    for (var i in data.work) {
        workTypes.push(data.work[i]);
        for (var j in data.work[i].ref) {
            $("#post_2").append("<p>" + data.work[i].ref[j].uri + "</p>");
        }
    }
});


}(jQuery));
