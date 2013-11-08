/*global describe:true, it:true,expect:true,should:true*/
	"use strict";
var assert = require('assert');


function ScrollableThing(thing){
	var obj;
	if(typeof thing === "string"){
		console.log("stringtru");
	return "string";
	} else {
		console.log(typeof thing );
		return false;
	}
}


exports.abcd = function(test){
var derp = ScrollableThing(3);
	test.equals(derp ,"string");
	test.done();
}