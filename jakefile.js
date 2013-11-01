/*global desc, task, jake, fail, complete */
(function(){
    "use strict";
    desc("Test + build");
    task("default", ["lint"]);

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
//
//
//    lint.validateFile(files.toArray(), options, {});

})();
