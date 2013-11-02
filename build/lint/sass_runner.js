/* Copyright (c) 2012 James Shore - See README.txt for license */
"use strict";

var sass = require("node-sass");
var fs = require("fs");


function validateExists(filename, options, globals, callback) {
    var sourceCode,
    pass;
    try{
        sourceCode = fs.readFileSync(filename, "utf8");
        pass = true;
    } catch(err){
        sourceCode = "\n \n" + ">>>>>>>>>>>ERROR<<<<<<<<<<<" + "\n" + err + "\n";
        pass = false;
    }
    if (pass){
        //console.log(sourceCode);
        return sourceCode;
    } else {
        console.log(sourceCode);
        return sourceCode;
    }
    if(typeof callback === "function"){
        callback();
    }
};

exports.sassCheck = function(){

}

exports.sassList = function (fileList, options, globals) {
    var  code = []
        ,  pass = true;
    if(fileList.length > 0){
        fileList.forEach(function (filename) {
            validateExists(filename, options, globals, exports.sassCheck());
             //console.log()
            console.log(filename);
        });
        return pass;
    } else {
        console.log("files do not exist");
        pass = false;
        return pass;
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
