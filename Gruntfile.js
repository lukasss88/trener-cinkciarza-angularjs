module.exports = function (grunt)
{
    'use strict';
    var serveStatic = require('serve-static');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.initConfig({
        watch: {
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }, files: ['app/**/*.html', 'app/**/*.js', 'app/**/*.css']
            }
        }, connect: {
            options: {
                port: 9000, livereload: 35729, hostname: 'localhost'
            }, livereload: {
                options: {
                    open: true, middleware: function (connect)
                    {
                        return [connect().use('/bower_components', serveStatic('./bower_components')), serveStatic('app')];
                    }
                }
            }
        }, karma: {
            options: {
                configFile: 'test/karma.conf.js'
            }, unit: {
                singleRun: true
            }, dev: {
                singleRun: false
            }
        }, jshint: {
            default: {
                options: {
                    jshintrc: true
                }, files: {
                    src: ['app/**/*.js', 'test/**/*.js', '!app/bower_components/**/*.js']
                }
            }, verify: {
                options: {
                    jshintrc: true, reporter: 'checkstyle', reporterOutput: 'target/jshint.xml'
                }, files: {src: ['app/**/*.js', 'test/**/*.js', '!app/bower_components/**/*.js']}
            }
        }, 'gh-pages': {
            options: {
                base: 'app'
            }, src: ['**']
        }
    });

    grunt.registerTask('serve', function ()
    {
        grunt.task.run(['connect:livereload', 'watch']);
    });

    grunt.registerTask('verify', ['jshint:verify', 'karma:unit']);

    grunt.registerTask('test:dev', ['karma:dev']);

    grunt.registerTask('default', ['serve']);
};
