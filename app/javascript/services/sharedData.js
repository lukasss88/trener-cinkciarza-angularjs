(function ()
{
    'use strict';
    angular.module('cinkciarzTraining')
            .factory('SharedData', function ()
            {
                return {
                    wallet: {},
                    currencies:
                    [
                            'USD', 'EUR', 'GBP'
                    ],
                    currencyIcons:
                    {
                        USD:'$', EUR:'€', GBP:'£'
                    },
                    money:
                    {
                        value: null
                    }
                };
            });
})();
