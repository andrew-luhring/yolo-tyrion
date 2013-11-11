// Mocha configuration (TODO  have karma init autogenerate this)
// These are the default setttings

'use strict';

var Configuration = {
	// show colors?
	colors : true,
	// enable node's debugger? (synonym for node --debug)
	debug: false,
	//  do you want to pass in a given comma-delimited global [names]?
	globals : null,
	// do you want to only run tests matching <pattern>? blank for all
	grep : null,
	//  do you want to use growl for notifications? (I think this is UNIX only...)
	growl : true,
	//  (I have no idea what leaks are)
	ignoreLeaks : true,
	//  if grep has values and if matches are found, do you want to invert the matches?
	invert : null,
	// dot | doc | spec | json | progress | list | tap | landing | xunit | html-cov | json-cov | min | json-stream | markdown | nyan <-- as in nyan cat.
	reporter : 'dot',
	//  set test-case timeout in milliseconds
	timeout : 2000,
	// bdd | tdd | exports
	ui : 'bdd'
};

function removeExtraProperties(configurationObject){
	var configuration = configurationObject;
	if ( configuration ){
		for (var i in configuration){
			if( typeof configuration[i] === 'undefined' || configuration[i] === null   ){
				delete configuration[i];
			}
		}
	} else {
		configuration =  '';
	}

	return configuration;
}


var finalConfig = removeExtraProperties(Configuration);




module.exports = function(config) {
	config.set( finalConfig );
};