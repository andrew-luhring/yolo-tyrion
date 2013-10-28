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
        var diff = i
            , next = 0
            , prev = i - 1;
        if (prev <= 0) {
            prev = i;
        }
        if (next >= parr.length) {
            next = parr.length - 1;
            console.log(parr[next].pid);
        }
        var diffPrev = parr[prev]
            , diffNext = parr[next]
            , diffCur = parr[diff]

            , diffA = Math.abs(current.top - diffPrev.top)
            , diffB = Math.abs(current.top - diffNext.top)
            , diffC = diffCur.top;

        if (diffA < diffB) {
            if (counter < 1) {
                console.log(" diffA " + diffPrev.pid + " " + diffA + " \n current " + diffCur.pid);
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
        console.log("^^^^^^^^");
    }
    direction = "none";
}
