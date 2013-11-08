/* Copyright (c) 2012 James Shore - See README.txt for license */
"use strict";

var sass = require("node-sass");
var fs = require("fs");


function validateExists(filename, options, globals/*, callback*/) {
    var sourceCode
        , pass
        , file = {};
    try{
        sourceCode = fs.readFileSync(filename, "utf8");
        pass = true;
    } catch(err){
        sourceCode = "\n \n" + ">>>>>>>>>>>ERROR<<<<<<<<<<<" + "\n" + err + "\n";
        pass = false;
    }
    file.pass = pass;
    file.code= sourceCode;
    file.filename = filename;
    /*if(typeof callback === "function"){
        callback();
    }*/
    return file;
}

exports.sassCheck = function(obj, opt){

    sass.render({
          file : obj.filename
        , success: function(){
            console.log(obj.filename);
          }
        , error : function(error){
            console.log(error);
            return error;
        }
        , includePaths : [opt.partials, opt.fonts, opt.bourbon, opt.sassDir]
        , outputStyle: opt.style

    });

};

exports.sassList = function (fileList, options, globals) {
    var  code = []
        ,  exist = true
        ,  result;
    if(fileList.length > 0){
        fileList.forEach(function (filename) {
            result = validateExists(filename, options, globals);
            exports.sassCheck(result, options);
        });
        return exist;
    } else {
        console.log("files do not exist");
        exist = false;
        return exist;
    }

};
/*
exports.validateSource = function (sourceCode, options, globals, description) {
    description = description ? description + " " : "";
    var pass = jshint(sourceCode, options, globals);
    if (pass) {
        console.log(description + "ok");
    }
    else {
        console.log(description + "failed");
        jshint.errors.forEach(function (error) {
            console.log(error.line + ": " + error.evidence.trim());
            console.log("   " + error.reason);
        });
    }
    return pass;
};
*/
//
//exports.validateFile = function (filename, options, globals) {
//    var sourceCode = fs.readFileSync(filename, "utf8");
//    return exports.validateSource(sourceCode, options, globals, filename);
//};
//
//exports.validateFileList = function (fileList, options, globals) {
//    var pass = true;
//    fileList.forEach(function (filename) {
//        pass = exports.validateFile(filename, options, globals) && pass;
//    });
//    return pass;
//};
