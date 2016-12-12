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

                $scope.$storage = $localStorage.$default({
                    wallet: {
                        PLN: 0, USD: 0, EUR: 0, GBP: 0
                    }
                });

                $scope.reset = function()  {

                    $localStorage.$reset();
                    window.location.reload(false);

                };

                $scope.apply = function (value)
                {
                    $scope.$storage.wallet.PLN = value;
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
                $scope.applySellUsd = function (value, currencySellUsd)
                {
                    currencySellUsd = $scope.getUsd.rates[0].ask;
                    $scope.$storage.wallet.USD += $scope.moneyUsd.value / currencySellUsd;
                    $scope.$storage.wallet.PLN -= $scope.moneyUsd.value;
                };

                $scope.applyBuyUsd = function (value, currencyBuyUsd)
                {
                    currencyBuyUsd = $scope.getUsd.rates[0].bid;
                    $scope.$storage.wallet.USD -=  $scope.moneyUsd.value;
                    $scope.$storage.wallet.PLN +=  $scope.moneyUsd.value * currencyBuyUsd;
                };

                $scope.moneyEur = {value: null};
                $scope.applySellEur = function (value, currencySellEur)
                {
                    currencySellEur = $scope.getEur.rates[0].ask;
                    $scope.$storage.wallet.EUR += $scope.moneyEur.value / currencySellEur;
                    $scope.$storage.wallet.PLN -= $scope.moneyEur.value;
                };

                $scope.applyBuyEur = function (value, currencyBuyEur)
                {
                    currencyBuyEur = $scope.getEur.rates[0].bid;
                    $scope.$storage.wallet.EUR -=  $scope.moneyEur.value;
                    $scope.$storage.wallet.PLN +=  $scope.moneyEur.value * currencyBuyEur;
                };

                $scope.moneyGbp = {value: null};
                $scope.applySellGbp = function (value, currencySellGbp)
                {
                    currencySellGbp = $scope.getGbp.rates[0].ask;
                    $scope.$storage.wallet.GBP += $scope.moneyGbp.value / currencySellGbp;
                    $scope.$storage.wallet.PLN -= $scope.moneyGbp.value;
                };

                $scope.applyBuyGbp = function (value, currencyBuyGbp)
                {
                    currencyBuyGbp = $scope.getGbp.rates[0].bid;
                    $scope.$storage.wallet.GBP -=  $scope.moneyGbp.value;
                    $scope.$storage.wallet.PLN +=  $scope.moneyGbp.value * currencyBuyGbp;
                };
            });
})();
