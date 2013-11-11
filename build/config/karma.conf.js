// Karma configuration
// Generated on Tue Sep 24 2013 14:33:42 GMT-0700 (PDT)
"use strict";


module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '../../',


    // frameworks to use
    frameworks: ['mocha', 'expect'],


	  plugins: ['karma-*'],



    // list of files to exclude
	  exclude : ['node_modules/*'],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
	  reporters: ['progress', 'unicorn'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

	  // list of files / patterns to load in the browser
	  files: [{
			  pattern: 'public/js/lib/jquery.js',
			  watched: false,
		      included: true,
			  served: true
		  },{
			  pattern: 'public/js/lib/jquery.min.map',
			  watched: false,
			  included: false,
			  served: true
        },{
		      pattern: 'public/**/*.js',
			  watched: true,
		      included: true,
			  served:true
	    },{
		  pattern: 'build/**/*.js',
		  watched: true,
		  included: false,
		  served: false
	  }, {
		  pattern: 'jakefile.js',
		  watched: true,
		  included: false,
		  served: false
	  }, {
		  pattern: 'test/*.js',
		  watched: true,
		  included: false,
		  served: false
	  }],

	  // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
