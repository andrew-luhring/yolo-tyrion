
(function ($) {
	"use strict";
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
var obj = {}
    , workTypes = []
    , ref = []
    , pos
    , counter = 0
    , initialWinDim = getWindowDimensions();
    //window / post
function fullWindowResize(objToResize, currentWindowObj, animateTime) {
    var current;
    if (currentWindowObj instanceof jQuery) {
        current = currentWindowObj.get();
    } else{
        current = currentWindowObj;
    }
    var sec = $(objToResize),
    sections = $.makeArray(sec),
    currentHeight = current.height,
    currentTop = current.top;
    for (var i = 0; i < sections.length; i++) {
        var offsetTop = current.heightRem * i;
        $(sections).eq(i).addClass("animating").animate({
            "min-height": current.heightRem,
            "width": "100%",
            "top": offsetTop
        }, animateTime).removeClass("animating");
    }
}
    //window / post
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
    //footer
function swagFooterRoll() {
    var width = $("footer > div").width()
        , num = generateRandomDelay()
        , distance = width - 80;
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
    //footer
function getRandomNumber() {
    var rand = (Math.random() * 10);
    rand = Math.round(rand / 3);
    return rand;
}
    //theme
function getRandomTheme() {
    var rand = getRandomNumber();
    if (rand !== 0) {
        var themeSelector = "theme-" + rand;
        return themeSelector;
    } else {
        return false;
    }
}
    //theme
function setRandomTheme() {
        var theme = getRandomTheme();
        if (theme !== false) {
            $(".workTypes a, .workTypes").addClass(theme);
        }
    }
    //theme
function scrollToThing(thing, callback) {
        if ( typeof $(thing).attr("id") !== "undefined" ){
            var selector = $(thing)
                , sT = selector.offset().top
                , $viewport = $("html, body");
            $viewport.animate({
                scrollTop: sT
            }, 2000, function(){
                console.log($(thing).length);
                resizeTheThings(thing, false);
            });
        } else {
            console.log("can't scroll because undefined.");
            return false;
        }
    if ( callback && typeof callback === "function"){
        callback();
    }
}
    //window
function convertToType($objToResize, callback) {
        var $obj = $.makeArray($objToResize),
            arr = [];

        $.each($obj, function (index) {
            var link = {
                node: $(this).get(),
                kind: $(this).attr("data-class"),
                uri: $(this).attr("href")
            };
            arr.push(link);
        });
        $.each($obj, function (index) {
            var elem = arr[index].kind
                , uri = arr[index].uri
                , string = "<div class='surround-inserted'><" + elem + " src ='" + uri + "' class='inserted' >" + "</" + elem + "></div>";
            $(this).replaceWith(string);
        });

        if (typeof callback === "boolean") {
            if ($(".inserted").length >= 1) {
                return $(".inserted");
            } else{
                return false;
            }
        } else if ( typeof callback === "function" ){
                callback();
            } else {
            return false;
        }
    }
    //obj / post
function resizeTheThings(thing, isOwnParent, callback) {
        var selector = thing
            , currentWindowHeight = getWindowDimensions()
            , $objToResize;
            if(typeof isOwnParent === "undefined" || isOwnParent === true ){
                console.log("is own parent");
                $objToResize = $(selector);
            } else {
                console.log("is NOT own parent");
                var $post = $(selector).parent(".post");
                $objToResize = $post.children(".post-full").children("a");
            }
        var $newObjs = convertToType($objToResize, true);
        if ($newObjs) {
            fullWindowResize($(".surround-inserted"), currentWindowHeight, 100);
            fullWindowResize($newObjs, currentWindowHeight, 1000);
        }
        if (callback && typeof(callback) === "function") {
            callback();
        }
    }
    //obj / post
function moveNav(removeDefault) {
        if (removeDefault) {
            $("#main_nav.default_nav").switchClass("default_nav", "responsive_nav");
        } else {
            $("#main_nav.responsive_nav").switchClass("responsive_nav", "default_nav");
        }
    }
    //nav
function checkNav(current) {
    current.top = $(window).scrollTop();
    current.height = $(window).height();
    if (current.top > current.height && $("#main_nav").hasClass("default_nav")) {
        //if further from top than height and default still exists
        moveNav(true);
    } else if (current.top < current.height && $("#main_nav").hasClass("default_nav") === false) {
        //if less than top and not default still exists.
        moveNav(false);
    } else {
    }
}
    //nav
function scrollDirection(direction) {
    switch (direction) {
        case "up":
            console.log("up");
            return "up";
        case "down":
            console.log("down");
            return "down";
        default:
             console.log("none");
            return "none";
    }
}
    //window
function animateScrollTo(current, counter, direction) {
        var arr = $.makeArray($(".post"));
        var parr = [];
        $.each(arr, function (index) {
            var obj = $(this);
            obj.pid = obj.attr("id");
            obj.height = obj.height();
            obj.top = obj.offset().top;
            if (obj.find(".surround-inserted")) {
                var kids = $.makeArray(obj.find(".surround-inserted"));
                var pkid = [];
                $.each(kids, function (index) {
                    var kid = $(this);
                    kid.top = kid.offset().top;
                    kid.href = kid.attr("href");
                    pkid.push(kid);
                });
                obj.children = pkid;
            } else {
                obj.children = [];
            }
            parr.push(obj);
        });
        for (var i = 0; i < parr.length; i++) {
            var next = i + 1
                , prev = i - 1
                , max = parr.length - 1
                , min = 0
                , diffCur = parr[i] ;
            if (prev <= 0) {
                prev = min;
            } else{
                prev =  i - 1;
            }
            if (next >= max) {
                next = max;
            }

            var diffPrev = parr[prev]
                , diffNext = parr[next]
                , diffA = Math.abs(current.top - diffPrev.top)
                , diffB = Math.abs(current.top - diffNext.top)
                , diffC = diffCur.top;
            if (counter < 1) {
                console.log(diffB + " " + diffA);
                scrollDirection(direction);
                counter++;
            }
        }
        console.log("^^^^^^^^");
        direction = "none";
    }
    //post / window


jQuery(document).ready(function () {
    var didScroll
        , animateScroll
        , direction = "none"
        , didResize
        , win = getWindowDimensions()
        , current = win;
    setRandomTheme();
    fullWindowResize("#site-head, .post", win, 100);
    swagFooterRoll();
    $("body,html").on("scroll mousedown DOMMouseScroll mousewheel keyup", function (e) {
        if (e.which > 0 || e.type === "mousedown" || e.type === "mousewheel") {
            $("html,body").stop(true, false);
        }
    });
    //
    $('a').not(".allow").click(function (e) {
        e.preventDefault();
    });
    //
    $("#main_nav .workTypes a").click(function () {
        var post = $(this).attr('href');
        scrollToThing(post, function(){
//            resizeTheThings(post, false);
        });
    });
    //
    $(".post-full > a").click(function (e) {

        var self = $(this);
        scrollToThing(self, function () {

            convertToType(self, resizeTheThings(self, true));
        });

    });
    $(document).mousewheel(function (event, delta, deltaX, deltaY) {
        if (deltaY >= 15 || deltaY <= -15) {
            //console.log(deltaY);
            didScroll = true;
        }
        if (deltaY >= 55 || deltaY <= -55){
            didScroll = true;
            animateScroll = true;
            if( deltaY > 0 ){
                direction = "up";
            } else if ( deltaY < 0 ){
                direction = "down";
            }
        }
    });
    //

    $(window).resize(function () {
        didResize = true;
    });
   //
    setInterval(function () {

        if(didScroll === true && animateScroll === true ){
            didScroll = false;
            animateScroll = false;
            counter = 0;
            animateScrollTo(current, counter, direction);
            checkNav(current);

        } else if (didScroll) {
            didScroll = false;
            checkNav(current);
        }
    }, 1000);
    setInterval(function () {
        if (didResize) {
            didResize = false;
            current.top = $(window).scrollTop();
            current.height = $(window).height();
            current.heightRem = (current.height/10) + "rem";
            fullWindowResize('.post, #site-head', current, 1500);
        }
    }, 700);
});

}(jQuery));
