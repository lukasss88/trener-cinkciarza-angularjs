/*global browser*/

module.exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',

    framework: 'cucumber',

    specs: ['e2e/features/*.feature'],

    capabilities: {
        'browserName': 'chrome'
    },

    baseUrl: 'http://localhost:9000',

    allScriptsTimeout: 100000,

    cucumberOpts: {
        tags: ['~@ignore'],
        require: 'e2e/features/step_definitions/*.js',
        format: 'pretty',
        timeout: 100000
    },

    onPrepare: function ()
    {
        'use strict';
        browser.manage().window().setSize(1366, 768);
    }
};
