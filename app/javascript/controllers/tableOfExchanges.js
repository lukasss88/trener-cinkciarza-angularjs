(function ()
{
    'use strict';
    function TableOfEchangesController(CurrenciesService)
            {
                var vm = this;

                CurrenciesService.allCurrencies().then(function (data)
                {
                    vm.arrayCurrency = data[0].rates;
                });
            }
    angular.module('cinkciarzTraining').controller('TableOfExchangesController', ['CurrenciesService', TableOfEchangesController]);
})();
