(function ()
{
    'use strict';
    function SharedData($localStorage)
    {
        var wallet = {};

        function updateCurrency(type, value)
        {
            wallet[type] = value;
            $localStorage[type] = value;
        }

        return {
            wallet: wallet,
            currencies: ['USD', 'EUR', 'GBP', 'CHF'],
            currencyIcons: {
                USD: '$', EUR: '€', GBP: '£', CHF: 'CHF'
            },
            updateCurrency: updateCurrency
        };
    }

    angular.module('cinkciarzTraining').factory('SharedData', ['$localStorage', SharedData]);
})();
