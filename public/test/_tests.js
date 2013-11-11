/*global should, exports, describe, mocha, it, jquery, expect, example, beforeEach, mocha */


(function(){
	"use strict";
	//turns off debugger statements for completed tasks.
	var quietModeIsOn = true;
	function quietMode(on, debuggerStatement){
		if( on === true ){
			console.log("\n the quieter you are, the more you are able to hear");
		} else {
			debuggerer(debuggerStatement);
		}
	}

	function debuggerer(smartAssRemark){
		if(smartAssRemark){
			console.log("\n >>>>>>>>>>>>>>>>>" +  smartAssRemark + "<<<<<<<<<<<<<<<<<  \n");
		} else {
			console.log("\n >>>>>>>>>>>>>>>>>DUDE YOU MESSED UP YOUR DEBUGGERER STATEMENT. TURN YOUR LIFE AROUND.<<<<<<<<<<<<<<<<<  \n");
		}
	}
	function Obj(selector){
		this.selector = selector;
		this.prototype = this.prototype;
		this.testString = "string";
		this.isjQuery = function(){
			var result;
			if(this.selector instanceof jQuery){
				result = true;
			} else {
				result = false;
			}
			return result;
		};
	}
	Obj.prototype.listProperties = function(justTheNumberInObject){
		var arr = [];
		for (var i in this){
			if (this.hasOwnProperty(this[i])) {
				debuggerer("todo: I should figure out why this hasownproperty thing is important ");
			} else {
				var list = [ i , this[i] ];
				arr.push(list);
			}
		}
		if(justTheNumberInObject){
			return arr.length;
		} else {
			return arr;
		}

	};

	describe("verify properties exist", function(){
		var obj = new Obj($("body"));
		it("will list properties of the object", function(){
			var things = obj.listProperties(false);
			var num = obj.listProperties(true);
			var isjQuery = obj.isjQuery();
			expect(things).to.not.be.empty();
			quietMode(quietModeIsOn, things);
			quietMode(quietModeIsOn, isjQuery);
		});
	});
	describe("lists length properties array", function(){
		var obj = new Obj($("body"));
		it("will enumerate properties of an object", function(){
			var num = obj.listProperties(true);
				expect(num).to.be.greaterThan(1);
				quietMode(quietModeIsOn, num);


		});
	});
	describe("verify properties exist", function(){
		var obj= new Obj($("body"));
		it("will return properties of an object",function(){
			expect(obj.testString).to.eql("string");
		});
	});
	describe('make an object', function(){
		var obj = new Obj($("body"));
			it("will return an object", function(){
				expect(obj).to.be.a("object");
			});
	});



})();