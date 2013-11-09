/*
 * Copyright (c) 2013 ObjectLabs Corporation
 * Distributed under the MIT license - http://opensource.org/licenses/MIT
 */

var mocha = require('./mocha-glob');

/**
 * Defines a mocha task with the given options.
 *
 * @param {{name: String, files}} options
 */
exports.defineTask = function defineTask(options) {
    var name = options.name;
    var description = options.desc || 'Run Mocha tests';
    var prerequisites = options.prerequisites || [];
    var taskOptions = options.taskOptions || {};
    var files = options.files;
    var mochaOptions = options.mochaOptions;

    taskOptions.async = true;

    desc(description);
    task(name, prerequisites, taskOptions, function () {
        mocha.run(files,
                  mochaOptions,
                  function (err) {
                      err ? fail(err) : complete();
                  });
    });

};
