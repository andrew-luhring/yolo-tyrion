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
                    //console.log("1.) height " + initialWinDim.height + " top " + initialWinDim.top);
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
    //console.log("calcDifferential = " + differential);
    $(obj).animate({
        top: differential
    });
};

function fullWindowResize(objToResize, currentWindowObj, animateTime) {
    if (currentWindowObj instanceof jQuery) {
        var current = currentWindowObj.get();
    } else{
        var current = currentWindowObj;
    }
    var sec = $(objToResize),
    sections = $.makeArray(sec),
    currentHeight = current.height,
    currentTop = current.top;
    console.log(" sections " + sections.length + " \n and current " + current.width + " \n" + current.height);
    for (var i = 0; i < sections.length; i++) {
        var offsetTop = current.heightRem * i;
        $(sections).eq(i).addClass("animating").animate({
            "min-height": current.heightRem,
            "width": "100%",
            "top": offsetTop
        }, animateTime, function(){
            //var difference = initialWinDim.height - currentHeight;
            //console.log("2rs); difference = initial - current");
            //console.log(difference + " = " + initialWinDim.height + " - " + currentHeight);
            //calcDifferential(currentTop, difference, 'html, body');
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

    function getRandomNumber(){
        var rand = (Math.random() * 10);
        rand = Math.round(rand / 3);
        return rand;
    }
    function getRandomTheme() {
        var rand = getRandomNumber();
        if(rand !== 0){
            var themeSelector = "theme-" + rand;
            return themeSelector;
        } else{
            return false;
        }
    };

    var setRandomTheme = (function(){
     var theme = getRandomTheme();
        if(theme !== false){
            $(".workTypes a, .workTypes").addClass(theme);
        }
    })();
    fullWindowResize("#site-head, .post", win, 100);
    swagFooterRoll();

    $("body,html").on("scroll mousedown DOMMouseScroll mousewheel keyup", function (e) {
        if (e.which > 0 || e.type === "mousedown" || e.type === "mousewheel") {
            $("html,body").stop(true, false);
        }
    });
    $('a').click(function (e) {
        e.preventDefault();
    });
    function scrollToThing(thing){
        var selector = thing
            , sT = $(selector).offset().top
            , $viewport = $("html, body");
        $viewport.animate({
            scrollTop: sT
        }, 2000);
    }
    function convertToType($objToResize, callback){
        var $obj = $.makeArray($objToResize),
            arr = [];

        $.each($obj, function(index){
            var link = {
                node : $(this).get(),
                kind : $(this).attr("data-class"),
                uri : $(this).attr("href")
                };
            arr.push(link);
        });
        $.each($obj, function(index){
            var elem = arr[index].kind
                , uri = arr[index].uri
                , string = "<div class='surround-inserted'><" + elem + " src ='" + uri + "' class='inserted' >" + "</" + elem + "></div>";
            $(this).replaceWith(string);
        });
        if( callback){
            if ($(".inserted").length >= 1) {
                return $(".inserted");
            } else{
                return false;
            }
        }
    }
    function resizeTheThings(thing){
        var selector = thing
            , $post= $(selector).parent(".post")
            , currentWindowHeight = getWindowDimensions()
            , $objToResize = $post.children(".post-full").children("a");
        var $newObjs = convertToType($objToResize, true);
        if($newObjs){
                fullWindowResize($(".surround-inserted"), currentWindowHeight, 100);
                fullWindowResize($newObjs, currentWindowHeight, 1000);
        } else{
            alert($newObjs)
        }

    }
    $("#main_nav .workTypes a").click(function(){
        var post = $(this).attr('href');
        scrollToThing(post);
        resizeTheThings(post);
    });
    $(document).mousewheel(function (event, delta, deltaX, deltaY) {
        if(deltaY >=30 || deltaY <= -30){
            console.log(deltaY);
            didScroll = true;
        }
    });

    $(window).resize(function () {
            didResize = true;
    });

    function moveNav( removeDefault ){
        if( removeDefault ){
            $("#main_nav.default_nav").switchClass("default_nav", "responsive_nav");

        } else {
            $("#main_nav.responsive_nav").switchClass("responsive_nav", "default_nav");
        }

    }

    function checkNav() {
        current.top = $(window).scrollTop(),
            current.height = $(window).height();
        if (current.top > current.height && $("#main_nav").hasClass("default_nav")) {
            //if further from top than height and default still exists
            moveNav(true);
        } else if (current.top < current.height && $("#main_nav").hasClass("default_nav") === false) {
            //if less than top and not default still exists.
            moveNav(false);
        } else {
            console.log("cool " + current.top);
        }
    }
    setInterval(function () {
        if (didScroll) {
            didScroll = false,
            checkNav();
        }}, 1000)

    setInterval(function () {
        if (didResize) {
            didResize = false;
            current.top = $(window).scrollTop(),
            current.height = $(window).height(),
            current.heightRem = (current.height/10) + "rem";
            fullWindowResize('.post, #site-head', current, 1500);
        }
    }, 700);
});

}(jQuery));
