/*global desc, task, jake, fail, complete */

"use strict";

task("default", ["lint"]);

desc("Lint all the things!");
task("lint", [], function(){
   var lint = require("./build/lint/lint_runner.js")
       , list = new jake.FileList();
            list.include("**/*.js");
            list.exclude("node_modules", "lib");
    var options = {
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
//
//
//    lint.validateFile(files.toArray(), options, {});
var fileList = list.toArray();
    console.log(fileList.length);
    lint.validateFileList( fileList , options , {});
});
