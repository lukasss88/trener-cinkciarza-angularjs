(function ()
{
    'use strict';
    angular.module('cinkciarzTraining')
            .controller('TableOfExchangesController', function (CurrenciesService)
            {
                var vm = this;

                CurrenciesService.allCurrencies().then(function (data)
                {
                    console.log(data);
                    vm.arrayCurrency = data[0].rates;
                });
            });
})();
