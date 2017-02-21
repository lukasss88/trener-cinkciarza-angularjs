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
    var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
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
            }, server: {
                options: {
                    hostname: 'localhost',
                    keepalive: true,
                    open: true,
                    middleware: function (connect, options) {
                        return [proxySnippet];
                    }
                },
                proxies: [{
                    context: '/api',
                    host: process.env.host || grunt.option('backend-host') ,
                    port: process.env.port || grunt.option('backend-port')
                }]
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
        grunt.task.run(['configureProxies:server','connect:livereload', 'watch']);
    });

    grunt.registerTask('verify', ['jshint:verify', 'karma:unit']);

    grunt.registerTask('test:dev', ['karma:dev']);

    grunt.registerTask('default', ['serve']);
};
