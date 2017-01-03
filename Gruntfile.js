module.exports = function (grunt) {
    'use strict';
    var serveStatic = require('serve-static');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-gh-pages');

    grunt.initConfig({
        watch: {
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'app/**/*.html',
                    'app/**/*.js',
                    'app/**/*.css'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [connect().use('/bower_components', serveStatic('./bower_components')), serveStatic('app')];
                    }
                }
            }
        },
        'gh-pages': {
            options: {
                base: 'app'
            },
            src: ['**']
        }
    });

    grunt.registerTask('serve', function () {
        grunt.task.run(['connect:livereload', 'watch']);
    });

    grunt.registerTask('default', ['serve']);
};
