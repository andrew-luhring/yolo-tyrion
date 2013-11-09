/*
 * Copyright (c) 2013 ObjectLabs Corporation
 * Distributed under the MIT license - http://opensource.org/licenses/MIT
 */

var Mocha = require('mocha');
var glob = require('glob');
var async = require('async');

/**
 * Run Mocha with glob file descriptors.
 *
 * @param {!(String|Array)} files Glob(s) representing the Mocha files to be run
 * @param {!(Object|Function)} options The Mocha options to be used
 * @param {Function=} callback
 */
exports.run = function run(files, options, callback) {
    if (typeof options === 'function') {
        callback = options;
        options = undefined;
    }

    var mocha = new Mocha(options);

    if (typeof files === 'string') { files = [files]; }
    async.each(files, function (filePattern, callback) {

        glob(filePattern, function (err, files) {
            if (err) {
                return callback(err);
            } else {
                files.forEach(mocha.addFile.bind(mocha));
                return callback();
            }
        });

    }, function (err) {
        return err ? callback(err) : mocha.run(callback);
    });

};
