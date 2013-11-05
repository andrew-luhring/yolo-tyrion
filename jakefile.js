
/*global desc, task, jake, fail, complete */
(function () {
    "use strict";

    task("fuck", [], function(){
        var sass = require("node-sass");
        var opt = styleOptions();
        //console.log(opt.sassFiles);
        console.log(sass.render({
            file: opt.sassFiles
        }));
    });
desc("Test + build");
    task("default", ["lint"]);

desc("Jake filelist");
    task("jfl", [], function(){
       var list = new jake.FileList()
           , sassLint = require("./build/lint/sass_runner.js")
           , fileList
           , existence;
        list.include("**/*.scss");
        list.exclude("node_modules", "bourbon");
        fileList = list.toArray();
        var out = sassLint.sassList(fileList, {}, {});
        //console.log(out);
        //existence = sassLint.validateExists("public/sass/blog.scss", {}, {});
        //console.log(existence);
    });

desc("Lint all the things!");
    task("lint", [], function(){
        var lint = require("./build/lint/lint_runner.js")
              , list = new jake.FileList();
                list.include("**/*.js");
                list.exclude("node_modules", "lib");
        var fileList = list.toArray();
        var options = nodeOptions();
        var passedTests = lint.validateFileList(fileList, options, {});
        if(!passedTests){
            fail("Lint failed to pass all tests.");
        }
    });
desc("compiles scss");
    task("scss", {async: true}, function(){
        var list = new jake.FileList()
            , fileList
            , opt = styleOptions()
            , cmds;
        cmds = {
              check : opt.syntax + " " + opt.check
            , compile : opt.syntax + " " +opt.compile
        };
        list.include(opt.sassFiles);
        list.exclude(opt.bourbon);
        fileList = list.toArray();

        var check = jake.exec(cmds.check, {printStdout: true}, function(){


        });
    });
desc("Integration== make it physically impossible to have broken build.");
    task("integrate", ["default"], function(){
        console.log("1. Make sure 'git status' is clean");
        console.log("2. Build on the integration box.");
        console.log("   a. Walk over to integration box");
        console.log("   b. 'get pull' ");
        console.log("   c. 'jake'");
        console.log("   d. If jake fails, stop. Fix whatever, then try again.");
        console.log("3. 'git checkout jake' ");
        console.log("4. 'git merge master --no-ff --log' ");
        console.log("5. 'git checkout master'");
    });

    function styleOptions() {
        var obj = {};
        obj.syntax = "scss";
        obj.sassFiles = "./public/sass/*.scss";
        obj.sassDir = "./public/sass/";
        obj.cssDir = "./public/css/ ";
        obj.bourbon = "./public/sass/bourbon/**";
        obj.style = "-t expanded";
        obj.trace = "--trace" ;
        obj.check = "-c" + " " + obj.trace + " " + obj.sassFiles;
        obj.compile = "--update" + " " + obj.trace +  " " + obj.sassDir + ":" + obj.cssDir ;
        return obj;
    }
    function nodeOptions(){
        return {
         bitwise: true
        , curly: true
        , eqeqeq: true
        , forin: true
        , latedef : true
        , newcap : true
        , noarg: true
        , nonew: false
        , undef: true
        , strict: true
        , unused: false
        , trailing: true
        , node: true
        , laxcomma: true
        , smarttabs: true
        , debug: true
        , sub : true
        , supernew: true
        , browser: true
        , devel : true
        , jquery: true
        };
    }

})();
