(function ()
{
    'use strict';
    angular.module('treningCinkciarza')
            .controller('MainController', function ($scope, $localStorage, CurrenciesService)
            {
                $scope.wallet = {};
                $scope.currencyBox = false;
                $scope.moneyStart = null;

                function setStartingValues()
                {
                    $scope.wallet.PLN = $localStorage.PLN || 0;
                    $scope.wallet.GBP = $localStorage.GBP || 0;
                    $scope.wallet.USD = $localStorage.USD || 0;
                    $scope.wallet.EUR = $localStorage.EUR || 0;
                }

                function updateCurrency(type, value)
                {
                    $scope.wallet[type] = value;
                    $localStorage[type] = value;
                }

                setStartingValues();

                $scope.reset = function ()
                {
                    $localStorage.$reset();
                    $scope.wallet = {};
                    setStartingValues();

                };

                $scope.apply = function ()
                {
                    $scope.reset();
                    updateCurrency('PLN', $scope.moneyStart);
                    $scope.moneyStart = null;
                };

                CurrenciesService.getUsd().then(function (data)
                {
                    $scope.getUsd = data;
                });

                CurrenciesService.getEur().then(function (data)
                {
                    $scope.getEur = data;
                });

                CurrenciesService.getGbp().then(function (data)
                {
                    $scope.getGbp = data;
                });


                $scope.items = ['USD', 'EUR', 'GBP'];
                $scope.selection = $scope.items[0];


                $scope.checkWallet = function(type) {
                    if($scope.wallet[type] <= 0) {
                        return true;
                    }
                    else {
                        return false;
                    }
                };


            });
})();
