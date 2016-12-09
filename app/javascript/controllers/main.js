(function ()
{
    'use strict';
    angular.module('treningCinkciarza')
            .controller('MainController', function ($scope, $localStorage, CurrenciesService)
            {
                $scope.moneyStart = {value: null};
                $scope.sellUsd = false;
                $scope.walletUsd = true;
                $scope.usd = 'usd';

                $scope.$storage = $localStorage.$default({
                    wallet: {
                        PLN: 0, USD: 0
                    }
                });

                function reset() {

                    $localStorage.$reset();

                }

                $scope.apply = function (value)
                {
                    $scope.$storage.wallet.PLN = value;
                };

                CurrenciesService.getUsd().then(function (data)
                {
                    $scope.getUsd = data;
                });



                $scope.moneyUsd = {value: null};
                $scope.applyUsd = function (value, currencySellUsd)
                {
                    currencySellUsd = $scope.getUsd.rates[0].ask;
                    $scope.$storage.wallet.USD += $scope.moneyUsd.value / currencySellUsd;
                    $scope.$storage.wallet.PLN -= $scope.moneyUsd.value;

                };

            });
})();
