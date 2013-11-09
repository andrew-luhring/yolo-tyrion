/*global should, exports, describe, mocha, it, jquery, expect, example, beforeEach, mocha */
(function(){
	"use strict";
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
describe('make something fail', function(){
			it('will fail', function(){
				expect(1).to.be.a("number");
			});
		});


/*	exports.abcd = function(test){
	var derp = new ScrollableThing(3);
		test.equals(derp ,"string");
		test.done();
	};*/



})();