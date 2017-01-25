// Karma configuration
// Generated on Fri Jan 20 2017 23:22:18 GMT+0100 (CET)

module.exports = function (config)
{
    'use strict';

    config.set({
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // base path, that will be used to resolve files and exclude
        basePath: '../',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-route/angular-route.min.js',
            'app/bower_components/ngstorage/ngStorage.js',
            'app/javascript/app.js',
            'app/javascript/controllers/*.js',
            'app/javascript/services/*.js',
            'test/testHelper.js',
            // 'app/!(bower_components)/**/*.js',
            'test/unit/**/*.spec.js'
        ],

        // list of files / patterns to exclude
        exclude: [],

        reporters: ['spec', 'coverage'],

        preprocessors: {
            'app/*.js': 'coverage',
            'app/!(bower_components)/**/*.js': 'coverage'
        },

        coverageReporter: {
            dir: 'target/',
            type: 'html'
        },

        // web server port
        port: 8080,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['Chrome'],

        // Which plugins to enable
        plugins: ['karma-chrome-launcher', 'karma-jasmine', 'karma-spec-reporter', 'karma-coverage'],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        //https://github.com/karma-runner/karma/issues/895
        usePolling: true
        // Uncomment the following lines if you are using grunt's server to run the tests
        // proxies: {
        //   '/': 'http://localhost:9000/'
        // },
        // URL root prevent conflicts with the site root
        // urlRoot: '_karma_'
    });
};
