(function ()
{
    'use strict';
    angular.module('cinkciarzTraining')
            .controller('TableOfExchangesController', function ($scope, CurrenciesService)
            {
                CurrenciesService.allCurrencies().then(function (data)
                {
                    $scope.arrayCurrency = data[0].rates;
                });
            });
})();
