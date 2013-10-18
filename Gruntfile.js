var path           = require('path'),
    when           = require('when'),
    semver         = require('semver'),
    fs             = require('fs'),
    path           = require('path'),
    _              = require('underscore'),
    spawn          = require("child_process").spawn,
    buildDirectory = path.resolve(process.cwd(), '.build'),
    distDirectory  = path.resolve(process.cwd(), '.dist'),
    buildGlob = [
        '**',
        '!node_modules/**',
        '!**/*.db*',
        '!*.db*',
        '!.sass*',
        '!.git*',
        '!.scss*'
    ],

    configureGrunt = function (grunt) {

        // load all grunt tasks
        require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

        var cfg = {
            // Common paths to be used by tasks
            paths: {
                swagAssets: './public',
                build: buildDirectory,
                buildBuild: path.join(buildDirectory, 'build'),
                dist: distDirectory,
                buildDist: path.join(distDirectory, 'build'),
            },
            buildType: 'Build',
            pkg: grunt.file.readJSON('package.json'),

            // Watch files and livereload in the browser during development
            watch: {
                handlebars: {
                    files: [ 'views/**/*.hbs', 'views/*.hbs'],
                    tasks: ['handlebars']
                },
                scss: {
                    files: ['<%= paths.swagAssets %>/sass/**/*', '<%= paths.swagAssets %>/sass/*'],
                    tasks: ['sass:dist']
                },
                livereload: {
                    files: [
                        // Theme CSS
                        '<%= paths.swagAssets %>/css/*.css',
                        // Theme JS
                        '<%= paths.swagAssets %>/js/*.js',
                        // Admin CSS
                        '<%= paths.swagAssets %>/sass/*.css'
                    ],
                    options: {
                        livereload: true
                    }
                },
                express: {
                    // Restart any time client or server js files change
                    files:  ['**/**/*.js', '**/*.js', '*.js'],
                    tasks:  ['express:dev'],
                    options: {
                        //Without this option specified express won't be reloaded
                        nospawn: true
                    }
                }
            },

            // Start our server in development
            express: {
                options: {
                    script: 'app.js'
                },

                dev: {
                    options: {
                        output: "swag Express server listening on address:.*$"
                    }
                },
                test: {
                    options: {
                        node_env: 'testing'
                    }
                }
            },
            // JSLint all the things!
            jslint: {
                server: {
                    directives: {
                        // node environment
                        node: true,
                        // browser environment
                        browser: false,
                        // allow dangling underscores in var names
                        nomen: true,
                        // allow to do statements
                        todo: true,
                        // allow unused parameters
                        unparam: true,
                        // don't require use strict pragma
                        sloppy: true
                    },
                    files: {
                        src: [
                            '*.js',
                            '**/*.js'
                        ]
                    }
                },
                client: {
                    directives: {
                        // node environment
                        node: false,
                        // browser environment
                        browser: true,
                        // allow dangling underscores in var names
                        nomen: true,
                        // allow to do statements
                        todo: true,
                         // allow unused parameters
                        unparam: true,
                        //no use strict.
                        sloppy: true
                    },
                    files: {
                        src: [
                            'public/**/*.js'
                        ]
                    },
                    exclude: [
			            'public/**/lib/*.js',
                        'public/**/OLD/*.js'
                    ]
                }
            },
            // Compile all the SASS!
            sass: {
                dist: {
                    files: {
                        'public/styles/blog.css': 'public/sass/blog.scss'
                    },
                    options: {
                        style: 'expanded',
                        scss: 'true',
                        sourcemap: 'true',
                        quiet: 'true'
                    }
                }
            },


            shell: {
                bourbon: {
                    command: 'bourbon install --path <%= paths.swagAssets %>/sass/modules/'
                }
            },

            handlebars: {
                core: {
                    options: {
                        namespace: 'JST',
                        processName: function (filename) {
                            filename = filename.replace('views/', '');
                            return filename.replace('.hbs', '');
                        }
                    }
                }
            },
            clean: {
                build: {
                    src: ['<%= paths.buildBuild %>/**']
                }
            },

            bump: {
                options: {
                    tagName: '%VERSION%',
                    commitMessage: '<%= buildType %> Release %VERSION%',
                    tagMessage: '<%= buildType %> Release %VERSION%',
                    pushTo: 'origin build'
                }
            }
        };

        grunt.initConfig(cfg);

        // Update the package information after changes
        grunt.registerTask('updateCurrentPackageInfo', function () {
            cfg.pkg = grunt.file.readJSON('package.json');
        });

        grunt.registerTask('setCurrentBuildType', function (type) {
            cfg.buildType = type;
        });

        /* Generate Changelog
         * - Pulls changelog from git, excluding merges.
         * - Uses first line of commit message. Includes committer name.
         */
        grunt.registerTask("changelog", "Generate changelog from Git", function () {
            // TODO: Break the contents of this task out into a separate module,
            // put on npm. (@cgiffard)
            var done = this.async();

            function git(args, callback, depth) {
                depth = depth || 0;
                if (!depth) {
                    grunt.log.writeln('git ' + args.join(' '));
                }

                var buffer = [];
                spawn('git', args, {
                    // We can reasonably assume the gruntfile will be in the root of the repo.
                    cwd : __dirname,
                    stdio : ['ignore', 'pipe', process.stderr]
                }).on('exit', function (code) {

                    // Process exited correctly but we got no output.
                    // Spawn again, but make sure we don't spiral out of control.
                    // Hack to work around an apparent node bug.
                    //
                    // Frustratingly, it's impossible to distinguish this
                    // bug from a genuine empty log.

                    if (!buffer.length && code === 0 && depth < 20) {
                        return setImmediate(function () {
                            git(args, callback, depth ? depth + 1 : 1);
                        });
                    }

                    if (code === 0) {
                        return callback(buffer.join(''));
                    }

                    // We failed. Git returned a non-standard exit code.
                    grunt.log.error('Git returned a non-zero exit code.');
                    done(false);

                // Push returned data into the buffer
                }).stdout.on('data', buffer.push.bind(buffer));
            }

            // Crazy function for getting around inconsistencies in tagging
            function sortTags(a, b) {
                a = a.tag;
                b = b.tag;

                // NOTE: Accounting for different tagging method for
                // 0.2.1 and up.

                // If we didn't have this issue I'd just pass rcompare
                // into sort directly. Could be something to think about
                // in future.

                if (semver.rcompare(a, '0.2.0') < 0 ||
                        semver.rcompare(b, '0.2.0') < 0) {

                    return semver.rcompare(a, b);
                }

                a = a.split('-');
                b = b.split('-');

                if (semver.rcompare(a[0], b[0]) !== 0) {
                    return semver.rcompare(a[0], b[0]);
                }

                // Using this janky looking integerising-method
                // because it's faster and doesn't result in NaN, which
                // breaks sorting
                /*jslint bitwise: true */
                return (+b[1] | 0) - (+a[1] | 0);
            }

            // Gets tags in master branch, sorts them with semver,
            function getTags(callback) {
                git(['show-ref', '--tags'], function (results) {
                    results = results
                        .split(/\n+/)
                        .filter(function (tag) {
                            return tag.length && tag.match(/\/\d+\.\d+/);
                        })
                        .map(function (tag) {
                            return {
                                'tag': tag.split(/tags\//).pop().trim(),
                                'ref': tag.split(/\s+/).shift().trim()
                            };
                        })
                        .sort(sortTags);

                    callback(results);
                });
            }

            // Parses log to extract commit data.
            function parseLog(data) {
                var commits = [],
                    commitRegex =
                        new RegExp(
                            '\\n*[|\\*\\s]*commit\\s+([a-f0-9]+)' +
                                '\\n[|\\*\\s]*Author:\\s+([^<\\n]+)<([^>\\n]+)>' +
                                '\\n[|\\*\\s]*Date:\\s+([^\\n]+)' +
                                '\\n+[|\\*\\s]*[ ]{4}([^\\n]+)',
                            'ig'
                        );

                // Using String.prototype.replace as a kind of poor-man's substitute
                // for a streaming parser.
                data.replace(
                    commitRegex,
                    function (wholeCommit, hash, author, email, date, message) {

                        // The author name and commit message may have trailing space.
                        author = author.trim();
                        message = message.trim();

                        // Reformat date to make it parse-able by JS
                        date =
                            date.replace(
                                /^(\w+)\s(\w+)\s(\d+)\s([\d\:]+)\s(\d+)\s([\+\-\d]+)$/,
                                '$1, $2 $3 $5 $4 $6'
                            );

                        commits.push({
                            'hash': hash,
                            'author': author,
                            'email': email,
                            'date': date,
                            'parsedDate': new Date(Date.parse(date)),
                            'message': message
                        });

                        return null;
                    }
                );

                return commits;
            }

            // Gets git log for specified range.
            function getLog(to, from, callback) {
                var range = from && to ? from + '..' + to : '',
                    args = [ 'log', 'master', '--no-color', '--no-merges', '--graph' ];

                if (range) {
                    args.push(range);
                }

                git(args, function (data) {
                    callback(parseLog(data));
                });
            }

            // Run the job
            getTags(function (tags) {
                var logPath = path.join(__dirname, 'CHANGELOG.md'),
                    log = fs.createWriteStream(logPath),
                    commitCache = {};

                function processTag(tag, callback) {
                    var buffer = '',
                        peek = tag[1];

                    tag = tag[0];

                    getLog(tag.tag, peek.tag, function (commits) {

                        // Use the comparison with HEAD to remove commits which
                        // haven't been included in a build/release yet.

                        if (tag.tag === "HEAD") {
                            commits.forEach(function (commit) {
                                commitCache[commit.hash] = true;
                            });

                            return callback("");
                        }

                        buffer += '## Release ' + tag.tag + '\n';

                        commits = commits
                            .filter(function (commit) {

                                // Get rid of jenkins' release tagging commits
                                // Remove commits we've already spat out
                                return (
                                    commit.author !== 'TryGhost-Jenkins' &&
                                    !commitCache[commit.hash]
                                );
                            })
                            .map(function (commit) {
                                buffer += '\n* ' + commit.message + ' (_' + commit.author + '_)';
                                commitCache[commit.hash] = true;
                            });

                        if (!commits.length) {
                            buffer += "\nNo changes were made in this build.\n";
                        }

                        callback(buffer + '\n');
                    });
                }

                // Get two weeks' worth of tags
                tags.unshift({'tag': 'HEAD'});

                tags =
                    tags
                        .slice(0, 14)
                        .map(function (tag, index) {
                        return [
                            tag,
                            tags[index + 1] || tags[index]
                        ];
                    });

                log.write('# Ghost Changelog\n\n');
                log.write('_Showing ' + tags.length + ' releases._\n');

                when.reduce(tags,
                    function (prev, tag, idx) {
                        return when.promise(function (resolve) {
                            processTag(tag, function (releaseData) {
                                resolve(prev + '\n' + releaseData);
                            });
                        });
                    }, '')
                    .then(function (reducedChangelog) {
                        log.write(reducedChangelog);
                        log.close();
                        done(true);
                    });
            });
        });

        grunt.registerTask('build', [
            'shell:bourbon',
            'sass:admin',
            'handlebars',
            'changelog',
            'clean:build'
        ]);

        grunt.registerTask('release', [
            'shell:bourbon',
            'sass:admin',
            'handlebars',
            'changelog',
            'clean:build',
        ]);

        // Dev Mode; watch files and restart server on changes
        grunt.registerTask('dev', [
            'default',
            'express:dev',
            'watch'
        ]);

        // Prepare the project for development
        // TODO: Git submodule init/update (https://github.com/jaubourg/grunt-update-submodules)?
        grunt.registerTask('init', ['shell:bourbon', 'default']);

        // Run tests and lint code
        grunt.registerTask('validate', ['jslint', 'test-unit', 'test-functional']);

        // When you just say 'grunt'
        grunt.registerTask('default', ['sass:dist', 'handlebars']);
    };

//    myGrunts = function(grunt){
//        scss: {
//            files: ['content/themes/swag/assets/sass/*.scss', 'content/themes/swag/assets/sass/**/*.scss' ]
//
//        }
//    }

module.exports = configureGrunt;


