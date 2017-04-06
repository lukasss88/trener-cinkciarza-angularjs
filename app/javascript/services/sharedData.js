(function ()
{
    'use strict';
    function SharedData()
    {
        return {
            currencies: ['USD', 'EUR', 'GBP', 'CHF'],
            currencyIcons: {
                USD: '$', EUR: '€', GBP: '£', CHF: 'CHF'
            }
        };
    }

    angular.module('cinkciarzTraining').factory('SharedData', [SharedData]);
})();
