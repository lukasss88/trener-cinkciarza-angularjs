(function ()
{
    'use strict';
    angular.module('treningCinkciarza')
            .controller('MainController', function ($scope, $localStorage, CurrenciesService)
            {
                $scope.wallet = {};
                $scope.currencyBox = false;
                $scope.moneyStart = null;
                // $scope.currencies = null;

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

                CurrenciesService.USD().then(function (data)
                {
                    $scope.USD = data;
                });

                CurrenciesService.EUR().then(function (data)
                {
                    $scope.EUR = data;
                });

                CurrenciesService.GBP().then(function (data)
                {
                    $scope.GBP = data;
                });


                $scope.items = ['USD', 'EUR', 'GBP'];
                // $scope.selection = $scope.items[0];

                console.log($scope.items);

                $scope.changeCurrency = function() {
                    console.log($scope.item);
                };

                /*=======================================
                 SELL BUTTON SCRIPTS
                 ==================================================*/


            });
})();
