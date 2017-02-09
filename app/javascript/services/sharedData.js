(function ()
{
    'use strict';
    angular.module('cinkciarzTraining')
            .factory('SharedData', function ($localStorage)
            {

                var wallet = {};
                function updateCurrency(type, value){
                    wallet[type] = value;
                    $localStorage[type] = value;
                }

                return {
                    wallet: wallet,
                    currencies:
                    [
                            'USD', 'EUR', 'GBP', 'CHF'
                    ],
                    currencyIcons:
                    {
                        USD:'$', EUR:'€', GBP:'£', CHF: 'CHF'
                    },

                    updateCurrency: updateCurrency
                };
            });
})();
