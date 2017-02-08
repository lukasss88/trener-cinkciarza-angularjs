(function ()
{
    'use strict';
    angular.module('cinkciarzTraining')
            .factory('SharedData', function ($localStorage)
            {

                function updateCurrency(type, value){
                    this.wallet[type] = value;
                    $localStorage[type] = value;
                }

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
                    //
                    // updateCurrency: function(type, value){
                    //     this.wallet[type] = value;
                    //     $localStorage[type] = value;
                    // },
                    //
                    updateCurrency: updateCurrency
                };
            });
})();
