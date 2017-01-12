(function ()
{
    'use strict';
    angular.module('cinkciarzTraining')
            .factory('SharedData', function ()
            {
                return {

                    wallet: {},
                    moneyStart: null,
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
