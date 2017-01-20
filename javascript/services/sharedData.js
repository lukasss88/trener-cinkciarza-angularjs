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
                            'USD', 'EUR', 'GBP', 'CHF'
                    ],
                    currencyIcons:
                    {
                        USD:'$', EUR:'€', GBP:'£', CHF: 'CHF'
                    },
                    money:
                    {
                        value: null
                    }
                };
            });
})();
