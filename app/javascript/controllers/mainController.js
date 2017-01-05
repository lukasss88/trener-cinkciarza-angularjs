(function ()
{
    'use strict';
    angular.module('cinkciarzTraining')
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

                $scope.currencies = ['USD', 'EUR', 'GBP'];

                $scope.currencyIcons = { USD:'$', EUR:'€', GBP:'£'};

            });
})();
