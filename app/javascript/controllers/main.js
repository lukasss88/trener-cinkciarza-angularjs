(function ()
{
    'use strict';
    angular.module('treningCinkciarza')
            .controller('MainController', function ($scope, $localStorage, CurrenciesService)
            {
                $scope.moneyStart = {value: null};

                $scope.wallet = {};

                $scope.moneyStart = 0;

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
                    $scope.moneyStart = 0;
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


                /*=======================================
                 ADD OPACITY TO WALLET
                 ==================================================*/

                //change to data-ng-class
                $scope.myClass = {expose:false};
                $scope.addClass = function() {
                    $scope.myClass.expose = true;
                };
                $scope.removeClass = function() {
                    $scope.myClass.expose = false;
                };
            });
})();
