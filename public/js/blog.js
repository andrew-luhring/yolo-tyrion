//TODO refactor/abstract all the things.
// finish the scroll to next post function
// delay the load of each object until after scroll
(function ($) {
    "use strict";
var obj = {}
    , workTypes = []
    , ref = []
    , pos
    , counter = 0
    , initialWinDim = getWindowDimensions();
    //console.log("1.) height " + initialWinDim.height + " top " + initialWinDim.top);
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
    //window
function calcDifferential(top, difference, obj){
    var differential = difference - top;
    //console.log("calcDifferential = " + differential);
    $(obj).animate({
        top: differential
    });
};
    //window / post
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
    //console.log(" sections " + sections.length + " \n and current " + current.width + " \n" + current.height);
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
};
    //theme
function setRandomTheme() {
        var theme = getRandomTheme();
        if (theme !== false) {
            $(".workTypes a, .workTypes").addClass(theme);
        }
    };
    //theme
function scrollToThing(thing) {
        if(typeof $(thing).attr("id") !== "undefined"){
            var selector = thing
            console.log("scrollToThings true " + $(thing).offset().top);
        } else if ( thing instanceof jQuery){
            var selector = $(thing).attr("id");
            console.log(thing);

        }else{
            console.log("scrollToThings false " + $(thing));
            var selector = $(thing);
        }/* else if (
            var needId = "#" + thing;

            )*/
        var sT = $(thing).offset().top
        , $viewport = $("html, body")
        console.log(selector);
    $viewport.animate({
        scrollTop: sT
    }, 2000);
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
        if (callback) {
            if ($(".inserted").length >= 1) {
                return $(".inserted");
            } else {
                return false;
            }
        }
    }
    //obj / post
function resizeTheThings(thing, isOwnParent, callback) {
        var selector = thing
            , currentWindowHeight = getWindowDimensions()
            if(typeof isOwnParent === "undefined" || typeof isOwnParent !== "boolean" || isOwnParent === true ){
                var $objToResize = $(selector);
            } else {
                var $post = $(selector).parent(".post")
                    , $objToResize = $post.children(".post-full").children("a");
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
    current.top = $(window).scrollTop(),
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
            console.log("up")
            return "up";
            break;
        case "down":
            console.log("down");
            return "down";
            break;
        default:
             console.log("none");
            return "none";
            break;
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
            // console.log(diff + " " + next + " " + prev  + " length " + parr.length);
            var diffPrev = parr[prev]
                , diffNext = parr[next]
                , diffA = Math.abs(current.top - diffPrev.top)
                , diffB = Math.abs(current.top - diffNext.top)
                , diffC = diffCur.top;

            if (diffA < diffB) {
                if (counter < 1) {
                    console.log(" diffA " + diffPrev.pid + " " + diffA + " \n current " + diffCur.pid );
                    scrollDirection(direction);
                    counter++;
                }
            } else if (diffA > diffB) {
                if (counter < 1) {
                   console.log(" diffB " + diffNext.pid + " " + diffB + " \n current " + diffCur.pid);
                    scrollDirection(direction);
                    counter++;
                }
            } else {
                console.log("default " + diffCur.pid);
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
    $('a').click(function (e) {
        e.preventDefault();
    });
    //
    $("#main_nav .workTypes a").click(function () {
        var post = $(this).attr('href');
        resizeTheThings(post, false, function(){
            setTimeout(scrollToThing(post), 5500);
        });
    });
    //
    $(".post-full > a").click(function (e) {
        var sel = this,
            self = $(sel);

        resizeTheThings(self, true, function () {
            setTimeout(scrollToThing(sel), 5500);
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

        } else if (didScroll) {
            didScroll = false,
                checkNav(current);

        } else {

        }

    }, 1000)
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
