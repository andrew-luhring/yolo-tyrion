/*global desc, task, jake, fail, complete, directory, require, console, process */

(function () {
    "use strict";

	var REQUIRED_BROWSERS = [
		//"Chrome 30.0.1599.101 (Mac OS X 10.8.5)"
	];

	var lint = require("./build/util/lint_runner.js");
	var nodeunit = require("./build/util/nodeunit_runner.js");
	var karma = require("./build/util/karma_runner.js");

	desc("Lint, test, ???, profit");
		task("default", ["lint", "test"], function() {
		console.log("\n\nDEFAULT");
	});

	desc("Start Karma");
		task("karma", function() {
		karma.serve(complete, fail);
	}, {async: true});

	desc("Lint all the things!");
		task("lint", [], function(){
			debuggerer("starting tests");

		var passed = lint.validateFileList(nodeFilesToLint(), nodeLintOptions(), {});
		passed = lint.validateFileList(browserFilesToLint(), browserLintOptions(), {}) && passed;
		if (!passed) {
			fail(debuggerer("OH COME ON, STOP BEING A DINGUS. Lint yourself"));
		} else {
			debuggerer("Oh hey! Good job! You at least Linted correctly!");
		}
	});

	desc("run tests like a boss");
		task("test", ["testServer", "testClient"]);

	desc("Test node.js code");
		task("testServer", function() {
			nodeunit.runTests(nodeFilesToTest(), complete, fail);
		}, {async: true});

	desc("Test browser code");
		task("testClient", function() {
			karma.runTests(REQUIRED_BROWSERS, complete, fail);
		}, {async: true});

	desc("list the prevent broken builds thing");
		task("howToIntegrate", function(){
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
	desc("Integration== make it physically impossible to have broken build.");
	    task("integrate", [
		        "default"
		        , "howToIntegrate"
	    ]);

	function propertiesList(obj){
		var result = "";
		for ( var i in obj ){
			if ( obj.hasOwnProperty(i)){
				result +=  obj + "." + i + " = " + obj[i] + "\n";
			}
		}
		return result;
	}

	function nodeFilesToLint() {
		var files = new jake.FileList();
		files.include("jakefile.js");
		files.exclude("./build/util/**/*.js");
		files.include("./models/**/*.js");
		files.include("./routes/**/*.js");
		files.exclude("./node_modules/*");

		return files.toArray();
	}
	function nodeLintOptions(){
		var NodeOpt = new JSHintOptions();
		NodeOpt.node = true;
		return NodeOpt;
	}
	function nodeFilesToTest() {
		var testFiles = new jake.FileList();
		testFiles.include(["test/*.js"]);
		testFiles.exclude("node_modules");
		var tests = testFiles.toArray();
		if(tests.length <= 1){
			debuggerer(tests.length + " server file to be tested");
		} else {
			//i hate bad grammar.
			debuggerer(tests.length + " server files to be tested");
		}

		return tests;
	}


	function browserFilesToLint() {
		var files = new jake.FileList();
		files.include("public/**/*.js");
		files.exclude("public/js/lib/*.js");
		return files.toArray();
	}
	function browserLintOptions(){
		var BrowOpt = new JSHintOptions();
		BrowOpt.jquery = true;
		BrowOpt.browser = true;
		BrowOpt.node = false;
		return BrowOpt;
	}


	function styleOptions() {
        var obj = {};
        obj.syntax = "scss";
        obj.sassDir = "./public/sass/";
        obj.sassFiles = obj.sassDir + "*.scss";
        obj.partials = obj.sassDir + "partials/";
        obj.fonts = obj.sassDir + "fonts/";
        obj.cssDir = "./public/css/ ";
        obj.bourbon = obj.sassDir + "bourbon/**";
        obj.style = "expanded";
        obj.trace = "--trace" ;
        obj.check = "-c" + " " + obj.trace + " " + obj.sassFiles;
        obj.compile = "--update" + " " + obj.trace +  " " + obj.sassDir + ":" + obj.cssDir ;
        return obj;
    }
	function JSHintOptions(){
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
        , laxcomma: true
        , smarttabs: true
        , debug: true
        , sub : true
        , supernew: true
        , devel : true
        };
    }



function debuggerer(smartAssRemark){
	if(typeof smartAssRemark === "string"){
		console.log("\n >>>>>>>>>>>>>>>>>" +  smartAssRemark + "<<<<<<<<<<<<<<<<<  \n");
	} else {
		console.log("\n >>>>>>>>>>>>>>>>>DUDE YOU MESSED UP YOUR DEBUGGERER STATEMENT. TURN YOUR LIFE AROUND.<<<<<<<<<<<<<<<<<  \n");
	}
}

})();
/*
	desc("Jake filelist");
	    task("jfl", [], function(){
	       var list = new jake.FileList()
	           , sassLint = require("./build/lint/sass_runner.js")
	           , fileList
	           , existence
	           , options = styleOptions();
	        list.include("**\/*.scss");
			list.exclude("node_modules", "bourbon");
			fileList = list.toArray();
			var out = sassLint.sassList(fileList, options, {});
			//console.log(out); //existence = sassLint.validateExists("public/sass/blog.scss", {}, {}); //console.log(existence);
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
});*/
