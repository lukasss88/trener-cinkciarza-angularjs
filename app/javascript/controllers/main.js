(function ()
{
    'use strict';
    angular.module('treningCinkciarza')
            .controller('MainController', function ($scope, $localStorage, CurrenciesService)
            {
                $scope.moneyStart = {value: null};

                $scope.sellUsd = false;
                $scope.buyUsd = false;
                $scope.walletUsd = true;
                $scope.usd = 'usd';

                $scope.sellEur = false;
                $scope.buyEur = false;
                $scope.walletEur = true;
                $scope.eur = 'eur';

                $scope.sellGbp = false;
                $scope.buyGbp = false;
                $scope.walletGbp = true;
                $scope.gbp = 'gbp';

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

                $scope.moneyUsd = {value: null};
                $scope.applySellUsd = function (currencySellUsd)
                {
                    currencySellUsd = $scope.getUsd.rates[0].ask;
                    $scope.wallet.USD += $scope.moneyUsd.value / currencySellUsd;
                    $scope.wallet.PLN -= $scope.moneyUsd.value;
                    updateCurrency('USD', $scope.wallet.USD);
                    updateCurrency('PLN', $scope.wallet.PLN);

                };

                $scope.applyBuyUsd = function (currencyBuyUsd)
                {
                    currencyBuyUsd = $scope.getUsd.rates[0].bid;
                    $scope.wallet.USD -= $scope.moneyUsd.value;
                    $scope.wallet.PLN += $scope.moneyUsd.value * currencyBuyUsd;
                    updateCurrency('USD', $scope.wallet.USD);
                    updateCurrency('PLN', $scope.wallet.PLN);

                };

                $scope.moneyEur = {value: null};
                $scope.applySellEur = function (currencySellEur)
                {
                    currencySellEur = $scope.getEur.rates[0].ask;
                    $scope.wallet.EUR += $scope.moneyEur.value / currencySellEur;
                    $scope.wallet.PLN -= $scope.moneyEur.value;
                    updateCurrency('EUR', $scope.wallet.EUR);
                    updateCurrency('PLN', $scope.wallet.PLN);


                };

                $scope.applyBuyEur = function (currencyBuyEur)
                {
                    currencyBuyEur = $scope.getEur.rates[0].bid;
                    $scope.wallet.EUR -= $scope.moneyEur.value;
                    $scope.wallet.PLN += $scope.moneyEur.value * currencyBuyEur;
                    updateCurrency('EUR', $scope.wallet.EUR);
                    updateCurrency('PLN', $scope.wallet.PLN);

                };

                $scope.moneyGbp = {value: null};
                $scope.applySellGbp = function (currencySellGbp)
                {
                    currencySellGbp = $scope.getGbp.rates[0].ask;
                    $scope.wallet.GBP += $scope.moneyGbp.value / currencySellGbp;
                    $scope.wallet.PLN -= $scope.moneyGbp.value;
                    updateCurrency('GBP', $scope.wallet.GBP);
                    updateCurrency('PLN', $scope.wallet.PLN);

                };

                $scope.applyBuyGbp = function (currencyBuyGbp)
                {
                    currencyBuyGbp = $scope.getGbp.rates[0].bid;
                    $scope.wallet.GBP -= $scope.moneyGbp.value;
                    $scope.wallet.PLN += $scope.moneyGbp.value * currencyBuyGbp;
                    updateCurrency('GBP', $scope.wallet.GBP);
                    updateCurrency('PLN', $scope.wallet.PLN);

                };

                $scope.myClass = {expose:false};
                $scope.addClass = function() {
                    $scope.myClass.expose = true;
                };
                $scope.removeClass = function() {
                    $scope.myClass.expose = false;
                };




                $scope.toggleSellUsd = function() {
                    $scope.sellUsd = !$scope.sellUsd;
                };
                $scope.toggleBuyUsd = function() {
                    $scope.buyUsd = !$scope.buyUsd;
                };

                $scope.toggleSellEur = function() {
                    $scope.sellEur = !$scope.sellEur;
                };
                $scope.toggleBuyEur = function() {
                    $scope.buyEur = !$scope.buyEur;

                };

                $scope.toggleSellGbp = function() {
                    $scope.sellGbp = !$scope.sellGbp;
                };
                $scope.toggleBuyGbp = function() {
                    $scope.buyGbp = !$scope.buyGbp;
                };
            });




})();
