/*global should, exports, describe, mocha, it, jquery, expect, example, beforeEach, mocha */

(function(){
	"use strict";

	function debuggerer(smartAssRemark){
		if(smartAssRemark){
			console.log("\n >>>>>>>>>>>>>>>>>" +  smartAssRemark + "<<<<<<<<<<<<<<<<<  \n");
		} else {
			console.log("\n >>>>>>>>>>>>>>>>>DUDE YOU MESSED UP YOUR DEBUGGERER STATEMENT. TURN YOUR LIFE AROUND.<<<<<<<<<<<<<<<<<  \n");
		}
	}

	function Obj(jQueryObj){
		this.derp = jQueryObj;
		this.prototype = this.prototype;
		this.thing = "string";
	}
	Obj.prototype.things = function(justTheNumberInObject){
		var arr = [];
		for (var i in this){
			if (this.hasOwnProperty(this[i])) {
				debuggerer("todo: I should figure out why this hasownproperty thing is important ");
			} else {
				arr.push(i);
			}

		}
		if(justTheNumberInObject){
			return arr.length;
		} else {
			return arr;
		}
	};


	describe("lists length of properties array", function(){
		var another = new Obj($("fake"));
		it("will enumerate properties of an object", function(){
			var num = another.things(true);
			if (num){
				debuggerer(num);
			} else {
				debuggerer("bro ");
			}
			expect(num).to.be.greaterThan(1);
		});
	});

	describe("verify properties exist", function(){
		var diffObj = new Obj($("derp"));
		it("will return properties of an object",function(){
			expect(diffObj.thing).to.eql("string");
		});
	});

	describe('make an object', function(){
		var obj = new Obj($(".thing"));
			it("will return an object", function(){
				expect(obj).to.be.a("object");
			});
	});



})();