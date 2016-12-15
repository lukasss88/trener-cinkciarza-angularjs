(function ()
{
    'use strict';
    angular.module('treningCinkciarza')
            .directive('actionUsd', function ()
            {
                return {
                    restrict: 'E', templateUrl: 'templates/test.html', controller: function ($scope, $localStorage)
                    {

                        $scope.currencyBox = false;

                        $scope.walletUsd = true;
                        $scope.usd = 'usd';

                        $scope.walletEur = true;
                        $scope.eur = 'eur';

                        $scope.walletGbp = true;
                        $scope.gbp = 'gbp';

                        $scope.toggleBox = function(){
                            $scope.currencyBox = !$scope.currencyBox;
                        };


                        function updateCurrency(type, value)
                        {
                            $scope.wallet[type] = value;
                            $localStorage[type] = value;
                        }

                        $scope.money = {value: null};

                        $scope.sellUsd = function(type) {

                            $scope.wallet[type] = $scope.wallet.PLN;
                            $scope.applyCurrency = function (currencySellUsd)
                            {
                                currencySellUsd = $scope.getUsd.rates[0].ask;
                                $scope.wallet.USD += $scope.money.value / currencySellUsd;
                                $scope.wallet.PLN -= $scope.money.value;
                                updateCurrency('USD', $scope.wallet.USD);
                                updateCurrency('PLN', $scope.wallet.PLN);
                            };

                            $scope.message = 'Wymiana PLN na USD';
                            $scope.currencyValue = $scope.getUsd.rates[0].ask;
                            $scope.currencyType = 'PLN';
                        };

                        $scope.buyUsd = function(type) {

                            $scope.wallet[type] = $scope.wallet.USD;

                            $scope.applyCurrency = function (currencyBuyUsd)
                            {
                                    currencyBuyUsd = $scope.getUsd.rates[0].bid;
                                    $scope.wallet.USD -= $scope.money.value;
                                    $scope.wallet.PLN += $scope.money.value * currencyBuyUsd;
                                    updateCurrency('USD', $scope.wallet.USD);
                                    updateCurrency('PLN', $scope.wallet.PLN);
                            };

                            $scope.message = 'Wymiana USD na PLN';
                            $scope.currencyValue= $scope.getUsd.rates[0].bid;
                            $scope.currencyType = 'USD';
                        };

                        $scope.buyEur = function(type) {

                            $scope.wallet[type] = $scope.wallet.EUR;

                            $scope.applyCurrency = function (currencyBuyEur)
                            {
                                currencyBuyEur = $scope.getEur.rates[0].bid;
                                $scope.wallet.EUR -= $scope.money.value;
                                $scope.wallet.PLN += $scope.money.value * currencyBuyEur;
                                updateCurrency('EUR', $scope.wallet.EUR);
                                updateCurrency('PLN', $scope.wallet.PLN);
                            };

                            $scope.message = 'Wymiana EURO na PLN';
                            $scope.currencyValue= $scope.getEur.rates[0].bid;
                            $scope.currencyType = 'EUR';
                        };

                        $scope.sellEur = function(type) {

                            $scope.wallet[type] = $scope.wallet.PLN;

                            $scope.applyCurrency = function (currencySellEur)
                            {
                                currencySellEur = $scope.getEur.rates[0].ask;
                                $scope.wallet.EUR += $scope.money.value / currencySellEur;
                                $scope.wallet.PLN -= $scope.money.value;
                                updateCurrency('EUR', $scope.wallet.EUR);
                                updateCurrency('PLN', $scope.wallet.PLN);
                            };

                            $scope.message = 'Wymiana PLN na EURO';
                            $scope.currencyValue = $scope.getEur.rates[0].ask;
                            $scope.currencyType = 'PLN';
                        };

                        $scope.sellGbp = function(type) {

                            $scope.wallet[type] = $scope.wallet.PLN;

                            $scope.applyCurrency = function (currencySellGbp)
                            {
                                currencySellGbp = $scope.getGbp.rates[0].ask;
                                $scope.wallet.GBP += $scope.money.value / currencySellGbp;
                                $scope.wallet.PLN -= $scope.money.value;
                                updateCurrency('GBP', $scope.wallet.GBP);
                                updateCurrency('PLN', $scope.wallet.PLN);
                            };

                            $scope.message = 'Wymiana PLN na GBP';
                            $scope.currencyValue = $scope.getGbp.rates[0].ask;
                            $scope.currencyType = 'PLN';
                        };

                        $scope.buyGbp = function(type) {

                            $scope.wallet[type] = $scope.wallet.GBP;

                            $scope.applyCurrency = function(currencyBuyGbp)
                            {
                                currencyBuyGbp = $scope.getGbp.rates[0].bid;
                                $scope.wallet.GBP -= $scope.money.value;
                                $scope.wallet.PLN += $scope.money.value * currencyBuyGbp;
                                updateCurrency('GBP', $scope.wallet.GBP);
                                updateCurrency('PLN', $scope.wallet.PLN);
                            };

                            $scope.message = 'Wymiana GBP na PLN';
                            $scope.currencyValue = $scope.getGbp.rates[0].bid;
                            $scope.currencyType = 'GBP';
                        };


                    }
                };
            });
})();
