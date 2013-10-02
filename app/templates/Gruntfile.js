// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';
var moment = require('moment');

var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separtor: ';'
            },
            dist: {
                src: ['lib/**/*.js', 'js/**/*.js'],
                dest: 'dist/js/boomerang.js'
            }
        },
        uglify: {
            options: {
                banner: ""
            },
            dist: {
                files: {

                }
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, src: [
                        'css/*.css', 'images/*', 'views/*', 'view/*', 'index.html'], dest: 'dist'}
                ]
            }
        },
        watch: {
            all: {
                files: ["css/**/*", "views/**/*", "js/**/*"],
                tasks: ["default"],
                options: {
                    nospawn: true,
                    interrupt: false,
                    debounceDelay: 250
                }
            }
        },
        reload: {
            port: 35729,
            liveReload: {},
            proxy: {
                host: "localhost",
                port: 8080
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'dist'
                }
            }
        }
    });

    grunt.registerTask('server', ['build', 'connect', 'watch']);

    grunt.registerTask('build', ['concat', 'uglify', 'copy']);
    grunt.registerTask('default', ['build']);
};
